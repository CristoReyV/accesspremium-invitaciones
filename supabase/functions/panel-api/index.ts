// ============================================================
// Supabase Edge Function: panel-api
// All endpoints require a valid custom panel Bearer session.
// Authorization is derived exclusively from panel_sessions.event_id.
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GOOGLE_SA_EMAIL = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const GOOGLE_SA_KEY = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");

type DbClient = ReturnType<typeof createClient>;

type Session = {
  id: string;
  event_id: string;
  expires_at: string;
};

type SyncCounters = {
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
};

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  try {
    const { protocol, hostname } = new URL(origin);
    if (protocol !== "http:" && protocol !== "https:") return false;
    const host = hostname.toLowerCase();
    if (host === "invitaciones-access.smartbrain.lat") return true;
    if (host === "panel.invitaciones-access.smartbrain.lat") return true;
    if (host === "invitaciones-access.netlify.app") return true;
    if (host.endsWith("--invitaciones-access.netlify.app")) return true;
    if (host === "localhost" || host === "127.0.0.1") return true;
  } catch {
    return false;
  }
  return false;
}

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  const allowOrigin = origin && isAllowedOrigin(origin)
    ? origin
    : "https://invitaciones-access.smartbrain.lat";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Vary": "Origin",
  };
}

function json(req: Request, data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json; charset=utf-8" },
  });
}

function fail(req: Request, message: string, status = 400, code?: string): Response {
  return json(req, { error: message, ...(code ? { code } : {}) }, status);
}

async function sha256hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function bearerToken(req: Request): string | null {
  const header = req.headers.get("authorization");
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1]?.trim() || null;
}

async function resolveSession(req: Request, db: DbClient): Promise<Session | null> {
  const token = bearerToken(req);
  if (!token) return null;

  const tokenHash = await sha256hex(token);
  const { data: session, error } = await db
    .from("panel_sessions")
    .select("id, event_id, expires_at")
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .maybeSingle();

  if (error || !session) return null;
  if (Date.parse(session.expires_at) <= Date.now()) {
    await db.from("panel_sessions").update({ revoked_at: new Date().toISOString() }).eq("id", session.id);
    return null;
  }

  await db.from("panel_sessions").update({ last_used_at: new Date().toISOString() }).eq("id", session.id);
  return session as Session;
}

function parseBoundedInt(raw: string | null, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

async function getControlMode(db: DbClient, eventId: string): Promise<"semi_open" | "controlled" | null> {
  const { data } = await db.from("events").select("control_mode").eq("id", eventId).maybeSingle();
  return data?.control_mode ?? null;
}

async function handleGetEvent(req: Request, session: Session, db: DbClient): Promise<Response> {
  const { data, error } = await db
    .from("events")
    .select("id, slug, name, event_date, control_mode, status, public_invitation_url, created_at")
    .eq("id", session.event_id)
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

async function handleGetSummary(req: Request, session: Session, db: DbClient): Promise<Response> {
  const mode = await getControlMode(db, session.event_id);
  if (!mode) return fail(req, "Evento no encontrado.", 404);

  if (mode === "controlled") {
    const { data: guests, error } = await db
      .from("guests")
      .select("status, allowed_passes, confirmed_passes")
      .eq("event_id", session.event_id);
    if (error) return fail(req, "No fue posible cargar el resumen.", 500);

    return json(req, {
      total_responses: 0,
      confirmed_people: 0,
      declined_people: 0,
      pending_people: 0,
      last_response_at: null,
      last_sync_at: null,
      total_guests: guests?.length ?? 0,
      total_allowed_passes: (guests ?? []).reduce((sum, guest) => sum + Number(guest.allowed_passes || 0), 0),
      total_confirmed_passes: (guests ?? []).reduce((sum, guest) => sum + Number(guest.confirmed_passes || 0), 0),
      total_pending_guests: (guests ?? []).filter((guest) => guest.status === "pending").length,
    });
  }

  const { data: responses, error } = await db
    .from("responses")
    .select("status, attendee_count, submitted_at")
    .eq("event_id", session.event_id);
  if (error) return fail(req, "No fue posible cargar el resumen.", 500);

  const rows = responses ?? [];
  const confirmed = rows.filter((row) => row.status === "confirmed");
  const declined = rows.filter((row) => row.status === "declined");
  const pending = rows.filter((row) => row.status === "pending");
  const sorted = [...rows].sort((a, b) => Date.parse(b.submitted_at) - Date.parse(a.submitted_at));

  const { data: integration } = await db
    .from("sheet_integrations")
    .select("last_sync_at")
    .eq("event_id", session.event_id)
    .maybeSingle();

  return json(req, {
    total_responses: rows.length,
    confirmed_people: confirmed.reduce((sum, row) => sum + Number(row.attendee_count || 0), 0),
    declined_people: declined.length,
    pending_people: pending.length,
    last_response_at: sorted[0]?.submitted_at ?? null,
    last_sync_at: integration?.last_sync_at ?? null,
  });
}

async function handleGetResponses(req: Request, session: Session, db: DbClient): Promise<Response> {
  const url = new URL(req.url);
  const page = parseBoundedInt(url.searchParams.get("page"), 1, 1, 100000);
  const limit = parseBoundedInt(url.searchParams.get("limit"), 25, 1, 100);
  const status = url.searchParams.get("status")?.trim() ?? "";
  const search = url.searchParams.get("search")?.trim() ?? "";
  const offset = (page - 1) * limit;

  let query = db
    .from("responses")
    .select("*", { count: "exact" })
    .eq("event_id", session.event_id)
    .order("submitted_at", { ascending: false });

  if (["pending", "confirmed", "declined"].includes(status)) query = query.eq("status", status);
  if (search) query = query.ilike("respondent_name", `%${search}%`);
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) return fail(req, "No fue posible cargar las confirmaciones.", 500);
  return json(req, { responses: data ?? [], total: count ?? 0 });
}

async function handleGetGuests(req: Request, session: Session, db: DbClient): Promise<Response> {
  const url = new URL(req.url);
  const page = parseBoundedInt(url.searchParams.get("page"), 1, 1, 100000);
  const limit = parseBoundedInt(url.searchParams.get("limit"), 25, 1, 100);
  const status = url.searchParams.get("status")?.trim() ?? "";
  const search = url.searchParams.get("search")?.trim() ?? "";
  const offset = (page - 1) * limit;

  let query = db
    .from("guests")
    .select("*", { count: "exact" })
    .eq("event_id", session.event_id)
    .order("name", { ascending: true });

  if (["pending", "confirmed", "declined"].includes(status)) query = query.eq("status", status);
  if (search) query = query.ilike("name", `%${search}%`);
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) return fail(req, "No fue posible cargar los invitados.", 500);
  return json(req, { guests: data ?? [], total: count ?? 0 });
}

async function handleCreateGuest(req: Request, session: Session, db: DbClient): Promise<Response> {
  if (await getControlMode(db, session.event_id) !== "controlled") {
    return fail(req, "La lista controlada no está habilitada para este evento.", 409);
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const allowedPasses = Number(body?.allowed_passes);
  if (!name) return fail(req, "El nombre es requerido.");
  if (!Number.isInteger(allowedPasses) || allowedPasses < 1) return fail(req, "Debe tener al menos 1 pase.");

  const { data, error } = await db.from("guests").insert({
    event_id: session.event_id,
    name,
    phone: typeof body?.phone === "string" && body.phone.trim() ? body.phone.trim() : null,
    allowed_passes: allowedPasses,
    confirmed_passes: 0,
    status: "pending",
    notes: typeof body?.notes === "string" && body.notes.trim() ? body.notes.trim() : null,
  }).select().single();

  if (error) {
    console.error("panel-api create guest failed", error.message);
    return fail(req, "No fue posible guardar el invitado.", 500);
  }
  return json(req, data, 201);
}

async function handleUpdateGuest(req: Request, guestId: string, session: Session, db: DbClient): Promise<Response> {
  if (await getControlMode(db, session.event_id) !== "controlled") {
    return fail(req, "La lista controlada no está habilitada para este evento.", 409);
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return fail(req, "Datos inválidos.");

  const { data: existing } = await db
    .from("guests")
    .select("id, allowed_passes, confirmed_passes, status")
    .eq("id", guestId)
    .eq("event_id", session.event_id)
    .maybeSingle();
  if (!existing) return fail(req, "Invitado no encontrado.", 404);

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) return fail(req, "El nombre es requerido.");
    updates.name = name;
  }
  if (body.phone !== undefined) updates.phone = typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : null;
  if (body.notes !== undefined) updates.notes = typeof body.notes === "string" && body.notes.trim() ? body.notes.trim() : null;

  const nextAllowed = body.allowed_passes !== undefined ? Number(body.allowed_passes) : Number(existing.allowed_passes);
  const nextConfirmed = body.confirmed_passes !== undefined ? Number(body.confirmed_passes) : Number(existing.confirmed_passes);
  if (!Number.isInteger(nextAllowed) || nextAllowed < 1) return fail(req, "No se permiten 0 pases.");
  if (!Number.isInteger(nextConfirmed) || nextConfirmed < 0) return fail(req, "Los pases confirmados no son válidos.");
  if (nextConfirmed > nextAllowed) return fail(req, "Los pases confirmados no pueden superar los permitidos.");

  if (body.allowed_passes !== undefined) updates.allowed_passes = nextAllowed;
  if (body.confirmed_passes !== undefined) updates.confirmed_passes = nextConfirmed;

  if (body.status !== undefined) {
    const status = String(body.status);
    if (!["pending", "confirmed", "declined"].includes(status)) return fail(req, "Estado de invitado inválido.");
    updates.status = status;
    if (status === "declined") updates.confirmed_passes = 0;
  }

  const { data, error } = await db
    .from("guests")
    .update(updates)
    .eq("id", guestId)
    .eq("event_id", session.event_id)
    .select()
    .single();

  if (error) {
    console.error("panel-api update guest failed", error.message);
    return fail(req, "No fue posible actualizar el invitado.", 500);
  }
  return json(req, data);
}

async function handleGetIntegration(req: Request, session: Session, db: DbClient): Promise<Response> {
  const { data, error } = await db
    .from("sheet_integrations")
    .select("id, event_id, spreadsheet_id, sheet_name, form_url, enabled, field_mapping, last_sync_at, created_at")
    .eq("event_id", session.event_id)
    .maybeSingle();

  if (error) return fail(req, "No fue posible cargar la integración.", 500);
  if (!data) return json(req, null);
  return json(req, { ...data, credentials_configured: Boolean(GOOGLE_SA_EMAIL && GOOGLE_SA_KEY) });
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function stringToBase64Url(value: string): string {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

async function getGoogleAccessToken(): Promise<string | null> {
  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = stringToBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const payload = stringToBase64Url(JSON.stringify({
      iss: GOOGLE_SA_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }));

    const pemBody = GOOGLE_SA_KEY
      .replace(/\\n/g, "\n")
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\s/g, "");
    const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      "pkcs8",
      keyBytes,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signingInput = `${header}.${payload}`;
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    );
    const jwt = `${signingInput}.${bytesToBase64Url(new Uint8Array(signature))}`;

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });
    const payloadJson = await response.json() as { access_token?: string };
    return response.ok ? payloadJson.access_token ?? null : null;
  } catch (error) {
    console.error("panel-api Google token error", error);
    return null;
  }
}

function canonicalText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeStatus(raw: string): "confirmed" | "declined" | "pending" {
  const value = canonicalText(raw);
  if (!value) return "pending";

  if (
    /^no\b/.test(value) ||
    value.includes("no podre asistir") ||
    value.includes("no asistire") ||
    value.includes("no puedo asistir")
  ) return "declined";

  if (
    /^si\b/.test(value) ||
    value.includes("confirmo mi asistencia") ||
    value.includes("confirmo asistencia") ||
    value === "confirmo" ||
    value.includes("asistire")
  ) return "confirmed";

  return "pending";
}

function parseSheetTimestamp(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const isoLike = /^\d{4}-\d{2}-\d{2}/.test(value);
  if (isoLike) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(value);
  if (match) {
    const [, dayRaw, monthRaw, year, hourRaw = "0", minute = "0", second = "0"] = match;
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const hour = Number(hourRaw);
    if (day < 1 || day > 31 || month < 1 || month > 12 || hour > 23) return null;
    const candidate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${minute}:${second}-06:00`;
    const parsed = new Date(candidate);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function parseAttendeeCount(raw: string, status: "confirmed" | "declined" | "pending"): number | null {
  if (status === "declined" || status === "pending") return 0;
  const match = raw.match(/\d+/);
  if (!match) return null;
  const count = Number(match[0]);
  return Number.isInteger(count) && count >= 1 && count <= 100 ? count : null;
}

function parseAttendeeNames(raw: string): string[] {
  return raw
    .split(/[\n,;]+/)
    .map((name) => name.trim())
    .filter(Boolean);
}

function rawRowObject(headers: string[], row: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((header, index) => {
    if (header) result[header] = row[index] ?? "";
  });
  return result;
}

async function createSyncLog(db: DbClient, eventId: string, integrationId: string, startedAt: string): Promise<string | null> {
  const { data } = await db.from("sync_logs").insert({
    event_id: eventId,
    integration_id: integrationId,
    status: "running",
    started_at: startedAt,
  }).select("id").single();
  return data?.id ?? null;
}

async function finishSyncLog(
  db: DbClient,
  logId: string | null,
  counters: SyncCounters,
  status: "success" | "partial" | "failed",
  finishedAt: string,
  errorMessage?: string,
): Promise<void> {
  if (!logId) return;
  await db.from("sync_logs").update({
    imported_count: counters.imported,
    updated_count: counters.updated,
    skipped_count: counters.skipped,
    error_count: counters.errors,
    status,
    finished_at: finishedAt,
    error_message: errorMessage ?? null,
  }).eq("id", logId);
}

async function handleSync(req: Request, session: Session, db: DbClient): Promise<Response> {
  if (await getControlMode(db, session.event_id) !== "semi_open") {
    return fail(req, "La sincronización de Google Sheets solo aplica a eventos semiabiertos.", 409);
  }

  const startedAt = new Date().toISOString();
  const counters: SyncCounters = { imported: 0, updated: 0, skipped: 0, errors: 0 };

  const { data: integration, error: integrationError } = await db
    .from("sheet_integrations")
    .select("id, spreadsheet_id, sheet_name, enabled, field_mapping")
    .eq("event_id", session.event_id)
    .maybeSingle();

  if (integrationError || !integration || !integration.enabled || !integration.spreadsheet_id) {
    return fail(req, "No hay una integración de Google Sheets activa.", 404);
  }

  const logId = await createSyncLog(db, session.event_id, integration.id, startedAt);

  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) {
    const finishedAt = new Date().toISOString();
    await finishSyncLog(db, logId, counters, "failed", finishedAt, "Credenciales de Google no configuradas.");
    return json(req, {
      imported_count: 0,
      updated_count: 0,
      skipped_count: 0,
      error_count: 0,
      status: "error",
      message: "Google Sheets pendiente de conexión.",
      started_at: startedAt,
      finished_at: finishedAt,
    });
  }

  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    counters.errors = 1;
    const finishedAt = new Date().toISOString();
    await finishSyncLog(db, logId, counters, "failed", finishedAt, "No se pudo autenticar con Google.");
    return fail(req, "No fue posible conectar con Google Sheets.", 502);
  }

  const range = `${integration.sheet_name}!A:Z`;
  const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(integration.spreadsheet_id)}/values/${encodeURIComponent(range)}?majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`;
  const sheetResponse = await fetch(sheetsUrl, { headers: { Authorization: `Bearer ${accessToken}` } });

  if (!sheetResponse.ok) {
    counters.errors = 1;
    const finishedAt = new Date().toISOString();
    await finishSyncLog(db, logId, counters, "failed", finishedAt, `Google Sheets HTTP ${sheetResponse.status}`);
    return fail(req, "No fue posible leer la hoja de confirmaciones.", 502);
  }

  const sheetPayload = await sheetResponse.json() as { values?: unknown[][] };
  const rows = (sheetPayload.values ?? []).map((row) => row.map((value) => String(value ?? "")));
  const headers = rows[0] ?? [];
  const mapping = (integration.field_mapping ?? {}) as Record<string, string>;

  const headerIndex = (logicalName: string): number => {
    const expected = String(mapping[logicalName] ?? "").trim();
    return expected ? headers.findIndex((header) => header.trim() === expected) : -1;
  };

  const indexes = {
    timestamp: headerIndex("timestamp"),
    respondentName: headerIndex("respondent_name"),
    status: headerIndex("attendance_status"),
    attendeeCount: headerIndex("attendee_count"),
    attendeeNames: headerIndex("attendee_names"),
    phone: headerIndex("phone"),
    message: headerIndex("message"),
  };

  if (indexes.timestamp < 0 || indexes.respondentName < 0 || indexes.status < 0) {
    counters.errors = 1;
    const finishedAt = new Date().toISOString();
    await finishSyncLog(db, logId, counters, "failed", finishedAt, "El mapeo de columnas ya no coincide con la hoja.");
    return fail(req, "La estructura de Google Sheets cambió y necesita revisión.", 409);
  }

  for (let rowNumber = 1; rowNumber < rows.length; rowNumber++) {
    const row = rows[rowNumber];
    const timestampRaw = row[indexes.timestamp]?.trim() ?? "";
    const respondentName = row[indexes.respondentName]?.trim() ?? "";
    const statusRaw = row[indexes.status]?.trim() ?? "";
    const phone = indexes.phone >= 0 ? row[indexes.phone]?.trim() ?? "" : "";
    const message = indexes.message >= 0 ? row[indexes.message]?.trim() ?? "" : "";
    const countRaw = indexes.attendeeCount >= 0 ? row[indexes.attendeeCount]?.trim() ?? "" : "";
    const namesRaw = indexes.attendeeNames >= 0 ? row[indexes.attendeeNames]?.trim() ?? "" : "";

    if (!timestampRaw && !respondentName && !statusRaw) {
      counters.skipped++;
      continue;
    }

    const submittedAt = parseSheetTimestamp(timestampRaw);
    const status = normalizeStatus(statusRaw);
    const attendeeCount = parseAttendeeCount(countRaw, status);
    if (!timestampRaw || !respondentName || !submittedAt || attendeeCount === null) {
      counters.errors++;
      continue;
    }

    const externalResponseId = await sha256hex(`${timestampRaw.trim()}::${canonicalText(respondentName)}::${canonicalText(phone)}`);
    const rawData = rawRowObject(headers, row);
    const fingerprint = await sha256hex(JSON.stringify(rawData));
    const storedRawData = { ...rawData, _sync_fingerprint: fingerprint };

    const responseRecord = {
      event_id: session.event_id,
      respondent_name: respondentName,
      phone: phone || null,
      status,
      attendee_count: attendeeCount,
      attendee_names: status === "confirmed" ? parseAttendeeNames(namesRaw) : [],
      message: message || null,
      source: "google_forms",
      submitted_at: submittedAt,
      external_response_id: externalResponseId,
      raw_data: storedRawData,
    };

    const { data: existing, error: lookupError } = await db
      .from("responses")
      .select("id, raw_data")
      .eq("event_id", session.event_id)
      .eq("source", "google_forms")
      .eq("external_response_id", externalResponseId)
      .maybeSingle();

    if (lookupError) {
      counters.errors++;
      continue;
    }

    if (existing) {
      const existingFingerprint = (existing.raw_data as Record<string, unknown> | null)?._sync_fingerprint;
      if (existingFingerprint === fingerprint) {
        counters.skipped++;
        continue;
      }
      const { error: updateError } = await db
        .from("responses")
        .update(responseRecord)
        .eq("id", existing.id)
        .eq("event_id", session.event_id);
      if (updateError) counters.errors++;
      else counters.updated++;
      continue;
    }

    const { error: insertError } = await db.from("responses").insert(responseRecord);
    if (insertError) counters.errors++;
    else counters.imported++;
  }

  const finishedAt = new Date().toISOString();
  const successfulChanges = counters.imported + counters.updated;
  const logStatus: "success" | "partial" | "failed" = counters.errors === 0
    ? "success"
    : successfulChanges > 0
      ? "partial"
      : "failed";

  await finishSyncLog(db, logId, counters, logStatus, finishedAt, counters.errors ? "Una o más filas no pudieron mapearse o guardarse." : undefined);
  await db.from("sheet_integrations").update({ last_sync_at: finishedAt }).eq("id", integration.id);

  const message = counters.errors > 0
    ? `${counters.imported} nuevas, ${counters.updated} actualizadas y ${counters.errors} con datos por revisar.`
    : successfulChanges > 0
      ? `${counters.imported} nuevas y ${counters.updated} actualizadas.`
      : "Sin respuestas nuevas.";

  return json(req, {
    imported_count: counters.imported,
    updated_count: counters.updated,
    skipped_count: counters.skipped,
    error_count: counters.errors,
    status: logStatus,
    message,
    started_at: startedAt,
    finished_at: finishedAt,
  });
}

async function handleExport(req: Request, session: Session, db: DbClient): Promise<Response> {
  const { data, error } = await db
    .from("responses")
    .select("*")
    .eq("event_id", session.event_id)
    .order("submitted_at", { ascending: false });
  if (error) return fail(req, "No fue posible preparar la exportación.", 500);
  return json(req, { responses: data ?? [] });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !isAllowedOrigin(origin)) return fail(req, "Origen no permitido.", 403);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(req) });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const session = await resolveSession(req, db);
    if (!session) return fail(req, "Sesión inválida o expirada.", 401, "SESSION_EXPIRED");

    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/functions\/v1\/panel-api/, "").replace(/\/$/, "") || "/";
    const guestMatch = /^\/guests\/([0-9a-f-]{36})$/i.exec(path);

    if (req.method === "GET" && path === "/event") return await handleGetEvent(req, session, db);
    if (req.method === "GET" && path === "/summary") return await handleGetSummary(req, session, db);
    if (req.method === "GET" && path === "/responses") return await handleGetResponses(req, session, db);
    if (req.method === "GET" && path === "/guests") return await handleGetGuests(req, session, db);
    if (req.method === "POST" && path === "/guests") return await handleCreateGuest(req, session, db);
    if (req.method === "PUT" && guestMatch) return await handleUpdateGuest(req, guestMatch[1], session, db);
    if (req.method === "GET" && path === "/integration") return await handleGetIntegration(req, session, db);
    if (req.method === "POST" && path === "/sync") return await handleSync(req, session, db);
    if (req.method === "GET" && path === "/export") return await handleExport(req, session, db);
    return fail(req, "Not found", 404);
  } catch (error) {
    console.error("panel-api unhandled error", error);
    return fail(req, "Error interno del servidor.", 500);
  }
});
