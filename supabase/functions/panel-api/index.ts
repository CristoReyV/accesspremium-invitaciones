import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GOOGLE_SA_EMAIL = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const GOOGLE_SA_KEY = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");

const MAX_API_BODY_BYTES = 64 * 1024;
const MAX_SEARCH_LENGTH = 80;
const MAX_GUEST_NAME_LENGTH = 200;
const MAX_PHONE_LENGTH = 40;
const MAX_NOTES_LENGTH = 1000;
const MAX_PASSES = 100;

type Db = ReturnType<typeof createClient>;
type Session = { id: string; event_id: string; expires_at: string };
type Counters = { imported: number; updated: number; skipped: number; errors: number };
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
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
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
    "Demasiadas solicitudes. Intenta de nuevo más tarde.",
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

async function keyedHash(label: string, value: string): Promise<string> {
  return sha256hex(`${SERVICE_ROLE_KEY}|${label}|${value}`);
}

async function keyedIpHash(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const rawIp = forwarded || req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
  return keyedHash("ip", rawIp);
}

function bearer(req: Request): string | null {
  const h = req.headers.get("authorization");
  const m = h ? /^Bearer\s+(.+)$/i.exec(h) : null;
  const token = m?.[1]?.trim() || null;
  return token && /^[a-f0-9]{64}$/i.test(token) ? token : null;
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
    console.error("panel-api rate-limit RPC failed", error.message);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : data;
  return row ? row as RateLimitRow : null;
}

async function resolveSession(req: Request, db: Db): Promise<Session | null> {
  const token = bearer(req);
  if (!token) return null;

  const { data, error } = await db.from("panel_sessions")
    .select("id,event_id,expires_at")
    .eq("token_hash", await sha256hex(token))
    .is("revoked_at", null)
    .maybeSingle();
  if (error || !data) return null;

  if (Date.parse(data.expires_at) <= Date.now()) {
    await db.from("panel_sessions").update({ revoked_at: new Date().toISOString() }).eq("id", data.id);
    return null;
  }

  await db.from("panel_sessions").update({ last_used_at: new Date().toISOString() }).eq("id", data.id);
  return data as Session;
}

async function enforceSessionRateLimit(req: Request, db: Db, session: Session, path: string): Promise<Response | null> {
  const sessionActor = await keyedHash("session", session.id);

  const general = await checkRateLimit(db, sessionActor, "api_general", 180, 60);
  if (!general) return fail(req, "Error interno del servidor.", 500);
  if (!general.allowed) return rateLimited(req, general.retry_after_seconds);

  let scope: string | null = null;
  let limit = 0;
  let windowSeconds = 0;

  if (req.method === "POST" && path === "/sync") {
    scope = "api_sync";
    limit = 6;
    windowSeconds = 10 * 60;
  } else if ((req.method === "POST" && path === "/guests") || (req.method === "PUT" && path.startsWith("/guests/"))) {
    scope = "api_guest_write";
    limit = 30;
    windowSeconds = 60;
  } else if (req.method === "GET" && path === "/export") {
    scope = "api_export";
    limit = 10;
    windowSeconds = 60;
  }

  if (!scope) return null;
  const specific = await checkRateLimit(db, sessionActor, scope, limit, windowSeconds);
  if (!specific) return fail(req, "Error interno del servidor.", 500);
  if (!specific.allowed) return rateLimited(req, specific.retry_after_seconds);
  return null;
}

function intParam(raw: string | null, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}

function safeSearch(raw: string | null): string {
  return (raw ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
}

async function controlMode(db: Db, eventId: string): Promise<"semi_open" | "controlled" | null> {
  const { data } = await db.from("events").select("control_mode").eq("id", eventId).maybeSingle();
  return data?.control_mode ?? null;
}

async function getEvent(req: Request, s: Session, db: Db): Promise<Response> {
  const { data, error } = await db.from("events")
    .select("id,slug,name,event_date,control_mode,status,public_invitation_url,created_at")
    .eq("id", s.event_id)
    .maybeSingle();
  if (error || !data) return fail(req, "Evento no encontrado.", 404);
  return json(req, {
    id: data.id,
    slug: data.slug,
    name: data.name,
    event_date: data.event_date,
    control_mode: data.control_mode,
    status: data.status,
    url: data.public_invitation_url,
    created_at: data.created_at,
  });
}

async function getSummary(req: Request, s: Session, db: Db): Promise<Response> {
  const mode = await controlMode(db, s.event_id);
  if (!mode) return fail(req, "Evento no encontrado.", 404);

  if (mode === "controlled") {
    const { data, error } = await db.from("guests")
      .select("status,allowed_passes,confirmed_passes")
      .eq("event_id", s.event_id);
    if (error) return fail(req, "No fue posible cargar el resumen.", 500);
    const rows = data ?? [];
    return json(req, {
      total_responses: 0,
      confirmed_people: 0,
      declined_people: 0,
      pending_people: 0,
      last_response_at: null,
      last_sync_at: null,
      total_guests: rows.length,
      total_allowed_passes: rows.reduce((a, g) => a + Number(g.allowed_passes || 0), 0),
      total_confirmed_passes: rows.reduce((a, g) => a + Number(g.confirmed_passes || 0), 0),
      total_pending_guests: rows.filter(g => g.status === "pending").length,
    });
  }

  const { data, error } = await db.from("responses")
    .select("status,attendee_count,submitted_at")
    .eq("event_id", s.event_id);
  if (error) return fail(req, "No fue posible cargar el resumen.", 500);

  const rows = data ?? [];
  const { data: integration } = await db.from("sheet_integrations")
    .select("last_sync_at")
    .eq("event_id", s.event_id)
    .maybeSingle();
  const sorted = [...rows].sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at));

  return json(req, {
    total_responses: rows.length,
    confirmed_people: rows.filter(r => r.status === "confirmed").reduce((a, r) => a + Number(r.attendee_count || 0), 0),
    declined_people: rows.filter(r => r.status === "declined").length,
    pending_people: rows.filter(r => r.status === "pending").length,
    last_response_at: sorted[0]?.submitted_at ?? null,
    last_sync_at: integration?.last_sync_at ?? null,
  });
}

const RESPONSE_FIELDS = "id,guest_id,respondent_name,phone,status,attendee_count,attendee_names,message,source,submitted_at,created_at";
const GUEST_FIELDS = "id,event_id,name,phone,allowed_passes,confirmed_passes,status,notes,guest_access_hint,created_at,updated_at";

async function getResponses(req: Request, s: Session, db: Db): Promise<Response> {
  const u = new URL(req.url);
  const page = intParam(u.searchParams.get("page"), 1, 1, 100000);
  const limit = intParam(u.searchParams.get("limit"), 25, 1, 100);
  const status = u.searchParams.get("status")?.trim() ?? "";
  const search = safeSearch(u.searchParams.get("search"));

  let q = db.from("responses")
    .select(RESPONSE_FIELDS, { count: "exact" })
    .eq("event_id", s.event_id)
    .order("submitted_at", { ascending: false });
  if (["pending", "confirmed", "declined"].includes(status)) q = q.eq("status", status);
  if (search) q = q.ilike("respondent_name", `%${search}%`);

  const from = (page - 1) * limit;
  const { data, count, error } = await q.range(from, from + limit - 1);
  if (error) return fail(req, "No fue posible cargar las confirmaciones.", 500);
  return json(req, { responses: data ?? [], total: count ?? 0 });
}

async function getGuests(req: Request, s: Session, db: Db): Promise<Response> {
  const u = new URL(req.url);
  const page = intParam(u.searchParams.get("page"), 1, 1, 100000);
  const limit = intParam(u.searchParams.get("limit"), 25, 1, 100);
  const status = u.searchParams.get("status")?.trim() ?? "";
  const search = safeSearch(u.searchParams.get("search"));

  let q = db.from("guests")
    .select(GUEST_FIELDS, { count: "exact" })
    .eq("event_id", s.event_id)
    .order("name", { ascending: true });
  if (["pending", "confirmed", "declined"].includes(status)) q = q.eq("status", status);
  if (search) q = q.ilike("name", `%${search}%`);

  const from = (page - 1) * limit;
  const { data, count, error } = await q.range(from, from + limit - 1);
  if (error) return fail(req, "No fue posible cargar los invitados.", 500);
  return json(req, { guests: data ?? [], total: count ?? 0 });
}

async function createGuest(req: Request, s: Session, db: Db): Promise<Response> {
  if (await controlMode(db, s.event_id) !== "controlled") {
    return fail(req, "La lista controlada no está habilitada para este evento.", 409);
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const allowed = Number(body?.allowed_passes);

  if (!name || name.length > MAX_GUEST_NAME_LENGTH) return fail(req, "El nombre no es válido.");
  if (phone.length > MAX_PHONE_LENGTH) return fail(req, "El teléfono no es válido.");
  if (notes.length > MAX_NOTES_LENGTH) return fail(req, "Las notas son demasiado largas.");
  if (!Number.isInteger(allowed) || allowed < 1 || allowed > MAX_PASSES) return fail(req, `Los pases deben estar entre 1 y ${MAX_PASSES}.`);

  const { data, error } = await db.from("guests").insert({
    event_id: s.event_id,
    name,
    phone: phone || null,
    allowed_passes: allowed,
    confirmed_passes: 0,
    status: "pending",
    notes: notes || null,
  }).select(GUEST_FIELDS).single();

  if (error) return fail(req, "No fue posible guardar el invitado.", 500);
  return json(req, data, 201);
}

async function updateGuest(req: Request, guestId: string, s: Session, db: Db): Promise<Response> {
  if (await controlMode(db, s.event_id) !== "controlled") {
    return fail(req, "La lista controlada no está habilitada para este evento.", 409);
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return fail(req, "Datos inválidos.");

  const { data: current } = await db.from("guests")
    .select("id,allowed_passes,confirmed_passes")
    .eq("id", guestId)
    .eq("event_id", s.event_id)
    .maybeSingle();
  if (!current) return fail(req, "Invitado no encontrado.", 404);

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || name.length > MAX_GUEST_NAME_LENGTH) return fail(req, "El nombre no es válido.");
    updates.name = name;
  }
  if (body.phone !== undefined) {
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    if (phone.length > MAX_PHONE_LENGTH) return fail(req, "El teléfono no es válido.");
    updates.phone = phone || null;
  }
  if (body.notes !== undefined) {
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";
    if (notes.length > MAX_NOTES_LENGTH) return fail(req, "Las notas son demasiado largas.");
    updates.notes = notes || null;
  }

  const allowed = body.allowed_passes !== undefined ? Number(body.allowed_passes) : Number(current.allowed_passes);
  const confirmed = body.confirmed_passes !== undefined ? Number(body.confirmed_passes) : Number(current.confirmed_passes);
  if (!Number.isInteger(allowed) || allowed < 1 || allowed > MAX_PASSES) return fail(req, `Los pases deben estar entre 1 y ${MAX_PASSES}.`);
  if (!Number.isInteger(confirmed) || confirmed < 0 || confirmed > allowed) return fail(req, "Los pases confirmados no pueden superar los permitidos.");
  if (body.allowed_passes !== undefined) updates.allowed_passes = allowed;
  if (body.confirmed_passes !== undefined) updates.confirmed_passes = confirmed;

  if (body.status !== undefined) {
    const st = String(body.status);
    if (!["pending", "confirmed", "declined"].includes(st)) return fail(req, "Estado de invitado inválido.");
    updates.status = st;
    if (st === "declined") updates.confirmed_passes = 0;
  }

  const { data, error } = await db.from("guests")
    .update(updates)
    .eq("id", guestId)
    .eq("event_id", s.event_id)
    .select(GUEST_FIELDS)
    .single();
  if (error) return fail(req, "No fue posible actualizar el invitado.", 500);
  return json(req, data);
}

async function getIntegration(req: Request, s: Session, db: Db): Promise<Response> {
  const { data, error } = await db.from("sheet_integrations")
    .select("id,event_id,spreadsheet_id,sheet_name,form_url,enabled,field_mapping,last_sync_at,created_at")
    .eq("event_id", s.event_id)
    .maybeSingle();
  if (error) return fail(req, "No fue posible cargar la integración.", 500);
  if (!data) return json(req, null);
  return json(req, { ...data, credentials_configured: Boolean(GOOGLE_SA_EMAIL && GOOGLE_SA_KEY) });
}

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function strB64url(s: string): string {
  return b64url(new TextEncoder().encode(s));
}

async function googleToken(): Promise<string | null> {
  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const h = strB64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const p = strB64url(JSON.stringify({
      iss: GOOGLE_SA_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }));
    const pem = GOOGLE_SA_KEY
      .replace(/\\n/g, "\n")
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\s/g, "");
    const keyBytes = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      "pkcs8",
      keyBytes,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const input = `${h}.${p}`;
    const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(input));
    const jwt = `${input}.${b64url(new Uint8Array(sig))}`;
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const payload = await r.json() as { access_token?: string };
    return r.ok ? payload.access_token ?? null : null;
  } catch {
    return null;
  }
}

function canon(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function statusOf(raw: string): "confirmed" | "declined" | "pending" {
  const v = canon(raw);
  if (!v) return "pending";
  if (/^no\b/.test(v) || v.includes("no podre asistir") || v.includes("no asistire") || v.includes("no puedo asistir")) return "declined";
  if (/^si\b/.test(v) || v.includes("confirmo mi asistencia") || v.includes("confirmo asistencia") || v === "confirmo" || v.includes("asistire")) return "confirmed";
  return "pending";
}

function timestampOf(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(v);
  if (m) {
    const [, d, mo, y, h = "0", mi = "0", se = "0"] = m;
    const iso = `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}T${h.padStart(2, "0")}:${mi}:${se}-06:00`;
    const dt = new Date(iso);
    return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
  }
  const dt = new Date(v);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
}

function countOf(raw: string, status: "confirmed" | "declined" | "pending"): number | null {
  if (status !== "confirmed") return 0;
  const m = raw.match(/\d+/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isInteger(n) && n >= 1 && n <= MAX_PASSES ? n : null;
}

function namesOf(raw: string): string[] {
  return raw.split(/[\n,;]+/).map(x => x.trim()).filter(Boolean).slice(0, MAX_PASSES);
}

async function finishLog(
  db: Db,
  id: string | null,
  c: Counters,
  status: "success" | "partial" | "failed",
  msg?: string,
): Promise<void> {
  if (!id) return;
  await db.from("sync_logs").update({
    imported_count: c.imported,
    updated_count: c.updated,
    skipped_count: c.skipped,
    error_count: c.errors,
    status,
    finished_at: new Date().toISOString(),
    error_message: msg ?? null,
  }).eq("id", id);
}

async function sync(req: Request, s: Session, db: Db): Promise<Response> {
  if (await controlMode(db, s.event_id) !== "semi_open") {
    return fail(req, "La sincronización de Google Sheets solo aplica a eventos semiabiertos.", 409);
  }

  const started = new Date().toISOString();
  const c: Counters = { imported: 0, updated: 0, skipped: 0, errors: 0 };
  const { data: it } = await db.from("sheet_integrations")
    .select("id,spreadsheet_id,sheet_name,enabled,field_mapping")
    .eq("event_id", s.event_id)
    .maybeSingle();
  if (!it || !it.enabled || !it.spreadsheet_id) return fail(req, "No hay una integración de Google Sheets activa.", 404);

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000).toISOString();
  const { data: running } = await db.from("sync_logs")
    .select("id")
    .eq("event_id", s.event_id)
    .eq("status", "running")
    .gte("started_at", fiveMinutesAgo)
    .limit(1)
    .maybeSingle();
  if (running) return fail(req, "Ya hay una sincronización en curso.", 409, "SYNC_IN_PROGRESS");

  const { data: log } = await db.from("sync_logs").insert({
    event_id: s.event_id,
    integration_id: it.id,
    status: "running",
    started_at: started,
  }).select("id").single();

  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) {
    await finishLog(db, log?.id ?? null, c, "failed", "Credenciales de Google no configuradas.");
    return json(req, {
      imported_count: 0,
      updated_count: 0,
      skipped_count: 0,
      error_count: 0,
      status: "error",
      message: "Google Sheets pendiente de conexión.",
      started_at: started,
      finished_at: new Date().toISOString(),
    });
  }

  const token = await googleToken();
  if (!token) {
    c.errors = 1;
    await finishLog(db, log?.id ?? null, c, "failed", "No se pudo autenticar con Google.");
    return fail(req, "No fue posible conectar con Google Sheets.", 502);
  }

  const range = `${it.sheet_name}!A1:Z10001`;
  let r: Response;
  try {
    r = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(it.spreadsheet_id)}/values/${encodeURIComponent(range)}?majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`,
      { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15_000) },
    );
  } catch {
    c.errors = 1;
    await finishLog(db, log?.id ?? null, c, "failed", "Timeout al leer Google Sheets.");
    return fail(req, "Google Sheets tardó demasiado en responder.", 504);
  }

  if (!r.ok) {
    c.errors = 1;
    await finishLog(db, log?.id ?? null, c, "failed", `Google Sheets HTTP ${r.status}`);
    return fail(req, "No fue posible leer la hoja de confirmaciones.", 502);
  }

  const payload = await r.json() as { values?: unknown[][] };
  const rows = (payload.values ?? []).map(row => row.map(v => String(v ?? "")));
  const headers = rows[0] ?? [];
  const map = (it.field_mapping ?? {}) as Record<string, string>;
  const idx = (k: string) => {
    const want = String(map[k] ?? "").trim();
    return want ? headers.findIndex(h => h.trim() === want) : -1;
  };
  const ix = {
    ts: idx("timestamp"),
    name: idx("respondent_name"),
    status: idx("attendance_status"),
    count: idx("attendee_count"),
    names: idx("attendee_names"),
    phone: idx("phone"),
    msg: idx("message"),
  };

  if (ix.ts < 0 || ix.name < 0 || ix.status < 0) {
    c.errors = 1;
    await finishLog(db, log?.id ?? null, c, "failed", "El mapeo de columnas no coincide.");
    return fail(req, "La estructura de Google Sheets cambió y necesita revisión.", 409);
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const ts = row[ix.ts]?.trim() ?? "";
    const name = row[ix.name]?.trim() ?? "";
    const stRaw = row[ix.status]?.trim() ?? "";
    if (!ts && !name && !stRaw) {
      c.skipped++;
      continue;
    }

    const phone = ix.phone >= 0 ? (row[ix.phone]?.trim() ?? "") : "";
    const msg = ix.msg >= 0 ? (row[ix.msg]?.trim() ?? "") : "";
    const cr = ix.count >= 0 ? (row[ix.count]?.trim() ?? "") : "";
    const nr = ix.names >= 0 ? (row[ix.names]?.trim() ?? "") : "";
    const submitted = timestampOf(ts);
    const st = statusOf(stRaw);
    const attendee = countOf(cr, st);

    if (!ts || !name || name.length > MAX_GUEST_NAME_LENGTH || !submitted || attendee === null || phone.length > MAX_PHONE_LENGTH || msg.length > 5000) {
      c.errors++;
      continue;
    }

    const ext = await sha256hex(`${ts}::${canon(name)}::${canon(phone)}`);
    const raw: Record<string, string> = {};
    headers.forEach((h, j) => { if (h) raw[h] = row[j] ?? ""; });
    const fp = await sha256hex(JSON.stringify(raw));
    const record = {
      event_id: s.event_id,
      respondent_name: name,
      phone: phone || null,
      status: st,
      attendee_count: attendee,
      attendee_names: st === "confirmed" ? namesOf(nr) : [],
      message: msg || null,
      source: "google_forms",
      submitted_at: submitted,
      external_response_id: ext,
      raw_data: { ...raw, _sync_fingerprint: fp },
    };

    const { data: old } = await db.from("responses")
      .select("id,raw_data")
      .eq("event_id", s.event_id)
      .eq("source", "google_forms")
      .eq("external_response_id", ext)
      .maybeSingle();

    if (old) {
      if ((old.raw_data as Record<string, unknown> | null)?._sync_fingerprint === fp) {
        c.skipped++;
        continue;
      }
      const { error } = await db.from("responses").update(record).eq("id", old.id).eq("event_id", s.event_id);
      error ? c.errors++ : c.updated++;
    } else {
      const { error } = await db.from("responses").insert(record);
      error ? c.errors++ : c.imported++;
    }
  }

  const status: "success" | "partial" | "failed" = c.errors === 0 ? "success" : ((c.imported + c.updated) > 0 ? "partial" : "failed");
  await finishLog(db, log?.id ?? null, c, status, c.errors ? "Una o más filas no pudieron mapearse o guardarse." : undefined);
  const finished = new Date().toISOString();
  await db.from("sheet_integrations").update({ last_sync_at: finished }).eq("id", it.id);

  return json(req, {
    imported_count: c.imported,
    updated_count: c.updated,
    skipped_count: c.skipped,
    error_count: c.errors,
    status,
    message: c.errors
      ? `${c.imported} nuevas, ${c.updated} actualizadas y ${c.errors} con datos por revisar.`
      : (c.imported + c.updated > 0 ? `${c.imported} nuevas y ${c.updated} actualizadas.` : "Sin respuestas nuevas."),
    started_at: started,
    finished_at: finished,
  });
}

async function exportData(req: Request, s: Session, db: Db): Promise<Response> {
  const { data, error } = await db.from("responses")
    .select(RESPONSE_FIELDS)
    .eq("event_id", s.event_id)
    .order("submitted_at", { ascending: false });
  if (error) return fail(req, "No fue posible preparar la exportación.", 500);
  return json(req, { responses: data ?? [] });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !isAllowedOrigin(origin)) return fail(req, "Origen no permitido.", 403);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
  if (["POST", "PUT", "PATCH"].includes(req.method) && isBodyTooLarge(req, MAX_API_BODY_BYTES)) {
    return fail(req, "Solicitud demasiado grande.", 413);
  }

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  try {
    const path = routePath(req, "panel-api");
    if (req.method === "GET" && path === "/") return json(req, { ok: true });

    const ipHash = await keyedIpHash(req);
    const ipLimit = await checkRateLimit(db, ipHash, "api_ip", 300, 60);
    if (!ipLimit) return fail(req, "Error interno del servidor.", 500);
    if (!ipLimit.allowed) return rateLimited(req, ipLimit.retry_after_seconds);

    const s = await resolveSession(req, db);
    if (!s) return fail(req, "Sesión inválida o expirada.", 401, "SESSION_EXPIRED");

    const routeLimitResponse = await enforceSessionRateLimit(req, db, s, path);
    if (routeLimitResponse) return routeLimitResponse;

    const gm = /^\/guests\/([0-9a-f-]{36})$/i.exec(path);
    if (req.method === "GET" && path === "/event") return getEvent(req, s, db);
    if (req.method === "GET" && path === "/summary") return getSummary(req, s, db);
    if (req.method === "GET" && path === "/responses") return getResponses(req, s, db);
    if (req.method === "GET" && path === "/guests") return getGuests(req, s, db);
    if (req.method === "POST" && path === "/guests") return createGuest(req, s, db);
    if (req.method === "PUT" && gm) return updateGuest(req, gm[1], s, db);
    if (req.method === "GET" && path === "/integration") return getIntegration(req, s, db);
    if (req.method === "POST" && path === "/sync") return sync(req, s, db);
    if (req.method === "GET" && path === "/export") return exportData(req, s, db);
    return fail(req, "Not found", 404);
  } catch (e) {
    console.error("panel-api error", e instanceof Error ? e.message : "unknown");
    return fail(req, "Error interno del servidor.", 500);
  }
});