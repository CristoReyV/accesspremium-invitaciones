// ============================================================
// ACCESSPREMIUM — Hook de datos del panel
// ============================================================

import { useState, useEffect, useCallback } from "react";
import * as api from "../services/panelApiService";
import type {
  DashboardSummary,
  EventResponse,
  Guest,
  GuestFormData,
  PanelEvent,
  SheetIntegration,
  SyncResult,
} from "../types";

export function usePanelEvent(token: string | null, onExpired: () => void) {
  const [event, setEvent] = useState<PanelEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getEvent(token).then((result) => {
      if (result.ok) {
        setEvent(result.data);
      } else {
        if (result.code === "SESSION_EXPIRED") onExpired();
        else setError(result.error);
      }
      setLoading(false);
    });
  }, [token, onExpired]);

  return { event, loading, error };
}

export function usePanelSummary(token: string | null, onExpired: () => void, refreshKey = 0) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getSummary(token).then((result) => {
      if (result.ok) {
        setSummary(result.data);
      } else {
        if (result.code === "SESSION_EXPIRED") onExpired();
        else setError(result.error);
      }
      setLoading(false);
    });
  }, [token, onExpired, refreshKey]);

  return { summary, loading, error };
}

export function usePanelResponses(
  token: string | null,
  onExpired: () => void,
  params: { page: number; limit: number; status?: string; search?: string },
  refreshKey = 0
) {
  const [responses, setResponses] = useState<EventResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getResponses(token, params).then((result) => {
      if (result.ok) {
        setResponses(result.data.responses);
        setTotal(result.data.total);
      } else {
        if (result.code === "SESSION_EXPIRED") onExpired();
        else setError(result.error);
      }
      setLoading(false);
    });
  }, [token, onExpired, params.page, params.limit, params.status, params.search, refreshKey]);

  return { responses, total, loading, error };
}

export function usePanelGuests(
  token: string | null,
  onExpired: () => void,
  params: { page: number; limit: number; status?: string; search?: string },
  refreshKey = 0
) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!token) return;
    setLoading(true);
    api.getGuests(token, params).then((result) => {
      if (result.ok) {
        setGuests(result.data.guests);
        setTotal(result.data.total);
      } else {
        if (result.code === "SESSION_EXPIRED") onExpired();
        else setError(result.error);
      }
      setLoading(false);
    });
  }, [token, onExpired, params.page, params.limit, params.status, params.search, refreshKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createGuest = useCallback(async (data: GuestFormData) => {
    if (!token) return { ok: false as const, error: "Sin sesión" };
    return api.createGuest(token, data);
  }, [token]);

  const updateGuest = useCallback(async (
    guestId: string,
    data: Partial<GuestFormData> & { status?: string; confirmed_passes?: number }
  ) => {
    if (!token) return { ok: false as const, error: "Sin sesión" };
    return api.updateGuest(token, guestId, data);
  }, [token]);

  return { guests, total, loading, error, refresh, createGuest, updateGuest };
}

export function usePanelSync(token: string | null, onExpired: () => void) {
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<SyncResult | null>(null);
  const [error, setSyncError] = useState<string | null>(null);
  const [integration, setIntegration] = useState<SheetIntegration | null>(null);

  const refreshIntegration = useCallback(async (): Promise<void> => {
    if (!token) return;
    const result = await api.getSheetIntegration(token);
    if (result.ok) {
      setIntegration(result.data);
      return;
    }
    if (result.code === "SESSION_EXPIRED") onExpired();
  }, [token, onExpired]);

  useEffect(() => {
    void refreshIntegration();
  }, [refreshIntegration]);

  const sync = useCallback(async (): Promise<void> => {
    if (!token || syncing) return;
    setSyncing(true);
    setSyncError(null);
    const result = await api.syncResponses(token);

    if (result.ok) {
      setLastResult(result.data);
      // The backend updates sheet_integrations.last_sync_at after every completed
      // synchronization. Reload it so both Resumen and Integración reflect the
      // new timestamp immediately without requiring a page refresh.
      await refreshIntegration();
    } else if (result.code === "SESSION_EXPIRED") {
      onExpired();
    } else {
      setSyncError(result.error);
    }

    setSyncing(false);
  }, [token, syncing, onExpired, refreshIntegration]);

  return { syncing, lastResult, error, integration, sync, refreshIntegration };
}
