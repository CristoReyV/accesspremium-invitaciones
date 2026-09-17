// ============================================================
// ACCESSPREMIUM — Dashboard principal del Panel (orquestador)
// ============================================================

import { useState, useCallback } from "react";
import PanelHeader from "../components/PanelHeader";
import PanelNav, { type PanelTab } from "../components/PanelNav";
import PanelSummaryPage from "./PanelSummaryPage";
import PanelResponsesPage from "./PanelResponsesPage";
import PanelMessagesPage from "./PanelMessagesPage";
import PanelGuestsPage from "./PanelGuestsPage";
import PanelIntegrationPage from "./PanelIntegrationPage";
import PanelExportPage from "./PanelExportPage";
import {
  usePanelEvent,
  usePanelSummary,
  usePanelResponses,
  usePanelGuests,
  usePanelSync,
} from "../hooks/usePanelData";
import type { PanelSession, GuestFormData } from "../types";

interface Props {
  session: PanelSession;
  onLogout: () => void;
  onSessionExpired: () => void;
}

const LIMIT = 25;

export default function PanelDashboardPage({ session, onLogout, onSessionExpired }: Props) {
  const [activeTab, setActiveTab] = useState<PanelTab>("summary");
  const [summaryKey, setSummaryKey] = useState(0);
  const [savingGuest, setSavingGuest] = useState(false);

  // Responses pagination/filter state
  const [responsesPage, setResponsesPage] = useState(1);
  const [responsesStatus, setResponsesStatus] = useState("");
  const [responsesSearch, setResponsesSearch] = useState("");

  // Guests pagination/filter state
  const [guestsPage, setGuestsPage] = useState(1);
  const [guestsStatus, setGuestsStatus] = useState("");
  const [guestsSearch, setGuestsSearch] = useState("");

  const token = session.token;

  const { event, loading: eventLoading } = usePanelEvent(token, onSessionExpired);
  const { summary, loading: summaryLoading } = usePanelSummary(token, onSessionExpired, summaryKey);

  const { responses, total: responsesTotal, loading: responsesLoading } = usePanelResponses(
    token,
    onSessionExpired,
    { page: responsesPage, limit: LIMIT, status: responsesStatus, search: responsesSearch },
    summaryKey
  );

  const { guests, total: guestsTotal, loading: guestsLoading, refresh: refreshGuests, createGuest, updateGuest } = usePanelGuests(
    token,
    onSessionExpired,
    { page: guestsPage, limit: LIMIT, status: guestsStatus, search: guestsSearch }
  );

  const { syncing, lastResult, error: syncError, integration, sync } = usePanelSync(token, onSessionExpired);

  const handleSync = useCallback(async () => {
    await sync();
    setSummaryKey((k) => k + 1);
  }, [sync]);

  const handleResponsesFilter = useCallback((status: string, search: string) => {
    setResponsesStatus(status);
    setResponsesSearch(search);
    setResponsesPage(1);
  }, []);

  const handleGuestsFilter = useCallback((status: string, search: string) => {
    setGuestsStatus(status);
    setGuestsSearch(search);
    setGuestsPage(1);
  }, []);

  const handleSaveGuest = useCallback(async (data: GuestFormData, guestId?: string): Promise<{ ok: boolean; error?: string }> => {
    setSavingGuest(true);
    try {
      const result = guestId
        ? await updateGuest(guestId, data)
        : await createGuest(data);
      if (result.ok) {
        refreshGuests();
        setSummaryKey((k) => k + 1);
        return { ok: true };
      } else {
        return { ok: false, error: result.error };
      }
    } finally {
      setSavingGuest(false);
    }
  }, [createGuest, updateGuest, refreshGuests]);

  const lastSyncResult = lastResult
    ? `${lastResult.imported_count} nueva${lastResult.imported_count !== 1 ? "s" : ""} respuesta${lastResult.imported_count !== 1 ? "s" : ""} importada${lastResult.imported_count !== 1 ? "s" : ""}.`
    : null;

  const controlMode = event?.control_mode ?? "semi_open";

  return (
    <div className="panel-shell">
      <PanelHeader event={event} onLogout={onLogout} />
      <PanelNav activeTab={activeTab} onTabChange={setActiveTab} controlMode={controlMode} />

      <main className="panel-content" id="panel-main" role="main">
        {activeTab === "summary" && (
          <PanelSummaryPage
            event={event}
            summary={summary}
            recentResponses={responses.slice(0, 5)}
            summaryLoading={summaryLoading || eventLoading}
            responsesLoading={responsesLoading}
            syncing={syncing}
            lastSyncAt={integration?.last_sync_at ?? null}
            credentialsConfigured={integration?.credentials_configured ?? false}
            onSync={handleSync}
            lastSyncResult={lastSyncResult}
          />
        )}

        {activeTab === "responses" && (
          <PanelResponsesPage
            responses={responses}
            total={responsesTotal}
            loading={responsesLoading}
            page={responsesPage}
            limit={LIMIT}
            onPageChange={setResponsesPage}
            onFilterChange={handleResponsesFilter}
          />
        )}

        {activeTab === "messages" && (
          <PanelMessagesPage
            responses={responses}
            loading={responsesLoading}
          />
        )}

        {activeTab === "guests" && (
          <PanelGuestsPage
            guests={guests}
            total={guestsTotal}
            loading={guestsLoading}
            page={guestsPage}
            limit={LIMIT}
            onPageChange={setGuestsPage}
            onFilterChange={handleGuestsFilter}
            onSaveGuest={handleSaveGuest}
            savingGuest={savingGuest}
          />
        )}

        {activeTab === "integration" && (
          <PanelIntegrationPage
            integration={integration}
            syncing={syncing}
            lastResult={lastResult}
            syncError={syncError}
            onSync={handleSync}
          />
        )}

        {activeTab === "export" && (
          <PanelExportPage
            event={event}
            responses={responses}
            loadingResponses={responsesLoading}
          />
        )}
      </main>
    </div>
  );
}
