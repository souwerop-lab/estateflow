"use client";

import Link from "next/link";
import { Building2, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useComingSoon } from "@/components/ui/ComingSoonToast";

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  properties: [
    { label: "Browse All", href: "/listings" },
    { label: "Homes for Sale", href: "/listings?status=for-sale" },
    { label: "Homes for Rent", href: "/listings?status=for-rent" },
    { label: "Pending Listings", href: "/listings?status=pending" },
    { label: "Recently Sold", href: "/listings?status=sold" },
  ],
  agents: [
    { label: "All Agents", href: "/agents" },
    { label: "Sarah Mitchell", href: "/agents/agent-1" },
    { label: "James Rodriguez", href: "/agents/agent-2" },
    { label: "Emily Chen", href: "/agents/agent-3" },
    { label: "Michael Thompson", href: "/agents/agent-4" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "Fair Housing", href: "#" },
  ],
};

export function Footer() {
  const { showToast } = useComingSoon();

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    showToast(label);
  };

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="section-width section-padding py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
          <div className="max-w-md">
            <h3 className="text-2xl font-heading font-bold mb-2">
              Stay in the Loop
            </h3>
            <p className="text-neutral-400 text-sm">
              Get the latest listings, market insights, and exclusive deals
              delivered to your inbox.
            </p>
          </div>
          <div className="flex gap-3 w-full max-w-md">
            <Input
              placeholder="Enter your email"
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 rounded-full flex-1 h-11 focus-visible:ring-emerald-500"
            />
            <Button 
              onClick={(e) => handlePlaceholderClick(e, "Newsletter Subscription")}
              className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-full px-6 h-11 whitespace-nowrap cursor-pointer transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Links Section */}
      <div className="section-width section-padding py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">
                Estate<span className="text-amber-400">Flow</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs leading-relaxed">
              The modern way to find your perfect property. Premium listings,
              expert agents, seamless experience.
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:+18005550199"
                className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                +1 (800) 555-0199
              </a>
              <a
                href="mailto:hello@estateflow.com"
                className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                hello@estateflow.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100 Biscayne Blvd, Miami, FL 33132</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={link.href === "#" ? (e) => handlePlaceholderClick(e, link.label) : undefined}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-4">
              Properties
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.properties.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={link.href === "#" ? (e) => handlePlaceholderClick(e, link.label) : undefined}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-4">
              Agents
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.agents.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={link.href === "#" ? (e) => handlePlaceholderClick(e, link.label) : undefined}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={link.href === "#" ? (e) => handlePlaceholderClick(e, link.label) : undefined}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Bottom Bar */}
      <div className="section-width section-padding py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © 2026 EstateFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "Instagram", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                onClick={(e) => handlePlaceholderClick(e, social)}
                className="text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
