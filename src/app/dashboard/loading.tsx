import { PageSkeleton } from "@/components/ui/LoadingSkeleton";

export default function DashboardLoading() {
  return (
    <div className="flex bg-[#FAFAFA] min-h-screen text-neutral-900 overflow-hidden">
      
      {/* Sidebar Mock Skeleton */}
      <aside className="hidden lg:flex flex-col bg-white border-r border-neutral-200 h-screen w-64 shrink-0 p-4 space-y-6">
        <div className="flex items-center gap-2.5 h-12">
          <div className="w-9 h-9 rounded-xl bg-neutral-200 animate-pulse" />
          <div className="h-5 w-24 bg-neutral-200 animate-pulse rounded-md" />
        </div>
        <div className="space-y-4 border-t border-b border-neutral-100 py-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-neutral-200 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-20 bg-neutral-200 animate-pulse rounded-md" />
              <div className="h-3 w-16 bg-neutral-100 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-2.5 flex-1">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2 px-3">
              <div className="size-5 rounded-md bg-neutral-200 animate-pulse" />
              <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Work Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header Mock Skeleton */}
        <header className="h-20 bg-white border-b border-neutral-200 px-8 flex items-center justify-between shrink-0">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-neutral-200 animate-pulse rounded-md" />
            <div className="h-3 w-32 bg-neutral-200 animate-pulse rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <div className="size-9 rounded-full bg-neutral-200 animate-pulse" />
            <div className="h-6 w-px bg-neutral-200" />
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-neutral-200 animate-pulse" />
              <div className="space-y-1 hidden md:block">
                <div className="h-3.5 w-24 bg-neutral-200 animate-pulse rounded-md" />
                <div className="h-3 w-28 bg-neutral-100 animate-pulse rounded-md" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Work Area */}
        <main className="flex-1 overflow-y-auto">
          <PageSkeleton />
        </main>
      </div>

    </div>
  );
}
