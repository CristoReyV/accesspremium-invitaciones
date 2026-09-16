// ============================================================
// TOKEN: Coquette Aesthetic
// Familia: Rosa pastel, moños line art, kawaii, coquette
// Aplica a: XV Años, Cumpleaños, Baby Shower, Revelación
// ============================================================

import type { InvitationTheme } from "@/types";

export const coquetteTheme: InvitationTheme = {
  id: "coquette-aesthetic",
  family: "coquette-aesthetic",
  displayName: "Coquette Aesthetic",

  colors: {
    primary: "#E91E8C",          // Fucsia vibrante — botones y acentos
    secondary: "#FFF0F8",        // Rosa muy pálido — fondos de secciones
    accent: "#FF69B4",           // Rosa medio para detalles
    background: "#FFFBFD",       // Blanco con toque rosado muy sutil
    surface: "#FFFFFF",          // Blanco puro para tarjetas
    text: "#3D1033",             // Morado muy oscuro casi negro
    textMuted: "#9C4D7A",        // Rosa oscuro para texto secundario
    border: "rgba(233,30,140,0.2)",
  },

  fonts: {
    display: "Playfair Display",
    script: "Dancing Script",
    body: "Lato",
  },

  decorationLevel: 3,

  decorations: {
    topLeft: "/assets/decorations/coquette/bow-top-left.svg",
    topRight: "/assets/decorations/coquette/cherry-top-right.svg",
    bottomRight: "/assets/decorations/coquette/bow-bottom-right.svg",
    sectionSeparator: "/assets/decorations/coquette/bow-divider.svg",
    floatingElements: [
      "/assets/decorations/coquette/heart.svg",
      "/assets/decorations/coquette/star.svg",
      "/assets/decorations/coquette/cherry.svg",
    ],
  },

  animations: {
    intro: "scale-in",
    sectionEntry: "fade-up",
    floating: "floating",
    special: "sparkle",
  },

  background: {
    type: "solid",
    value: "#FFFBFD",
  },

  borderRadius: "1.25rem",
  shadowStyle: "soft",

  cssVariables: {
    "--ap-primary": "#E91E8C",
    "--ap-secondary": "#FFF0F8",
    "--ap-accent": "#FF69B4",
    "--ap-bg": "#FFFBFD",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#3D1033",
    "--ap-text-muted": "#9C4D7A",
    "--ap-border": "rgba(233,30,140,0.2)",
    "--ap-font-display": "'Playfair Display', serif",
    "--ap-font-script": "'Dancing Script', cursive",
    "--ap-font-body": "'Lato', sans-serif",
    "--ap-radius": "1.25rem",
  },
};
