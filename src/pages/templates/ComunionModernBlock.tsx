import { useMemo, useState } from "react";
import { CalendarDays, Camera, Church, Cross, Gift, HandHeart, Sparkles } from "lucide-react";
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

import { DEMO_COMUNION_MODERN } from "@/data/demoInvitations";
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

export default function ComunionModernBlock() {
  const data = DEMO_COMUNION_MODERN;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Primera comunion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fdfbf5] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="relative z-10 w-full max-w-xs">
            <div className="mx-auto h-44 w-32 overflow-hidden rounded-full border-[10px] border-white shadow-[0_20px_44px_rgba(75,86,59,0.18)]">
              <img src={data.photos[0]} alt={data.mainName} className="h-full w-full object-cover" />
            </div>
            <p className="mt-7 text-xs uppercase tracking-[0.28em] text-[#a88b4e]">Mi primera comunion</p>
            <h1 className="mt-3 font-serif text-5xl text-[#7b6a43]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-9 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#7f8d6e] text-white shadow-[0_18px_34px_rgba(75,86,59,0.26)] transition hover:scale-105 active:scale-95"
            >
              <Cross className="h-10 w-10" />
            </button>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#9b8355]">Haz click para abrir</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#f7f0e5] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-modern-bg text-[#3f4636]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative min-h-screen overflow-hidden px-7 py-10 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col items-center justify-start pt-8">
              <Cross className="h-9 w-9 text-[#c4a962] ap-modern-float" />
              <div className="mt-7 h-48 w-36 overflow-hidden rounded-full border-[10px] border-white shadow-[0_18px_38px_rgba(63,70,54,0.18)]">
                <img src={data.photos[0]} alt={data.mainName} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#927846]">Mi primera comunion</p>
              <h1 className="mt-2 font-serif text-5xl text-[#a88b4e]">{data.mainName}</h1>
              <div className="mt-7 rounded-t-full bg-white/78 px-5 pb-4 pt-6 shadow-[0_18px_34px_rgba(63,70,54,0.1)] backdrop-blur">
                <p className="font-serif text-xl uppercase tracking-[0.12em] text-[#9b8355]">{dateParts.day} de {dateParts.month}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#7f8d6e]">{dateParts.year} - {data.eventTime}</p>
              </div>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-modern-card px-7 py-10">
              <HandHeart className="mx-auto mb-5 h-10 w-10 text-[#a88b4e]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#4a4c3b]">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-[#c4a962]/45" />
              <p className="text-xs uppercase tracking-[0.22em] text-[#84916d]">{data.parents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl text-[#927846]">{data.parents?.[0]?.name}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#84916d]">{data.godparents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl text-[#927846]">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-modern-olive px-5 pb-12 pt-14">
              <Church className="mx-auto mb-5 h-10 w-10" />
              <h2 className="mb-8 font-serif text-3xl">Mi primera comunion</h2>
              <div className="space-y-6">
                {data.locations.map((loc) => (
                  <LocationCard
                    key={`${loc.name}-${loc.time}`}
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ubicacion"
                    accentColor="#7f8d6e"
                    className="bg-[#fdfbf5]/94 text-[#3f4636] shadow-none"
                  />
                ))}
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#a88b4e]" />
            <h2 className="mb-7 font-serif text-3xl italic text-[#a88b4e]">Cada vez falta menos</h2>
            <div className="ap-modern-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#a88b4e" labelColor="#646b58" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#a88b4e]" />
              <h2 className="mb-4 font-serif text-3xl text-[#a88b4e]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#7f8d6e] bg-[#7f8d6e] text-white" lineClassName="bg-[#7f8d6e]/32" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-modern-card" iconClassName="bg-[#7f8d6e]/16 text-[#7f8d6e]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#a88b4e]" />
            <h2 className="mb-8 font-serif text-3xl text-[#a88b4e]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-t-full rounded-b-[1.2rem] border-4 border-white shadow-[0_18px_34px_rgba(63,70,54,0.16)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-modern-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#a88b4e]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia y oracion son mi verdadero regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#a88b4e" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Cross className="mx-auto mb-5 h-10 w-10 text-[#a88b4e]" />
            <h2 className="mb-6 font-serif text-3xl text-[#a88b4e]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20primera%20comunion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#7f8d6e] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la primera comunion de ${data.mainName}.`} bgColor="#7f8d6e" />
        </div>
      </div>
    </InvitationLayout>
  );
}
