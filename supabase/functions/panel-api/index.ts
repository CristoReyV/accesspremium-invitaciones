// ============================================================
// Supabase Edge Function: panel-api
// All endpoints require a valid panel session token.
// Event isolation enforced: session.event_id is always used.
//
// Routes:
//   GET  /event
//   GET  /summary
//   GET  /responses
//   GET  /guests
//   POST /guests
//   PUT  /guests/:id
//   GET  /integration
//   POST /sync
//   GET  /export (returns JSON; client does xlsx)
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GOOGLE_SA_EMAIL = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
const GOOGLE_SA_KEY = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function err(message: string, status = 400, code?: string): Response {
  return json({ ok: false, error: message, ...(code && { code }) }, status);
}

// ---- Auth ----
async function sha256hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

interface Session {
  event_id: string;
  expires_at: string;
}

async function resolveSession(req: Request, db: ReturnType<typeof createClient>): Promise<Session | null> {
  // Support both Bearer header and ?token= query param (for export)
  const authHeader = req.headers.get("Authorization");
  const url = new URL(req.url);
  const raw = authHeader?.replace("Bearer ", "").trim() ?? url.searchParams.get("token");
  if (!raw) return null;

  const tokenHash = await sha256hex(raw);
  const { data: session } = await db
    .from("panel_sessions")
    .select("id, event_id, expires_at")
    .eq("token_hash", tokenHash)
    .single();

  if (!session) return null;
  if (new Date(session.expires_at) < new Date()) {
    await db.from("panel_sessions").delete().eq("token_hash", tokenHash);
    return null;
  }

  await db.from("panel_sessions").update({ last_used_at: new Date().toISOString() }).eq("token_hash", tokenHash);
  return { event_id: session.event_id, expires_at: session.expires_at };
}

// ---- Handlers ----

async function handleGetEvent(session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const { data } = await db
    .from("events")
    .select("id, slug, name, event_date, control_mode, status, url, created_at")
    .eq("id", session.event_id)
    .single();
  return data ? json(data) : err("Evento no encontrado.", 404);
}

async function handleGetSummary(session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const { event_id } = session;

  const { data: ev } = await db.from("events").select("control_mode").eq("id", event_id).single();
  const mode = ev?.control_mode ?? "semi_open";

  if (mode === "semi_open") {
    const { data: responses } = await db
      .from("responses")
      .select("status, attendee_count, submitted_at")
      .eq("event_id", event_id);

    const total_responses = responses?.length ?? 0;
    const confirmed_people = responses?.filter(r => r.status === "confirmed").reduce((a, r) => a + (r.attendee_count || 1), 0) ?? 0;
    const declined_people = responses?.filter(r => r.status === "declined").reduce((a, r) => a + (r.attendee_count || 1), 0) ?? 0;
    const pending_people = responses?.filter(r => r.status === "pending").reduce((a, r) => a + (r.attendee_count || 1), 0) ?? 0;
    const sorted = [...(responses ?? [])].sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
    const last_response_at = sorted[0]?.submitted_at ?? null;

    const { data: si } = await db.from("sheet_integrations").select("last_sync_at").eq("event_id", event_id).single();

    return json({ total_responses, confirmed_people, declined_people, pending_people, last_response_at, last_sync_at: si?.last_sync_at ?? null });
  } else {
    // controlled mode
    const { data: guests } = await db
      .from("guests")
      .select("status, allowed_passes, confirmed_passes")
      .eq("event_id", event_id);

    const total_guests = guests?.length ?? 0;
    const total_allowed_passes = guests?.reduce((a, g) => a + g.allowed_passes, 0) ?? 0;
    const total_confirmed_passes = guests?.reduce((a, g) => a + g.confirmed_passes, 0) ?? 0;
    const total_pending_guests = guests?.filter(g => g.status === "pending").length ?? 0;

    return json({ total_responses: 0, confirmed_people: 0, declined_people: 0, pending_people: 0, last_response_at: null, last_sync_at: null, total_guests, total_allowed_passes, total_confirmed_passes, total_pending_guests });
  }
}

async function handleGetResponses(req: Request, session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "25")));
  const status = url.searchParams.get("status") ?? "";
  const search = url.searchParams.get("search") ?? "";
  const offset = (page - 1) * limit;

  let query = db.from("responses").select("*", { count: "exact" }).eq("event_id", session.event_id).order("submitted_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (search) query = query.ilike("respondent_name", `%${search}%`);
  query = query.range(offset, offset + limit - 1);

  const { data: responses, count } = await query;
  return json({ responses: responses ?? [], total: count ?? 0 });
}

async function handleGetGuests(req: Request, session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(url.searchParams.get("limit") ?? "25"));
  const status = url.searchParams.get("status") ?? "";
  const search = url.searchParams.get("search") ?? "";
  const offset = (page - 1) * limit;

  let query = db.from("guests").select("*", { count: "exact" }).eq("event_id", session.event_id).order("name");
  if (status) query = query.eq("status", status);
  if (search) query = query.ilike("name", `%${search}%`);
  query = query.range(offset, offset + limit - 1);

  const { data: guests, count } = await query;
  return json({ guests: guests ?? [], total: count ?? 0 });
}

async function handleCreateGuest(req: Request, session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const body = await req.json().catch(() => null);
  if (!body?.name) return err("El nombre es requerido.");
  if (!body.allowed_passes || body.allowed_passes < 1) return err("Debe tener al menos 1 pase.");

  const { data, error: dbErr } = await db.from("guests").insert({
    event_id: session.event_id,
    name: String(body.name).trim(),
    phone: body.phone ? String(body.phone).trim() : null,
    allowed_passes: Number(body.allowed_passes),
    confirmed_passes: 0,
    status: "pending",
    notes: body.notes ? String(body.notes).trim() : null,
  }).select().single();

  if (dbErr) return err(dbErr.message);
  return json(data, 201);
}

async function handleUpdateGuest(guestId: string, req: Request, session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const body = await req.json().catch(() => null);
  if (!body) return err("Body requerido.");

  // Verify guest belongs to this event (event isolation)
  const { data: existing } = await db.from("guests").select("id, allowed_passes, confirmed_passes").eq("id", guestId).eq("event_id", session.event_id).single();
  if (!existing) return err("Invitado no encontrado.", 404);

  const updates: Record<string, unknown> = {};
  if (body.name) updates.name = String(body.name).trim();
  if (body.phone !== undefined) updates.phone = body.phone ? String(body.phone).trim() : null;
  if (body.notes !== undefined) updates.notes = body.notes ? String(body.notes).trim() : null;
  if (body.status && ["pending", "confirmed", "declined"].includes(body.status)) updates.status = body.status;
  if (body.allowed_passes !== undefined) {
    const ap = Number(body.allowed_passes);
    if (ap < 1) return err("No se permiten 0 pases.");
    updates.allowed_passes = ap;
  }
  if (body.confirmed_passes !== undefined) {
    const cp = Number(body.confirmed_passes);
    const ap = (updates.allowed_passes as number) ?? existing.allowed_passes;
    if (cp > ap) return err(`Los pases confirmados (${cp}) no pueden superar los permitidos (${ap}).`);
    updates.confirmed_passes = cp;
  }
  updates.updated_at = new Date().toISOString();

  const { data, error: dbErr } = await db.from("guests").update(updates).eq("id", guestId).eq("event_id", session.event_id).select().single();
  if (dbErr) return err(dbErr.message);
  return json(data);
}

async function handleGetIntegration(session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const { data } = await db.from("sheet_integrations").select("*").eq("event_id", session.event_id).single();
  if (!data) return json(null);

  // Add credentials_configured derived field (do not expose keys)
  const credentialsConfigured = !!(GOOGLE_SA_EMAIL && GOOGLE_SA_KEY);
  return json({ ...data, credentials_configured: credentialsConfigured });
}

// ---- Google Sheets Sync ----

async function getGoogleAccessToken(): Promise<string | null> {
  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      iss: GOOGLE_SA_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }));

    const key = GOOGLE_SA_KEY
      .replace(/\\n/g, "\n")
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/\s/g, "");

    const keyData = Uint8Array.from(atob(key), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8", keyData.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false, ["sign"]
    );

    const signingInput = `${header}.${payload}`;
    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signingInput));
    const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const jwt = `${signingInput}.${sig}`;

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

function normalizeStatus(rawValue: string | undefined): "confirmed" | "declined" | "error" {
  if (!rawValue) return "error";
  const v = rawValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  if (v.includes("confirmo") || v.includes("si") || v.includes("asistiré") || v.includes("asistire") || v.includes("confirmar")) return "confirmed";
  if (v.includes("no") || v.includes("decline") || v.includes("no asis") || v.includes("no podré") || v.includes("no podre")) return "declined";
  return "error";
}

async function handleSync(session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const startedAt = new Date().toISOString();

  // Get integration
  const { data: integration } = await db
    .from("sheet_integrations")
    .select("*")
    .eq("event_id", session.event_id)
    .single();

  if (!integration) {
    return err("No hay integración de Google Sheets configurada.", 404);
  }

  // Check credentials
  if (!GOOGLE_SA_EMAIL || !GOOGLE_SA_KEY) {
    return json({
      ok: false,
      imported_count: 0, updated_count: 0, skipped_count: 0, error_count: 0,
      status: "error",
      message: "Google Sheets pendiente de conexión. Configura las credenciales del service account.",
      started_at: startedAt,
      finished_at: new Date().toISOString(),
    });
  }

  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    await db.from("sync_logs").insert({
      event_id: session.event_id,
      imported_count: 0, updated_count: 0, skipped_count: 0, error_count: 1,
      status: "error",
      error_message: "No se pudo obtener token de Google.",
      started_at: startedAt,
      finished_at: new Date().toISOString(),
    });
    return err("Error de autenticación con Google Sheets.", 500);
  }

  // Fetch sheet data
  const spreadsheetId = integration.spreadsheet_id;
  const sheetName = integration.sheet_name;
  const range = `${encodeURIComponent(sheetName)}!A:H`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const sheetsRes = await fetch(url, { headers: { "Authorization": `Bearer ${accessToken}` } });
  if (!sheetsRes.ok) {
    return err("Error al acceder a Google Sheets.", 500);
  }
  const sheetsData = await sheetsRes.json();
  const rows: string[][] = sheetsData.values ?? [];

  if (rows.length <= 1) {
    // Only header or empty
    await db.from("sync_logs").insert({
      event_id: session.event_id, imported_count: 0, updated_count: 0, skipped_count: 0, error_count: 0,
      status: "success", started_at: startedAt, finished_at: new Date().toISOString(),
    });
    await db.from("sheet_integrations").update({ last_sync_at: new Date().toISOString() }).eq("id", integration.id);
    return json({ ok: true, imported_count: 0, updated_count: 0, skipped_count: 0, error_count: 0, status: "success", message: "Sin respuestas nuevas.", started_at: startedAt, finished_at: new Date().toISOString() });
  }

  const dataRows = rows.slice(1); // Skip header
  let imported = 0, updated = 0, skipped = 0, errorCount = 0;

  for (const row of dataRows) {
    const [timestamp, nombre, asistencia, cuantos, nombres, whatsapp, mensaje] = row;
    if (!timestamp || !nombre) { skipped++; continue; }

    // Deterministic external_response_id: sha256(timestamp + nombre)
    const externalId = await sha256hex(`${timestamp}::${nombre}`);

    // Parse values
    const statusResult = normalizeStatus(asistencia);
    const attendeeCount = parseInt(cuantos ?? "1") || 1;
    const submittedAt = new Date(timestamp).toISOString();

    const rawData = { timestamp, nombre, asistencia, cuantos, nombres, whatsapp, mensaje };

    // Check if already exists (idempotent)
    const { data: existing } = await db
      .from("responses")
      .select("id")
      .eq("event_id", session.event_id)
      .eq("external_response_id", externalId)
      .single();

    if (existing) {
      skipped++;
      continue;
    }

    if (statusResult === "error") {
      // Save with raw data but log mapping error
      await db.from("responses").insert({
        event_id: session.event_id,
        respondent_name: nombre.trim(),
        phone: whatsapp?.trim() || null,
        status: "pending",
        attendee_count: attendeeCount,
        attendee_names: nombres?.trim() || null,
        message: mensaje?.trim() || null,
        source: "google_forms",
        submitted_at: submittedAt,
        external_response_id: externalId,
        raw_data: rawData,
      });
      errorCount++;
    } else {
      await db.from("responses").insert({
        event_id: session.event_id,
        respondent_name: nombre.trim(),
        phone: whatsapp?.trim() || null,
        status: statusResult,
        attendee_count: attendeeCount,
        attendee_names: nombres?.trim() || null,
        message: mensaje?.trim() || null,
        source: "google_forms",
        submitted_at: submittedAt,
        external_response_id: externalId,
        raw_data: rawData,
      });
      imported++;
    }
  }

  const finishedAt = new Date().toISOString();
  await db.from("sync_logs").insert({
    event_id: session.event_id,
    imported_count: imported, updated_count: updated, skipped_count: skipped, error_count: errorCount,
    status: "success", started_at: startedAt, finished_at: finishedAt,
  });
  await db.from("sheet_integrations").update({ last_sync_at: finishedAt }).eq("id", integration.id);

  const totalNew = imported + errorCount;
  const message = totalNew > 0
    ? `${imported} nueva${imported !== 1 ? "s" : ""} respuesta${imported !== 1 ? "s" : ""} importada${imported !== 1 ? "s" : ""}.${errorCount > 0 ? ` ${errorCount} con estado desconocido.` : ""}`
    : "Sin respuestas nuevas.";

  return json({ ok: true, imported_count: imported, updated_count: updated, skipped_count: skipped, error_count: errorCount, status: "success", message, started_at: startedAt, finished_at: finishedAt });
}

async function handleExport(session: Session, db: ReturnType<typeof createClient>): Promise<Response> {
  const { data: responses } = await db
    .from("responses")
    .select("*")
    .eq("event_id", session.event_id)
    .order("submitted_at", { ascending: false });
  return json({ responses: responses ?? [] });
}

// ---- Dispatcher ----
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const session = await resolveSession(req, db);

  if (!session) return err("Sesión inválida o expirada.", 401, "SESSION_EXPIRED");

  const url = new URL(req.url);
  const path = url.pathname.replace(/\/functions\/v1\/panel-api/, "").replace(/\/$/, "");
  const guestMatch = path.match(/^\/guests\/([a-z0-9-]+)$/);

  try {
    if (req.method === "GET" && path === "/event") return await handleGetEvent(session, db);
    if (req.method === "GET" && path === "/summary") return await handleGetSummary(session, db);
    if (req.method === "GET" && path === "/responses") return await handleGetResponses(req, session, db);
    if (req.method === "GET" && path === "/guests") return await handleGetGuests(req, session, db);
    if (req.method === "POST" && path === "/guests") return await handleCreateGuest(req, session, db);
    if (req.method === "PUT" && guestMatch) return await handleUpdateGuest(guestMatch[1], req, session, db);
    if (req.method === "GET" && path === "/integration") return await handleGetIntegration(session, db);
    if (req.method === "POST" && path === "/sync") return await handleSync(session, db);
    if (req.method === "GET" && path === "/export") return await handleExport(session, db);
    return err("Not found", 404);
  } catch (e) {
    console.error("panel-api error:", e);
    return err("Error interno del servidor.", 500);
  }
});
