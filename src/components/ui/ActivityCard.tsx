"use client";

import {
  Home,
  UserPlus,
  DollarSign,
  Eye,
  MessageSquare,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Activity, ActivityType } from "@/types";

interface ActivityCardProps {
  activity: Activity;
  className?: string;
  showSeparator?: boolean;
}

const activityConfig: Record<
  ActivityType,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  listing: {
    icon: <Home className="size-4" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  lead: {
    icon: <UserPlus className="size-4" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  sale: {
    icon: <DollarSign className="size-4" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  view: {
    icon: <Eye className="size-4" />,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  offer: {
    icon: <MessageSquare className="size-4" />,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  review: {
    icon: <Star className="size-4" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ActivityCard({
  activity,
  className,
  showSeparator = true,
}: ActivityCardProps) {
  const config = activityConfig[activity.type] ?? activityConfig.listing;

  return (
    <div className={cn("group", className)}>
      <div className="flex items-start gap-3 px-1 py-3">
        {/* Icon dot */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-center",
            "size-9 rounded-xl",
            config.bgColor,
            config.color
          )}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 leading-snug">
            {activity.title}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {activity.description}
          </p>
        </div>

        {/* Timestamp */}
        <span className="shrink-0 text-xs text-neutral-400 font-medium pt-0.5">
          {formatTimestamp(activity.timestamp)}
        </span>
      </div>

      {showSeparator && (
        <div className="ml-12 border-b border-neutral-100" />
      )}
    </div>
  );
}
