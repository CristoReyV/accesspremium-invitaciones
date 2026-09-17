// ============================================================
// ACCESSPREMIUM — Dashboard / Resumen del Panel
// ============================================================

import { formatDate, formatRelative, statusLabel } from "../utils/formatters";
import type { DashboardSummary, EventResponse, PanelEvent } from "../types";

interface RecentResponseProps {
  response: EventResponse;
}

function RecentResponseCard({ response }: RecentResponseProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid #f0ede8",
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>
          {response.respondent_name}
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          {response.attendee_count > 0 ? `${response.attendee_count} asistente${response.attendee_count !== 1 ? "s" : ""}` : ""}
          {" · "}
          {formatRelative(response.submitted_at)}
        </div>
      </div>
      <span className={`badge badge--${response.status}`}>
        {statusLabel(response.status)}
      </span>
    </div>
  );
}

interface Props {
  event: PanelEvent | null;
  summary: DashboardSummary | null;
  recentResponses: EventResponse[];
  summaryLoading: boolean;
  responsesLoading: boolean;
  syncing: boolean;
  lastSyncAt: string | null;
  credentialsConfigured: boolean;
  onSync: () => void;
  lastSyncResult: string | null;
}

export default function PanelSummaryPage({
  event,
  summary,
  recentResponses,
  summaryLoading,
  responsesLoading,
  syncing,
  lastSyncAt,
  credentialsConfigured,
  onSync,
  lastSyncResult,
}: Props) {
  const isSemiOpen = event?.control_mode === "semi_open";
  const isControlled = event?.control_mode === "controlled";

  return (
    <div>
      {/* Event header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em", marginBottom: 4 }}>
          {event?.name ?? "Mi evento"}
        </h1>
        {event?.event_date && (
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            {formatDate(event.event_date)}
          </p>
        )}
      </div>

      {/* Sync bar (semi_open only) */}
      {isSemiOpen && (
        <div className="panel-sync">
          <div className="panel-sync__info">
            <div className="panel-sync__label">Última sincronización</div>
            <div className="panel-sync__value">
              {lastSyncAt ? formatRelative(lastSyncAt) : "Sin sincronizar"}
            </div>
            {lastSyncResult && (
              <div style={{ fontSize: 12, color: "#059669", marginTop: 2 }}>{lastSyncResult}</div>
            )}
            {!credentialsConfigured && (
              <div style={{ fontSize: 12, color: "#B45309", marginTop: 2 }}>
                ⚠ Google Sheets pendiente de conexión
              </div>
            )}
          </div>
          <button
            className="btn btn--primary"
            onClick={onSync}
            disabled={syncing || !credentialsConfigured}
            aria-busy={syncing}
          >
            {syncing ? (
              <><span className="spinner" style={{ width: 14, height: 14 }} /> Sincronizando...</>
            ) : (
              <> ⟳ Sincronizar respuestas</>
            )}
          </button>
        </div>
      )}

      {/* Stats */}
      {summaryLoading ? (
        <div className="panel-loading"><span className="spinner" /> Cargando resumen...</div>
      ) : (
        <div className="panel-stats">
          {isSemiOpen && (
            <>
              <div className="panel-stat panel-stat--gold">
                <div className="panel-stat__value">{summary?.total_responses ?? 0}</div>
                <div className="panel-stat__label">Respuestas</div>
              </div>
              <div className="panel-stat panel-stat--green">
                <div className="panel-stat__value">{summary?.confirmed_people ?? 0}</div>
                <div className="panel-stat__label">Personas confirmadas</div>
              </div>
              <div className="panel-stat panel-stat--red">
                <div className="panel-stat__value">{summary?.declined_people ?? 0}</div>
                <div className="panel-stat__label">No asistirán</div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat__value">{summary?.pending_people ?? 0}</div>
                <div className="panel-stat__label">Pendientes</div>
              </div>
            </>
          )}
          {isControlled && (
            <>
              <div className="panel-stat panel-stat--gold">
                <div className="panel-stat__value">{summary?.total_guests ?? 0}</div>
                <div className="panel-stat__label">Invitados</div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat__value">{summary?.total_allowed_passes ?? 0}</div>
                <div className="panel-stat__label">Pases asignados</div>
              </div>
              <div className="panel-stat panel-stat--green">
                <div className="panel-stat__value">{summary?.total_confirmed_passes ?? 0}</div>
                <div className="panel-stat__label">Confirmados</div>
              </div>
              <div className="panel-stat">
                <div className="panel-stat__value">{summary?.total_pending_guests ?? 0}</div>
                <div className="panel-stat__label">Pendientes</div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Recent activity (semi_open) */}
      {isSemiOpen && (
        <div className="panel-card">
          <div className="panel-card__header">
            <h2 className="panel-card__title">Últimas confirmaciones</h2>
          </div>
          {responsesLoading ? (
            <div className="panel-loading"><span className="spinner" /> Cargando...</div>
          ) : recentResponses.length === 0 ? (
            <div className="panel-empty">
              <div className="panel-empty__icon">✉</div>
              <div className="panel-empty__title">Aún no hay respuestas</div>
              <div className="panel-empty__text">
                Las respuestas de tu invitación aparecerán aquí una vez que los invitados confirmen.
              </div>
            </div>
          ) : (
            <div>
              {recentResponses.map((r) => (
                <RecentResponseCard key={r.id} response={r} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
