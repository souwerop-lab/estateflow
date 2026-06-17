"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Home, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#FAFAFA] overflow-hidden select-none px-4 sm:px-6">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 flex items-center justify-center size-20 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm"
        >
          {/* Logo with split offset animation */}
          <Building2 className="w-10 h-10" />
          <motion.div 
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="absolute -top-1 -right-1 flex items-center justify-center size-6 rounded-lg bg-amber-400 text-amber-950 font-bold text-xs shadow-md border border-white"
          >
            404
          </motion.div>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-neutral-900 leading-none"
        >
          Page Not Found
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-sm sm:text-base text-neutral-500 max-w-md leading-relaxed"
        >
          The property, agent portal, or listing page you are looking for doesn't exist or has been relocated to another area of EstateFlow.
        </motion.p>

        {/* Quick Search Helper Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md"
        >
          <div className="p-4 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-xs text-left transition-all hover:border-emerald-200 hover:shadow-xs group">
            <Search className="size-4 text-emerald-700 mb-2 group-hover:scale-105 transition-transform" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Search Catalog</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-snug">Browse through all active luxury listings and filters.</p>
            <Link href="/listings" className="absolute inset-0" />
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-xs text-left transition-all hover:border-emerald-200 hover:shadow-xs group">
            <Building2 className="size-4 text-emerald-700 mb-2 group-hover:scale-105 transition-transform" />
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Agent Portal</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-snug">Sign in to manage active listings, leads, and analytics.</p>
            <Link href="/dashboard" className="absolute inset-0" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Button
            className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl px-6 h-11 text-xs font-semibold tracking-wide uppercase transition-all shadow-md cursor-pointer"
            render={<Link href="/" />}
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            Back to Home
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 rounded-xl px-6 h-11 text-xs font-semibold tracking-wide uppercase cursor-pointer"
            render={<Link href="/listings" />}
          >
            Browse Listings
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
