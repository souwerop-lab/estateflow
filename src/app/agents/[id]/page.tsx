import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Building2,
  CheckCircle2,
  Home,
  Languages,
  Mail,
  Phone,
  Star,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { getAgentById, getProperties } from "@/lib/data/estate";
import type { Agent } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, "");
}

function AgentAvatar({ agent }: { agent: Agent }) {
  return (
    <div className="relative size-28 overflow-hidden rounded-2xl bg-neutral-100 ring-4 ring-white shadow-lg md:size-36">
      {agent.avatar ? (
        <Image
          src={agent.avatar}
          alt={agent.name}
          fill
          sizes="144px"
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-emerald-100 text-3xl font-heading font-black text-emerald-800">
          {getInitials(agent.name)}
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const agent = await getAgentById(resolvedParams.id);

  if (!agent) {
    return {
      title: "Agent Not Found | EstateFlow",
      description: "The requested EstateFlow agent profile does not exist.",
    };
  }

  return {
    title: `${agent.name} | EstateFlow Agent`,
    description: `${agent.name}, ${agent.title}. ${agent.bio.slice(0, 150)}...`,
    openGraph: {
      title: `${agent.name} | EstateFlow Agent`,
      description: agent.bio,
      images: [
        {
          url: agent.avatar,
          width: 512,
          height: 512,
          alt: agent.name,
        },
      ],
    },
  };
}

export default async function AgentProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const [agent, properties] = await Promise.all([
    getAgentById(resolvedParams.id),
    getProperties(),
  ]);

  if (!agent) {
    notFound();
  }

  const agentListings = properties.filter((property) => property.agent.id === agent.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] pt-24">
        <section className="section-padding py-8 md:py-12">
          <div className="section-width">
            <Link
              href="/agents"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-emerald-800"
            >
              <ArrowLeft className="size-4" />
              Back to agents
            </Link>

            <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xs">
              <div className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-neutral-900 px-5 py-8 text-white md:px-8 md:py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                    <AgentAvatar agent={agent} />
                    <div>
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-50">
                        <CheckCircle2 className="size-3.5 text-amber-300" />
                        Verified EstateFlow Advisor
                      </div>
                      <h1 className="text-3xl font-heading font-black leading-tight md:text-5xl">
                        {agent.name}
                      </h1>
                      <p className="mt-2 text-base text-white/75 md:text-lg">
                        {agent.title}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/80">
                        <span className="inline-flex items-center gap-1.5">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                          <strong className="text-white">{agent.rating.toFixed(1)}</strong>
                          ({agent.reviewCount} reviews)
                        </span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
                        <span>{agent.experience} years experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 md:min-w-72">
                    <a
                      href={`tel:${cleanPhone(agent.phone)}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-50"
                    >
                      <Phone className="size-4" />
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 text-sm font-bold text-white transition-colors hover:bg-white/15"
                    >
                      <Mail className="size-4" />
                      Email Agent
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
                <div className="space-y-8 p-5 md:p-8">
                  <section>
                    <h2 className="text-xl font-heading font-bold text-neutral-950">
                      About {agent.name.split(" ")[0]}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">
                      {agent.bio}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-heading font-bold text-neutral-950">
                      Specialties
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {agent.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-heading font-bold text-neutral-950">
                          Active Listings
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                          Current demo inventory represented by this agent.
                        </p>
                      </div>
                      <Link
                        href={`/listings?search=${encodeURIComponent(agent.name.split(" ")[0])}`}
                        className="hidden text-sm font-semibold text-emerald-800 hover:text-emerald-700 sm:block"
                      >
                        View search
                      </Link>
                    </div>

                    {agentListings.length > 0 ? (
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {agentListings.map((property) => (
                          <PropertyCard
                            key={property.id}
                            property={property}
                            isFavorite={false}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-5 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
                        <Building2 className="mx-auto size-8 text-neutral-300" />
                        <p className="mt-3 text-sm font-semibold text-neutral-700">
                          No active listings in this demo profile.
                        </p>
                      </div>
                    )}
                  </section>
                </div>

                <aside className="border-t border-neutral-100 bg-neutral-50 p-5 md:p-8 lg:border-l lg:border-t-0">
                  <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-3 text-center shadow-xs">
                    <div className="rounded-xl bg-neutral-50 p-3">
                      <TrendingUp className="mx-auto mb-2 size-4 text-emerald-700" />
                      <span className="block text-lg font-heading font-black text-neutral-950">
                        {agent.totalSales}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        Sales
                      </span>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-3">
                      <Home className="mx-auto mb-2 size-4 text-emerald-700" />
                      <span className="block text-lg font-heading font-black text-neutral-950">
                        {agent.activeListings}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        Active
                      </span>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-3">
                      <Award className="mx-auto mb-2 size-4 text-emerald-700" />
                      <span className="block text-lg font-heading font-black text-neutral-950">
                        {agent.experience}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                        Years
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white p-5 shadow-xs">
                    <h3 className="flex items-center gap-2 text-sm font-heading font-bold text-neutral-950">
                      <Languages className="size-4 text-emerald-700" />
                      Languages
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {agent.languages.map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white p-5 shadow-xs">
                    <h3 className="flex items-center gap-2 text-sm font-heading font-bold text-neutral-950">
                      <Award className="size-4 text-emerald-700" />
                      Certifications
                    </h3>
                    <div className="mt-3 space-y-2">
                      {agent.certifications.map((certification) => (
                        <div
                          key={certification}
                          className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700"
                        >
                          <CheckCircle2 className="size-4 text-emerald-700" />
                          {certification}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white p-5 shadow-xs">
                    <h3 className="text-sm font-heading font-bold text-neutral-950">
                      Direct Contact
                    </h3>
                    <div className="mt-4 space-y-2">
                      <a
                        href={`tel:${cleanPhone(agent.phone)}`}
                        className="flex items-center gap-3 rounded-xl border border-neutral-100 px-3 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <Phone className="size-4 text-neutral-400" />
                        {agent.phone}
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-3 rounded-xl border border-neutral-100 px-3 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <Mail className="size-4 text-neutral-400" />
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
