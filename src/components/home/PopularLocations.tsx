"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Building2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { locations } from "@/data/locations";
import { formatPrice } from "@/lib/constants";

const locationColors = [
  "from-emerald-900 via-emerald-800 to-teal-700",
  "from-slate-900 via-slate-800 to-emerald-900",
  "from-teal-800 via-cyan-800 to-emerald-800",
  "from-emerald-950 via-green-900 to-emerald-800",
  "from-slate-800 via-emerald-900 to-teal-800",
  "from-teal-900 via-emerald-900 to-green-800",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
export function PopularLocations() {
  const getLocSearchQuery = (name: string) => {
    switch (name) {
      case "Manhattan": return "New York, NY";
      case "Beverly Hills": return "Los Angeles, CA";
      case "Miami Beach": return "Miami, FL";
      case "Austin": return "Austin, TX";
      case "Seattle": return "Seattle, WA";
      case "San Francisco": return "San Francisco, CA";
      default: return "";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-50 section-padding">
      <div className="section-width">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="size-3" />
              Top Neighborhoods
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
            Popular Locations
          </h2>
          <p className="mt-3 text-neutral-600 text-base md:text-lg max-w-xl mx-auto">
            Explore properties in top neighborhoods
          </p>
        </motion.div>

        {/* Locations grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {locations.map((location, index) => (
            <motion.div key={location.id} variants={itemVariants}>
              <Link
                href={`/listings?location=${encodeURIComponent(getLocSearchQuery(location.name))}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-2xl cursor-pointer"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "aspect-[16/10] sm:aspect-[4/3]",
                    "transition-all duration-500",
                    "group-hover:shadow-xl group-hover:-translate-y-1"
                  )}
                >
                  {/* Colored gradient background fallback */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out",
                      "group-hover:scale-110",
                      locationColors[index % locationColors.length]
                    )}
                  />

                  {/* City photography */}
                  {location.image && (
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}

                  {/* Subtle pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Content overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {location.trending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-amber-950 text-xs font-semibold shadow-sm">
                        <TrendingUp className="size-3" />
                        Trending
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white text-xs font-medium">
                      <Building2 className="size-3" />
                      {location.propertyCount.toLocaleString()} properties
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
                          {location.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-white/70 font-medium">
                          {location.state}
                        </p>
                        <p className="mt-2 text-sm text-white/90 font-semibold">
                          Avg.{" "}
                          <span className="text-amber-300">
                            {formatPrice(location.avgPrice)}
                          </span>
                        </p>
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-center size-10 rounded-xl",
                          "bg-white/15 backdrop-blur-sm text-white",
                          "transition-all duration-300",
                          "group-hover:bg-white group-hover:text-emerald-800"
                        )}
                      >
                        <ArrowUpRight className="size-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
