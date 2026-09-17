// ============================================================
// ACCESSPREMIUM — Pantalla de Login del Panel
// ============================================================

import { useState, type FormEvent, type KeyboardEvent } from "react";

interface Props {
  onLogin: (code: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function PanelLoginPage({ onLogin, isLoading, error }: Props) {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    await onLogin(code);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e as unknown as FormEvent);
  };

  return (
    <div className="panel-login" role="main">
      <div className="panel-login__card">
        {/* Logo / Brand */}
        <div className="panel-login__logo">
          <div className="panel-login__logo-icon" aria-hidden="true">✦</div>
          <span className="panel-login__brand">AccessPremium</span>
        </div>

        <h1 className="panel-login__title">Panel de tu invitación</h1>
        <p className="panel-login__subtitle">
          Administra las confirmaciones de tu evento.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="panel-login__label" htmlFor="panel-code">
            Código de invitación
          </label>

          <div className="panel-login__input-wrap">
            <input
              id="panel-code"
              type={showCode ? "text" : "password"}
              className="panel-login__input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="XXXX-XXXXXX"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              disabled={isLoading}
              aria-describedby={error ? "panel-login-error" : undefined}
              aria-invalid={!!error}
            />
            <button
              type="button"
              className="panel-login__toggle"
              onClick={() => setShowCode((v) => !v)}
              aria-label={showCode ? "Ocultar código" : "Mostrar código"}
            >
              {showCode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div
              id="panel-login-error"
              className="panel-login__error"
              role="alert"
              aria-live="polite"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="panel-login__btn"
            disabled={isLoading || !code.trim()}
            style={{ marginTop: error ? "16px" : "0" }}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span className="spinner" style={{ width: 16, height: 16 }} />
                Verificando...
              </span>
            ) : (
              "Entrar al panel"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
