// ============================================================
// ACCESSPREMIUM — Configuración central de rutas de demos
// Mapa de plantilla ID/slug → ruta de React Router
// ============================================================

import type { InvitationTemplate } from "@/types";

export interface DemoRoute {
  templateId: string;
  slug: string;
  path: string;       // Ruta de React Router, ej. "/bodas/botanica-verde-olivo"
  category: string;
}

/**
 * Genera la ruta del demo a partir de la categoría y el slug de la plantilla.
 * Mantiene la estructura semántica: /{categoria}/{slug}
 */
export function buildDemoPath(category: string, slug: string): string {
  return `/${category}/${slug}`;
}

/**
 * Genera la lista completa de rutas de demo a partir del catálogo.
 * Se llama en App.tsx para registrar todas las rutas dinámicamente.
 */
export function buildDemoRoutes(templates: InvitationTemplate[]): DemoRoute[] {
  return templates.map((t) => ({
    templateId: t.id,
    slug: t.slug,
    path: buildDemoPath(t.category, t.slug),
    category: t.category,
  }));
}

// ──────────────────────────────────────────────────────────
// Rutas estáticas de la landing y páginas principales
// ──────────────────────────────────────────────────────────
export const STATIC_ROUTES = {
  HOME: "/",
  CATALOG: "/catalogo",
  CATALOG_CATEGORY: "/catalogo/:category",
  PACKAGES: "/paquetes",
  HOW_IT_WORKS: "/como-funciona",
  CONTACT: "/contacto",
  NOT_FOUND: "*",
} as const;

// ──────────────────────────────────────────────────────────
// Prefijo de rutas de demo
// ──────────────────────────────────────────────────────────
export const DEMO_ROUTE_CATEGORIES = [
  "bodas",
  "xv-anos",
  "xv-hombres",
  "cumpleanos",
  "baby-shower",
  "bautizo",
  "comunion",
  "revelacion",
  "graduacion",
  "jubilacion",
  "luctuoso",
] as const;
