// ============================================================
// ACCESSPREMIUM — Panel Auth Service
// Llamadas al backend Supabase Edge Function panel-auth
// ============================================================

import type { ApiResult, LoginResponse, ValidateSessionResponse } from "../types";

const PANEL_AUTH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/panel-auth`;
const SESSION_KEY = "panel_session_token";

// ---- Storage helpers (sessionStorage) ----

export function saveSessionToken(token: string): void {
  sessionStorage.setItem(SESSION_KEY, token);
}

export function getSessionToken(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function clearSessionToken(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// ---- Auth API calls ----

export async function login(code: string): Promise<ApiResult<LoginResponse>> {
  try {
    const res = await fetch(`${PANEL_AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Código de acceso inválido.", code: data.code };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Error de conexión. Intenta de nuevo." };
  }
}

export async function logout(token: string): Promise<void> {
  try {
    await fetch(`${PANEL_AUTH_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  } catch {
    // Silently fail — session will expire on server side
  } finally {
    clearSessionToken();
  }
}

export async function validateSession(token: string): Promise<ApiResult<ValidateSessionResponse>> {
  try {
    const res = await fetch(`${PANEL_AUTH_URL}/validate-session`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Sesión inválida.", code: data.code };
    }
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Error de conexión." };
  }
}
