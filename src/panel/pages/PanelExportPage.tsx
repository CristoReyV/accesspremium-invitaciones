// ============================================================
// ACCESSPREMIUM — Exportación Excel
// ============================================================

import { useState } from "react";
import { exportResponsesToExcel } from "../utils/exportExcel";
import type { EventResponse, PanelEvent } from "../types";

interface Props {
  event: PanelEvent | null;
  responses: EventResponse[];
  loadingResponses: boolean;
}

export default function PanelExportPage({ event, responses, loadingResponses }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!event || responses.length === 0) return;
    setExporting(true);
    try {
      exportResponsesToExcel(responses, event.slug);
    } catch (e) {
      console.error("Error al exportar:", e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.01em" }}>
        Exportar confirmaciones
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
        Descarga un archivo Excel con todas las confirmaciones de tu evento.
      </p>

      <div className="panel-card">
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "#374151", marginBottom: 8, fontWeight: 600 }}>
            Información incluida:
          </div>
          <ul style={{ fontSize: 13, color: "#6b7280", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Fecha de respuesta</li>
            <li>Nombre del invitado</li>
            <li>Estado (Confirmado / No asistirá)</li>
            <li>Número de asistentes</li>
            <li>Nombres de asistentes</li>
            <li>WhatsApp de contacto</li>
            <li>Mensaje para los novios</li>
            <li>Origen (Google Forms / Manual)</li>
          </ul>
        </div>

        <div style={{ marginBottom: 16, padding: "12px 16px", background: "#f9f8f6", borderRadius: 10, fontSize: 13, color: "#6b7280" }}>
          📊 {responses.length} respuesta{responses.length !== 1 ? "s" : ""} disponible{responses.length !== 1 ? "s" : ""}
          {event && ` · confirmaciones-${event.slug}.xlsx`}
        </div>

        <button
          className="btn btn--primary"
          onClick={handleExport}
          disabled={exporting || loadingResponses || responses.length === 0}
          aria-busy={exporting}
        >
          {exporting ? (
            <><span className="spinner" style={{ width: 14, height: 14 }} /> Generando archivo...</>
          ) : (
            "↓ Exportar Excel"
          )}
        </button>

        {responses.length === 0 && !loadingResponses && (
          <div style={{ marginTop: 12, fontSize: 12, color: "#9ca3af" }}>
            Aún no hay respuestas para exportar.
          </div>
        )}
      </div>
    </div>
  );
}
