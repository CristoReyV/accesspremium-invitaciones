// ============================================================
// TOKEN: Editorial Fine Art
// Familia: Fotografía B&N, bloques tipográficos, sofisticado
// Aplica a: Bodas editorial, Graduación
// ============================================================

import type { InvitationTheme } from "@/types";

export const editorialTheme: InvitationTheme = {
  id: "editorial-fine-art",
  family: "editorial-fine-art",
  displayName: "Editorial Fine Art",

  colors: {
    primary: "#000000",
    secondary: "#F5F5F5",
    accent: "#B89A60",           // Dorado sutil para detalles mínimos
    background: "#FAFAFA",       // Blanco frío editorial
    surface: "#FFFFFF",
    text: "#111111",
    textMuted: "#666666",
    border: "rgba(0,0,0,0.12)",
  },

  fonts: {
    display: "Cormorant Garamond",
    script: "Bodoni Moda",
    body: "IBM Plex Sans",
  },

  decorationLevel: 1,

  decorations: {
    sectionSeparator: "/assets/decorations/editorial/thin-rule.svg",
  },

  animations: {
    intro: "fade-in",
    sectionEntry: "fade-up",
    floating: "none",
    special: "fade-in",
  },

  background: {
    type: "solid",
    value: "#FAFAFA",
  },

  borderRadius: "0.25rem",
  shadowStyle: "none",

  cssVariables: {
    "--ap-primary": "#000000",
    "--ap-secondary": "#F5F5F5",
    "--ap-accent": "#B89A60",
    "--ap-bg": "#FAFAFA",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#111111",
    "--ap-text-muted": "#666666",
    "--ap-border": "rgba(0,0,0,0.12)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Bodoni Moda', serif",
    "--ap-font-body": "'IBM Plex Sans', sans-serif",
    "--ap-radius": "0.25rem",
  },
};
