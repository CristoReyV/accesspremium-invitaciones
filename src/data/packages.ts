// ============================================================
// ACCESSPREMIUM INVITACIONES — Paquetes comerciales
// ============================================================

import type { PackageType, InvitationFeature } from "@/types";

export interface PackageFeatureDetail {
  feature: InvitationFeature | string;
  label: string;
  included: boolean;
  detail?: string; // Ej. "Hasta 5 fotos" | "Ilimitadas"
}

export interface Package {
  id: PackageType;
  name: string;
  price: number;          // Precio en MXN
  deposit: number;        // Anticipo para apartar
  deliveryDays: number;   // Días hábiles para entrega normal
  expressAvailable: boolean;
  expressCost: number;    // Costo adicional por express (0 si incluido)
  badge?: string;         // "Más popular" | "Mejor valor" | undefined
  description: string;    // Descripción breve para la tarjeta de precio
  color: string;          // Color de acento de la tarjeta en hex
  features: PackageFeatureDetail[];
}

export const PACKAGES: Package[] = [
  {
    id: "basico",
    name: "Básico",
    price: 299,
    deposit: 50,
    deliveryDays: 3,
    expressAvailable: false,
    expressCost: 100,
    badge: undefined,
    description: "Ideal para una invitación sencilla, bonita y lista para compartir.",
    color: "#8B9298", // Un gris azulado neutro
    features: [
      { feature: "sobre-animado", label: "Invitación web personalizada", included: true },
      { feature: "itinerario", label: "Datos del evento", included: true },
      { feature: "galeria-fotos", label: "1 a 3 fotos", included: true },
      { feature: "ubicacion", label: "Ubicación con botón a Google Maps", included: true },
      { feature: "confirmacion-rsvp", label: "Link para compartir", included: true },
      { feature: "musica", label: "Música de fondo", included: false },
      { feature: "subir-fotos", label: "Botón para subir fotos", included: false },
      { feature: "qr-recuerdos", label: "Código QR", included: false },
      { feature: "express", label: "Entrega express", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 349,
    deposit: 50,
    deliveryDays: 3,
    expressAvailable: true,
    expressCost: 100,
    badge: undefined,
    description: "Todo lo del Básico + música, más fotos y RSVP avanzado.",
    color: "#B8972B",
    features: [
      { feature: "sobre-animado", label: "Diseño más personalizado", included: true },
      { feature: "galeria-fotos", label: "Más fotos del festejado", included: true, detail: "Hasta 5 fotos" },
      { feature: "musica", label: "Música de fondo", included: true },
      { feature: "ubicacion", label: "Ubicación con Google Maps", included: true },
      { feature: "confirmacion-rsvp", label: "Confirmación de asistencia", included: true },
      { feature: "subir-fotos", label: "Botón para subir fotos", included: false },
      { feature: "qr-recuerdos", label: "Código QR", included: false },
    ],
  },
  {
    id: "recuerdos",
    name: "Recuerdos",
    price: 429,
    deposit: 50,
    deliveryDays: 3,
    expressAvailable: true,
    expressCost: 100,
    badge: "Más popular",
    description: "Todo Premium + funciones para guardar y compartir el momento.",
    color: "#6B7A55",
    features: [
      { feature: "sobre-animado", label: "Todo lo del Premium", included: true },
      { feature: "subir-fotos", label: "Botón para subir fotos", included: true },
      { feature: "qr-recuerdos", label: "Código QR del evento", included: true },
      { feature: "galeria-fotos-post", label: "Galería o recuerdos", included: true },
      { feature: "express", label: "Entrega express", included: false },
    ],
  },
  {
    id: "fiesta-total",
    name: "Fiesta Total",
    price: 499,
    deposit: 100,
    deliveryDays: 3,
    expressAvailable: true,
    expressCost: 0, // Express incluido
    badge: "Mejor valor",
    description: "La experiencia máxima con express incluido y personalización total.",
    color: "#0D1B2A",
    features: [
      { feature: "sobre-animado", label: "Todo lo anterior", included: true },
      { feature: "express", label: "Entrega express en 24 horas", included: true },
      { feature: "personalizacion", label: "Personalización avanzada", included: true },
    ],
  },
];

// Helper: obtener paquete por ID
export function getPackageById(id: PackageType): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}
