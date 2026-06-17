"use client";

import {
  Waves,
  Dumbbell,
  Car,
  Snowflake,
  Shirt,
  Sun,
  Shield,
  ArrowUpDown,
  Archive,
  Flame,
  Trees,
  Bell,
  PawPrint,
  Wifi,
  Lock,
  Building,
  Sparkles,
} from "lucide-react";
import { amenities } from "@/data/amenities";
import type { AmenityCategory } from "@/types";

interface AmenitiesListProps {
  amenityIds: string[];
}

// Map Lucide name strings from data to React components
const iconMap: Record<string, React.ReactNode> = {
  waves: <Waves className="size-4" />,
  dumbbell: <Dumbbell className="size-4" />,
  car: <Car className="size-4" />,
  snowflake: <Snowflake className="size-4" />,
  shirt: <Shirt className="size-4" />,
  sun: <Sun className="size-4" />,
  shield: <Shield className="size-4" />,
  "arrow-up-down": <ArrowUpDown className="size-4" />,
  archive: <Archive className="size-4" />,
  flame: <Flame className="size-4" />,
  trees: <Trees className="size-4" />,
  bell: <Bell className="size-4" />,
  "paw-print": <PawPrint className="size-4" />,
  wifi: <Wifi className="size-4" />,
  lock: <Lock className="size-4" />,
  building: <Building className="size-4" />,
};

const categoryLabels: Record<AmenityCategory, string> = {
  interior: "Interior Features",
  exterior: "Exterior Features",
  community: "Community Amenities",
  security: "Safety & Security",
  parking: "Parking",
  utilities: "Utilities & Smart Home",
};

export function AmenitiesList({ amenityIds }: AmenitiesListProps) {
  // Find all active amenities for the property
  const activeAmenities = amenities.filter((a) => amenityIds.includes(a.id));

  // Group by category
  const grouped = activeAmenities.reduce(
    (acc, amenity) => {
      const cat = amenity.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(amenity);
      return acc;
    },
    {} as Record<AmenityCategory, typeof activeAmenities>
  );

  const categories = Object.keys(grouped) as AmenityCategory[];

  if (activeAmenities.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-bold text-neutral-900">
        Property Amenities
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {categoryLabels[category]}
            </h4>
            <ul className="space-y-2.5">
              {grouped[category].map((amenity) => (
                <li
                  key={amenity.id}
                  className="flex items-center gap-2.5 text-sm font-medium text-neutral-700"
                >
                  <div className="flex items-center justify-center size-7 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    {iconMap[amenity.icon] || <Sparkles className="size-4" />}
                  </div>
                  <span>{amenity.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
