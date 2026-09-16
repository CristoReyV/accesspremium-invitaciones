import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  /** Fecha objetivo en formato ISO 8601, ej. "2026-11-15T18:00:00" */
  targetDate: string;
  /** Título de la sección encima del countdown. Opcional. */
  title?: string;
  /** Color del número (CSS value). Por defecto usa --ap-primary del tema. */
  accentColor?: string;
  /** Color del texto de las etiquetas. Por defecto usa --ap-text-muted. */
  labelColor?: string;
  /** Clase CSS adicional para el wrapper */
  className?: string;
}

const UNIT_LABELS: Record<string, string> = {
  days: 'Días',
  hours: 'Hrs',
  minutes: 'Min',
  seconds: 'Seg',
};

export default function CountdownTimer({
  targetDate,
  title,
  accentColor,
  labelColor,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      setTimeLeft(
        difference > 0
          ? {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            }
          : { days: 0, hours: 0, minutes: 0, seconds: 0 }
      );
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Colores: props > CSS variables del tema > fallback
  const numberColor = accentColor ?? 'var(--ap-primary, hsl(var(--primary)))';
  const mutedColor = labelColor ?? 'var(--ap-text-muted, hsl(var(--muted-foreground)))';

  return (
    <div className={cn('text-center', className)}>
      {title && (
        <p
          className="uppercase tracking-[0.2em] text-xs font-medium mb-6"
          style={{ color: mutedColor }}
        >
          {title}
        </p>
      )}

      <div className="flex justify-center gap-3 md:gap-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center w-14 md:w-20">
            {/* Número */}
            <span
              className="text-4xl md:text-5xl font-serif font-medium tabular-nums leading-none"
              style={{ color: numberColor }}
            >
              {value.toString().padStart(2, '0')}
            </span>
            {/* Separador */}
            <div
              className="w-full h-px mt-2 mb-2 opacity-30"
              style={{ backgroundColor: numberColor }}
            />
            {/* Etiqueta */}
            <span
              className="text-[9px] uppercase tracking-[0.25em] font-medium"
              style={{ color: mutedColor }}
            >
              {UNIT_LABELS[unit]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
