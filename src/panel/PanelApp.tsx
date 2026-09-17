// ============================================================
// ACCESSPREMIUM — Panel App Root
// Gestiona el ciclo de autenticación y renderiza el panel.
// AISLADO: no interfiere con App.tsx ni las invitaciones.
// ============================================================

import "./panel.css";
import { usePanelAuth } from "./hooks/usePanelAuth";
import PanelLoginPage from "./pages/PanelLoginPage";
import PanelDashboardPage from "./pages/PanelDashboardPage";

export default function PanelApp() {
  const { state, login, logout, loginError, isLoggingIn, handleSessionExpired } = usePanelAuth();

  if (state.status === "loading") {
    return (
      <div className="panel-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="panel-loading">
          <span className="spinner" style={{ width: 24, height: 24 }} />
          <span>Verificando sesión...</span>
        </div>
      </div>
    );
  }

  if (state.status === "unauthenticated") {
    return (
      <div className="panel-root">
        <PanelLoginPage
          onLogin={login}
          isLoading={isLoggingIn}
          error={loginError}
        />
      </div>
    );
  }

  return (
    <div className="panel-root">
      <PanelDashboardPage
        session={state.session}
        onLogout={logout}
        onSessionExpired={handleSessionExpired}
      />
    </div>
  );
}
