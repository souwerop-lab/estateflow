import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Search, Star, Users } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgentCard } from "@/components/ui/AgentCard";
import { getAgents } from "@/lib/data/estate";
import { formatNumber } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Real Estate Agents | EstateFlow",
  description:
    "Meet EstateFlow's experienced real estate agents specializing in luxury homes, condos, investment properties, and local market guidance.",
  openGraph: {
    title: "Real Estate Agents | EstateFlow",
    description:
      "Connect with EstateFlow agents for property tours, market advice, and buying support.",
  },
};

export default async function AgentsPage() {
  const agents = await getAgents();
  const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
  const activeListings = agents.reduce((sum, agent) => sum + agent.activeListings, 0);
  const avgRating =
    agents.length > 0
      ? agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length
      : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] pt-24">
        <section className="section-padding py-10 md:py-14">
          <div className="section-width">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  <Users className="size-3.5" />
                  EstateFlow Agents
                </span>
                <h1 className="mt-5 max-w-3xl text-4xl font-heading font-black leading-tight text-neutral-950 md:text-5xl">
                  Work with agents who know the market in detail.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
                  Browse experienced advisors across luxury homes, city condos,
                  waterfront properties, and investment-focused listings.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xs">
                <div className="rounded-xl bg-neutral-50 p-4 text-center">
                  <div className="text-2xl font-heading font-black text-emerald-800">
                    {agents.length}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Agents
                  </div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4 text-center">
                  <div className="text-2xl font-heading font-black text-emerald-800">
                    {formatNumber(totalSales)}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Sales
                  </div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4 text-center">
                  <div className="text-2xl font-heading font-black text-emerald-800">
                    {avgRating.toFixed(1)}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {agents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-100 bg-white p-5 shadow-xs md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold text-neutral-950">
                    Need a specific market specialist?
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {formatNumber(activeListings)} active listings are represented
                    by this demo team.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/listings"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    <Search className="size-4" />
                    Browse Listings
                  </Link>
                  <a
                    href="mailto:hello@estateflow.com"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <Mail className="size-4 text-neutral-400" />
                    Contact Office
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {agents.slice(0, 3).map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-neutral-100 bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold text-neutral-950">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {agent.rating.toFixed(1)}
                      <span className="font-medium text-neutral-400">
                        ({agent.reviewCount})
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-neutral-800">
                      {agent.name}
                    </p>
                    <p className="text-xs text-neutral-500">{agent.phone}</p>
                  </div>
                  <ArrowRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-800" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
