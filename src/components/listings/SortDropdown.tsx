"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import type { SortOption } from "@/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select
      value={value}
      onValueChange={(val: string | null) => onChange((val || "newest") as SortOption)}
    >
      <SelectTrigger className="h-9 gap-2 rounded-full border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50 hover:border-neutral-300 transition-all focus:ring-1 focus:ring-emerald-800">
        <ArrowUpDown className="size-3 text-neutral-400 shrink-0" />
        <span className="text-neutral-400 font-medium">Sort:</span>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false}>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
