import { NavItem, DashboardNavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "Favorites", href: "/favorites" },
  { label: "Dashboard", href: "/dashboard" },
];

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "layout-dashboard" },
  { label: "My Listings", href: "/dashboard", icon: "building-2", badge: 18 },
  { label: "Leads", href: "/dashboard", icon: "users", badge: 5 },
  { label: "Analytics", href: "/dashboard", icon: "bar-chart-3" },
  { label: "Messages", href: "/dashboard", icon: "message-square", badge: 3 },
  { label: "Calendar", href: "/dashboard", icon: "calendar" },
  { label: "Settings", href: "/dashboard", icon: "settings" },
];

export const PROPERTY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
];

export const LOCATIONS = [
  "All Locations",
  "Miami, FL",
  "New York, NY",
  "Los Angeles, CA",
  "Austin, TX",
  "Seattle, WA",
  "San Francisco, CA",
  "Chicago, IL",
  "Denver, CO",
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "sqft-desc", label: "Largest First" },
  { value: "beds-desc", label: "Most Bedrooms" },
];

export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
};

export const formatFullPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};
