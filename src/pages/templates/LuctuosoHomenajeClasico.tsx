import { useMemo, useState } from "react";
import { CalendarDays, Church, Flower2, Heart, MapPinned, Moon, Ribbon, Upload } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import DressCode from "@/components/invitations/ui/DressCode";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";
import Itinerary from "@/components/invitations/ui/Itinerary";
import LocationCard from "@/components/invitations/LocationCard";
import MusicButton from "@/components/invitations/ui/MusicButton";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";

import { DEMO_LUCTUOSO_HOMENAJE } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const memorialFrame = "/assets/templates/luctuoso/homenaje-clasico/memorial-classic-frame.svg";
const candleCard = "/assets/templates/luctuoso/homenaje-clasico/memorial-candle-card.svg";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

function SplitName({ name }: { name: string }) {
  const [firstName, ...rest] = name.split(" ");

  return (
    <h1 aria-label={name} className="font-serif text-6xl leading-none text-[#282522]">
      <span aria-hidden="true" className="block">{firstName}</span>
      {rest.length > 0 && <span aria-hidden="true" className="block italic">{rest.join(" ")}</span>}
    </h1>
  );
}

export default function LuctuosoHomenajeClasico() {
  const data = DEMO_LUCTUOSO_HOMENAJE;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "religious-classic");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`En memoria de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fbfaf5] px-6 text-center text-[#282522]">
          <img src={memorialFrame} alt="" className="absolute inset-0 h-full w-full object-contain opacity-95 drop-shadow-[0_24px_70px_rgba(74,65,50,0.18)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.34)_58%,rgba(255,255,255,0.48))]" />
          <div className="relative z-10 mt-36 w-full max-w-xs sm:mt-44">
            <Ribbon className="mx-auto mb-5 h-14 w-14 text-[#282522] ap-memorial-ribbon" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[#9a7d2f]">En memoria de</p>
            <SplitName name={data.mainName} />
            <p className="mt-4 font-serif text-3xl text-[#9a7d2f]">1950 - 2025</p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#282522] text-white shadow-[0_18px_40px_rgba(40,37,34,0.22)] transition hover:scale-105 active:scale-95"
            >
              <Flower2 className="h-9 w-9" />
            </button>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#6f6251]">Abrir homenaje</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#f3ede2] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-memorial-bg text-[#282522]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-start justify-center overflow-hidden px-7 py-10 text-center">
            <img src={memorialFrame} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 w-full max-w-sm pt-[30rem]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a7d2f]">En memoria de</p>
              <SplitName name={data.mainName} />
              <p className="mt-4 font-serif text-3xl text-[#9a7d2f]">1950 - 2025</p>
              <div className="mx-auto my-8 h-px w-44 bg-[#b8a066]/70" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#282522]">
                {data.locations[0]?.name}
              </p>
              <p className="mt-3 font-serif text-2xl text-[#9a7d2f]">{data.locations[0]?.time} horas</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-memorial-card px-7 py-10">
              <Heart className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f] ap-memorial-glow" />
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#9a7d2f]">
                {data.parents?.[0]?.role}
              </p>
              <p className="font-serif text-3xl italic text-[#282522]">{data.parents?.[0]?.name}</p>
              <p className="mx-auto mt-8 max-w-xs text-base leading-8 text-[#5a5249]">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-memorial-photo-card overflow-hidden px-5 pb-9 pt-5">
              <img src={candleCard} alt="" className="h-[24rem] w-full rounded-[1.5rem] object-cover shadow-[0_22px_42px_rgba(74,65,50,0.14)]" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7d2f]">Con fe y esperanza</p>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[#5a5249]">
                Acompananos en oracion para despedir con amor a nuestro ser querido.
              </p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <CalendarDays className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6f6251]">{dateParts.weekday}</p>
            <p className="mt-2 font-serif text-6xl leading-none text-[#9a7d2f]">{dateParts.day}</p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f6251]">{dateParts.month} {dateParts.year}</p>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-memorial-card px-3 py-7">
              <Church className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f]" />
              {data.locations.map((loc) => (
                <LocationCard
                  key={`${loc.name}-${loc.time}`}
                  title={loc.type}
                  name={loc.name}
                  address={loc.address}
                  mapUrl={loc.mapsUrl}
                  time={loc.time}
                  buttonLabel="Ver ubicacion"
                  accentColor="#9a7d2f"
                  className="bg-transparent text-[#282522] shadow-none"
                />
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Moon className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f]" />
              <h2 className="mb-5 font-serif text-3xl italic text-[#282522]">Acompanamiento</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#9a7d2f] bg-[#9a7d2f] text-white" lineClassName="bg-[#9a7d2f]/30" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-memorial-card" iconClassName="bg-[#9a7d2f]/12 text-[#9a7d2f]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Flower2 className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f] ap-memorial-glow" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#282522]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.25rem] border-4 border-white shadow-[0_18px_34px_rgba(74,65,50,0.14)] grayscale" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#282522] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Compartir recuerdo
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#6f6251]">Tu recuerdo quedo reservado para la familia.</p>}
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#9a7d2f]" />
            <h2 className="mb-6 font-serif text-3xl italic text-[#282522]">Confirmar acompanamiento</h2>
            <p className="mx-auto mb-8 max-w-xs text-sm leading-7 text-[#5a5249]">
              Agradecemos confirmar tu presencia para acompanarnos en este momento de fe y despedida.
            </p>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20acompanamiento%20al%20homenaje%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#9a7d2f] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi acompanamiento al homenaje de ${data.mainName}.`} bgColor="#282522" />
        </div>
      </div>
    </InvitationLayout>
  );
}
