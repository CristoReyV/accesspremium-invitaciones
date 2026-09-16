import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Star, Crown, Zap, Package as PackageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "@/data/packages";

const WHATSAPP_URL = "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones.%20Me%20interesa%20cotizar%20el%20paquete%20";

const iconMap: Record<string, React.ElementType> = {
  basico: PackageIcon,
  premium: Star,
  recuerdos: Crown,
  "fiesta-total": Zap,
};

const PricingSection = () => {
  return (
    <section id="paquetes" className="py-20 md:py-28 bg-gradient-warm">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Paquetes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Elige tu paquete
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Sin complicaciones. Aparta con solo $50 de anticipo y recibe tu invitación lista para compartir.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PACKAGES.map((plan) => {
            const Icon = iconMap[plan.id] || Star;
            const highlighted = plan.badge === "Más popular" || plan.badge === "Mejor valor";
            
            // Filtrar características incluidas y evitar duplicados
            const seenFeatures = new Set<string>();
            const displayFeatures = plan.features
              .filter(f => f.included)
              .filter(f => {
                if (typeof f.feature === "string" && seenFeatures.has(f.feature)) {
                  if (seenFeatures.has(f.label)) return false;
                  seenFeatures.add(f.label);
                  return true;
                }
                const key = typeof f.feature === "string" ? f.feature : f.label;
                seenFeatures.add(key);
                seenFeatures.add(f.label);
                return true;
              });

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-white rounded-2xl border flex flex-col transition-all duration-300",
                  highlighted
                    ? "border-primary shadow-gold md:scale-[1.02] ring-1 ring-primary/20 z-10"
                    : "border-border shadow-card hover:shadow-card-hover"
                )}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-gold text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-gold whitespace-nowrap">
                      ⭐ {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card header */}
                <div className={cn(
                  "p-5 pb-5 rounded-t-2xl",
                  highlighted ? "bg-gold-subtle" : "bg-secondary/40"
                )}>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                    highlighted ? "bg-gradient-gold shadow-gold" : "bg-white border border-border"
                  )}>
                    <Icon className={cn("w-5 h-5", highlighted ? "text-white" : "text-primary")} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-snug min-h-[32px]">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl lg:text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground text-xs ml-1.5">MXN</span>
                  </div>
                  <p className={cn(
                    "text-[11px] mt-2 font-medium flex items-center gap-1",
                    highlighted ? "text-primary" : "text-muted-foreground"
                  )}>
                    {plan.expressCost === 0 ? "⚡ Express incluido" : `Entrega en ${plan.deliveryDays} días hábiles`}
                  </p>
                </div>

                {/* Divider */}
                <div className="divider-gold mx-5" />

                {/* Features */}
                <div className="p-5 flex-1">
                  <ul className="space-y-3">
                    {displayFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          highlighted ? "bg-primary/15" : "bg-secondary"
                        )}>
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground leading-snug">
                          {f.label} {f.detail && <span className="text-[9px] font-semibold text-primary ml-1 block mt-0.5">{f.detail}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-5 pt-0 mt-auto">
                  <Button
                    id={`pricing-${plan.id}`}
                    className={cn(
                      "w-full text-xs lg:text-sm font-semibold transition-all duration-300",
                      highlighted
                        ? "bg-gradient-gold hover:shadow-gold-hover text-white"
                        : "bg-secondary hover:bg-primary/10 text-foreground border border-border hover:border-primary/40"
                    )}
                    asChild
                  >
                    <a
                      href={`${WHATSAPP_URL}${encodeURIComponent(plan.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      Cotizar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust note */}
        <p className="text-center text-muted-foreground text-xs mt-10">
          🔒 Pago seguro · Anticipo de solo $50 para comenzar · Soporte directo por WhatsApp
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
