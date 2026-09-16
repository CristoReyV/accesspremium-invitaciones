// ============================================================
// TOKEN: Religious Classic
// Familia: Arcos, elementos religiosos, solemne, clásico
// Aplica a: Bautizo, Comunión, Luctuoso
// ============================================================

import type { InvitationTheme } from "@/types";

export const religiousTheme: InvitationTheme = {
  id: "religious-classic",
  family: "religious-classic",
  displayName: "Religious Classic",

  colors: {
    primary: "#C4A962",          // Dorado envejecido — acento religioso clásico
    secondary: "#F5F0E8",        // Crema cálida
    accent: "#8B7355",           // Café dorado
    background: "#FDFAF5",       // Blanco hueso muy cálido
    surface: "#FFFFFF",
    text: "#2A1F10",             // Café oscuro
    textMuted: "#8B7A62",
    border: "rgba(196,169,98,0.3)",
  },

  fonts: {
    display: "Cormorant Garamond",
    script: "Great Vibes",
    body: "Lato",
  },

  decorationLevel: 2,

  decorations: {
    topLeft: "/assets/decorations/religious/floral-corner-tl.svg",
    topRight: "/assets/decorations/religious/floral-corner-tr.svg",
    bottomLeft: "/assets/decorations/religious/floral-corner-bl.svg",
    bottomRight: "/assets/decorations/religious/floral-corner-br.svg",
    sectionSeparator: "/assets/decorations/religious/cross-divider.svg",
  },

  animations: {
    intro: "fade-in",
    sectionEntry: "fade-up",
    floating: "none",
    special: "fade-in",
  },

  background: {
    type: "texture",
    value: "/assets/textures/paper-warm.png",
    overlay: "rgba(253,250,245,0.95)",
  },

  borderRadius: "0.75rem",
  shadowStyle: "soft",

  cssVariables: {
    "--ap-primary": "#C4A962",
    "--ap-secondary": "#F5F0E8",
    "--ap-accent": "#8B7355",
    "--ap-bg": "#FDFAF5",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#2A1F10",
    "--ap-text-muted": "#8B7A62",
    "--ap-border": "rgba(196,169,98,0.3)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Great Vibes', cursive",
    "--ap-font-body": "'Lato', sans-serif",
    "--ap-radius": "0.75rem",
  },
};
