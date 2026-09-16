import { useMemo, useState } from "react";
import { Baby, CalendarDays, Footprints, Heart, MapPinned, Tags, Vote } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import DressCode from "@/components/invitations/ui/DressCode";
import Itinerary from "@/components/invitations/ui/Itinerary";
import LocationCard from "@/components/invitations/LocationCard";
import MusicButton from "@/components/invitations/ui/MusicButton";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";

import { DEMO_REVELACION_TEDDY } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

export default function RevelacionTeddy() {
  const data = DEMO_REVELACION_TEDDY;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "boho-natural");
  const [isOpened, setIsOpened] = useState(false);
  const [team, setTeam] = useState<"niña" | "niño" | null>(null);
  const eventDate = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle="Revelación Teddy Boho">
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f8efe0] px-6 text-center">
          <div className="absolute inset-0 ap-reveal-bg" />
          <div className="relative z-10 w-full max-w-sm">
            <img
              src={data.heroPhoto}
              alt="Collage teddy boho"
              className="mx-auto mb-6 w-full rounded-[2rem] shadow-[0_26px_60px_rgba(122,83,45,0.2)] ap-reveal-float"
            />
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="rounded-full bg-[#bd8b5d] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fff8ed] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Abrir revelación
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#d9c1a2] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-reveal-bg text-[#6f5134]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img
              src={data.heroPhoto}
              alt="Collage teddy boho"
              className="relative z-10 mx-auto mb-3 w-full max-w-sm rounded-[2rem] shadow-[0_26px_58px_rgba(122,83,45,0.18)] ap-reveal-float"
            />
            <div className="relative z-20 -mt-10 rounded-[2rem] bg-[#fff8ed]/88 px-7 py-8 shadow-[0_18px_36px_rgba(122,83,45,0.14)] backdrop-blur">
              <p className="mb-1 text-xs uppercase tracking-[0.24em] text-[#bd8b5d]">Mi revelación de género</p>
              <h1 className="font-serif text-5xl leading-tight text-[#8f633d]">{data.mainName}</h1>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#a0774f]">
                {eventDate}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-reveal-card rounded-[2rem] px-7 py-10">
              <Footprints className="mx-auto mb-5 h-10 w-10 text-[#bd8b5d]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#7b5a3b]">
                {data.customMessage}
              </p>
              <div className="mx-auto my-9 h-px w-32 bg-[#bd8b5d]/35" />
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#bd8b5d]">Mis padres</p>
              <p className="text-sm leading-6 text-[#6f5134]">{data.parents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTeam("niña")}
                className={`rounded-[1.5rem] border px-4 py-7 text-center shadow-lg transition hover:-translate-y-1 ${
                  team === "niña"
                    ? "border-[#d989a8] bg-[#ffdce8] text-[#934f68]"
                    : "border-[#d989a8]/40 bg-white/70 text-[#934f68]"
                }`}
              >
                <Baby className="mx-auto mb-3 h-8 w-8" />
                <span className="block text-xs font-bold uppercase tracking-[0.2em]">Team Niña</span>
              </button>
              <button
                type="button"
                onClick={() => setTeam("niño")}
                className={`rounded-[1.5rem] border px-4 py-7 text-center shadow-lg transition hover:-translate-y-1 ${
                  team === "niño"
                    ? "border-[#7da8c7] bg-[#dcefff] text-[#416b88]"
                    : "border-[#7da8c7]/40 bg-white/70 text-[#416b88]"
                }`}
              >
                <Baby className="mx-auto mb-3 h-8 w-8" />
                <span className="block text-xs font-bold uppercase tracking-[0.2em]">Team Niño</span>
              </button>
            </div>
            <p className="mt-5 text-sm font-medium text-[#8f633d]">
              {team ? `Elegiste Team ${team}.` : "Elige tu team antes de la gran sorpresa."}
            </p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-reveal-card rounded-[2rem] px-5 py-9">
              <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#bd8b5d]" />
              <h2 className="mb-7 font-serif text-3xl text-[#8f633d]">Cada vez falta menos</h2>
              <CountdownTimer targetDate={data.eventDate} accentColor="#bd8b5d" labelColor="#8f633d" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
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
                  accentColor="#bd8b5d"
                  className="bg-[#fff8ed]/90 text-[#6f5134]"
                />
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-reveal-card rounded-[2rem] px-5 py-9">
                <Tags className="mx-auto mb-4 h-10 w-10 text-[#bd8b5d]" />
                <h2 className="mb-4 font-serif text-3xl text-[#8f633d]">Programa</h2>
                <Itinerary
                  items={data.itinerary}
                  itemClassName="border-[#bd8b5d] bg-[#bd8b5d] text-[#fff8ed]"
                  lineClassName="bg-[#bd8b5d]/35"
                />
              </div>
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode
                dressCode={data.dressCode}
                className="ap-reveal-card rounded-[2rem] p-7"
                iconClassName="bg-[#bd8b5d]/12 text-[#bd8b5d]"
              />
            </InvitationSection>
          )}

          {data.photos.length > 0 && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Heart className="mx-auto mb-4 h-10 w-10 text-[#bd8b5d]" />
              <h2 className="mb-8 font-serif text-3xl text-[#8f633d]">Nuestro momento</h2>
              <PhotoGallery
                photos={data.photos}
                className="grid-cols-2"
                imageClassName="rounded-[1.4rem] border-4 border-[#fff8ed] shadow-[0_16px_30px_rgba(122,83,45,0.16)]"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="ap-reveal-card rounded-[2rem] px-7 py-10">
              <Vote className="mx-auto mb-5 h-10 w-10 text-[#bd8b5d]" />
              <h2 className="mb-5 font-serif text-3xl text-[#8f633d]">Confirma tu asistencia</h2>
              <p className="mx-auto mb-8 max-w-xs text-sm leading-6 text-[#7b5a3b]">
                Queremos vivir la sorpresa contigo. Avísanos si podrás acompañarnos.
              </p>
              <a
                href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20revelación%20de%20género.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#bd8b5d] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fff8ed] shadow-lg transition hover:scale-105 active:scale-95"
              >
                Confirmar
              </a>
            </div>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message="Hola, confirmo mi asistencia a la revelación de género."
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
