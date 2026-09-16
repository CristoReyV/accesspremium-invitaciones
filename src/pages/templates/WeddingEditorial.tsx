import CountdownTimer from "@/components/invitations/CountdownTimer";
import LocationCard from "@/components/invitations/LocationCard";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";
import GiftRegistry from "@/components/invitations/GiftRegistry";
import { useEffect } from "react";

export default function WeddingEditorial() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#B8972B] selection:text-white">
      {/* Portada */}
      <section className="relative h-[100dvh] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent"></div>
        
        <div className="z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="tracking-[0.3em] uppercase text-xs text-[#B8972B] mb-8 font-medium">Nos casamos</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6 font-medium text-[#1C1917] tracking-tight">
            Sofía <span className="text-[#B8972B] mx-2 font-light">&amp;</span> Alejandro
          </h1>
          <div className="w-16 h-[1px] bg-[#B8972B] mx-auto mb-8"></div>
          <p className="font-serif text-2xl md:text-3xl text-[#1C1917] mb-12">
            15 · Noviembre · 2026
          </p>
          <CountdownTimer targetDate="2026-11-15T18:00:00" />
        </div>
      </section>

      {/* Padres y Padrinos */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl italic text-muted-foreground mb-12 leading-relaxed">
            "Con la bendición de Dios y de nuestros padres, nos unimos en matrimonio."
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-[#B8972B] mb-4">Padres de la Novia</p>
              <p className="font-medium text-lg">Carlos Martínez</p>
              <p className="font-medium text-lg">Elena Rodríguez</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-[#B8972B] mb-4">Padres del Novio</p>
              <p className="font-medium text-lg">Roberto García</p>
              <p className="font-medium text-lg">Carmen Sánchez</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dónde y Cuándo */}
      <section className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-16 text-[#1C1917]">Dónde y Cuándo</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <LocationCard 
              title="Ceremonia"
              time="6:00 PM"
              name="Templo de San José"
              address="Av. Hidalgo 123, Centro Histórico"
              mapUrl="https://maps.google.com"
            />
            <LocationCard 
              title="Recepción"
              time="8:00 PM"
              name="Hacienda Los Arcángeles"
              address="Carr. Federal 45 Sur Km. 10"
              mapUrl="https://maps.google.com"
            />
          </div>
        </div>
      </section>

      {/* Dress Code & Adults Only */}
      <section className="py-24 px-4 text-center bg-white border-y border-border/40">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-8 divide-x divide-border/40">
          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs text-[#B8972B] mb-3">Dress Code</h3>
            <p className="font-serif text-2xl text-[#1C1917]">Etiqueta Rigurosa</p>
          </div>
          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs text-[#B8972B] mb-3">Asistencia</h3>
            <p className="font-serif text-2xl text-[#1C1917]">Solo Adultos</p>
          </div>
        </div>
      </section>

      {/* Mesa de Regalos */}
      <section className="py-24 px-4 bg-[#FAF8F5]">
        <GiftRegistry />
      </section>

      {/* Despedida */}
      <section className="py-32 px-4 text-center bg-[#1C1917] text-white">
        <h2 className="font-serif text-4xl md:text-5xl mb-6">¡Te esperamos!</h2>
        <p className="text-white/70 max-w-md mx-auto text-lg">
          Significaría mucho para nosotros contar con tu presencia en este día tan especial.
        </p>
      </section>

      <FloatingRSVP 
        phoneNumber="526645922368"
        message="Hola, confirmo mi asistencia a la boda de Sofía y Alejandro."
      />
    </main>
  );
}
