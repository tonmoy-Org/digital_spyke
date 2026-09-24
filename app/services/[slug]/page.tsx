"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Zap, Target, Sparkles, Shield, Rocket } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowingBorderCard } from "@/components/ui/glowing-border-card";
import ServicePageRenderer from "@/components/sections/ServicePageRenderer";

const LEGACY_SERVICE_DETAILS: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: string;
    heroDesc: string;
    deliverables: string[];
    outcomes: string[];
    timeline: string;
  }
> = {
  "online-branding-strategy": {
    title: "Online Branding Strategy",
    subtitle: "Brand Architecture, Distinctive Voice & Strategic Market Positioning",
    icon: "🎯",
    heroDesc:
      "We design cohesive, memorable brand ecosystems that differentiate your business in crowded markets. From executive tone-of-voice to visual archetype guidelines, we give your brand an unshakeable identity.",
    deliverables: [
      "Comprehensive Brand Positioning & Identity Guidebook",
      "Tone of Voice & Core Messaging Frameworks",
      "Competitive Differentiation Matrix & Archetype Mapping",
      "Digital Asset & Typography Specification Document",
    ],
    outcomes: [
      "Immediate brand recognition across target demographics",
      "Unified team messaging and executive PR clarity",
      "Enhanced pricing power and perceived premium market valuation",
    ],
    timeline: "2 - 4 Weeks",
  },
  "digital-creative-development": {
    title: "Digital Creative Development",
    subtitle: "High-Converting Visuals, UI Prototypes & Cross-Channel Assets",
    icon: "🎨",
    heroDesc:
      "Transforming abstract value propositions into magnetic creative assets. We produce world-class graphics, interactive UI visuals, and performance-tuned ad collateral that turn passive visitors into engaged champions.",
    deliverables: [
      "Conversion-Focused Web & App UI/UX Mockups",
      "High-Fidelity Ad Creatives (Display, Meta, TikTok, LinkedIn)",
      "Interactive Product Demo Collateral & Micro-animations",
      "Brand Collateral Kit (Sales decks, one-pagers, brochures)",
    ],
    outcomes: [
      "Up to 40% increase in landing page click-through and conversion",
      "Rapid creative iteration without brand dilution",
      "High-resonance aesthetic consistency across all touchpoints",
    ],
    timeline: "2 - 3 Weeks",
  },
  "google-advert-management": {
    title: "Google Advert Management",
    subtitle: "High-Intent Keyword Capture, Algorithmic Bidding & ROI Scale",
    icon: "📈",
    heroDesc:
      "Data-driven PPC management engineered for maximum ROAS. We target high-intent search queries, eliminate ad budget waste with precise negative keyword lists, and continuously optimize bidding algorithms.",
    deliverables: [
      "In-Depth Keyword Volume & Commercial Intent Architecture",
      "Search, Display & Performance Max Campaign Buildouts",
      "Negative Keyword Mining & Budget Allocation Modeling",
      "Real-Time Analytics Dashboard & Conversion Attribution Setup",
    ],
    outcomes: [
      "Reduction in Customer Acquisition Cost (CAC) by 25-45%",
      "Targeted lead capture from ready-to-buy decision makers",
      "Transparent reporting with measurable revenue attribution",
    ],
    timeline: "Continuous Monthly Optimization (Setup in 10 Days)",
  },
  "social-media-optimization": {
    title: "Social Media Optimization",
    subtitle: "Organic Authority, Multi-Platform Content & Audience Loyalty",
    icon: "🚀",
    heroDesc:
      "Turn your social channels into dynamic customer acquisition pipelines. From complete profile redesigns to viral content calendars and community nurturing, we amplify your voice where your buyers gather.",
    deliverables: [
      "Omnichannel Profile Optimization (LinkedIn, X, Instagram, YouTube)",
      "High-Impact Monthly Content Calendars & Editorial Direction",
      "Audience Growth, Engagement & Community Protocol Setup",
      "Influencer Outreach & Strategic Co-Marketing Campaigns",
    ],
    outcomes: [
      "Exponential growth in organic impressions and brand mentions",
      "Direct inbound pipeline generated through social credibility",
      "Vibrant community advocacy that fuels word-of-mouth growth",
    ],
    timeline: "Monthly Retainer (Initial setup 1-2 Weeks)",
  },
};

export default function SubServiceDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

  const [hasDynamicService, setHasDynamicService] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkService() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/services?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.service) {
            setHasDynamicService(true);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // fallback
      }

      setHasDynamicService(false);
      setLoading(false);
    }

    checkService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070d1d] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading Service Information...</p>
      </div>
    );
  }

  // If found in dynamic CMS database, render the Full Service Page!
  if (hasDynamicService) {
    return <ServicePageRenderer slug={slug} />;
  }

  // Check legacy fallback
  const legacyDetail = LEGACY_SERVICE_DETAILS[slug];
  if (legacyDetail) {
    return (
      <div className="relative min-h-screen bg-[#070d1d] text-white selection:bg-blue-600 selection:text-white pt-28 pb-20 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(59, 130, 246, 0.35)" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services</span>
            </Link>
          </div>

          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              <span className="text-base">{legacyDetail.icon}</span>
              <span>CAPABILITY DEEP DIVE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              {legacyDetail.title}
            </h1>
            <p className="text-xl text-blue-300 font-medium mb-6">{legacyDetail.subtitle}</p>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">{legacyDetail.heroDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <GlowingBorderCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Tangible Deliverables</h3>
              </div>
              <ul className="space-y-4">
                {legacyDetail.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlowingBorderCard>

            <GlowingBorderCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Measurable Outcomes</h3>
              </div>
              <ul className="space-y-4">
                {legacyDetail.outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlowingBorderCard>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-black/40 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Deploy This Capability?</h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm">
              Schedule a technical consultation to map your requirements and timeline.
            </p>
            <Link
              href="/book-meeting"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              <span>Schedule Architecture Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not found fallback
  return (
    <div className="min-h-screen bg-[#070d1d] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
      <p className="text-gray-400 mb-6">The requested service detail page could not be located.</p>
      <Link
        href="/services"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Services</span>
      </Link>
    </div>
  );
}
