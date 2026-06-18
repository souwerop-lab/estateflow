"use client";

import { Search, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROPERTY_TYPES, LOCATIONS, formatPrice } from "@/lib/constants";
import type { FilterState, PropertyType, PropertyStatus } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  activeCount: number;
}

const STATUS_OPTIONS: { value: PropertyStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5] as const;
const BATHROOM_OPTIONS = [1, 2, 3, 4] as const;

const PRICE_MIN = 0;
const PRICE_MAX = 10_000_000;

export function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  activeCount,
}: FilterPanelProps) {
  const isRent = filters.status === "for-rent";
  const priceMax = isRent ? 15000 : PRICE_MAX;
  const priceStep = isRent ? 250 : 50000;

  return (
    <aside className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain rounded-xl border border-neutral-200 bg-white shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-heading font-semibold text-neutral-900">
            Filters
          </h2>
          {activeCount > 0 && (
            <Badge className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-emerald-700 transition-colors"
          >
            <RotateCcw className="size-3" />
            Clear All
          </button>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* ── Search ── */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Address, city, or ZIP..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="h-10 pl-9 pr-8 rounded-lg bg-neutral-50 border-neutral-200 text-sm placeholder:text-neutral-400 focus-visible:bg-white"
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange({ search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <Separator />

        {/* ── Location ── */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Location
          </label>
          <Select
            value={filters.location || "All Locations"}
            onValueChange={(val: string | null) =>
              onFilterChange({
                location: val === "All Locations" || val === null ? "" : val,
              })
            }
          >
            <SelectTrigger className="w-full h-10 rounded-lg bg-neutral-50 border-neutral-200 text-sm">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* ── Property Type ── */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((type) => (
              <button
                type="button"
                key={type.value}
                onClick={(e) => {
                  e.preventDefault();
                  onFilterChange({
                    propertyType: type.value as PropertyType | "all",
                  });
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  filters.propertyType === type.value
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* ── Price Range ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Max Price
            </label>
            <span className="text-sm font-semibold text-emerald-800">
              {filters.priceRange[1] >= priceMax
                ? "Any"
                : isRent
                  ? `$${filters.priceRange[1].toLocaleString()}/mo`
                  : formatPrice(filters.priceRange[1])}
            </span>
          </div>
          <Slider
            value={[Math.min(filters.priceRange[1], priceMax)]}
            onValueChange={(val) =>
              onFilterChange({
                priceRange: [PRICE_MIN, Array.isArray(val) ? val[0] : val],
              })
            }
            min={PRICE_MIN}
            max={priceMax}
            step={priceStep}
          />
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>{isRent ? "$0/mo" : formatPrice(PRICE_MIN)}</span>
            <span>{isRent ? "$15,000/mo+" : `${formatPrice(PRICE_MAX)}+`}</span>
          </div>
        </div>

        <Separator />

        {/* ── Bedrooms ── */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Bedrooms
          </label>
          <div className="flex gap-2">
            {BEDROOM_OPTIONS.map((num) => {
              const isActive = filters.bedrooms === num;
              return (
                <button
                  type="button"
                  key={num}
                  onClick={(e) => {
                    e.preventDefault();
                    onFilterChange({
                      bedrooms: isActive ? null : num,
                    });
                  }}
                  className={cn(
                    "flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                      : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                  )}
                >
                  {num === 5 ? "5+" : num}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* ── Bathrooms ── */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Bathrooms
          </label>
          <div className="flex gap-2">
            {BATHROOM_OPTIONS.map((num) => {
              const isActive = filters.bathrooms === num;
              return (
                <button
                  type="button"
                  key={num}
                  onClick={(e) => {
                    e.preventDefault();
                    onFilterChange({
                      bathrooms: isActive ? null : num,
                    });
                  }}
                  className={cn(
                    "flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 border",
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                      : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                  )}
                >
                  {num === 4 ? "4+" : num}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* ── Status ── */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                type="button"
                key={status.value}
                onClick={(e) => {
                  e.preventDefault();
                  const nextStatus = status.value;
                  const nextMaxPrice = nextStatus === "for-rent" ? 15000 : PRICE_MAX;
                  onFilterChange({
                    status: nextStatus,
                    priceRange: [PRICE_MIN, nextMaxPrice],
                  });
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  filters.status === status.value
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reset Button (bottom) ── */}
      {activeCount > 0 && (
        <div className="px-5 pb-5">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full h-10 rounded-lg border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          >
            <RotateCcw className="size-3.5 mr-2" />
            Reset All Filters
          </Button>
        </div>
      )}
    </aside>
  );
}
