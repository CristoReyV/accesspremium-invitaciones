import { useMemo, useState } from "react";
import { Cake, Camera, Gift, MapPinned, PartyPopper, Sparkles, Star } from "lucide-react";
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

import { DEMO_KAWAII_FRIENDS } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

function KawaiiDivider({ label }: { label: string }) {
  return (
    <div className="my-8 flex flex-col items-center text-[#ff4e96]">
      <Star className="h-9 w-9 fill-[#ffe566] text-[#ff8fc0] ap-kawaii-bounce" />
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.26em]">{label}</p>
    </div>
  );
}

export default function BirthdayKawaiiFriends() {
  const data = DEMO_KAWAII_FRIENDS;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "coquette-aesthetic");
  const [isOpened, setIsOpened] = useState(false);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Cumple de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#ff9ec4] px-6 text-center text-[#612048]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-white/10" />
          <div className="relative z-10 max-w-xs">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#ff4e96]">Happy birthday</p>
            <h1 className="ap-kawaii-title text-7xl leading-none text-white">{data.mainName}</h1>
            <div className="mx-auto mt-3 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#5db9ff] text-6xl font-black text-white shadow-[0_14px_0_#2b86cf] rotate-[-7deg]">
              9
            </div>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-9 inline-flex rounded-full bg-[#40aef3] px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_12px_0_#237dc0] transition hover:translate-y-0.5 active:translate-y-1"
              aria-label="Abrir invitacion"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#ff9ec4] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-kawaii-bg text-[#612048]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-xs">
              <h1 className="ap-kawaii-title text-6xl leading-none text-white drop-shadow-[0_6px_0_#ff4e96]">{data.mainName}</h1>
              <p className="mt-3 rounded-full bg-white/75 px-4 py-2 text-2xl font-black text-[#612048] shadow-[0_8px_0_rgba(255,78,150,0.16)]">Esta cumpliendo</p>
              <div className="mx-auto my-6 flex h-24 w-24 items-center justify-center rounded-[1.7rem] bg-[#5db9ff] text-6xl font-black text-white shadow-[0_12px_0_#2b86cf] rotate-[-7deg]">
                9
              </div>
              <p className="mx-auto max-w-[16rem] rounded-full bg-white/90 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#ff4e96] shadow-[0_10px_0_rgba(255,78,150,0.18)]">{eventDate}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-kawaii-card px-7 py-10">
              <PartyPopper className="mx-auto mb-5 h-11 w-11 text-[#ff4e96] ap-kawaii-bounce" />
              <p className="mx-auto max-w-xs text-lg font-bold leading-8">{data.customMessage}</p>
              <KawaiiDivider label={data.parents?.[0]?.role || "Mis papas"} />
              <p className="text-base font-black text-[#612048]">{data.parents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <KawaiiDivider label="Recepcion" />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver ubicacion"
                accentColor="#40aef3"
                className="ap-kawaii-card text-[#612048]"
              />
            ))}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-kawaii-card px-3 py-8">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#ff4e96]" />
              <h2 className="mb-6 ap-kawaii-title text-5xl text-[#ff4e96]">Cada vez falta menos</h2>
              <CountdownTimer targetDate={data.eventDate} accentColor="#ff4e96" labelColor="#612048" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Cake className="mx-auto mb-5 h-10 w-10 text-[#ff4e96]" />
              <h2 className="mb-3 ap-kawaii-title text-5xl text-white drop-shadow-[0_5px_0_#ff4e96]">Fiesta cute</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#40aef3] bg-[#40aef3] text-white" lineClassName="bg-white/70" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-kawaii-card" iconClassName="bg-[#ff4e96]/12 text-[#ff4e96]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#ff4e96]" />
            <h2 className="mb-8 ap-kawaii-title text-5xl text-white drop-shadow-[0_5px_0_#ff4e96]">Momentos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.5rem] border-4 border-white shadow-[0_16px_0_rgba(255,78,150,0.18)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-kawaii-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#ff4e96]" />
                <GiftRegistry items={data.giftRegistry} title="Tu presencia es suficiente" subtitle="Si deseas tener un detalle, puedes encontrar aqui una opcion especial." accentColor="#ff4e96" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#ff4e96]" />
            <h2 className="mb-7 ap-kawaii-title text-5xl text-white drop-shadow-[0_5px_0_#ff4e96]">Confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20cumple%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#40aef3] px-9 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_12px_0_#237dc0] transition hover:translate-y-0.5 active:translate-y-1"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al cumple de ${data.mainName}.`} bgColor="#40aef3" />
        </div>
      </div>
    </InvitationLayout>
  );
}
