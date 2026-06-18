"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Agent } from "@/types";

interface AgentContactCardProps {
  agent: Agent;
}

export function AgentContactCard({ agent }: AgentContactCardProps) {
  const profileHref = `/agents/${agent.id}`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hello ${agent.name.split(" ")[0]}, I am interested in this property and would like to schedule a viewing. Please contact me.`
  );
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sticky top-24">
      {/* Agent Header */}
      <div className="flex items-center gap-4 mb-5">
        <Link
          href={profileHref}
          className="relative size-14 rounded-full overflow-hidden bg-neutral-100 shrink-0 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all block"
        >
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={profileHref}
            className="text-base font-heading font-bold text-neutral-900 truncate hover:text-emerald-800 transition-colors cursor-pointer block"
          >
            {agent.name}
          </Link>
          <p className="text-xs text-neutral-500 font-medium truncate">
            {agent.title}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-neutral-800">
              {agent.rating.toFixed(1)}
            </span>
            <span className="text-[10px] font-medium text-neutral-400">
              ({agent.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Agent Stats Quick View */}
      <div className="grid grid-cols-3 gap-2 bg-neutral-50 rounded-xl p-3 text-center mb-5">
        <div>
          <span className="block text-sm font-bold text-neutral-900">
            {agent.experience} yrs
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">
            Exp
          </span>
        </div>
        <div className="border-x border-neutral-200">
          <span className="block text-sm font-bold text-neutral-900">
            {agent.totalSales}
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">
            Sold
          </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-neutral-900">
            {agent.activeListings}
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">
            Active
          </span>
        </div>
      </div>

      {/* Credentials Certifications */}
      {agent.certifications.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5 justify-center">
          {agent.certifications.map((cert) => (
            <Badge
              key={cert}
              variant="outline"
              className="text-[9px] px-2 py-0 border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold"
            >
              <Award className="size-2.5 text-emerald-800 mr-1 shrink-0" />
              {cert}
            </Badge>
          ))}
        </div>
      )}

      {/* Direct Contact Links */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <a
          href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-emerald-800 transition-colors shadow-xs"
        >
          <Phone className="size-3.5 text-neutral-400" />
          Call Agent
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-emerald-800 transition-colors shadow-xs"
        >
          <Mail className="size-3.5 text-neutral-400" />
          Email Agent
        </a>
      </div>

      {/* Form Section */}
      <div className="border-t border-neutral-100 pt-5">
        <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          Request Information
        </h5>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <CheckCircle2 className="size-8 text-emerald-700 mx-auto mb-2" />
            <h6 className="text-sm font-bold text-emerald-900 mb-1">
              Message Sent!
            </h6>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Your inquiry has been delivered to {agent.name.split(" ")[0]}. They will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Your Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-lg border-neutral-200 bg-neutral-50 focus-visible:bg-white text-sm"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border-neutral-200 bg-neutral-50 focus-visible:bg-white text-sm"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 rounded-lg border-neutral-200 bg-neutral-50 focus-visible:bg-white text-sm"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-sm transition-colors outline-hidden focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:bg-white resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-lg bg-emerald-800 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-xs mt-1"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
