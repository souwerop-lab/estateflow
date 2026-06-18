import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "EstateFlow — Modern Real Estate Platform",
    template: "%s | EstateFlow",
  },
  description:
    "Discover your dream property with EstateFlow. Premium real estate listings, expert agents, and a seamless home-buying experience.",
  keywords: [
    "real estate",
    "property",
    "homes for sale",
    "luxury homes",
    "EstateFlow",
    "SaaS real estate",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "EstateFlow — Modern Real Estate Platform",
    description:
      "Discover your dream property with EstateFlow. Premium real estate listings, expert agents, and a seamless home-buying experience.",
    type: "website",
    siteName: "EstateFlow",
    locale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "EstateFlow Premium Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EstateFlow — Modern Real Estate Platform",
    description:
      "Discover your dream property with EstateFlow. Premium real estate listings, expert agents, and a seamless home-buying experience.",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

import { ComingSoonProvider } from "@/components/ui/ComingSoonToast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ComingSoonProvider>
          {children}
        </ComingSoonProvider>
      </body>
    </html>
  );
}
