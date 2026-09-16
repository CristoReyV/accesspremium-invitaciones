// ============================================================
// ACCESSPREMIUM INVITACIONES — Temas de Personajes
// Configuración de los 10 demos de la Línea Temática.
// FASE 4 — Estos temas se usan cuando se construyan los demos
// de personajes. Por ahora son definiciones de datos.
// ============================================================

import type { CharacterTheme } from "@/types";

export const CHARACTER_THEMES: CharacterTheme[] = [
  // ──────────────────────────────────────────────────────────
  // SISTEMA: Princess Fantasy
  // ──────────────────────────────────────────────────────────
  {
    id: "princesa-encantada",
    name: "Princesa Encantada",
    characterName: "Princesa",
    baseSystem: "princess-fantasy",
    colors: {
      primary: "#1A4A8A",
      secondary: "#F0F4FF",
      accent: "#D4AF37",
      background: "#0D2554",
      surface: "rgba(255,255,255,0.12)",
      text: "#FFFFFF",
      textMuted: "#B8C8E8",
      border: "rgba(212,175,55,0.4)",
    },
    fonts: {
      display: "Cormorant Garamond",
      script: "Pinyon Script",
      body: "Raleway",
    },
    assets: {
      hero: "/assets/characters/princesa/hero.png",
      decorTop: "/assets/characters/princesa/stars-top.svg",
      decorBottom: "/assets/characters/princesa/baroque-bottom.svg",
      separator: "/assets/characters/princesa/crown-divider.svg",
    },
    animations: ["sparkle", "stars-twinkle", "fade-up"],
    decorationLevel: 4,
    seoTags: ["princesa", "fantasy", "cenicienta", "xv años", "cumpleaños niña"],
  },
  {
    id: "reino-de-hielo",
    name: "Reino de Hielo",
    characterName: "Reina del Hielo",
    baseSystem: "princess-fantasy",
    colors: {
      primary: "#4A9FD4",
      secondary: "#E8F4FF",
      accent: "#B8D8E8",
      background: "#0A1F3A",
      surface: "rgba(255,255,255,0.08)",
      text: "#FFFFFF",
      textMuted: "#90C4E0",
      border: "rgba(74,159,212,0.5)",
    },
    fonts: {
      display: "Cormorant Garamond",
      script: "Pinyon Script",
      body: "Raleway",
    },
    assets: {
      hero: "/assets/characters/hielo/hero.png",
      decorTop: "/assets/characters/hielo/snowflakes-top.svg",
      separator: "/assets/characters/hielo/ice-divider.svg",
    },
    animations: ["sparkle", "stars-twinkle", "fade-up"],
    decorationLevel: 4,
    seoTags: ["frozen", "hielo", "princesa", "azul", "xv años", "cumpleaños"],
  },

  // ──────────────────────────────────────────────────────────
  // SISTEMA: Racing / Action
  // ──────────────────────────────────────────────────────────
  {
    id: "racing-party",
    name: "Racing Party",
    characterName: "Racing",
    baseSystem: "racing-action",
    colors: {
      primary: "#CC0000",
      secondary: "#1A1A1A",
      accent: "#FFD700",
      background: "#0A0A0A",
      surface: "rgba(255,255,255,0.07)",
      text: "#FFFFFF",
      textMuted: "#AAAAAA",
      border: "rgba(204,0,0,0.5)",
    },
    fonts: {
      display: "Oswald",
      script: "Bebas Neue",
      body: "Inter",
    },
    assets: {
      hero: "/assets/characters/racing/car-hero.png",
      decorTop: "/assets/characters/racing/checkered-top.png",
      separator: "/assets/characters/racing/speed-line.svg",
    },
    animations: ["slide-right", "fade-in", "bounce-in"],
    decorationLevel: 3,
    seoTags: ["carreras", "cars", "autos", "cumpleaños niño", "racing", "speed"],
  },
  {
    id: "spider-hero",
    name: "Spider Hero Action",
    characterName: "Spider Hero",
    baseSystem: "racing-action",
    colors: {
      primary: "#CC0000",
      secondary: "#0A1A5A",
      accent: "#FFFFFF",
      background: "#0A0A1A",
      surface: "rgba(255,255,255,0.07)",
      text: "#FFFFFF",
      textMuted: "#BBBBCC",
      border: "rgba(204,0,0,0.5)",
    },
    fonts: {
      display: "Oswald",
      script: "Bebas Neue",
      body: "Inter",
    },
    assets: {
      hero: "/assets/characters/spider/hero.png",
      decorTop: "/assets/characters/spider/web-top.svg",
      separator: "/assets/characters/spider/web-divider.svg",
    },
    animations: ["scale-in", "fade-in", "bounce-in"],
    decorationLevel: 4,
    seoTags: ["spiderman", "superhéroe", "cumpleaños niño", "action"],
  },

  // ──────────────────────────────────────────────────────────
  // SISTEMA: Cute / Kawaii / Coquette
  // ──────────────────────────────────────────────────────────
  {
    id: "kawaii-friends",
    name: "Kawaii Friends",
    characterName: "Kawaii",
    baseSystem: "cute-kawaii-coquette",
    colors: {
      primary: "#FF69B4",
      secondary: "#FFF0F8",
      accent: "#FF1493",
      background: "#FFF0F8",
      surface: "#FFFFFF",
      text: "#3D1033",
      textMuted: "#9C4D7A",
      border: "rgba(255,105,180,0.3)",
    },
    fonts: {
      display: "Pacifico",
      script: "Quicksand",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/kawaii/hello-kitty-style.png",
      decorTop: "/assets/characters/kawaii/stars-hearts-top.svg",
      separator: "/assets/characters/kawaii/bow-divider.svg",
      floatingElements: [
        "/assets/characters/kawaii/star.svg",
        "/assets/characters/kawaii/heart.svg",
        "/assets/characters/kawaii/cloud.svg",
      ],
    },
    animations: ["bounce-in", "sparkle", "floating"],
    decorationLevel: 4,
    seoTags: ["kawaii", "hello kitty", "sanrio", "cumpleaños niña", "pink"],
  },
  {
    id: "stitch-tropical",
    name: "Stitch Tropical Party",
    characterName: "Stitch",
    baseSystem: "cute-kawaii-coquette",
    colors: {
      primary: "#2563EB",
      secondary: "#EFF6FF",
      accent: "#38BDF8",
      background: "#1E3A5F",
      surface: "rgba(255,255,255,0.12)",
      text: "#FFFFFF",
      textMuted: "#93C5FD",
      border: "rgba(56,189,248,0.4)",
    },
    fonts: {
      display: "Pacifico",
      script: "Quicksand",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/stitch/stitch-hero.png",
      decorTop: "/assets/characters/stitch/hibiscus-top.svg",
      separator: "/assets/characters/stitch/wave-divider.svg",
    },
    animations: ["bounce-in", "floating", "fade-up"],
    decorationLevel: 3,
    seoTags: ["stitch", "hawaiian", "cute", "azul", "cumpleaños"],
  },
  {
    id: "barbie-glam",
    name: "Barbie Glam Party",
    characterName: "Barbie",
    baseSystem: "cute-kawaii-coquette",
    colors: {
      primary: "#E91E8C",
      secondary: "#FFF0F8",
      accent: "#D4AF37",
      background: "#FF69B4",
      surface: "rgba(255,255,255,0.2)",
      text: "#FFFFFF",
      textMuted: "#FFD6EC",
      border: "rgba(233,30,140,0.5)",
    },
    fonts: {
      display: "Pacifico",
      script: "Dancing Script",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/barbie/barbie-hero.png",
      decorTop: "/assets/characters/barbie/sparkles-top.svg",
      separator: "/assets/characters/barbie/star-divider.svg",
    },
    animations: ["sparkle", "bounce-in", "fade-up"],
    decorationLevel: 4,
    seoTags: ["barbie", "rosa", "glamour", "cumpleaños niña", "pink"],
  },

  // ──────────────────────────────────────────────────────────
  // SISTEMA: Party Character Classic
  // ──────────────────────────────────────────────────────────
  {
    id: "bluey-party",
    name: "Bluey Fun Party",
    characterName: "Bluey",
    baseSystem: "party-character-classic",
    colors: {
      primary: "#1A6BB0",
      secondary: "#DDEEFF",
      accent: "#F5A623",
      background: "#DDEEFF",
      surface: "#FFFFFF",
      text: "#1A2A4A",
      textMuted: "#4A6A8A",
      border: "rgba(26,107,176,0.3)",
    },
    fonts: {
      display: "Baloo 2",
      script: "Nunito",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/bluey/bluey-hero.png",
      decorTop: "/assets/characters/bluey/paw-print-top.svg",
      separator: "/assets/characters/bluey/bone-divider.svg",
    },
    animations: ["bounce-in", "floating", "fade-up"],
    decorationLevel: 3,
    seoTags: ["bluey", "bingo", "heeler", "cumpleaños", "infantil"],
  },

  // ──────────────────────────────────────────────────────────
  // SISTEMA: Safari / Animal Friends
  // ──────────────────────────────────────────────────────────
  {
    id: "safari-animals",
    name: "Safari Animal Party",
    characterName: "Safari",
    baseSystem: "safari-animal-friends",
    colors: {
      primary: "#6B7A55",
      secondary: "#F5F0E8",
      accent: "#C4A962",
      background: "#F5F0E8",
      surface: "#FFFFFF",
      text: "#2D2010",
      textMuted: "#7A6A50",
      border: "rgba(107,122,85,0.3)",
    },
    fonts: {
      display: "Playfair Display",
      script: "Pacifico",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/safari/elephant-hero.png",
      decorTop: "/assets/characters/safari/leaves-top.svg",
      separator: "/assets/characters/safari/animal-divider.svg",
    },
    animations: ["fade-up", "floating", "fade-in"],
    decorationLevel: 4,
    seoTags: ["safari", "animales", "jungla", "baby shower", "cumpleaños", "neutro"],
  },

  // ──────────────────────────────────────────────────────────
  // SISTEMA: Videogame / Pixel
  // ──────────────────────────────────────────────────────────
  {
    id: "mario-bros",
    name: "Mario Bros Party",
    characterName: "Mario",
    baseSystem: "videogame-pixel",
    colors: {
      primary: "#CC0000",
      secondary: "#FFF3C4",
      accent: "#F5C000",
      background: "#5B8DD9",
      surface: "rgba(255,255,255,0.1)",
      text: "#FFFFFF",
      textMuted: "#FFE082",
      border: "rgba(204,0,0,0.5)",
    },
    fonts: {
      display: "Press Start 2P",
      script: "Lilita One",
      body: "Nunito",
    },
    assets: {
      hero: "/assets/characters/mario/mario-hero.png",
      decorTop: "/assets/characters/mario/blocks-top.svg",
      separator: "/assets/characters/mario/pipe-divider.svg",
      floatingElements: [
        "/assets/characters/mario/coin.svg",
        "/assets/characters/mario/star.svg",
      ],
    },
    animations: ["bounce-in", "sparkle", "fade-up"],
    decorationLevel: 4,
    seoTags: ["mario", "nintendo", "videojuego", "gamer", "cumpleaños niño"],
  },
];

// Helper: obtener tema de personaje por ID
export function getCharacterThemeById(id: string): CharacterTheme | undefined {
  return CHARACTER_THEMES.find((t) => t.id === id);
}

// Helper: obtener temas de un sistema base
export function getThemesBySystem(system: string): CharacterTheme[] {
  return CHARACTER_THEMES.filter((t) => t.baseSystem === system);
}
