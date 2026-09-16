import { useState, useEffect } from "react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import ParentsAndGodparents from "@/components/invitations/ui/ParentsAndGodparents";
import Itinerary from "@/components/invitations/ui/Itinerary";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";
import DressCode from "@/components/invitations/ui/DressCode";
import LocationCard from "@/components/invitations/LocationCard";
import GiftRegistry from "@/components/invitations/GiftRegistry";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";

// Nuevos componentes Premium
import MusicButton from "@/components/invitations/ui/MusicButton";
import FloralFrame from "@/components/invitations/ui/FloralFrame";
import ElegantDivider from "@/components/invitations/ui/ElegantDivider";
import EnvelopeReveal from "@/components/invitations/ui/EnvelopeReveal";

import { DEMO_BODA_BOTANICA } from "@/data/demoInvitations";
import { getThemeByFamily } from "@/styles/tokens";
import { getInvitationById } from "@/data/invitations";

export default function WeddingBotanical() {
  const data = DEMO_BODA_BOTANICA;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");

  // Estado para la experiencia de entrada
  const [isOpened, setIsOpened] = useState(false);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setTimeout(() => setShowHero(true), 100);
    }
  }, [isOpened]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Boda de ${data.mainName} y ${data.secondName}`}>
      
      {!isOpened && (
        <EnvelopeReveal 
          names={`${data.mainName} & ${data.secondName}`}
          date={data.eventDate.split("T")[0]}
          onOpen={() => setIsOpened(true)}
        />
      )}

      {/* Todo el contenido se revela después de abrir */}
      <div className={`transition-opacity duration-1000 ${isOpened ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        
        {/* Música de fondo (Simulada si no hay mp3 real) */}
        {isOpened && <MusicButton autoPlay={true} audioSrc="/audio/wedding-demo.mp3" />}

        {/* =========================================
            1. HERO / PORTADA
            ========================================= */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-paper-texture">
          {/* Capa de ruido y textura */}
          <div className="absolute inset-0 bg-noise-overlay opacity-50 mix-blend-overlay pointer-events-none" />
          
          <FloralFrame variant="corner" className="absolute inset-0 z-0" />

          <div className={`relative z-10 p-6 flex flex-col items-center justify-center transition-all duration-1000 transform ${showHero ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            <span className="font-script text-3xl md:text-5xl text-[var(--ap-primary)] mb-6 animate-breathe">Nuestra Boda</span>
            
            {/* Foto del Hero enmascarada elegantemente */}
            <div className="w-48 h-64 md:w-64 md:h-80 rounded-t-full rounded-b-full overflow-hidden border-4 border-white shadow-xl mb-8 relative">
              <img src={data.heroPhoto} alt="Novios" className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--ap-primary)]/30 rounded-t-full rounded-b-full pointer-events-none" />
            </div>

            <h1 className="font-serif text-5xl md:text-7xl text-[var(--ap-text)] tracking-wide leading-tight mb-4 drop-shadow-sm">
              {data.mainName} <span className="font-script text-[var(--ap-primary)] font-normal mx-2 text-6xl">&</span> {data.secondName}
            </h1>
            
            <p className="tracking-[0.3em] uppercase text-xs md:text-sm text-[var(--ap-text-muted)] font-medium">
              {data.eventDate.split("T")[0].replace(/-/g, " . ")}
            </p>
          </div>
        </section>

        {/* Separador */}
        <ElegantDivider variant="simple" />

        {/* =========================================
            2. MENSAJE Y PADRES
            ========================================= */}
        <InvitationSection className="text-center bg-paper-texture py-20 relative">
          <p className="font-script text-4xl text-[var(--ap-primary)] mb-6">Con la bendición de Dios</p>
          <p className="text-lg md:text-xl font-serif text-[var(--ap-text)] leading-relaxed max-w-lg mx-auto mb-16 px-6 opacity-90">
            "Y de nuestros padres, que con su amor y ejemplo nos han guiado hasta este momento tan especial."
          </p>
          
          <ParentsAndGodparents 
            parents={data.parents} 
            godparents={data.godparents} 
          />
        </InvitationSection>

        {/* =========================================
            3. CUENTA REGRESIVA
            ========================================= */}
        <InvitationSection className="py-24 bg-[var(--ap-bg-alt)] bg-paper-texture relative border-y border-[var(--ap-primary)]/10">
          <FloralFrame variant="top-bottom" className="absolute inset-0" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="font-script text-5xl text-center text-[var(--ap-primary)] mb-12">Faltan</h2>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-white">
              <CountdownTimer 
                targetDate={data.eventDate} 
                accentColor="var(--ap-primary)" 
                labelColor="var(--ap-text)"
              />
            </div>
          </div>
        </InvitationSection>

        {/* =========================================
            4. UBICACIONES (CEREMONIA Y RECEPCIÓN)
            ========================================= */}
        <InvitationSection className="py-24 bg-paper-texture">
          <div className="text-center mb-16">
            <p className="font-script text-4xl text-[var(--ap-primary)] mb-2">Dónde y Cuándo</p>
            <h2 className="font-serif text-3xl text-[var(--ap-text)] uppercase tracking-widest">Acompáñanos</h2>
            <ElegantDivider variant="ornamental" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
            {data.locations.map((loc, idx) => (
              <div key={idx} className="relative group">
                {/* Decoración de fondo sutil al hover */}
                <div className="absolute inset-0 bg-[var(--ap-primary)]/5 rounded-3xl transform scale-95 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <LocationCard 
                  title={loc.type} 
                  name={loc.name} 
                  address={loc.address} 
                  mapUrl={loc.mapsUrl} 
                  time={loc.time} 
                  className="relative bg-white/80 backdrop-blur-sm border-[var(--ap-primary)]/20 shadow-md"
                />
              </div>
            ))}
          </div>
        </InvitationSection>

        {/* =========================================
            5. ITINERARIO
            ========================================= */}
        {data.itinerary && (
          <InvitationSection className="py-24 bg-[var(--ap-bg-alt)] bg-paper-texture border-y border-[var(--ap-primary)]/10">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl text-[var(--ap-text)] uppercase tracking-widest">Itinerario</h2>
              <ElegantDivider variant="simple" />
            </div>
            <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white">
              <Itinerary items={data.itinerary} />
            </div>
          </InvitationSection>
        )}

        {/* =========================================
            6. GALERÍA
            ========================================= */}
        {data.photos && data.photos.length > 0 && (
          <InvitationSection className="py-24 bg-paper-texture">
            <div className="text-center mb-16">
              <p className="font-script text-4xl text-[var(--ap-primary)] mb-2">Nuestros Momentos</p>
              <h2 className="font-serif text-3xl text-[var(--ap-text)] uppercase tracking-widest">Galería</h2>
              <ElegantDivider variant="ornamental" />
            </div>
            <PhotoGallery photos={data.photos} className="max-w-4xl mx-auto" />
          </InvitationSection>
        )}

        {/* =========================================
            7. VESTIMENTA
            ========================================= */}
        {data.dressCode && (
          <InvitationSection className="py-24 bg-[var(--ap-bg-alt)] bg-paper-texture border-y border-[var(--ap-primary)]/10">
            <DressCode dressCode={data.dressCode} className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm shadow-md rounded-3xl p-8 border border-[var(--ap-primary)]/20" />
          </InvitationSection>
        )}

        {/* =========================================
            8. MESA DE REGALOS
            ========================================= */}
        {data.giftRegistry && (
          <InvitationSection className="py-24 bg-paper-texture relative">
            <FloralFrame variant="top-bottom" className="absolute inset-0" />
            <div className="relative z-10 bg-white/70 backdrop-blur-md max-w-xl mx-auto rounded-3xl p-8 shadow-sm border border-white">
              <GiftRegistry items={data.giftRegistry} />
            </div>
          </InvitationSection>
        )}

        {/* =========================================
            9. RSVP Y CIERRE
            ========================================= */}
        <InvitationSection className="py-32 bg-[var(--ap-bg-alt)] bg-paper-texture text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise-overlay opacity-30 mix-blend-overlay pointer-events-none" />
          <FloralFrame variant="corner" className="absolute inset-0 z-0 opacity-60" />
          
          <div className="relative z-10 flex flex-col items-center">
            <p className="font-script text-5xl text-[var(--ap-primary)] mb-8">Esperamos contar contigo</p>
            <h2 className="font-serif text-2xl text-[var(--ap-text)] uppercase tracking-widest mb-12">Por favor confirma tu asistencia</h2>
            
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[var(--ap-primary)] text-white text-sm font-medium uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--ap-primary)]/20 animate-breathe"
            >
              Confirmar Asistencia
            </a>

            <div className="mt-32 font-serif text-sm tracking-[0.3em] uppercase opacity-50">
              {data.mainName} & {data.secondName}
            </div>
          </div>
        </InvitationSection>

        {/* Floating RSVP Global */}
        <FloatingRSVP 
          phoneNumber={data.rsvpWhatsapp || "526645922368"} 
          message={`¡Hola! Confirmo mi asistencia a la boda de ${data.mainName} y ${data.secondName}.`}
        />

      </div>
    </InvitationLayout>
  );
}
