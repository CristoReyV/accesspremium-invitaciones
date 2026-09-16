import type { InvitationPersonalData } from "@/types";

export const DEMO_BODA_BOTANICA: InvitationPersonalData = {
  templateId: "AP-BOD-01",
  orderId: "DEMO-BOD-001",
  mainName: "Sofía",
  secondName: "Mateo",
  parents: [
    { name: "Carmen Valdez y Luis Rodríguez", role: "Padres de la Novia" },
    { name: "Marta Gómez y Carlos Hernández", role: "Padres del Novio" },
  ],
  godparents: [{ name: "Ana y José Morales", role: "Padrinos de Velación" }],
  eventDate: "2026-11-14T17:00:00",
  eventTime: "5:00 PM",
  locations: [
    {
      name: "Templo de San Francisco",
      address: "Centro Histórico, Zona 1",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "17:00",
    },
    {
      name: "Hacienda Los Arcángeles",
      address: "Carretera Norte Km 15",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "19:00",
    },
  ],
  customMessage: "El amor es la fuerza más sutil del mundo. Acompáñanos a celebrar nuestra unión.",
  photos: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  musicTitle: "Perfect",
  musicArtist: "Ed Sheeran",
  itinerary: [
    { time: "17:00", label: "Ceremonia Religiosa", icon: "church" },
    { time: "19:00", label: "Recepción", icon: "glass-water" },
    { time: "20:00", label: "Cena", icon: "utensils" },
    { time: "21:30", label: "Primer Baile", icon: "music" },
    { time: "02:00", label: "Fin de fiesta", icon: "moon" },
  ],
  dressCode: {
    label: "Formal / Etiqueta Rigurosa",
    colors: ["#000000", "#1A1A1A", "#333333"],
    avoidColors: ["#FFFFFF", "#F5F5DC"],
    description: "Nos encantaría verte lucir increíble. Sugerimos vestido largo y traje oscuro. Por favor, evitar color blanco.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de Regalos Liverpool", url: "#" },
    { platform: "amazon", label: "Mesa en Amazon", url: "#" },
    {
      platform: "transferencia",
      label: "Regalo Efectivo",
      bankInfo: { bank: "BBVA", account: "1234 5678 9012 3456", holderName: "Sofía Rodríguez" },
    },
  ],
  rsvpWhatsapp: "526645922368",
  package: "fiesta-total",
  deliveryType: "normal",
  deliveryDeadline: "2026-10-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

// ============================================================
// BODA REAL — AYDE & OCTAVIO
// Invitación real de cliente — Salón Pergolas, 30 enero 2027
// ============================================================
export const BODA_AYDE_OCTAVIO: InvitationPersonalData = {
  templateId: "AP-BOD-05",
  orderId: "BOD-AO-001",
  mainName: "Ayde",
  secondName: "Octavio",
  eventDate: "2027-01-30T18:00:00",
  eventTime: "Boda Religiosa: 11:00 AM · Boda Civil: 7:00 PM",
  locations: [
    {
      name: "Iglesia de San Francisco",
      address: "Chilpancingo de los Bravo, Guerrero",
      mapsUrl: "https://maps.app.goo.gl/8H6AhEvHzdskSbsq8?g_st=ic",
      type: "ceremonia",
      time: "11:00",
    },
    {
      name: "Salón Pérgolas",
      address: "Chilpancingo de los Bravo, Guerrero",
      mapsUrl: "https://share.google/lWcYnJDAivrdC6w2I",
      type: "recepcion",
      time: "19:00",
    },
  ],
  customMessage:
    "Las personas más especiales merecen acompañarnos en los momentos más importantes. Por ello, queremos invitarte a ser testigo de esta celebración y compartir con nosotros esta gran felicidad.",
  photos: [],
  heroPhoto: undefined,
  musicTitle: "Hasta Mi Final",
  musicArtist: "Il Divo",
  musicUrl: "/assets/invitations/cafe-espresso/hasta-mi-final.mp3",
  parents: [
    { name: "Eudoxio Remigio Morales", role: "Padre de la Novia" },
    { name: "Victoria Torres Flores · Octavio Ortega Aguilar", role: "Padres del Novio" },
  ],
  itinerary: [
    { time: "11:00", label: "Boda Religiosa", icon: "church" },
    { time: "19:00", label: "Boda Civil", icon: "rings" },
    { time: "20:30", label: "Recepción y Cena", icon: "glass-water" },
  ],
  dressCode: {
    label: "Formal Elegante",
    colors: ["#7B4F2E", "#C9A96E", "#2C1A0E", "#EDD9B8"],
    description: "Sugerimos traje oscuro para caballeros y vestido largo para damas. Por favor, evitar el color blanco.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Lluvia de Sobres", bankInfo: { bank: "Por confirmar", account: "Por confirmar", holderName: "Ayde & Octavio" } },
  ],
  rsvpWhatsapp: "527474998811",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-12-15T00:00:00",
  clientName: "Ayde & Octavio",
  clientPhone: "527474998811",
  orderDate: "2026-06-11T00:00:00",
};

export const DEMO_BODA_NOIR: InvitationPersonalData = {
  templateId: "AP-BOD-02",
  orderId: "DEMO-BOD-002",
  mainName: "Armando",
  secondName: "Laura",
  parents: [
    { name: "Carla Jimenez y Martha Padilla", role: "Padres de la Novia" },
    { name: "Ricardo Martinez y Lucia Mendez", role: "Padres del Novio" },
  ],
  godparents: [
    { name: "Laura Blanco y Roberto Padilla", role: "Padrinos" },
  ],
  eventDate: "2026-11-21T18:00:00",
  eventTime: "6:00 PM",
  locations: [
    {
      name: "Basilica de Nuestra Senora",
      address: "Paseo de la Reforma 112, Centro",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "18:00",
    },
    {
      name: "Hacienda La Estrella",
      address: "Camino Antiguo 45, Valle Norte",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:30",
    },
  ],
  customMessage:
    "Junto a nuestras familias queremos compartir una noche elegante, intima y llena de luz. Tu presencia hara mas especial este inicio.",
  photos: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/bodas/dark-mode-noir/white-rose-noir-frame.png",
  musicTitle: "Until I Found You",
  musicArtist: "Stephen Sanchez",
  itinerary: [
    { time: "18:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "20:30", label: "Recepcion", icon: "glass-water" },
    { time: "21:30", label: "Cena", icon: "utensils" },
    { time: "23:00", label: "Primer baile", icon: "music" },
  ],
  dressCode: {
    label: "Black tie / gala",
    colors: ["#050505", "#1B1B1B", "#D8C28A", "#FFFFFF"],
    avoidColors: ["#F7F3EA"],
    description: "Sugerimos vestido largo y traje oscuro. Reservamos blanco y marfil para la novia.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos", url: "#" },
    { platform: "transferencia", label: "Regalo en efectivo", bankInfo: { bank: "BBVA", account: "8899 0011 2233", holderName: "Laura Jimenez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "fiesta-total",
  deliveryType: "normal",
  deliveryDeadline: "2026-10-15T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BODA_WESTERN: InvitationPersonalData = {
  templateId: "AP-BOD-04",
  orderId: "DEMO-BOD-004",
  mainName: "Mariana",
  secondName: "Antonio",
  parents: [
    { name: "Angelica Perez Ramos y Carlos Medina Cruz", role: "Padres de la novia" },
    { name: "Paulina Cano Vazquez y Ricardo Flores Tejeda", role: "Padres del novio" },
  ],
  godparents: [
    { name: "Karla Perez Ramos y Ricardo Cano Cervantes", role: "Padrinos" },
  ],
  eventDate: "2026-08-07T18:00:00",
  eventTime: "6:00 PM",
  locations: [
    {
      name: "Parroquia Nuestra Senora de la Esperanza",
      address: "Centro Historico, San Miguel",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "18:00",
    },
    {
      name: "Salon de Fiestas Las Palmas",
      address: "Hacienda Los Mezquites, Km 24",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:30",
    },
  ],
  customMessage:
    "Con la bendicion, amor y apoyo de nuestras familias queremos compartir contigo el comienzo de nuestra historia bajo el cielo del rancho.",
  photos: [
    "/assets/templates/bodas/western-sunset/western-sunset-frame.png",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/bodas/western-sunset/western-sunset-frame.png",
  musicTitle: "Tennessee Whiskey",
  musicArtist: "Chris Stapleton",
  itinerary: [
    { time: "18:00", label: "Ceremonia", icon: "church" },
    { time: "20:30", label: "Recepcion", icon: "glass-water" },
    { time: "21:30", label: "Cena", icon: "utensils" },
    { time: "23:00", label: "Baile bajo las estrellas", icon: "music" },
  ],
  dressCode: {
    label: "Western formal",
    colors: ["#0A0A0A", "#C67A3B", "#E8D5B7", "#F9F0DD"],
    description: "Sugerimos vestido largo, traje formal y detalles western elegantes. Sombrero o botas son bienvenidos.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos Liverpool", url: "#" },
    { platform: "transferencia", label: "Regalo en efectivo", bankInfo: { bank: "BBVA", account: "5511 7788 9900", holderName: "Mariana Perez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "fiesta-total",
  deliveryType: "normal",
  deliveryDeadline: "2026-07-07T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_PRINCESA: InvitationPersonalData = {
  templateId: "AP-XVF-01",
  orderId: "DEMO-XVF-001",
  mainName: "Valentina",
  parents: [
    { name: "María Fernanda y Carlos Gómez", role: "Mis Padres" },
  ],
  godparents: [
    { name: "Tíos Laura y Roberto", role: "Padrinos de Honor" },
  ],
  eventDate: "2026-12-05T19:00:00",
  eventTime: "7:00 PM",
  locations: [
    {
      name: "Parroquia de San Judas",
      address: "Av. de las Rosas 123",
      mapsUrl: "https://maps.google.com",
      type: "misa",
      time: "19:00",
    },
    {
      name: "Salón Palacio Encantado",
      address: "Blvd. de la Fantasía 456",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "21:00",
    },
  ],
  customMessage: "Hay momentos en la vida que imaginamos desde niñas. Hoy ese sueño se hace realidad.",
  photos: [
    "https://images.unsplash.com/photo-1549474966-2319c5c2fc93?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "https://images.unsplash.com/photo-1549474966-2319c5c2fc93?auto=format&fit=crop&w=800&q=80",
  musicTitle: "A Thousand Years",
  musicArtist: "Christina Perri",
  itinerary: [
    { time: "19:00", label: "Misa de Acción de Gracias", icon: "church" },
    { time: "21:00", label: "Llegada de invitados", icon: "glass-water" },
    { time: "22:00", label: "Vals y Brindis", icon: "music" },
    { time: "23:00", label: "Cena", icon: "utensils" },
  ],
  dressCode: {
    label: "Formal / Gala",
    colors: [],
    description: "Sugerimos traje para los caballeros y vestido largo para las damas.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Lluvia de Sobres", bankInfo: { bank: "Santander", account: "0987 6543 2109", holderName: "María Fernanda" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-11-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_GOLD_WAVES: InvitationPersonalData = {
  templateId: "AP-XVH-01",
  orderId: "DEMO-XVH-001",
  mainName: "Oscar",
  parents: [
    { name: "Ivan y Claudia", role: "Mis padres" },
  ],
  godparents: [
    { name: "Arturo y Valeria", role: "Padrinos de honor" },
  ],
  eventDate: "2026-10-21T19:00:00",
  eventTime: "7:00 PM",
  locations: [
    {
      name: "Parroquia Santa Marta",
      address: "Av. de los Encinos 248, Centro",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "19:00",
    },
    {
      name: "Salon El Paraiso",
      address: "Calzada del Lago 520, Jardines",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:30",
    },
  ],
  customMessage:
    "Gracias al ejemplo y al apoyo incondicional de mis padres. Hoy celebro con alegria el inicio de esta nueva etapa, y quiero contar con tu presencia.",
  photos: [
    "/assets/templates/xv-hombres/gold-waves/oscar-suit-portrait.png",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/xv-hombres/gold-waves/oscar-suit-portrait.png",
  musicTitle: "Golden Hour",
  musicArtist: "JVKE",
  itinerary: [
    { time: "19:00", label: "Ceremonia de accion de gracias", icon: "church" },
    { time: "20:30", label: "Recepcion", icon: "glass-water" },
    { time: "21:30", label: "Cena", icon: "utensils" },
    { time: "22:30", label: "Brindis y fotos", icon: "camera" },
  ],
  dressCode: {
    label: "Formal / traje oscuro",
    colors: ["#0B1A35", "#111111", "#C9A84C", "#FFFFFF"],
    description: "Sugerimos traje oscuro para caballeros y vestido formal para damas. Detalles dorados son bienvenidos.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Lluvia de sobres", bankInfo: { bank: "BBVA", account: "5577 8899 0022", holderName: "Oscar Mendoza" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-09-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_RACING_SPEED: InvitationPersonalData = {
  templateId: "AP-XVH-02",
  orderId: "DEMO-XVH-002",
  mainName: "Daniel",
  parents: [
    { name: "Carmen Ramirez y Marco Gonzalez", role: "Mis padres" },
  ],
  eventDate: "2026-10-13T15:00:00",
  eventTime: "3:00 PM",
  locations: [
    {
      name: "Hacienda La Astilla",
      address: "Camino al Autodromo 150, La Primavera",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "Junto con mis padres te invito a compartir este gran momento. Una carrera inolvidable comienza a las 15.",
  photos: [
    "/assets/templates/xv-hombres/racing-speed/racing-speed-frame.svg",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/xv-hombres/racing-speed/racing-speed-frame.svg",
  musicTitle: "Blinding Lights",
  musicArtist: "The Weeknd",
  itinerary: [
    { time: "15:00", label: "Arranque de la celebracion", icon: "flag" },
    { time: "20:00", label: "Recepcion", icon: "glass-water" },
    { time: "21:00", label: "Cena", icon: "utensils" },
    { time: "22:30", label: "Fotos y pista", icon: "camera" },
  ],
  dressCode: {
    label: "Formal racing",
    colors: ["#050505", "#C99A2E", "#F8F8F8", "#2B2B2B"],
    description: "Sugerimos atuendo formal en negro, blanco o dorado. Puedes sumar un detalle racing elegante.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Regalo libre", bankInfo: { bank: "Santander", account: "3311 2244 7788", holderName: "Daniel Ramirez" } },
    { platform: "liverpool", label: "Mesa de regalos", url: "#" },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-09-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_GATSBY_MEN: InvitationPersonalData = {
  templateId: "AP-XVH-03",
  orderId: "DEMO-XVH-003",
  mainName: "Santiago",
  parents: [
    { name: "Mariana Torres y Eduardo Salazar", role: "Mis padres" },
  ],
  eventDate: "2027-02-20T20:00:00",
  eventTime: "8:00 PM",
  locations: [
    {
      name: "Grand Hotel Imperial",
      address: "Av. Reforma 240, Centro Historico",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "Junto con mis padres quiero celebrar una noche elegante, llena de musica, brindis y memorias que comienzan a los 15.",
  photos: [
    "/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-frame.svg",
    "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=900&q=85",
    "/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-portrait.svg",
  ],
  heroPhoto: "/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-frame.svg",
  musicTitle: "Fly Me To The Moon",
  musicArtist: "Frank Sinatra",
  itinerary: [
    { time: "20:00", label: "Recepcion de gala", icon: "glass-water" },
    { time: "21:00", label: "Cena", icon: "utensils" },
    { time: "22:00", label: "Brindis familiar", icon: "music" },
    { time: "23:00", label: "Fotos y pista", icon: "camera" },
  ],
  dressCode: {
    label: "Gala Gatsby",
    colors: ["#050505", "#4B1013", "#D5AF56", "#F7F0DE"],
    description: "Sugerimos traje oscuro, camisa formal y detalles en dorado, vino o champagne.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Regalo libre", bankInfo: { bank: "BBVA", account: "1177 2200 4499", holderName: "Santiago Salazar" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2027-01-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_GATSBY: InvitationPersonalData = {
  templateId: "AP-XVF-02",
  orderId: "DEMO-XVF-002",
  mainName: "Gabriela",
  parents: [
    { name: "Francisco Javier Delgado y Claudia Eunice Gutierrez", role: "Mis padres" },
  ],
  godparents: [
    { name: "Carolina Gutierrez", role: "Mi madrina" },
  ],
  eventDate: "2026-10-18T20:00:00",
  eventTime: "8:00 PM",
  locations: [
    {
      name: "Parroquia de Nuestra Senora de Lourdes",
      address: "Calle La Rosa 112, Centro",
      mapsUrl: "https://maps.google.com",
      type: "misa",
      time: "18:00",
    },
    {
      name: "Salon Victoria",
      address: "Paseo San Jacinto 540, Zona Hotelera",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "Nos encantaria que nos acompanaras en este momento tan especial. Hoy doy gracias a Dios por regalarme la vida y por crecer con el amor de mi familia y amigos.",
  photos: [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/xv-anos/gatsby-gold/art-deco-frame.png",
  musicTitle: "Young and Beautiful",
  musicArtist: "Lana Del Rey",
  itinerary: [
    { time: "18:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "20:00", label: "Recepcion de invitados", icon: "glass-water" },
    { time: "21:00", label: "Vals y brindis", icon: "music" },
    { time: "22:00", label: "Cena de gala", icon: "utensils" },
  ],
  dressCode: {
    label: "Gala / negro y dorado",
    colors: ["#050505", "#D4AF37", "#F7F0DE"],
    description: "Sugerimos vestido largo, traje formal y acentos en negro, dorado o champagne.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Lluvia de sobres", bankInfo: { bank: "Santander", account: "4455 6677 8899", holderName: "Gabriela Delgado" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "recuerdos",
  deliveryType: "normal",
  deliveryDeadline: "2026-09-18T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_XV_BOSQUE: InvitationPersonalData = {
  templateId: "AP-XVF-03",
  orderId: "DEMO-XVF-003",
  mainName: "Laura Fernanda",
  parents: [
    { name: "Alejandra Molina y Rafael Cardenas", role: "Mis padres" },
  ],
  godparents: [
    { name: "Claudia y Ernesto Rivera", role: "Padrinos de honor" },
  ],
  eventDate: "2027-05-26T19:00:00",
  eventTime: "7:00 PM",
  locations: [
    {
      name: "Parroquia Santa Cecilia",
      address: "Jardin de los Encinos 132, Centro",
      mapsUrl: "https://maps.google.com",
      type: "misa",
      time: "19:00",
    },
    {
      name: "Hacienda Lago Escondido",
      address: "Camino al Bosque Km 8, Valle Verde",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "21:00",
    },
  ],
  customMessage:
    "Entre flores, luz de luna y luciernagas quiero compartir el inicio de una historia que imagine desde nina.",
  photos: [
    "/assets/templates/xv-anos/bosque-encantado/enchanted-forest-gate.svg",
    "/assets/templates/xv-anos/bosque-encantado/enchanted-forest-lake.svg",
    "/assets/templates/xv-anos/bosque-encantado/enchanted-portrait-card.svg",
  ],
  heroPhoto: "/assets/templates/xv-anos/bosque-encantado/enchanted-forest-gate.svg",
  musicTitle: "Once Upon a Dream",
  musicArtist: "Lana Del Rey",
  itinerary: [
    { time: "19:00", label: "Misa de accion de gracias", icon: "church" },
    { time: "21:00", label: "Recepcion en el jardin", icon: "glass-water" },
    { time: "22:00", label: "Vals bajo las luces", icon: "music" },
    { time: "23:00", label: "Cena y fotos", icon: "camera" },
  ],
  dressCode: {
    label: "Gala bosque encantado",
    colors: ["#143E28", "#D4BC70", "#8B5CF6", "#F7E9CF"],
    description: "Sugerimos atuendo formal. Puedes sumar detalles en verde profundo, dorado, lavanda o champagne.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Lluvia de sobres", bankInfo: { bank: "Santander", account: "5566 7788 9911", holderName: "Laura Fernanda Cardenas" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2027-04-26T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_RACING: InvitationPersonalData = {
  templateId: "AP-CUM-04",
  orderId: "DEMO-CUM-004",
  mainName: "Leo",
  parents: [
    { name: "Ernesto Maldonado y Marina Reyes", role: "Mis papás" },
  ],
  eventDate: "2026-08-20T16:00:00",
  eventTime: "4:00 PM",
  locations: [
    {
      name: "Salón Grand Prix",
      address: "Pista de Carreras Sur 789",
      mapsUrl: "https://maps.google.com",
      type: "fiesta",
      time: "16:00",
    },
  ],
  customMessage: "¡Arranca la diversión! Te espero para celebrar mi cumpleaños a toda velocidad.",
  photos: [
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
  musicTitle: "Life is a Highway",
  musicArtist: "Rascal Flatts",
  itinerary: [
    { time: "16:00", label: "Llegada a pits", icon: "flag" },
    { time: "16:30", label: "Juegos de pista", icon: "party" },
    { time: "17:30", label: "Pastel del campeón", icon: "utensils" },
    { time: "18:00", label: "Foto del equipo", icon: "camera" },
  ],
  dressCode: {
    label: "Ropa Cómoda",
    colors: ["#FF0000", "#000000"],
    description: "Ven listo para jugar y divertirte. ¡Puedes usar rojo o negro!",
  },
  rsvpWhatsapp: "526645922368",
  package: "recuerdos",
  deliveryType: "normal",
  deliveryDeadline: "2026-07-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_CUMPLE_GOLDEN_GLAM: InvitationPersonalData = {
  templateId: "AP-CUM-01",
  orderId: "DEMO-CUM-001",
  mainName: "Claudia",
  eventDate: "2026-10-13T21:00:00",
  eventTime: "9:00 PM",
  locations: [
    {
      name: "Real Las Palmas",
      address: "Terraza Central, Blvd. Las Palmas 120",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "21:00",
    },
  ],
  customMessage:
    "Te invito a celebrar mis 30 en una noche que promete ser inolvidable. Brindemos por la vida, la musica y los buenos momentos.",
  photos: [
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/cumpleanos/golden-glam/gold-party-frame.png",
  musicTitle: "Levitating",
  musicArtist: "Dua Lipa",
  itinerary: [
    { time: "21:00", label: "Recepcion", icon: "glass-water" },
    { time: "22:00", label: "Brindis", icon: "sparkles" },
    { time: "23:00", label: "Musica y baile", icon: "music" },
    { time: "00:00", label: "Pastel", icon: "gift" },
  ],
  dressCode: {
    label: "Formal glam",
    colors: ["#111111", "#D4AF37", "#F7F3EA", "#FFFFFF"],
    description: "Sugerimos negro, dorado, champagne o blanco perla. Ven listo para brindar.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para Claudia", bankInfo: { bank: "Santander", account: "2233 4455 6677", holderName: "Claudia Montes" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-09-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_KAWAII_FRIENDS: InvitationPersonalData = {
  templateId: "AP-CUM-02",
  orderId: "DEMO-CUM-002",
  mainName: "Valeria",
  parents: [
    { name: "Ernesto Maldonado y Marina Reyes", role: "Mis papas" },
  ],
  eventDate: "2026-09-12T10:30:00",
  eventTime: "10:30 AM",
  locations: [
    {
      name: "Belaterra Eventos",
      address: "Av. Ruiz Cortines 498, San Miguel",
      mapsUrl: "https://maps.google.com",
      type: "fiesta",
      time: "10:30",
    },
  ],
  customMessage:
    "Prepara tu sonrisa, tus colores favoritos y muchas ganas de jugar. Este dia estara lleno de pastel, stickers y alegria.",
  photos: [
    "/assets/templates/cumpleanos/kawaii-friends/kawaii-party-frame.png",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/cumpleanos/kawaii-friends/kawaii-party-frame.png",
  musicTitle: "Happy",
  musicArtist: "Pharrell Williams",
  itinerary: [
    { time: "10:30", label: "Llegada de amiguitos", icon: "party" },
    { time: "11:00", label: "Juegos kawaii", icon: "sparkles" },
    { time: "12:00", label: "Pastel", icon: "gift" },
    { time: "12:30", label: "Fotos y sorpresas", icon: "camera" },
  ],
  dressCode: {
    label: "Pastel divertido",
    colors: ["#FF9EC4", "#B5D8FF", "#FFE566", "#FFFFFF"],
    description: "Puedes venir con colores pastel, moños, estrellas o tu accesorio mas cute.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos", url: "#" },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-08-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_COQUETTE_BOWS: InvitationPersonalData = {
  templateId: "AP-CUM-03",
  orderId: "DEMO-CUM-003",
  mainName: "Isabel",
  eventDate: "2026-07-23T20:30:00",
  eventTime: "8:30 PM",
  locations: [
    {
      name: "Salon Aura",
      address: "Av. Tepeyac 5138, Agua Azul, Guadalajara",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:30",
    },
  ],
  customMessage:
    "Ven a celebrar este dia tan especial conmigo. Habra brindis, fotos lindas y una noche con mucho estilo coquette.",
  photos: [
    "/assets/templates/cumpleanos/coquette-bows/coquette-bows-frame.svg",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/cumpleanos/coquette-bows/coquette-bows-frame.svg",
  musicTitle: "Espresso",
  musicArtist: "Sabrina Carpenter",
  itinerary: [
    { time: "20:30", label: "Coctel rosa", icon: "glass-water" },
    { time: "21:30", label: "Cena y fotos", icon: "camera" },
    { time: "22:30", label: "Brindis", icon: "sparkles" },
    { time: "23:00", label: "Party time", icon: "music" },
  ],
  dressCode: {
    label: "Formal rojo",
    colors: ["#FFF0F6", "#FF9FC3", "#E33C2F", "#C7202B"],
    description: "Sugerimos vestido o outfit formal. Los detalles rojos, moños y cerezas son bienvenidos.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para Isabel", bankInfo: { bank: "BBVA", account: "1122 3344 5566", holderName: "Isabel Rivera" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-07-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_SUMMER_BRUNCH: InvitationPersonalData = {
  templateId: "AP-CUM-05",
  orderId: "DEMO-CUM-005",
  mainName: "Daniela",
  eventDate: "2026-12-29T18:30:00",
  eventTime: "6:30 PM",
  locations: [
    {
      name: "Jardin Nebular",
      address: "Av. de las Flores 940, Col. Jardines",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "18:30",
    },
  ],
  customMessage:
    "Celebremos juntos este dia tan especial entre flores, frutas frescas y un brindis de verano. Tu presencia hara que la tarde sea inolvidable.",
  photos: [
    "/assets/templates/cumpleanos/summer-brunch/summer-brunch-frame.svg",
    "/assets/templates/cumpleanos/summer-brunch/summer-cocktails-table.jpg",
  ],
  heroPhoto: "/assets/templates/cumpleanos/summer-brunch/summer-brunch-frame.svg",
  musicTitle: "Watermelon Sugar",
  musicArtist: "Harry Styles",
  itinerary: [
    { time: "18:30", label: "Coctel de bienvenida", icon: "glass-water" },
    { time: "19:30", label: "Cena brunch", icon: "utensils" },
    { time: "20:30", label: "Brindis", icon: "sparkles" },
    { time: "21:00", label: "Fotos y pastel", icon: "camera" },
  ],
  dressCode: {
    label: "Summer chic",
    colors: ["#FFFDF7", "#F2A07A", "#E33F35", "#F5C842", "#8CA667"],
    description: "Sugerimos colores claros, telas naturales y un detalle coral, citrico o floral.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para Daniela", bankInfo: { bank: "BBVA", account: "5588 4422 1100", holderName: "Daniela Mendoza" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-12-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BABY_SELVA: InvitationPersonalData = {
  templateId: "AP-BS-01",
  orderId: "DEMO-BS-001",
  mainName: "Carlos Manuel",
  parents: [
    { name: "Ernesto y Coral", role: "Mis papás" },
  ],
  eventDate: "2026-06-20T13:00:00",
  eventTime: "1:00 PM",
  locations: [
    {
      name: "Jardín Isabella",
      address: "Ejido Santa Adelaida, carretera nacional",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "13:00",
    },
  ],
  customMessage:
    "Nuestro corazón se llena de ternura al imaginar la llegada de nuestro bebé. Tu cariño y compañía harán aún más especial este momento.",
  photos: [
    "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "/assets/templates/baby-shower/selva-suave/safari-animals-watercolor.png",
  musicTitle: "A New Little Love",
  musicArtist: "AccessPremium",
  itinerary: [
    { time: "13:00", label: "Bienvenida", icon: "party" },
    { time: "14:00", label: "Brunch familiar", icon: "utensils" },
    { time: "15:00", label: "Juegos y regalos", icon: "gift" },
    { time: "16:00", label: "Fotos con mamá", icon: "camera" },
  ],
  dressCode: {
    label: "Casual claro",
    colors: ["#F5F0E8", "#AFC69C", "#D4B68A"],
    description: "Sugerimos tonos claros, beige, salvia o lino. Ven cómodo para celebrar en jardín.",
  },
  giftRegistry: [
    { platform: "amazon", label: "Mesa de regalos para bebé", url: "#" },
    { platform: "transferencia", label: "Detalle para Carlos Manuel", bankInfo: { bank: "BBVA", account: "1122 3344 5566", holderName: "Coral Reyes" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-05-30T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BABY_JIRAFA: InvitationPersonalData = {
  templateId: "AP-BS-03",
  orderId: "DEMO-BS-003",
  mainName: "Baby Alvarez",
  parents: [
    { name: "Laura y Martin", role: "Mis papas" },
  ],
  eventDate: "2026-12-06T15:00:00",
  eventTime: "3:00 PM",
  locations: [
    {
      name: "Patio Manuki",
      address: "Av. de la Paz 2567, Arcos Vallarta",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "15:00",
    },
  ],
  customMessage:
    "La espera esta por terminar. Nuestro corazon se llena de ternura al imaginar la llegada de nuestro bebe, y nos encantaria compartir este momento contigo.",
  photos: [
    "/assets/templates/baby-shower/jirafa-pastel/giraffe-pastel-frame.svg",
    "/assets/templates/baby-shower/jirafa-pastel/giraffe-plush-photo.jpg",
    "/assets/templates/baby-shower/selva-suave/safari-animals-watercolor.png",
  ],
  heroPhoto: "/assets/templates/baby-shower/jirafa-pastel/giraffe-pastel-frame.svg",
  musicTitle: "You Are My Sunshine",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "15:00", label: "Bienvenida", icon: "heart" },
    { time: "15:30", label: "Juegos y regalos", icon: "gift" },
    { time: "16:30", label: "Brunch dulce", icon: "utensils" },
    { time: "17:00", label: "Fotos con mama", icon: "camera" },
  ],
  dressCode: {
    label: "Pastel suave",
    colors: ["#FFF0F3", "#E8C97A", "#C8E6C4", "#F5D4BE", "#4A2C5E"],
    description: "Puedes venir en tonos pastel, beige, menta, rosa palido o lavanda.",
  },
  giftRegistry: [
    { platform: "amazon", label: "Mesa de regalos para el bebe", url: "#" },
    { platform: "transferencia", label: "Detalle para Baby Alvarez", bankInfo: { bank: "Santander", account: "2211 3344 5566", holderName: "Laura Martinez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-11-15T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BABY_COQUETTE: InvitationPersonalData = {
  templateId: "AP-BS-02",
  orderId: "DEMO-BS-002",
  mainName: "Amelia",
  parents: [
    { name: "Laura y Martin", role: "Mis papas" },
  ],
  eventDate: "2026-11-08T17:00:00",
  eventTime: "5:00 PM",
  locations: [
    {
      name: "Salon Jardin Las Guirnaldas",
      address: "Av. de las Rosas 112, Col. Vista Hermosa",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "17:00",
    },
  ],
  customMessage:
    "Ha sido un camino lleno de ilusion y felicidad, y nos encantaria que formes parte de este momento tan importante para nosotros.",
  photos: [
    "/assets/templates/baby-shower/coquette-bebe/coquette-baby-frame.png",
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/baby-shower/coquette-bebe/coquette-baby-frame.png",
  musicTitle: "Sweet Child",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "17:00", label: "Bienvenida", icon: "heart" },
    { time: "17:30", label: "Brunch dulce", icon: "utensils" },
    { time: "18:30", label: "Regalitos", icon: "gift" },
    { time: "19:00", label: "Fotos con mama", icon: "camera" },
  ],
  dressCode: {
    label: "Casual rosa",
    colors: ["#F2739A", "#F8C6D6", "#FFFFFF", "#F5F0E8"],
    description: "De preferencia tonos rosa, blanco o perla. Ven comodo para celebrar con ternura.",
  },
  giftRegistry: [
    { platform: "amazon", label: "Mesa de regalos para Amelia", url: "#" },
    { platform: "transferencia", label: "Detalle para la bebe", bankInfo: { bank: "Santander", account: "3344 5566 7788", holderName: "Laura Martinez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-10-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_COMUNION_SACRAMENTO: InvitationPersonalData = {
  templateId: "AP-COM-01",
  orderId: "DEMO-COM-001",
  mainName: "Mario Raul",
  parents: [
    { name: "Mariana Castillo y Emmanuel Gomez", role: "Mis padres" },
  ],
  godparents: [
    { name: "Karen Herrera y Ricardo Padilla", role: "Mis padrinos" },
  ],
  eventDate: "2027-05-15T16:00:00",
  eventTime: "4:00 PM",
  locations: [
    {
      name: "Parroquia de San Antonio de Padua",
      address: "Av. de la Fe 215, Centro",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "16:00",
    },
    {
      name: "Hacienda La Concepcion",
      address: "Jardin Los Olivos 48",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "18:00",
    },
  ],
  customMessage:
    "Senor, hoy me presento ante ti para ser banado con la gracia de tu amor. Toma mi pequeno corazon y jamas te separes de mi.",
  photos: [
    "/assets/templates/comunion/sacramento-elegance/communion-botanical-frame.png",
    "/assets/templates/comunion/sacramento-elegance/communion-chalice-detail.png",
    "/assets/templates/comunion/sacramento-elegance/communion-reception-cake.png",
  ],
  heroPhoto: "/assets/templates/comunion/sacramento-elegance/communion-botanical-frame.png",
  musicTitle: "Ave Maria",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "16:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "18:00", label: "Recepcion familiar", icon: "glass-water" },
    { time: "19:00", label: "Cena", icon: "utensils" },
    { time: "20:00", label: "Fotos y recuerdos", icon: "camera" },
  ],
  dressCode: {
    label: "Formal claro",
    colors: ["#FFFFFF", "#F7F0DE", "#C6AE72", "#9AAB91"],
    description: "Sugerimos tonos claros y vestimenta formal para la ceremonia.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos comunion", url: "#" },
    { platform: "transferencia", label: "Detalle para Mario Raul", bankInfo: { bank: "BBVA", account: "6677 8899 0011", holderName: "Mariana Castillo" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2027-04-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_COMUNION_MODERN: InvitationPersonalData = {
  templateId: "AP-COM-02",
  orderId: "DEMO-COM-002",
  mainName: "Matias",
  parents: [
    { name: "Claudia Lopez Herrera", role: "Mi madre" },
  ],
  godparents: [
    { name: "Fernanda Morales y Alberto Soria", role: "Mis padrinos" },
  ],
  eventDate: "2026-12-29T16:00:00",
  eventTime: "4:00 PM",
  locations: [
    {
      name: "Parroquia San Judas Tadeo",
      address: "La Campesina, Guadalajara",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "16:00",
    },
    {
      name: "Salon Santa Maria",
      address: "Del Sol 573, Miramar",
      mapsUrl: "https://maps.google.com",
      type: "celebracion",
      time: "18:00",
    },
  ],
  customMessage:
    "Con la bendicion de Dios y el amor de mi familia, te invito a celebrar mi primera comunion y a compartir una tarde llena de gratitud.",
  photos: [
    "/assets/templates/comunion/modern-block/first-communion-boy.jpg",
    "/assets/templates/comunion/modern-block/modern-block-chalice-detail.png",
    "/assets/templates/comunion/modern-block/modern-block-frame.svg",
  ],
  heroPhoto: "/assets/templates/comunion/modern-block/modern-block-frame.svg",
  musicTitle: "Hallelujah",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "16:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "18:00", label: "Recepcion familiar", icon: "glass-water" },
    { time: "19:00", label: "Cena", icon: "utensils" },
    { time: "20:00", label: "Fotos y recuerdos", icon: "camera" },
  ],
  dressCode: {
    label: "Formal",
    colors: ["#FFFFFF", "#F5F0E8", "#82906F", "#C4A962"],
    description: "Sugerimos vestimenta formal en tonos claros, verde olivo, beige o dorado suave.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos comunion", url: "#" },
    { platform: "transferencia", label: "Detalle para Matias", bankInfo: { bank: "Banorte", account: "8899 0011 2233", holderName: "Claudia Lopez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-12-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BAUTIZO_JARDIN: InvitationPersonalData = {
  templateId: "AP-BAU-01",
  orderId: "DEMO-BAU-001",
  mainName: "Mario Raúl",
  parents: [
    { name: "Mariana Castillo y Emmanuel Gómez", role: "Mis padres" },
  ],
  godparents: [
    { name: "Karen Herrera y Ricardo Padilla", role: "Mis padrinos" },
  ],
  eventDate: "2026-05-15T12:00:00",
  eventTime: "12:00 PM",
  locations: [
    {
      name: "Parroquia de San Antonio de Padua",
      address: "Av. de la Fe 215, Centro",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "12:00",
    },
    {
      name: "Hacienda La Concepción",
      address: "Jardín Los Olivos 48",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "14:00",
    },
  ],
  customMessage:
    "Señor, hoy me presento ante ti para ser bañado con la gracia de tu amor. Toma mi pequeño corazón y guíame siempre.",
  photos: [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "/assets/templates/bautizo/jardin-de-la-gracia/botanical-baptism-frame.png",
  musicTitle: "Ave María",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "12:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "14:00", label: "Recepción familiar", icon: "glass-water" },
    { time: "15:00", label: "Comida", icon: "utensils" },
  ],
  dressCode: {
    label: "Formal claro",
    colors: ["#FFFFFF", "#F2E8D5", "#9CAD86"],
    description: "Sugerimos tonos claros y vestimenta formal para la ceremonia.",
  },
  giftRegistry: [
    { platform: "liverpool", label: "Mesa de regalos bautizo", url: "#" },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-04-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_BAUTIZO_TRAZO: InvitationPersonalData = {
  templateId: "AP-BAU-02",
  orderId: "DEMO-BAU-002",
  mainName: "Juan Manuel",
  parents: [
    { name: "Francisco Javier Delgado y Claudia Eunice Gutierrez", role: "Mis padres" },
  ],
  godparents: [
    { name: "Carolina Gutierrez", role: "Mi madrina" },
  ],
  eventDate: "2026-09-20T15:00:00",
  eventTime: "3:00 PM",
  locations: [
    {
      name: "Capilla de la Santa Cruz",
      address: "Centro, Ciudad de Mexico",
      mapsUrl: "https://maps.google.com",
      type: "ceremonia",
      time: "15:00",
    },
    {
      name: "Capilla La Natividad",
      address: "Salon Jardin Las Flores",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "17:00",
    },
  ],
  customMessage:
    "Nos encantaria que nos acompanes en este momento tan especial. Hoy recibo la gracia de Dios rodeado de amor.",
  photos: [
    "/assets/templates/bautizo/trazo-celestial/blue-toile-baptism-frame.png",
    "/assets/templates/bautizo/trazo-celestial/trazo-baby-portrait.png",
    "/assets/templates/bautizo/trazo-celestial/trazo-ceremony-detail.png",
  ],
  heroPhoto: "/assets/templates/bautizo/trazo-celestial/blue-toile-baptism-frame.png",
  musicTitle: "Angel",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "15:00", label: "Ceremonia religiosa", icon: "church" },
    { time: "17:00", label: "Recepcion", icon: "glass-water" },
    { time: "18:00", label: "Comida familiar", icon: "utensils" },
  ],
  dressCode: {
    label: "Formal claro",
    colors: ["#FFFFFF", "#E8F0F8", "#7FA3BE", "#C7A66A"],
    description: "Sugerimos colores claros, blanco, azul polvo o beige.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para Juan Manuel", bankInfo: { bank: "Santander", account: "7744 8855 9966", holderName: "Claudia Gutierrez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-08-25T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_GRAD_MIDNIGHT: InvitationPersonalData = {
  templateId: "AP-GRAD-02",
  orderId: "DEMO-GRAD-002",
  mainName: "Angelica Victoria",
  parents: [
    { name: "Familia Martinez Rivera", role: "Con amor y orgullo" },
  ],
  eventDate: "2027-02-21T20:00:00",
  eventTime: "8:00 PM",
  locations: [
    {
      name: "Jardin de Eventos El Ranchito",
      address: "Carretera a la Presa 204, UAQro",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "Es momento de celebrar. Con mucha alegria te invito a acompanarme en la celebracion de mi graduacion. Siempre parece imposible, hasta que se hace.",
  photos: [
    "/assets/templates/graduacion/midnight-gala/graduate-portrait.png",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/graduacion/midnight-gala/graduate-portrait.png",
  musicTitle: "The Climb",
  musicArtist: "Miley Cyrus",
  itinerary: [
    { time: "20:00", label: "Recepcion", icon: "glass-water" },
    { time: "21:00", label: "Brindis de generacion", icon: "graduation-cap" },
    { time: "21:30", label: "Cena", icon: "utensils" },
    { time: "22:30", label: "Fotos y fiesta", icon: "camera" },
  ],
  dressCode: {
    label: "Formal de gala",
    colors: ["#0B1A35", "#F7F3EA", "#C4A962"],
    description: "Sugerimos atuendo formal en tonos navy, champagne, negro o dorado.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para la graduada", bankInfo: { bank: "Banamex", account: "7788 9900 1122", holderName: "Angelica Victoria" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "fiesta-total",
  deliveryType: "normal",
  deliveryDeadline: "2027-01-25T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_GRAD_HONOR: InvitationPersonalData = {
  templateId: "AP-GRAD-01",
  orderId: "DEMO-GRAD-001",
  mainName: "Jesica Morales",
  parents: [
    { name: "Familia Morales Hernandez", role: "Con profunda gratitud" },
  ],
  eventDate: "2027-01-24T20:00:00",
  eventTime: "8:00 PM",
  locations: [
    {
      name: "Auditorio Universitario",
      address: "Centro Academico Norte, Campus Principal",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "Estoy de fiesta y con orgullo te invito a celebrar mi graduacion. Agradezco profundamente a mi familia, docentes y amistades por ser parte de este camino.",
  photos: [
    "/assets/templates/graduacion/midnight-gala/graduate-portrait.png",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
    "/assets/templates/graduacion/honor-classic/graduate-cap-courtyard.png",
  ],
  heroPhoto: "/assets/templates/graduacion/honor-classic/academic-laurel-frame.png",
  musicTitle: "Hall of Fame",
  musicArtist: "The Script",
  itinerary: [
    { time: "20:00", label: "Recepcion", icon: "glass-water" },
    { time: "21:00", label: "Entrega simbolica", icon: "award" },
    { time: "21:30", label: "Cena", icon: "utensils" },
    { time: "22:30", label: "Fotos y brindis", icon: "camera" },
  ],
  dressCode: {
    label: "Vestimenta formal",
    colors: ["#0B1A35", "#C4A962", "#F7F3EA"],
    description: "Sugerimos atuendo formal. Puedes usar un detalle navy o dorado.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para la graduada", bankInfo: { bank: "BBVA", account: "9900 1122 3344", holderName: "Jesica Morales" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-12-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_JUBILACION_GOLDEN_BLOOMS: InvitationPersonalData = {
  templateId: "AP-JUB-01",
  orderId: "DEMO-JUB-001",
  mainName: "Martina Ramirez",
  parents: [
    { name: "Directivos y Mesa Tecnica de la Zona Escolar 24", role: "Invitan" },
  ],
  eventDate: "2026-12-29T20:00:00",
  eventTime: "8:00 PM",
  locations: [
    {
      name: "Salon Victoria",
      address: "Paseo del Zoologico 543, Huentitan el Bajo, Guadalajara",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "20:00",
    },
  ],
  customMessage:
    "En reconocimiento a una destacada trayectoria, celebramos su merecida jubilacion y el valioso legado que deja en nuestra comunidad.",
  photos: [
    "/assets/templates/jubilacion/golden-blooms/golden-blooms-frame.svg",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/jubilacion/golden-blooms/golden-blooms-frame.svg",
  musicTitle: "What a Wonderful World",
  musicArtist: "Louis Armstrong",
  itinerary: [
    { time: "20:00", label: "Recepcion", icon: "glass-water" },
    { time: "20:40", label: "Palabras de reconocimiento", icon: "award" },
    { time: "21:10", label: "Cena", icon: "utensils" },
    { time: "22:00", label: "Brindis y recuerdos", icon: "camera" },
  ],
  dressCode: {
    label: "Elegante claro",
    colors: ["#FFFDF8", "#F2B6C4", "#B8923E", "#7F916F"],
    description: "Sugerimos atuendo formal en tonos claros, rosa, verde olivo o detalles dorados.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle para Martina", bankInfo: { bank: "BBVA", account: "6677 8899 0011", holderName: "Martina Ramirez" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-12-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_JUBILACION_EXECUTIVE: InvitationPersonalData = {
  templateId: "AP-JUB-02",
  orderId: "DEMO-JUB-002",
  mainName: "Roberto Salinas",
  parents: [
    { name: "Consejo Directivo de Grupo Altamar", role: "Invita" },
  ],
  eventDate: "2027-03-18T19:30:00",
  eventTime: "7:30 PM",
  locations: [
    {
      name: "Club Ejecutivo Metropolitan",
      address: "Paseo Corporativo 410, Distrito Financiero",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "19:30",
    },
  ],
  customMessage:
    "Celebramos una trayectoria marcada por liderazgo, vision y compromiso. Gracias por acompanar este cierre de ciclo y el inicio de nuevos proyectos.",
  photos: [
    "/assets/templates/jubilacion/executive-prestige/executive-prestige-frame.svg",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
  ],
  heroPhoto: "/assets/templates/jubilacion/executive-prestige/executive-prestige-frame.svg",
  musicTitle: "My Way",
  musicArtist: "Frank Sinatra",
  itinerary: [
    { time: "19:30", label: "Recepcion ejecutiva", icon: "glass-water" },
    { time: "20:10", label: "Mensaje institucional", icon: "award" },
    { time: "20:45", label: "Cena", icon: "utensils" },
    { time: "21:40", label: "Brindis y reconocimiento", icon: "music" },
  ],
  dressCode: {
    label: "Formal ejecutivo",
    colors: ["#0A1324", "#172A49", "#DDE4ED", "#FFFFFF"],
    description: "Sugerimos traje oscuro, azul marino, gris plata o blanco. Estilo sobrio y elegante.",
  },
  giftRegistry: [
    { platform: "transferencia", label: "Detalle de reconocimiento", bankInfo: { bank: "BBVA", account: "2200 3311 5566", holderName: "Roberto Salinas" } },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2027-02-18T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_LUCTUOSO_HOMENAJE: InvitationPersonalData = {
  templateId: "AP-LUC-01",
  orderId: "DEMO-LUC-001",
  mainName: "Carlos Lopez",
  parents: [
    { name: "Familia Lopez Herrera", role: "Invita con profundo amor" },
  ],
  eventDate: "2026-07-12T14:00:00",
  eventTime: "2:00 PM",
  locations: [
    {
      name: "Capilla de Santo Nino de Atocha",
      address: "Av. de la Paz 215, Centro",
      mapsUrl: "https://maps.google.com",
      type: "misa de cuerpo presente",
      time: "14:00",
    },
  ],
  customMessage:
    "Agradecemos tus oraciones y tu compania para honrar la memoria de quien vivio con fe, nobleza y amor por su familia.",
  photos: [
    "/assets/templates/luctuoso/homenaje-clasico/memorial-classic-frame.svg",
    "/assets/templates/luctuoso/homenaje-clasico/memorial-candle-card.svg",
    "/assets/templates/luctuoso/homenaje-clasico/memorial-chapel-detail.svg",
  ],
  heroPhoto: "/assets/templates/luctuoso/homenaje-clasico/memorial-classic-frame.svg",
  musicTitle: "Ave Maria",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "13:30", label: "Recepcion y oracion familiar", icon: "heart" },
    { time: "14:00", label: "Misa de cuerpo presente", icon: "church" },
    { time: "15:00", label: "Acompanamiento al descanso eterno", icon: "moon" },
  ],
  dressCode: {
    label: "Respeto y sobriedad",
    colors: ["#111111", "#4A4A4A", "#F5F0E8", "#B8A080"],
    description: "Sugerimos vestimenta sobria en negro, gris, blanco o tonos neutros.",
  },
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-07-08T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_REVELACION_TEDDY: InvitationPersonalData = {
  templateId: "AP-REV-01",
  orderId: "DEMO-REV-001",
  mainName: "¿Niña o Niño?",
  parents: [
    { name: "Angélica Pérez Ramos y Carlos Medina Cruz", role: "Futuros papás" },
  ],
  eventDate: "2026-10-01T14:00:00",
  eventTime: "2:00 PM",
  locations: [
    {
      name: "Real Las Palmas",
      address: "Salón Palmas, Jardín Central",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "14:00",
    },
  ],
  customMessage:
    "Un nuevo latido llena nuestro corazón. Muy pronto sabremos si es ella o él, y queremos compartir ese instante contigo.",
  photos: [
    "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80",
  ],
  heroPhoto: "/assets/templates/revelacion/teddy-boho/teddy-boho-collage.png",
  musicTitle: "Latido Dulce",
  musicArtist: "AccessPremium",
  itinerary: [
    { time: "14:00", label: "Llegada de invitados", icon: "party" },
    { time: "15:00", label: "Juegos Team Niña / Team Niño", icon: "heart" },
    { time: "16:00", label: "Gran revelación", icon: "gift" },
  ],
  dressCode: {
    label: "Boho neutral",
    colors: ["#F6E9D6", "#C99C70", "#A8B5A1"],
    description: "Puedes venir en beige, blanco, salvia o elegir un detalle rosa/azul para apoyar a tu team.",
  },
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-09-01T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};

export const DEMO_REVELACION_CLASSIC: InvitationPersonalData = {
  templateId: "AP-REV-02",
  orderId: "DEMO-REV-002",
  mainName: "Nino o Nina",
  parents: [
    { name: "Hector y Valeria", role: "Mis papas" },
  ],
  eventDate: "2026-08-08T17:00:00",
  eventTime: "5:00 PM",
  locations: [
    {
      name: "Salon Dieguez",
      address: "Jardin de Eventos Las Nubes",
      mapsUrl: "https://maps.google.com",
      type: "recepcion",
      time: "17:00",
    },
  ],
  customMessage:
    "Estamos muy emocionados porque estan a punto de descubrir algo muy importante. Ven a celebrar con nosotros esta dulce sorpresa.",
  photos: [
    "/assets/templates/revelacion/classic-balloons/classic-balloons-frame.png",
    "/assets/templates/revelacion/classic-balloons/classic-balloons-party-table.png",
    "/assets/templates/revelacion/classic-balloons/classic-balloons-team-vote.png",
  ],
  heroPhoto: "/assets/templates/revelacion/classic-balloons/classic-balloons-frame.png",
  musicTitle: "A Thousand Years",
  musicArtist: "Instrumental",
  itinerary: [
    { time: "17:00", label: "Llegada de invitados", icon: "party" },
    { time: "18:00", label: "Votacion Team Nino / Nina", icon: "heart" },
    { time: "19:00", label: "Gran revelacion", icon: "gift" },
  ],
  dressCode: {
    label: "Casual pastel",
    colors: ["#F7B6C7", "#B7DDF6", "#FFFFFF", "#F5D6A2"],
    description: "Puedes venir con un detalle rosa o azul para apoyar tu team.",
  },
  giftRegistry: [
    { platform: "otro", label: "Regalo de tu eleccion", url: "#" },
  ],
  rsvpWhatsapp: "526645922368",
  package: "premium",
  deliveryType: "normal",
  deliveryDeadline: "2026-07-20T00:00:00",
  clientName: "Demo Client",
  clientPhone: "526645922368",
  orderDate: "2026-05-27T00:00:00",
};
