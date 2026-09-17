import { cafeEspressoTheme } from "./cafeEspresso";
import type { InvitationTheme } from "@/types";

export const creamSkyblueTheme: InvitationTheme = {
  ...cafeEspressoTheme,
  id: "ayde-octavio-cream-skyblue",
  displayName: "Crema y cielo",
  colors: {
    primary: "#496779", secondary: "#DCEAF1", accent: "#B6A17A",
    background: "#FCFAF5", surface: "#FFFEFB", text: "#304B5A",
    textMuted: "#5C7079", border: "#DAD6C9",
  },
  fonts: { display: "Playfair Display", script: "Alex Brush", body: "Inter" },
  background: { type: "solid", value: "#FCFAF5" },
  cssVariables: {
    "--ap-primary": "#496779", "--ap-secondary": "#DCEAF1",
    "--ap-accent": "#B6A17A", "--ap-bg": "#FCFAF5", "--ap-bg-alt": "#F2F6F7",
    "--ap-surface": "#FFFEFB", "--ap-text": "#304B5A", "--ap-text-muted": "#5C7079",
    "--ap-border": "#DAD6C9", "--ap-font-display": "'Playfair Display', serif",
    "--ap-font-script": "'Alex Brush', cursive", "--ap-font-body": "'Inter', sans-serif",
    "--ap-radius": "2px",
  },
};
