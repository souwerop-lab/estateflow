import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PopularLocations } from "@/components/home/PopularLocations";
import { TopAgents } from "@/components/home/TopAgents";
import { MarketStats } from "@/components/home/MarketStats";
import { CTASection } from "@/components/home/CTASection";
import { getAgents, getFeaturedProperties, getMarketStats } from "@/lib/data/estate";

export const metadata: Metadata = {
  title: "EstateFlow — Find Your Dream Home | Premium Real Estate Platform",
  description:
    "Discover exceptional properties in the most sought-after neighborhoods across the United States. Premium villas, penthouses, and apartments with expert agent support.",
  openGraph: {
    title: "EstateFlow — Find Your Dream Home",
    description:
      "Discover exceptional properties in the most sought-after neighborhoods across the United States.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "EstateFlow Luxury Villa",
      },
    ],
  },
};

export default async function HomePage() {
  const [featuredProperties, agents, marketStats] = await Promise.all([
    getFeaturedProperties(6),
    getAgents(),
    getMarketStats(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        <HeroSection />
        <FeaturedProperties properties={featuredProperties} />
        <PopularLocations />
        <TopAgents agents={agents.slice(0, 4)} />
        <MarketStats stats={marketStats} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
