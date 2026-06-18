"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  Building2,
  Calendar,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Building,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
} from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ListingsTable } from "@/components/dashboard/ListingsTable";
import { LeadsSection } from "@/components/dashboard/LeadsSection";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PerformanceCards } from "@/components/dashboard/PerformanceCards";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DASHBOARD_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useComingSoon } from "@/components/ui/ComingSoonToast";

const iconMap: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard className="w-4 h-4" />,
  "building-2": <Building className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  "bar-chart-3": <BarChart3 className="w-4 h-4" />,
  "message-square": <MessageSquare className="w-4 h-4" />,
  calendar: <Calendar className="w-4 h-4" />,
  settings: <Settings className="w-4 h-4" />,
};

export default function DashboardClient() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const { showToast } = useComingSoon();

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNotificationsClick = () => {
    showToast("Agent Notifications");
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Exit Dashboard");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-xl">
                <h1 className="text-xl md:text-2xl font-heading font-black tracking-tight leading-tight">
                  Welcome back, Sarah!
                </h1>
                <p className="text-xs md:text-sm text-emerald-100 mt-2 leading-relaxed opacity-90">
                  Here is a summary of your property portfolio. You have 3 new inquiries and 2 pending tours scheduled for today. Keep up the great work!
                </p>
              </div>
              {/* Decorative Orbs */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[24px] border-emerald-500" />
              </div>
            </div>

            {/* Row 1: KPI Stats Cards */}
            <StatsCards />

            {/* Row 2: CSS charts */}
            <PerformanceCards />

            {/* Row 3: Listings table + Recent Activity Timeline */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
              <div className="xl:col-span-2">
                <ListingsTable />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>

            {/* Row 4: Client Leads Inquiries */}
            <LeadsSection />
          </>
        );

      case "My Listings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-heading font-bold text-neutral-900">My Listings</h1>
              <p className="text-xs text-neutral-500 mt-0.5">Manage and edit your active property listings</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-2 shadow-xs">
              <ListingsTable />
            </div>
          </div>
        );

      case "Leads":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-heading font-bold text-neutral-900">Leads & Inquiries</h1>
              <p className="text-xs text-neutral-500 mt-0.5">Review client requests and schedules</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-2 shadow-xs">
              <LeadsSection />
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-heading font-bold text-neutral-900">Performance Analytics</h1>
              <p className="text-xs text-neutral-500 mt-0.5">Review sales, views, and conversion stats</p>
            </div>
            <StatsCards />
            <PerformanceCards />
          </div>
        );

      default:
        // Messages, Calendar, Settings
        return (
          <div className="min-h-[55vh] flex items-center justify-center bg-white rounded-2xl border border-neutral-200 p-8">
            <div className="text-center max-w-sm">
              <div className="flex items-center justify-center size-12 rounded-2xl bg-emerald-50 text-emerald-800 mx-auto mb-4">
                {activeTab === "Messages" && <MessageSquare className="size-6" />}
                {activeTab === "Calendar" && <Calendar className="size-6" />}
                {activeTab === "Settings" && <Settings className="size-6" />}
              </div>
              <h3 className="text-base font-heading font-bold text-neutral-900">{activeTab} Integration</h3>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                This dashboard module is currently under construction. In the next release, you will be able to synchronize your live data.
              </p>
              <Button 
                onClick={() => setActiveTab("Overview")}
                className="mt-5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold px-4 cursor-pointer transition-colors"
              >
                Back to Overview
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen text-neutral-900 font-sans">
      
      {/* ── Desktop Sidebar ── */}
      <DashboardSidebar collapsed={collapsed} onCollapse={setCollapsed} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Main Work Area ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* ── Top Dashboard Navbar ── */}
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-neutral-200 px-4 sm:px-6 md:px-8 flex items-center justify-between shrink-0">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="lg:hidden rounded-lg text-neutral-500 hover:bg-neutral-100 cursor-pointer"
                  />
                }
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white p-0 border-r border-neutral-200 flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center h-20 px-5 border-b border-neutral-100 shrink-0">
                  <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-heading font-bold tracking-tight">
                      Estate<span className="text-amber-500">Flow</span>
                    </span>
                  </Link>
                </div>
                
                {/* Mobile Nav Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                  {DASHBOARD_NAV.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setActiveTab(item.label);
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        activeTab === item.label
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {iconMap[item.icon]}
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-neutral-100">
                  <Link
                    href="/"
                    onClick={handleExitClick}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit Dashboard
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Brand Label */}
            <div className="block">
              <h2 className="text-sm font-bold text-neutral-900">
                {activeTab}
              </h2>
              <span className="text-[10px] text-neutral-400 font-medium mt-0.5 block">
                {todayStr}
              </span>
            </div>
          </div>

          {/* User notifications & Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleNotificationsClick}
              className="relative flex items-center justify-center size-9 rounded-full bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 text-neutral-500 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="h-6 w-px bg-neutral-200" />

            <div 
              onClick={() => showToast("User Profile Settings")}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Avatar className="w-8 h-8 border border-neutral-200">
                <AvatarFallback className="bg-emerald-800 text-white text-xs font-bold">
                  SM
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-bold text-neutral-800 group-hover:text-emerald-800 transition-colors">
                  Sarah Mitchell
                </span>
                <span className="text-[10px] text-neutral-400 font-medium block">
                  Senior Real Estate Advisor
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </header>

        {/* ── Dashboard Grid Content ── */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">
          {renderTabContent()}
        </main>
      </div>

    </div>
  );
}
