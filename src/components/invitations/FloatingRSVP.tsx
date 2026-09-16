import { MessageCircle } from "lucide-react";
import { useEffect, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface FloatingRSVPProps {
  /** Número de WhatsApp (sin +), ej. "526645922368" */
  phoneNumber: string;
  /** Mensaje pre-llenado para WhatsApp */
  message: string;
  /** Texto del botón. Por defecto: "Confirmar Asistencia" */
  label?: string;
  /** Ícono de lucide-react. Por defecto: MessageCircle */
  Icon?: ElementType;
  /** Color de fondo del botón. Usa --ap-primary si no se especifica. */
  bgColor?: string;
  /** Color del texto e ícono */
  textColor?: string;
  /** Clase CSS adicional */
  className?: string;
  /** Umbral de scroll en px para mostrar el botón. Default: 300 */
  scrollThreshold?: number;
}

export default function FloatingRSVP({
  phoneNumber,
  message,
  label = "Confirmar Asistencia",
  Icon = MessageCircle,
  bgColor,
  textColor = "#FFFFFF",
  className,
  scrollThreshold = 300,
}: FloatingRSVPProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Color de fondo: prop > CSS variable del tema > fallback gold
  const buttonBg = bgColor ?? "var(--ap-primary, hsl(var(--primary)))";

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-50 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none",
        className
      )}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="rsvp-floating-btn"
        className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform font-medium text-sm"
        style={{
          background: buttonBg,
          color: textColor,
        }}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span>{label}</span>
      </a>
    </div>
  );
}
