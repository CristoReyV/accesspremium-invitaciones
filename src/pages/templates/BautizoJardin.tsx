import { useMemo, useState } from "react";
import { CalendarDays, Church, Cross, Flower2, Gift, HandHeart, MapPinned, Sparkles } from "lucide-react";
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

import { DEMO_BAUTIZO_JARDIN } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export default function BautizoJardin() {
  const data = DEMO_BAUTIZO_JARDIN;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Bautizo de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fbfaf4] px-6 text-center">
          <div className="absolute inset-0 ap-baptism-bg" />
          <img
            src={data.heroPhoto}
            alt="Flores de bautizo"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="relative z-10 w-full max-w-sm">
            <p className="mb-6 font-serif text-4xl uppercase tracking-[0.16em] text-[#9b7b3e]">
              Mi Bautizo
            </p>
            <p className="mb-8 font-serif text-2xl uppercase tracking-[0.22em] text-[#806636]">
              {data.mainName}
            </p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="group mx-auto block w-full max-w-[18rem] rounded-2xl ap-baptism-envelope px-8 py-16 transition hover:-translate-y-1 active:translate-y-0"
            >
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#b9914f] text-[#fffaf0] shadow-lg transition group-hover:scale-105">
                <Cross className="h-10 w-10" />
              </span>
            </button>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[#9b7b3e]">
              Haz click para abrir
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#e8decc] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-baptism-bg text-[#4d4737]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img
              src={data.heroPhoto}
              alt="Marco floral de bautizo"
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />
            <div className="relative z-10 mx-auto max-w-xs pt-20">
              <Cross className="mx-auto mb-6 h-11 w-11 text-[#b9914f] ap-baptism-float" />
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#7f8f67]">
                Acompáñanos a celebrar el
              </p>
              <h1 className="font-serif text-5xl uppercase tracking-[0.16em] text-[#9b7b3e]">
                Bautizo
              </h1>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#7a715d]">de nuestro hijo</p>
              <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] text-[#7e6734]">
                {data.mainName}
              </h2>
              <div className="mx-auto my-8 h-px w-40 bg-[#b9914f]/35" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a715d]">{eventDate}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-baptism-card rounded-[2rem] px-7 py-10">
              <HandHeart className="mx-auto mb-5 h-10 w-10 text-[#b9914f]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#56503f]">
                {data.customMessage}
              </p>
              <div className="mx-auto my-10 h-px w-28 bg-[#b9914f]/40" />
              <p className="mb-3 text-xs uppercase tracking-[0.26em] text-[#9b7b3e]">
                Con la bendición de Dios y de mis
              </p>
              <h2 className="font-serif text-3xl uppercase tracking-[0.12em] text-[#9b7b3e]">Padres</h2>
              <p className="mt-3 text-sm leading-6 text-[#56503f]">{data.parents?.[0]?.name}</p>
              <h2 className="mt-8 font-serif text-3xl uppercase tracking-[0.12em] text-[#9b7b3e]">Padrinos</h2>
              <p className="mt-3 text-sm leading-6 text-[#56503f]">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#b9914f]" />
            <h2 className="mb-7 font-serif text-3xl text-[#9b7b3e]">Cada vez falta menos</h2>
            <div className="ap-baptism-card rounded-[2rem] px-4 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#b9914f" labelColor="#7a715d" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-baptism-arch px-6 pb-10 pt-14">
              <Church className="mx-auto mb-5 h-11 w-11" />
              <h2 className="mb-8 font-serif text-3xl">Ceremonia y recepción</h2>
              <div className="space-y-6">
                {data.locations.map((loc) => (
                  <LocationCard
                    key={`${loc.name}-${loc.time}`}
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicación"
                    accentColor="#7f6a37"
                    className="bg-[#fffaf0]/92 text-[#4d4737] shadow-none"
                  />
                ))}
              </div>

              {data.dressCode && (
                <DressCode
                  dressCode={data.dressCode}
                  className="mt-8 bg-[#fffaf0]/12 text-[#fffaf0]"
                  iconClassName="bg-[#fffaf0]/18 text-[#fffaf0]"
                />
              )}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-baptism-card rounded-[2rem] px-5 py-9">
                <Sparkles className="mx-auto mb-4 h-9 w-9 text-[#b9914f]" />
                <h2 className="mb-4 font-serif text-3xl text-[#9b7b3e]">Itinerario</h2>
                <Itinerary
                  items={data.itinerary}
                  itemClassName="border-[#b9914f] bg-[#b9914f] text-white"
                  lineClassName="bg-[#b9914f]/35"
                />
              </div>
            </InvitationSection>
          )}

          {data.photos.length > 0 && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Flower2 className="mx-auto mb-4 h-10 w-10 text-[#9b7b3e]" />
              <h2 className="mb-8 font-serif text-3xl text-[#9b7b3e]">Mi Bautizo</h2>
              <PhotoGallery
                photos={data.photos}
                className="grid-cols-2"
                imageClassName="rounded-t-full rounded-b-[1.5rem] border-4 border-white shadow-[0_16px_34px_rgba(96,80,42,0.16)]"
              />
            </InvitationSection>
          )}

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-baptism-card rounded-[2rem] px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#b9914f]" />
                <GiftRegistry
                  items={data.giftRegistry}
                  title="Mesa de regalos"
                  subtitle="Tu presencia y oración son el regalo más importante. Si deseas tener un detalle, puedes hacerlo aquí."
                  accentColor="#b9914f"
                />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#b9914f]" />
            <h2 className="mb-6 font-serif text-3xl text-[#9b7b3e]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20bautizo%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-[#b9914f] bg-[#fffaf0] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b3e] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia al bautizo de ${data.mainName}.`}
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
