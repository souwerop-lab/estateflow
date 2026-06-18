"use client";

import { useState, useMemo, useCallback } from "react";
import type { FilterState, Property } from "@/types";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  location: "all",
  propertyType: "all",
  status: "all",
  priceRange: [0, 5000000],
  bedrooms: null,
  bathrooms: null,
  sqftRange: [0, 10000],
  sortBy: "newest",
};

export function useFilters(properties: Property[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    keyOrFilters: Partial<FilterState> | K,
    value?: FilterState[K]
  ) => {
    setFilters(prev => {
      if (typeof keyOrFilters === "string") {
        return { ...prev, [keyOrFilters]: value };
      }
      return { ...prev, ...keyOrFilters };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.address.city.toLowerCase().includes(searchLower) ||
        p.address.state.toLowerCase().includes(searchLower) ||
        p.address.full.toLowerCase().includes(searchLower) ||
        p.type.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      const [city, state] = filters.location.split(", ");
      result = result.filter(p =>
        p.address.city === city || p.address.state === state
      );
    }

    // Property type filter
    if (filters.propertyType !== "all") {
      result = result.filter(p => p.type === filters.propertyType);
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter(p => p.status === filters.status);
    }

    // Price range filter
    result = result.filter(p =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Bedrooms filter
    if (filters.bedrooms !== null) {
      result = result.filter(p => p.bedrooms >= filters.bedrooms!);
    }

    // Bathrooms filter
    if (filters.bathrooms !== null) {
      result = result.filter(p => p.bathrooms >= filters.bathrooms!);
    }

    // Sqft range filter
    result = result.filter(p =>
      p.sqft >= filters.sqftRange[0] && p.sqft <= filters.sqftRange[1]
    );

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "sqft-asc":
        result.sort((a, b) => a.sqft - b.sqft);
        break;
      case "sqft-desc":
        result.sort((a, b) => b.sqft - a.sqft);
        break;
      case "beds-desc":
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
        break;
    }

    return result;
  }, [properties, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.location !== "all") count++;
    if (filters.propertyType !== "all") count++;
    if (filters.status !== "all") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) count++;
    if (filters.bedrooms !== null) count++;
    if (filters.bathrooms !== null) count++;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    activeFilterCount,
    totalCount: properties.length,
    resultCount: filteredProperties.length,
  };
}
