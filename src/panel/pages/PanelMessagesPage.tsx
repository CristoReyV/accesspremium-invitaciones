// ============================================================
// ACCESSPREMIUM — Vista de Mensajes
// ============================================================

import { formatDateTime } from "../utils/formatters";
import type { EventResponse } from "../types";

interface Props {
  responses: EventResponse[];
  loading: boolean;
}

export default function PanelMessagesPage({ responses, loading }: Props) {
  const messages = responses.filter((r) => r.message && r.message.trim().length > 0);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.01em" }}>
        Mensajes para ustedes
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
        Mensajes especiales que sus invitados han querido compartir.
      </p>

      {loading ? (
        <div className="panel-loading"><span className="spinner" /> Cargando mensajes...</div>
      ) : messages.length === 0 ? (
        <div className="panel-empty">
          <div className="panel-empty__icon">❝</div>
          <div className="panel-empty__title">Aún no hay mensajes</div>
          <div className="panel-empty__text">
            Cuando tus invitados confirmen y dejen un mensaje, aparecerán aquí.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((r) => (
            <div
              key={r.id}
              className="panel-card"
              style={{ borderLeft: "4px solid #D4AF37" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>
                    {r.respondent_name}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                    {formatDateTime(r.submitted_at)}
                  </div>
                </div>
                <span className={`badge badge--${r.status}`} style={{ flexShrink: 0 }}>
                  {r.status === "confirmed" ? "Confirmado" : r.status === "declined" ? "No asistirá" : "Pendiente"}
                </span>
              </div>
              <blockquote style={{
                fontStyle: "italic",
                color: "#374151",
                fontSize: 15,
                lineHeight: 1.7,
                margin: 0,
                paddingLeft: 16,
                borderLeft: "none",
              }}>
                "{r.message}"
              </blockquote>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
