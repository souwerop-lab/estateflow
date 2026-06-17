"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import type { Property } from "@/types";

interface SimilarListingsProps {
  properties: Property[];
  currentId: string;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function SimilarListings({
  properties,
  currentId,
  isFavorite,
  onToggleFavorite,
}: SimilarListingsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter out the current property and get up to 4 properties of the same type or location
  const similar = properties
    .filter((p) => p.id !== currentId)
    .slice(0, 4);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  if (similar.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-bold text-neutral-900">
          Similar Properties
        </h3>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center size-8 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-emerald-800 hover:border-neutral-300 transition-colors shadow-xs"
          >
            <ChevronLeft className="size-4.5" />
          </button>
          <button
            onClick={scrollRight}
            className="flex items-center justify-center size-8 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-emerald-800 hover:border-neutral-300 transition-colors shadow-xs"
          >
            <ChevronRight className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Grid Container */}
      <div
        ref={containerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0 snap-x snap-mandatory"
      >
        {similar.map((property) => (
          <div
            key={property.id}
            className="w-[280px] sm:w-[320px] shrink-0 snap-start snap-always"
          >
            <PropertyCard
              property={property}
              isFavorite={isFavorite(property.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
