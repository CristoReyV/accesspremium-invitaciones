import { useMemo, useState } from "react";
import { Baby, CalendarDays, Gift, Heart, PartyPopper, Sparkles, Vote } from "lucide-react";
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

import { DEMO_REVELACION_CLASSIC } from "@/data/demoInvitations";
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

export default function RevelacionClassicBalloons() {
  const data = DEMO_REVELACION_CLASSIC;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "coquette-aesthetic");
  const [isOpened, setIsOpened] = useState(false);
  const [team, setTeam] = useState<"nina" | "nino" | null>(null);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle="Revelacion Classic Balloons">
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#dff1fb] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-10 w-full max-w-xs rounded-[2rem] bg-white/82 px-7 py-9 shadow-[0_24px_60px_rgba(83,119,145,0.2)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.26em] text-[#b66a86]">Revelacion</p>
            <h1 className="mt-2 font-serif text-5xl text-[#9f526f]">Nino o Nina</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-8 inline-flex rounded-full bg-[#9fcce8] px-8 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_32px_rgba(74,130,170,0.28)] transition hover:scale-105 active:scale-95"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#dff1fb] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-balloons-bg text-[#73435b]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mt-5 w-full max-w-xs">
              <p className="text-2xl font-serif italic text-[#70a6c8]">Nino</p>
              <p className="text-xs uppercase tracking-[0.22em] text-[#c78a5e]">o</p>
              <p className="text-2xl font-serif italic text-[#d884a1]">Nina</p>
              <h1 className="mt-5 font-serif text-5xl leading-tight text-[#9f526f]">Revelacion de genero</h1>
              <p className="mt-4 font-serif text-3xl italic text-[#a7795b]">Que sera?</p>
              <p className="mt-8 rounded-full bg-white/86 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8b7692]">{dateParts.day} de {dateParts.month} {dateParts.year}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-balloons-card px-7 py-10">
              <Baby className="mx-auto mb-5 h-10 w-10 text-[#9f526f]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-[#d884a1]/45" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#70a6c8]">{data.parents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-3xl italic text-[#9f526f]">{data.parents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setTeam("nina")} className={`ap-balloons-team ${team === "nina" ? "bg-[#ffd9e5]" : "bg-white/78"} text-[#9f526f]`}>
                <Heart className="mx-auto mb-3 h-8 w-8 fill-[#f7b6c7]" />
                <span>Team Nina</span>
              </button>
              <button type="button" onClick={() => setTeam("nino")} className={`ap-balloons-team ${team === "nino" ? "bg-[#d9efff]" : "bg-white/78"} text-[#4e82a8]`}>
                <Heart className="mx-auto mb-3 h-8 w-8 fill-[#b7ddf6]" />
                <span>Team Nino</span>
              </button>
            </div>
            <p className="mt-5 text-sm font-semibold text-[#7c6177]">{team ? `Elegiste ${team === "nina" ? "Team Nina" : "Team Nino"}.` : "Elige tu team antes de la sorpresa."}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#9f526f]" />
            <h2 className="mb-7 font-serif text-3xl text-[#9f526f]">Cada vez falta menos</h2>
            <div className="ap-balloons-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#9f526f" labelColor="#7c6177" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-balloons-panel px-5 py-10">
              {data.locations.map((loc) => (
                <LocationCard
                  key={`${loc.name}-${loc.time}`}
                  title={loc.type}
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#9f526f"
                  className="bg-white/82 text-[#73435b] shadow-none"
                />
              ))}
              {data.dressCode && (
                <DressCode dressCode={data.dressCode} className="mt-8 bg-white/78" iconClassName="bg-[#f7b6c7]/32 text-[#9f526f]" />
              )}
              {data.giftRegistry && (
                <div className="mt-8">
                  <Gift className="mx-auto mb-4 h-9 w-9 text-[#9f526f]" />
                  <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es el mejor regalo. Si deseas tener un detalle, sera recibido con amor." accentColor="#9f526f" />
                </div>
              )}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <PartyPopper className="mx-auto mb-4 h-10 w-10 text-[#9f526f] ap-balloons-float" />
              <h2 className="mb-4 font-serif text-3xl text-[#9f526f]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#9fcce8] bg-[#9fcce8] text-white" lineClassName="bg-[#d884a1]/35" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Sparkles className="mx-auto mb-5 h-10 w-10 text-[#9f526f]" />
            <h2 className="mb-8 font-serif text-3xl text-[#9f526f]">Momentos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.4rem] border-4 border-white shadow-[0_16px_32px_rgba(83,119,145,0.18)]" />
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <Vote className="mx-auto mb-5 h-10 w-10 text-[#9f526f]" />
            <h2 className="mb-6 font-serif text-3xl text-[#9f526f]">Confirma tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20revelacion%20de%20genero.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#9f526f] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message="Hola, confirmo mi asistencia a la revelacion de genero." bgColor="#9f526f" />
        </div>
      </div>
    </InvitationLayout>
  );
}
