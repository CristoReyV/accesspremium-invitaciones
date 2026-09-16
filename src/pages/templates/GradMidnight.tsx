import { useMemo, useState } from "react";
import { Award, Camera, Gift, GraduationCap, MapPinned, PartyPopper, Sparkles } from "lucide-react";
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

import { DEMO_GRAD_MIDNIGHT } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const paperAsset = "/assets/templates/graduacion/midnight-gala/midnight-paper.png";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
  };
};

export default function GradMidnight() {
  const data = DEMO_GRAD_MIDNIGHT;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Graduacion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0b1a35] px-6 text-center">
          <img src={paperAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,234,0.18),rgba(11,26,53,0.34))]" />
          <div className="relative z-10 w-full max-w-xs rounded-t-full border border-[#c4a962]/55 bg-[#f8f3e8]/92 px-8 pb-10 pt-16 shadow-[0_28px_70px_rgba(11,26,53,0.28)]">
            <GraduationCap className="mx-auto mb-6 h-16 w-16 text-[#0b1a35] ap-grad-cap" />
            <p className="font-serif text-5xl font-semibold text-[#0b1a35]">{dateParts.year}</p>
            <p className="font-serif text-5xl italic text-[#c4a962]">Graduacion</p>
            <p className="mt-7 text-xs uppercase tracking-[0.22em] text-[#526078]">{data.mainName}</p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-9 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b1a35] text-[#f8f3e8] shadow-[0_16px_34px_rgba(11,26,53,0.34)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <Sparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#d9d1c4] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-grad-bg text-[#26304a]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={paperAsset} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mx-auto max-w-sm">
              <p className="font-serif text-6xl font-semibold leading-none text-[#0b1a35]">{dateParts.year}</p>
              <h1 className="-mt-2 font-serif text-6xl italic leading-none text-[#c4a962]">Graduacion</h1>
              <div className="relative mx-auto mt-6 w-64 border border-[#c4a962]/45 bg-white p-2 shadow-[0_18px_40px_rgba(38,48,74,0.16)]">
                <img src={data.heroPhoto} alt={data.mainName} className="aspect-[4/4.4] w-full object-cover" />
              </div>
              <h2 className="mt-8 font-serif text-2xl uppercase tracking-[0.14em] text-[#26304a]">
                {data.mainName}
              </h2>
              <div className="mx-auto mt-5 grid w-64 grid-cols-[1fr_auto_1fr] items-center gap-4 text-[#c4a962]">
                <span className="h-px bg-[#c4a962]/55" />
                <span className="font-serif text-5xl leading-none">{dateParts.day}</span>
                <span className="h-px bg-[#c4a962]/55" />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#526078]">{dateParts.weekday} de {dateParts.month}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <GraduationCap className="mx-auto mb-6 h-16 w-16 text-[#0b1a35] ap-grad-cap" />
            <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#2f3855]">{data.customMessage}</p>
            <div className="mx-auto my-9 h-px w-32 bg-[#c4a962]/55" />
            <p className="text-xs uppercase tracking-[0.26em] text-[#c4a962]">{data.parents?.[0]?.role}</p>
            <p className="mt-3 font-serif text-2xl text-[#0b1a35]">{data.parents?.[0]?.name}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-grad-card px-6 py-10">
              <PartyPopper className="mx-auto mb-5 h-10 w-10 text-[#c4a962]" />
              <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em] text-[#0b1a35]">Programa</h2>
              {data.itinerary && (
                <Itinerary
                  items={data.itinerary}
                  itemClassName="border-[#0b1a35] bg-[#0b1a35] text-[#f8f3e8]"
                  lineClassName="bg-[#c4a962]/45"
                />
              )}
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            {data.locations.map((loc) => (
              <div key={`${loc.name}-${loc.time}`} className="ap-grad-card px-4 py-9">
                <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#c4a962]" />
                <LocationCard
                  title="Recepcion"
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver en mapa"
                  accentColor="#0b1a35"
                  className="bg-transparent text-[#26304a] shadow-none"
                />
              </div>
            ))}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#c4a962]">Cada vez falta menos</p>
            <div className="ap-grad-card px-3 py-9">
              <CountdownTimer targetDate={data.eventDate} accentColor="#c4a962" labelColor="#526078" />
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode
                dressCode={data.dressCode}
                className="ap-grad-card"
                iconClassName="bg-[#0b1a35] text-[#f8f3e8]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Award className="mx-auto mb-5 h-10 w-10 text-[#c4a962]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#c4a962]">Mesa de regalos</h2>
            {data.giftRegistry && (
              <GiftRegistry
                items={data.giftRegistry}
                title="Tu presencia es mi verdadero regalo"
                subtitle="Si deseas tener un detalle, lo agradecere de corazon."
                accentColor="#c4a962"
                className="ap-grad-card px-5 py-9"
              />
            )}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#0b1a35]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em] text-[#0b1a35]">Recuerdos</h2>
            <PhotoGallery
              photos={data.photos}
              className="grid-cols-2"
              imageClassName="ap-grad-polaroid rounded-none"
            />
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <Gift className="mx-auto mb-5 h-10 w-10 text-[#c4a962]" />
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-[#526078]">Favor de confirmar antes del 5 de febrero</p>
            <h2 className="mb-7 font-serif text-3xl uppercase tracking-[0.12em] text-[#0b1a35]">Confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20graduacion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#0b1a35] px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#f8f3e8] shadow-[0_18px_34px_rgba(11,26,53,0.24)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia a la graduacion de ${data.mainName}.`}
            bgColor="#0b1a35"
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
