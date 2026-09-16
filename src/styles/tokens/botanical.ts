// ============================================================
// TOKEN: Botanical Elegance
// Familia: Acuarelas vegetales, eucalipto, verde olivo, dorado
// Aplica a: Bodas, Bautizo, Comunión, Jubilación, XV Años
// ============================================================

import type { InvitationTheme } from "@/types";

export const botanicalTheme: InvitationTheme = {
  id: "botanical-elegance",
  family: "botanical-elegance",
  displayName: "Botanical Elegance",

  colors: {
    primary: "#6B7A55",       // Verde olivo — color dominante
    secondary: "#F5F0E8",     // Crema cálida — fondos de secciones
    accent: "#C4A962",        // Dorado apagado — detalles y bordes
    background: "#FAFAF7",    // Blanco ligeramente cálido
    surface: "#FFFFFF",       // Blanco puro para tarjetas internas
    text: "#2D2010",          // Café oscuro casi negro
    textMuted: "#7A6A50",     // Café medio para subtítulos
    border: "rgba(107,122,85,0.25)",
  },

  fonts: {
    display: "Cormorant Garamond", // Titulares y nombre del festejado
    script: "Great Vibes",         // Nombre caligráfico principal
    body: "Inter",                 // Información y cuerpo de texto
  },

  decorationLevel: 3,

  decorations: {
    topLeft: "/assets/decorations/botanical/eucalyptus-top-left.svg",
    topRight: "/assets/decorations/botanical/eucalyptus-top-right.svg",
    bottomLeft: "/assets/decorations/botanical/botanical-bottom-left.svg",
    bottomRight: "/assets/decorations/botanical/botanical-bottom-right.svg",
    sectionSeparator: "/assets/decorations/botanical/leaf-divider.svg",
    floatingElements: [
      "/assets/decorations/botanical/leaf-1.svg",
      "/assets/decorations/botanical/leaf-2.svg",
      "/assets/decorations/botanical/sprig.svg",
    ],
  },

  animations: {
    intro: "fade-in",
    sectionEntry: "fade-up",
    floating: "leaves-falling",
    special: "fade-in",
  },

  background: {
    type: "texture",
    value: "/assets/textures/linen-warm.png",
    overlay: "rgba(250,250,247,0.92)",
  },

  borderRadius: "0.875rem",
  shadowStyle: "soft",

  cssVariables: {
    "--ap-primary": "#6B7A55",
    "--ap-secondary": "#F5F0E8",
    "--ap-accent": "#C4A962",
    "--ap-bg": "#FAFAF7",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#2D2010",
    "--ap-text-muted": "#7A6A50",
    "--ap-border": "rgba(107,122,85,0.25)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Great Vibes', cursive",
    "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "0.875rem",
  },
};
