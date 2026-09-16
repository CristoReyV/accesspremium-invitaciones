// ============================================================
// ACCESSPREMIUM INVITACIONES — Datos de invitación personalizada
// Estos son los datos que el CLIENTE proporciona para su invitación.
// ============================================================

import type { PackageType } from "./invitation";

// ----------------------------------------------------------
// Integrantes familiares
// ----------------------------------------------------------
export interface Parent {
  name: string;
  role?: string; // "Mamá" | "Papá" | "Abuelita" | personalizado
}

export interface Godparent {
  name: string;
  role?: string; // "Padrinos de Lazo" | "Madrina de Arras" | etc.
}

// ----------------------------------------------------------
// Ubicación del evento (puede ser múltiple: ceremonia + recepción)
// ----------------------------------------------------------
export type LocationType =
  | "ceremonia"
  | "recepcion"
  | "cena"
  | "fiesta"
  | "misa"
  | "presentacion"
  | "otro";

export interface EventLocation {
  name: string;     // "Iglesia San Francisco"
  address: string;  // Dirección completa
  mapsUrl: string;  // Link de Google Maps
  type: LocationType;
  time?: string;    // "18:00" — hora de inicio de esa locación
}

// ----------------------------------------------------------
// Itinerario del evento
// ----------------------------------------------------------
export interface ItineraryItem {
  time: string;   // "18:00"
  label: string;  // "Recepción de invitados"
  icon?: string;  // Nombre de ícono de lucide-react (opcional)
}

// ----------------------------------------------------------
// Código de vestimenta
// ----------------------------------------------------------
export interface DressCode {
  label: string;        // "Formal" | "Cocktail" | "Casual elegante" | etc.
  colors: string[];     // Paleta de colores sugeridos en hex
  avoidColors?: string[]; // Colores a evitar en hex
  description?: string; // Notas adicionales para los invitados
}

// ----------------------------------------------------------
// Mesa de regalos
// ----------------------------------------------------------
export type GiftPlatform =
  | "amazon"
  | "mercado-libre"
  | "liverpool"
  | "palacio-de-hierro"
  | "sears"
  | "bancomer"
  | "banamex"
  | "santander"
  | "hsbc"
  | "transferencia"
  | "otro";

export interface GiftRegistryItem {
  platform: GiftPlatform;
  label: string;   // Texto del botón, ej. "Ver mesa en Amazon"
  url?: string;    // Link directo a la mesa
  bankInfo?: {     // Solo para transferencia bancaria
    bank: string;
    account: string;
    clabe?: string;
    holderName: string;
  };
}

// ----------------------------------------------------------
// Datos completos de una invitación personalizada (del cliente)
// ----------------------------------------------------------
export interface InvitationPersonalData {
  // Identificación del pedido
  templateId: string;  // ID de la plantilla elegida, ej. "AP-BOD-01"
  orderId: string;     // ID único del pedido

  // Protagonistas del evento
  mainName: string;       // Nombre principal (festejado/a, nombre de los novios, etc.)
  secondName?: string;    // Nombre de la pareja (bodas, XV hombre+novia, etc.)
  parents?: Parent[];
  godparents?: Godparent[];

  // Fecha y hora del evento
  eventDate: string;  // ISO 8601, ej. "2026-11-15T18:00:00"
  eventTime: string;  // Formato legible, ej. "6:00 PM"

  // Ubicaciones (puede ser 1 o varias)
  locations: EventLocation[];

  // Personalización del mensaje
  customMessage?: string; // Frase o cita destacada del festejado
  customColors?: string[]; // Solo si el cliente pide colores fuera del tema base

  // Multimedia
  photos: string[];       // URLs de las fotos (subidas a Cloudinary u hosting)
  heroPhoto?: string;     // Foto principal / portada
  musicUrl?: string;      // Link a la canción (Spotify, YouTube, etc.)
  musicTitle?: string;    // Nombre de la canción
  musicArtist?: string;   // Artista

  // Secciones opcionales de contenido
  itinerary?: ItineraryItem[];
  dressCode?: DressCode;
  giftRegistry?: GiftRegistryItem[];

  // Interactividad
  rsvpWhatsapp?: string;   // Número WhatsApp para confirmar, ej. "526645922368"
  rsvpEmail?: string;
  uploadPhotosUrl?: string; // Link a Google Drive / Mega para que los invitados suban fotos
  qrContent?: string;       // Contenido codificado en el QR (URL, texto)

  // Configuración de personaje (si aplica)
  characterThemeId?: string;     // ID del CharacterTheme elegido
  characterPhotos?: string[];    // Fotos del festejado con disfraz / temática

  // Paquete y entrega
  package: PackageType;
  deliveryType: "normal" | "express";
  deliveryDeadline: string; // ISO 8601

  // Datos operativos del cliente
  clientName: string;
  clientPhone: string;
  orderDate: string; // ISO 8601
}
