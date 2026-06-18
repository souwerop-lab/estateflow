import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { getDashboardData } from "@/lib/data/estate";

export const metadata: Metadata = {
  title: "Agent Dashboard | EstateFlow",
  description:
    "Agent portal for EstateFlow. Manage active real estate listings, track incoming customer leads, monitor page view performance, and configure settings.",
  openGraph: {
    title: "Agent Dashboard | EstateFlow",
    description: "SaaS portal to manage listings, leads, and analytics.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Agent Portal Dashboard",
      },
    ],
  },
};

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return <DashboardClient data={dashboardData} />;
}
