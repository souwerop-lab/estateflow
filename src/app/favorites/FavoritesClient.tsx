"use client";

import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { properties } from "@/data/properties";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesClient() {
  const { favorites, isFavorite, toggleFavorite, count, isLoaded } = useFavorites();

  // Filter properties based on local favorites array
  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 mb-6">
            <Link href="/" className="hover:text-emerald-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-neutral-600">Saved Properties</span>
          </nav>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200">
            <div className="flex items-center justify-center size-12 rounded-xl bg-red-50 text-red-500 shadow-xs">
              <Heart className="size-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900">
                Saved Properties
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {isLoaded ? `${count} listings saved` : "Loading favorites..."}
              </p>
            </div>
          </div>

          {/* Main Grid or Empty State */}
          {isLoaded && savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            isLoaded && (
              <EmptyState
                icon={<Heart className="size-7 text-neutral-400 animate-pulse" />}
                title="No Saved Properties"
                description="Start exploring our premium property listings and tap the heart icon to save your favorites here."
                action={{ label: "Browse Listings", href: "/listings" }}
                className="min-h-[400px]"
              />
            )
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
