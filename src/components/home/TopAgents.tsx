"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { agents as mockAgents } from "@/data/agents";
import { AgentCard } from "@/components/ui/AgentCard";
import type { Agent } from "@/types";

const mockTopAgents = mockAgents.slice(0, 4);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface TopAgentsProps {
  agents?: Agent[];
}

export function TopAgents({ agents = mockTopAgents }: TopAgentsProps) {
  return (
    <section className="py-16 md:py-24 section-padding">
      <div className="section-width">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                <Users className="size-3" />
                Expert Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              Top Real Estate Agents
            </h2>
            <p className="mt-2 text-neutral-600 text-base md:text-lg max-w-xl">
              Connect with experienced professionals
            </p>
          </div>

          <Link
            href="/listings"
            className={cn(
              "inline-flex items-center gap-2 shrink-0",
              "h-11 px-6 rounded-xl",
              "border border-emerald-200 bg-emerald-50 text-emerald-800",
              "text-sm font-semibold",
              "hover:bg-emerald-100 hover:border-emerald-300",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
              "group/btn"
            )}
          >
            Meet All Agents
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Agents grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {agents.map((agent, index) => (
            <motion.div key={agent.id} variants={itemVariants}>
              <AgentCard agent={agent} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
