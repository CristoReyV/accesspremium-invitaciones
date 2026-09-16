import { useMemo, useState } from "react";
import { CalendarDays, Camera, Church, Flower2, Gift, GlassWater, Heart, Leaf, MapPinned, Moon, Sparkles, Upload, WandSparkles } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import InvitationSection from "@/components/invitations/layout/InvitationSection";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import ParentsAndGodparents from "@/components/invitations/ui/ParentsAndGodparents";
import DressCode from "@/components/invitations/ui/DressCode";
import GiftRegistry from "@/components/invitations/GiftRegistry";
import Itinerary from "@/components/invitations/ui/Itinerary";
import LocationCard from "@/components/invitations/LocationCard";
import MusicButton from "@/components/invitations/ui/MusicButton";
import PhotoGallery from "@/components/invitations/ui/PhotoGallery";
import FloatingRSVP from "@/components/invitations/FloatingRSVP";

import { DEMO_XV_BOSQUE } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const gateAsset = "/assets/templates/xv-anos/bosque-encantado/enchanted-forest-gate.svg";
const lakeAsset = "/assets/templates/xv-anos/bosque-encantado/enchanted-forest-lake.svg";

const fireflies = [
  { left: "10%", top: "18%", delay: "0s" },
  { left: "76%", top: "15%", delay: ".7s" },
  { left: "18%", top: "38%", delay: "1.2s" },
  { left: "84%", top: "44%", delay: ".3s" },
  { left: "28%", top: "68%", delay: "1.7s" },
  { left: "64%", top: "78%", delay: ".9s" },
  { left: "48%", top: "54%", delay: "2.1s" },
  { left: "36%", top: "25%", delay: "1.4s" },
];

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

function ForestFireflies() {
  return (
    <>
      {fireflies.map((fly, index) => (
        <span
          key={index}
          className="ap-forest-firefly"
          style={{ left: fly.left, top: fly.top, animationDelay: fly.delay }}
        />
      ))}
    </>
  );
}

function SplitName({ name }: { name: string }) {
  const [firstName, ...rest] = name.split(" ");

  return (
    <h1 className="font-serif text-6xl leading-[0.9] text-[#fff4cf] drop-shadow-[0_10px_26px_rgba(3,13,10,0.9)]">
      <span className="block">{firstName}</span>
      {rest.length > 0 && <span className="block italic text-[#f5d98c]">{rest.join(" ")}</span>}
    </h1>
  );
}

export default function XvBosqueEncantado() {
  const data = DEMO_XV_BOSQUE;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const [shared, setShared] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Mis XV de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#071c17] px-6 text-center text-[#fff4cf]">
          <img src={gateAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,31,23,0.06),rgba(3,11,9,0.42)_70%)]" />
          <ForestFireflies />
          <div className="relative z-10 mt-40 w-full max-w-xs">
            <Moon className="mx-auto mb-5 h-12 w-12 text-[#f6e198] ap-forest-float" />
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-[#f6e198]">Mis XV</p>
            <SplitName name={data.mainName} />
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="mx-auto mt-10 inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#f6e198]/55 bg-[#f6e198] text-[#123526] shadow-[0_0_46px_rgba(246,225,152,0.34)] transition hover:scale-105 active:scale-95"
            >
              <WandSparkles className="h-9 w-9" />
            </button>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-[#fff4cf]">Toca para entrar</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#071c17] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-forest-bg text-[#fff4cf]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-12 text-center">
            <img src={gateAsset} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,10,0.08),rgba(3,12,10,0.16)_52%,rgba(3,12,10,0.34))]" />
            <ForestFireflies />
            <div className="relative z-10 w-full max-w-sm pt-32">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-[#f6e198]">Bosque Encantado</p>
              <SplitName name={data.mainName} />
              <div className="mx-auto my-7 flex max-w-[17rem] items-center justify-center gap-3 text-[#f6e198]">
                <span className="h-px flex-1 bg-current opacity-55" />
                <Flower2 className="h-6 w-6" />
                <span className="h-px flex-1 bg-current opacity-55" />
              </div>
              <p className="mx-auto max-w-[17rem] rounded-full bg-[#0b2a20]/72 px-4 py-2 text-xs uppercase tracking-[0.17em] text-[#fff4cf] shadow-[0_18px_34px_rgba(4,16,12,0.34)]">
                {dateParts.weekday} {dateParts.day} de {dateParts.month} de {dateParts.year}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-forest-card px-7 py-10">
              <Leaf className="mx-auto mb-5 h-10 w-10 text-[#f6e198] ap-forest-float" />
              <p className="mx-auto mb-8 max-w-xs font-serif text-xl italic leading-9 text-[#fff4cf]">{data.customMessage}</p>
              <ParentsAndGodparents parents={data.parents} godparents={data.godparents} />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <div className="ap-forest-lake-frame overflow-hidden px-5 pb-9 pt-5">
              <img src={lakeAsset} alt="" className="h-[26rem] w-full rounded-[1.25rem] object-cover shadow-[0_24px_50px_rgba(0,0,0,0.36)]" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#f6e198]">Cada luciernaga nos acerca</p>
              <div className="mt-6 rounded-[1.25rem] bg-[#071b17]/82 px-2 py-7">
                <CountdownTimer targetDate={data.eventDate} accentColor="#f6e198" labelColor="rgba(255,244,207,0.76)" />
              </div>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-14 text-center">
            <h2 className="mb-8 font-serif text-4xl italic text-[#f6e198]">Ceremonia y recepcion</h2>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.name}-${loc.time}`} className="ap-forest-parchment px-3 py-6">
                  {loc.type === "misa" ? (
                    <Church className="mx-auto mb-4 h-10 w-10 text-[#9166bf]" />
                  ) : (
                    <GlassWater className="mx-auto mb-4 h-10 w-10 text-[#9166bf]" />
                  )}
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#9166bf"
                    className="bg-transparent text-[#173524] shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <Sparkles className="mx-auto mb-5 h-10 w-10 text-[#f6e198]" />
              <h2 className="mb-6 font-serif text-4xl italic text-[#fff4cf]">Noche de cuento</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#f6e198] bg-[#f6e198] text-[#123526]" lineClassName="bg-[#f6e198]/34" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <DressCode dressCode={data.dressCode} className="ap-forest-card text-[#fff4cf]" iconClassName="bg-[#f6e198]/14 text-[#f6e198]" colorsContainerClassName="text-[#fff4cf]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-14 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#f6e198]" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#f6e198]">Recuerdos del bosque</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-[1.25rem] border-[6px] border-[#254e34] shadow-[0_20px_40px_rgba(0,0,0,0.38)]" />
            <button
              type="button"
              onClick={() => setShared(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f6e198] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#123526] shadow-lg transition hover:scale-105 active:scale-95"
            >
              <Upload className="h-4 w-4" />
              Subir foto
            </button>
            {shared && <p className="mt-4 text-sm font-bold text-[#f6e198]">Tu recuerdo quedo iluminado para el album.</p>}
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-14 text-center">
              <div className="ap-forest-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-10 w-10 text-[#f6e198]" />
                <GiftRegistry items={data.giftRegistry} title="Lluvia de sobres" subtitle="Tu presencia es el regalo mas importante. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#f6e198" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Heart className="mx-auto mb-5 h-10 w-10 fill-[#f6e198] text-[#f6e198] ap-forest-float" />
            <h2 className="mb-6 font-serif text-4xl italic text-[#fff4cf]">Te espero en el bosque</h2>
            <p className="mx-auto mb-9 max-w-xs text-sm leading-7 text-[#fff4cf]/80">Confirma tu asistencia y acompananos a vivir esta noche de magia.</p>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#f6e198] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#123526] shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a los XV de ${data.mainName}.`} bgColor="#f6e198" textColor="#123526" />
        </div>
      </div>
    </InvitationLayout>
  );
}
