import { useMemo, useState } from "react";
import { Cake, Camera, Gift, GlassWater, Heart, MapPinned, Sparkles, Upload } from "lucide-react";
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

import { DEMO_COQUETTE_BOWS } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

function CoquetteRibbon() {
  return (
    <div className="mx-auto my-7 flex w-full max-w-[17rem] items-center justify-center gap-3 text-[#e33c2f]">
      <span className="h-px flex-1 bg-[#e33c2f]/45" />
      <Heart className="h-4 w-4 fill-[#e33c2f]" />
      <span className="h-px flex-1 bg-[#e33c2f]/45" />
    </div>
  );
}

export default function BirthdayCoquetteBows() {
  const data = DEMO_COQUETTE_BOWS;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "coquette-aesthetic");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Cumple de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#ffe8f0] px-6 text-center text-[#c7202b]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="relative z-10 w-full max-w-xs">
            <p className="font-serif text-3xl italic text-[#e91e8c]">Mi cumpleanos</p>
            <h1 className="mt-3 font-serif text-7xl leading-none text-[#e33c2f]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#e91e8c] text-white shadow-[0_18px_38px_rgba(233,30,140,0.26)] transition hover:scale-105 active:scale-95"
            >
              <Heart className="h-9 w-9 fill-white" />
            </button>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#e33c2f]">Haz click para abrir</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#ffdce9] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-coquette-bows-bg text-[#8f1f35]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-12 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-sm pt-6">
              <div className="relative mx-auto max-w-[19rem] py-5">
                <div className="absolute inset-x-[-1rem] inset-y-0 rounded-full bg-[#fff0f6]/78 blur-md" />
                <p className="relative font-serif text-3xl italic text-[#e91e8c]">Mi cumpleanos</p>
                <h1 className="relative mt-3 font-serif text-7xl leading-none text-[#e33c2f] drop-shadow-[0_8px_0_rgba(255,255,255,0.55)]">{data.mainName}</h1>
              </div>
              <div className="mx-auto mt-7 flex max-w-xs items-center justify-center gap-5">
                <Heart className="h-7 w-7 fill-[#d6212f] text-[#d6212f]" />
                <p className="relative rounded-full bg-[#fff0f6]/78 px-3 py-1 font-serif text-2xl italic text-[#e91e8c] shadow-[0_8px_22px_rgba(255,240,246,0.6)]">{dateParts.weekday} {dateParts.day} de {dateParts.month}</p>
                <Heart className="h-7 w-7 fill-[#d6212f] text-[#d6212f]" />
              </div>
              <div className="mx-auto mt-12 w-[17rem] rotate-[-2deg] bg-[#ff9fc3] p-5 shadow-[0_18px_36px_rgba(199,32,43,0.14)]">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img src={data.photos[1]} alt="Mesa de fiesta" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 font-serif text-4xl italic text-[#e33c2f]">It's party time</p>
              </div>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-coquette-bows-card px-7 py-10">
              <Cake className="mx-auto mb-5 h-10 w-10 text-[#e33c2f] ap-coquette-bows-float" />
              <p className="mx-auto max-w-xs font-serif text-xl italic leading-9 text-[#8f1f35]">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <h2 className="font-serif text-4xl italic text-[#e33c2f]">Estas invitado</h2>
            <p className="mx-auto mt-2 max-w-[12rem] text-xs font-bold uppercase tracking-[0.14em] text-[#e91e8c]">Ven a celebrar este dia tan especial conmigo</p>
            <CoquetteRibbon />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver en mapa"
                accentColor="#e91e8c"
                className="ap-coquette-bows-line bg-white/80 text-[#8f1f35]"
              />
            ))}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-coquette-bows-card px-3 py-8">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#e91e8c]" />
              <CountdownTimer targetDate={data.eventDate} accentColor="#e91e8c" labelColor="#e33c2f" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <GlassWater className="mx-auto mb-5 h-10 w-10 text-[#e33c2f]" />
              <h2 className="mb-5 font-serif text-4xl italic text-[#e33c2f]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#e91e8c] bg-[#e91e8c] text-white" lineClassName="bg-[#e33c2f]/25" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-coquette-bows-card" iconClassName="bg-[#e33c2f]/10 text-[#e33c2f]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#e33c2f]" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#e91e8c]">Mis 26</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-none border-[10px] border-[#ff9fc3] shadow-[0_18px_36px_rgba(199,32,43,0.16)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e91e8c] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#e33c2f]">Tu foto quedo lista para el album coquette.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-coquette-bows-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#e33c2f]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi mejor regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#e91e8c" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#e33c2f]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#e33c2f]">Te agradezco confirmar tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20cumple%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#e91e8c] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al cumple de ${data.mainName}.`} bgColor="#e91e8c" />
        </div>
      </div>
    </InvitationLayout>
  );
}
