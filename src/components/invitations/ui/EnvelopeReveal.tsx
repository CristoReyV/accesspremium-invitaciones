import { useState } from "react";
import { cn } from "@/lib/utils";
import { MailOpen } from "lucide-react";

interface EnvelopeRevealProps {
  onOpen: () => void;
  names: string;
  date: string;
}

export default function EnvelopeReveal({ onOpen, names, date }: EnvelopeRevealProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Esperar a que termine la animación para desencadenar el estado padre
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-[var(--ap-bg)] bg-paper-texture transition-opacity duration-1000",
      isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      <div className={cn(
        "relative flex flex-col items-center justify-center p-8 max-w-sm mx-auto text-center transition-all duration-1000 transform",
        isOpening ? "scale-110 translate-y-8" : "scale-100 translate-y-0"
      )}>
        {/* Sello o Emblema */}
        <div className="w-20 h-20 rounded-full border-2 border-[var(--ap-primary)] flex items-center justify-center mb-8 shadow-md bg-[var(--ap-bg-alt)] animate-float-subtle">
          <span className="font-serif text-3xl text-[var(--ap-primary)]">
            {names.charAt(0)}
          </span>
        </div>

        <p className="font-script text-3xl md:text-4xl text-[var(--ap-text)] mb-2">
          {names}
        </p>
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--ap-text-muted)] mb-12">
          {date}
        </p>

        <button
          onClick={handleOpen}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--ap-primary)] text-white shadow-lg shadow-[var(--ap-primary)]/20 hover:scale-105 transition-all duration-300"
        >
          <MailOpen className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          <span className="font-medium tracking-wide uppercase text-sm">Abrir Invitación</span>
        </button>
      </div>
    </div>
  );
}
