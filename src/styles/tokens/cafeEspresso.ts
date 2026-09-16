// ============================================================
// TOKEN: Café Espresso — Boda Ayde & Octavio
// Familia: Café claro, café profundo, beige, dorado suave
// Aplica a: Bodas elegantes en tonos tierra cálidos
// ============================================================

import type { InvitationTheme } from "@/types";

export const cafeEspressoTheme: InvitationTheme = {
  id: "cafe-espresso",
  family: "rustic-chic",
  displayName: "Café Espresso",

  colors: {
    primary: "#7B4F2E",        // Café moka profundo
    secondary: "#F5EFE6",      // Beige marfil cálido
    accent: "#C9A96E",         // Dorado champagne suave
    background: "#FBF7F1",     // Ivory base — fondo principal
    surface: "#FFFFFF",        // Blanco para tarjetas
    text: "#2C1A0E",           // Café oscuro casi negro
    textMuted: "#8C6A50",      // Café latte medio
    border: "rgba(123,79,46,0.18)",
  },

  fonts: {
    display: "Cormorant Garamond",  // Serif refinada — nombres y títulos
    script: "Great Vibes",           // Script elegante — frases románticas
    body: "Inter",                   // Sans limpia — textos funcionales
  },

  decorationLevel: 3,

  decorations: {
    topLeft: "/assets/invitations/cafe-espresso/watercolor-floral.png",
    topRight: "",
    bottomLeft: "",
    bottomRight: "/assets/invitations/cafe-espresso/watercolor-floral.png",
    sectionSeparator: "/assets/invitations/cafe-espresso/icon-rings.png",
    floatingElements: [
      "/assets/invitations/cafe-espresso/watercolor-floral.png",
    ],
  },

  animations: {
    intro: "fade-in",
    sectionEntry: "fade-up",
    floating: "breathe",
    special: "fade-in",
  },

  background: {
    type: "texture",
    value: "/assets/invitations/cafe-espresso/paper-texture.png",
    overlay: "rgba(251,247,241,0.6)",
  },

  borderRadius: "1rem",
  shadowStyle: "soft",

  cssVariables: {
    "--ap-primary": "#7B4F2E",
    "--ap-secondary": "#F5EFE6",
    "--ap-accent": "#C9A96E",
    "--ap-bg": "#FBF7F1",
    "--ap-bg-alt": "#F0E8DC",
    "--ap-surface": "#FFFFFF",
    "--ap-text": "#2C1A0E",
    "--ap-text-muted": "#8C6A50",
    "--ap-border": "rgba(123,79,46,0.18)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Great Vibes', cursive",
    "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "1rem",
    // Café-specific vars
    "--cafe-beige": "#F5EFE6",
    "--cafe-latte": "#C5A882",
    "--cafe-moka": "#7B4F2E",
    "--cafe-espresso": "#2C1A0E",
    "--cafe-gold": "#C9A96E",
    "--cafe-ivory": "#FBF7F1",
    "--cafe-champagne": "#EDD9B8",
  },
};
