import { useMemo, useState } from "react";
import { Car, Flag, Gauge, PartyPopper, Shield, Trophy, Zap } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import DressCode from "@/components/invitations/ui/DressCode";
import Itinerary from "@/components/invitations/ui/Itinerary";
import LocationCard from "@/components/invitations/LocationCard";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";
import MusicButton from "@/components/invitations/ui/MusicButton";

import { DEMO_RACING } from "@/data/demoInvitations";
import { getThemeByFamily } from "@/styles/tokens";
import { getInvitationById } from "@/data/invitations";

const streaks = [
  { top: "14%", delay: "0s" },
  { top: "32%", delay: ".7s" },
  { top: "58%", delay: "1.3s" },
  { top: "76%", delay: "2s" },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

function RacingBadge({ name }: { name: string }) {
  return (
    <div className="relative mx-auto flex h-56 w-64 items-center justify-center">
      <div className="absolute inset-x-2 top-7 h-32 rounded-[2.5rem] bg-[#cf0707] shadow-[0_12px_0_#111]" />
      <div className="absolute inset-x-0 top-20 h-24 rounded-b-[3.5rem] border-[10px] border-[#2a2a2a] bg-gradient-to-b from-[#d9d9d9] to-[#777]" />
      <Shield className="absolute top-9 h-32 w-32 text-[#e8e8e8] drop-shadow-[0_7px_0_rgba(0,0,0,0.35)]" />
      <Car className="absolute top-7 h-24 w-24 text-[#ffcc2b] drop-shadow-[4px_4px_0_#111] ap-racing-pulse" />
      <p className="absolute bottom-20 w-full -skew-x-6 text-center font-black uppercase tracking-[0.08em] text-white ap-racing-title text-[2.55rem] leading-none">
        {name}
      </p>
      <div className="absolute bottom-5 rounded-full border-4 border-[#111] bg-[#ffcc2b] px-6 py-1 text-3xl font-black text-[#111] shadow-[4px_4px_0_#fff]">
        95
      </div>
    </div>
  );
}

export default function KidsRacing() {
  const data = DEMO_RACING;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "racing-action");
  const [isOpened, setIsOpened] = useState(false);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Cumpleaños de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#d90000] px-5 text-center">
          <div className="absolute inset-0 ap-racing-bg" />
          <div className="absolute left-0 top-0 h-20 w-full ap-racing-checkers opacity-90" />
          <div className="absolute bottom-0 left-0 h-20 w-full ap-racing-checkers opacity-90" />
          {streaks.map((streak, index) => (
            <span
              key={index}
              className="ap-racing-streak"
              style={{ top: streak.top, animationDelay: streak.delay }}
            />
          ))}

          <div className="relative z-10 w-full max-w-sm ap-racing-card px-6 py-8">
            <Flag className="mx-auto mb-4 h-10 w-10 text-[#111]" />
            <p className="-skew-x-6 text-2xl font-black uppercase tracking-tight text-[#d90000]">
              Pase de Piloto
            </p>
            <RacingBadge name={data.mainName} />
            <p className="mx-auto mt-2 max-w-[17rem] text-sm font-black uppercase leading-6 text-[#111]">
              La pista abre para celebrar a toda velocidad.
            </p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl border-4 border-[#111] bg-[#ffcc2b] px-7 py-3 text-sm font-black uppercase tracking-wide text-[#111] shadow-[5px_5px_0_#d90000] transition hover:-translate-y-1 active:translate-y-0"
            >
              <Gauge className="h-5 w-5" />
              Arrancar
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#111] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-racing-bg text-[#111]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative min-h-screen overflow-hidden px-6 py-8 text-center text-white">
            <div className="absolute left-0 top-0 h-24 w-full ap-racing-checkers opacity-95" />
            <div className="absolute bottom-0 left-0 h-20 w-full ap-racing-checkers opacity-90" />
            {streaks.map((streak, index) => (
              <span
                key={index}
                className="ap-racing-streak"
                style={{ top: streak.top, animationDelay: streak.delay }}
              />
            ))}

            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center pt-20">
              <p className="-skew-x-6 text-4xl font-black uppercase tracking-tight text-white drop-shadow-[4px_4px_0_#111]">
                Feliz
              </p>
              <p className="ap-racing-title -skew-x-6 text-7xl font-black uppercase leading-none">
                Cumple
              </p>
              <RacingBadge name={data.mainName} />
              <p className="mt-4 rounded-full border-4 border-white bg-[#111] px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffcc2b] shadow-[5px_5px_0_#ffcc2b]">
                {eventDate}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-6 py-16 text-center">
            <div className="ap-racing-card px-6 py-10">
              <PartyPopper className="mx-auto mb-5 h-12 w-12 text-[#d90000]" />
              <h2 className="-skew-x-6 text-4xl font-black uppercase leading-none text-[#d90000] drop-shadow-[3px_3px_0_#ffcc2b]">
                Tu presencia es suficiente
              </h2>
              <p className="mx-auto mt-7 max-w-xs text-lg font-black leading-7 text-[#222]">
                {data.customMessage}
              </p>
              {data.parents && (
                <div className="mx-auto mt-8 max-w-xs border-y-4 border-[#111] py-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#d90000]">
                    Junto con mis papás
                  </p>
                  <p className="font-mono text-base font-black text-[#111]">
                    {data.parents[0]?.name}
                  </p>
                </div>
              )}
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-6 py-16 text-center">
            <div className="rounded-[2rem] border-4 border-[#111] bg-[#ffcc2b] px-5 py-7 shadow-[8px_8px_0_#fff]">
              <Trophy className="mx-auto mb-4 h-11 w-11 text-[#111]" />
              <h2 className="-skew-x-6 text-3xl font-black uppercase text-[#111]">
                Cada vuelta cuenta
              </h2>
              <div className="mt-7 rounded-2xl border-4 border-[#111] bg-white p-5">
                <CountdownTimer
                  targetDate={data.eventDate}
                  accentColor="#d90000"
                  labelColor="#111"
                />
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-6 py-16 text-center">
            <div className="mb-8 inline-flex -skew-x-6 items-center gap-3 border-4 border-[#111] bg-white px-5 py-3 shadow-[5px_5px_0_#ffcc2b]">
              <Flag className="h-7 w-7 text-[#d90000]" />
              <h2 className="text-3xl font-black uppercase text-[#111]">La pista</h2>
            </div>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.type}-${loc.time}`} className="rounded-[2rem] bg-[#111] p-3 shadow-[8px_8px_0_#ffcc2b]">
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicación"
                    accentColor="#d90000"
                    className="border-4 border-white text-[#111]"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-6 py-16 text-center">
              <div className="rounded-[2rem] border-4 border-white bg-[#111] px-4 py-8 text-white shadow-[8px_8px_0_#ffcc2b]">
                <Gauge className="mx-auto mb-4 h-11 w-11 text-[#ffcc2b]" />
                <h2 className="-skew-x-6 text-3xl font-black uppercase text-white">
                  Ruta de carrera
                </h2>
                <Itinerary
                  items={data.itinerary}
                  className="text-white"
                  itemClassName="border-[#ffcc2b] bg-[#ffcc2b] text-[#111]"
                  lineClassName="bg-[#ffcc2b]/60"
                />
              </div>
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-6 py-16 text-center">
              <DressCode
                dressCode={data.dressCode}
                className="ap-racing-card px-6 py-8"
                iconClassName="rounded-xl border-4 border-[#111] bg-[#ffcc2b] text-[#111]"
              />
            </InvitationSection>
          )}

          {data.photos && data.photos.length > 0 && (
            <InvitationSection className="relative px-6 py-16 text-center">
              <div className="mb-8 inline-flex -skew-x-6 items-center gap-3 border-4 border-[#111] bg-[#ffcc2b] px-5 py-3 shadow-[5px_5px_0_#fff]">
                <Zap className="h-7 w-7 text-[#d90000]" />
                <h2 className="text-3xl font-black uppercase text-[#111]">El campeón</h2>
              </div>
              <PhotoGallery
                photos={data.photos}
                className="grid-cols-2"
                imageClassName="rounded-xl border-4 border-white shadow-[7px_7px_0_#111]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-6 py-20 text-center">
            <div className="ap-racing-card px-6 py-10">
              <Flag className="mx-auto mb-5 h-12 w-12 text-[#d90000]" />
              <h2 className="-skew-x-6 text-4xl font-black uppercase leading-none text-[#111]">
                Confirma tu asistencia
              </h2>
              <p className="mx-auto mt-5 max-w-xs text-sm font-bold leading-6 text-[#333]">
                El equipo necesita saber que estarás en la parrilla de salida.
              </p>
              <a
                href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20cumple%20de%20${encodeURIComponent(data.mainName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl border-4 border-[#111] bg-[#d90000] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[5px_5px_0_#ffcc2b] transition hover:-translate-y-1 active:translate-y-0"
              >
                <Trophy className="h-5 w-5" />
                Confirmar
              </a>
            </div>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Claro que sí, confirmo mi asistencia al cumple de ${data.mainName}.`}
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
