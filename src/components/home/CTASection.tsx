"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Star,
  Shield,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useComingSoon } from "@/components/ui/ComingSoonToast";

const miniCards = [
  {
    title: "Luxury Waterfront Villa",
    location: "Miami Beach, FL",
    price: "$4.25M",
    beds: 5,
    baths: 4,
    color: "from-emerald-600 to-teal-600",
    rotate: "-3deg",
    offset: "translate-y-4",
  },
  {
    title: "Beverly Hills Modern Estate",
    location: "Beverly Hills, CA",
    price: "$8.95M",
    beds: 6,
    baths: 7,
    color: "from-slate-700 to-emerald-800",
    rotate: "2deg",
    offset: "-translate-y-2",
  },
  {
    title: "Manhattan Penthouse",
    location: "Manhattan, NY",
    price: "$6.50M",
    beds: 3,
    baths: 3,
    color: "from-emerald-800 to-green-700",
    rotate: "-1deg",
    offset: "translate-y-1",
  },
];

const benefits = [
  { icon: Shield, label: "Verified listings only" },
  { icon: Clock, label: "24/7 expert support" },
  { icon: HeartHandshake, label: "Personalized service" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: 40,
    rotate: 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: i === 0 ? -3 : i === 1 ? 2 : -1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function CTASection() {
  const { showToast } = useComingSoon();

  return (
    <section className="py-16 md:py-24 bg-neutral-50 section-padding overflow-hidden">
      <div className="section-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                <Star className="size-3 fill-amber-500 text-amber-500" />
                Start Your Journey
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-neutral-900 leading-tight"
            >
              Ready to Find Your <span className="text-emerald-800 font-extrabold">Perfect Home?</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-neutral-600 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Whether you are buying your first home or searching for a luxury
              estate, our team of experienced agents is here to guide you every
              step of the way.
            </motion.p>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-4"
            >
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex items-center gap-2 text-sm text-neutral-700"
                >
                  <div className="flex items-center justify-center size-7 rounded-lg bg-emerald-50 text-emerald-700">
                    <benefit.icon className="size-3.5" />
                  </div>
                  <span className="font-medium">{benefit.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/listings"
                className={cn(
                  "inline-flex items-center gap-2",
                  "h-12 px-7 rounded-xl",
                  "bg-emerald-800 text-white text-sm font-semibold",
                  "hover:bg-emerald-700 active:bg-emerald-900",
                  "transition-colors duration-200 shadow-sm cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                  "group/btn"
                )}
              >
                Browse Listings
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => showToast("Contact Agent Form")}
                className={cn(
                  "inline-flex items-center gap-2 cursor-pointer",
                  "h-12 px-7 rounded-xl",
                  "border-2 border-neutral-200 bg-white text-neutral-800 text-sm font-semibold",
                  "hover:border-neutral-300 hover:bg-neutral-50",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                )}
              >
                <MessageCircle className="size-4" />
                Contact Agent
              </button>
            </motion.div>
          </motion.div>

          {/* Right — decorative mini property cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative flex items-center justify-center min-h-[340px] lg:min-h-[420px]"
          >
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl" />
            </div>

            {/* Stacked cards */}
            <div className="relative w-full max-w-sm">
              {miniCards.map((card, i) => (
                <Link
                  key={card.title}
                  href={i === 0 ? "/property/prop-1" : i === 1 ? "/property/prop-2" : "/property/prop-3"}
                  className="block group/mini"
                >
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    className={cn(
                      "relative bg-white rounded-2xl shadow-card border border-neutral-100 overflow-hidden",
                      "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200",
                      i > 0 && "mt-[-30px]"
                    )}
                    style={{
                      zIndex: miniCards.length - i,
                    }}
                  >
                    {/* Mini card color bar */}
                    <div
                      className={cn(
                        "h-2 w-full bg-gradient-to-r",
                        card.color
                      )}
                    />

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-heading font-bold text-neutral-900 truncate group-hover/mini:text-emerald-800 transition-colors">
                            {card.title}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="size-3 text-neutral-400 shrink-0" />
                            <p className="text-xs text-neutral-500 truncate">
                              {card.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-heading font-bold text-emerald-800 shrink-0">
                          {card.price}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Bed className="size-3.5 text-neutral-400" />
                          <span className="text-xs font-medium">
                            {card.beds} bd
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="size-3.5 text-neutral-400" />
                          <span className="text-xs font-medium">
                            {card.baths} ba
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
