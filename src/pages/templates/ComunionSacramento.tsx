import { useMemo, useState } from "react";
import { CalendarDays, Camera, Church, Cross, Flower2, Gift, HandHeart, Sparkles } from "lucide-react";
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

import { DEMO_COMUNION_SACRAMENTO } from "@/data/demoInvitations";
import { getInvitationById } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: new Intl.DateTimeFormat("es-MX", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("es-MX", { month: "long" }).format(date),
    year: new Intl.DateTimeFormat("es-MX", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("es-MX", { weekday: "long" }).format(date),
  };
};

export default function ComunionSacramento() {
  const data = DEMO_COMUNION_SACRAMENTO;
  const template = getInvitationById(data.templateId);
  const theme = getThemeByFamily(template?.family || "botanical-elegance");
  const [isOpened, setIsOpened] = useState(false);
  const dateParts = useMemo(() => formatDate(data.eventDate), [data.eventDate]);

  return (
    <InvitationLayout theme={theme} pageTitle={`Primera comunion de ${data.mainName}`}>
      {!isOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#fbfaf5] px-6 text-center">
          <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="relative z-10 w-full max-w-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#a48952]">Mi primera comunion</p>
            <h1 className="font-serif text-5xl italic text-[#a48952]">{data.mainName}</h1>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              aria-label="Abrir invitacion"
              className="group mx-auto mt-10 block w-full max-w-[18rem] rounded-2xl ap-communion-envelope px-8 py-16 transition hover:-translate-y-1 active:translate-y-0"
            >
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#c6ae72] text-white shadow-lg transition group-hover:scale-105">
                <Cross className="h-10 w-10" />
              </span>
            </button>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[#a48952]">Haz click para abrir</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#e8dfd0] px-0 sm:px-6">
        <div className="ap-invitation-stage ap-communion-bg text-[#4a473b]">
          {isOpened && <MusicButton className="bottom-24 right-5" />}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-7 py-16 text-center">
            <img src={data.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative z-10 mt-6 w-full max-w-xs">
              <Cross className="mx-auto mb-5 h-9 w-9 text-[#c6ae72] ap-communion-float" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#8b927c]">Acompaname a celebrar</p>
              <h1 className="mt-2 font-serif text-4xl uppercase tracking-[0.12em] text-[#a48952]">Mi primera comunion</h1>
              <h2 className="mt-3 font-serif text-5xl italic leading-none text-[#9d7f3f]">{data.mainName}</h2>
              <div className="mx-auto my-7 h-px w-40 bg-[#c6ae72]/45" />
              <p className="text-xs uppercase tracking-[0.18em] text-[#6d6b5e]">{dateParts.weekday}</p>
              <p className="font-serif text-6xl leading-none text-[#a48952]">{dateParts.day}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#6d6b5e]">{dateParts.month} {dateParts.year}</p>
              <p className="mt-3 text-sm font-semibold text-[#8b927c]">{data.eventTime}</p>
            </div>
          </section>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-communion-card px-7 py-10">
              <HandHeart className="mx-auto mb-5 h-10 w-10 text-[#a48952]" />
              <p className="mx-auto max-w-xs font-serif text-lg leading-8 text-[#595543]">{data.customMessage}</p>
              <div className="mx-auto my-9 h-px w-28 bg-[#c6ae72]/45" />
              <p className="text-xs uppercase tracking-[0.24em] text-[#a48952]">{data.parents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic text-[#6c704f]">{data.parents?.[0]?.name}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-[#a48952]">{data.godparents?.[0]?.role}</p>
              <p className="mt-3 font-serif text-2xl italic text-[#6c704f]">{data.godparents?.[0]?.name}</p>
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#a48952]" />
            <h2 className="mb-7 font-serif text-4xl italic text-[#a48952]">Cada vez falta menos</h2>
            <div className="ap-communion-card px-3 py-8">
              <CountdownTimer targetDate={data.eventDate} accentColor="#a48952" labelColor="#6d6b5e" />
            </div>
          </InvitationSection>

          <InvitationSection className="relative px-7 py-16 text-center">
            <div className="ap-communion-arch px-5 pb-10 pt-14">
              <Church className="mx-auto mb-5 h-10 w-10" />
              <h2 className="mb-8 font-serif text-3xl">Ceremonia y recepcion</h2>
              <div className="space-y-6">
                {data.locations.map((loc) => (
                  <LocationCard
                    key={`${loc.name}-${loc.time}`}
                    title={loc.type}
                    name={loc.name}
                    address={loc.address}
                    mapUrl={loc.mapsUrl}
                    time={loc.time}
                    buttonLabel="Ver ubicacion"
                    accentColor="#a48952"
                    className="bg-[#fffdf6]/92 text-[#4a473b] shadow-none"
                  />
                ))}
              </div>
            </div>
          </InvitationSection>

          {data.itinerary && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#a48952]" />
              <h2 className="mb-4 font-serif text-3xl text-[#a48952]">Programa</h2>
              <Itinerary items={data.itinerary} itemClassName="border-[#a48952] bg-[#a48952] text-white" lineClassName="bg-[#a48952]/35" />
            </InvitationSection>
          )}

          {data.dressCode && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <DressCode dressCode={data.dressCode} className="ap-communion-card" iconClassName="bg-[#c6ae72]/16 text-[#a48952]" />
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-16 text-center">
            <Camera className="mx-auto mb-5 h-10 w-10 text-[#a48952]" />
            <h2 className="mb-8 font-serif text-4xl italic text-[#a48952]">Recuerdos</h2>
            <PhotoGallery photos={data.photos} className="grid-cols-2" imageClassName="rounded-t-full rounded-b-[1.4rem] border-4 border-white shadow-[0_18px_34px_rgba(94,83,52,0.16)]" />
          </InvitationSection>

          {data.giftRegistry && (
            <InvitationSection className="relative px-7 py-16 text-center">
              <div className="ap-communion-card px-5 py-9">
                <Gift className="mx-auto mb-4 h-9 w-9 text-[#a48952]" />
                <GiftRegistry items={data.giftRegistry} title="Mesa de regalos" subtitle="Tu presencia y oracion son mi verdadero regalo. Si deseas tener un detalle, puedes hacerlo aqui." accentColor="#a48952" />
              </div>
            </InvitationSection>
          )}

          <InvitationSection className="relative px-7 py-20 text-center">
            <Flower2 className="mx-auto mb-5 h-10 w-10 text-[#a48952]" />
            <h2 className="mb-6 font-serif text-3xl text-[#a48952]">Favor de confirmar asistencia</h2>
            <a
              href={`https://wa.me/${data.rsvpWhatsapp || "526645922368"}?text=Hola,%20confirmo%20mi%20asistencia%20a%20la%20primera%20comunion%20de%20${encodeURIComponent(data.mainName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#a48952] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              Confirmar
            </a>
          </InvitationSection>

          <FloatingRSVP phoneNumber={data.rsvpWhatsapp || "526645922368"} message={`Hola, confirmo mi asistencia a la primera comunion de ${data.mainName}.`} bgColor="#a48952" />
        </div>
      </div>
    </InvitationLayout>
  );
}
