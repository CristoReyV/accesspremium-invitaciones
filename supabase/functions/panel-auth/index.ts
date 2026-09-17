import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { scrypt } from "https://esm.sh/scrypt-js@3.0.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;
const SESSION_HOURS = 12;
const LOGIN_ATTEMPTS_TABLE = "private_panel_login_attempts";

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  try {
    const { protocol, hostname } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    const host = hostname.toLowerCase();
    return host === "invitaciones-access.smartbrain.lat" ||
      host === "panel.invitaciones-access.smartbrain.lat" ||
      host === "invitaciones-access.netlify.app" ||
      host.endsWith("--invitaciones-access.netlify.app") ||
      host === "localhost" || host === "127.0.0.1";
  } catch { return false; }
}

function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": origin && isAllowedOrigin(origin) ? origin : "https://invitaciones-access.smartbrain.lat",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(req: Request, data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { ...cors(req), "Content-Type": "application/json; charset=utf-8" } });
}
function fail(req: Request, message: string, status = 400, code?: string): Response {
  return json(req, { error: message, ...(code ? { code } : {}) }, status);
}

function routePath(req: Request, functionName: string): string {
  let path = new URL(req.url).pathname.replace(/\/+$/, "") || "/";
  for (const marker of [`/functions/v1/${functionName}`, `/${functionName}`]) {
    const index = path.indexOf(marker);
    if (index >= 0) {
      path = path.slice(index + marker.length) || "/";
      break;
    }
  }
  return path || "/";
}

async function sha256hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}
function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
async function verifyScrypt(code: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const n = Number(parts[1]), r = Number(parts[2]), p = Number(parts[3]);
  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p) || n <= 1 || r <= 0 || p <= 0) return false;
  try {
    const salt = decodeBase64Url(parts[4]);
    const expected = decodeBase64Url(parts[5]);
    const derived = await scrypt(new TextEncoder().encode(code), salt, n, r, p, expected.length);
    return timingSafeEqual(Uint8Array.from(derived), expected);
  } catch { return false; }
}
function bearer(req: Request): string | null {
  const header = req.headers.get("authorization");
  const match = header ? /^Bearer\s+(.+)$/i.exec(header) : null;
  return match?.[1]?.trim() || null;
}
async function keyedIpHash(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rawIp = forwarded || req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
  return sha256hex(`${SERVICE_ROLE_KEY}|${rawIp}`);
}

async function login(req: Request): Promise<Response> {
  const body = await req.json().catch(() => null) as { code?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (code.length < 4 || code.length > 128) return fail(req, "Código de acceso inválido.", 400);

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const ipHash = await keyedIpHash(req);
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const { count, error: rateError } = await db.from(LOGIN_ATTEMPTS_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash).eq("success", false).gte("attempted_at", windowStart);
  if (rateError) return fail(req, "Error interno del servidor.", 500);
  if ((count ?? 0) >= MAX_ATTEMPTS) return fail(req, "Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.", 429, "RATE_LIMITED");

  const { data: codes, error: codesError } = await db.from("event_access_codes")
    .select("id,event_id,code_hash").eq("enabled", true).is("revoked_at", null);
  if (codesError) return fail(req, "Error interno del servidor.", 500);

  let matched: { id: string; event_id: string } | null = null;
  for (const candidate of codes ?? []) {
    if (typeof candidate.code_hash === "string" && await verifyScrypt(code, candidate.code_hash)) {
      matched = { id: candidate.id, event_id: candidate.event_id };
      break;
    }
  }

  const { error: auditError } = await db.from(LOGIN_ATTEMPTS_TABLE).insert({ ip_hash: ipHash, success: Boolean(matched) });
  if (auditError) return fail(req, "Error interno del servidor.", 500);
  if (!matched) return fail(req, "Código de acceso inválido.", 401);

  const { data: event, error: eventError } = await db.from("events")
    .select("id,slug,status").eq("id", matched.event_id).maybeSingle();
  if (eventError || !event || event.status !== "active") return fail(req, "Código de acceso inválido.", 401);

  const token = randomToken();
  const tokenHash = await sha256hex(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_HOURS * 3_600_000).toISOString();
  const { error: sessionError } = await db.from("panel_sessions").insert({
    event_id: event.id, token_hash: tokenHash, expires_at: expiresAt, last_used_at: now.toISOString()
  });
  if (sessionError) return fail(req, "Error interno del servidor.", 500);
  await db.from("event_access_codes").update({ last_used_at: now.toISOString() }).eq("id", matched.id);

  return json(req, { token, event_id: event.id, event_slug: event.slug, expires_at: expiresAt });
}

async function logout(req: Request): Promise<Response> {
  const token = bearer(req);
  if (!token) return json(req, { ok: true });
  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  await db.from("panel_sessions").update({ revoked_at: new Date().toISOString() })
    .eq("token_hash", await sha256hex(token)).is("revoked_at", null);
  return json(req, { ok: true });
}

async function validateSession(req: Request): Promise<Response> {
  const token = bearer(req);
  if (!token) return json(req, { valid: false });
  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: session, error } = await db.from("panel_sessions")
    .select("id,event_id,expires_at").eq("token_hash", await sha256hex(token)).is("revoked_at", null).maybeSingle();
  if (error || !session) return json(req, { valid: false });
  if (Date.parse(session.expires_at) <= Date.now()) {
    await db.from("panel_sessions").update({ revoked_at: new Date().toISOString() }).eq("id", session.id);
    return json(req, { valid: false, code: "SESSION_EXPIRED" });
  }
  await db.from("panel_sessions").update({ last_used_at: new Date().toISOString() }).eq("id", session.id);
  const { data: event } = await db.from("events").select("slug,status").eq("id", session.event_id).maybeSingle();
  if (!event || event.status !== "active") return json(req, { valid: false });
  return json(req, { valid: true, event_id: session.event_id, event_slug: event.slug, expires_at: session.expires_at });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !isAllowedOrigin(origin)) return fail(req, "Origen no permitido.", 403);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
  try {
    const path = routePath(req, "panel-auth");
    if (req.method === "POST" && path === "/login") return await login(req);
    if (req.method === "POST" && path === "/logout") return await logout(req);
    if (req.method === "GET" && path === "/validate-session") return await validateSession(req);
    if (req.method === "GET" && path === "/") return json(req, { ok: true, service: "panel-auth" });
    return fail(req, "Not found", 404);
  } catch (error) {
    console.error("panel-auth error", error);
    return fail(req, "Error interno del servidor.", 500);
  }
});