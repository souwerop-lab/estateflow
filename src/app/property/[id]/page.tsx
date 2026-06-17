import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyDetailsClient from "./PropertyDetailsClient";

interface Props {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const property = properties.find((p) => p.id === resolvedParams.id);

  if (!property) {
    return {
      title: "Property Not Found | EstateFlow",
      description: "The requested listing does not exist on EstateFlow.",
    };
  }

  return {
    title: `${property.title} | EstateFlow`,
    description: `${property.bedrooms} Bed, ${property.bathrooms} Bath, ${property.sqft.toLocaleString()} Sq Ft. ${property.description.slice(0, 150)}...`,
    openGraph: {
      title: `${property.title} | EstateFlow`,
      description: property.description,
      type: "website",
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | EstateFlow`,
      description: property.description,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const property = properties.find((p) => p.id === resolvedParams.id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailsClient property={property} />;
}
