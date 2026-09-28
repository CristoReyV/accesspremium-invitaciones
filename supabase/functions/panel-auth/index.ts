import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { scrypt } from "https://esm.sh/scrypt-js@3.0.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const MAX_FAILED_ATTEMPTS = 5;
const LOGIN_IP_LIMIT = 20;
const LOGIN_CODE_LIMIT = 10;
const WINDOW_SECONDS = 15 * 60;
const SESSION_HOURS = 12;
const MAX_ACTIVE_SESSIONS = 10;
const MAX_LOGIN_BODY_BYTES = 4 * 1024;
const LOGIN_ATTEMPTS_TABLE = "private_panel_login_attempts";

type Db = ReturnType<typeof createClient>;
type RateLimitRow = { allowed: boolean; retry_after_seconds: number; current_count: number };

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
  } catch {
    return false;
  }
}

function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": origin && isAllowedOrigin(origin) ? origin : "https://invitaciones-access.smartbrain.lat",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin",
  };
}

function responseHeaders(req: Request, extra: Record<string, string> = {}): Record<string, string> {
  return {
    ...cors(req),
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    ...extra,
  };
}

function json(req: Request, data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), { status, headers: responseHeaders(req, extra) });
}

function fail(req: Request, message: string, status = 400, code?: string, extra: Record<string, string> = {}): Response {
  return json(req, { error: message, ...(code ? { code } : {}) }, status, extra);
}

function rateLimited(req: Request, retryAfter: number): Response {
  return fail(
    req,
    "Demasiados intentos. Intenta de nuevo más tarde.",
    429,
    "RATE_LIMITED",
    { "Retry-After": String(Math.max(1, retryAfter)) },
  );
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

function isBodyTooLarge(req: Request, maxBytes: number): boolean {
  const raw = req.headers.get("content-length");
  if (!raw) return false;
  const size = Number(raw);
  return Number.isFinite(size) && size > maxBytes;
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
  } catch {
    return false;
  }
}

function bearer(req: Request): string | null {
  const header = req.headers.get("authorization");
  const match = header ? /^Bearer\s+(.+)$/i.exec(header) : null;
  const token = match?.[1]?.trim() || null;
  return token && /^[a-f0-9]{64}$/i.test(token) ? token : null;
}

async function keyedHash(label: string, value: string): Promise<string> {
  return sha256hex(`${SERVICE_ROLE_KEY}|${label}|${value}`);
}

async function keyedIpHash(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rawIp = forwarded || req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
  return keyedHash("ip", rawIp);
}

async function checkRateLimit(
  db: Db,
  actorHash: string,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitRow | null> {
  const { data, error } = await db.rpc("panel_check_rate_limit", {
    p_actor_hash: actorHash,
    p_scope: scope,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) {
    console.error("panel-auth rate-limit RPC failed", error.message);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  return row as RateLimitRow;
}

async function capActiveSessions(db: Db, eventId: string, nowIso: string): Promise<void> {
  await db.from("panel_sessions")
    .update({ revoked_at: nowIso })
    .eq("event_id", eventId)
    .is("revoked_at", null)
    .lte("expires_at", nowIso);

  const { data: active } = await db.from("panel_sessions")
    .select("id")
    .eq("event_id", eventId)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .order("created_at", { ascending: false })
    .limit(MAX_ACTIVE_SESSIONS);

  if ((active?.length ?? 0) < MAX_ACTIVE_SESSIONS) return;

  const oldestKept = active?.[MAX_ACTIVE_SESSIONS - 1]?.id;
  if (!oldestKept) return;

  const { data: stale } = await db.from("panel_sessions")
    .select("id")
    .eq("event_id", eventId)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .order("created_at", { ascending: false })
    .range(MAX_ACTIVE_SESSIONS - 1, MAX_ACTIVE_SESSIONS + 20);

  for (const session of stale ?? []) {
    await db.from("panel_sessions").update({ revoked_at: nowIso }).eq("id", session.id);
  }
}

async function login(req: Request): Promise<Response> {
  if (isBodyTooLarge(req, MAX_LOGIN_BODY_BYTES)) return fail(req, "Solicitud demasiado grande.", 413);

  const body = await req.json().catch(() => null) as { code?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (code.length < 4 || code.length > 128) return fail(req, "Código de acceso inválido.", 400);

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const ipHash = await keyedIpHash(req);
  const codeFingerprint = await keyedHash("access-code", code);

  const ipBurst = await checkRateLimit(db, ipHash, "login_ip", LOGIN_IP_LIMIT, WINDOW_SECONDS);
  if (!ipBurst) return fail(req, "Error interno del servidor.", 500);
  if (!ipBurst.allowed) return rateLimited(req, ipBurst.retry_after_seconds);

  const codeBurst = await checkRateLimit(db, codeFingerprint, "login_code", LOGIN_CODE_LIMIT, WINDOW_SECONDS);
  if (!codeBurst) return fail(req, "Error interno del servidor.", 500);
  if (!codeBurst.allowed) return rateLimited(req, codeBurst.retry_after_seconds);

  const windowStart = new Date(Date.now() - WINDOW_SECONDS * 1000).toISOString();
  const { count, error: rateError } = await db.from(LOGIN_ATTEMPTS_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq("success", false)
    .gte("attempted_at", windowStart);
  if (rateError) return fail(req, "Error interno del servidor.", 500);
  if ((count ?? 0) >= MAX_FAILED_ATTEMPTS) return rateLimited(req, WINDOW_SECONDS);

  const { data: codes, error: codesError } = await db.from("event_access_codes")
    .select("id,event_id,code_hash")
    .eq("enabled", true)
    .is("revoked_at", null);
  if (codesError) return fail(req, "Error interno del servidor.", 500);

  let matched: { id: string; event_id: string } | null = null;
  for (const candidate of codes ?? []) {
    if (typeof candidate.code_hash === "string" && await verifyScrypt(code, candidate.code_hash)) {
      matched = { id: candidate.id, event_id: candidate.event_id };
      break;
    }
  }

  const { error: auditError } = await db.from(LOGIN_ATTEMPTS_TABLE).insert({
    ip_hash: ipHash,
    code_fingerprint: codeFingerprint,
    success: Boolean(matched),
  });
  if (auditError) return fail(req, "Error interno del servidor.", 500);
  if (!matched) return fail(req, "Código de acceso inválido.", 401);

  const { data: event, error: eventError } = await db.from("events")
    .select("id,slug,status")
    .eq("id", matched.event_id)
    .maybeSingle();
  if (eventError || !event || event.status !== "active") return fail(req, "Código de acceso inválido.", 401);

  const token = randomToken();
  const tokenHash = await sha256hex(token);
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + SESSION_HOURS * 3_600_000).toISOString();

  await capActiveSessions(db, event.id, nowIso);

  const { error: sessionError } = await db.from("panel_sessions").insert({
    event_id: event.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
    last_used_at: nowIso,
  });
  if (sessionError) return fail(req, "Error interno del servidor.", 500);

  await db.from("event_access_codes").update({ last_used_at: nowIso }).eq("id", matched.id);

  return json(req, { token, event_id: event.id, event_slug: event.slug, expires_at: expiresAt });
}

async function logout(req: Request): Promise<Response> {
  const token = bearer(req);
  if (!token) return json(req, { ok: true });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  await db.from("panel_sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("token_hash", await sha256hex(token))
    .is("revoked_at", null);
  return json(req, { ok: true });
}

async function validateSession(req: Request): Promise<Response> {
  const token = bearer(req);
  if (!token) return json(req, { valid: false });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const ipHash = await keyedIpHash(req);
  const metaLimit = await checkRateLimit(db, ipHash, "auth_validate", 120, 60);
  if (!metaLimit) return fail(req, "Error interno del servidor.", 500);
  if (!metaLimit.allowed) return rateLimited(req, metaLimit.retry_after_seconds);

  const { data: session, error } = await db.from("panel_sessions")
    .select("id,event_id,expires_at")
    .eq("token_hash", await sha256hex(token))
    .is("revoked_at", null)
    .maybeSingle();
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
    if (req.method === "GET" && path === "/") return json(req, { ok: true });
    return fail(req, "Not found", 404);
  } catch (error) {
    console.error("panel-auth error", error instanceof Error ? error.message : "unknown");
    return fail(req, "Error interno del servidor.", 500);
  }
});