import React from "react";
import { cn } from "@/lib/utils";
import type { Parent, Godparent } from "@/types";

interface ParentsAndGodparentsProps {
  parents?: Parent[];
  godparents?: Godparent[];
  className?: string;
  titleClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
}

const ParentsAndGodparents: React.FC<ParentsAndGodparentsProps> = ({
  parents,
  godparents,
  className,
  titleClassName,
  nameClassName,
  roleClassName,
}) => {
  if (!parents?.length && !godparents?.length) return null;

  return (
    <div className={cn("text-center space-y-10", className)}>
      
      {/* Parents */}
      {parents && parents.length > 0 && (
        <div className="space-y-6">
          <h3 className={cn("text-lg font-serif italic text-[var(--ap-primary)]", titleClassName)}>
            Con la bendición de nuestros padres
          </h3>
          <div className="space-y-4">
            {parents.map((parent, idx) => (
              <div key={idx} className="space-y-1">
                <p className={cn("text-lg font-medium text-[var(--ap-text)]", nameClassName)}>
                  {parent.name}
                </p>
                {parent.role && (
                  <p className={cn("text-xs uppercase tracking-widest text-[var(--ap-text-muted)]", roleClassName)}>
                    {parent.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {parents?.length && godparents?.length ? (
        <div className="w-16 h-px bg-[var(--ap-primary)]/30 mx-auto" />
      ) : null}

      {/* Godparents */}
      {godparents && godparents.length > 0 && (
        <div className="space-y-6">
          <h3 className={cn("text-lg font-serif italic text-[var(--ap-primary)]", titleClassName)}>
            Y nuestros padrinos
          </h3>
          <div className="space-y-4">
            {godparents.map((godparent, idx) => (
              <div key={idx} className="space-y-1">
                <p className={cn("text-lg font-medium text-[var(--ap-text)]", nameClassName)}>
                  {godparent.name}
                </p>
                {godparent.role && (
                  <p className={cn("text-xs uppercase tracking-widest text-[var(--ap-text-muted)]", roleClassName)}>
                    {godparent.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ParentsAndGodparents;
