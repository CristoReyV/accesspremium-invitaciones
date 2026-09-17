import { BODA_AYDE_OCTAVIO } from "./demoInvitations";

// Datos confirmados para esta exploración. La referencia anterior no se modifica.
export const AYDE_OCTAVIO_CREAM_SKYBLUE = {
  customMessage: BODA_AYDE_OCTAVIO.customMessage,
  parents: BODA_AYDE_OCTAVIO.parents,
  eventDate: "2027-01-30T19:00:00-06:00",
  rsvpUrl: "https://forms.gle/yAHXHLKRF3im4t5MA",
  ceremonies: [
    {
      id: "misa", number: "01", title: "Misa", time: "7:00 pm",
      dateTime: "2027-01-30T19:00:00-06:00",
      venue: "Iglesia de San Francisco de Asís",
      mapsUrl: BODA_AYDE_OCTAVIO.locations[0].mapsUrl,
    },
    {
      id: "civil", number: "02", title: "Boda civil", time: "8:30 pm",
      dateTime: "2027-01-30T20:30:00-06:00",
      venue: "Salón Pérgolas",
      mapsUrl: BODA_AYDE_OCTAVIO.locations[1].mapsUrl,
    },
  ],
};
