// ============================================================
// ACCESSPREMIUM INVITACIONES — Sistema de Temas (Theming)
// Define la estructura de tokens visuales de cada plantilla.
// ============================================================

import type { VisualFamily } from "./invitation";

// ----------------------------------------------------------
// Paleta de colores del tema
// ----------------------------------------------------------
export interface ThemeColors {
  primary: string;     // Color dominante (accent principal)
  secondary: string;   // Color secundario (fondos de tarjetas)
  accent: string;      // Color de detalles / brillo
  background: string;  // Color de fondo general de la invitación
  surface: string;     // Color de secciones / tarjetas internas
  text: string;        // Color de texto principal
  textMuted: string;   // Color de texto secundario / suave
  border: string;      // Color de bordes y separadores
}

// ----------------------------------------------------------
// Tipografías del tema
// ----------------------------------------------------------
export interface ThemeFonts {
  display: string; // Para nombres y títulos grandes — ej. "Cormorant Garamond"
  script: string;  // Caligráfico/script decorativo — ej. "Great Vibes"
  body: string;    // Para información — ej. "Inter"
}

// ----------------------------------------------------------
// Animaciones disponibles en el sistema
// ----------------------------------------------------------
export type AnimationType =
  | "fade-up"
  | "fade-in"
  | "slide-right"
  | "scale-in"
  | "floating"
  | "sparkle"
  | "confetti"
  | "leaves-falling"
  | "stars-twinkle"
  | "bounce-in"
  | "glow-pulse"
  | "none";

// ----------------------------------------------------------
// Assets decorativos del tema
// ----------------------------------------------------------
export interface ThemeDecorationAssets {
  topLeft?: string;          // Ruta del asset decorativo esquina superior izquierda
  topRight?: string;         // Ruta del asset decorativo esquina superior derecha
  bottomLeft?: string;
  bottomRight?: string;
  heroBackground?: string;   // Fondo del hero / portada
  sectionSeparator?: string; // Separador SVG entre secciones
  floatingElements?: string[]; // Array de assets flotantes (ej. hojas, estrellas)
}

// ----------------------------------------------------------
// Configuración de fondo de la invitación
// ----------------------------------------------------------
export type BackgroundType = "solid" | "gradient" | "texture" | "image";

export interface ThemeBackground {
  type: BackgroundType;
  value: string; // Hex, gradiente CSS, o URL del asset
  overlay?: string; // Color de overlay semitransparente opcional
}

// ----------------------------------------------------------
// Tema completo de una invitación
// ----------------------------------------------------------
export interface InvitationTheme {
  id: string;         // "botanical-elegance"
  family: VisualFamily;
  displayName: string; // "Botanical Elegance"

  colors: ThemeColors;
  fonts: ThemeFonts;
  decorationLevel: 1 | 2 | 3 | 4;
  decorations: ThemeDecorationAssets;

  animations: {
    intro?: AnimationType;       // Animación al entrar a la invitación
    sectionEntry: AnimationType; // Animación de cada sección al hacer scroll
    floating?: AnimationType;    // Animación de elementos flotantes (continua)
    special?: AnimationType;     // Animación especial del tema
  };

  background: ThemeBackground;

  borderRadius: string;      // "0.5rem" | "1rem" | "2rem"
  shadowStyle: "soft" | "hard" | "glow" | "none";

  // CSS variables que se inyectan en el InvitationLayout
  cssVariables: Record<string, string>;
}

// ----------------------------------------------------------
// Tema de personaje (extiende el sistema base con assets de personaje)
// ----------------------------------------------------------
export interface CharacterTheme {
  id: string;              // "bluey-party"
  name: string;            // "Bluey Fun Party"
  characterName: string;   // "Bluey"
  baseSystem: string;      // "party-character-classic"

  colors: ThemeColors;
  fonts: ThemeFonts;

  assets: {
    hero: string;           // PNG del personaje principal (fondo transparente)
    decorTop?: string;      // Decoración superior
    decorBottom?: string;   // Decoración inferior
    separator?: string;     // Separador temático entre secciones
    background?: string;    // Patrón de fondo opcional
    floatingElements?: string[]; // Elementos flotantes específicos del personaje
  };

  animations: AnimationType[];
  decorationLevel: 1 | 2 | 3 | 4;
  seoTags: string[]; // Para filtrado y búsqueda
}

// ----------------------------------------------------------
// Contexto del tema (lo que se provee vía React Context)
// ----------------------------------------------------------
export interface InvitationThemeContext {
  theme: InvitationTheme;
  characterTheme?: CharacterTheme;
}
