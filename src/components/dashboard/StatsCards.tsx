"use client";

import { motion } from "framer-motion";
import { Eye, Users, DollarSign, CheckCircle } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";
import { dashboardStats as mockDashboardStats } from "@/data/dashboard";
import { formatFullPrice, formatNumber } from "@/lib/constants";
import type { DashboardStats } from "@/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

interface StatsCardsProps {
  stats?: DashboardStats;
}

export function StatsCards({ stats = mockDashboardStats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Views",
      value: formatNumber(stats.totalViews),
      change: stats.viewsChange,
      subtitle: "vs last month",
      icon: <Eye className="size-5" />,
    },
    {
      title: "Active Leads",
      value: stats.totalLeads,
      change: stats.leadsChange,
      subtitle: "vs last month",
      icon: <Users className="size-5" />,
    },
    {
      title: "Total Revenue",
      value: formatFullPrice(stats.totalRevenue),
      change: stats.revenueChange,
      subtitle: "vs last month",
      icon: <DollarSign className="size-5" />,
    },
    {
      title: "Closed Deals",
      value: stats.closedDeals,
      change: stats.dealsChange,
      subtitle: "vs last month",
      icon: <CheckCircle className="size-5" />,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {cards.map((stat, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <StatsCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
