import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Church, FileText, Heart, Music2, Pause } from "lucide-react";
import InvitationLayout from "@/components/invitations/layout/InvitationLayout";
import CountdownTimer from "@/components/invitations/CountdownTimer";
import { AYDE_OCTAVIO_CREAM_SKYBLUE as data } from "@/data/aydeOctavioCreamSkyblue";
import { creamSkyblueTheme } from "@/styles/tokens/creamSkyblue";
import heroPhoto from "@/assets/invitations/cafe-espresso/fotos/HORIZONTAL PRINCIPAL.webp";
import portraitPhoto from "@/assets/invitations/cafe-espresso/fotos/VERTICAL PRINCIPAL.webp";
import bouquetPhoto from "@/assets/invitations/cafe-espresso/fotos/VERTICAL 2.webp";
import beachPhoto from "@/assets/invitations/cafe-espresso/fotos/HORIZONTAL (3).webp";
import closingPhoto from "@/assets/invitations/cafe-espresso/fotos/HORIZONTAL (5).webp";
import floral from "@/assets/invitations/cafe-espresso/arreglo_floral_ayde_octavio_png_sin_fondo.png";
import music from "@/assets/invitations/cafe-espresso/hasta-mi-final.mp3";
import styles from "./WeddingCreamSkyblue.module.css";

function Monogram() {
  return <span className={styles.monogram} aria-label="Ayde y Octavio">A<span>&</span>O</span>;
}

function Divider() {
  return <div className={styles.divider} aria-hidden="true"><span />✧<span /></div>;
}

export default function WeddingCreamSkyblue() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const introButton = useRef<HTMLButtonElement>(null);
  const hero = useRef<HTMLHeadingElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const [musicError, setMusicError] = useState("");

  useEffect(() => { introButton.current?.focus(); }, []);
  useEffect(() => {
    if (!opened) return;
    hero.current?.focus({ preventScroll: true });
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const elements = page.current?.querySelectorAll("[data-reveal]") ?? [];
    elements.forEach(element => {
      element.classList.add(styles.waiting);
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach(element => element.classList.remove(styles.waiting));
    };
  }, [opened]);

  const playMusic = async () => {
    try { await audio.current?.play(); setMusicError(""); }
    catch { setMusicError("La música no pudo iniciar. Puedes volver a intentarlo."); }
  };
  const openInvitation = () => {
    setOpened(true);
    window.scrollTo(0, 0);
    void playMusic();
  };

  return (
    <InvitationLayout theme={creamSkyblueTheme} className={styles.page}
      pageTitle="Ayde & Octavio · 30 de enero de 2027"
      pageDescription="Un amor para siempre. Celebra con nosotros el 30 de enero de 2027 en Chilpancingo de los Bravo.">
      <audio ref={audio} src={music} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {!opened ? (
        <section className={styles.opening} aria-label="Abrir invitación de Ayde y Octavio">
          <img src={floral} alt="" className={styles.openingFlowers} />
          <p className={styles.eyebrow}>Una invitación para ti</p>
          <div className={styles.envelope}>
            <Monogram />
            <h1>Ayde <i>&</i> Octavio</h1>
            <p>30 de enero de 2027</p>
            <button ref={introButton} className={styles.primaryButton} onClick={openInvitation}>Abrir invitación <ArrowUpRight size={16} /></button>
          </div>
          <p className={styles.openingHint}>Un amor para siempre</p>
        </section>
      ) : (
        <div ref={page}>
          <header className={styles.header}>
            <a href="#inicio" aria-label="Volver al inicio"><Monogram /></a>
            <span>30 · 01 · 2027</span>
            <a href="#confirmacion" className={styles.headerLink}>Confirmar <ArrowUpRight size={14} /></a>
          </header>

          <section id="inicio" className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Con todo nuestro amor · Nuestra boda</p>
              <h1 ref={hero} tabIndex={-1}>Ayde <span>&</span> Octavio</h1>
              <p className={styles.heroPhrase}>Un amor para siempre</p>
              <Divider />
              <p className={styles.heroDate}>Sábado, 30 de enero de 2027</p>
              <p className={styles.location}>Chilpancingo de los Bravo, Guerrero</p>
              <a className={styles.explore} href="#bienvenida">Descubre nuestra invitación <ArrowDown size={14} /></a>
            </div>
            <figure className={styles.heroImage}>
              <img src={heroPhoto} alt="Ayde y Octavio tomados de las manos frente al mar" width={3000} height={2000} loading="eager" />
              <figcaption>Juntos, hacia nuestro para siempre.</figcaption>
              <span className={styles.photoSeal} aria-hidden="true">A & O</span>
            </figure>
            <img src={floral} alt="" className={styles.heroFlowers} />
          </section>

          <section id="bienvenida" className={styles.letter} data-reveal>
            <span className={styles.sectionNumber}>I / LA INVITACIÓN</span>
            <h2>La alegría de compartir<br /><em>este día contigo.</em></h2>
            <p>{data.customMessage}</p>
            <Divider />
            <div className={styles.parents}>
              <div><p className={styles.eyebrow}>Padre de la novia</p><h3>{data.parents?.[0]?.name}</h3></div>
              <div><p className={styles.eyebrow}>Padres del novio</p><h3>{data.parents?.[1]?.name.split(" · ").map(name => <span key={name}>{name}</span>)}</h3></div>
            </div>
          </section>

          <section className={styles.story} aria-labelledby="historia-titulo" data-reveal>
            <div className={styles.storyHeading}><span className={styles.sectionNumber}>II / NUESTRA HISTORIA</span><h2 id="historia-titulo">Contigo,<br /><em>todo es más bonito.</em></h2></div>
            <figure className={styles.portrait}><img src={portraitPhoto} alt="Ayde y Octavio entre palmeras" width={2000} height={3000} loading="lazy" decoding="async" /><figcaption>Una vida. Mil momentos. Tú y yo.</figcaption></figure>
            <figure className={styles.bouquet}><img src={bouquetPhoto} alt="Ayde y Octavio compartiendo un beso detrás de un ramo blanco" width={2000} height={3000} loading="lazy" decoding="async" /><figcaption>Lo nuestro, para siempre.</figcaption></figure>
            <p className={styles.storyQuote}>“Un amor<br />para siempre”</p>
          </section>

          <section className={styles.countdown} data-reveal>
            <p className={styles.eyebrow}>Cada vez más cerca</p>
            <h2>Nos vemos en el altar</h2>
            <CountdownTimer targetDate={data.eventDate} accentColor="#304B5A" labelColor="#526976" />
            <p className={styles.countdownDate}>30 de enero de 2027 · 7:00 pm</p>
          </section>

          <section className={styles.program} aria-labelledby="programa-titulo" data-reveal>
            <div className={styles.programHeading}>
              <span className={styles.sectionNumber}>III / EL GRAN DÍA</span>
              <h2 id="programa-titulo">Nuestro <em>sí, acepto.</em></h2>
              <p>Dos momentos, una misma historia.</p>
            </div>
            <div className={styles.programSheet}>
              <div className={styles.programTop}><Monogram /><span>Programa de ceremonia<br /><strong>Sábado · 30 de enero de 2027</strong></span></div>
              <ol className={styles.ceremonies}>
                {data.ceremonies.map(ceremony => (
                  <li key={ceremony.id}>
                    <div className={styles.ceremonyIcon} aria-hidden="true">{ceremony.id === "misa" ? <Church strokeWidth={1} size={30} /> : <Heart strokeWidth={1} size={30} />}</div>
                    <div className={styles.ceremonyBody}>
                      <time dateTime={ceremony.dateTime}>{ceremony.time}</time>
                      <h3>{ceremony.title}</h3>
                      <p>{ceremony.venue}</p>
                      <span className={styles.venueCity}>Chilpancingo de los Bravo, Guerrero</span>
                      <a href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver ubicación de ${ceremony.venue} en Google Maps (nueva pestaña)`}>Ver ubicación <ArrowUpRight size={14} /></a>
                    </div>
                    <span className={styles.ceremonyNumber} aria-hidden="true">{ceremony.number}</span>
                  </li>
                ))}
              </ol>
              <Divider />
            </div>
          </section>

          <figure className={styles.beach} data-reveal>
            <img src={beachPhoto} alt="Ayde y Octavio sonriendo juntos en la playa" width={3000} height={2000} loading="lazy" decoding="async" />
            <figcaption>El mejor lugar siempre será a tu lado.</figcaption>
          </figure>

          <section id="confirmacion" className={styles.rsvp} data-reveal aria-labelledby="confirmacion-titulo">
            <img src={floral} alt="" className={styles.rsvpFlowers} />
            <div className={styles.rsvpCard}>
              <span className={styles.sectionNumber}>IV / TE ESPERAMOS</span>
              <h2 id="confirmacion-titulo">Nos haría muy felices<br /><em>contar contigo.</em></h2>
              <p className={styles.pass}>Pase válido para 2 personas</p>
              <p>Favor de confirmar su asistencia y agregar los nombres de los asistentes.</p>
              <p className={styles.rsvpDetails}>Indica si asistirán 1 o 2 personas y comparte un mensaje para los novios.</p>
              <a className={styles.primaryButton} href={data.rsvpUrl} target="_blank" rel="noopener noreferrer" aria-describedby="forms-nota">Confirmar asistencia <ArrowUpRight size={16} /></a>
              <p id="forms-nota" className={styles.formsNote}>Google Forms · Se abre en una nueva pestaña</p>
              <p className={styles.deadline}>Fecha límite para confirmar: octubre de 2026</p>
              <div className={styles.rsvpNotice}><p>En caso de no poder asistir, favor de avisar con un mes de anticipación.</p><p>Números de contacto de los novios: por confirmar.</p></div>
            </div>
          </section>

          <footer className={styles.closing} data-reveal>
            <figure><img src={closingPhoto} alt="Ayde y Octavio abrazados mirando al horizonte" width={3000} height={2000} loading="lazy" decoding="async" /></figure>
            <div><Monogram /><p className={styles.eyebrow}>Con todo nuestro amor</p><h2>Ayde <i>&</i> Octavio</h2><p className={styles.closingPhrase}>Un amor para siempre</p><Divider /><p>30 · ENERO · 2027</p><span>Chilpancingo de los Bravo, Guerrero</span></div>
          </footer>
          <button className={styles.musicButton} onClick={() => playing ? audio.current?.pause() : void playMusic()} aria-label={playing ? "Pausar música" : "Reproducir música"} aria-pressed={playing}>{playing ? <Pause size={18} /> : <Music2 size={18} />}</button>
          <a href={data.rsvpUrl} target="_blank" rel="noopener noreferrer" className={styles.floatingRsvp} aria-label="Confirmar asistencia en Google Forms (nueva pestaña)"><FileText size={18} /></a>
          <p className={styles.musicError} role="status">{musicError}</p>
        </div>
      )}
    </InvitationLayout>
  );
}
