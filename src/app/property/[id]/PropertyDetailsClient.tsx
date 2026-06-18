"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Share2, Heart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ImageGallery } from "@/components/property/ImageGallery";
import { PropertyFacts } from "@/components/property/PropertyFacts";
import { PropertyDescription } from "@/components/property/PropertyDescription";
import { AmenitiesList } from "@/components/property/AmenitiesList";
import { AgentContactCard } from "@/components/property/AgentContactCard";
import { SimilarListings } from "@/components/property/SimilarListings";
import { useFavorites } from "@/hooks/useFavorites";
import { formatFullPrice } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types";

interface PropertyDetailsClientProps {
  property: Property;
  properties: Property[];
}

export default function PropertyDetailsClient({ property, properties }: PropertyDetailsClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    // Scroll window to the top on component mount
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [property.id]);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
              <Link href="/" className="hover:text-emerald-800 transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <Link href="/listings" className="hover:text-emerald-800 transition-colors">
                Listings
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-neutral-600 truncate max-w-[200px] sm:max-w-none">
                {property.title}
              </span>
            </nav>

            {/* Action buttons (Share & Favorite) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:text-emerald-800 hover:border-neutral-300 transition-colors shadow-xs"
              >
                <Share2 className="size-3.5 text-neutral-400" />
                Share
              </button>
              
              <button
                onClick={() => toggleFavorite(property.id)}
                className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:text-emerald-800 hover:border-neutral-300 transition-colors shadow-xs"
              >
                <Heart 
                  className={`size-3.5 ${
                    isFavorite(property.id) ? "fill-red-500 text-red-500" : "text-neutral-400"
                  }`} 
                />
                {isFavorite(property.id) ? "Saved" : "Save Listing"}
              </button>
            </div>
          </div>

          {/* Image Gallery (Full Width) */}
          <div className="mb-8">
            <ImageGallery images={property.images} title={property.title} />
          </div>

          {/* Core Info & Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
            
            {/* Left Column: Details */}
            <div className="space-y-8">
              
              {/* Header Info (Title, Price, Location) */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-xs">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-emerald-800 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full border-none">
                        {property.status === "for-sale" ? "For Sale" : property.status === "for-rent" ? "For Rent" : property.status}
                      </Badge>
                      {property.isNew && (
                        <Badge className="bg-amber-500 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full border-none animate-pulse">
                          New
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-xl md:text-2xl font-heading font-bold text-neutral-900 leading-tight">
                      {property.title}
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                      {property.address.full}
                    </p>
                  </div>
                  <div className="text-left lg:text-right">
                    <span className="block text-2xl md:text-3xl font-heading font-black text-emerald-800 tracking-tight">
                      {formatFullPrice(property.price)}
                      {property.status === "for-rent" && (
                        <span className="text-lg font-semibold text-neutral-500">/mo</span>
                      )}
                    </span>
                    {property.status !== "for-rent" && (
                      <span className="text-xs text-neutral-400 font-semibold mt-0.5 block">
                        {formatFullPrice(property.pricePerSqft)} / sq ft
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Facts bar */}
              <PropertyFacts property={property} />

              {/* Description & Key Features */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-xs">
                <PropertyDescription
                  description={property.description}
                  features={property.features}
                />
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-xs">
                <AmenitiesList amenityIds={property.amenities} />
              </div>

              {/* Price History Section */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-heading font-bold text-neutral-900">
                  Price History
                </h3>
                <div className="relative border-l border-neutral-200 pl-5 space-y-5">
                  {property.priceHistory.map((history, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[27px] top-1 flex items-center justify-center size-3 rounded-full bg-emerald-700 ring-4 ring-emerald-50 border border-white" />
                      
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-semibold text-sm text-neutral-800">
                            {history.event}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-700/20" />
                            {new Date(history.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="font-bold text-sm text-neutral-900">
                          {formatFullPrice(history.price)}
                          {property.status === "for-rent" && (
                            <span className="text-xs font-semibold text-neutral-500">/mo</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Listings Section */}
              <div className="pt-4">
                <SimilarListings
                  properties={properties}
                  currentId={property.id}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </div>

            </div>

            {/* Right Column: Agent Profile Contact Form (Sticky) */}
            <div className="lg:sticky lg:top-24">
              <AgentContactCard agent={property.agent} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
