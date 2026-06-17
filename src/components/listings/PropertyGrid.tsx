"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Property } from "@/types";

interface PropertyGridProps {
  properties: Property[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

export function PropertyGrid({
  properties,
  isFavorite,
  onToggleFavorite,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className="size-7" />}
        title="No properties found"
        description="Try adjusting your filters or search criteria to discover more properties that match your preferences."
        action={{ label: "View All Listings", href: "/listings" }}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
    >
      {properties.map((property, index) => (
        <motion.div key={property.id} variants={itemVariants}>
          <PropertyCard
            property={property}
            isFavorite={isFavorite(property.id)}
            onToggleFavorite={onToggleFavorite}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
