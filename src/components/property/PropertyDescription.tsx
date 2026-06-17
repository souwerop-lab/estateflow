"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyDescriptionProps {
  description: string;
  features: string[];
}

export function PropertyDescription({
  description,
  features,
}: PropertyDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading font-bold text-neutral-900">
          About This Property
        </h3>
        <div className="relative">
          <p
            className={cn(
              "text-sm text-neutral-600 leading-relaxed transition-all duration-300",
              !isExpanded && "line-clamp-3"
            )}
          >
            {description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors duration-150"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Features Grid */}
      {features.length > 0 && (
        <div className="pt-4 border-t border-neutral-100 space-y-4">
          <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-neutral-400">
            Key Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2.5 text-neutral-700">
                <div className="flex items-center justify-center size-5 rounded-full bg-emerald-50 text-emerald-700 shrink-0">
                  <Check className="size-3" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
