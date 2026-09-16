import { useMemo, useState } from "react";
import { Baby, CalendarDays, Camera, Cloud, Gift, Sparkles, Upload } from "lucide-react";
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

import { DEMO_BABY_JIRAFA } from "@/data/demoInvitations";
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

export default function BabyShowerJirafaPastel() {
  const data = DEMO_BABY_JIRAFA;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "safari-animal-friends");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle="Baby Shower Jirafa Pastel">
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fff6fa] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-10 mt-28 w-full max-w-xs">
            <h1 className="font-serif text-5xl uppercase tracking-[0.04em] text-[#6f3d61]">Baby Shower</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-8 inline-flex rounded-full bg-[#b69a57] px-8 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_32px_rgba(111,61,97,0.18)] transition hover:scale-105 active:scale-95"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#fff6fa] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-giraffe-bg text-[#6f3d61]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-end justify-center overflow-hidden px-7 pb-24 pt-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-xs">
              <p className="font-serif text-4xl italic text-[#b69a57] ap-giraffe-float">Baby shower</p>
              <h1 className="mt-3 font-serif text-5xl uppercase tracking-[0.04em] text-[#6f3d61]">La espera esta por terminar</h1>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#9b8050]">
                {dateParts.day} de {dateParts.month} de {dateParts.year}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-giraffe-card px-7 py-10">
              <Cloud className="mx-auto mb-5 h-10 w-10 text-[#b69a57]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-[#b69a57]/45" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#9b8050]">{data.parents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-3xl italic text-[#6f3d61]">{data.parents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-giraffe-card px-5 py-10">
              {data.locations.map((loc) => (
                <LocationCard
                  key={`${loc.name}-${loc.time}`}
                  title={loc.type}
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#b69a57"
                  className="bg-white/84 text-[#6f3d61] shadow-none"
                />
              ))}
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#b69a57]" />
            <h2 className="mb-7 font-serif text-3xl text-[#6f3d61]">Cada vez falta menos</h2>
            <div className="ap-giraffe-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#6f3d61" labelColor="#9b8050" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#b69a57] ap-giraffe-float" />
              <h2 className="mb-4 font-serif text-3xl text-[#6f3d61]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#b69a57] bg-[#b69a57] text-white" lineClassName="bg-[#d6bf81]/35" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-giraffe-card" iconClassName="bg-[#e8c97a]/18 text-[#b69a57]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#b69a57]" />
            <h2 className="mb-8 font-serif text-3xl text-[#6f3d61]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.5rem] border-4 border-white shadow-[0_18px_34px_rgba(111,61,97,0.13)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#b69a57] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-semibold text-[#6f3d61]">Tu foto quedo lista para el album del baby shower.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-giraffe-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#b69a57]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es el mejor regalo. Si deseas tener un detalle para nuestro bebe, puedes hacerlo aqui." accentColor="#b69a57" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Baby className="mx-auto mb-5 h-10 w-10 text-[#b69a57]" />
            <h2 className="mb-6 font-serif text-3xl text-[#6f3d61]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20baby%20shower.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#6f3d61] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message="Hola, confirmo mi asistencia al baby shower." bgColor="#6f3d61" />
        </div>
      </div>
    </InvitationLayout>
  );
}
