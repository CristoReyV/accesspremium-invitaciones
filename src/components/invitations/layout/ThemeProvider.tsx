// ============================================================
// ThemeProvider — Contexto de tema para invitaciones
// Inyecta CSS variables del tema y provee acceso via hook.
// ============================================================

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { InvitationTheme, CharacterTheme } from "@/types";

// ----------------------------------------------------------
// Tipos del contexto
// ----------------------------------------------------------
interface ThemeContextValue {
  theme: InvitationTheme;
  characterTheme?: CharacterTheme;
}

// ----------------------------------------------------------
// Contexto
// ----------------------------------------------------------
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ----------------------------------------------------------
// Hook de consumo
// ----------------------------------------------------------
export function useInvitationTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useInvitationTheme debe usarse dentro de <ThemeProvider>"
    );
  }
  return ctx;
}

// ----------------------------------------------------------
// Props del proveedor
// ----------------------------------------------------------
interface ThemeProviderProps {
  theme: InvitationTheme;
  characterTheme?: CharacterTheme;
  children: ReactNode;
}

// ----------------------------------------------------------
// Componente ThemeProvider
// Inyecta las CSS variables del tema en el elemento raíz
// de la invitación para que todos los componentes hijos
// puedan leerlas sin necesidad de props adicionales.
// ----------------------------------------------------------
export default function ThemeProvider({
  theme,
  characterTheme,
  children,
}: ThemeProviderProps) {
  // Aplicar CSS variables al montar / cuando cambia el tema
  useEffect(() => {
    const root = document.documentElement;
    const vars = characterTheme
      ? {
          ...theme.cssVariables,
          "--ap-primary": characterTheme.colors.primary,
          "--ap-secondary": characterTheme.colors.secondary,
          "--ap-accent": characterTheme.colors.accent,
          "--ap-bg": characterTheme.colors.background,
          "--ap-surface": characterTheme.colors.surface,
          "--ap-text": characterTheme.colors.text,
          "--ap-text-muted": characterTheme.colors.textMuted,
          "--ap-border": characterTheme.colors.border,
        }
      : theme.cssVariables;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Cleanup: restaurar variables al desmontar
    return () => {
      Object.keys(vars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [theme, characterTheme]);

  return (
    <ThemeContext.Provider value={{ theme, characterTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
