import { useMemo, useState } from "react";
import { CalendarDays, Camera, Church, Gift, GlassWater, MapPinned, Shirt, Sparkles, Waves } from "lucide-react";
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

import { DEMO_XV_GOLD_WAVES } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const wavesAsset = "/assets/templates/xv-hombres/gold-waves/waves-frame.png";

const formatParts = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "2-digit" }).format(date),
  };
};

export default function XvGoldWaves() {
  const data = DEMO_XV_GOLD_WAVES;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "dark-mode-premium");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatParts(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Mis XV de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020712] px-6 text-center text-white">
          <img src={wavesAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,35,68,0.1),rgba(2,7,18,0.94)_72%)]" />
          <div className="relative z-10 max-w-xs">
            <Waves className="mx-auto mb-8 h-14 w-14 text-[#d7b35a] ap-xvh-float" />
            <p className="mb-3 text-xs uppercase tracking-[0.34em] text-[#c9a84c]">Mis XV</p>
            <h1 className="font-serif text-6xl uppercase tracking-[0.08em]">{data.mainName}</h1>
            <div className="mx-auto my-7 h-px w-40 bg-gradient-to-r from-transparent via-[#d7b35a] to-transparent" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              {dateParts.day} / {dateParts.month} / 20{dateParts.year}
            </p>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#d7b35a]/80 bg-[#d7b35a] text-[#06132c] shadow-[0_0_36px_rgba(215,179,90,0.36)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              <Sparkles className="h-7 w-7" />
            </button>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d7b35a]/80">
              Abrir invitacion
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#05070c] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-xvh-bg text-white">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative min-h-screen overflow-hidden text-center">
            <img src={data.heroPhoto} alt={data.mainName} className="absolute inset-x-0 top-0 h-[62vh] w-full object-cover" />
            <div className="absolute inset-x-0 top-0 h-[62vh] bg-gradient-to-b from-transparent via-[#06132c]/10 to-[#06132c]" />
            <img src={wavesAsset} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 mix-blend-screen" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,18,0.04)_0%,rgba(2,7,18,0.18)_42%,#06132c_72%)]" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-7 pb-16 pt-[56vh]">
              <p className="mb-2 text-xs uppercase tracking-[0.32em] text-[#d7b35a]">Mis XV</p>
              <h1 className="font-serif text-6xl uppercase leading-none tracking-[0.08em] text-white">
                {data.mainName}
              </h1>
              <div className="my-5 flex items-center gap-3 text-[#d7b35a]">
                <span className="h-px w-16 bg-[#d7b35a]/60" />
                <Sparkles className="h-5 w-5 ap-xvh-spark" />
                <span className="h-px w-16 bg-[#d7b35a]/60" />
              </div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/78">
                {dateParts.weekday} {dateParts.day} de {dateParts.month}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-xvh-card px-7 py-10">
              <p className="mb-7 text-xs uppercase tracking-[0.28em] text-[#d7b35a]">Gracias al ejemplo y al apoyo de mis</p>
              <h2 className="font-serif text-3xl uppercase tracking-[0.16em]">Padres</h2>
              <p className="mt-4 font-serif text-4xl italic text-[#d7b35a]">{data.parents?.[0]?.name}</p>
              <p className="mx-auto mt-8 max-w-xs text-sm leading-7 text-white/76">{data.customMessage}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d7b35a]/45 text-[#d7b35a]">
              <CalendarDays className="h-7 w-7" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Sabado</p>
            <div className="font-serif text-[8.5rem] leading-none text-[#d7b35a]">{dateParts.day}</div>
            <p className="-mt-2 font-serif text-4xl uppercase tracking-[0.18em] text-white">{dateParts.month}</p>
            <div className="mx-auto mt-7 h-px w-32 bg-[#d7b35a]/45" />
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-10 font-serif text-3xl uppercase tracking-[0.16em] text-white">Detalles del evento</h2>
            <div className="space-y-7">
              {data.locations.map((loc) => (
                <div key={`${loc.name}-${loc.time}`} className="ap-xvh-location px-2 py-2">
                  {loc.type === "ceremonia" ? (
                    <Church className="mx-auto mb-4 h-10 w-10 text-[#d7b35a]" />
                  ) : (
                    <GlassWater className="mx-auto mb-4 h-10 w-10 text-[#d7b35a]" />
                  )}
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#d7b35a"
                    className="bg-transparent text-white shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Shirt className="mx-auto mb-5 h-12 w-12 text-[#d7b35a]" />
              <DressCode
                dressCode={data.dressCode}
                className="ap-xvh-card text-white"
                iconClassName="bg-[#d7b35a]/12 text-[#d7b35a]"
                colorsContainerClassName="text-white"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-8 font-serif text-4xl uppercase tracking-[0.12em]">Solo faltan</h2>
            <div className="ap-xvh-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#d7b35a" labelColor="rgba(255,255,255,0.72)" />
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Sparkles className="mx-auto mb-4 h-9 w-9 text-[#d7b35a]" />
              <h2 className="mb-2 font-serif text-3xl uppercase tracking-[0.14em]">Itinerario</h2>
              <Itinerary
                items={data.itinerary}
                itemClassName="border-[#d7b35a] bg-[#d7b35a] text-[#06132c]"
                lineClassName="bg-[#d7b35a]/35"
              />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#d7b35a]" />
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.14em]">Galeria</h2>
            <PhotoGallery
              photos={data.photos}
              className="grid-cols-2"
              imageClassName="rounded-none border border-[#d7b35a]/45 shadow-[0_22px_44px_rgba(0,0,0,0.38)]"
            />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-xvh-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#d7b35a]" />
                <GiftRegistry
                  items={data.giftRegistry}
                  title="Lluvia de sobres"
                  subtitle="Tu presencia es mi mejor regalo. Si deseas tener un detalle, puedes hacerlo aqui."
                  accentColor="#d7b35a"
                />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <MapPinned className="mx-auto mb-5 h-10 w-10 text-[#d7b35a]" />
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-white/70">Espero verte</p>
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.12em]">Favor de confirmar tu asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#d7b35a] px-9 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#06132c] shadow-[0_18px_35px_rgba(215,179,90,0.24)] transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP
            phoneNumber={data.rsvpWhatsapp || "526645922368"}
            message={`Hola, confirmo mi asistencia a los XV de ${data.mainName}.`}
            bgColor="#d7b35a"
            textColor="#06132c"
          />
        </div>
      </div>
    </InvitationLayout>
  );
}
