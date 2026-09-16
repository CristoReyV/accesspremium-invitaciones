import React from "react";
import { cn } from "@/lib/utils";

interface PhotoGalleryProps {
  photos: string[];
  className?: string;
  imageClassName?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, className, imageClassName }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className={cn("grid gap-4", className)}>
      {photos.map((photo, idx) => (
        <div 
          key={idx} 
          className={cn(
            "relative w-full overflow-hidden rounded-xl shadow-lg aspect-square",
            // Make first photo larger if odd number of photos
            (photos.length % 2 !== 0 && idx === 0) ? "col-span-full aspect-[4/5]" : "col-span-1",
            imageClassName
          )}
        >
          <img 
            src={photo} 
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
