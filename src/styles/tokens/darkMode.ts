// ============================================================
// TOKEN: Dark Mode Premium
// Familia: Fondos oscuros profundos, dorado/plata, lujo nocturno
// Aplica a: Bodas, XV Hombre, Cumpleaños adulto, Graduación
// ============================================================

import type { InvitationTheme } from "@/types";

export const darkModeTheme: InvitationTheme = {
  id: "dark-mode-premium",
  family: "dark-mode-premium",
  displayName: "Dark Mode Premium",

  colors: {
    primary: "#D4AF37",          // Dorado brillante — color de acento dominante
    secondary: "rgba(255,255,255,0.06)", // Superficie sutil sobre oscuro
    accent: "#C9A84C",           // Dorado más cálido para detalles
    background: "#090909",       // Negro profundo
    surface: "rgba(255,255,255,0.08)", // Tarjetas con glassmorphism sutil
    text: "#FFFFFF",             // Blanco puro para texto principal
    textMuted: "#999999",        // Gris claro para texto secundario
    border: "rgba(212,175,55,0.3)", // Borde dorado translúcido
  },

  fonts: {
    display: "Cormorant Garamond",
    script: "Pinyon Script",
    body: "Inter",
  },

  decorationLevel: 2,

  decorations: {
    topRight: "/assets/decorations/dark-mode/roses-top-right.svg",
    bottomLeft: "/assets/decorations/dark-mode/roses-bottom-left.svg",
    sectionSeparator: "/assets/decorations/dark-mode/gold-line-divider.svg",
    floatingElements: [
      "/assets/decorations/dark-mode/gold-particle.svg",
    ],
  },

  animations: {
    intro: "fade-in",
    sectionEntry: "fade-up",
    floating: "sparkle",
    special: "glow-pulse",
  },

  background: {
    type: "solid",
    value: "#090909",
  },

  borderRadius: "0.75rem",
  shadowStyle: "glow",

  cssVariables: {
    "--ap-primary": "#D4AF37",
    "--ap-secondary": "rgba(255,255,255,0.06)",
    "--ap-accent": "#C9A84C",
    "--ap-bg": "#090909",
    "--ap-surface": "rgba(255,255,255,0.08)",
    "--ap-text": "#FFFFFF",
    "--ap-text-muted": "#999999",
    "--ap-border": "rgba(212,175,55,0.3)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Pinyon Script', cursive",
    "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "0.75rem",
    "--ap-glow": "0 0 20px rgba(212,175,55,0.15)",
  },
};
