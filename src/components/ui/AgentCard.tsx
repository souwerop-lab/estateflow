"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Phone, Mail, Home, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  className?: string;
  index?: number;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AgentCard({ agent, className, index = 0 }: AgentCardProps) {
  const profileHref = `/agents/${agent.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: "easeOut",
      }}
      className={cn(
        "group overflow-hidden rounded-xl bg-white border border-neutral-100",
        "shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Top section with avatar */}
      <div className="relative flex flex-col items-center pt-6 pb-4 px-5">
        {/* Avatar */}
        <Link
          href={profileHref}
          className="relative size-20 rounded-full overflow-hidden bg-neutral-100 ring-4 ring-emerald-50 shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer block"
        >
          {agent.avatar ? (
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center size-full bg-emerald-100 text-emerald-700 text-lg font-heading font-bold">
              {getInitials(agent.name)}
            </div>
          )}
        </Link>

        {/* Name & title */}
        <Link
          href={profileHref}
          className="mt-3 text-lg font-heading font-bold text-neutral-900 text-center hover:text-emerald-800 transition-colors cursor-pointer block"
        >
          {agent.name}
        </Link>
        <p className="text-sm text-neutral-500 text-center">{agent.title}</p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-neutral-900">
            {agent.rating.toFixed(1)}
          </span>
          <span className="text-xs text-neutral-400">
            ({agent.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-5 grid grid-cols-3 gap-1 rounded-xl bg-neutral-50 p-3">
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-white text-emerald-600 shadow-sm">
            <TrendingUp className="size-4" />
          </div>
          <span className="text-sm font-bold text-neutral-900">
            {agent.totalSales}
          </span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
            Sales
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-white text-emerald-600 shadow-sm">
            <Home className="size-4" />
          </div>
          <span className="text-sm font-bold text-neutral-900">
            {agent.activeListings}
          </span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
            Active
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-white text-emerald-600 shadow-sm">
            <Award className="size-4" />
          </div>
          <span className="text-sm font-bold text-neutral-900">
            {agent.experience}yr
          </span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
            Exp
          </span>
        </div>
      </div>

      {/* Specialties */}
      {agent.specialties.length > 0 && (
        <div className="mt-3 px-5 flex flex-wrap gap-1.5">
          {agent.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
            >
              {specialty}
            </span>
          ))}
          {agent.specialties.length > 3 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500">
              +{agent.specialties.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Contact buttons */}
      <div className="mt-4 px-5 pb-5 grid grid-cols-2 gap-2">
        <a
          href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`}
          className={cn(
            "inline-flex items-center justify-center gap-1.5",
            "h-9 rounded-lg text-sm font-medium",
            "bg-emerald-800 text-white",
            "hover:bg-emerald-700 transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          )}
        >
          <Phone className="size-3.5" />
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className={cn(
            "inline-flex items-center justify-center gap-1.5",
            "h-9 rounded-lg text-sm font-medium",
            "border border-neutral-200 bg-white text-neutral-700",
            "hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          )}
        >
          <Mail className="size-3.5" />
          Email
        </a>
        <Link
          href={profileHref}
          className={cn(
            "col-span-2 inline-flex items-center justify-center gap-1.5",
            "h-9 rounded-lg text-sm font-semibold",
            "border border-emerald-100 bg-emerald-50 text-emerald-800",
            "hover:bg-emerald-100 transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          )}
        >
          View Profile
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
