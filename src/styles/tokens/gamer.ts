// ============================================================
// TOKEN: Gamer Neon
// Familia: Fondos dark, neón vibrante, pixel art, videojuego
// Aplica a: Cumpleaños teen/gamer, XV Hombre alternativo
// ============================================================

import type { InvitationTheme } from "@/types";

export const gamerTheme: InvitationTheme = {
  id: "gamer-neon",
  family: "gamer-neon",
  displayName: "Gamer Neon",

  colors: {
    primary: "#00FFAA",          // Verde neón — el más legible sobre negro
    secondary: "rgba(0,255,170,0.08)",
    accent: "#FF00AA",           // Rosa neón complementario
    background: "#050510",       // Negro azulado muy profundo
    surface: "rgba(0,255,170,0.06)",
    text: "#FFFFFF",
    textMuted: "#88AACC",
    border: "rgba(0,255,170,0.3)",
  },

  fonts: {
    display: "Orbitron",
    script: "Orbitron",
    body: "Rajdhani",
  },

  decorationLevel: 4,

  decorations: {
    topLeft: "/assets/decorations/gamer/grid-top-left.svg",
    topRight: "/assets/decorations/gamer/circuit-top-right.svg",
    sectionSeparator: "/assets/decorations/gamer/pixel-divider.svg",
    floatingElements: [
      "/assets/decorations/gamer/pixel-star.svg",
      "/assets/decorations/gamer/controller-icon.svg",
    ],
  },

  animations: {
    intro: "scale-in",
    sectionEntry: "slide-right",
    floating: "sparkle",
    special: "glow-pulse",
  },

  background: {
    type: "gradient",
    value: "radial-gradient(ellipse at center, #0A0A2A 0%, #050510 70%)",
  },

  borderRadius: "0.375rem",
  shadowStyle: "glow",

  cssVariables: {
    "--ap-primary": "#00FFAA",
    "--ap-secondary": "rgba(0,255,170,0.08)",
    "--ap-accent": "#FF00AA",
    "--ap-bg": "#050510",
    "--ap-surface": "rgba(0,255,170,0.06)",
    "--ap-text": "#FFFFFF",
    "--ap-text-muted": "#88AACC",
    "--ap-border": "rgba(0,255,170,0.3)",
    "--ap-font-display": "'Orbitron', sans-serif",
    "--ap-font-script": "'Orbitron', sans-serif",
    "--ap-font-body": "'Rajdhani', sans-serif",
    "--ap-radius": "0.375rem",
    "--ap-glow": "0 0 20px rgba(0,255,170,0.2), 0 0 40px rgba(0,255,170,0.1)",
  },
};
