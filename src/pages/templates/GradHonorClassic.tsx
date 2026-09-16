import { useMemo, useState } from "react";
import { Award, Camera, Gift, GraduationCap, MapPinned, ScrollText, Sparkles } from "lucide-react";
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

import { DEMO_GRAD_HONOR } from "@/data/demoInvitations";
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

export default function GradHonorClassic() {
  const data = DEMO_GRAD_HONOR;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "academic-formal");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Graduacion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f7f3ea] px-6 text-center text-[#0b1a35]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="relative z-10 max-w-xs">
            <GraduationCap className="mx-auto mb-5 h-14 w-14 text-[#0b1a35] ap-honor-float" />
            <p className="font-serif text-6xl font-semibold text-[#d1b06a]">{dateParts.year}</p>
            <h1 className="mt-4 font-serif text-5xl leading-none text-[#0b1a35]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b1a35] text-[#f8f3e8] shadow-[0_16px_34px_rgba(11,26,53,0.26)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#ded8cd] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-honor-bg text-[#29314b]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 py-14 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-sm">
              <p className="font-serif text-6xl font-semibold leading-none text-[#d1b06a]">{dateParts.year}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#526078]">Ceremonia de graduacion</p>
              <h1 className="mt-5 font-serif text-5xl leading-none text-[#0b1a35]">{data.mainName}</h1>
              <div className="mx-auto my-6 h-px w-36 bg-[#d1b06a]/55" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#526078]">Licenciatura en Turismo</p>
              <div className="ap-honor-photo mx-auto mt-10">
                <img src={data.photos[0]} alt={data.mainName} className="h-full w-full rounded-full object-cover" />
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#526078]">{dateParts.day} de {dateParts.month}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <Award className="mx-auto mb-5 h-11 w-11 text-[#d1b06a] ap-honor-float" />
            <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#29314b]">{data.customMessage}</p>
            <div className="mx-auto my-9 h-px w-28 bg-[#d1b06a]/50" />
            <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06a]">{data.parents?.[0]?.role}</p>
            <p className="mt-3 font-serif text-2xl text-[#0b1a35]">{data.parents?.[0]?.name}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-honor-card px-6 py-10">
              <ScrollText className="mx-auto mb-5 h-10 w-10 text-[#d1b06a]" />
              <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em] text-[#0b1a35]">Programa</h2>
              {data.itinerary && (
                <Itinerary items={data.itinerary} itemClassName="border-[#0b1a35] bg-[#0b1a35] text-[#f8f3e8]" lineClassName="bg-[#d1b06a]/45" />
              )}
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            {data.locations.map((loc) => (
              <div key={`${loc.name}-${loc.time}`} className="ap-honor-card px-4 py-9">
                <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#d1b06a]" />
                <LocationCard
                  title="Ubicacion"
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver en mapa"
                  accentColor="#0b1a35"
                  className="bg-transparent text-[#29314b] shadow-none"
                />
              </div>
            ))}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#d1b06a]">Cada vez falta menos</p>
            <div className="ap-honor-card px-3 py-9">
              <CountdownTimer targetDate={data.eventDate} accentColor="#d1b06a" labelColor="#526078" />
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-honor-card" iconClassName="bg-[#0b1a35] text-[#f8f3e8]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#0b1a35]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em] text-[#0b1a35]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="ap-honor-polaroid rounded-none" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <GiftRegistry
                items={data.giftRegistry}
                title="Mesa de regalos"
                subtitle="Tu presencia es mi verdadero regalo. Si deseas tener un detalle, lo agradecere de corazon."
                accentColor="#d1b06a"
                className="ap-honor-card px-5 py-9"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Gift className="mx-auto mb-5 h-10 w-10 text-[#d1b06a]" />
            <h2 className="mb-7 font-serif text-3xl uppercase tracking-[0.12em] text-[#0b1a35]">Confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20graduacion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#0b1a35] px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f8f3e8] shadow-[0_18px_34px_rgba(11,26,53,0.2)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la graduacion de ${data.mainName}.`} bgColor="#0b1a35" />
        </div>
      </div>
    </InvitationLayout>
  );
}
