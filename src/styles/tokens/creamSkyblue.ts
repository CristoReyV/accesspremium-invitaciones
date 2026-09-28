import { cafeEspressoTheme } from "./cafeEspresso";
import type { InvitationTheme } from "@/types";

export const creamSkyblueTheme: InvitationTheme = {
  ...cafeEspressoTheme,
  id: "ayde-octavio-cream-skyblue",
  displayName: "Crema y cielo",
  colors: {
    primary: "#456258", secondary: "#DCEEF7", accent: "#B6A17A",
    background: "#FDFCF8", surface: "#FFFEFB", text: "#3F5550",
    textMuted: "#596D65", border: "#DAD6C9",
  },
  fonts: { display: "Playfair Display", script: "Alex Brush", body: "Inter" },
  background: { type: "solid", value: "#FDFCF8" },
  cssVariables: {
    "--ap-primary": "#456258", "--ap-secondary": "#DCEEF7",
    "--ap-accent": "#B6A17A", "--ap-bg": "#FDFCF8", "--ap-bg-alt": "#EEF5F0",
    "--ap-surface": "#FFFEFB", "--ap-text": "#3F5550", "--ap-text-muted": "#596D65",
    "--ap-border": "#DAD6C9", "--ap-font-display": "'Playfair Display', serif",
    "--ap-font-script": "'Alex Brush', cursive", "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "2px",
  },
};
