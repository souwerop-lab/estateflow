import { Header } from "@/components/layout/Header";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { SlidersHorizontal, MapPin } from "lucide-react";

export default function ListingsLoading() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Skeleton */}
          <div className="h-4 w-32 bg-neutral-200 animate-pulse rounded-md mb-6" />

          {/* Title and Sort actions Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-neutral-200 animate-pulse rounded-lg" />
              <div className="h-4 w-28 bg-neutral-200 animate-pulse rounded-md" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-36 bg-neutral-200 animate-pulse rounded-full" />
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* Desktop Filter Sidebar Skeleton */}
            <div className="hidden lg:block rounded-xl border border-neutral-200 bg-white p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="h-5 w-16 bg-neutral-200 animate-pulse rounded-md" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-neutral-200 animate-pulse rounded-md" />
                  <div className="h-10 w-full bg-neutral-200 animate-pulse rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-neutral-200 animate-pulse rounded-md" />
                  <div className="h-10 w-full bg-neutral-200 animate-pulse rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-16 bg-neutral-200 animate-pulse rounded-full" />
                    <div className="h-7 w-16 bg-neutral-200 animate-pulse rounded-full" />
                    <div className="h-7 w-16 bg-neutral-200 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid & Map Skeleton */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <PropertyCardSkeleton key={idx} />
                ))}
              </div>

              {/* Map View Skeleton */}
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="size-4 text-neutral-300" />
                  <div className="h-5 w-36 bg-neutral-200 animate-pulse rounded-md" />
                </div>
                <div className="h-[450px] w-full bg-neutral-100 border border-neutral-200 rounded-2xl animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
