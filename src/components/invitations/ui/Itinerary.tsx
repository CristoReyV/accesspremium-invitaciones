import React from "react";
import { cn } from "@/lib/utils";
import type { ItineraryItem } from "@/types";
import { Award, Camera, Clock, Church, Flag, Gift, GraduationCap, Heart, Wine, Utensils, Music, Moon, PartyPopper, Sparkles } from "lucide-react";

interface ItineraryProps {
  items: ItineraryItem[];
  className?: string;
  itemClassName?: string;
  lineClassName?: string;
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case "church": return <Church className="w-5 h-5" />;
    case "glass-water": return <Wine className="w-5 h-5" />;
    case "utensils": return <Utensils className="w-5 h-5" />;
    case "music": return <Music className="w-5 h-5" />;
    case "moon": return <Moon className="w-5 h-5" />;
    case "party": return <PartyPopper className="w-5 h-5" />;
    case "flag": return <Flag className="w-5 h-5" />;
    case "camera": return <Camera className="w-5 h-5" />;
    case "gift": return <Gift className="w-5 h-5" />;
    case "heart": return <Heart className="w-5 h-5" />;
    case "graduation-cap": return <GraduationCap className="w-5 h-5" />;
    case "award": return <Award className="w-5 h-5" />;
    case "sparkles": return <Sparkles className="w-5 h-5" />;
    default: return <Clock className="w-5 h-5" />;
  }
};

const Itinerary: React.FC<ItineraryProps> = ({ items, className, itemClassName, lineClassName }) => {
  return (
    <div className={cn("max-w-md mx-auto w-full py-10", className)}>
      <div className="relative">
        {/* Vertical Line */}
        <div className={cn("absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-[var(--ap-primary)]/30", lineClassName)} />

        <div className="space-y-8">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex items-center justify-between w-full">
                
                {/* Left Side */}
                <div className={cn("w-5/12 text-right pr-4", isEven ? "opacity-100" : "opacity-0 invisible")}>
                  {isEven && (
                    <>
                      <p className="font-serif text-lg text-[var(--ap-text)] font-bold">{item.time}</p>
                      <p className="text-sm text-[var(--ap-text-muted)] mt-1">{item.label}</p>
                    </>
                  )}
                </div>

                {/* Center Icon */}
                <div className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10",
                  "bg-[var(--ap-bg)] border border-[var(--ap-primary)] text-[var(--ap-primary)]",
                  itemClassName
                )}>
                  {getIcon(item.icon)}
                </div>

                {/* Right Side */}
                <div className={cn("w-5/12 text-left pl-4", !isEven ? "opacity-100" : "opacity-0 invisible")}>
                  {!isEven && (
                    <>
                      <p className="font-serif text-lg text-[var(--ap-text)] font-bold">{item.time}</p>
                      <p className="text-sm text-[var(--ap-text-muted)] mt-1">{item.label}</p>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
