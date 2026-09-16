// ============================================================
// TOKEN: Princess Fantasy
// Familia: Brillos, coronas, castillos, script ornamentado
// Aplica a: XV Años, Cumpleaños infantil niña
// ============================================================

import type { InvitationTheme } from "@/types";

export const princessTheme: InvitationTheme = {
  id: "princess-fantasy",
  family: "princess-fantasy",
  displayName: "Princess Fantasy",

  colors: {
    primary: "#D4AF37",           // Dorado real — el color de la realeza
    secondary: "rgba(255,255,255,0.12)", // Superficie translúcida sobre oscuro
    accent: "#C0C0C0",            // Plateado — complementa el dorado
    background: "#0D1F4A",        // Azul noche profundo (adaptable por personaje)
    surface: "rgba(255,255,255,0.10)",
    text: "#FFFFFF",
    textMuted: "#B8C8E8",
    border: "rgba(212,175,55,0.45)",
  },

  fonts: {
    display: "Cormorant Garamond",
    script: "Pinyon Script",
    body: "Raleway",
  },

  decorationLevel: 4,

  decorations: {
    topLeft: "/assets/decorations/princess/baroque-top-left.svg",
    topRight: "/assets/decorations/princess/stars-top-right.svg",
    bottomLeft: "/assets/decorations/princess/baroque-bottom-left.svg",
    bottomRight: "/assets/decorations/princess/baroque-bottom-right.svg",
    sectionSeparator: "/assets/decorations/princess/crown-divider.svg",
    floatingElements: [
      "/assets/decorations/princess/star-a.svg",
      "/assets/decorations/princess/star-b.svg",
      "/assets/decorations/princess/sparkle.svg",
    ],
  },

  animations: {
    intro: "scale-in",
    sectionEntry: "fade-up",
    floating: "stars-twinkle",
    special: "sparkle",
  },

  background: {
    type: "gradient",
    value: "linear-gradient(160deg, #0D1F4A 0%, #1A3070 50%, #0D1F4A 100%)",
  },

  borderRadius: "1rem",
  shadowStyle: "glow",

  cssVariables: {
    "--ap-primary": "#D4AF37",
    "--ap-secondary": "rgba(255,255,255,0.12)",
    "--ap-accent": "#C0C0C0",
    "--ap-bg": "#0D1F4A",
    "--ap-surface": "rgba(255,255,255,0.10)",
    "--ap-text": "#FFFFFF",
    "--ap-text-muted": "#B8C8E8",
    "--ap-border": "rgba(212,175,55,0.45)",
    "--ap-font-display": "'Cormorant Garamond', serif",
    "--ap-font-script": "'Pinyon Script', cursive",
    "--ap-font-body": "'Raleway', sans-serif",
    "--ap-radius": "1rem",
    "--ap-glow": "0 0 25px rgba(212,175,55,0.2)",
  },
};
