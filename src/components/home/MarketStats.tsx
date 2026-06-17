"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Home,
  DollarSign,
  Users,
  MapPin,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { marketStats } from "@/data/stats";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  "dollar-sign": DollarSign,
  users: Users,
  "map-pin": MapPin,
  "bar-chart": BarChart3,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function MarketStats() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-emerald" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,77,62,1) 0%, rgba(42,107,84,0.9) 50%, rgba(27,77,62,1) 100%)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 py-16 md:py-24 section-padding">
        <div className="section-width">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <BarChart3 className="size-3" />
                Performance
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Market Insights
            </h2>
            <p className="mt-3 text-emerald-100/70 text-base md:text-lg max-w-xl mx-auto">
              Tracking real estate performance and growth across the nation
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {marketStats.map((stat) => {
              const IconComp = iconMap[stat.icon] || Home;

              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className={cn(
                    "relative group",
                    "rounded-2xl p-6 md:p-7",
                    "bg-white/[0.07] backdrop-blur-sm",
                    "border border-white/10",
                    "hover:bg-white/[0.12] transition-colors duration-300"
                  )}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center size-12 rounded-xl bg-white/10 text-amber-400 mb-4">
                    <IconComp className="size-6" />
                  </div>

                  {/* Value */}
                  <p className="text-3xl md:text-4xl font-heading font-bold text-white leading-none">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="mt-2 text-sm text-emerald-100/70 font-medium">
                    {stat.label}
                  </p>

                  {/* Change */}
                  <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15">
                    <TrendingUp className="size-3 text-emerald-300" />
                    <span className="text-xs font-semibold text-emerald-300">
                      +{stat.change}%
                    </span>
                    <span className="text-xs text-emerald-200/50">
                      {stat.changeLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Period note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center text-xs text-emerald-200/40"
          >
            Data reflects cumulative performance through 2026
          </motion.p>
        </div>
      </div>
    </section>
  );
}
