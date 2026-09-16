// ============================================================
// ACCESSPREMIUM INVITACIONES — Tipos del Catálogo
// ============================================================

// ----------------------------------------------------------
// Categorías de evento
// ----------------------------------------------------------
export type EventCategory =
  | "bodas"
  | "xv-anos"
  | "xv-hombres"
  | "cumpleanos"
  | "baby-shower"
  | "bautizo"
  | "comunion"
  | "revelacion"
  | "graduacion"
  | "jubilacion"
  | "luctuoso"
  | "aniversario";

// ----------------------------------------------------------
// Familias visuales (sistemas de diseño compartidos)
// ----------------------------------------------------------
export type VisualFamily =
  | "botanical-elegance"
  | "dark-mode-premium"
  | "coquette-aesthetic"
  | "safari-animal-friends"
  | "princess-fantasy"
  | "racing-action"
  | "editorial-fine-art"
  | "religious-classic"
  | "gamer-neon"
  | "rustic-chic"
  | "academic-formal"
  | "boho-natural";

// ----------------------------------------------------------
// Sistemas de personajes (para la línea temática)
// ----------------------------------------------------------
export type CharacterSystem =
  | "party-character-classic"
  | "princess-fantasy"
  | "racing-action"
  | "cute-kawaii-coquette"
  | "safari-animal-friends"
  | "premium-photo"
  | "videogame-pixel"
  | "superhero-action"
  | "glow-neon-disco";

// ----------------------------------------------------------
// Paquetes comerciales
// ----------------------------------------------------------
export type PackageType = "basico" | "premium" | "recuerdos" | "fiesta-total";

// ----------------------------------------------------------
// Features disponibles en una invitación
// ----------------------------------------------------------
export type InvitationFeature =
  | "sobre-animado"
  | "countdown"
  | "galeria-fotos"
  | "ubicacion"
  | "itinerario"
  | "dress-code"
  | "mesa-regalos"
  | "confirmacion-rsvp"
  | "musica"
  | "padres"
  | "padrinos"
  | "qr-recuerdos"
  | "subir-fotos"
  | "votacion-reveal"
  | "datos-bancarios"
  | "personaje"
  | "video-bienvenida";

// ----------------------------------------------------------
// Nivel de decoración visual
// ----------------------------------------------------------
export type DecorationLevel = 1 | 2 | 3 | 4;
// 1 = Bajo (minimalista)
// 2 = Medio (equilibrado)
// 3 = Alto (decorado)
// 4 = Muy Alto (inmersivo / máxima decoración temática)

// ----------------------------------------------------------
// Modo cromático dominante
// ----------------------------------------------------------
export type ColorMode = "light" | "dark" | "color";

// ----------------------------------------------------------
// Prioridad de desarrollo
// ----------------------------------------------------------
export type DevelopmentPriority = "mvp" | "fase4" | "fase5";

// ----------------------------------------------------------
// Badge comercial de la tarjeta de catálogo
// ----------------------------------------------------------
export type CatalogBadge =
  | "nuevo"
  | "popular"
  | "exclusivo"
  | "express"
  | null;

// ----------------------------------------------------------
// Plantilla del catálogo (lo que AccessPremium ofrece)
// ----------------------------------------------------------
export interface InvitationTemplate {
  // Identificación
  id: string;            // "AP-BOD-01"
  slug: string;          // "botanica-verde-olivo"
  name: string;          // "Boda Botánica Verde Olivo"

  // Clasificación
  category: EventCategory;
  family: VisualFamily;
  theme: string;         // Descripción libre del sub-tema
  style: string;         // Palabras clave de estilo visual
  personality: string[]; // ["elegante", "natural", "respirable"]

  // Comercial
  description: string;
  badge: CatalogBadge;
  priority: DevelopmentPriority;
  developmentPhase: 3 | 4 | 5;

  // Visual
  decorationLevel: DecorationLevel;
  colorMode: ColorMode;
  previewImage: string;  // Ruta a la imagen de preview en el catálogo
  demoUrl: string;       // Ruta de la página de demo en el sitio
  colors: string[];      // Paleta representativa en hex ["#6B7A55", "#FAFAF7"]

  // Personajes
  supportsCharacters: boolean;
  characterSystem?: CharacterSystem;

  // Features incluidos en la demo
  features: InvitationFeature[];
  availableInPackages: PackageType[];

  // SEO
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

// ----------------------------------------------------------
// Plantilla de la línea de personajes
// ----------------------------------------------------------
export interface CharacterTemplateEntry {
  id: string;            // "CHAR-01"
  slug: string;          // "princesa-encantada"
  name: string;          // "Princesa Encantada"
  characterSystem: CharacterSystem;
  baseTemplateId: string; // ID de la plantilla base que usa
  demoUrl: string;
  previewImage: string;
  description: string;
  badge: CatalogBadge;
}
