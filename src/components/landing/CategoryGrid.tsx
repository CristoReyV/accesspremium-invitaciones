import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { getOrderedCategories } from "@/data/categories";

const WHATSAPP_URL = "https://wa.me/526645922368?text=Hola%2C%20vengo%20de%20AccessPremium%20Invitaciones%20y%20me%20interesa%20una%20invitaci%C3%B3n%20para%20";

const CategoryGrid = () => {
  const categories = getOrderedCategories();

  return (
    <section id="categorias" className="py-20 md:py-28 bg-gradient-warm">
      <div className="container px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Categorías
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            ¿Para qué ocasión?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            Tenemos diseños para cada evento. Elige tu categoría y personaliza cada detalle.
          </p>
          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto">
          {categories.map((event) => (
            <div
              key={event.id}
              className={`
                group relative bg-white rounded-2xl border
                p-5 flex flex-col items-center text-center gap-3
                shadow-card hover:shadow-card-hover
                transition-all duration-300 hover:-translate-y-1 cursor-pointer
              `}
              style={{ borderColor: `${event.color}30` }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} 
                style={{ backgroundColor: event.color }}
              />

              {/* Emoji */}
              <div className="relative z-10 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {event.emoji}
              </div>

              {/* Name */}
              <p className="relative z-10 font-semibold text-sm text-foreground leading-tight">
                {event.label}
              </p>

              {/* Desc */}
              <p className="relative z-10 text-[10px] text-muted-foreground line-clamp-2">
                {event.description}
              </p>

              {/* CTA */}
              <Button
                id={`catalogo-${event.id}`}
                asChild
                size="sm"
                className="relative z-10 w-full bg-gradient-gold hover:shadow-gold text-white text-xs font-medium px-2 py-1.5 h-auto rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 mt-2"
              >
                <a
                  href={`${WHATSAPP_URL}${encodeURIComponent(event.label)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Ver diseños
                </a>
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
