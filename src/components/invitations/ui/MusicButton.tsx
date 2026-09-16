import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicButtonProps {
  /** Ruta del archivo de audio (ej. /audio/wedding.mp3). Si no se provee, funciona de forma simulada. */
  audioSrc?: string;
  /** Estado inicial de reproducción (requiere interacción del usuario en la mayoría de navegadores) */
  autoPlay?: boolean;
  className?: string;
}

export default function MusicButton({ audioSrc, autoPlay = false, className }: MusicButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      if (autoPlay) {
        // Los navegadores bloquean autoplay sin interacción, pero lo intentamos
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, autoPlay]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <div className={cn("fixed bottom-24 right-4 z-40 transition-all duration-500", className)}>
      <button
        onClick={toggleMusic}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-500 relative",
          isPlaying ? "bg-[var(--ap-primary)] text-white shadow-lg animate-breathe" : "bg-white/80 text-[var(--ap-text)] border border-[var(--ap-primary)]/20"
        )}
        aria-label="Reproducir música"
      >
        {/* Anillo exterior animado si está sonando */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-[var(--ap-primary)] opacity-50 animate-ping" style={{ animationDuration: '3s' }} />
        )}
        
        {isPlaying ? (
          <Music className="w-5 h-5 animate-spin-slow" />
        ) : (
          <Music className="w-5 h-5 opacity-70" />
        )}
      </button>
    </div>
  );
}
