"use client";

import { Bed, Bath, Maximize, Calendar, Car, Ruler } from "lucide-react";
import type { Property } from "@/types";

interface PropertyFactsProps {
  property: Property;
}

export function PropertyFacts({ property }: PropertyFactsProps) {
  const facts = [
    {
      icon: <Bed className="size-5 text-emerald-800" />,
      value: property.bedrooms,
      label: "Bedrooms",
      sub: "Beds",
    },
    {
      icon: <Bath className="size-5 text-emerald-800" />,
      value: property.bathrooms,
      label: "Bathrooms",
      sub: "Baths",
    },
    {
      icon: <Maximize className="size-5 text-emerald-800" />,
      value: property.sqft.toLocaleString(),
      label: "Square Feet",
      sub: "Sq Ft",
    },
    {
      icon: <Calendar className="size-5 text-emerald-800" />,
      value: property.yearBuilt,
      label: "Year Built",
      sub: "Built",
    },
    {
      icon: <Car className="size-5 text-emerald-800" />,
      value: property.garage > 0 ? property.garage : "None",
      label: "Garage Space",
      sub: "Garage",
    },
    {
      icon: <Ruler className="size-5 text-emerald-800" />,
      value: property.lotSize || "N/A",
      label: "Lot Size",
      sub: "Lot",
    },
  ];

  return (
    <div className="grid grid-cols-3 md:flex md:flex-wrap items-center justify-between gap-y-6 gap-x-2 rounded-2xl border border-neutral-100 bg-white p-5 md:px-8 shadow-xs">
      {facts.map((fact, idx) => (
        <div 
          key={idx} 
          className="flex flex-col items-center text-center md:items-start md:text-left md:flex-1 md:first:pl-0 md:pl-6 md:border-l md:first:border-l-0 border-neutral-100"
        >
          <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-50 mb-2.5 shrink-0">
            {fact.icon}
          </div>
          <span className="text-base font-bold text-neutral-900 tracking-tight">
            {fact.value}
          </span>
          <span className="text-xs font-medium text-neutral-400 mt-0.5 md:hidden">
            {fact.sub}
          </span>
          <span className="text-xs font-medium text-neutral-400 mt-0.5 hidden md:inline">
            {fact.label}
          </span>
        </div>
      ))}
    </div>
  );
}
