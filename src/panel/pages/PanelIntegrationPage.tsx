// ============================================================
// ACCESSPREMIUM — Pantalla de Integración Google Sheets
// ============================================================

import { formatDateTime } from "../utils/formatters";
import type { SheetIntegration, SyncResult } from "../types";

interface Props {
  integration: SheetIntegration | null;
  syncing: boolean;
  lastResult: SyncResult | null;
  syncError: string | null;
  onSync: () => void;
}

export default function PanelIntegrationPage({
  integration,
  syncing,
  lastResult,
  syncError,
  onSync,
}: Props) {
  const hasCredentials = integration?.credentials_configured;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.01em" }}>
        Integración Google Sheets
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
        Sincroniza automáticamente las respuestas de tu Google Forms.
      </p>

      {/* Status card */}
      <div className="panel-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: hasCredentials ? "#059669" : "#F59E0B",
            flexShrink: 0,
          }} />
          <span style={{ fontWeight: 600, fontSize: 15 }}>
            {hasCredentials ? "Integración activa" : "Pendiente de configuración"}
          </span>
        </div>

        {!hasCredentials ? (
          <div style={{
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 20,
          }}>
            <div style={{ fontWeight: 600, color: "#92400E", marginBottom: 8 }}>
              ⚠ Google Sheets pendiente de conexión
            </div>
            <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>
              Para activar la sincronización automática, solicita a AccessPremium que configure
              las credenciales de la cuenta de servicio de Google.
              <br /><br />
              <strong>Pasos requeridos por el administrador:</strong>
              <ol style={{ paddingLeft: 16, marginTop: 8 }}>
                <li>Crear o proporcionar un Google Service Account</li>
                <li>Configurar <code>GOOGLE_SERVICE_ACCOUNT_EMAIL</code> en Supabase Edge Functions</li>
                <li>Configurar <code>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code> en Supabase Edge Functions</li>
                <li>Compartir la hoja con el email de la cuenta de servicio</li>
              </ol>
            </div>
          </div>
        ) : (
          <>
            {integration && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Spreadsheet ID
                  </div>
                  <div style={{ fontSize: 13, fontFamily: "monospace", color: "#374151", wordBreak: "break-all" }}>
                    {integration.spreadsheet_id}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Pestaña
                  </div>
                  <div style={{ fontSize: 13, color: "#374151" }}>{integration.sheet_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Última sincronización
                  </div>
                  <div style={{ fontSize: 13, color: "#374151" }}>
                    {formatDateTime(integration.last_sync_at)}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <button
          className="btn btn--primary"
          onClick={onSync}
          disabled={syncing || !hasCredentials}
          aria-busy={syncing}
        >
          {syncing
            ? <><span className="spinner" style={{ width: 14, height: 14 }} /> Sincronizando...</>
            : "⟳ Sincronizar ahora"
          }
        </button>
      </div>

      {/* Last sync result */}
      {lastResult && (
        <div className="panel-card" style={{ borderLeft: `4px solid ${lastResult.status === "success" ? "#059669" : "#dc2626"}` }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: lastResult.status === "success" ? "#059669" : "#dc2626" }}>
            {lastResult.status === "success" ? "✓ Sincronización completada" : "✗ Error en la sincronización"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 16 }}>
            {[
              { label: "Importadas", value: lastResult.imported_count },
              { label: "Actualizadas", value: lastResult.updated_count },
              { label: "Omitidas", value: lastResult.skipped_count },
              { label: "Errores", value: lastResult.error_count },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
          {lastResult.message && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>{lastResult.message}</div>
          )}
        </div>
      )}

      {syncError && (
        <div className="panel-card" style={{ borderLeft: "4px solid #dc2626" }}>
          <div style={{ color: "#dc2626", fontSize: 14 }}>
            No fue posible completar la sincronización. Por favor intenta de nuevo.
          </div>
        </div>
      )}
    </div>
  );
}
