import { useMemo, useState } from "react";
import { Award, Briefcase, CalendarDays, Camera, Gift, Mail, MapPinned, ShieldCheck, Sparkles, Upload } from "lucide-react";
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

import { DEMO_JUBILACION_EXECUTIVE } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const frameAsset = "/assets/templates/jubilacion/executive-prestige/executive-prestige-frame.svg";
const envelopeAsset = "/assets/templates/jubilacion/executive-prestige/executive-envelope.svg";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
  };
};

export default function JubilacionExecutivePrestige() {
  const data = DEMO_JUBILACION_EXECUTIVE;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Jubilacion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#07101f] px-6 text-center text-[#eef3f8]">
          <img src={envelopeAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08),rgba(5,7,11,0.22)_60%,rgba(5,7,11,0.34))]" />
          <div className="relative z-10 mt-64 w-full max-w-xs">
            <Briefcase className="mx-auto mb-5 h-12 w-12 text-[#dde4ed] ap-executive-float" />
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#aab6c7]">Homenaje ejecutivo</p>
            <h1 className="mt-4 font-serif text-5xl leading-none text-[#f8fbff]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#dde4ed]/55 bg-[#dde4ed] text-[#0a1324] shadow-[0_0_42px_rgba(221,228,237,0.3)] transition hover:scale-105 active:scale-95"
            >
              <Mail className="h-9 w-9" />
            </button>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#eef3f8]">Abrir invitacion</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#07101f] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-executive-bg text-[#eef3f8]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-12 text-center">
            <img src={frameAsset} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.03),rgba(5,7,11,0.18)_60%,rgba(5,7,11,0.32))]" />
            <div className="relative z-10 w-full max-w-sm pt-24">
              <div className="ap-executive-panel px-7 py-10">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#aab6c7]">{data.parents?.[0]?.name}</p>
                <h1 className="mt-5 font-serif text-5xl leading-none text-[#f8fbff]">{data.mainName}</h1>
                <p className="mx-auto mt-5 max-w-xs text-xs font-bold uppercase tracking-[0.18em] text-[#dde4ed]">
                  {dateParts.day} de {dateParts.month} de {dateParts.year}
                </p>
              </div>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-executive-card px-7 py-10">
              <Award className="mx-auto mb-5 h-11 w-11 text-[#dde4ed] ap-executive-float" />
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#aab6c7]">Reconocimiento a una trayectoria</p>
              <p className="mx-auto max-w-xs font-serif text-xl italic leading-9 text-[#f8fbff]">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#dde4ed]" />
            <p className="mx-auto mb-7 max-w-xs text-xs font-bold uppercase tracking-[0.2em] text-[#aab6c7]">Cuenta regresiva institucional</p>
            <div className="ap-executive-panel px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#dde4ed" labelColor="rgba(238,243,248,0.72)" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#dde4ed]" />
            {data.locations.map((loc) => (
              <LocationCard
                key={`${loc.name}-${loc.time}`}
                title={loc.type}
                name={loc.name}
                address={loc.address}
                mapUrl={loc.mapsUrl}
                time={loc.time}
                buttonLabel="Ver ubicacion"
                accentColor="#dde4ed"
                className="ap-executive-card text-[#eef3f8]"
              />
            ))}
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-[#dde4ed]" />
              <h2 className="mb-6 font-serif text-3xl text-[#f8fbff]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#dde4ed] bg-[#dde4ed] text-[#0a1324]" lineClassName="bg-[#dde4ed]/28" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-executive-card text-[#eef3f8]" iconClassName="bg-[#dde4ed]/14 text-[#dde4ed]" colorsContainerClassName="text-[#eef3f8]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#dde4ed]" />
            <h2 className="mb-8 font-serif text-3xl text-[#f8fbff]">Momentos de trayectoria</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-none border-[7px] border-[#101c31] shadow-[0_22px_46px_rgba(0,0,0,0.48)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-none border border-[#dde4ed] bg-[#dde4ed] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0a1324] shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir recuerdo
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#dde4ed]">Tu recuerdo quedo listo para el homenaje.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-executive-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#dde4ed]" />
                <GiftRegistry items={data.giftRegistry} title="Detalle de aprecio" subtitle="Tu presencia es fundamental. Si deseas tener un detalle de reconocimiento, puedes hacerlo aqui." accentColor="#dde4ed" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Sparkles className="mx-auto mb-5 h-10 w-10 text-[#dde4ed] ap-executive-float" />
            <h2 className="mb-6 font-serif text-3xl text-[#f8fbff]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20jubilacion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-none border border-[#dde4ed] bg-[#f8fbff] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#0a1324] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la jubilacion de ${data.mainName}.`} bgColor="#dde4ed" textColor="#0a1324" />
        </div>
      </div>
    </InvitationLayout>
  );
}
