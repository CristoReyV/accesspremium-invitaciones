import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";
import { getMVPInvitations } from "@/data/invitations";

const WHATSAPP_URL = "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones%20y%20me%20interesa%20el%20dise%C3%B1o%20";

const FeaturedInvitations = () => {
  const featured = getMVPInvitations().slice(0, 8); // Top 8 MVP

  return (
    <section id="destacados" className="py-20 md:py-28 bg-background">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Catálogo Destacado
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Diseños Listos para tu Evento
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            Explora nuestros diseños más populares. Todos son 100% personalizables con tu información.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featured.map((invitation) => (
            <div
              key={invitation.id}
              className="group bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              {/* Image / Preview */}
              <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
                {/* Fallback image if preview doesn't exist yet */}
                <div className="absolute inset-0 bg-gradient-warm flex items-center justify-center p-6 text-center">
                   <div className="space-y-3">
                     <p className="font-serif text-xl font-bold text-foreground/40">{invitation.name}</p>
                     <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">{invitation.category}</p>
                   </div>
                </div>

                {/* Badge */}
                {invitation.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                      {invitation.badge}
                    </span>
                  </div>
                )}
                
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-[2px]">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white text-white hover:text-foreground border-white/50 backdrop-blur-sm"
                  >
                    <a href={invitation.demoUrl}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver demo interactivo
                    </a>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      {invitation.category.replace("-", " ")}
                    </p>
                    <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
                      {invitation.name}
                    </h3>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-4 flex-1">
                  {invitation.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground">Desde</span>
                    <span className="font-bold text-foreground">$299 MXN</span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors h-9"
                  >
                    <a
                      href={`${WHATSAPP_URL}${encodeURIComponent(invitation.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      Elegir diseño
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 border-border hover:bg-secondary/50" asChild>
            <a href="#categorias">
              Explorar todas las categorías
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedInvitations;
