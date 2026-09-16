import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Music, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  title?: string;
  artist?: string;
  className?: string;
  // Para Fase 3A, no implementamos lógica real de audio, solo visual.
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ title = "Canción Especial", artist = "Artista", className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className={cn(
        "flex items-center gap-4 bg-[var(--ap-bg-alt)] border border-[var(--ap-border)] p-4 rounded-2xl shadow-sm",
        className
      )}
    >
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 shrink-0 rounded-full bg-[var(--ap-primary)] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 translate-x-0.5" fill="currentColor" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--ap-text)] truncate">{title}</p>
        <p className="text-xs text-[var(--ap-text-muted)] truncate mt-0.5">{artist}</p>
        
        {/* Fake progress bar */}
        <div className="w-full h-1 bg-[var(--ap-primary)]/20 rounded-full mt-2 overflow-hidden">
          <div 
            className={cn(
              "h-full bg-[var(--ap-primary)] rounded-full transition-all duration-1000",
              isPlaying ? "w-1/3 animate-pulse" : "w-0"
            )} 
          />
        </div>
      </div>
      
      <div className="shrink-0 opacity-20">
        <Music className="w-8 h-8 text-[var(--ap-primary)]" />
      </div>
    </div>
  );
};

export default MusicPlayer;
