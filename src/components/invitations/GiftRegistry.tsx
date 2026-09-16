import { Gift, CreditCard, ShoppingBag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GiftRegistryItem } from "@/types";

// Ícono por plataforma
const PLATFORM_ICONS: Record<string, typeof Gift> = {
  "amazon": ShoppingBag,
  "mercado-libre": ShoppingBag,
  "liverpool": ShoppingBag,
  "palacio-de-hierro": ShoppingBag,
  "sears": ShoppingBag,
  "transferencia": CreditCard,
  "bancomer": CreditCard,
  "banamex": CreditCard,
  "santander": CreditCard,
  "hsbc": CreditCard,
  "otro": Gift,
};

interface GiftRegistryProps {
  /** Arreglo de opciones de regalo. Si no se provee, muestra un placeholder */
  items?: GiftRegistryItem[];
  /** Título de la sección */
  title?: string;
  /** Subtítulo / mensaje de cortesía */
  subtitle?: string;
  /** Color de acento para el ícono de cabecera */
  accentColor?: string;
  /** Clase CSS adicional */
  className?: string;
}

export default function GiftRegistry({
  items = [],
  title = "Mesa de Regalos",
  subtitle = "El mejor regalo que nos pueden dar es su presencia, pero si desean tener un detalle, pueden hacerlo a través de las siguientes opciones:",
  accentColor,
  className,
}: GiftRegistryProps) {
  const iconColor = accentColor ?? "var(--ap-primary, hsl(var(--primary)))";

  return (
    <div className={cn("max-w-md mx-auto text-center", className)}>
      {/* Ícono de cabecera */}
      <div className="flex justify-center mb-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: iconColor,
            opacity: 1,
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center absolute"
            style={{ backgroundColor: iconColor, opacity: 0.12, borderRadius: "50%" }}
          />
          <Gift className="w-7 h-7 relative" style={{ color: iconColor }} />
        </div>
      </div>

      {/* Título */}
      <h3
        className="font-serif text-3xl mb-4"
        style={{ fontFamily: "var(--ap-font-display, 'Playfair Display', serif)" }}
      >
        {title}
      </h3>

      {/* Subtítulo */}
      <p className="text-sm leading-relaxed mb-8 opacity-70">{subtitle}</p>

      {/* Items */}
      {items.length === 0 ? (
        <p className="text-sm opacity-50 italic">Sin mesa de regalos configurada.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => {
            const PlatformIcon = PLATFORM_ICONS[item.platform] ?? Gift;

            // Item con enlace (Amazon, Liverpool, etc.)
            if (item.url) {
              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] group"
                  style={{
                    borderColor: "var(--ap-border, rgba(0,0,0,0.1))",
                    backgroundColor: "var(--ap-surface, #FFFFFF)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <PlatformIcon className="w-5 h-5 shrink-0" style={{ color: iconColor }} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity" />
                </a>
              );
            }

            // Item de transferencia bancaria
            if (item.bankInfo) {
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border text-left"
                  style={{
                    borderColor: "var(--ap-border, rgba(0,0,0,0.1))",
                    backgroundColor: "var(--ap-surface, #FFFFFF)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <PlatformIcon className="w-5 h-5 shrink-0" style={{ color: iconColor }} />
                    <h4 className="font-semibold text-sm">{item.label}</h4>
                  </div>
                  <div className="space-y-1.5 text-sm opacity-70">
                    <p><strong className="opacity-100">Banco:</strong> {item.bankInfo.bank}</p>
                    <p><strong className="opacity-100">Titular:</strong> {item.bankInfo.holderName}</p>
                    <p><strong className="opacity-100">Cuenta:</strong> {item.bankInfo.account}</p>
                    {item.bankInfo.clabe && (
                      <p><strong className="opacity-100">CLABE:</strong> {item.bankInfo.clabe}</p>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
