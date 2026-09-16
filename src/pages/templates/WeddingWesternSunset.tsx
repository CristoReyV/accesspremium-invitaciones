import { useMemo, useState } from "react";
import { Camera, Church, Gift, GlassWater, Heart, MapPinned, Music, Sparkles, Sun } from "lucide-react";
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

import { DEMO_BODA_WESTERN } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "2-digit" }).format(date),
  };
};

export default function WeddingWesternSunset() {
  const data = DEMO_BODA_WESTERN;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "rustic-chic");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);
  const names = `${data.mainName} & ${data.secondName}`;

  return (
    <InvitationLayout theme={theme} pageTitle={`Boda de ${names}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-[#120f0b] px-5 pb-14 text-center text-[#f8ead1]">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/58" />
          <div className="relative z-10 w-full max-w-sm rounded-t-[2.25rem] border border-[#c67a3b]/45 bg-[#0d0b09]/82 px-7 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            <Sun className="mx-auto mb-4 h-9 w-9 text-[#d89b55] ap-western-dust" />
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#d89b55]">Nuestra boda</p>
            <h1 className="font-serif text-5xl italic leading-none">{data.mainName}</h1>
            <p className="my-2 font-serif text-4xl text-[#d89b55]">&</p>
            <h2 className="font-serif text-5xl italic leading-none">{data.secondName}</h2>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className="mx-auto mt-8 inline-flex rounded-full bg-[#f1d89f] px-8 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#130d08] shadow-[0_18px_38px_rgba(198,122,59,0.35)] transition hover:scale-105 active:scale-95"
              aria-label="Abrir invitacion"
            >
              Abrir invitacion
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#100d09] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-western-bg text-[#2b1b11]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-end justify-center overflow-hidden px-6 pb-12 pt-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f8ead1] via-[#f8ead1]/55 to-transparent" />
            <div className="relative z-10 w-full max-w-sm ap-western-paper px-7 py-9">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#8f552d]">Nuestra boda</p>
              <h1 className="font-serif text-5xl italic leading-none text-[#8d4d2a]">{data.mainName}</h1>
              <p className="my-1 font-serif text-4xl text-[#17100c]">&</p>
              <h2 className="font-serif text-5xl italic leading-none text-[#8d4d2a]">{data.secondName}</h2>
              <p className="mt-6 text-lg font-bold tracking-[0.22em] text-[#17100c]">
                {dateParts.day}.{dateParts.month.slice(0, 3).toUpperCase()}.{dateParts.year}
              </p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-western-black px-7 py-10">
              <Sparkles className="mx-auto mb-5 h-9 w-9 text-[#d89b55]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#f8ead1]">{data.customMessage}</p>
              <div className="mx-auto my-8 h-px w-28 bg-[#d89b55]/45" />
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-[#d89b55]">Con amor de nuestros padres</p>
              <div className="space-y-5 text-sm leading-6 text-[#f8ead1]/82">
                {data.parents?.map((parent) => (
                  <div key={parent.name}>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#d89b55]/80">{parent.role}</p>
                    <p className="font-serif text-lg italic">{parent.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-[#d89b55]">{data.godparents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic text-[#f8ead1]">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-7 font-serif text-4xl italic text-[#8d4d2a]">Los detalles</h2>
            <div className="space-y-6">
              {data.locations.map((loc) => (
                <div key={`${loc.name}-${loc.time}`} className="ap-western-card px-4 py-7">
                  {loc.type === "ceremonia" ? <Church className="mx-auto mb-4 h-9 w-9 text-[#8d4d2a]" /> : <GlassWater className="mx-auto mb-4 h-9 w-9 text-[#8d4d2a]" />}
                  <LocationCard
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#8d4d2a"
                    className="bg-transparent text-[#2b1b11] shadow-none"
                  />
                </div>
              ))}
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-western-black px-5 py-10">
                <Music className="mx-auto mb-5 h-9 w-9 text-[#d89b55]" />
                <h2 className="mb-3 font-serif text-4xl italic text-[#d89b55]">Despues de la ceremonia</h2>
                <Itinerary items={data.itinerary} itemClassName="border-[#d89b55] bg-[#d89b55] text-[#130d08]" lineClassName="bg-[#d89b55]/35" />
              </div>
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-western-black text-[#f8ead1]" iconClassName="bg-[#d89b55]/15 text-[#d89b55]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#8d4d2a]" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#8d4d2a]">Galeria del rancho</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-none border-[6px] border-[#f8ead1] shadow-[0_20px_38px_rgba(63,39,22,0.24)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-western-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#8d4d2a]" />
                <GiftRegistry items={data.giftRegistry} title="Regalos" subtitle="Tu presencia es nuestro verdadero regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#8d4d2a" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <h2 className="mb-8 font-serif text-3xl uppercase tracking-[0.1em] text-[#8d4d2a]">El comienzo esta por llegar</h2>
            <div className="ap-western-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#8d4d2a" labelColor="#6f5540" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-20 text-center">
            <div className="ap-western-black px-6 py-10">
              <Heart className="mx-auto mb-4 h-10 w-10 text-[#d89b55]" />
              <h2 className="mb-4 font-serif text-3xl italic text-[#f8ead1]">Confirma tu asistencia</h2>
              <p className="mx-auto mb-8 max-w-xs text-sm leading-6 text-[#f8ead1]/78">Celebra con nosotros este capitulo tan especial.</p>
              <div className="flex flex-col gap-3">
                {["Invitados novia", "Invitados novio"].map((label) => (
                  <a
                    key={label}
                    href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20${encodeURIComponent(names)}.%20${encodeURIComponent(label)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#f1d89f] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#130d08] shadow-[0_16px_32px_rgba(198,122,59,0.24)] transition hover:scale-105 active:scale-95"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la boda de ${names}.`} bgColor="#8d4d2a" textColor="#fff8e6" />
        </div>
      </div>
    </InvitationLayout>
  );
}
