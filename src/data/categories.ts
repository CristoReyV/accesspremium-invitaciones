// ============================================================
// ACCESSPREMIUM INVITACIONES — Categorías de eventos
// ============================================================

import type { EventCategory } from "@/types";

export interface CategoryMeta {
  id: EventCategory;
  label: string;        // Nombre para mostrar al usuario
  emoji: string;        // Emoji representativo
  icon: string;         // Nombre del ícono de lucide-react
  description: string;  // Descripción breve para SEO y catálogo
  slug: string;         // Segmento de URL
  color: string;        // Color de acento en hex
  order: number;        // Orden de aparición en la landing
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "bodas",
    label: "Bodas",
    emoji: "💍",
    icon: "Heart",
    description: "Invitaciones elegantes para el día más especial de tu vida.",
    slug: "bodas",
    color: "#B8972B",
    order: 1,
  },
  {
    id: "xv-anos",
    label: "XV Años",
    emoji: "👑",
    icon: "Crown",
    description: "Invitaciones mágicas y personalizadas para tus quinceaños.",
    slug: "xv-anos",
    color: "#C084FC",
    order: 2,
  },
  {
    id: "xv-hombres",
    label: "XV Años Hombre",
    emoji: "🎯",
    icon: "Star",
    description: "Diseños masculinos elegantes y modernos para los XV años.",
    slug: "xv-hombres",
    color: "#3B82F6",
    order: 3,
  },
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    emoji: "🎉",
    icon: "Gift",
    description: "Invitaciones festivas para celebrar tu cumpleaños con estilo.",
    slug: "cumpleanos",
    color: "#F59E0B",
    order: 4,
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    emoji: "🍼",
    icon: "Baby",
    description: "Invitaciones tiernas y elegantes para recibir al nuevo bebé.",
    slug: "baby-shower",
    color: "#86EFAC",
    order: 5,
  },
  {
    id: "bautizo",
    label: "Bautizo",
    emoji: "✨",
    icon: "Sparkles",
    description: "Invitaciones elegantes y emotivas para el bautizo de tu bebé.",
    slug: "bautizo",
    color: "#93C5FD",
    order: 6,
  },
  {
    id: "comunion",
    label: "Comunión",
    emoji: "🕊️",
    icon: "Church",
    description: "Invitaciones solemnes y hermosas para la Primera Comunión.",
    slug: "comunion",
    color: "#D4AF37",
    order: 7,
  },
  {
    id: "revelacion",
    label: "Revelación de Género",
    emoji: "🎀",
    icon: "Baby",
    description: "Invitaciones interactivas con votación Team Boy / Team Girl.",
    slug: "revelacion",
    color: "#F9A8D4",
    order: 8,
  },
  {
    id: "graduacion",
    label: "Graduación",
    emoji: "🎓",
    icon: "GraduationCap",
    description: "Invitaciones elegantes para celebrar tu logro académico.",
    slug: "graduacion",
    color: "#1B2D4F",
    order: 9,
  },
  {
    id: "jubilacion",
    label: "Jubilación",
    emoji: "🌸",
    icon: "Award",
    description: "Invitaciones elegantes para celebrar una vida de trabajo.",
    slug: "jubilacion",
    color: "#F472B6",
    order: 10,
  },
  {
    id: "luctuoso",
    label: "Luctuoso",
    emoji: "🕯️",
    icon: "Candle",
    description: "Invitaciones respetuosas y elegantes para honrar la memoria.",
    slug: "luctuoso",
    color: "#78716C",
    order: 11,
  },
];

// Helper: obtener categoría por ID
export function getCategoryById(id: EventCategory): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// Helper: obtener categorías ordenadas para mostrar en la landing
export function getOrderedCategories(): CategoryMeta[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}
