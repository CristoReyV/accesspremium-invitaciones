// ============================================================
// ACCESSPREMIUM — Panel Header Component
// ============================================================

import type { PanelEvent } from "../types";

interface Props {
  event: PanelEvent | null;
  onLogout: () => void;
}

export default function PanelHeader({ event, onLogout }: Props) {
  const invitationUrl = event?.url ?? (event?.slug ? `https://${event.slug}.invitaciones-access.smartbrain.lat` : null);

  return (
    <header className="panel-header" role="banner">
      <div style={{ display: "flex", alignItems: "center", gap: "4px", overflow: "hidden" }}>
        <span className="panel-header__brand">AccessPremium</span>
        {event && (
          <span className="panel-header__event">
            · {event.name}
          </span>
        )}
      </div>

      <div className="panel-header__actions">
        {invitationUrl && (
          <a
            href={invitationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-header__view-btn"
            aria-label="Ver invitación en nueva pestaña"
          >
            Ver invitación ↗
          </a>
        )}
        <button
          className="panel-header__logout"
          onClick={onLogout}
          aria-label="Cerrar sesión del panel"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
