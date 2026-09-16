import { useMemo, useState } from "react";
import { CalendarDays, Camera, Citrus, Gift, GlassWater, Heart, Sparkles, Upload } from "lucide-react";
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

import { DEMO_SUMMER_BRUNCH } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "short" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

export default function BirthdaySummerBrunch() {
  const data = DEMO_SUMMER_BRUNCH;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Cumple de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fffdf7] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-10 w-full max-w-xs">
            <p className="font-serif text-7xl italic leading-none text-[#f2a93b]">24</p>
            <h1 className="mt-2 font-serif text-5xl uppercase tracking-[0.14em] text-[#c7332f]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex rounded-full bg-[#e8758e] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_18px_34px_rgba(201,47,74,0.24)] transition hover:scale-105 active:scale-95"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#fffdf7] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-brunch-bg text-[#6d332b]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-sm">
              <p className="font-serif text-7xl italic leading-none text-[#f2a93b] ap-brunch-float">24</p>
              <h1 className="mt-2 font-serif text-5xl uppercase tracking-[0.16em] text-[#c7332f]">{data.mainName}</h1>
              <div className="mx-auto mt-7 flex w-fit items-center gap-3 border-y border-[#f2a93b]/45 px-5 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-[#d65d42]">{dateParts.weekday}</span>
                <span className="font-serif text-4xl text-[#c7332f]">{dateParts.day}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[#d65d42]">{dateParts.month}</span>
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-[#9d6e3a]">{data.eventTime}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-brunch-card px-7 py-10">
              <Citrus className="mx-auto mb-5 h-10 w-10 text-[#e87558]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-brunch-line px-5 py-10">
              {data.locations.map((loc) => (
                <LocationCard
                  key={`${loc.name}-${loc.time}`}
                  title={loc.type}
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#e87558"
                  className="bg-white/84 text-[#6d332b] shadow-none"
                />
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <GlassWater className="mx-auto mb-4 h-10 w-10 text-[#e87558] ap-brunch-float" />
              <h2 className="mb-4 font-serif text-3xl italic text-[#c7332f]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#e87558] bg-[#e87558] text-white" lineClassName="bg-[#f2a93b]/45" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-brunch-card" iconClassName="bg-[#f2a93b]/18 text-[#c7332f]" />
            </InvitationSection>
          )}

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-brunch-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#e87558]" />
                <GiftRegistry items={data.giftRegistry} title="Tu presencia es mi mejor regalo" subtitle="Pero si deseas obsequiar algo especial, puedes hacerlo con mucho carino." accentColor="#e87558" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#e87558]" />
            <h2 className="mb-7 font-serif text-4xl italic text-[#c7332f]">Cada vez falta menos</h2>
            <div className="ap-brunch-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#c7332f" labelColor="#9d6e3a" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#e87558]" />
            <h2 className="mb-8 font-serif text-3xl italic text-[#c7332f]">Momentos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.35rem] border-4 border-white shadow-[0_18px_34px_rgba(201,47,74,0.13)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e8758e] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-semibold text-[#c7332f]">Tu momento favorito quedo listo para compartir.</p>}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <Heart className="mx-auto mb-5 h-10 w-10 text-[#e87558]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#c7332f]">Te agradezco confirmar tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20cumple%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#c7332f] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al cumple de ${data.mainName}.`} bgColor="#c7332f" />
        </div>
      </div>
    </InvitationLayout>
  );
}
