import type { Metadata } from "next";
import { Suspense } from "react";
import ListingsClient from "./ListingsClient";

export const metadata: Metadata = {
  title: "Search Premium Properties | EstateFlow",
  description:
    "Search and filter premium houses, apartments, villas, and condos for sale and rent across the United States. Use our interactive map to locate properties.",
  openGraph: {
    title: "Search Premium Properties | EstateFlow",
    description:
      "Filter real estate listings by type, price range, bedrooms, and location with real-time updates.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "EstateFlow Listings Search",
      },
    ],
  },
};

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-800" />
        </div>
      }
    >
      <ListingsClient />
    </Suspense>
  );
}
