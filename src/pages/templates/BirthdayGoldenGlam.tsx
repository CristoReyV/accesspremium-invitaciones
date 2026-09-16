import { useMemo, useState } from "react";
import { CalendarDays, Camera, Gift, GlassWater, MapPinned, Music2, PartyPopper, Sparkles } from "lucide-react";
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

import { DEMO_CUMPLE_GOLDEN_GLAM } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "2-digit" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
  };
};

export default function BirthdayGoldenGlam() {
  const data = DEMO_CUMPLE_GOLDEN_GLAM;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Cumple de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f3efe6] px-6 text-center text-[#4b3a20]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative z-10 max-w-xs">
            <p className="ap-glam-age mb-3 font-serif text-[8rem] leading-none">30</p>
            <h1 className="font-serif text-6xl italic text-[#7a5b24]">{data.mainName}</h1>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-[#9c7a38]">Mi cumpleanos</p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#b99034] text-white shadow-[0_18px_34px_rgba(185,144,52,0.3)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <PartyPopper className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#d9d4cb] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-glam-bg text-[#4b3a20]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 max-w-xs">
              <p className="ap-glam-age font-serif text-[9rem] leading-none">30</p>
              <h1 className="-mt-4 font-serif text-6xl italic text-[#7a5b24]">{data.mainName}</h1>
              <div className="mx-auto my-5 h-px w-48 bg-gradient-to-r from-transparent via-[#b99034] to-transparent" />
              <p className="font-serif text-3xl text-[#6f5a32]">Mi cumpleanos</p>
              <p className="mt-5 text-sm uppercase tracking-[0.26em] text-[#7d6b49]">{dateParts.day}.{dateParts.month}.{dateParts.year}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-glam-polaroid mx-auto max-w-xs rotate-[-3deg]">
              <img src={data.photos[0]} alt={data.mainName} className="aspect-[4/4.8] w-full object-cover" />
              <p className="pt-3 font-serif text-lg italic text-[#7a5b24]">Cada vez falta menos</p>
            </div>
            <div className="ap-glam-card mx-auto mt-8 px-3 py-7">
              <CountdownTimer targetDate={data.eventDate} accentColor="#b99034" labelColor="#7d6b49" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <Sparkles className="mx-auto mb-6 h-12 w-12 text-[#b99034] ap-glam-pop" />
            <p className="mx-auto max-w-xs text-sm uppercase tracking-[0.2em] text-[#9c7a38]">Te invito a celebrar mis</p>
            <h2 className="ap-glam-age my-3 font-serif text-6xl leading-none">30</h2>
            <p className="mx-auto max-w-xs font-serif text-xl leading-8 text-[#665235]">{data.customMessage}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-8 font-serif text-4xl text-[#9c7a38]">Los detalles</h2>
            {data.locations.map((loc) => (
              <div key={`${loc.name}-${loc.time}`} className="ap-glam-card px-4 py-8">
                <GlassWater className="mx-auto mb-5 h-10 w-10 text-[#b99034]" />
                <LocationCard
                  title="Recepcion"
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#b99034"
                  className="bg-transparent text-[#4b3a20] shadow-none"
                />
              </div>
            ))}
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Music2 className="mx-auto mb-5 h-10 w-10 text-[#b99034]" />
              <h2 className="mb-2 font-serif text-4xl text-[#9c7a38]">Brindis y fiesta</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#b99034] bg-[#b99034] text-white" lineClassName="bg-[#b99034]/40" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-glam-card" iconClassName="bg-[#5b4031] text-[#f9f4eb]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#b99034]" />
            <h2 className="mb-8 font-serif text-4xl text-[#9c7a38]">Momentos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[0.85rem] border-4 border-white shadow-[0_18px_36px_rgba(75,58,32,0.16)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-glam-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#b99034]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia es mi verdadero regalo. Si deseas tener un detalle, te lo agradezco de corazon." accentColor="#b99034" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#b99034]" />
            <h2 className="mb-7 font-serif text-4xl text-[#9c7a38]">Favor de confirmar</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20cumple%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#b99034] px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_34px_rgba(185,144,52,0.24)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia al cumple de ${data.mainName}.`} bgColor="#b99034" />
        </div>
      </div>
    </InvitationLayout>
  );
}
