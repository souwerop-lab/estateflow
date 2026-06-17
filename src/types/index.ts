// ==========================================
// EstateFlow — TypeScript Type Definitions
// ==========================================

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  pricePerSqft: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: string;
  garage: number;
  images: string[];
  amenities: string[];
  features: string[];
  agent: Agent;
  listedDate: string;
  daysOnMarket: number;
  views: number;
  saves: number;
  priceHistory: PriceHistoryEntry[];
  openHouse?: string;
  virtualTour?: string;
  isFeatured: boolean;
  isNew: boolean;
}

export type PropertyType =
  | "house"
  | "apartment"
  | "condo"
  | "townhouse"
  | "villa"
  | "penthouse";

export type PropertyStatus =
  | "for-sale"
  | "for-rent"
  | "sold"
  | "pending";

export interface PriceHistoryEntry {
  date: string;
  price: number;
  event: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  activeListings: number;
  experience: number;
  specialties: string[];
  bio: string;
  languages: string[];
  certifications: string[];
  socialMedia: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Location {
  id: string;
  name: string;
  state: string;
  image: string;
  propertyCount: number;
  avgPrice: number;
  description: string;
  trending: boolean;
}

export interface MarketStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  period: string;
}

export interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalViews: number;
  viewsChange: number;
  totalLeads: number;
  leadsChange: number;
  totalRevenue: number;
  revenueChange: number;
  closedDeals: number;
  dealsChange: number;
  avgDaysOnMarket: number;
  conversionRate: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  property: string;
  propertyId: string;
  message: string;
  status: LeadStatus;
  date: string;
  source: string;
  budget: string;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "negotiating"
  | "closed"
  | "lost";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  relatedId?: string;
  icon: string;
}

export type ActivityType =
  | "listing"
  | "lead"
  | "sale"
  | "view"
  | "offer"
  | "review";

export interface FilterState {
  search: string;
  location: string;
  propertyType: PropertyType | "all";
  status: PropertyStatus | "all";
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  sqftRange: [number, number];
  sortBy: SortOption;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "sqft-asc"
  | "sqft-desc"
  | "beds-desc";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
  category: AmenityCategory;
}

export type AmenityCategory =
  | "interior"
  | "exterior"
  | "community"
  | "security"
  | "parking"
  | "utilities";
