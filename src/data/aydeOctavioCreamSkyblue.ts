import { BODA_AYDE_OCTAVIO } from "./demoInvitations";

// Datos confirmados para esta exploración. La referencia anterior no se modifica.
export const AYDE_OCTAVIO_CREAM_SKYBLUE = {
  customMessage: BODA_AYDE_OCTAVIO.customMessage,
  parents: BODA_AYDE_OCTAVIO.parents,
  heroVerse: "Mas valen dos que uno,\nporque obtienen más fruto de\nsu esfuerzo…Uno solo puede\nser vencido, pero dos puedes\nresistir. ¡La cuerda de tres\nhilos no se rompe tan\nfácilmente!",
  brideMother: "Francisca Enrique Díaz",
  confirmationMessage: "Este día es muy importante para nosotros y cada detalle en su organización se hace con el corazón y con mucho esfuerzo, por ello pedimos que nos confirmes tu asistencia, así mismo nos informes si no podrás acompañarnos.",
  gifts: {
    introduction: "Nuestro mejor regalo será compartir contigo este día tan especial. 🤍",
    description: "Si además nace de ti acompañarnos con algún detalle, hemos elegido la lluvia de sobres como una forma sencilla de recibir tus buenos deseos y cariño.",
    thanks: "Gracias por formar parte de un momento que guardaremos siempre en el corazón.",
  },
  eventDate: "2027-01-30T19:00:00-06:00",
  rsvpUrl: "https://forms.gle/yAHXHLKRF3im4t5MA",
  ceremonies: [
    {
      id: "misa", number: "01", title: "Misa", time: "7:00 PM",
      dateTime: "2027-01-30T19:00:00-06:00",
      venue: "Iglesia de San Francisco de Asís",
      mapsUrl: BODA_AYDE_OCTAVIO.locations[0].mapsUrl,
    },
    {
      id: "recepcion", number: "02", title: "Recepción", time: "8:00 PM",
      dateTime: "2027-01-30T20:00:00-06:00",
      venue: "Salón Pérgolas",
      mapsUrl: BODA_AYDE_OCTAVIO.locations[1].mapsUrl,
    },
    {
      id: "civil", number: "03", title: "Ceremonia de matrimonio civil", time: "8:30 PM",
      dateTime: "2027-01-30T20:30:00-06:00",
      venue: "Salón Pérgolas",
      mapsUrl: BODA_AYDE_OCTAVIO.locations[1].mapsUrl,
    },
    {
      id: "social", number: "04", title: "Programa social", time: "9:00 PM",
      dateTime: "2027-01-30T21:00:00-06:00", venue: null, mapsUrl: null,
    },
    {
      id: "cena", number: "05", title: "Cena", time: "10:00 PM",
      dateTime: "2027-01-30T22:00:00-06:00", venue: null, mapsUrl: null,
    },
  ],
};
