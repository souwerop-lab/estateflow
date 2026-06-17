"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteButton({
  propertyId,
  isFavorite,
  onToggle,
  className,
  size = "md",
}: FavoriteButtonProps) {
  const sizeClasses = size === "sm" ? "size-8" : "size-10";
  const iconSize = size === "sm" ? "size-4" : "size-5";

  return (
    <motion.button
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(propertyId);
      }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        "bg-white/80 backdrop-blur-sm shadow-md",
        "hover:bg-white/95 transition-colors duration-200",
        "cursor-pointer outline-none",
        "focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
        sizeClasses,
        className
      )}
    >
      <motion.div
        initial={false}
        animate={
          isFavorite
            ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }
            : { scale: 1 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Heart
          className={cn(
            iconSize,
            "transition-colors duration-200",
            isFavorite
              ? "fill-red-500 text-red-500"
              : "fill-transparent text-neutral-600"
          )}
        />
      </motion.div>
    </motion.button>
  );
}
