import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Gamepad2, Heart, Zap } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones%20y%20quiero%20una%20invitaci%C3%B3n%20con%20personaje%20o%20tem%C3%A1tica%20personalizada.%20%C2%BFMe%20pueden%20dar%20informes%3F";

const themes = [
  {
    name: "Princesas y Magia",
    icon: Sparkles,
    color: "from-pink-100 to-purple-100",
    text: "text-purple-600",
    tags: ["Princesas", "Hadas", "Castillos"],
  },
  {
    name: "Racing y Acción",
    icon: Zap,
    color: "from-red-100 to-orange-100",
    text: "text-red-600",
    tags: ["Autos", "Superhéroes", "Deportes"],
  },
  {
    name: "Cute & Kawaii",
    icon: Heart,
    color: "from-rose-100 to-pink-100",
    text: "text-rose-500",
    tags: ["Gatitos", "Moños", "Tierno"],
  },
  {
    name: "Videojuegos",
    icon: Gamepad2,
    color: "from-blue-100 to-cyan-100",
    text: "text-blue-600",
    tags: ["Gamer", "Pixel Art", "Neón"],
  },
];

const CharacterThemesSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-primary/5">
      {/* Decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary/20 shadow-sm mb-6">
              <span className="text-xl">🎈</span>
              <span className="text-primary font-bold text-xs tracking-wider uppercase">Línea Infantil y Temática</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              También hacemos invitaciones con <span className="text-gradient-gold italic">personajes</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Creamos invitaciones web con la temática favorita de tu evento: princesas, carritos, superhéroes, kawaii, videojuegos, safari, personajes clásicos y más. Mantenemos una calidad <strong>Premium y moderna</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                id="personajes-whatsapp"
                size="lg"
                className="bg-gradient-gold hover:shadow-gold-hover text-white font-bold px-8 text-base rounded-xl transition-all duration-300"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Pedir invitación con personaje
                </a>
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
            {/* Center glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-75 -z-10" />

            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <div key={theme.name} className="bg-white rounded-2xl p-5 border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${theme.text}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-3">{theme.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {theme.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CharacterThemesSection;
