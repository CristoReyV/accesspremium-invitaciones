import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  /** Etiqueta de la locación: "Ceremonia" | "Recepción" | "Misa" | etc. */
  title: string;
  /** Hora de inicio — opcional, ej. "6:00 PM" */
  time?: string;
  /** Nombre del lugar */
  name: string;
  /** Dirección completa */
  address: string;
  /** URL de Google Maps */
  mapUrl: string;
  /** Texto del botón. Default: "Ver en el mapa" */
  buttonLabel?: string;
  /** Color de acento. Usa --ap-primary si no se especifica. */
  accentColor?: string;
  /** Clase CSS adicional */
  className?: string;
}

export default function LocationCard({
  title,
  time,
  name,
  address,
  mapUrl,
  buttonLabel = "Ver en el mapa",
  accentColor,
  className,
}: LocationCardProps) {
  const accent = accentColor ?? "var(--ap-primary, hsl(var(--primary)))";
  const bg = "var(--ap-surface, #FFFFFF)";
  const border = "var(--ap-border, rgba(0,0,0,0.1))";

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-8 rounded-2xl border shadow-sm max-w-sm w-full mx-auto transition-shadow hover:shadow-md",
        className
      )}
      style={{ backgroundColor: bg, borderColor: border }}
    >
      {/* Título de la locación */}
      <h3
        className="font-serif text-2xl mb-2"
        style={{ fontFamily: "var(--ap-font-display, 'Playfair Display', serif)" }}
      >
        {title}
      </h3>

      {/* Hora */}
      {time && (
        <p className="font-medium tracking-wide mb-4" style={{ color: accent }}>
          {time}
        </p>
      )}

      {/* Separador */}
      <div className="w-10 h-px mb-4 opacity-30" style={{ backgroundColor: accent }} />

      {/* Nombre del lugar */}
      <p className="font-semibold mb-1">{name}</p>

      {/* Dirección */}
      <p className="text-sm mb-6 leading-relaxed opacity-60">{address}</p>

      {/* Botón de mapa */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`map-btn-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
        style={{
          backgroundColor: accent,
          color: "#FFFFFF",
        }}
      >
        <MapPin className="w-4 h-4 shrink-0" />
        {buttonLabel}
      </a>
    </div>
  );
}
