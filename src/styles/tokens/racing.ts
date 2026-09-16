// ============================================================
// TOKEN: Racing / Action
// Familia: Fibra de carbono, velocidad, alto contraste, masculino
// Aplica a: XV Hombre, Cumpleaños infantil niño
// ============================================================

import type { InvitationTheme } from "@/types";

export const racingTheme: InvitationTheme = {
  id: "racing-action",
  family: "racing-action",
  displayName: "Racing / Action",

  colors: {
    primary: "#F5C000",          // Amarillo racing — acento de alta energía
    secondary: "rgba(255,255,255,0.07)",
    accent: "#CC0000",           // Rojo racing — color de acción
    background: "#0A0A0A",       // Negro carbono
    surface: "rgba(255,255,255,0.06)",
    text: "#FFFFFF",
    textMuted: "#AAAAAA",
    border: "rgba(245,192,0,0.4)",
  },

  fonts: {
    display: "Oswald",
    script: "Bebas Neue",
    body: "Inter",
  },

  decorationLevel: 3,

  decorations: {
    topRight: "/assets/decorations/racing/checkered-top-right.svg",
    bottomLeft: "/assets/decorations/racing/speed-lines-bottom.svg",
    sectionSeparator: "/assets/decorations/racing/flag-divider.svg",
  },

  animations: {
    intro: "slide-right",
    sectionEntry: "fade-up",
    floating: "none",
    special: "bounce-in",
  },

  background: {
    type: "texture",
    value: "/assets/textures/carbon-fiber.png",
    overlay: "rgba(10,10,10,0.75)",
  },

  borderRadius: "0.5rem",
  shadowStyle: "hard",

  cssVariables: {
    "--ap-primary": "#F5C000",
    "--ap-secondary": "rgba(255,255,255,0.07)",
    "--ap-accent": "#CC0000",
    "--ap-bg": "#0A0A0A",
    "--ap-surface": "rgba(255,255,255,0.06)",
    "--ap-text": "#FFFFFF",
    "--ap-text-muted": "#AAAAAA",
    "--ap-border": "rgba(245,192,0,0.4)",
    "--ap-font-display": "'Oswald', sans-serif",
    "--ap-font-script": "'Bebas Neue', display",
    "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "0.5rem",
  },
};
