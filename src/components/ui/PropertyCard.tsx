"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
  index?: number;
}

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  "for-sale": {
    label: "For Sale",
    className: "bg-emerald-700 text-white",
  },
  "for-rent": {
    label: "For Rent",
    className: "bg-blue-600 text-white",
  },
  sold: {
    label: "Sold",
    className: "bg-neutral-700 text-white",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500 text-white",
  },
};

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite = () => {},
  className,
  index = 0,
}: PropertyCardProps) {
  const router = useRouter();
  const status = statusConfig[property.status] ?? statusConfig["for-sale"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      className={cn("group", className)}
    >
      <Link
        href={`/property/${property.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-xl"
      >
        <div
          className={cn(
            "overflow-hidden rounded-xl bg-white border border-neutral-100",
            "shadow-sm transition-all duration-300",
            "group-hover:shadow-lg group-hover:-translate-y-1"
          )}
        >
          {/* Image area */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={property.images[0] ?? "/placeholder.jpg"}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Top badges row */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide shadow-sm",
                    status.className
                  )}
                >
                  {status.label}
                </span>
                {property.isNew && (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-amber-400 text-amber-950 border border-amber-300 shadow-sm animate-pulse">
                    New
                  </span>
                )}
              </div>
              <FavoriteButton
                propertyId={property.id}
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
                size="sm"
              />
            </div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {property.views > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                  <Eye className="size-3" />
                  {property.views}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Price */}
            <div className="flex items-baseline gap-1">
              <p className="text-xl font-heading font-bold text-neutral-900">
                {formatPrice(property.price)}
                {property.status === "for-rent" && (
                  <span className="text-sm text-neutral-500 font-semibold">/mo</span>
                )}
              </p>
            </div>

            {/* Address */}
            <div className="mt-1.5 flex items-start gap-1.5">
              <MapPin className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
              <p className="text-sm text-neutral-600 leading-snug line-clamp-1">
                {property.address.full}
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-3 flex items-center gap-4 text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Bed className="size-4 text-neutral-400" />
                <span className="text-sm font-medium">
                  {property.bedrooms}
                </span>
                <span className="text-xs text-neutral-400">bd</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="size-4 text-neutral-400" />
                <span className="text-sm font-medium">
                  {property.bathrooms}
                </span>
                <span className="text-xs text-neutral-400">ba</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize className="size-4 text-neutral-400" />
                <span className="text-sm font-medium">
                  {property.sqft.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400">sqft</span>
              </div>
            </div>

            {/* Agent */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/agents/${property.agent.id}`);
              }}
              className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-2.5 cursor-pointer hover:text-emerald-800 group/agent transition-all"
            >
              <div className="relative size-7 rounded-full overflow-hidden bg-neutral-100 shrink-0 ring-1 ring-neutral-200 group-hover/agent:ring-emerald-500 transition-colors">
                <Image
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-neutral-500 font-semibold group-hover/agent:text-emerald-800 transition-colors truncate">
                {property.agent.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
