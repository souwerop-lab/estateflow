"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  subtitle,
  className,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const hasChange = change !== undefined && change !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-5",
        "border border-neutral-100 shadow-sm",
        "hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-500 truncate">
            {title}
          </p>
          <p className="mt-2 text-2xl font-heading font-bold text-neutral-900 tracking-tight">
            {value}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {hasChange && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold rounded-full px-2 py-0.5",
                  isPositive
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-red-700 bg-red-50"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-neutral-400">{subtitle}</span>
            )}
          </div>
        </div>
        <div
          className={cn(
            "flex shrink-0 items-center justify-center",
            "size-12 rounded-xl",
            "bg-emerald-50 text-emerald-700"
          )}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
