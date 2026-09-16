import { Search, Package, CreditCard, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Elige tu diseño o personaje",
    description:
      "Explora nuestro catálogo para bodas o XV años, o dinos qué temática o personaje necesitas para tu fiesta infantil.",
  },
  {
    number: "02",
    icon: Package,
    title: "Escoge tu paquete",
    description:
      "Selecciona entre Premium, Recuerdos o Fiesta Total según las funciones que necesitas (música, fotos, RSVP).",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Aparta con $50",
    description:
      "Asegura tu diseño con un anticipo mínimo de $50 pesos. Pago 100% seguro y garantizado.",
  },
  {
    number: "04",
    icon: Send,
    title: "Envía tus datos y recibe tu link",
    description:
      "Nosotros personalizamos tu invitación y te entregamos el link listo para compartir por WhatsApp con tus invitados.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-background">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Proceso
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            ¿Cómo realizar tu compra?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Fácil, rápido y sin complicaciones. En 4 pasos tienes tu invitación lista.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Steps — vertical timeline */}
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.number} className="flex gap-6">

                {/* Timeline column */}
                <div className="flex flex-col items-center">
                  {/* Step circle */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-gold shadow-gold flex items-center justify-center shrink-0 z-10">
                    <Icon className="w-6 h-6 text-white" />
                    {/* Step number badge */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-primary/30 text-primary text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {index + 1}
                    </span>
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div className="w-0.5 flex-1 my-2 bg-gradient-to-b from-primary/30 to-primary/10 min-h-[40px]" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-${isLast ? "0" : "10"} pt-1 flex-1`} style={{ paddingBottom: isLast ? 0 : "2.5rem" }}>
                  <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <p className="text-primary font-bold text-xs tracking-wider mb-1">{step.number}</p>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
