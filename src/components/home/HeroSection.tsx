"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/constants";

const stats = [
  { value: "12,500+", label: "Properties" },
  { value: "8,400+", label: "Happy Clients" },
  { value: "150+", label: "Cities" },
  { value: "98%", label: "Satisfaction" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-emerald" />

      {/* Secondary gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,77,62,0.95) 0%, rgba(42,107,84,0.85) 40%, rgba(27,77,62,0.97) 100%)",
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-amber-400/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-300/5 blur-3xl" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full section-padding section-width py-20 md:py-28"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm font-medium text-emerald-100">
              <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
              Trusted by 8,400+ homeowners
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight"
          >
            Find Your{" "}
            <span
              className="inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #D4A853 0%, #E0BD72 50%, #F0D890 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream
            </span>{" "}
            Home
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg md:text-xl text-emerald-100/80 max-w-2xl leading-relaxed"
          >
            Discover exceptional properties in the most sought-after
            neighborhoods across the United States.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={itemVariants}
            className="mt-10 w-full max-w-3xl"
          >
            <div className="bg-white rounded-2xl shadow-elevated p-2 sm:p-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Location select */}
                <div className="relative flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      setLocationOpen(!locationOpen);
                      setTypeOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 h-12 px-4 rounded-xl text-left",
                      "hover:bg-neutral-50 transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    )}
                  >
                    <MapPin className="size-5 text-emerald-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                        Location
                      </p>
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          location ? "text-neutral-900" : "text-neutral-400"
                        )}
                      >
                        {location || "All Locations"}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 text-neutral-400 shrink-0 transition-transform duration-200",
                        locationOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Location dropdown */}
                  {locationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50 max-h-60 overflow-y-auto">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            setLocation(
                              loc === "All Locations" ? "" : loc
                            );
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

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-neutral-200" />

                {/* Property Type select */}
                <div className="relative flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      setTypeOpen(!typeOpen);
                      setLocationOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 h-12 px-4 rounded-xl text-left",
                      "hover:bg-neutral-50 transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    )}
                  >
                    <Home className="size-5 text-emerald-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                        Property Type
                      </p>
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          propertyType
                            ? "text-neutral-900"
                            : "text-neutral-400"
                        )}
                      >
                        {propertyType || "All Types"}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "size-4 text-neutral-400 shrink-0 transition-transform duration-200",
                        typeOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Type dropdown */}
                  {typeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50">
                      {PROPERTY_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            setPropertyType(
                              type.value === "all" ? "" : type.label
                            );
                            setTypeOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm transition-colors duration-150",
                            "hover:bg-emerald-50 hover:text-emerald-800",
                            (type.value === "all" && !propertyType) ||
                              type.label === propertyType
                              ? "bg-emerald-50 text-emerald-800 font-medium"
                              : "text-neutral-700"
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search button */}
                <Link
                  href={`/listings?location=${encodeURIComponent(location)}&type=${encodeURIComponent(
                    PROPERTY_TYPES.find(t => t.label === propertyType)?.value || ""
                  )}`}
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "h-12 px-8 rounded-xl",
                    "bg-emerald-800 text-white font-semibold text-sm",
                    "hover:bg-emerald-700 active:bg-emerald-900",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                    "shrink-0 cursor-pointer"
                  )}
                >
                  <Search className="size-4" />
                  Search
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Popular searches */}
          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm"
          >
            <span className="text-emerald-200/60">Popular:</span>
            {[
              { label: "Miami", search: "Miami, FL" },
              { label: "Beverly Hills", search: "Los Angeles, CA" },
              { label: "Manhattan", search: "New York, NY" },
              { label: "Austin", search: "Austin, TX" }
            ].map(
              (term) => (
                <Link
                  key={term.label}
                  href={`/listings?location=${encodeURIComponent(term.search)}`}
                  className="px-3 py-1 rounded-full bg-white/10 text-emerald-100 hover:bg-white/20 transition-colors duration-200 text-xs font-medium"
                >
                  {term.label}
                </Link>
              )
            )}
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-emerald-200/70 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
