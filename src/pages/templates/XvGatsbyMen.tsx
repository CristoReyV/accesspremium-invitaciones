import { useMemo, useState } from "react";
import { CalendarDays, Camera, Gem, Gift, GlassWater, MapPinned, Music2, Sparkles, Upload } from "lucide-react";
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

import { DEMO_XV_GATSBY_MEN } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const gatsbyAsset = "/assets/templates/xv-hombres/gatsby-gold-men/gatsby-men-frame.svg";

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

function DecoDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`ap-gatsby-men-divider ${className}`}>
      <span />
      <Gem className="h-4 w-4" />
      <span />
    </div>
  );
}

export default function XvGatsbyMen() {
  const data = DEMO_XV_GATSBY_MEN;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`XV de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#080404] px-6 text-center text-[#f7f0de]">
          <img src={gatsbyAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.08),rgba(5,5,5,0.36)_72%)]" />
          <div className="relative z-10 mt-16 w-full max-w-xs">
            <p className="font-serif text-5xl uppercase tracking-[0.12em] text-[#d5af56]">XV</p>
            <DecoDivider className="mx-auto my-7 w-56" />
            <h1 className="font-serif text-6xl leading-none text-[#f7f0de]">{data.mainName}</h1>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d5af56]">{dateParts.compact}</p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#d5af56] text-[#050505] shadow-[0_0_42px_rgba(213,175,86,0.32)] transition hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-9 w-9" />
            </button>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f7f0de]">Toca para abrir</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#080404] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-gatsby-men-bg text-[#f7f0de]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-12 text-center">
            <img src={gatsbyAsset} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,4,4,0.08),rgba(8,4,4,0.22)_56%,rgba(8,4,4,0.4))]" />
            <div className="relative z-10 w-full max-w-sm pt-10">
              <div className="ap-gatsby-men-arch mx-auto px-7 py-11">
                <p className="font-serif text-5xl uppercase tracking-[0.12em] text-[#d5af56]">XV</p>
                <DecoDivider className="mx-auto my-7 w-56" />
                <h1 className="font-serif text-6xl leading-none text-[#f7f0de]">{data.mainName}</h1>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.23em] text-[#d5af56]">
                  {dateParts.day} de {dateParts.month} / 20{dateParts.year}
                </p>
              </div>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-gatsby-men-card px-7 py-10">
              <Gem className="mx-auto mb-5 h-10 w-10 text-[#d5af56] ap-gatsby-men-float" />
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#d5af56]">Junto con mis padres</p>
              <p className="font-serif text-2xl leading-9 text-[#f7f0de]">{data.parents?.[0]?.name}</p>
              <DecoDivider className="mx-auto my-8 w-48" />
              <p className="mx-auto max-w-xs text-sm leading-7 text-[#f7f0de]/80">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-gatsby-men-ticket px-6 py-8">
              <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#d5af56]" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d5af56]">Save the date</p>
              <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-5 text-left">
                <p className="font-serif text-2xl italic leading-8 text-[#f7f0de]">Una noche de gala, jazz y brindis.</p>
                <p className="text-right font-serif text-4xl leading-none text-[#d5af56]">{dateParts.day}<br />{dateParts.month.slice(0, 3)}<br />20{dateParts.year}</p>
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <GlassWater className="mx-auto mb-5 h-10 w-10 text-[#d5af56]" />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver ubicacion"
                accentColor="#d5af56"
                className="ap-gatsby-men-card text-[#f7f0de]"
              />
            ))}
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Music2 className="mx-auto mb-5 h-10 w-10 text-[#d5af56]" />
              <h2 className="mb-6 font-serif text-3xl uppercase tracking-[0.12em] text-[#f7f0de]">Programa Gatsby</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#d5af56] bg-[#d5af56] text-[#050505]" lineClassName="bg-[#d5af56]/32" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#d5af56]">La cuenta regresiva</p>
            <div className="ap-gatsby-men-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#d5af56" labelColor="rgba(247,240,222,0.72)" />
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-gatsby-men-card text-[#f7f0de]" iconClassName="bg-[#d5af56]/14 text-[#d5af56]" colorsContainerClassName="text-[#f7f0de]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#d5af56]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.12em] text-[#f7f0de]">Galeria de gala</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-none border-[7px] border-[#0a0505] shadow-[0_22px_46px_rgba(0,0,0,0.52)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-none border border-[#d5af56] bg-[#d5af56] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#050505] shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#d5af56]">Tu foto quedo lista para la galeria Gatsby.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-gatsby-men-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#d5af56]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi mejor regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#d5af56" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#d5af56]" />
            <h2 className="mb-6 font-serif text-3xl uppercase leading-tight tracking-[0.1em] text-[#f7f0de]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-none border border-[#d5af56] bg-[#f7f0de] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#050505] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a los XV de ${data.mainName}.`} bgColor="#d5af56" textColor="#050505" />
        </div>
      </div>
    </InvitationLayout>
  );
}
