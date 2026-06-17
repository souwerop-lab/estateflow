"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, MapPin, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FilterPanel } from "@/components/listings/FilterPanel";
import { FilterMobile } from "@/components/listings/FilterMobile";
import { SortDropdown } from "@/components/listings/SortDropdown";
import { PropertyGrid } from "@/components/listings/PropertyGrid";
import { MapPlaceholder } from "@/components/listings/MapPlaceholder";
import { properties } from "@/data/properties";
import { useFilters } from "@/hooks/useFilters";
import { useFavorites } from "@/hooks/useFavorites";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";

export default function ListingsClient() {
  const isMobile = useIsMobile();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();

  const {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    activeFilterCount,
    resultCount,
  } = useFilters(properties);

  const { isFavorite, toggleFavorite } = useFavorites();

  // Read URL search params on mount/change
  useEffect(() => {
    const loc = searchParams.get("location");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const queryFilters: any = {};

    if (loc) queryFilters.location = loc;
    if (type) queryFilters.propertyType = type;
    if (status) {
      queryFilters.status = status;
      // Adjust price range limit for rental listings automatically
      if (status === "for-rent") {
        queryFilters.priceRange = [0, 15000];
      }
    }
    if (search) queryFilters.search = search;

    if (Object.keys(queryFilters).length > 0) {
      updateFilter(queryFilters);
    }
  }, [searchParams, updateFilter]);

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
            <span className="text-neutral-600">Listings</span>
          </nav>

          {/* Title and Results Count & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900">
                Search Properties
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {resultCount} {resultCount === 1 ? "Property" : "Properties"} found
              </p>
            </div>

            {/* Sorting & Mobile Filters Button */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <SortDropdown
                value={filters.sortBy}
                onChange={(sortBy) => updateFilter("sortBy", sortBy)}
              />

              {isMobile && (
                <Button
                  onClick={() => setMobileFiltersOpen(true)}
                  variant="outline"
                  className="h-9 gap-2 rounded-lg border-neutral-200 px-3 text-sm font-semibold text-neutral-700 bg-white cursor-pointer"
                >
                  <SlidersHorizontal className="size-3.5 text-neutral-400" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex items-center justify-center size-4 rounded-full bg-emerald-800 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* Desktop Filter Sidebar (hidden on mobile) */}
            {!isMobile && (
              <FilterPanel
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
                activeCount={activeFilterCount}
              />
            )}

            {/* Listings Grid & Map Area */}
            <div className="space-y-8 min-h-[800px] flex flex-col justify-between">
              {/* Listings Grid */}
              <PropertyGrid
                properties={filteredProperties}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />

              {/* Map Section */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="size-4 text-emerald-800" />
                  <h2 className="text-base font-heading font-bold text-neutral-900">
                    Location map view
                  </h2>
                </div>
                <MapPlaceholder properties={filteredProperties} />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {isMobile && (
        <FilterMobile
          open={mobileFiltersOpen}
          onOpenChange={setMobileFiltersOpen}
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
          activeCount={activeFilterCount}
          resultCount={resultCount}
        />
      )}

      <Footer />
    </>
  );
}
