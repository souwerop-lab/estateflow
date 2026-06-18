import { agents as mockAgents } from "@/data/agents";
import { properties as mockProperties } from "@/data/properties";
import { dashboardStats as mockDashboardStats, leads as mockLeads, activities as mockActivities } from "@/data/dashboard";
import { marketStats as mockMarketStats } from "@/data/stats";
import type { Activity, Agent, DashboardStats, Lead, MarketStat, PriceHistoryEntry, Property } from "@/types";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type AgentRow = Omit<Agent, "socialMedia" | "reviewCount" | "totalSales" | "activeListings"> & {
  review_count: number;
  total_sales: number;
  active_listings: number;
  social_media: Agent["socialMedia"];
};

type PropertyRow = Omit<Property, "address" | "coordinates" | "agent" | "priceHistory" | "isFeatured" | "isNew" | "listedDate" | "daysOnMarket" | "lotSize" | "pricePerSqft" | "openHouse" | "virtualTour" | "yearBuilt"> & {
  price_per_sqft: number;
  address: Property["address"];
  coordinates: Property["coordinates"];
  agent: AgentRow;
  listed_date: string;
  days_on_market: number;
  lot_size: string;
  year_built: number;
  open_house: string | null;
  virtual_tour: string | null;
  is_featured: boolean;
  is_new: boolean;
  property_price_history: PriceHistoryEntry[];
};

type DashboardMetricRow = {
  total_listings: number;
  active_listings: number;
  total_views: number;
  views_change: number;
  total_leads: number;
  leads_change: number;
  total_revenue: number;
  revenue_change: number;
  closed_deals: number;
  deals_change: number;
  avg_days_on_market: number;
  conversion_rate: number;
};

type LeadRow = Omit<Lead, "propertyId"> & {
  property_id: string;
};

type ActivityRow = Omit<Activity, "relatedId"> & {
  related_id: string | null;
};

type MarketStatRow = Omit<MarketStat, "changeLabel"> & {
  change_label: string;
};

function mapAgent(row: AgentRow): Agent {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    avatar: row.avatar,
    phone: row.phone,
    email: row.email,
    rating: row.rating,
    reviewCount: row.review_count,
    totalSales: row.total_sales,
    activeListings: row.active_listings,
    experience: row.experience,
    specialties: row.specialties,
    bio: row.bio,
    languages: row.languages,
    certifications: row.certifications,
    socialMedia: row.social_media,
  };
}

function mapProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    pricePerSqft: row.price_per_sqft,
    address: row.address,
    coordinates: row.coordinates,
    type: row.type,
    status: row.status,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    sqft: row.sqft,
    yearBuilt: row.year_built,
    lotSize: row.lot_size,
    garage: row.garage,
    images: row.images,
    amenities: row.amenities,
    features: row.features,
    agent: mapAgent(row.agent),
    listedDate: row.listed_date,
    daysOnMarket: row.days_on_market,
    views: row.views,
    saves: row.saves,
    priceHistory: row.property_price_history ?? [],
    openHouse: row.open_house ?? undefined,
    virtualTour: row.virtual_tour ?? undefined,
    isFeatured: row.is_featured,
    isNew: row.is_new,
  };
}

function mapDashboardStats(row: DashboardMetricRow): DashboardStats {
  return {
    totalListings: row.total_listings,
    activeListings: row.active_listings,
    totalViews: row.total_views,
    viewsChange: row.views_change,
    totalLeads: row.total_leads,
    leadsChange: row.leads_change,
    totalRevenue: row.total_revenue,
    revenueChange: row.revenue_change,
    closedDeals: row.closed_deals,
    dealsChange: row.deals_change,
    avgDaysOnMarket: row.avg_days_on_market,
    conversionRate: row.conversion_rate,
  };
}

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    avatar: row.avatar,
    property: row.property,
    propertyId: row.property_id,
    message: row.message,
    status: row.status,
    date: row.date,
    source: row.source,
    budget: row.budget,
  };
}

function mapActivity(row: ActivityRow): Activity {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    timestamp: row.timestamp,
    relatedId: row.related_id ?? undefined,
    icon: row.icon,
  };
}

function mapMarketStat(row: MarketStatRow): MarketStat {
  return {
    label: row.label,
    value: row.value,
    change: row.change,
    changeLabel: row.change_label,
    icon: row.icon,
    period: row.period,
  };
}

async function getSupabaseOrNull() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createClient();
}

export async function getAgents(): Promise<Agent[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return mockAgents;

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .order("rating", { ascending: false });

  if (error || !data) {
    console.error("Failed to load agents from Supabase", error);
    return mockAgents;
  }

  return (data as AgentRow[]).map(mapAgent);
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    return mockAgents.find((agent) => agent.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load agent from Supabase", error);
    return mockAgents.find((agent) => agent.id === id) ?? null;
  }

  return data ? mapAgent(data as AgentRow) : null;
}

export async function getProperties(): Promise<Property[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return mockProperties;

  const { data, error } = await supabase
    .from("properties")
    .select("*, agent:agents(*), property_price_history(date, price, event)")
    .order("listed_date", { ascending: false });

  if (error || !data) {
    console.error("Failed to load properties from Supabase", error);
    return mockProperties;
  }

  return (data as PropertyRow[]).map(mapProperty);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const properties = await getProperties();
  return properties.filter((property) => property.isFeatured).slice(0, limit);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    return mockProperties.find((property) => property.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*, agent:agents(*), property_price_history(date, price, event)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load property from Supabase", error);
    return mockProperties.find((property) => property.id === id) ?? null;
  }

  return data ? mapProperty(data as PropertyRow) : null;
}

export async function getMarketStats(): Promise<MarketStat[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return mockMarketStats;

  const { data, error } = await supabase
    .from("market_stats")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to load market stats from Supabase", error);
    return mockMarketStats;
  }

  return (data as MarketStatRow[]).map(mapMarketStat);
}

export async function getDashboardData(): Promise<{
  stats: DashboardStats;
  leads: Lead[];
  activities: Activity[];
  listings: Property[];
}> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) {
    return {
      stats: mockDashboardStats,
      leads: mockLeads,
      activities: mockActivities,
      listings: mockProperties.slice(0, 6),
    };
  }

  const [statsResult, leadsResult, activitiesResult, properties] = await Promise.all([
    supabase.from("dashboard_metrics").select("*").limit(1).maybeSingle(),
    supabase.from("dashboard_leads").select("*").order("date", { ascending: false }).limit(8),
    supabase.from("dashboard_activity").select("*").order("sort_order", { ascending: true }).limit(10),
    getProperties(),
  ]);

  return {
    stats: statsResult.data ? mapDashboardStats(statsResult.data as DashboardMetricRow) : mockDashboardStats,
    leads: leadsResult.data ? (leadsResult.data as LeadRow[]).map(mapLead) : mockLeads,
    activities: activitiesResult.data ? (activitiesResult.data as ActivityRow[]).map(mapActivity) : mockActivities,
    listings: properties.slice(0, 6),
  };
}

export async function getFavoriteProperties(userId: string): Promise<Property[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("favorites")
    .select("property:properties(*, agent:agents(*), property_price_history(date, price, event))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to load favorites from Supabase", error);
    return [];
  }

  return data
    .map((row) => row.property)
    .filter(Boolean)
    .map((property) => mapProperty(property as unknown as PropertyRow));
}
