import React from "react";
import { cn } from "@/lib/utils";
import type { DressCode as DressCodeType } from "@/types";
import { Shirt } from "lucide-react";

interface DressCodeProps {
  dressCode: DressCodeType;
  className?: string;
  iconClassName?: string;
  colorsContainerClassName?: string;
}

const DressCode: React.FC<DressCodeProps> = ({ dressCode, className, iconClassName, colorsContainerClassName }) => {
  return (
    <div className={cn("text-center bg-[var(--ap-bg-alt)] border border-[var(--ap-border)] rounded-2xl p-8 shadow-sm", className)}>
      
      <div className={cn("w-14 h-14 mx-auto bg-[var(--ap-bg)] border border-[var(--ap-primary)]/20 rounded-full flex items-center justify-center mb-5", iconClassName)}>
        <Shirt className="w-6 h-6 text-[var(--ap-primary)]" strokeWidth={1.5} />
      </div>

      <h3 className="font-serif text-2xl text-[var(--ap-text)] font-bold mb-2">Código de Vestimenta</h3>
      
      <p className="text-lg font-medium text-[var(--ap-primary)] uppercase tracking-wider mb-4">
        {dressCode.label}
      </p>

      {dressCode.description && (
        <p className="text-sm text-[var(--ap-text-muted)] max-w-sm mx-auto mb-6 leading-relaxed">
          {dressCode.description}
        </p>
      )}

      {/* Suggested Colors */}
      {dressCode.colors && dressCode.colors.length > 0 && (
        <div className={cn("mt-6", colorsContainerClassName)}>
          <p className="text-xs uppercase tracking-widest text-[var(--ap-text-muted)] mb-3">
            Colores sugeridos
          </p>
          <div className="flex justify-center gap-3">
            {dressCode.colors.map((color, idx) => (
              <div 
                key={idx}
                className="w-8 h-8 rounded-full shadow-md border border-white/20"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Avoid Colors */}
      {dressCode.avoidColors && dressCode.avoidColors.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[var(--ap-border)]">
          <p className="text-[10px] uppercase tracking-widest text-[var(--ap-text-muted)] mb-3">
            Por favor evitar
          </p>
          <div className="flex justify-center gap-2 opacity-60">
            {dressCode.avoidColors.map((color, idx) => (
              <div 
                key={idx}
                className="w-6 h-6 rounded-full shadow-inner border border-black/10 relative"
                style={{ backgroundColor: color }}
                title={color}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-red-500/50 rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default DressCode;
