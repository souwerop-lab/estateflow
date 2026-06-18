import { Header } from "@/components/layout/Header";

export default function PropertyDetailLoading() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs and action buttons Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="h-4 w-48 bg-neutral-200 animate-pulse rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-9 w-20 bg-neutral-200 animate-pulse rounded-xl" />
              <div className="h-9 w-28 bg-neutral-200 animate-pulse rounded-xl" />
            </div>
          </div>

          {/* Gallery Skeleton */}
          <div className="hidden md:grid grid-cols-3 gap-3 h-[360px] lg:h-[430px] xl:h-[500px] w-full overflow-hidden rounded-2xl mb-8">
            <div className="col-span-2 h-full bg-neutral-200 animate-pulse" />
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="h-full bg-neutral-200 animate-pulse rounded-xl" />
              <div className="h-full bg-neutral-200 animate-pulse rounded-xl" />
              <div className="h-full bg-neutral-200 animate-pulse rounded-xl" />
              <div className="h-full bg-neutral-200 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="block md:hidden h-[220px] sm:h-[320px] w-full bg-neutral-200 animate-pulse rounded-xl mb-8" />

          {/* Details Content Columns Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
            
            {/* Left Content Area Skeleton */}
            <div className="space-y-8">
              
              {/* Header Info Block */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2.5 flex-1">
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-neutral-200 animate-pulse rounded-full" />
                      <div className="h-5 w-12 bg-neutral-200 animate-pulse rounded-full" />
                    </div>
                    <div className="h-7 w-2/3 bg-neutral-200 animate-pulse rounded-lg" />
                    <div className="h-4 w-1/2 bg-neutral-200 animate-pulse rounded-md" />
                  </div>
                  <div className="space-y-1.5 text-left lg:text-right">
                    <div className="h-8 w-32 bg-neutral-200 animate-pulse rounded-lg" />
                    <div className="h-4 w-20 bg-neutral-200 animate-pulse rounded-md" />
                  </div>
                </div>
              </div>

              {/* Facts Bar Skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-white rounded-2xl border border-neutral-100 p-5 shadow-xs">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="size-8 rounded-full bg-neutral-200 animate-pulse" />
                    <div className="h-4 w-12 bg-neutral-200 animate-pulse rounded-md mt-1" />
                    <div className="h-3 w-8 bg-neutral-100 animate-pulse rounded-md" />
                  </div>
                ))}
              </div>

              {/* Description Block Skeleton */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
                <div className="h-6 w-36 bg-neutral-200 animate-pulse rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-neutral-200 animate-pulse rounded-md" />
                  <div className="h-4 w-full bg-neutral-200 animate-pulse rounded-md" />
                  <div className="h-4 w-4/5 bg-neutral-200 animate-pulse rounded-md" />
                </div>
              </div>

            </div>

            {/* Right Column (Agent Form Skeleton) */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-neutral-200 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded-md" />
                  <div className="h-3.5 w-32 bg-neutral-200 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="space-y-4 border-t border-neutral-100 pt-4">
                <div className="h-9 w-full bg-neutral-200 animate-pulse rounded-xl" />
                <div className="h-9 w-full bg-neutral-200 animate-pulse rounded-xl" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
