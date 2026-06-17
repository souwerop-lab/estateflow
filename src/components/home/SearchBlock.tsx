"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCATIONS } from "@/lib/constants";

const filterPills = [
  { label: "All", value: "all" },
  { label: "Houses", value: "house" },
  { label: "Apartments", value: "apartment" },
  { label: "Condos", value: "condo" },
  { label: "Villas", value: "villa" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SearchBlock() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [priceRange] = useState<[number, number]>([0, 5000000]);

  const formatPriceLabel = (val: number) => {
    if (val === 0) return "$0";
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <section className="relative -mt-8 z-20 section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="section-width"
      >
        <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-5 sm:p-6 md:p-8">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterPills.map((pill) => (
              <button
                key={pill.value}
                type="button"
                onClick={() => setActiveFilter(pill.value)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                  activeFilter === pill.value
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800"
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Search row */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search input */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by address, city, or ZIP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full h-12 pl-10 pr-4 rounded-xl text-sm",
                  "bg-neutral-50 border border-neutral-200",
                  "text-neutral-900 placeholder:text-neutral-400",
                  "hover:border-neutral-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                  "transition-all duration-200 outline-none"
                )}
              />
            </div>

            {/* Location dropdown */}
            <div className="lg:col-span-3 relative">
              <button
                type="button"
                onClick={() => setLocationOpen(!locationOpen)}
                className={cn(
                  "w-full flex items-center gap-2.5 h-12 px-3.5 rounded-xl text-left",
                  "bg-neutral-50 border border-neutral-200",
                  "hover:border-neutral-300 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                )}
              >
                <MapPin className="size-4 text-neutral-400 shrink-0" />
                <span
                  className={cn(
                    "flex-1 text-sm truncate",
                    location ? "text-neutral-900 font-medium" : "text-neutral-400"
                  )}
                >
                  {location || "Select Location"}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-neutral-400 shrink-0 transition-transform duration-200",
                    locationOpen && "rotate-180"
                  )}
                />
              </button>

              {locationOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 max-h-60 overflow-y-auto">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setLocation(loc === "All Locations" ? "" : loc);
                        setLocationOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors duration-150",
                        "hover:bg-emerald-50 hover:text-emerald-800",
                        (loc === "All Locations" && !location) ||
                          loc === location
                          ? "bg-emerald-50 text-emerald-800 font-medium"
                          : "text-neutral-700"
                      )}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price range display */}
            <div className="lg:col-span-3">
              <div
                className={cn(
                  "flex items-center gap-2.5 h-12 px-3.5 rounded-xl",
                  "bg-neutral-50 border border-neutral-200"
                )}
              >
                <DollarSign className="size-4 text-neutral-400 shrink-0" />
                <span className="text-sm text-neutral-700 font-medium truncate">
                  {formatPriceLabel(priceRange[0])} –{" "}
                  {formatPriceLabel(priceRange[1])}
                </span>
              </div>
            </div>

            {/* Search / Advanced */}
            <div className="lg:col-span-2 flex items-center gap-2">
              <Link
                href={`/listings?location=${encodeURIComponent(location)}&type=${encodeURIComponent(activeFilter)}&search=${encodeURIComponent(searchQuery)}`}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2",
                  "h-12 px-5 rounded-xl",
                  "bg-emerald-800 text-white text-sm font-semibold",
                  "hover:bg-emerald-700 active:bg-emerald-900",
                  "transition-colors duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                )}
              >
                <Search className="size-4" />
                Search
              </Link>
            </div>
          </div>

          {/* Advanced search link */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-neutral-400">
              Over 12,500 properties to explore
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
            >
              <SlidersHorizontal className="size-3.5" />
              Advanced Search
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
