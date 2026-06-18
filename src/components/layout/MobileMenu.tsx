"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Heart,
  Home,
  LayoutDashboard,
  ListFilter,
  User,
  Users,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navIcons: Record<string, React.ReactNode> = {
  "/": <Home className="w-5 h-5" />,
  "/listings": <ListFilter className="w-5 h-5" />,
  "/agents": <Users className="w-5 h-5" />,
  "/favorites": <Heart className="w-5 h-5" />,
  "/dashboard": <LayoutDashboard className="w-5 h-5" />,
};

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => onOpenChange(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <SheetTitle className="text-xl font-heading font-bold tracking-tight">
                Estate<span className="text-amber-400">Flow</span>
              </SheetTitle>
            </Link>
          </div>
        </SheetHeader>

        <Separator />

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                {navIcons[item.href]}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-4" />

        <div className="p-4">
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl shadow-md cursor-pointer transition-colors"
            render={
              <Link href="/dashboard" onClick={() => onOpenChange(false)} />
            }
          >
            <User className="w-4 h-4 mr-2" />
            Agent Portal
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs text-neutral-400 text-center">
            © 2026 EstateFlow. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
