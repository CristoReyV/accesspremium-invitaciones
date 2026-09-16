import { useMemo, useState } from "react";
import { Camera, Church, Gem, Gift, GlassWater, MapPinned, Music2, Sparkles } from "lucide-react";
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

import { DEMO_XV_GATSBY } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "2-digit" }).format(date),
    compact: new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date),
  };
};

export default function XvGatsby() {
  const data = DEMO_XV_GATSBY;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`XV de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505] px-6 text-center text-[#f7f0de]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-82" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),rgba(5,5,5,0.78)_64%)]" />
          <div className="relative z-10 max-w-xs">
            <p className="mb-5 font-serif text-5xl uppercase tracking-[0.1em] text-[#d4af37]">XV</p>
            <div className="ap-gatsby-divider mx-auto mb-8 w-32" />
            <h1 className="font-serif text-5xl italic text-[#f7f0de]">{data.mainName}</h1>
            <div className="ap-gatsby-divider mx-auto my-7 w-48" />
            <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{dateParts.compact}</p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-[#050505] shadow-[0_0_34px_rgba(212,175,55,0.34)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#050505] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-gatsby-bg text-[#f7f0de]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-88" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12),rgba(5,5,5,0.36)_72%)]" />
            <div className="relative z-10 max-w-xs pt-8">
              <p className="mb-4 font-serif text-5xl uppercase tracking-[0.16em] text-[#d4af37]">XV</p>
              <div className="ap-gatsby-divider mx-auto mb-8 w-52" />
              <h1 className="font-serif text-6xl italic leading-none text-[#f7f0de]">{data.mainName}</h1>
              <div className="ap-gatsby-divider mx-auto mt-5 w-52 rotate-180" />
              <p className="mt-7 text-xs uppercase tracking-[0.28em] text-[#d4af37]">{dateParts.compact}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-gatsby-frame px-7 py-12">
              <Gem className="mx-auto mb-5 h-9 w-9 text-[#d4af37]" />
              <p className="mb-7 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Junto con mis padres</p>
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#f7f0de]/82">{data.parents?.[0]?.name}</p>
              <div className="ap-gatsby-divider mx-auto my-8 w-44" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">y el amor de mi madrina</p>
              <p className="mt-4 font-serif text-2xl italic">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="mx-auto mb-10 h-16 w-16 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 p-4 text-[#d4af37]">
              <Sparkles className="h-full w-full" />
            </div>
            <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#f7f0de]/84">{data.customMessage}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.16em] text-[#d4af37]">Ceremonia y recepcion</h2>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.name}-${loc.time}`} className="ap-gatsby-panel px-3 py-7">
                  {loc.type === "misa" ? (
                    <Church className="mx-auto mb-4 h-10 w-10 text-[#d4af37]" />
                  ) : (
                    <GlassWater className="mx-auto mb-4 h-10 w-10 text-[#d4af37]" />
                  )}
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#d4af37"
                    className="bg-transparent text-[#f7f0de] shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Music2 className="mx-auto mb-5 h-10 w-10 text-[#d4af37]" />
              <h2 className="mb-3 font-serif text-3xl uppercase tracking-[0.16em]">Programa</h2>
              <Itinerary
                items={data.itinerary}
                itemClassName="border-[#d4af37] bg-[#d4af37] text-[#050505]"
                lineClassName="bg-[#d4af37]/35"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-[#f7f0de]/70">Cada vez falta menos</p>
            <div className="ap-gatsby-frame px-3 py-9">
              <CountdownTimer targetDate={data.eventDate} accentColor="#d4af37" labelColor="rgba(247,240,222,0.72)" />
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode
                dressCode={data.dressCode}
                className="ap-gatsby-panel text-[#f7f0de]"
                iconClassName="bg-[#d4af37]/12 text-[#d4af37]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#d4af37]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.16em]">Galeria Gatsby</h2>
            <PhotoGallery
              photos={data.photos}
              className="grid-cols-2"
              imageClassName="rounded-none border border-[#d4af37]/55 shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
            />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-gatsby-frame px-5 py-10">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#d4af37]" />
                <GiftRegistry
                  items={data.giftRegistry}
                  title="Mesa de regalos"
                  subtitle="Tu presencia es mi verdadero regalo. Si deseas tener un detalle, tendre lluvia de sobres en el evento."
                  accentColor="#d4af37"
                />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="grid grid-cols-[1fr_auto] items-center gap-6 text-left">
              <div className="relative min-h-64 overflow-hidden border border-[#d4af37]/55">
                <img src={data.photos[0]} alt={data.mainName} className="h-full min-h-64 w-full object-cover" />
                <div className="absolute inset-0 border-[10px] border-[#050505]/30" />
              </div>
              <div>
                <MapPinned className="mb-5 h-9 w-9 text-[#d4af37]" />
                <p className="mb-5 font-serif text-2xl uppercase leading-tight tracking-[0.08em]">
                  Favor de confirmar asistencia
                </p>
                <a
                  href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-[#d4af37] bg-[#f7f0de] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition hover:scale-105 active:scale-95"
                >
                  Confirmar
                </a>
              </div>
            </div>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia a los XV de ${data.mainName}.`}
            bgColor="#d4af37"
            textColor="#050505"
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
