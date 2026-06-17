"use client";

import { cn } from "@/lib/utils";

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-neutral-200", className)}
    />
  );
}

export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm",
        className
      )}
    >
      {/* Image placeholder */}
      <Bone className="h-52 w-full rounded-none rounded-t-xl" />

      <div className="p-4 space-y-3">
        {/* Price */}
        <Bone className="h-7 w-32" />

        {/* Address */}
        <div className="space-y-1.5">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
        </div>

        {/* Bed/Bath/Sqft row */}
        <div className="flex items-center gap-3 pt-1">
          <Bone className="h-4 w-14" />
          <Bone className="h-4 w-14" />
          <Bone className="h-4 w-16" />
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 pt-3 mt-1">
          <div className="flex items-center gap-2">
            <Bone className="size-7 rounded-full" />
            <Bone className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-100 bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Bone className="h-4 w-24" />
          <Bone className="h-8 w-28" />
          <Bone className="h-4 w-16" />
        </div>
        <Bone className="size-12 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 border-b border-neutral-100",
        className
      )}
    >
      <Bone className="size-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Bone className="h-4 w-2/3" />
        <Bone className="h-3 w-1/3" />
      </div>
      <Bone className="h-5 w-16 rounded-full shrink-0" />
      <Bone className="h-4 w-20 shrink-0" />
      <Bone className="h-8 w-8 rounded-lg shrink-0" />
    </div>
  );
}

export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-8 p-6", className)}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Bone className="h-8 w-48" />
          <Bone className="h-4 w-64" />
        </div>
        <Bone className="h-10 w-32 rounded-lg" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      {/* Content area */}
      <div className="rounded-xl border border-neutral-100 bg-white shadow-sm">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <Bone className="h-6 w-32" />
          <Bone className="h-8 w-24 rounded-lg" />
        </div>
        <div>
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>
    </div>
  );
}
