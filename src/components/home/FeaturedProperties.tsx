"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { properties as mockProperties } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Property } from "@/types";

const mockFeaturedProperties = mockProperties.filter((p) => p.isFeatured).slice(0, 6);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface FeaturedPropertiesProps {
  properties?: Property[];
}

export function FeaturedProperties({ properties = mockFeaturedProperties }: FeaturedPropertiesProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="py-16 md:py-24 section-padding">
      <div className="section-width">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="size-3" />
                Curated Selection
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              Featured Properties
            </h2>
            <p className="mt-2 text-neutral-600 text-base md:text-lg max-w-xl">
              Hand-picked premium listings for discerning buyers
            </p>
          </div>

          <Link
            href="/listings"
            className={cn(
              "inline-flex items-center gap-2 shrink-0",
              "h-11 px-6 rounded-xl",
              "border border-emerald-200 bg-emerald-50 text-emerald-800",
              "text-sm font-semibold",
              "hover:bg-emerald-100 hover:border-emerald-300",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
              "group/btn"
            )}
          >
            View All Listings
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Properties grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property, index) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard
                property={property}
                isFavorite={isFavorite(property.id)}
                onToggleFavorite={toggleFavorite}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA on mobile */}
        <div className="mt-10 flex sm:hidden justify-center">
          <Link
            href="/listings"
            className={cn(
              "inline-flex items-center gap-2",
              "h-12 px-8 rounded-xl",
              "bg-emerald-800 text-white text-sm font-semibold",
              "hover:bg-emerald-700 active:bg-emerald-900",
              "transition-colors duration-200"
            )}
          >
            View All Listings
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
