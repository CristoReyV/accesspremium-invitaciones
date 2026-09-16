// ============================================================
// TOKEN: Safari Animal Friends
// Familia: Animales acuarela, tonos tierra, neutro de género
// Aplica a: Baby Shower, Revelación, Cumpleaños infantil
// ============================================================

import type { InvitationTheme } from "@/types";

export const safariTheme: InvitationTheme = {
  id: "safari-animal-friends",
  family: "safari-animal-friends",
  displayName: "Safari Animal Friends",

  colors: {
    primary: "#6B7A55",          // Verde salvia — color dominante
    secondary: "#F5F0E8",        // Crema lino — fondos de sección
    accent: "#C4A962",           // Dorado tierra — detalles
    background: "#FAF7F2",       // Beige muy suave
    surface: "#FFFFFF",
    text: "#2D1E10",             // Café oscuro
    textMuted: "#8B7355",        // Café medio
    border: "rgba(107,122,85,0.2)",
  },

  fonts: {
    display: "Playfair Display",
    script: "Pacifico",
    body: "Nunito",
  },

  decorationLevel: 4,

  decorations: {
    topLeft: "/assets/decorations/safari/leaves-top-left.svg",
    topRight: "/assets/decorations/safari/giraffe-top-right.svg",
    bottomLeft: "/assets/decorations/safari/elephant-bottom-left.svg",
    bottomRight: "/assets/decorations/safari/leaves-bottom-right.svg",
    sectionSeparator: "/assets/decorations/safari/paw-divider.svg",
    floatingElements: [
      "/assets/decorations/safari/leaf-a.svg",
      "/assets/decorations/safari/leaf-b.svg",
    ],
  },

  animations: {
    intro: "fade-up",
    sectionEntry: "fade-up",
    floating: "floating",
    special: "fade-in",
  },

  background: {
    type: "texture",
    value: "/assets/textures/linen-natural.png",
    overlay: "rgba(250,247,242,0.9)",
  },

  borderRadius: "1rem",
  shadowStyle: "soft",

  cssVariables: {
    "--ap-primary": "#6B7A55",
    "--ap-secondary": "#F5F0E8",
    "--ap-accent": "#C4A962",
    "--ap-bg": "#FAF7F2",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#2D1E10",
    "--ap-text-muted": "#8B7355",
    "--ap-border": "rgba(107,122,85,0.2)",
    "--ap-font-display": "'Playfair Display', serif",
    "--ap-font-script": "'Pacifico', cursive",
    "--ap-font-body": "'Nunito', sans-serif",
    "--ap-radius": "1rem",
  },
};
