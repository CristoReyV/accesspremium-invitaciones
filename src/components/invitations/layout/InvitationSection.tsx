// ============================================================
// InvitationSection — Wrapper de sección con animación de scroll
// Cada bloque de la invitación (padres, ubicación, countdown...)
// se envuelve en este componente para ganar la animación de entrada.
// ============================================================

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InvitationSectionProps {
  children: ReactNode;
  className?: string;
  /** ID para anclas o testing */
  id?: string;
  /** Deshabilitar la animación de entrada (útil en el hero) */
  disableAnimation?: boolean;
  /** Retraso de la animación en ms (para efectos escalonados) */
  animationDelay?: number;
}

export default function InvitationSection({
  children,
  className,
  id,
  disableAnimation = false,
  animationDelay = 0,
}: InvitationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(disableAnimation);

  useEffect(() => {
    if (disableAnimation) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Aplicar delay si se especificó
          if (animationDelay > 0) {
            setTimeout(() => setIsVisible(true), animationDelay);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [disableAnimation, animationDelay]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "py-16 px-4 transition-all",
        // Animación base: fade-up
        !disableAnimation && "duration-1000 ease-out",
        !isVisible && "opacity-0 translate-y-12",
        isVisible && "opacity-100 translate-y-0",
        className
      )}
      style={animationDelay ? { transitionDelay: `${animationDelay}ms` } : undefined}
    >
      {children}
    </section>
  );
}
