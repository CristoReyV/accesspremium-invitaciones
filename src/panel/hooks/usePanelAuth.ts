// ============================================================
// ACCESSPREMIUM — Hook de autenticación del panel
// ============================================================

import { useState, useEffect, useCallback } from "react";
import {
  login as loginService,
  logout as logoutService,
  validateSession,
  saveSessionToken,
  getSessionToken,
  clearSessionToken,
} from "../services/panelAuthService";
import type { PanelSession } from "../types";

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; session: PanelSession };

export function usePanelAuth() {
  const [state, setState] = useState<AuthState>({ status: "loading" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Validate existing session on mount
  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      setState({ status: "unauthenticated" });
      return;
    }
    validateSession(token).then((result) => {
      if (result.ok && result.data.valid) {
        setState({
          status: "authenticated",
          session: {
            token,
            event_id: result.data.event_id!,
            event_slug: result.data.event_slug!,
            expires_at: result.data.expires_at!,
          },
        });
      } else {
        clearSessionToken();
        setState({ status: "unauthenticated" });
      }
    });
  }, []);

  const login = useCallback(async (code: string) => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const result = await loginService(code);
      if (result.ok) {
        saveSessionToken(result.data.token);
        setState({
          status: "authenticated",
          session: {
            token: result.data.token,
            event_id: result.data.event_id,
            event_slug: result.data.event_slug,
            expires_at: result.data.expires_at,
          },
        });
      } else {
        setLoginError(result.error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const token = getSessionToken();
    if (token) {
      await logoutService(token);
    }
    clearSessionToken();
    setState({ status: "unauthenticated" });
  }, []);

  const handleSessionExpired = useCallback(() => {
    clearSessionToken();
    setState({ status: "unauthenticated" });
  }, []);

  return { state, login, logout, loginError, isLoggingIn, handleSessionExpired };
}
