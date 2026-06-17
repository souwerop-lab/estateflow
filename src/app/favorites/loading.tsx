import { Header } from "@/components/layout/Header";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Heart } from "lucide-react";

export default function FavoritesLoading() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Skeleton */}
          <div className="h-4 w-32 bg-neutral-200 animate-pulse rounded-md mb-6" />

          {/* Heading Skeleton */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200">
            <div className="flex items-center justify-center size-12 rounded-xl bg-neutral-100 text-neutral-300">
              <Heart className="size-6" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-44 bg-neutral-200 animate-pulse rounded-lg" />
              <div className="h-4 w-28 bg-neutral-200 animate-pulse rounded-md" />
            </div>
          </div>

          {/* Grid of Card Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <PropertyCardSkeleton key={idx} />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
