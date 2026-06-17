"use client";

import { MessageSquare, Calendar, DollarSign, ArrowRight, UserX } from "lucide-react";
import { leads } from "@/data/dashboard";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/EmptyState";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  contacted: {
    label: "Contacted",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  qualified: {
    label: "Qualified",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  negotiating: {
    label: "Negotiating",
    className: "bg-purple-50 text-purple-700 border-purple-100",
  },
  closed: {
    label: "Closed",
    className: "bg-neutral-50 text-neutral-600 border-neutral-200",
  },
  lost: {
    label: "Lost",
    className: "bg-red-50 text-red-700 border-red-100",
  },
};

export function LeadsSection() {
  // Show first 4 leads for dashboard preview
  const recentLeads = leads.slice(0, 4);

  if (recentLeads.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px]">
        <EmptyState
          icon={<UserX className="size-6" />}
          title="No leads available"
          description="You don't have any incoming customer inquiries at the moment. Active leads will appear here."
          className="border-none shadow-none py-0"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
        <h3 className="text-base font-heading font-bold text-neutral-900">
          Recent Leads & Inquiries
        </h3>
        <button className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 hover:underline transition-all inline-flex items-center gap-1">
          View all leads
          <ArrowRight className="size-3" />
        </button>
      </div>

      {/* Leads List */}
      <div className="divide-y divide-neutral-100">
        {recentLeads.map((lead) => {
          const status = statusConfig[lead.status] || statusConfig["new"];
          const initials = lead.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div key={lead.id} className="p-5 hover:bg-neutral-50/20 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                {/* Lead User Info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">{lead.name}</h4>
                    <span className="text-xs text-neutral-400 block mt-0.5">{lead.email}</span>
                  </div>
                </div>

                {/* Status Badges & Date */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-semibold px-2 py-0 rounded-full ${status.className}`}
                  >
                    {status.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-400">
                    <Calendar className="size-3" />
                    {new Date(lead.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <p className="text-xs text-neutral-500 leading-relaxed bg-neutral-50 rounded-xl p-3 mb-2">
                &ldquo;{lead.message}&rdquo;
              </p>

              {/* Related Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="size-3.5 text-neutral-400" />
                  <span className="text-neutral-400 font-medium">Interest:</span>
                  <span className="text-neutral-800 font-bold">{lead.property}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="size-3.5 text-neutral-400" />
                  <span className="text-neutral-400 font-medium">Budget:</span>
                  <span className="text-emerald-800 font-bold">{lead.budget}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
