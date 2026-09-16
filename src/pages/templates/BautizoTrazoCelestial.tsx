import { useMemo, useState } from "react";
import { Baby, CalendarDays, Camera, Church, Cross, Gift, HandHeart, Sparkles } from "lucide-react";
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

import { DEMO_BAUTIZO_TRAZO } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

export default function BautizoTrazoCelestial() {
  const data = DEMO_BAUTIZO_TRAZO;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "religious-classic");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Bautizo de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f9fbfd] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72" />
          <div className="relative z-10 w-full max-w-xs rounded-t-full rounded-b-[3rem] border border-[#7fa3be]/45 bg-white/82 px-7 py-12 shadow-[0_24px_60px_rgba(83,119,145,0.18)] backdrop-blur">
            <Cross className="mx-auto mb-4 h-10 w-10 text-[#7fa3be]" />
            <p className="text-xs uppercase tracking-[0.28em] text-[#7fa3be]">Mi bautizo</p>
            <h1 className="mt-3 font-serif text-4xl italic text-[#547d9c]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-8 inline-flex rounded-full bg-[#547d9c] px-8 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#e8f0f8] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-trazo-bg text-[#365b75]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-xs">
              <Cross className="mx-auto mb-4 h-10 w-10 text-[#7fa3be] ap-trazo-float" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#7fa3be]">Mi bautizo</p>
              <h1 className="mt-3 font-serif text-5xl italic leading-none text-[#547d9c]">{data.mainName}</h1>
              <div className="mx-auto my-6 h-44 w-44 overflow-hidden rounded-full border-[10px] border-white/88 shadow-[0_20px_38px_rgba(83,119,145,0.2)]">
                <img src={data.photos[1]} alt={data.mainName} className="h-full w-full object-cover" />
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#51708a]">{dateParts.weekday}</p>
              <p className="font-serif text-5xl leading-none text-[#547d9c]">{dateParts.day}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#51708a]">{dateParts.month} {dateParts.year}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-trazo-panel px-7 py-12">
              <HandHeart className="mx-auto mb-5 h-10 w-10 text-[#7fa3be]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-[#7fa3be]/45" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#7fa3be]">{data.parents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic text-[#547d9c]">{data.parents?.[0]?.name}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-[#7fa3be]">{data.godparents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic text-[#547d9c]">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-trazo-panel px-5 py-10">
              <Church className="mx-auto mb-5 h-10 w-10 text-[#7fa3be]" />
              <h2 className="mb-8 font-serif text-3xl text-[#547d9c]">Ceremonia y recepcion</h2>
              <div className="space-y-6">
                {data.locations.map((loc) => (
                  <LocationCard
                    key={`${loc.name}-${loc.time}`}
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#547d9c"
                    className="bg-white/82 text-[#365b75] shadow-none"
                  />
                ))}
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#7fa3be]" />
            <h2 className="mb-7 font-serif text-3xl text-[#547d9c]">Cada vez falta menos</h2>
            <div className="ap-trazo-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#547d9c" labelColor="#51708a" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#7fa3be]" />
              <h2 className="mb-4 font-serif text-3xl text-[#547d9c]">Itinerario</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#547d9c] bg-[#547d9c] text-white" lineClassName="bg-[#7fa3be]/35" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-trazo-card" iconClassName="bg-[#7fa3be]/15 text-[#547d9c]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#7fa3be]" />
            <h2 className="mb-8 font-serif text-3xl text-[#547d9c]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-full border-4 border-white shadow-[0_16px_32px_rgba(83,119,145,0.18)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-trazo-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#7fa3be]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi verdadero regalo. Si deseas tener un detalle, lo agradecemos de corazon." accentColor="#547d9c" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Baby className="mx-auto mb-5 h-10 w-10 text-[#7fa3be]" />
            <h2 className="mb-6 font-serif text-3xl text-[#547d9c]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20bautizo%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#547d9c] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al bautizo de ${data.mainName}.`} bgColor="#547d9c" />
        </div>
      </div>
    </InvitationLayout>
  );
}
