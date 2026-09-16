import { cn } from "@/lib/utils";

interface ElegantDividerProps {
  className?: string;
  variant?: 'simple' | 'ornamental';
}

export default function ElegantDivider({ className, variant = 'ornamental' }: ElegantDividerProps) {
  return (
    <div className={cn("flex items-center justify-center w-full py-8 opacity-70", className)}>
      {variant === 'simple' && (
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[var(--ap-primary)] to-transparent" />
      )}
      
      {variant === 'ornamental' && (
        <div className="flex items-center gap-4">
          <div className="w-16 md:w-24 h-[0.5px] bg-gradient-to-r from-transparent to-[var(--ap-primary)]" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--ap-primary)] animate-breathe">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="currentColor" fillOpacity="0.4" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <div className="w-16 md:w-24 h-[0.5px] bg-gradient-to-l from-transparent to-[var(--ap-primary)]" />
        </div>
      )}
    </div>
  );
}
