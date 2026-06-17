"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  Building,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "@/lib/constants";
import { useComingSoon } from "@/components/ui/ComingSoonToast";

const iconMap: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard className="w-5 h-5" />,
  "building-2": <Building className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  "bar-chart-3": <BarChart3 className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
};

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DashboardSidebar({
  collapsed = false,
  onCollapse,
  activeTab = "Overview",
  onTabChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { showToast } = useComingSoon();

  const handleNotificationsClick = () => {
    showToast("Agent Notifications");
  };

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Sign Out");
    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-white border-r border-neutral-200 h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-20 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-heading font-bold tracking-tight">
              Estate<span className="text-amber-400">Flow</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-neutral-400 hover:text-neutral-600 h-8 w-8 cursor-pointer"
            onClick={() => onCollapse?.(true)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      {/* Agent Profile */}
      <div className={cn("p-4", collapsed && "flex justify-center")}>
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "flex-col"
          )}
        >
          <Avatar className="w-10 h-10 border-2 border-emerald-100 shrink-0">
            <AvatarFallback className="bg-emerald-800 text-white text-sm font-bold">
              SM
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                Sarah Mitchell
              </p>
              <p className="text-xs text-neutral-500 truncate">
                Senior Advisor
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationsClick}
              className="rounded-full h-8 w-8 text-neutral-400 relative cursor-pointer hover:bg-neutral-50"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {DASHBOARD_NAV.map((item) => {
          const isActive = item.label === activeTab;
          return (
            <button
              key={item.label}
              onClick={() => onTabChange?.(item.label)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl transition-colors text-left cursor-pointer",
                collapsed
                  ? "justify-center p-3"
                  : "px-3 py-2.5",
                isActive
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
              )}
              title={collapsed ? item.label : undefined}
            >
              <span className="shrink-0">
                {iconMap[item.icon] || (
                  <LayoutDashboard className="w-5 h-5" />
                )}
              </span>
              {!collapsed && (
                <>
                  <span className="text-sm font-semibold flex-1 truncate">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge
                      className={cn(
                        "rounded-full text-[10px] h-5 min-w-5 justify-center border-none shadow-xs",
                        isActive
                          ? "bg-emerald-800 text-white hover:bg-emerald-800"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-100"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      <Separator />

      {/* Bottom */}
      <div className="p-3">
        {collapsed ? (
          <Button
            variant="ghost"
            size="icon"
            className="w-full rounded-xl text-neutral-400 cursor-pointer"
            onClick={() => onCollapse?.(false)}
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleSignOutClick}
            className="w-full justify-start gap-3 rounded-xl text-neutral-500 hover:text-red-600 hover:bg-red-50/50 px-3 py-2.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Sign Out</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
