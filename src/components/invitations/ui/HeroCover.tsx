import React from "react";
import { cn } from "@/lib/utils";

interface HeroCoverProps {
  title: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
  className?: string;
  titleClassName?: string;
  overlayClassName?: string;
}

const HeroCover: React.FC<HeroCoverProps> = ({
  title,
  subtitle,
  date,
  imageUrl,
  className,
  titleClassName,
  overlayClassName,
}) => {
  return (
    <div className={cn("relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden", className)}>
      {/* Background Image */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      
      {/* Overlay */}
      <div className={cn("absolute inset-0 z-10", overlayClassName || "bg-black/40")} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both">
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-medium text-[var(--ap-primary)]">
            {subtitle}
          </p>
        )}
        
        <h1 className={cn("text-5xl md:text-7xl font-serif text-[var(--ap-text)] leading-tight", titleClassName)}>
          {title}
        </h1>
        
        {date && (
          <div className="pt-4 border-t border-[var(--ap-primary)]/30 w-32 mx-auto">
            <p className="text-sm md:text-base tracking-[0.2em] uppercase text-[var(--ap-text)] opacity-90">
              {date}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCover;
