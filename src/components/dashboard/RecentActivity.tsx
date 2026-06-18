"use client";

import { Home, User, DollarSign, Eye, FileText, Star, Activity as ActivityIcon } from "lucide-react";
import { activities as mockActivities } from "@/data/dashboard";
import type { Activity, ActivityType } from "@/types";

import { EmptyState } from "@/components/ui/EmptyState";

const typeConfig: Record<
  ActivityType,
  { icon: React.ReactNode; colorClass: string; dotClass: string }
> = {
  listing: {
    icon: <Home className="size-3.5" />,
    colorClass: "text-emerald-800 bg-emerald-50",
    dotClass: "bg-emerald-800 ring-emerald-50",
  },
  lead: {
    icon: <User className="size-3.5" />,
    colorClass: "text-blue-700 bg-blue-50",
    dotClass: "bg-blue-600 ring-blue-50",
  },
  sale: {
    icon: <DollarSign className="size-3.5" />,
    colorClass: "text-amber-700 bg-amber-50",
    dotClass: "bg-amber-500 ring-amber-50",
  },
  view: {
    icon: <Eye className="size-3.5" />,
    colorClass: "text-neutral-600 bg-neutral-100",
    dotClass: "bg-neutral-600 ring-neutral-100",
  },
  offer: {
    icon: <FileText className="size-3.5" />,
    colorClass: "text-purple-700 bg-purple-50",
    dotClass: "bg-purple-600 ring-purple-50",
  },
  review: {
    icon: <Star className="size-3.5" />,
    colorClass: "text-yellow-700 bg-yellow-50",
    dotClass: "bg-yellow-500 ring-yellow-50",
  },
};

interface RecentActivityProps {
  activities?: Activity[];
}

export function RecentActivity({ activities = mockActivities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px] h-full">
        <EmptyState
          icon={<ActivityIcon className="size-6" />}
          title="No recent activity"
          description="There is no recent agent actions recorded in your log yet."
          className="border-none shadow-none py-0"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-neutral-100 shrink-0">
        <div className="flex items-center justify-center size-8 rounded-lg bg-neutral-50 text-neutral-500">
          <ActivityIcon className="size-4" />
        </div>
        <h3 className="text-base font-heading font-bold text-neutral-900">
          Recent Activity
        </h3>
      </div>

      {/* Timeline Feed */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="relative border-l border-neutral-200 pl-6 space-y-6 pb-2">
          {activities.map((activity) => {
            const config = typeConfig[activity.type] || typeConfig.view;

            return (
              <div key={activity.id} className="relative group">
                {/* Timeline Connector Dot */}
                <div
                  className={`absolute -left-[31px] top-1 flex items-center justify-center size-6 rounded-full border border-white text-white shadow-xs ring-4 transition-transform group-hover:scale-110 ${config.dotClass}`}
                >
                  {config.icon}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-bold text-neutral-800">
                      {activity.title}
                    </h4>
                    <span className="text-[10px] font-medium text-neutral-400 whitespace-nowrap shrink-0">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
