"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex flex-col items-center justify-center",
        "rounded-2xl border border-dashed border-neutral-200/80",
        "bg-white px-8 py-14 text-center shadow-xs",
        className
      )}
    >
      {/* Icon Container with subtle gradient */}
      <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-800 border border-emerald-100/50 mb-5 shadow-xs">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-base font-heading font-bold text-neutral-900 mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed mb-6 font-medium">
        {description}
      </p>
      
      {/* Optional action CTA */}
      {action && (
        <Link
          href={action.href}
          className={cn(
            "inline-flex items-center justify-center",
            "h-10 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider",
            "bg-emerald-800 text-white shadow-xs",
            "hover:bg-emerald-700 hover:shadow-md transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          )}
        >
          {action.label}
        </Link>
      )}
    </motion.div>
  );
}
