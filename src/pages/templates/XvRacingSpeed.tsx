import { useMemo, useState } from "react";
import { CalendarDays, Camera, Car, Flag, Gift, GlassWater, MapPinned, Shirt, Sparkles, Ticket, Trophy } from "lucide-react";
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

import { DEMO_XV_RACING_SPEED } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const carAsset = "/assets/templates/xv-hombres/racing-speed/racing-car.svg";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "2-digit" }).format(date),
  };
};

export default function XvRacingSpeed() {
  const data = DEMO_XV_RACING_SPEED;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "racing-action");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Mis XV de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#111] px-6 text-center text-white">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 w-full max-w-xs">
            <Car className="mx-auto mb-5 h-16 w-16 text-[#c99a2e] ap-xv-racing-float" />
            <p className="font-serif text-4xl italic text-[#f1d17b]">Mis 15 anos</p>
            <h1 className="mt-3 font-serif text-6xl text-white">{data.mainName}</h1>
            <img src={carAsset} alt="" className="mx-auto mt-5 h-24 w-full object-contain" />
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#c99a2e] text-black shadow-[0_0_42px_rgba(201,154,46,0.36)] transition hover:scale-105 active:scale-95"
            >
              <Flag className="h-9 w-9" />
            </button>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#f1d17b]">Toca para arrancar</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#111] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-xv-racing-bg text-white">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative min-h-screen overflow-hidden px-7 py-12 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-sm flex-col items-center justify-start pt-8">
              <div className="ap-xv-racing-arch w-full px-7 pb-10 pt-14">
                <p className="font-serif text-4xl italic text-[#f1d17b]">Mis 15 anos</p>
                <h1 className="mt-3 font-serif text-6xl leading-none text-white">{data.mainName}</h1>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/72">{dateParts.day} / {dateParts.month} / 20{dateParts.year}</p>
                <img src={carAsset} alt="" className="mx-auto mt-6 h-36 w-full object-contain ap-xv-racing-float" />
              </div>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-xv-racing-card px-7 py-10">
              <Trophy className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
              <p className="mb-5 font-serif text-3xl italic text-[#f1d17b]">Junto con mis padres</p>
              <p className="text-lg font-bold text-white">{data.parents?.[0]?.name}</p>
              <p className="mx-auto mt-7 max-w-xs text-sm leading-7 text-white/78">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-xv-racing-ticket px-6 py-8">
              <Ticket className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
              <p className="font-serif text-2xl italic text-[#f1d17b]">Una carrera inolvidable</p>
              <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-5 text-left">
                <p className="text-sm uppercase tracking-[0.12em] text-white/82">Comienza a las 15</p>
                <div className="text-right font-serif text-4xl text-[#f1d17b]">{dateParts.day}<br />{dateParts.month.slice(0, 3)}<br />20{dateParts.year}</div>
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <GlassWater className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver ubicacion"
                accentColor="#c99a2e"
                className="ap-xv-racing-card bg-[#090909] text-white"
              />
            ))}
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Flag className="mx-auto mb-4 h-10 w-10 text-[#c99a2e]" />
              <h2 className="mb-5 font-serif text-3xl italic text-[#f1d17b]">Pit lane</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#c99a2e] bg-[#c99a2e] text-black" lineClassName="bg-[#c99a2e]/30" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Shirt className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
              <DressCode dressCode={data.dressCode} className="ap-xv-racing-card text-white" iconClassName="bg-[#c99a2e]/14 text-[#c99a2e]" colorsContainerClassName="text-white" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#f1d17b]">Cada vez falta menos</h2>
            <div className="ap-xv-racing-ticket px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#f1d17b" labelColor="rgba(255,255,255,0.72)" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
            <h2 className="mb-8 font-serif text-3xl italic text-[#f1d17b]">Galeria racing</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1rem] border-[8px] border-black shadow-[0_20px_38px_rgba(0,0,0,0.55)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c99a2e] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#f1d17b]">Tu momento favorito quedo listo para sus XV.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-xv-racing-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#c99a2e]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi mejor regalo. Si deseas obsequiar algo especial, lo agradecere de corazon." accentColor="#c99a2e" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#c99a2e]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#f1d17b]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#c99a2e] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a los XV de ${data.mainName}.`} bgColor="#c99a2e" textColor="#050505" />
        </div>
      </div>
    </InvitationLayout>
  );
}
