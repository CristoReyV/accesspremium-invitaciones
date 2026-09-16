import { useState, useEffect, useRef } from "react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import { BODA_AYDE_OCTAVIO } from "@/data/demoInvitations";
import { cafeEspressoTheme } from "@/styles/tokens/cafeEspresso";

// ─── Paleta completa ──────────────────────────────────────────
const C = {
  ivory:      "#FBF7F1",
  cream:      "#F5EFE4",
  beige:      "#EDE3D3",
  latte:      "#C5A882",
  cafeClaro:  "#A3784A",
  cafe:       "#7B4F2E",
  moka:       "#5C3418",
  espresso:   "#2C1A0E",
  gold:       "#C9A96E",
  goldLight:  "#E2C88A",
  champagne:  "#EDD9B8",
  textMuted:  "#8C6A50",
  textLight:  "#B8936A",
  sky:        "#A8C4D4",
  skyLight:   "#D0E4EF",
};

// ─── Imports de Assets ────────────────────────────────────────
import paperImg         from "@/assets/invitations/cafe-espresso/beige-texture.webp";
import floralImg        from "@/assets/invitations/cafe-espresso/arreglo_floral_ayde_octavio_png_sin_fondo.png";
import floralDerechaImg from "@/assets/invitations/cafe-espresso/arreglofloral-derecha.png";
import sealImg          from "@/assets/invitations/cafe-espresso/sello_cera_ayde_octavio_png_sin_fondo.png";
import reliefImg        from "@/assets/invitations/cafe-espresso/floral-relief.png";
import ringsImg         from "@/assets/invitations/cafe-espresso/itinerary-rings.png";
import receptionImg     from "@/assets/invitations/cafe-espresso/itinerary-reception.png";
import watercolorImg    from "@/assets/invitations/cafe-espresso/watercolor-floral.png";
import sobreCitlaliImg  from "@/assets/invitations/cafe-espresso/sobre-citlali.png";
import musicFile        from "@/assets/invitations/cafe-espresso/hasta-mi-final.mp3";
import photoPareja      from "@/assets/invitations/cafe-espresso/photo-pareja-boda.jpg";
import photoIglesia     from "@/assets/invitations/cafe-espresso/photo-pareja-iglesia.jpg";
import photoAbrazo      from "@/assets/invitations/cafe-espresso/photo-pareja-abrazo.jpg";
import photoAnillos     from "@/assets/invitations/cafe-espresso/photo-anillos-rosas.jpg";
import photoManos       from "@/assets/invitations/cafe-espresso/photo-manos-ramo.jpg";
import photoAnilloDedo  from "@/assets/invitations/cafe-espresso/photo-anillo-dedo.jpg";
import photoAnilloDedo2 from "@/assets/invitations/cafe-espresso/photo-anillo-dedo-2.jpg";

const ASSETS = {
  paper: paperImg, floral: floralImg, floralDerecha: floralDerechaImg, seal: sealImg, relief: reliefImg,
  itineraryRings: ringsImg, itineraryReception: receptionImg,
  watercolor: watercolorImg, sobreCitlali: sobreCitlaliImg, music: musicFile,
  photoPareja, photoIglesia, photoAbrazo, photoAnillos,
  photoManos, photoAnilloDedo, photoAnilloDedo2,
};

// ─── Hook Scroll Reveal ───────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("cafe-visible")),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".cafe-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Music Button ─────────────────────────────────────────────
function CafeMusicButton({ audioSrc, show = true }: { audioSrc?: string; show?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc) { audioRef.current = new Audio(audioSrc); audioRef.current.loop = true; }
    return () => { audioRef.current?.pause(); audioRef.current = null; };
  }, [audioSrc]);

  useEffect(() => {
    (window as any).startCafeMusic = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
    };
  }, [isPlaying]);

  const toggle = () => {
    if (!audioRef.current) { setIsPlaying(!isPlaying); return; }
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().catch(() => setIsPlaying(false)); setIsPlaying(true); }
  };

  return (
    <div className={`fixed bottom-6 left-4 z-40 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <button onClick={toggle}
        className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
        style={{ background: isPlaying ? C.moka : C.ivory, border: `1.5px solid ${isPlaying ? C.goldLight : C.latte}`, boxShadow: isPlaying ? `0 0 22px ${C.gold}55` : `0 2px 12px rgba(44,26,14,0.12)` }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}>
        {isPlaying && (
          <svg className="absolute inset-0 w-full h-full cafe-spin-slow" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke={C.goldLight} strokeWidth="0.6" strokeDasharray="5 5" />
          </svg>
        )}
        <div className={`w-5 h-5 flex items-center justify-center transition-all duration-500 ${isPlaying ? "scale-110" : "opacity-70"}`} style={{ color: isPlaying ? C.ivory : C.moka }}>
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

// ─── Opening Screen / Sobre ───────────────────────────────────
function CafeOpeningScreen({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    if ((window as any).startCafeMusic) (window as any).startCafeMusic();
    setTimeout(onOpen, 1100);
  };
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center splash ${isOpening ? "open" : ""}`}
      style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", opacity: isOpening ? 0 : 1, transition: "opacity 0.6s ease-in-out", transitionDelay: isOpening ? "1s" : "0s", pointerEvents: isOpening ? "none" : "auto" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(transparent 40%, rgba(0,0,0,.06))" }} />
      <div className="absolute top-16 left-0 w-full flex flex-col items-center pointer-events-none transition-opacity duration-500" style={{ zIndex: 5, opacity: isOpening ? 0 : 1 }}>
        <p className="text-[9px] md:text-[11px] tracking-[0.35em] uppercase mb-3 text-center px-4" style={{ color: C.cafeClaro }}>Tenemos el honor de invitarte</p>
        <h2 className="text-4xl md:text-5xl text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso }}>Ayde &amp; Octavio</h2>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: C.gold }}>30 · Enero · 2027</span>
          <div className="w-8 h-px" style={{ backgroundColor: C.gold }} />
        </div>
      </div>
      <div className="relative z-10 mt-12 cursor-pointer splash-envelope-container" onClick={handleOpen}>
        <img src={ASSETS.sobreCitlali} alt="Sobre de invitación" className="splash-img" />
        <img src={ASSETS.seal} alt="Sello personalizado Ayde & Octavio"
          className="absolute top-1/2 left-1/2 w-28 md:w-36 drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] transition-transform duration-700 hover:scale-110"
          style={{ transform: "translate(-50%, -40%)", zIndex: 20 }} />
      </div>
      <div className="splash-hint cursor-pointer flex items-center justify-center gap-2" onClick={handleOpen}
        style={{ background: `rgba(44,26,14,0.82)`, color: C.ivory, border: `1px solid ${C.gold}`, padding: "0.7rem 1.8rem", backdropFilter: "blur(6px)", boxShadow: `0 4px 20px ${C.gold}50` }}>
        <span className="text-xs uppercase tracking-[0.28em] font-medium">Toca para abrir</span>
      </div>
    </div>
  );
}

// ─── Gold Divider (claro u oscuro) ───────────────────────────
function GoldDivider({ slim = false, dark = false }: { slim?: boolean; dark?: boolean }) {
  const g = dark ? C.goldLight : C.gold;
  const dot = C.skyLight;
  return (
    <div className={`flex items-center justify-center gap-2 ${slim ? "my-5" : "my-8"}`}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot, opacity: 0.65 }} />
      <div className={`${slim ? "w-6" : "w-10"} h-px`} style={{ background: `linear-gradient(to right, transparent, ${g})` }} />
      <svg width={slim ? "11" : "15"} height={slim ? "11" : "15"} viewBox="0 0 16 16" fill="none" className="cafe-ornament-drift">
        <path d="M8 0.5L9.2 6.8L15.5 8L9.2 9.2L8 15.5L6.8 9.2L0.5 8L6.8 6.8Z" fill={g} fillOpacity="0.9" />
      </svg>
      <div className={`${slim ? "w-6" : "w-10"} h-px`} style={{ background: `linear-gradient(to left, transparent, ${g})` }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot, opacity: 0.65 }} />
    </div>
  );
}

// ─── Ceremony Card ────────────────────────────────────────────
function CafeCeremonyCard({ type, name, address, time, mapsUrl, icon }: {
  type: "religiosa" | "civil"; name: string; address: string; time?: string; mapsUrl: string; icon: React.ReactNode;
}) {
  const hasRealMap = mapsUrl && !mapsUrl.startsWith("#");
  const corners = [
    { pos: "top-2 left-2",    path: "M1 8 L1 1 L8 1" },
    { pos: "top-2 right-2",   path: "M15 8 L15 1 L8 1" },
    { pos: "bottom-2 left-2", path: "M1 8 L1 15 L8 15" },
    { pos: "bottom-2 right-2",path: "M15 8 L15 15 L8 15" },
  ];
  return (
    <div className="relative overflow-hidden text-center transition-all duration-500 cafe-card-hover"
      style={{ backgroundColor: "rgba(251,247,241,0.93)", border: `1px solid ${C.gold}50`, boxShadow: `0 8px 32px ${C.espresso}10`, borderRadius: "2px" }}>
      {/* Corner ornaments */}
      {corners.map(({ pos, path }, i) => (
        <svg key={i} className={`absolute ${pos} opacity-35`} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d={path} stroke={C.gold} strokeWidth="1.2" />
        </svg>
      ))}
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
      {/* Relief bg */}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none" style={{ backgroundImage: `url(${ASSETS.relief})`, backgroundSize: "cover" }} />

      <div className="relative z-10 p-7 sm:p-8">
        {/* Badge tipo */}
        <span className="inline-block px-3 py-1 text-[8px] tracking-[0.22em] uppercase font-medium mb-5"
          style={{ backgroundColor: type === "religiosa" ? `${C.moka}12` : `${C.cafeClaro}12`, color: type === "religiosa" ? C.moka : C.cafeClaro, border: `1px solid ${type === "religiosa" ? C.moka : C.cafeClaro}25` }}>
          {type === "religiosa" ? "Boda Religiosa" : "Boda Civil"}
        </span>

        {/* Ícono */}
        <div className="flex items-center justify-center mx-auto mb-4" style={{ width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle, ${C.champagne}, ${C.beige})`, border: `1.5px solid ${C.gold}50`, boxShadow: `0 4px 12px ${C.gold}20` }}>
          {icon}
        </div>

        {/* Nombre */}
        <h3 className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso, fontWeight: 400 }}>{name}</h3>

        {/* Hora */}
        {time && <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: C.gold }}>{time}</p>}

        {/* Dirección */}
        <p className="text-sm mb-6 px-2" style={{ color: C.textMuted, lineHeight: "1.7" }}>{address}</p>

        {/* Botón Maps */}
        <a href={hasRealMap ? mapsUrl : "#"} target={hasRealMap ? "_blank" : "_self"} rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${hasRealMap ? "hover:scale-105 active:scale-95" : "cursor-default"}`}
          style={{ background: hasRealMap ? `linear-gradient(135deg, ${C.moka}, ${C.cafe})` : C.beige, color: hasRealMap ? C.ivory : C.textMuted, borderRadius: "1px", border: hasRealMap ? "none" : `1px solid ${C.latte}30`, boxShadow: hasRealMap ? `0 4px 14px ${C.moka}35` : "none" }}
          onClick={!hasRealMap ? (e) => e.preventDefault() : undefined}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {hasRealMap ? "Ver en Google Maps" : "Ubicación próximamente"}
        </a>
      </div>
    </div>
  );
}

// ─── Global CSS ───────────────────────────────────────────────
const ANIMATION_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Inter:wght@300;400;500&display=swap');

  /* ── Scroll reveal */
  .cafe-reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.95s cubic-bezier(0.4,0,0.2,1), transform 0.95s cubic-bezier(0.4,0,0.2,1);
  }
  .cafe-reveal.cafe-visible { opacity: 1; transform: translateY(0); }
  .cafe-reveal-d1 { transition-delay: 0.12s; }
  .cafe-reveal-d2 { transition-delay: 0.24s; }
  .cafe-reveal-d3 { transition-delay: 0.38s; }

  /* ── Hero Names */
  .cafe-hero-name { animation: cafeNameReveal 1.5s cubic-bezier(0.4,0,0.2,1) both; }
  @keyframes cafeNameReveal {
    from { opacity: 0; transform: translateY(42px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Envelope */
  .splash-img {
    height: min(76vh, 90vw); width: auto; display: block;
    box-shadow: 0 24px 60px rgba(0,0,0,.26); border-radius: 6px;
  }
  .splash-hint {
    position: absolute; bottom: 6vh; left: 50%; transform: translateX(-50%);
    border-radius: 30px; backdrop-filter: blur(3px);
    animation: hintPulse 2.6s ease-in-out infinite;
  }
  @keyframes hintPulse {
    0%, 100% { transform: translateX(-50%) scale(1); box-shadow: 0 4px 20px rgba(201,169,110,0.3); }
    50%       { transform: translateX(-50%) scale(1.04); box-shadow: 0 6px 28px rgba(201,169,110,0.55); }
  }
  @keyframes envelopeOpen {
    0%   { transform: rotateX(0) scale(1); opacity: 1; }
    40%  { transform: rotateX(22deg) scale(1.04); }
    70%  { transform: rotateX(70deg) scale(.92); }
    100% { transform: rotateX(85deg) scale(.9); opacity: 0; }
  }
  .splash-envelope-container { perspective: 1000px; }
  .splash.open .splash-envelope-container { animation: envelopeOpen 1.1s ease-in-out forwards; }

  /* ── Float */
  .cafe-float { animation: floatAnim 7s ease-in-out infinite; }
  @keyframes floatAnim { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-14px) rotate(1.3deg);} }
  .cafe-float-slow { animation: floatSlowAnim 9s ease-in-out infinite; }
  @keyframes floatSlowAnim { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-9px);} }

  /* ── Ornament drift */
  .cafe-ornament-drift { animation: ornamentDrift 6s ease-in-out infinite; }
  @keyframes ornamentDrift {
    0%,100%{ transform: rotate(0deg) scale(1); }
    33%    { transform: rotate(14deg) scale(1.1); }
    66%    { transform: rotate(-9deg) scale(0.93); }
  }

  /* ── Spin */
  .cafe-spin-slow { animation: spin 12s linear infinite; }
  @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

  /* ── Card hover */
  .cafe-card-hover { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s cubic-bezier(0.4,0,0.2,1); }
  .cafe-card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(44,26,14,0.15) !important; }

  /* ── CTA glow */
  .cafe-cta-glow { animation: ctaGlow 3s ease-in-out infinite; }
  @keyframes ctaGlow {
    0%,100%{ box-shadow: 0 6px 20px rgba(92,52,24,0.38); }
    50%    { box-shadow: 0 10px 36px rgba(92,52,24,0.62), 0 0 24px rgba(201,169,110,0.38); }
  }

  /* ── Watercolor shimmer */
  .cafe-watercolor-shimmer { animation: shimmer 8s ease-in-out infinite; }
  @keyframes shimmer { 0%,100%{opacity:0.07;} 50%{opacity:0.14;} }

  /* ── Image hover */
  .cafe-img-reveal { transition: transform 0.9s cubic-bezier(0.4,0,0.2,1), filter 0.9s ease; filter: brightness(0.97); }
  .cafe-img-reveal:hover { transform: scale(1.04); filter: brightness(1.02); }

  /* ── Sky accent */
  .cafe-sky-accent { background: linear-gradient(to right, transparent, #A8C4D4 40%, transparent); height: 1px; opacity: 0.48; }

  /* ── Itinerary timeline */
  .cafe-timeline-line {
    position: absolute; left: 18px; top: 20px; bottom: 20px; width: 1px;
    background: linear-gradient(to bottom, transparent, #C9A96E 15%, #C9A96E 85%, transparent);
    opacity: 0.5;
  }
`;

// ─── URL del formulario ───────────────────────────────────────
// 👉 Cambiar aquí si cambia el link del formulario Google Forms
const RSVP_FORM_URL = "https://forms.gle/yAHXHLKRF3im4t5MA";

// ════════════════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════════
export default function WeddingCafeEspresso() {
  const data = BODA_AYDE_OCTAVIO;
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const hasForm = RSVP_FORM_URL !== "PENDIENTE_LINK_FORMS";

  useScrollReveal();

  useEffect(() => {
    if (isOpened) { setTimeout(() => setShowContent(true), 300); window.scrollTo(0, 0); }
  }, [isOpened]);

  return (
    <InvitationLayout
      theme={cafeEspressoTheme}
      pageTitle="Boda Ayde & Octavio — 30 de Enero 2027"
      pageDescription="Un amor para siempre. Te invitamos a celebrar nuestra boda el 30 de enero 2027."
    >
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLES }} />
      {!isOpened && <CafeOpeningScreen onOpen={() => setIsOpened(true)} />}

      <div style={{
        opacity: showContent ? 1 : 0,
        transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
        color: C.espresso,
        minHeight: "100vh",
      }}>
        <CafeMusicButton audioSrc={ASSETS.music} show={showContent} />

        {/* ══════════════════════════════════════════════════════════
            1. HERO — Portada editorial premium
        ══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-12 pb-24"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}>
          {/* Overlay radial cálido */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(237,217,184,0.16) 0%, transparent 65%)", pointerEvents: "none" }} />

          {/* Floral superior izquierda */}
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute top-0 left-0 opacity-90 cafe-float pointer-events-none drop-shadow-xl"
            style={{ width: "min(72vw, 340px)", transform: "translate(-24%, -18%) scaleX(-1)" }} />
          {/* Floral inferior derecha */}
          <img src={ASSETS.floralDerecha} alt="" aria-hidden="true"
            className="absolute bottom-0 right-0 opacity-65 cafe-float-slow pointer-events-none drop-shadow-lg"
            style={{ width: "min(55vw, 260px)", transform: "translate(15%, 15%)", animationDelay: "2.2s" }} />

          <div className="relative z-10 cafe-hero-name">
            {/* Eyebrow */}
            <p className="text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: C.cafeClaro }}>Nuestra Boda</p>

            {/* Monograma A & O */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${C.gold})`, opacity: 0.5 }} />
              <span className="text-sm tracking-[0.3em] uppercase" style={{ color: C.gold, fontFamily: "'Cormorant Garamond', serif" }}>A &amp; O</span>
              <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${C.gold})`, opacity: 0.5 }} />
            </div>

            {/* Nombres */}
            <h1 className="flex flex-col items-center mb-4">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(4rem, 18vw, 8rem)", lineHeight: 1, color: C.espresso, letterSpacing: "-0.02em" }}>
                Ayde
              </span>
              <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.8rem, 11vw, 5rem)", color: C.gold, lineHeight: 1.1 }}>
                &amp;
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(4rem, 18vw, 8rem)", lineHeight: 1, color: C.espresso, letterSpacing: "-0.02em" }}>
                Octavio
              </span>
            </h1>

            {/* Divisor con azul cielo */}
            <div className="cafe-sky-accent w-24 mx-auto mb-1" />
            <GoldDivider />
            <div className="cafe-sky-accent w-24 mx-auto mt-1" />

            {/* Frase */}
            <p className="text-xl md:text-2xl italic mt-7 mb-9" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.cafe }}>
              "Un amor para siempre"
            </p>

            {/* Fecha editorial — caja con fondo */}
            <div className="inline-flex flex-col items-center px-12 py-6 rounded-sm mt-2"
              style={{ border: `1px solid ${C.gold}45`, backgroundColor: "rgba(251,247,241,0.65)", backdropFilter: "blur(4px)" }}>
              <span className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: C.cafeClaro, fontWeight: 500 }}>Sábado</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(3.5rem, 14vw, 4.5rem)", lineHeight: 1, color: C.espresso }}>30</span>
              <span className="text-[10px] tracking-[0.35em] uppercase mt-2" style={{ color: C.textMuted }}>Enero · 2027</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ opacity: 0.35 }}>
            <div className="w-px h-5" style={{ backgroundColor: C.latte }} />
            <svg width="8" height="5" viewBox="0 0 8 5" fill={C.latte}><path d="M0 0L4 5L8 0Z" /></svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            2. HONOR — Carta ceremonial en oscuro
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-20 px-6 overflow-hidden cafe-reveal"
          style={{ background: `linear-gradient(160deg, ${C.espresso} 0%, ${C.moka} 60%, ${C.cafe} 100%)` }}>
          {/* Florales fantasma */}
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute top-0 left-0 pointer-events-none cafe-float-slow"
            style={{ width: "260px", opacity: 0.07, transform: "translate(-30%, -20%) scaleX(-1)", animationDelay: "1s" }} />
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute bottom-0 right-0 pointer-events-none cafe-float"
            style={{ width: "220px", opacity: 0.06, transform: "translate(25%, 20%)", animationDelay: "3s" }} />
          {/* Watercolor overlay */}
          <div className="absolute inset-0 cafe-watercolor-shimmer pointer-events-none"
            style={{ backgroundImage: `url(${ASSETS.watercolor})`, backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "soft-light" }} />

          <div className="relative z-10 max-w-xl mx-auto text-center">
            {/* Sello ornamental */}
            <img src={ASSETS.seal} alt="" aria-hidden="true"
              className="w-16 h-16 mx-auto mb-4 opacity-80 cafe-float-slow"
              style={{ filter: "brightness(1.1) saturate(0.8)" }} />
            <GoldDivider dark slim />
            <p className="text-[9px] tracking-[0.42em] uppercase mb-5 mt-2" style={{ color: C.goldLight }}>
              ✦ Con todo nuestro amor ✦
            </p>
            <h2 className="text-3xl md:text-4xl mb-5 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.ivory, fontWeight: 300 }}>
              Tenemos el honor de invitarte
            </h2>
            <div className="w-20 h-px mx-auto mb-6" style={{ background: `linear-gradient(to right, transparent, ${C.goldLight}55, transparent)` }} />
            <p className="text-base md:text-lg leading-loose px-2" style={{ color: C.champagne, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, lineHeight: "1.9" }}>
              {data.customMessage}
            </p>
            <GoldDivider dark slim />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. PADRES — Placas formales impresas
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 text-center relative cafe-reveal overflow-hidden"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          {/* Overlay muy sutil */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(251,247,241,0.35)", pointerEvents: "none" }} />
          {/* Floral lateral */}
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute right-0 top-1/2 pointer-events-none opacity-45 cafe-float-slow"
            style={{ width: "min(50vw, 210px)", transform: "translate(35%, -50%) rotate(8deg)", animationDelay: "1.5s" }} />

          <div className="max-w-2xl mx-auto relative z-10">
            <p className="text-[9px] tracking-[0.42em] uppercase mb-3" style={{ color: C.gold }}>Con la bendición de</p>
            <h2 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso }}>Nuestros Padres</h2>
            <GoldDivider slim />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              {[
                { label: "Padre de la Novia", name: data.parents?.[0]?.name },
                { label: "Padres del Novio",  name: data.parents?.[1]?.name },
              ].map((parent, idx) => {
                const corners = [
                  { pos: "top-2 left-2",    path: "M1 8 L1 1 L8 1" },
                  { pos: "top-2 right-2",   path: "M15 8 L15 1 L8 1" },
                  { pos: "bottom-2 left-2", path: "M1 8 L1 15 L8 15" },
                  { pos: "bottom-2 right-2",path: "M15 8 L15 15 L8 15" },
                ];
                return (
                  <div key={idx} className="relative text-center overflow-hidden transition-all duration-400 hover:-translate-y-1"
                    style={{ backgroundColor: "rgba(251,247,241,0.95)", border: `1px solid ${C.gold}45`, boxShadow: `0 6px 24px ${C.espresso}0D`, borderRadius: "2px" }}>
                    {corners.map(({ pos, path }, i) => (
                      <svg key={i} className={`absolute ${pos} opacity-40`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d={path} stroke={C.gold} strokeWidth="1.2" />
                      </svg>
                    ))}
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${C.gold}70, transparent)` }} />
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url(${ASSETS.relief})`, backgroundSize: "cover" }} />
                    <div className="relative z-10 px-7 py-8">
                      <p className="text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: C.cafeClaro, fontWeight: 600 }}>{parent.label}</p>
                      <div className="w-8 h-px mx-auto mb-4 opacity-60" style={{ backgroundColor: C.cafe }} />
                      <div className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso, fontWeight: 500 }}>
                        {parent.name?.split('·').map((n, i) => (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>{n.trim()}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. MOMENTOS — Composición editorial de revista
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-5 cafe-reveal"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0" style={{ background: "rgba(251,247,241,0.3)", pointerEvents: "none" }} />
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: C.gold }}>✦ Nuestra historia ✦</p>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso }}>
                Momentos especiales
              </h2>
              <div className="cafe-sky-accent w-20 mx-auto mt-3" />
              <div className="w-12 h-px mx-auto mt-1" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
            </div>

            {/* Foto protagonista */}
            <div className="relative overflow-hidden mb-3 cafe-card-hover"
              style={{ borderRadius: "2px", border: `1px solid ${C.gold}45`, boxShadow: `0 30px 90px ${C.espresso}25, 0 0 0 1px ${C.champagne}30` }}>
              <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: `linear-gradient(to bottom, rgba(44,26,14,0.02) 0%, transparent 25%, rgba(44,26,14,0.45) 100%)` }} />
              <img src={ASSETS.photoPareja} alt="Ayde y Octavio"
                className="w-full cafe-img-reveal"
                style={{ height: "min(460px, 65vw)", objectFit: "cover", objectPosition: "center top" }} />
              {/* Firma flotante */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 z-20"
                style={{ background: `linear-gradient(to top, ${C.espresso}82 0%, transparent 100%)` }}>
                <p className="text-white text-lg italic text-center" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}>
                  "Un amor para siempre"
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-4 h-px" style={{ backgroundColor: C.goldLight }} />
                  <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: C.goldLight }}>Ayde &amp; Octavio · 2027</span>
                  <div className="w-4 h-px" style={{ backgroundColor: C.goldLight }} />
                </div>
              </div>
            </div>

            {/* Fila de dos secundarias */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden cafe-card-hover"
                style={{ borderRadius: "2px", border: `1px solid ${C.gold}35`, boxShadow: `0 10px 28px ${C.espresso}10` }}>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: `linear-gradient(135deg, ${C.champagne}08, transparent 50%)` }} />
                <img src={ASSETS.photoAbrazo} alt="Ayde y Octavio"
                  className="w-full cafe-img-reveal"
                  style={{ height: "min(200px, 46vw)", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div className="relative overflow-hidden cafe-card-hover"
                style={{ borderRadius: "2px", border: `1px solid ${C.gold}35`, boxShadow: `0 10px 28px ${C.espresso}10` }}>
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: `linear-gradient(225deg, ${C.champagne}08, transparent 50%)` }} />
                <img src={ASSETS.photoAnillos} alt="Anillos"
                  className="w-full cafe-img-reveal"
                  style={{ height: "min(200px, 46vw)", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            5. CUENTA REGRESIVA — bloque oscuro premium
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-20 px-6 overflow-hidden cafe-reveal"
          style={{ background: `linear-gradient(150deg, ${C.moka} 0%, ${C.espresso} 100%)` }}>
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute top-0 right-0 opacity-[0.06] pointer-events-none cafe-float"
            style={{ width: "200px", transform: "translate(20%, -15%)", animationDelay: "4s" }} />

          <div className="relative z-10 max-w-lg mx-auto text-center">
            <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: C.goldLight }}>✦ Programa del evento ✦</p>
            <h2 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.ivory, fontWeight: 300 }}>
              El gran día se acerca
            </h2>
            <GoldDivider dark />

            <div className="relative overflow-hidden px-5 py-7 mt-2"
              style={{ border: `1px solid ${C.goldLight}28`, borderRadius: "2px", backgroundColor: "rgba(44,26,14,0.45)", backdropFilter: "blur(10px)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.goldLight}45, transparent)` }} />
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.goldLight}25, transparent)` }} />
              <div style={{ color: C.ivory, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                <CountdownTimer targetDate="2027-01-30T11:00:00" />
              </div>
            </div>

            <p className="text-[9px] tracking-[0.28em] uppercase mt-6" style={{ color: C.champagne, opacity: 0.65 }}>
              Sábado · 30 de Enero · 2027
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6. CEREMONIAS — Tarjetas formales de evento
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 relative cafe-reveal overflow-hidden"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(251,247,241,0.3)", pointerEvents: "none" }} />
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute top-1/2 left-0 opacity-45 pointer-events-none cafe-float"
            style={{ width: "min(55vw, 240px)", transform: "translate(-38%, -50%) scaleX(-1) rotate(-8deg)", animationDelay: "1s" }} />

          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: C.gold }}>Nuestras ceremonias</p>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso }}>
                Lugar &amp; Fecha
              </h2>
              <GoldDivider slim />
              <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: C.textMuted }}>Sábado 30 de enero de 2027</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CafeCeremonyCard
                type="religiosa" name="Iglesia de San Francisco"
                address="Chilpancingo de los Bravo, Guerrero" time="11:00 AM"
                mapsUrl="https://maps.app.goo.gl/8H6AhEvHzdskSbsq8?g_st=ic"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.moka} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L10 6H4l2 4-4 2 4 1-2 4h16l-2-4 4-1-4-2 2-4h-6L12 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 22V14a2 2 0 014 0v8" /></svg>}
              />
              <CafeCeremonyCard
                type="civil" name="Salón Pérgolas"
                address="Chilpancingo de los Bravo, Guerrero" time="7:00 PM"
                mapsUrl="https://share.google/lWcYnJDAivrdC6w2I"
                icon={<img src={ASSETS.itineraryRings} alt="" className="w-6 h-6 object-contain" style={{ filter: "sepia(1) saturate(2) hue-rotate(5deg) brightness(0.7)" }} />}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            7. FOTO EDITORIAL PAREJA
        ══════════════════════════════════════════════════════════ */}
        <section className="px-5 pb-4 cafe-reveal"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(251,247,241,0.25)", pointerEvents: "none" }} />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="relative overflow-hidden cafe-card-hover"
              style={{ borderRadius: "2px", border: `1px solid ${C.gold}42`, boxShadow: `0 22px 65px ${C.espresso}18` }}>
              <img src={ASSETS.photoIglesia} alt="Ayde y Octavio" className="w-full cafe-img-reveal"
                style={{ height: "min(400px, 60vw)", objectFit: "cover", objectPosition: "center top" }} />
              <div className="absolute inset-0 flex items-end"
                style={{ background: "linear-gradient(to top, rgba(44,26,14,0.72) 0%, rgba(44,26,14,0.1) 50%, transparent 100%)" }}>
                <div className="p-5 w-full text-center">
                  <p className="text-white text-xl italic mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}>
                    "Un amor para siempre"
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-px" style={{ backgroundColor: C.goldLight }} />
                    <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: C.goldLight }}>Ayde &amp; Octavio · 2027</span>
                    <div className="w-5 h-px" style={{ backgroundColor: C.goldLight }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            8. ITINERARIO — Programa elegante de boda (oscuro)
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-16 px-6 overflow-hidden cafe-reveal"
          style={{ background: `linear-gradient(170deg, ${C.espresso} 0%, ${C.moka} 70%, #4A2810 100%)` }}>
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute bottom-0 left-0 pointer-events-none opacity-[0.07] cafe-float-slow"
            style={{ width: "220px", transform: "translate(-20%, 20%) scaleX(-1)", animationDelay: "2s" }} />

          <div className="relative z-10 max-w-md mx-auto">
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: C.goldLight }}>Programa del día</p>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.ivory, fontWeight: 300 }}>
                Itinerario
              </h2>
              <GoldDivider dark slim />
            </div>

            {/* Timeline con línea vertical */}
            <div className="relative pl-12">
              <div className="cafe-timeline-line" />

              {[
                { time: "11:00 AM", label: "Boda Religiosa",    sub: "Iglesia de San Francisco" },
                { time: "7:00 PM",  label: "Boda Civil",        sub: "Salón Pérgolas" },
                { time: "8:30 PM",  label: "Recepción y Cena",  sub: "Salón Pérgolas" },
              ].map((item, idx) => (
                <div key={idx} className={`relative flex gap-4 text-left ${idx < 2 ? "mb-7" : ""}`}>
                  {/* Dot en la línea */}
                  <div className="absolute z-10"
                    style={{ left: "-27px", top: "14px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: C.moka, border: `2px solid ${C.goldLight}`, boxShadow: `0 0 10px ${C.gold}65` }} />

                  {/* Card item */}
                  <div className="flex-1 p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: "rgba(44,26,14,0.42)", border: `1px solid ${C.goldLight}20`, borderRadius: "2px", backdropFilter: "blur(4px)" }}>
                    <span className="block text-[8px] tracking-[0.28em] uppercase mb-0.5" style={{ color: C.goldLight }}>{item.time}</span>
                    <span className="block text-lg leading-tight mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.ivory }}>{item.label}</span>
                    <span className="block text-xs" style={{ color: C.champagne, opacity: 0.6 }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            9. CONFIRMACIÓN RSVP — tarjeta ceremonial premium
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 text-center relative cafe-reveal"
          style={{ backgroundImage: `url(${ASSETS.paper})`, backgroundSize: "cover", backgroundPosition: "center" }}
          id="confirmar">
          <div style={{ position: "absolute", inset: 0, background: "rgba(251,247,241,0.35)", pointerEvents: "none" }} />

          <div className="max-w-md mx-auto relative z-10 overflow-hidden"
            style={{ borderRadius: "2px", border: `1px solid ${C.gold}55`, boxShadow: `0 12px 44px ${C.espresso}14`, backgroundColor: "rgba(251,247,241,0.94)" }}>
            {/* Corner ornaments */}
            {[
              { pos: "top-2.5 left-2.5",    path: "M1 8 L1 1 L8 1" },
              { pos: "top-2.5 right-2.5",   path: "M15 8 L15 1 L8 1" },
              { pos: "bottom-2.5 left-2.5", path: "M1 8 L1 15 L8 15" },
              { pos: "bottom-2.5 right-2.5",path: "M15 8 L15 15 L8 15" },
            ].map(({ pos, path }, i) => (
              <svg key={i} className={`absolute ${pos} opacity-30`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={path} stroke={C.gold} strokeWidth="1.2" />
              </svg>
            ))}
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` }} />
            {/* Relief bg */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url(${ASSETS.relief})`, backgroundSize: "cover" }} />
            {/* Bottom sky */}
            <div className="absolute bottom-0 left-0 right-0 cafe-sky-accent" />

            <div className="relative z-10 px-7 py-9 sm:px-10">
              <p className="text-[9px] tracking-[0.42em] uppercase mb-4" style={{ color: C.gold }}>
                ✦ Confirmación de asistencia ✦
              </p>

              {/* Sello como ornamento */}
              <img src={ASSETS.seal} alt="" aria-hidden="true" className="w-14 h-14 mx-auto mb-4 opacity-85" />

              <h2 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.espresso }}>
                Confirmar Asistencia
              </h2>
              <GoldDivider slim />

              <p className="text-sm mb-5" style={{ color: C.textMuted, lineHeight: "1.78" }}>
                Favor de confirmar su asistencia y agregar los nombres de los asistentes.
              </p>

              {/* Info chips */}
              <div className="space-y-2 mb-7">
                <div className="flex items-center justify-center gap-2 py-2 px-4 mx-auto w-fit"
                  style={{ backgroundColor: `${C.champagne}50`, border: `1px solid ${C.gold}35` }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                  </svg>
                  <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: C.moka }}>Pase válido para 2 personas</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-2 px-4 mx-auto w-fit"
                  style={{ backgroundColor: `${C.skyLight}35`, border: `1px solid ${C.sky}40` }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.sky} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="text-[9px] tracking-[0.18em] uppercase" style={{ color: C.cafeClaro }}>Confirmar antes de octubre 2026</span>
                </div>
              </div>

              {/* CTA principal */}
              <a href={hasForm ? RSVP_FORM_URL : "#confirmar"}
                target={hasForm ? "_blank" : "_self"} rel="noopener noreferrer"
                className={`cafe-cta-glow w-full flex items-center justify-center gap-3 px-8 py-4 font-medium text-[10px] tracking-[0.18em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-4 ${hasForm ? "" : "cursor-default"}`}
                style={{ background: `linear-gradient(135deg, ${C.espresso}, ${C.moka})`, color: C.ivory, borderRadius: "1px" }}
                onClick={!hasForm ? (e) => e.preventDefault() : undefined}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Confirmar asistencia
              </a>

              {/* Separador contacto alterno */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px" style={{ backgroundColor: `${C.latte}22` }} />
                <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: C.textLight }}>contacto alterno</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${C.latte}22` }} />
              </div>

              {/* WhatsApp alterno */}
              <a href={`https://wa.me/${data.rsvpWhatsapp}?text=Hola%2C%20quisiera%20comunicarme%20sobre%20la%20boda%20de%20Ayde%20y%20Octavio.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[9px] tracking-wider uppercase transition-all duration-300 hover:opacity-60"
                style={{ color: C.textMuted }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar por WhatsApp
              </a>

              <p className="text-[8px] text-center mt-4 px-2 leading-relaxed" style={{ color: C.textLight, fontStyle: "italic" }}>
                En caso de no poder asistir, favor de avisar con un mes de anticipación.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            10. CIERRE — Final premium en oscuro
        ══════════════════════════════════════════════════════════ */}
        <section className="relative py-20 px-6 text-center overflow-hidden cafe-reveal"
          style={{ background: `linear-gradient(160deg, ${C.espresso} 0%, ${C.moka} 60%, ${C.cafe} 100%)` }}>
          {/* Florales esquinas */}
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute top-0 left-0 opacity-[0.09] pointer-events-none cafe-float-slow"
            style={{ width: "240px", transform: "translate(-30%, -20%) scaleX(-1)", animationDelay: "0.5s" }} />
          <img src={ASSETS.floral} alt="" aria-hidden="true"
            className="absolute bottom-0 right-0 opacity-[0.07] pointer-events-none cafe-float"
            style={{ width: "200px", transform: "translate(25%, 20%)", animationDelay: "3s" }} />
          {/* Watercolor overlay */}
          <div className="absolute inset-0 cafe-watercolor-shimmer pointer-events-none"
            style={{ backgroundImage: `url(${ASSETS.watercolor})`, backgroundSize: "cover", mixBlendMode: "soft-light" }} />

          <div className="relative z-10 max-w-sm mx-auto">
            <GoldDivider dark slim />
            {/* Sello grande */}
            <img src={ASSETS.seal} alt="Sello Ayde & Octavio"
              className="w-28 h-28 mx-auto my-6 drop-shadow-2xl opacity-90 cafe-float-slow"
              style={{ animationDelay: "1s", filter: "brightness(1.08)" }} />

            <p className="text-base italic mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldLight }}>
              Con todo nuestro amor,
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 10vw, 3rem)", color: C.ivory, fontWeight: 300, letterSpacing: "-0.01em" }}>
              Ayde &amp; Octavio
            </p>
            <GoldDivider dark slim />
            <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: C.champagne, opacity: 0.7 }}>
              30 · Enero · 2027
            </p>
            <p className="text-[8px] tracking-[0.22em] uppercase" style={{ color: C.latte, opacity: 0.45 }}>
              Chilpancingo de los Bravo, Guerrero
            </p>
            <GoldDivider dark slim />
          </div>
        </section>

        {/* Botón flotante RSVP */}
        <div className="fixed bottom-6 right-4 z-40" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <a href={hasForm ? RSVP_FORM_URL : "#confirmar"}
            target={hasForm ? "_blank" : "_self"} rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cafe-cta-glow"
            style={{ background: C.espresso, color: C.goldLight, border: `1.5px solid ${C.gold}80`, borderRadius: "50%" }}
            aria-label="Confirmar asistencia">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </InvitationLayout>
  );
}
