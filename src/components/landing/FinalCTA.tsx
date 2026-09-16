import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones.%20%C2%BFMe%20pueden%20ayudar%20a%20cotizar%20mi%20invitaci%C3%B3n%3F";

const FinalCTA = () => {
  return (
    <section id="contacto" className="py-20 md:py-28 relative overflow-hidden">
      {/* Warm gold background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-yellow-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      {/* Decorative ornaments */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold shadow-gold flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl">🗓️</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-5 leading-tight">
            ¿Ya tienes{" "}
            <span className="text-gradient-gold italic">fecha</span>{" "}
            para tu evento?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
            Mándanos mensaje y te ayudamos a elegir el diseño ideal para tu celebración.
          </p>

          {/* CTA button */}
          <Button
            id="final-cta-whatsapp"
            size="lg"
            className="bg-[#25D366] hover:bg-[#22BF5B] text-white font-bold px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Cotizar por WhatsApp
            </a>
          </Button>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✓</span> Sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✓</span> Respuesta rápida
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✓</span> Anticipo desde $50
            </span>
          </div>

        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default FinalCTA;
