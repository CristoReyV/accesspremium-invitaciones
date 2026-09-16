// ============================================================
// InvitationLayout — Wrapper principal de toda invitación
// Envuelve el ThemeProvider, aplica el fondo del tema,
// y establece la fuente base correcta para la invitación.
// ============================================================

import type { ReactNode } from "react";
import type { InvitationTheme, CharacterTheme } from "@/types";
import ThemeProvider from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface InvitationLayoutProps {
  theme: InvitationTheme;
  characterTheme?: CharacterTheme;
  children: ReactNode;
  className?: string;
  /** Título de la pestaña del navegador */
  pageTitle?: string;
  /** Meta description para OG / WhatsApp preview */
  pageDescription?: string;
}

export default function InvitationLayout({
  theme,
  characterTheme,
  children,
  className,
  pageTitle,
  pageDescription,
}: InvitationLayoutProps) {
  // Actualizar el título del documento si se provee
  if (pageTitle && typeof document !== "undefined") {
    document.title = pageTitle;
  }

  // Determinar el color de fondo: characterTheme tiene precedencia
  const bgColor = characterTheme?.colors.background ?? theme.colors.background;
  const textColor = characterTheme?.colors.text ?? theme.colors.text;

  // Determinar la fuente del body
  const bodyFont = characterTheme?.fonts.body ?? theme.fonts.body;

  return (
    <ThemeProvider theme={theme} characterTheme={characterTheme}>
      {/* Meta OG para WhatsApp preview (se actualiza en el servidor en producción) */}
      {pageDescription && (
        <meta name="description" content={pageDescription} />
      )}

      <main
        className={cn(
          "min-h-screen w-full overflow-x-hidden antialiased",
          className
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          fontFamily: `${bodyFont}, sans-serif`,
        }}
      >
        {children}
      </main>
    </ThemeProvider>
  );
}
