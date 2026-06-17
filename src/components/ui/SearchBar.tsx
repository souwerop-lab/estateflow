"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search properties, locations, agents...",
  className,
  size = "default",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "group relative flex items-center w-full",
        size === "lg" ? "h-14" : "h-10",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-4 text-neutral-400 pointer-events-none transition-colors duration-200",
          "group-focus-within:text-emerald-600",
          size === "lg" ? "size-5" : "size-4"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-full rounded-full",
          "bg-white border border-neutral-200",
          "text-neutral-900 placeholder:text-neutral-400",
          "outline-none transition-all duration-200",
          "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
          "shadow-sm hover:shadow-md focus:shadow-md",
          size === "lg"
            ? "pl-12 pr-12 text-base font-sans"
            : "pl-10 pr-10 text-sm font-sans"
        )}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            "absolute flex items-center justify-center rounded-full",
            "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100",
            "transition-colors duration-150 cursor-pointer outline-none",
            "focus-visible:ring-2 focus-visible:ring-emerald-500",
            size === "lg"
              ? "right-4 size-7"
              : "right-3 size-6"
          )}
        >
          <X className={size === "lg" ? "size-4" : "size-3.5"} />
        </button>
      )}
    </div>
  );
}
