"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  Heart,
  Menu,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";

  if (isDashboard) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-white/20 shadow-sm"
            : isHome
              ? "bg-transparent"
              : "bg-white/95 backdrop-blur-md border-b border-neutral-100"
        )}
      >
        <div className="section-width section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span
                className={cn(
                  "text-xl font-heading font-bold tracking-tight transition-colors",
                  isScrolled || !isHome ? "text-neutral-900" : "text-white"
                )}
              >
                Estate<span className="text-amber-400">Flow</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? isScrolled || !isHome
                          ? "text-emerald-800 bg-emerald-50"
                          : "text-white bg-white/15"
                        : isScrolled || !isHome
                          ? "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-800 rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full",
                  isScrolled || !isHome
                    ? "text-neutral-600 hover:text-neutral-900"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
                render={<Link href="/listings" />}
              >
                <Search className="w-[18px] h-[18px]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full",
                  isScrolled || !isHome
                    ? "text-neutral-600 hover:text-neutral-900"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
                render={<Link href="/favorites" />}
              >
                <Heart className="w-[18px] h-[18px]" />
              </Button>

              <Button
                className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-full px-5 shadow-md hover:shadow-lg transition-all ml-1 cursor-pointer"
                render={<Link href="/dashboard" />}
              >
                <User className="w-4 h-4 mr-2" />
                Agent Portal
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden rounded-full",
                isScrolled || !isHome
                  ? "text-neutral-600"
                  : "text-white"
              )}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
