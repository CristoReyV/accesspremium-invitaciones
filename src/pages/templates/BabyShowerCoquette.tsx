import { useMemo, useState } from "react";
import { Baby, Camera, Gift, Heart, MapPinned, Music, Ribbon, Sparkles } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import DressCode from "@/components/invitations/ui/DressCode";
import GiftRegistry from "@/components/invitations/GiftRegistry";
import Itinerary from "@/components/invitations/ui/Itinerary";
import LocationCard from "@/components/invitations/LocationCard";
import MusicButton from "@/components/invitations/ui/MusicButton";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";

import { DEMO_BABY_COQUETTE } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
  };
};

export default function BabyShowerCoquette() {
  const data = DEMO_BABY_COQUETTE;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "coquette-aesthetic");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Baby Shower - ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white px-6 text-center text-[#ffffff]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-10 mt-24 w-full max-w-xs">
            <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/88">Baby shower</p>
            <h1 className="ap-coquette-script text-7xl leading-none text-white">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-8 inline-flex rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e96f98] shadow-[0_18px_36px_rgba(213,99,136,0.24)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#fff8fb] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-coquette-bg text-[#7d4057]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mt-16 w-full max-w-xs text-white">
              <p className="text-xs uppercase tracking-[0.28em] text-white/82">Baby shower</p>
              <h1 className="ap-coquette-script mt-2 text-7xl leading-none">{data.mainName}</h1>
              <div className="mx-auto my-4 h-px w-40 bg-white/72" />
              <p className="text-sm uppercase tracking-[0.18em]">Domingo</p>
              <p className="font-serif text-6xl italic leading-none">{dateParts.day}</p>
              <p className="text-sm uppercase tracking-[0.2em]">{dateParts.month} {dateParts.year}</p>
              <p className="mt-4 text-sm font-semibold">{data.eventTime}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-coquette-panel px-7 py-12">
              <Heart className="mx-auto mb-5 h-10 w-10 fill-[#f6b9cb] text-white ap-coquette-float" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-white">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-white/55" />
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/78">{data.parents?.[0]?.role}</p>
              <p className="ap-coquette-script text-5xl leading-none text-white">{data.parents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-coquette-card px-5 py-9">
              <Baby className="mx-auto mb-4 h-10 w-10 text-[#e96f98]" />
              <h2 className="mb-7 ap-coquette-script text-6xl text-[#e96f98]">Detalles</h2>
              {data.locations.map((loc) => (
                <LocationCard
                  key={`${loc.name}-${loc.time}`}
                  title={loc.type}
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#e96f98"
                  className="bg-transparent text-[#7d4057] shadow-none"
                />
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Music className="mx-auto mb-5 h-10 w-10 text-[#e96f98]" />
              <h2 className="mb-4 ap-coquette-script text-6xl text-[#e96f98]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#e96f98] bg-[#e96f98] text-white" lineClassName="bg-[#e96f98]/30" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-coquette-card px-3 py-8">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#e96f98]" />
              <h2 className="mb-6 font-serif text-3xl text-[#e96f98]">Cada vez falta menos</h2>
              <CountdownTimer targetDate={data.eventDate} accentColor="#e96f98" labelColor="#7d4057" />
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-coquette-card" iconClassName="bg-[#f6b9cb]/35 text-[#e96f98]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#e96f98]" />
            <h2 className="mb-8 ap-coquette-script text-6xl text-[#e96f98]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.4rem] border-4 border-white shadow-[0_18px_36px_rgba(213,99,136,0.18)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-coquette-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#e96f98]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi verdadero regalo. Si deseas tener un detalle, lo agradecemos de corazon." accentColor="#e96f98" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Ribbon className="mx-auto mb-5 h-10 w-10 text-[#e96f98] ap-coquette-float" />
            <h2 className="mb-5 ap-coquette-script text-6xl text-[#e96f98]">Confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20Baby%20Shower%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#e96f98] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_18px_34px_rgba(213,99,136,0.24)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al Baby Shower de ${data.mainName}.`} bgColor="#e96f98" />
        </div>
      </div>
    </InvitationLayout>
  );
}
