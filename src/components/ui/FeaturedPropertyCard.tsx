"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import type { Property } from "@/types";

interface FeaturedPropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
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

export function FeaturedPropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  className,
  index = 0,
}: FeaturedPropertyCardProps) {
  const router = useRouter();
  const status = statusConfig[property.status] ?? statusConfig["for-sale"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={cn("group", className)}
    >
      <Link
        href={`/property/${property.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl bg-white border border-neutral-100",
            "shadow-sm transition-all duration-300",
            "group-hover:shadow-xl group-hover:-translate-y-1",
            "flex flex-col md:flex-row"
          )}
        >
          {/* Image area — larger for featured cards */}
          <div className="relative w-full md:w-[55%] aspect-[16/10] md:aspect-auto md:min-h-[320px] overflow-hidden shrink-0">
            <Image
              src={property.images[0] ?? "/placeholder.jpg"}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                {/* Featured badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md">
                  <Sparkles className="size-3.5" />
                  Featured
                </span>
                <span
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide shadow-sm",
                    status.className
                  )}
                >
                  {status.label}
                </span>
              </div>
              <FavoriteButton
                propertyId={property.id}
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
                size="md"
              />
            </div>

            {/* Image count badge */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                  1/{property.images.length} photos
                </span>
              </div>
            )}
          </div>

          {/* Content area */}
          <div className="flex flex-col justify-between flex-1 p-5 md:p-6 lg:p-8">
            <div>
              {/* Property type tag */}
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                {property.type.replace("-", " ")}
              </span>

              {/* Title */}
              <h3 className="mt-1 text-xl lg:text-2xl font-heading font-bold text-neutral-900 leading-snug line-clamp-2">
                {property.title}
              </h3>

              {/* Address */}
              <div className="mt-2 flex items-start gap-1.5">
                <MapPin className="size-4 text-neutral-400 mt-0.5 shrink-0" />
                <p className="text-sm text-neutral-500 leading-snug">
                  {property.address.full}
                </p>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <p className="text-2xl lg:text-3xl font-heading font-bold text-emerald-800">
                  {formatPrice(property.price)}
                  {property.status === "for-rent" && (
                    <span className="text-sm text-neutral-500 font-semibold">/mo</span>
                  )}
                </p>
              </div>

              {/* Stats row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Bed className="size-4 text-neutral-400" />
                  <span className="text-sm font-semibold">
                    {property.bedrooms}
                  </span>
                  <span className="text-xs text-neutral-400">Beds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bath className="size-4 text-neutral-400" />
                  <span className="text-sm font-semibold">
                    {property.bathrooms}
                  </span>
                  <span className="text-xs text-neutral-400">Baths</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize className="size-4 text-neutral-400" />
                  <span className="text-sm font-semibold">
                    {property.sqft.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400">sqft</span>
                </div>
              </div>

              {/* Extra details */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {property.status !== "for-rent" && (
                  <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <DollarSign className="size-3.5 text-neutral-400" />
                    <span className="font-medium">
                      ${property.pricePerSqft.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400">/sqft</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <Clock className="size-3.5 text-neutral-400" />
                  <span className="font-medium">
                    {property.daysOnMarket}
                  </span>
                  <span className="text-xs text-neutral-400">
                    days on market
                  </span>
                </div>
              </div>
            </div>

            {/* Agent footer */}
            <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/listings?search=${encodeURIComponent(property.agent.name.split(" ")[0])}`);
                }}
                className="flex items-center gap-3 cursor-pointer group/agent hover:text-emerald-800 transition-colors"
              >
                <div className="relative size-9 rounded-full overflow-hidden bg-neutral-100 shrink-0 ring-2 ring-neutral-50 group-hover/agent:ring-emerald-500 transition-all">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 group-hover/agent:text-emerald-800 transition-colors">
                    {property.agent.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {property.agent.title}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-4 py-2 rounded-lg text-sm font-semibold",
                  "bg-emerald-50 text-emerald-700",
                  "group-hover:bg-emerald-800 group-hover:text-white",
                  "transition-colors duration-300"
                )}
              >
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
