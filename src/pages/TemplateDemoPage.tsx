// ============================================================
// TemplateDemoPage — Página base para demos de invitaciones
// ============================================================

import { useParams } from "react-router-dom";
import { getInvitationBySlug } from "@/data/invitations";
import { getThemeByFamily } from "@/styles/tokens";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import type { InvitationTemplate } from "@/types";

// Plantillas Piloto (Fase 3A)
import WeddingBotanical from "./templates/WeddingBotanical";
import XvPrincess from "./templates/XvPrincess";
import KidsRacing from "./templates/KidsRacing";
import BabyShowerSelva from "./templates/BabyShowerSelva";
import BautizoJardin from "./templates/BautizoJardin";
import RevelacionTeddy from "./templates/RevelacionTeddy";
import XvGoldWaves from "./templates/XvGoldWaves";
import XvGatsby from "./templates/XvGatsby";
import GradMidnight from "./templates/GradMidnight";
import WeddingNoir from "./templates/WeddingNoir";
import BirthdayGoldenGlam from "./templates/BirthdayGoldenGlam";
import GradHonorClassic from "./templates/GradHonorClassic";
import WeddingWesternSunset from "./templates/WeddingWesternSunset";
import BirthdayKawaiiFriends from "./templates/BirthdayKawaiiFriends";
import BabyShowerCoquette from "./templates/BabyShowerCoquette";
import ComunionSacramento from "./templates/ComunionSacramento";
import RevelacionClassicBalloons from "./templates/RevelacionClassicBalloons";
import BautizoTrazoCelestial from "./templates/BautizoTrazoCelestial";
import ComunionModernBlock from "./templates/ComunionModernBlock";
import BirthdaySummerBrunch from "./templates/BirthdaySummerBrunch";
import BabyShowerJirafaPastel from "./templates/BabyShowerJirafaPastel";
import BirthdayCoquetteBows from "./templates/BirthdayCoquetteBows";
import XvRacingSpeed from "./templates/XvRacingSpeed";
import JubilacionGoldenBlooms from "./templates/JubilacionGoldenBlooms";
import XvBosqueEncantado from "./templates/XvBosqueEncantado";
import XvGatsbyMen from "./templates/XvGatsbyMen";
import JubilacionExecutivePrestige from "./templates/JubilacionExecutivePrestige";
import LuctuosoHomenajeClasico from "./templates/LuctuosoHomenajeClasico";
import WeddingCafeEspresso from "./templates/WeddingCafeEspresso";

// ──────────────────────────────────────────────────────────
// Componente de placeholder para una demo aún no construida
// ──────────────────────────────────────────────────────────
function ComingSoonPlaceholder({ template }: { template: InvitationTemplate }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <span
        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
        style={{ backgroundColor: "var(--ap-primary)", color: "#fff", opacity: 0.9 }}
      >
        {template.priority === "mvp"
          ? "MVP — En construcción"
          : template.priority === "fase4"
          ? "Fase 4 — Próximamente"
          : "Fase 5 — Próximamente"}
      </span>

      <h1
        className="text-4xl md:text-6xl font-serif mb-4"
        style={{ fontFamily: "var(--ap-font-display, 'Playfair Display', serif)", color: "var(--ap-text)" }}
      >
        {template.name}
      </h1>

      <p className="text-lg max-w-lg leading-relaxed mb-12" style={{ color: "var(--ap-text-muted, #888)" }}>
        {template.description}
      </p>

      <div className="flex gap-3 mb-12">
        {template.colors.map((color) => (
          <div
            key={color}
            className="w-8 h-8 rounded-full border-2 border-white/20 shadow"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm max-w-2xl w-full" style={{ color: "var(--ap-text-muted, #888)" }}>
        <div>
          <p className="uppercase tracking-widest text-xs mb-1 opacity-60">Categoría</p>
          <p className="font-medium" style={{ color: "var(--ap-text)" }}>{template.category}</p>
        </div>
        <div>
          <p className="uppercase tracking-widest text-xs mb-1 opacity-60">Familia</p>
          <p className="font-medium" style={{ color: "var(--ap-text)" }}>{template.family}</p>
        </div>
        <div>
          <p className="uppercase tracking-widest text-xs mb-1 opacity-60">Estilo</p>
          <p className="font-medium" style={{ color: "var(--ap-text)" }}>{template.colorMode}</p>
        </div>
        <div>
          <p className="uppercase tracking-widest text-xs mb-1 opacity-60">Decoración</p>
          <p className="font-medium" style={{ color: "var(--ap-text)" }}>
            {"★".repeat(template.decorationLevel)}{"☆".repeat(4 - template.decorationLevel)}
          </p>
        </div>
      </div>

      <a href="/" className="mt-16 inline-flex items-center gap-2 text-sm underline opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--ap-text)" }}>
        ← Volver al inicio
      </a>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Página principal (Resolver)
// ──────────────────────────────────────────────────────────
export default function TemplateDemoPage() {
  const { slug } = useParams<{ category: string; slug: string }>();

  const template = slug ? getInvitationBySlug(slug) : null;

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-4xl font-serif mb-4">Plantilla no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            El diseño que buscas no existe o aún no está disponible.
          </p>
          <a href="/" className="underline text-primary">
            ← Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────
  // RESOLUCIÓN DE PILOTOS (FASE 3A)
  // ────────────────────────────────────────────────────────
  if (slug === "botanica-verde-olivo") return <WeddingBotanical />;
  if (slug === "princesa-encantada") return <XvPrincess />;
  if (slug === "racing-champion") return <KidsRacing />;
  if (slug === "selva-suave") return <BabyShowerSelva />;
  if (slug === "jardin-de-la-gracia") return <BautizoJardin />;
  if (slug === "teddy-boho") return <RevelacionTeddy />;
  if (slug === "gold-waves") return <XvGoldWaves />;
  if (slug === "gatsby-gold") return <XvGatsby />;
  if (slug === "midnight-gala") return <GradMidnight />;
  if (slug === "dark-mode-noir") return <WeddingNoir />;
  if (slug === "golden-glam") return <BirthdayGoldenGlam />;
  if (slug === "honor-classic") return <GradHonorClassic />;
  if (slug === "western-sunset") return <WeddingWesternSunset />;
  if (slug === "kawaii-friends") return <BirthdayKawaiiFriends />;
  if (slug === "coquette-bebe") return <BabyShowerCoquette />;
  if (slug === "sacramento-elegance") return <ComunionSacramento />;
  if (slug === "classic-balloons") return <RevelacionClassicBalloons />;
  if (slug === "trazo-celestial") return <BautizoTrazoCelestial />;
  if (slug === "modern-block") return <ComunionModernBlock />;
  if (slug === "summer-brunch") return <BirthdaySummerBrunch />;
  if (slug === "jirafa-pastel") return <BabyShowerJirafaPastel />;
  if (slug === "coquette-bows") return <BirthdayCoquetteBows />;
  if (slug === "racing-speed") return <XvRacingSpeed />;
  if (slug === "golden-blooms") return <JubilacionGoldenBlooms />;
  if (slug === "bosque-encantado") return <XvBosqueEncantado />;
  if (slug === "gatsby-gold-men") return <XvGatsbyMen />;
  if (slug === "executive-prestige") return <JubilacionExecutivePrestige />;
  if (slug === "homenaje-clasico") return <LuctuosoHomenajeClasico />;
  if (slug === "ayde-octavio") return <WeddingCafeEspresso />;

  // Si no es un piloto, mostramos el placeholder
  const theme = getThemeByFamily(template.family);

  return (
    <InvitationLayout
      theme={theme}
      pageTitle={template.seoTitle}
      pageDescription={template.seoDescription}
    >
      <ComingSoonPlaceholder template={template} />
    </InvitationLayout>
  );
}
