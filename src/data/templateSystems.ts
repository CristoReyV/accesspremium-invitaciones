// ============================================================
// ACCESSPREMIUM INVITACIONES — Sistemas de Familias Visuales
// Define las 9 familias de diseño del catálogo.
// ============================================================

import type { VisualFamily } from "@/types";

export interface VisualFamilyMeta {
  id: VisualFamily;
  name: string;
  description: string;
  personality: string[];      // Palabras clave de personalidad
  typicalColors: string[];    // Paleta representativa en hex
  typicalFonts: {
    display: string;
    script: string;
    body: string;
  };
  decorationLevelRange: [min: number, max: number];
  colorMode: "light" | "dark" | "both";
  applicableCategories: string[]; // IDs de categorías donde aplica
  components: string[];           // Componentes más relevantes de esta familia
  commercialStrength: 1 | 2 | 3 | 4 | 5;
}

export const VISUAL_FAMILIES: VisualFamilyMeta[] = [
  {
    id: "botanical-elegance",
    name: "Botanical Elegance",
    description:
      "Acuarelas vegetales, fondos texturizados, eucalipto y flores. Elegante, natural y atemporal.",
    personality: ["elegante", "natural", "fresco", "editorial", "atemporal"],
    typicalColors: ["#6B7A55", "#FAFAF7", "#C4A962", "#2D4A35", "#F5F0E8"],
    typicalFonts: {
      display: "Cormorant Garamond",
      script: "Great Vibes",
      body: "Inter",
    },
    decorationLevelRange: [2, 4],
    colorMode: "light",
    applicableCategories: ["bodas", "bautizo", "comunion", "jubilacion", "xv-anos"],
    components: [
      "EnvelopeIntro",
      "ThemeDecorations",
      "PhotoGallery",
      "ParentsSection",
      "GodparentsSection",
    ],
    commercialStrength: 5,
  },
  {
    id: "dark-mode-premium",
    name: "Dark Mode Premium",
    description:
      "Fondos oscuros profundos con detalles en dorado, plata o blanco. Lujo nocturno moderno.",
    personality: ["lujoso", "moderno", "sofisticado", "nocturno", "premium"],
    typicalColors: ["#0A0A0A", "#D4AF37", "#FFFFFF", "#0D1B2A", "#C9A84C"],
    typicalFonts: {
      display: "Cormorant Garamond",
      script: "Pinyon Script",
      body: "Inter",
    },
    decorationLevelRange: [1, 3],
    colorMode: "dark",
    applicableCategories: [
      "bodas",
      "xv-hombres",
      "cumpleanos",
      "graduacion",
      "jubilacion",
    ],
    components: [
      "InvitationHero",
      "CountdownTimer",
      "DressCodeCard",
      "ItineraryTimeline",
    ],
    commercialStrength: 4,
  },
  {
    id: "coquette-aesthetic",
    name: "Coquette Aesthetic",
    description:
      "Rosa pastel, moños line art, cerezas y estética girly tipo diario. Muy vigente en redes.",
    personality: ["tierno", "estético", "viral", "femenino", "cute"],
    typicalColors: ["#FFE8F0", "#FF9EC4", "#CC1122", "#E91E8C", "#FFFFFF"],
    typicalFonts: {
      display: "Playfair Display",
      script: "Dancing Script",
      body: "Lato",
    },
    decorationLevelRange: [2, 4],
    colorMode: "light",
    applicableCategories: [
      "xv-anos",
      "cumpleanos",
      "baby-shower",
      "revelacion",
    ],
    components: [
      "ThemeDecorations",
      "PhotoGallery",
      "FloatingElements",
      "CountdownTimer",
    ],
    commercialStrength: 5,
  },
  {
    id: "safari-animal-friends",
    name: "Safari Animal Friends",
    description:
      "Animales ilustrados en acuarela, tonos tierra cálidos y textura de lino. Neutro de género.",
    personality: ["tierno", "cálido", "natural", "familiar", "ilustrado"],
    typicalColors: ["#8FB98A", "#F5F0E8", "#4A3728", "#E8C97A", "#F5C4B0"],
    typicalFonts: {
      display: "Playfair Display",
      script: "Pacifico",
      body: "Nunito",
    },
    decorationLevelRange: [3, 4],
    colorMode: "light",
    applicableCategories: ["baby-shower", "revelacion", "cumpleanos", "bautizo"],
    components: [
      "InvitationHero",
      "ThemeDecorations",
      "GiftRegistry",
      "QRMemoryButton",
    ],
    commercialStrength: 4,
  },
  {
    id: "princess-fantasy",
    name: "Princess Fantasy",
    description:
      "Brillos, coronas, castillos y script ornamentado. Para princesas de cualquier edad.",
    personality: ["mágico", "soñador", "elegante", "infantil-premium", "festivo"],
    typicalColors: ["#1A4A8A", "#C0C0C0", "#D4AF37", "#FFFFFF", "#7B2FBE"],
    typicalFonts: {
      display: "Cormorant Garamond",
      script: "Pinyon Script",
      body: "Raleway",
    },
    decorationLevelRange: [3, 4],
    colorMode: "both",
    applicableCategories: ["xv-anos", "cumpleanos"],
    components: [
      "CharacterFrame",
      "InvitationHero",
      "ThemeDecorations",
      "FloatingElements",
    ],
    commercialStrength: 5,
  },
  {
    id: "racing-action",
    name: "Racing / Action",
    description:
      "Fibra de carbono, velocidad, alto contraste y dinamismo. Para varones de todas las edades.",
    personality: ["dinámico", "masculino", "energético", "deportivo", "juvenil"],
    typicalColors: ["#0A0A0A", "#F5C000", "#CC0000", "#FFFFFF", "#333333"],
    typicalFonts: {
      display: "Oswald",
      script: "Bebas Neue",
      body: "Inter",
    },
    decorationLevelRange: [2, 4],
    colorMode: "dark",
    applicableCategories: ["xv-hombres", "cumpleanos"],
    components: [
      "InvitationHero",
      "ThemeDecorations",
      "CountdownTimer",
      "PhotoGallery",
    ],
    commercialStrength: 4,
  },
  {
    id: "editorial-fine-art",
    name: "Editorial Fine Art",
    description:
      "Fotografía editorial B/N, bloques tipográficos y sans-serif. Sofisticado y diferenciado.",
    personality: ["editorial", "sofisticado", "artístico", "minimal", "fotográfico"],
    typicalColors: ["#000000", "#FFFFFF", "#B89A60", "#888888", "#F0F0F0"],
    typicalFonts: {
      display: "Didact Gothic",
      script: "Bodoni Moda",
      body: "IBM Plex Sans",
    },
    decorationLevelRange: [1, 2],
    colorMode: "light",
    applicableCategories: ["bodas", "graduacion"],
    components: [
      "InvitationHero",
      "PhotoGallery",
      "ItineraryTimeline",
      "DressCodeCard",
    ],
    commercialStrength: 3,
  },
  {
    id: "religious-classic",
    name: "Religious Classic",
    description:
      "Elementos religiosos (arcos, palomas, cruces, lazo), clásico y solemne.",
    personality: ["solemne", "respetuoso", "clásico", "religioso", "familiar"],
    typicalColors: ["#FFFFFF", "#F5F0E8", "#C4A962", "#000000", "#B8A080"],
    typicalFonts: {
      display: "Cormorant Garamond",
      script: "Great Vibes",
      body: "Lato",
    },
    decorationLevelRange: [1, 3],
    colorMode: "light",
    applicableCategories: ["bautizo", "comunion", "luctuoso"],
    components: [
      "ThemeDecorations",
      "ParentsSection",
      "GodparentsSection",
      "ItineraryTimeline",
    ],
    commercialStrength: 4,
  },
  {
    id: "gamer-neon",
    name: "Gamer Neon",
    description:
      "Fondos oscuros, neones vibrantes, pixel art o UI tipo videojuego. Para gamers de toda edad.",
    personality: ["vibrante", "tecnológico", "gamer", "dinámico", "juvenil"],
    typicalColors: ["#0A0A0A", "#FF00AA", "#00FFFF", "#7C3AED", "#F5C000"],
    typicalFonts: {
      display: "Press Start 2P",
      script: "Orbitron",
      body: "Rajdhani",
    },
    decorationLevelRange: [3, 4],
    colorMode: "dark",
    applicableCategories: ["cumpleanos", "xv-hombres"],
    components: [
      "InvitationHero",
      "ThemeDecorations",
      "FloatingElements",
      "CountdownTimer",
    ],
    commercialStrength: 3,
  },
];

// Helper: obtener familia por ID
export function getFamilyById(id: VisualFamily): VisualFamilyMeta | undefined {
  return VISUAL_FAMILIES.find((f) => f.id === id);
}
