import { useMemo, useState } from "react";
import { Baby, Camera, Cloud, Gift, Leaf, MapPinned, Music, Sprout } from "lucide-react";
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

import { DEMO_BABY_SELVA } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

function AnimalSeparator({ label }: { label: string }) {
  return (
    <div className="my-9 flex flex-col items-center text-[#59652f]">
      <Leaf className="h-8 w-8 ap-baby-float" />
      <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em]">{label}</span>
    </div>
  );
}

export default function BabyShowerSelva() {
  const data = DEMO_BABY_SELVA;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "safari-animal-friends");
  const [isOpened, setIsOpened] = useState(false);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Baby Shower - ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#c8dcbc] px-6 text-center">
          <div className="absolute inset-0 ap-baby-bg" />
          <Cloud className="absolute left-8 top-16 h-16 w-16 text-white/40 ap-baby-float" />
          <Leaf className="absolute bottom-20 right-8 h-20 w-20 text-[#59652f]/20 ap-baby-float" />

          <div className="relative z-10 flex aspect-square w-full max-w-sm flex-col items-center justify-center rounded-full bg-[#fff8e9]/82 p-8 shadow-[0_26px_64px_rgba(78,91,45,0.2)]">
            <img
              src={data.heroPhoto}
              alt="Animalitos safari"
              className="mb-2 w-64 max-w-full drop-shadow-xl ap-baby-float"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#59652f]">
              Baby
            </p>
            <h1 className="ap-baby-script -mt-3 text-7xl leading-none text-[#58622d]">
              Shower
            </h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mt-5 rounded-full bg-[#59652f] px-8 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[#fff8e9] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Abrir invitación
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#8fb98a] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-baby-bg text-[#423528]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center px-7 py-16 text-center">
            <div className="relative z-10 ap-baby-ticket w-full max-w-[22rem] px-7 py-14">
              <img
                src={data.heroPhoto}
                alt="Animalitos safari"
                className="mx-auto mb-3 w-72 drop-shadow-xl ap-baby-float"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#59652f]">
                Baby
              </p>
              <h1 className="ap-baby-script -mt-4 text-7xl leading-none text-[#58622d]">
                Shower
              </h1>
              <h2 className="mt-8 font-serif text-2xl uppercase tracking-[0.14em] text-[#4c5428]">
                {data.mainName}
              </h2>
              <div className="mx-auto my-7 h-px w-40 bg-[#7f8d47]/40" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b603e]">{eventDate}</p>
              <p className="mt-2 text-sm font-semibold text-[#59652f]">{data.eventTime}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-baby-ticket px-8 py-14">
              <Baby className="mx-auto mb-5 h-10 w-10 text-[#59652f]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#4a3728]">
                {data.customMessage}
              </p>
              <AnimalSeparator label="Mis papás" />
              <p className="ap-baby-script text-5xl leading-none text-[#59652f]">
                {data.parents?.[0]?.name}
              </p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-baby-card rounded-[2rem] px-5 py-9">
              <Sprout className="mx-auto mb-4 h-10 w-10 text-[#59652f]" />
              <h2 className="mb-7 font-serif text-3xl text-[#4c5428]">Cada vez falta menos</h2>
              <CountdownTimer targetDate={data.eventDate} accentColor="#59652f" labelColor="#7b603e" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <AnimalSeparator label="Recepción" />
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
                  accentColor="#59652f"
                  className="bg-[#fff8e9]/92 text-[#423528]"
                />
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-baby-ticket px-5 py-12">
                <Music className="mx-auto mb-4 h-9 w-9 text-[#59652f]" />
                <h2 className="mb-3 font-serif text-3xl text-[#4c5428]">Programa</h2>
                <Itinerary
                  items={data.itinerary}
                  itemClassName="border-[#59652f] bg-[#59652f] text-[#fff8e9]"
                  lineClassName="bg-[#59652f]/35"
                />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="space-y-8">
              {data.dressCode && (
                <DressCode
                  dressCode={data.dressCode}
                  className="ap-baby-card rounded-[2rem] p-7"
                  iconClassName="bg-[#59652f]/12 text-[#59652f]"
                />
              )}

              {data.giftRegistry && (
                <div className="ap-baby-card rounded-[2rem] px-5 py-9">
                  <Gift className="mx-auto mb-4 h-9 w-9 text-[#59652f]" />
                  <GiftRegistry
                    items={data.giftRegistry}
                    title="Mesa de regalos"
                    subtitle="Tu presencia es nuestro mejor regalo. Si deseas tener un detalle, puedes hacerlo aquí."
                    accentColor="#59652f"
                  />
                </div>
              )}
            </div>
          </InvitationSection>

          {data.photos.length > 0 && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Camera className="mx-auto mb-4 h-9 w-9 text-[#59652f]" />
              <h2 className="ap-baby-script mb-8 text-6xl text-[#59652f]">Dulce espera</h2>
              <PhotoGallery
                photos={data.photos}
                className="grid-cols-2"
                imageClassName="rounded-[1.4rem] border-4 border-[#fff8e9] shadow-[0_16px_30px_rgba(78,91,45,0.18)]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="ap-baby-ticket px-8 py-14">
              <MapPinned className="mx-auto mb-4 h-10 w-10 text-[#59652f]" />
              <h2 className="mb-5 font-serif text-3xl text-[#4c5428]">Confirma tu asistencia</h2>
              <p className="mx-auto mb-8 max-w-xs text-sm leading-6 text-[#6d5b45]">
                Un nuevo capítulo está por comenzar y queremos celebrarlo contigo.
              </p>
              <a
                href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20al%20Baby%20Shower%20de%20${encodeURIComponent(data.mainName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#59652f] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#fff8e9] shadow-lg transition hover:scale-105 active:scale-95"
              >
                Confirmar
              </a>
            </div>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia al Baby Shower de ${data.mainName}.`}
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
