// ============================================================
// ACCESSPREMIUM — Panel API Service
// Llamadas al backend Supabase Edge Function panel-api
// ============================================================

import type {
  ApiResult,
  DashboardSummary,
  EventResponse,
  Guest,
  GuestFormData,
  PanelEvent,
  SheetIntegration,
  SyncResult,
} from "../types";

const PANEL_API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/panel-api`;

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

async function apiFetch<T>(
  token: string,
  path: string,
  options?: RequestInit
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${PANEL_API_URL}${path}`, {
      ...options,
      headers: authHeaders(token),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        return { ok: false, error: "Sesión expirada. Por favor vuelve a ingresar.", code: "SESSION_EXPIRED" };
      }
      return { ok: false, error: data.error ?? "Error inesperado.", code: data.code };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Error de conexión." };
  }
}

// ---- Event ----
export async function getEvent(token: string): Promise<ApiResult<PanelEvent>> {
  return apiFetch<PanelEvent>(token, "/event");
}

// ---- Summary ----
export async function getSummary(token: string): Promise<ApiResult<DashboardSummary>> {
  return apiFetch<DashboardSummary>(token, "/summary");
}

// ---- Responses ----
export async function getResponses(
  token: string,
  params?: { page?: number; limit?: number; status?: string; search?: string }
): Promise<ApiResult<{ responses: EventResponse[]; total: number }>> {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  return apiFetch<{ responses: EventResponse[]; total: number }>(token, `/responses?${q}`);
}

// ---- Guests ----
export async function getGuests(
  token: string,
  params?: { page?: number; limit?: number; status?: string; search?: string }
): Promise<ApiResult<{ guests: Guest[]; total: number }>> {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  return apiFetch<{ guests: Guest[]; total: number }>(token, `/guests?${q}`);
}

export async function createGuest(token: string, data: GuestFormData): Promise<ApiResult<Guest>> {
  return apiFetch<Guest>(token, "/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateGuest(
  token: string,
  guestId: string,
  data: Partial<GuestFormData> & { status?: string; confirmed_passes?: number }
): Promise<ApiResult<Guest>> {
  return apiFetch<Guest>(token, `/guests/${guestId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ---- Sheet Integration ----
export async function getSheetIntegration(token: string): Promise<ApiResult<SheetIntegration | null>> {
  return apiFetch<SheetIntegration | null>(token, "/integration");
}

// ---- Sync ----
export async function syncResponses(token: string): Promise<ApiResult<SyncResult>> {
  return apiFetch<SyncResult>(token, "/sync", { method: "POST" });
}

// ---- Export ----
export async function getExportUrl(token: string): Promise<string> {
  return `${PANEL_API_URL}/export?token=${encodeURIComponent(token)}`;
}
