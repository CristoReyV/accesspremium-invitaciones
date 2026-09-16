import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, Clock, CreditCard, Star, Sparkles } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones%20y%20me%20interesa%20una%20invitaci%C3%B3n%20web%20personalizada";

const badges = [
  { icon: Clock, text: "Lista en 3 días" },
  { icon: CreditCard, text: "Anticipo desde $50" },
  { icon: Star, text: "Paquetes desde $299" },
  { icon: Sparkles, text: "También hacemos personajes" },
];

const HeroSection = () => {
  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/6 to-transparent blur-3xl" />
      </div>

      {/* Thin decorative gold line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10 px-4 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Content ── */}
          <div className="text-center lg:text-left space-y-8">

            {/* Brand tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-semibold text-xs tracking-widest uppercase">
                AccessPremium Invitaciones
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold leading-tight text-foreground">
                Invitaciones web{" "}
                <span className="text-gradient-gold italic">personalizadas</span>{" "}
                para tu evento
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Diseños digitales con fotos, música, ubicación, confirmación de asistencia y temáticas personalizadas para compartir por WhatsApp.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {badges.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-sm font-medium text-foreground shadow-card"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                id="hero-ver-catalogo"
                size="lg"
                className="bg-gradient-gold hover:shadow-gold-hover transition-all duration-300 text-white font-semibold px-8 text-base"
                onClick={scrollToCatalog}
              >
                Ver catálogo
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                id="hero-whatsapp"
                size="lg"
                variant="outline"
                className="border-primary/40 text-foreground hover:bg-primary/5 hover:border-primary text-base font-medium"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 text-primary" />
                  Pedir por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* ── Phone Mockup ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full scale-90 -z-10" />

              {/* Phone frame */}
              <div className="relative w-60 md:w-72 aspect-[9/19.5] bg-white rounded-[3rem] p-2 border border-border/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)]">
                <div className="w-full h-full bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/80 rounded-b-2xl z-10" />

                  {/* Invitation screen content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 px-5 text-center">
                    {/* Decorative top line */}
                    <div className="w-8 h-0.5 bg-primary/40 mb-4" />

                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Estás cordialmente invitado a
                    </p>
                    <h3 className="font-serif text-lg font-bold text-foreground mt-2 leading-tight">
                      Nuestra Boda
                    </h3>
                    <p className="text-primary text-sm font-medium mt-1">Ana & Carlos</p>
                    <div className="w-8 h-0.5 bg-primary/30 my-3" />
                    <p className="text-[9px] text-muted-foreground">Sábado 14 de Febrero, 2026</p>
                    <p className="text-[9px] text-muted-foreground">6:00 PM · Jardín Villa Rosa</p>

                    {/* Photo placeholder */}
                    <div className="mt-4 w-full h-20 rounded-xl bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                      <span className="text-2xl">💍</span>
                    </div>

                    {/* Feature pills */}
                    <div className="mt-3 flex flex-wrap gap-1 justify-center">
                      {["📍 Ubicación", "🎵 Música", "✅ Confirmar"].map((f) => (
                        <span key={f} className="text-[8px] bg-white/80 border border-border/60 rounded-full px-2 py-0.5 text-muted-foreground">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA button inside phone */}
                    <div className="absolute bottom-8 left-4 right-4">
                      <div className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 flex items-center justify-center gap-1.5">
                        <span className="text-white text-[10px] font-semibold">Confirmar asistencia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-5 bg-white px-3 py-1.5 rounded-full border border-primary/30 shadow-card">
                <span className="text-xs text-primary font-semibold">✨ Premium</span>
              </div>
              <div className="absolute -bottom-3 -left-5 bg-white px-3 py-1.5 rounded-full border border-border shadow-card">
                <span className="text-xs text-foreground font-medium">🎉 Interactiva</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToCatalog}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors"
        aria-label="Ver catálogo"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSection;
