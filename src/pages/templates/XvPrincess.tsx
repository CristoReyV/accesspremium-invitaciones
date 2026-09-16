import { useMemo, useState } from "react";
import {
  CalendarDays,
  Castle,
  Crown,
  Gem,
  Gift,
  Heart,
  Sparkles,
  WandSparkles,
} from "lucide-react";
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
import MusicButton from "@/components/invitations/ui/MusicButton";

import { DEMO_XV_PRINCESA } from "@/data/demoInvitations";
import { getThemeByFamily } from "@/styles/tokens";
import { getInvitationById } from "@/data/invitations";

const sparkles = [
  { left: "12%", top: "10%", delay: "0s" },
  { left: "82%", top: "12%", delay: ".4s" },
  { left: "22%", top: "21%", delay: ".9s" },
  { left: "68%", top: "27%", delay: "1.3s" },
  { left: "9%", top: "42%", delay: "1.8s" },
  { left: "88%", top: "49%", delay: ".2s" },
  { left: "28%", top: "63%", delay: "1.1s" },
  { left: "74%", top: "74%", delay: ".7s" },
  { left: "16%", top: "83%", delay: "1.6s" },
  { left: "56%", top: "88%", delay: ".5s" },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export default function XvPrincess() {
  const data = DEMO_XV_PRINCESA;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "princess-fantasy");
  const [isOpened, setIsOpened] = useState(false);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Mis XV Años - ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06369f] px-6 text-center text-white">
          <div className="absolute inset-0 ap-xv-royal-bg" />
          {sparkles.map((sparkle, index) => (
            <span
              key={index}
              className="ap-xv-sparkle"
              style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay }}
            />
          ))}

          <div className="relative z-10 w-full max-w-sm rounded-[2rem] border border-[#f7db86]/50 bg-[#05277a]/65 px-7 py-10 shadow-2xl backdrop-blur-md">
            <Crown className="mx-auto mb-5 h-12 w-12 text-[#f7db86] ap-xv-float" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.38em] text-[#f7db86]">
              Mis XV
            </p>
            <h1 className="ap-xv-script mb-4 text-6xl leading-none text-white">
              {data.mainName}
            </h1>
            <p className="mx-auto mb-8 max-w-[17rem] text-sm leading-6 text-white/82">
              Un capítulo nuevo está por empezar. Acompáñanos a abrir esta noche de cuento.
            </p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f7db86] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#062b7d] shadow-[0_0_28px_rgba(247,219,134,0.42)] transition hover:scale-105 active:scale-95"
            >
              <WandSparkles className="h-4 w-4" />
              Abrir mis XV
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#031c63] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-xv-royal-bg text-white">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center px-7 py-16 text-center">
            {sparkles.map((sparkle, index) => (
              <span
                key={index}
                className="ap-xv-sparkle"
                style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay }}
              />
            ))}

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#f7db86]/60 bg-white/10 shadow-[0_0_36px_rgba(247,219,134,0.28)] ap-xv-float">
                <Crown className="h-12 w-12 text-[#f7db86]" />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#f7db86]">
                Mis XV Años
              </p>
              <h1 className="ap-xv-script text-[5.4rem] leading-[0.82] text-white drop-shadow-2xl">
                {data.mainName}
              </h1>
              <div className="my-8 flex items-center gap-4 text-[#f7db86]">
                <span className="h-px w-20 bg-current opacity-60" />
                <Castle className="h-9 w-9" />
                <span className="h-px w-20 bg-current opacity-60" />
              </div>
              <p className="max-w-xs text-sm uppercase tracking-[0.18em] text-white/82">
                {eventDate}
              </p>
              <p className="mt-5 max-w-xs font-serif text-lg leading-8 text-white/86">
                {data.customMessage}
              </p>
            </div>

            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#f7db86]">
              <Sparkles className="mx-auto mb-2 h-5 w-5 animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.36em]">Desliza</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="ap-xv-card rounded-[2rem] px-7 py-11">
              <Gem className="mx-auto mb-5 h-9 w-9 text-[#f7db86]" />
              <p className="mb-6 font-serif text-xl leading-8 text-white/88">
                Con la bendición de Dios y el amor de quienes han cuidado mis pasos,
                compartimos la alegría de esta noche especial.
              </p>
              <ParentsAndGodparents parents={data.parents} godparents={data.godparents} />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <p className="ap-xv-script mb-2 text-5xl text-white">La fecha real</p>
            <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#f7db86]/50 bg-white/10">
              <CalendarDays className="h-9 w-9 text-[#f7db86]" />
            </div>
            <div className="ap-xv-card rounded-[2rem] px-5 py-8">
              <CountdownTimer
                targetDate={data.eventDate}
                accentColor="#f7db86"
                labelColor="rgba(255,255,255,0.72)"
              />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <h2 className="ap-xv-shimmer mb-10 font-serif text-4xl">Ceremonia y Recepcion</h2>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.type}-${loc.time}`} className="rounded-[2rem] border border-[#f7db86]/40 bg-white/10 p-3">
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicación"
                    accentColor="#d4af37"
                    className="bg-[#fff7df] text-[#092a76] shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-20 text-center">
              <h2 className="mb-3 font-serif text-4xl text-white">Programa</h2>
              <p className="mx-auto mb-8 max-w-xs text-sm leading-6 text-white/72">
                Cada momento está preparado para vivir una noche de gala, vals y celebración.
              </p>
              <div className="ap-xv-card rounded-[2rem] px-2 py-4">
                <Itinerary
                  items={data.itinerary}
                  itemClassName="border-[#f7db86] bg-[#f7db86] text-[#062b7d]"
                  lineClassName="bg-[#f7db86]/40"
                />
              </div>
            </InvitationSection>
          )}

          {data.photos && data.photos.length > 0 && (
            <InvitationSection className="relative px-7 py-20 text-center">
              <p className="ap-xv-script mb-3 text-5xl text-white">Recuerdos</p>
              <div className="mb-10 flex items-center justify-center gap-3 text-[#f7db86]">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.35em]">Galeria</span>
                <Sparkles className="h-4 w-4" />
              </div>
              <PhotoGallery
                photos={data.photos}
                className="grid-cols-2"
                imageClassName="rounded-2xl border border-[#f7db86]/50 shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="space-y-8">
              {data.dressCode && (
                <DressCode
                  dressCode={data.dressCode}
                  className="ap-xv-card rounded-[2rem] border-[#f7db86]/50 bg-[#05277a]/70 text-white"
                  iconClassName="border-[#f7db86]/40 bg-[#f7db86]/15 text-[#f7db86]"
                />
              )}

              {data.giftRegistry && (
                <div className="ap-xv-card rounded-[2rem] px-5 py-9">
                  <Gift className="mx-auto mb-4 h-9 w-9 text-[#f7db86]" />
                  <GiftRegistry
                    items={data.giftRegistry}
                    title="Lluvia de Sobres"
                    subtitle="Tu presencia es mi regalo más importante. Si deseas tener un detalle, puedes hacerlo aquí."
                    accentColor="#d4af37"
                  />
                </div>
              )}
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-24 text-center">
            <Heart className="mx-auto mb-6 h-10 w-10 text-[#f7db86] ap-xv-float" />
            <h2 className="ap-xv-script mb-5 text-6xl text-white">Te espero</h2>
            <p className="mx-auto mb-9 max-w-xs text-sm leading-7 text-white/78">
              Confirma tu asistencia y comparte conmigo esta noche de magia.
            </p>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f7db86] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#062b7d] shadow-[0_0_30px_rgba(247,219,134,0.34)] transition hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia a los XV años de ${data.mainName}.`}
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
