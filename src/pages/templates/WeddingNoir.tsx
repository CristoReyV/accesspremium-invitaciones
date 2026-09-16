import { useMemo, useState } from "react";
import { CalendarDays, Camera, Church, Diamond, Gift, GlassWater, MapPinned, Sparkles } from "lucide-react";
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

import { DEMO_BODA_NOIR } from "@/data/demoInvitations";
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

export default function WeddingNoir() {
  const data = DEMO_BODA_NOIR;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);
  const names = `${data.mainName} & ${data.secondName}`;

  return (
    <InvitationLayout theme={theme} pageTitle={`Boda de ${names}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505] px-6 text-center text-[#f7f0de]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-88" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.58)_72%)]" />
          <div className="relative z-10 max-w-xs">
            <p className="mb-7 text-xs uppercase tracking-[0.34em] text-[#d7c18a]">Nuestra boda</p>
            <h1 className="font-serif text-5xl italic leading-none">{data.mainName}</h1>
            <p className="my-3 font-serif text-4xl text-[#d7c18a]">&</p>
            <h2 className="font-serif text-5xl italic leading-none">{data.secondName}</h2>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#d7c18a]/80 bg-[#d7c18a] text-[#050505] shadow-[0_0_38px_rgba(215,193,138,0.28)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#050505] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-noir-bg text-[#f7f0de]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),rgba(0,0,0,0.48)_76%)]" />
            <div className="relative z-10 max-w-xs">
              <p className="mb-8 text-xs uppercase tracking-[0.32em] text-[#d7c18a]">{dateParts.day} de {dateParts.month}</p>
              <h1 className="font-serif text-6xl italic leading-none">{data.mainName}</h1>
              <div className="mx-auto my-5 h-px w-40 bg-gradient-to-r from-transparent via-[#d7c18a] to-transparent" />
              <h2 className="font-serif text-6xl italic leading-none">{data.secondName}</h2>
              <p className="mt-8 text-xs uppercase tracking-[0.28em] text-white/70">{dateParts.year}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-noir-card px-7 py-10">
              <Diamond className="mx-auto mb-5 h-9 w-9 text-[#d7c18a]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-white/82">{data.customMessage}</p>
              <div className="mx-auto my-9 h-px w-28 bg-[#d7c18a]/45" />
              <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#d7c18a]">Con la bendicion de nuestros padres</p>
              <div className="space-y-5 text-sm leading-6 text-white/78">
                {data.parents?.map((parent) => (
                  <p key={parent.name}>{parent.name}</p>
                ))}
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#d7c18a]">{data.godparents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#d7c18a]" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#d7c18a]">Cada vez falta menos</h2>
            <div className="ap-noir-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#d7c18a" labelColor="rgba(247,240,222,0.72)" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-9 font-serif text-3xl uppercase tracking-[0.14em]">Nuestra boda</h2>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.name}-${loc.time}`} className="ap-noir-panel px-3 py-7">
                  {loc.type === "ceremonia" ? <Church className="mx-auto mb-4 h-10 w-10 text-[#d7c18a]" /> : <GlassWater className="mx-auto mb-4 h-10 w-10 text-[#d7c18a]" />}
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#d7c18a"
                    className="bg-transparent text-[#f7f0de] shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <h2 className="mb-2 font-serif text-3xl uppercase tracking-[0.14em] text-[#d7c18a]">Itinerario</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#d7c18a] bg-[#d7c18a] text-[#050505]" lineClassName="bg-[#d7c18a]/35" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#d7c18a]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em]">Galeria noir</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-none border border-[#d7c18a]/45 grayscale shadow-[0_24px_48px_rgba(0,0,0,0.48)]" />
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-noir-card text-[#f7f0de]" iconClassName="bg-[#d7c18a]/12 text-[#d7c18a]" />
            </InvitationSection>
          )}

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-noir-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#d7c18a]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es nuestro mejor regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#d7c18a" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#d7c18a]" />
            <h2 className="mb-7 font-serif text-3xl uppercase tracking-[0.12em]">Confirma tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${encodeURIComponent(names)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#d7c18a] px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#050505] shadow-[0_18px_34px_rgba(215,193,138,0.22)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la boda de ${names}.`} bgColor="#d7c18a" textColor="#050505" />
        </div>
      </div>
    </InvitationLayout>
  );
}
