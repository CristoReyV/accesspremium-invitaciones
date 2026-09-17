// ============================================================
// Supabase Edge Function: panel-auth
// Handles: POST /login, POST /logout, GET /validate-session
//
// Security:
// - scrypt hash comparison (timing-safe)
// - Brute-force rate limiting (private.panel_login_attempts)
// - Cryptographically secure session tokens (64-byte random)
// - Session stored as SHA-256 hash in panel_sessions
// - 12h session expiry
// - Event isolation: session is bound to a single event_id
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Deno environment
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Rate limiting constants
const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;
const SESSION_HOURS = 12;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function error(message: string, status = 400, code?: string): Response {
  return json({ ok: false, error: message, ...(code && { code }) }, status);
}

// ---- Crypto helpers ----

async function sha256hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function generateToken(): string {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Timing-safe string comparison
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Parse scrypt hash: scrypt$N$r$p$salt$hash (all base64url or hex)
async function verifyScrypt(code: string, storedHash: string): Promise<boolean> {
  // Expected format from the DB: scrypt$16384$8$1$<salt-hex>$<hash-hex>
  // Node.js crypto.scrypt format stored in DB
  const parts = storedHash.split("$");
  // Support format: scrypt$N$r$p$salt$hash OR similar
  if (parts.length < 6 || parts[0] !== "scrypt") return false;

  try {
    const N = parseInt(parts[1]);
    const r = parseInt(parts[2]);
    const p = parseInt(parts[3]);
    const saltHex = parts[4];
    const hashHex = parts[5];

    const salt = hexToBytes(saltHex);
    const expectedHash = hexToBytes(hashHex);
    const keyLength = expectedHash.length;

    // Use SubtleCrypto PBKDF2 if scrypt unavailable, or use a JS scrypt polyfill
    // Deno does not have native scrypt in SubtleCrypto.
    // We'll use the scrypt from esm.sh
    const { scrypt } = await import("https://esm.sh/scrypt-js@3.0.1");
    const derived = await scrypt(
      new TextEncoder().encode(code),
      salt,
      N,
      r,
      p,
      keyLength
    );

    const derivedHex = Array.from(derived).map((b: number) => b.toString(16).padStart(2, "0")).join("");
    return timingSafeEqual(derivedHex, hashHex);
  } catch {
    return false;
  }
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

// ---- IP hashing ----
async function hashIP(ip: string): Promise<string> {
  return sha256hex(`ip:${ip}:2024`);
}

// ---- Handlers ----

async function handleLogin(req: Request): Promise<Response> {
  const body = await req.json().catch(() => null);
  if (!body?.code) return error("Código de acceso inválido.");

  const code: string = String(body.code).trim().toUpperCase();
  if (!code || code.length < 4) return error("Código de acceso inválido.");

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Rate limiting
  const rawIP = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const ipHash = await hashIP(rawIP);
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count } = await db
    .from("private_panel_login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq("success", false)
    .gte("attempted_at", windowStart);

  if ((count ?? 0) >= MAX_ATTEMPTS) {
    return error("Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.", 429);
  }

  // Find access code (search all — no info leakage)
  const { data: codes } = await db
    .from("event_access_codes")
    .select("id, event_id, code_hash, is_active")
    .eq("is_active", true);

  let matchedCode: { id: string; event_id: string } | null = null;

  if (codes && codes.length > 0) {
    for (const c of codes) {
      let matches = false;
      try {
        if (c.code_hash && c.code_hash.startsWith("scrypt$")) {
          matches = await verifyScrypt(code, c.code_hash);
        }
      } catch {
        // Skip invalid hash
      }
      if (matches) {
        matchedCode = { id: c.id, event_id: c.event_id };
        break;
      }
    }
  }

  // Log the attempt (never reveal whether code matched partially)
  await db.from("private_panel_login_attempts").insert({
    ip_hash: ipHash,
    success: !!matchedCode,
    attempted_at: new Date().toISOString(),
  });

  if (!matchedCode) {
    return error("Código de acceso inválido.", 401);
  }

  // Get event info
  const { data: event } = await db
    .from("events")
    .select("id, slug, name")
    .eq("id", matchedCode.event_id)
    .single();

  if (!event) return error("Evento no encontrado.", 404);

  // Create session
  const rawToken = generateToken();
  const tokenHash = await sha256hex(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600 * 1000).toISOString();

  await db.from("panel_sessions").insert({
    event_id: matchedCode.event_id,
    token_hash: tokenHash,
    expires_at: expiresAt,
    last_used_at: new Date().toISOString(),
    access_code_id: matchedCode.id,
  });

  return json({
    ok: true,
    token: rawToken,
    event_id: event.id,
    event_slug: event.slug,
    expires_at: expiresAt,
  });
}

async function handleLogout(req: Request): Promise<Response> {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) return json({ ok: true });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const tokenHash = await sha256hex(token);
  await db.from("panel_sessions").delete().eq("token_hash", tokenHash);

  return json({ ok: true });
}

async function handleValidateSession(req: Request): Promise<Response> {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) return json({ valid: false });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const tokenHash = await sha256hex(token);

  const { data: session } = await db
    .from("panel_sessions")
    .select("id, event_id, expires_at")
    .eq("token_hash", tokenHash)
    .single();

  if (!session) return json({ valid: false });
  if (new Date(session.expires_at) < new Date()) {
    await db.from("panel_sessions").delete().eq("token_hash", tokenHash);
    return json({ valid: false, code: "SESSION_EXPIRED" });
  }

  // Update last_used_at
  await db.from("panel_sessions").update({ last_used_at: new Date().toISOString() }).eq("token_hash", tokenHash);

  const { data: event } = await db.from("events").select("slug").eq("id", session.event_id).single();

  return json({
    valid: true,
    event_id: session.event_id,
    event_slug: event?.slug,
    expires_at: session.expires_at,
  });
}

// ---- Main dispatcher ----
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = new URL(req.url);
  const path = url.pathname.replace(/\/functions\/v1\/panel-auth/, "").replace(/\/$/, "");

  try {
    if (req.method === "POST" && path === "/login") return await handleLogin(req);
    if (req.method === "POST" && path === "/logout") return await handleLogout(req);
    if (req.method === "GET" && path === "/validate-session") return await handleValidateSession(req);
    return error("Not found", 404);
  } catch (e) {
    console.error("panel-auth error:", e);
    return error("Error interno del servidor.", 500);
  }
});
