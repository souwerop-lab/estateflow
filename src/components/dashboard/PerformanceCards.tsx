"use client";

import { BarChart3, LineChart } from "lucide-react";
import { dashboardStats as mockDashboardStats } from "@/data/dashboard";
import { formatNumber } from "@/lib/constants";
import type { DashboardStats } from "@/types";

interface PerformanceCardsProps {
  stats?: DashboardStats;
}

export function PerformanceCards({ stats = mockDashboardStats }: PerformanceCardsProps) {
  const months = [
    { name: "Oct", value: "$1.2M", pct: 40 },
    { name: "Nov", value: "$1.8M", pct: 60 },
    { name: "Dec", value: "$2.5M", pct: 85 },
    { name: "Jan", value: "$1.5M", pct: 50 },
    { name: "Feb", value: "$2.1M", pct: 70 },
    { name: "Mar", value: "$2.9M", pct: 100 },
  ];

  const funnelStages = [
    { label: "Views", count: formatNumber(stats.totalViews), pct: 100, color: "bg-emerald-800" },
    { label: "Inquiries", count: formatNumber(stats.totalLeads * 10), pct: 70, color: "bg-emerald-700" },
    { label: "Showings", count: "234", pct: 45, color: "bg-emerald-600" },
    { label: "Offers", count: "45", pct: 25, color: "bg-amber-500" },
    { label: "Closed", count: String(stats.closedDeals), pct: 10, color: "bg-amber-400" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Monthly Revenue Chart */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex flex-col h-[320px]">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-50 text-emerald-700">
            <BarChart3 className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-neutral-900">
              Monthly Revenue Performance
            </h3>
            <span className="text-[10px] text-neutral-400 font-medium mt-0.5 block">
              Agent total closing volume
            </span>
          </div>
        </div>

        {/* Bars Container */}
        <div className="flex-1 flex items-end justify-between gap-3 px-2">
          {months.map((month, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-900 text-white text-[10px] font-semibold px-2 py-1 rounded-md mb-2 absolute translate-y-[-40px] shadow-sm pointer-events-none">
                {month.value}
              </div>

              {/* Bar */}
              <div className="w-full bg-neutral-50 rounded-t-lg overflow-hidden h-[150px] flex items-end">
                <div
                  style={{ height: `${month.pct}%` }}
                  className="w-full bg-gradient-to-t from-emerald-800 to-emerald-600 rounded-t-lg transition-all duration-700 ease-out group-hover:from-emerald-700 group-hover:to-emerald-500"
                />
              </div>

              {/* Label */}
              <span className="text-xs font-semibold text-neutral-500 mt-2.5">
                {month.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm flex flex-col h-[320px]">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-50 text-emerald-700">
            <LineChart className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-neutral-900">
              Deal Conversion Funnel
            </h3>
            <span className="text-[10px] text-neutral-400 font-medium mt-0.5 block">
              Lead lifecycle conversion stages
            </span>
          </div>
        </div>

        {/* Funnel Rows */}
        <div className="flex-1 flex flex-col justify-between">
          {funnelStages.map((stage, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <span className="text-xs font-semibold text-neutral-500 w-16 truncate">
                {stage.label}
              </span>
              <div className="flex-1 bg-neutral-50 rounded-lg h-5 relative overflow-hidden">
                <div
                  style={{ width: `${stage.pct}%` }}
                  className={`h-full ${stage.color} rounded-lg transition-all duration-700 ease-out`}
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white z-10">
                  {stage.count}
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 w-8 text-right">
                {stage.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
