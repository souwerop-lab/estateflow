import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Your Saved Properties | EstateFlow",
  description:
    "Review, manage, and compare your favorite properties saved on EstateFlow. Your collection of premium real estate is preserved locally.",
  openGraph: {
    title: "Saved Properties | EstateFlow",
    description: "Your personalized selection of premium real estate properties.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Saved Luxury Properties Collection",
      },
    ],
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
