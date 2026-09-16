import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloralFrameProps {
  children: ReactNode;
  className?: string;
  /** Tipo de decoración floral. Default: 'corner' */
  variant?: 'corner' | 'top-bottom';
}

export default function FloralFrame({ children, className, variant = 'corner' }: FloralFrameProps) {
  // SVG de rama botánica fina y elegante
  const BranchSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 100C20 90 40 70 50 50C60 30 70 10 100 0" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M30 80C35 70 45 70 50 65C40 65 30 70 30 80Z" fill="currentColor" fillOpacity="0.6" />
      <path d="M50 50C60 45 70 50 75 40C65 40 55 45 50 50Z" fill="currentColor" fillOpacity="0.5" />
      <path d="M70 20C80 15 90 20 95 10C85 10 75 15 70 20Z" fill="currentColor" fillOpacity="0.4" />
      {/* Florituras suaves */}
      <circle cx="20" cy="60" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="80" cy="40" r="0.8" fill="currentColor" opacity="0.2" />
    </svg>
  );

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {variant === 'corner' && (
        <>
          <BranchSVG className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 text-[var(--ap-primary)] opacity-40 rotate-180 pointer-events-none -translate-x-4 -translate-y-4 animate-float-subtle" />
          <BranchSVG className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 text-[var(--ap-primary)] opacity-40 pointer-events-none translate-x-4 translate-y-4 animate-float-subtle" style={{ animationDelay: '1s' }} />
        </>
      )}

      {variant === 'top-bottom' && (
        <>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-12 opacity-30 text-[var(--ap-primary)] flex justify-between items-center pointer-events-none">
            <BranchSVG className="w-16 h-16 rotate-[135deg]" />
            <BranchSVG className="w-16 h-16 -rotate-[45deg]" />
          </div>
        </>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
