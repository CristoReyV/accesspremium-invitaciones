import { useMemo, useState } from "react";
import { Award, CalendarDays, Camera, Flower2, Gift, Leaf, Mail, MapPinned, Sparkles } from "lucide-react";
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

import { DEMO_JUBILACION_GOLDEN_BLOOMS } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const envelopeAsset = "/assets/templates/jubilacion/golden-blooms/golden-blooms-envelope.svg";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
  };
};

export default function JubilacionGoldenBlooms() {
  const data = DEMO_JUBILACION_GOLDEN_BLOOMS;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Jubilacion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fffdf8] px-6 text-center text-[#7d642b]">
          <img src={envelopeAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="relative z-10 mt-72 max-w-xs">
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#b8923e] text-white shadow-[0_18px_36px_rgba(184,146,62,0.24)] transition hover:scale-105 active:scale-95"
            >
              <Mail className="h-8 w-8" />
            </button>
            <p className="mt-6 font-serif text-xl uppercase tracking-[0.16em]">Haz click para abrir</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#eee9e2] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-jubilee-bg text-[#4d493d]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-12 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-sm pt-16">
              <h1 className="font-serif text-6xl leading-none text-[#8b7330] drop-shadow-[0_8px_0_rgba(255,255,255,0.62)]">{data.mainName}</h1>
              <button
                type="button"
                className="mx-auto mt-16 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#b8923e] text-white shadow-[0_12px_28px_rgba(184,146,62,0.24)]"
                aria-label="Musica decorativa"
              >
                <Sparkles className="h-5 w-5" />
              </button>
              <p className="mt-14 text-xs uppercase tracking-[0.18em] text-[#8b7330]">{dateParts.day} de {dateParts.month} de {dateParts.year}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-jubilee-card px-7 py-10">
              <Award className="mx-auto mb-5 h-10 w-10 text-[#b8923e] ap-jubilee-float" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b7330]">{data.parents?.[0]?.name}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8b7330]">Te invitamos a celebrar</p>
              <h2 className="mt-3 font-serif text-4xl italic text-[#4d493d]">La jubilacion de la Dra. {data.mainName}</h2>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#b8923e]" />
            <p className="mx-auto mb-7 max-w-xs text-xs font-bold uppercase tracking-[0.16em] text-[#8b7330]">La cuenta regresiva ha comenzado</p>
            <div className="ap-jubilee-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#b8923e" labelColor="#7d642b" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <Flower2 className="mx-auto mb-5 h-12 w-12 text-[#f2aabd] ap-jubilee-float" />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver ubicacion"
                accentColor="#b8923e"
                className="bg-transparent text-[#4d493d] shadow-none"
              />
            ))}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <Leaf className="mx-auto mb-5 h-10 w-10 text-[#7f916f]" />
            <p className="mx-auto max-w-xs text-xs font-bold uppercase leading-6 tracking-[0.12em] text-[#8b7330]">{data.customMessage}</p>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <h2 className="mb-6 font-serif text-3xl italic text-[#8b7330]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#b8923e] bg-[#b8923e] text-white" lineClassName="bg-[#b8923e]/30" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-jubilee-card" iconClassName="bg-[#b8923e]/14 text-[#b8923e]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#b8923e]" />
            <h2 className="mb-8 font-serif text-3xl italic text-[#8b7330]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.5rem] border-4 border-white shadow-[0_18px_36px_rgba(184,146,62,0.13)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-jubilee-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#b8923e]" />
                <GiftRegistry items={data.giftRegistry} title="Detalle de aprecio" subtitle="Tu presencia es fundamental. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#b8923e" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#b8923e]" />
            <h2 className="mb-6 font-serif text-3xl text-[#8b7330]">Favor de confirmar tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20jubilacion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-none bg-[#8b7330] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la jubilacion de ${data.mainName}.`} bgColor="#8b7330" />
        </div>
      </div>
    </InvitationLayout>
  );
}
