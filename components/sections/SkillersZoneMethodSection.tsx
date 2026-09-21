"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import {
  Code2,
  TrendingUp,
  Users2,
  ShoppingBag,
  CheckCircle2,
  ArrowUpRight,
  Compass,
  Cpu,
  LayoutDashboard,
  FileCheck2,
  LineChart,
  Sparkles,
  Rocket,
  Shield,
  Zap,
  Target,
  Globe,
  Laptop,
  Smartphone,
  Search,
  Share2,
  Database,
  Bot,
  Workflow,
  Layers,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  code2: Code2,
  trendingup: TrendingUp,
  users2: Users2,
  shoppingbag: ShoppingBag,
  sparkles: Sparkles,
  rocket: Rocket,
  cpu: Cpu,
  shield: Shield,
  zap: Zap,
  target: Target,
  compass: Compass,
  layoutdashboard: LayoutDashboard,
  linechart: LineChart,
  filecheck2: FileCheck2,
  checkcircle2: CheckCircle2,
  globe: Globe,
  laptop: Laptop,
  smartphone: Smartphone,
  search: Search,
  share2: Share2,
  database: Database,
  bot: Bot,
  workflow: Workflow,
  layers: Layers,
};

function getIconComponent(iconName?: string) {
  if (!iconName) return Code2;
  const key = iconName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICON_MAP[key] || Code2;
}

const isHtml = (str?: string) => Boolean(str && /<[a-z][\s\S]*>/i.test(str));

const DEFAULT_WHAT_WE_DELIVER = {
  badgeText: "What We Deliver",
  badgeFontSize: "0.75rem",
  badgeIcon: "Sparkles",
  headingPrefix: "High-Impact Solutions for ",
  headingHighlight: "Global Scale",
  headingFontSize: "3rem",
  description:
    "From technical development to digital reach and operations, our end-to-end expertise fuels sustainable growth.",
  descriptionFontSize: "1.125rem",
  services: [
    {
      number: "01",
      title: "Software Development",
      titleFontSize: "1.5rem",
      icon: "Code2",
      description:
        "From intuitive interfaces to advanced integrations, we build software that helps you launch and grow without the tech headaches. Create powerful solutions designed for performance and scale.",
      descriptionFontSize: "0.875rem",
      tags: [
        "Website Design & Development",
        "UI/UX Design",
        "Apps Development",
        "ERP Development",
      ],
      accentGradient: "from-cyan-500 to-blue-600",
    },
    {
      number: "02",
      title: "Digital Marketing",
      titleFontSize: "1.5rem",
      icon: "TrendingUp",
      description:
        "A full suite of digital marketing solutions, from social media management and ad campaigns to SEO and content creation. Engage the right audience, build lasting visibility, and achieve measurable results.",
      descriptionFontSize: "0.875rem",
      tags: [
        "Social Media Management",
        "Search Engine Optimization",
        "Ad Management",
        "Content Creation & Curation",
      ],
      accentGradient: "from-emerald-400 to-cyan-500",
    },
    {
      number: "03",
      title: "Resource Augmentation",
      titleFontSize: "1.5rem",
      icon: "Users2",
      description:
        "Streamline your business operations smoothly as we handle customer support, back-office processes, and other tasks, allowing your team to focus on growth, efficiency, and better service outcomes.",
      descriptionFontSize: "0.875rem",
      tags: [
        "Virtual Assistant",
        "Appointment Setter",
        "Lead Generation",
      ],
      accentGradient: "from-blue-500 to-indigo-600",
    },
    {
      number: "04",
      title: "E-commerce Store Management",
      titleFontSize: "1.5rem",
      icon: "ShoppingBag",
      description:
        "Launch your online business with Amazon FBA, FBM, dropshipping, and other top e-commerce platforms. Gain visibility on marketplaces and open your storefront to shoppers worldwide.",
      descriptionFontSize: "0.875rem",
      tags: [
        "Amazon (FBA, FBM, Dropshipping)",
        "Shopify",
        "Walmart",
        "Etsy",
      ],
      accentGradient: "from-purple-500 to-pink-500",
    },
  ],
};

const DEFAULT_SKILLERSZONE_METHOD = {
  badgeText: "THE SKILLERSZONE METHOD",
  badgeFontSize: "0.875rem",
  headingPrefix: "Simple, transparent steps ",
  headingHighlight: "that scale with your needs",
  headingFontSize: "3rem",
  description: "Our systematic approach provides complete clarity, consistent execution, and guaranteed milestones at every stage of growth.",
  descriptionFontSize: "1.125rem",
  steps: [
    {
      id: "step-1",
      stepTag: "STEP 1",
      category: "Discovery & Alignment",
      themeColor: "cyan",
      icon: "Compass",
      title: "Strategy & Roadmap",
      titleFontSize: "1.5rem",
      description: "We start by understanding your business goals, target audience, and challenges. This insight allows us to create a personalized strategy that forms the roadmap for your success.",
      descriptionFontSize: "0.875rem",
      deliverables: [
        "Target Market & Competitor Audit",
        "Technical Architecture Blueprint",
        "Milestone Timeline & KPI Definition",
        "Resource & Budget Optimization",
      ],
    },
    {
      id: "step-2",
      stepTag: "STEP 2",
      category: "Sprint Deployment",
      themeColor: "blue",
      icon: "Cpu",
      title: "Execution & Monitoring",
      titleFontSize: "1.5rem",
      description: "From planning to execution, we provide complete support, ensuring every aspect of your operations is streamlined for efficiency, scalability, and measurable results.",
      descriptionFontSize: "0.875rem",
      deliverables: [
        "Agile Sprint Delivery",
        "Continuous QA & Integration",
        "24/7 Operations Monitoring",
        "Scalable Cloud Infrastructure",
      ],
    },
    {
      id: "step-3",
      stepTag: "STEP 3",
      category: "Full Visibility",
      themeColor: "purple",
      icon: "LayoutDashboard",
      title: "Client Dashboard",
      titleFontSize: "1.5rem",
      description: "Your personalized dashboard with full visibility and control. Access the software on a test basis, track performance, and experience how it streamlines operations before going live.",
      descriptionFontSize: "0.875rem",
      deliverables: [
        "Real-time Milestone Tracking",
        "Live Staging Sandbox Preview",
        "Direct Team Communication Hub",
        "Performance & SLA Metrics",
      ],
    },
    {
      id: "step-4",
      stepTag: "STEP 4",
      category: "Honest Accountability",
      themeColor: "sky",
      icon: "FileCheck2",
      title: "Transparency, Credibility & Reporting",
      titleFontSize: "1.5rem",
      description: "Our data-driven reports ensure full transparency, reinforce credibility, and keep you informed at every stage.",
      descriptionFontSize: "0.875rem",
      deliverables: [
        "Weekly Detailed Analytics Reports",
        "Conversion & Traffic Breakdowns",
        "Transparent Resource Logging",
        "Clear ROI Impact Tracking",
      ],
    },
    {
      id: "step-5",
      stepTag: "STEP 5",
      category: "Continuous Evolution",
      themeColor: "emerald",
      icon: "LineChart",
      title: "Growth Analysis & Feedback",
      titleFontSize: "1.5rem",
      description: "We continuously monitor performance, refine strategies, track your growth and provide ongoing feedback helping your business adapt, scale, and thrive in a competitive market.",
      descriptionFontSize: "0.875rem",
      deliverables: [
        "Continuous Strategy Iteration",
        "Market Expansion Advisory",
        "Long-term Scaling Support",
        "Dedicated Growth Partnership",
      ],
    },
  ],
};

const METHOD_COLOR_MAP: Record<string, { badgeBg: string; badgeBorder: string; text: string; checkColor: string }> = {
  cyan: { badgeBg: "bg-cyan-500/10", badgeBorder: "border-cyan-500/30", text: "text-cyan-400", checkColor: "text-cyan-400" },
  blue: { badgeBg: "bg-blue-500/10", badgeBorder: "border-blue-500/30", text: "text-blue-400", checkColor: "text-[#00FFAB]" },
  purple: { badgeBg: "bg-purple-500/10", badgeBorder: "border-purple-500/30", text: "text-purple-400", checkColor: "text-purple-400" },
  sky: { badgeBg: "bg-sky-500/10", badgeBorder: "border-sky-500/30", text: "text-sky-400", checkColor: "text-sky-400" },
  emerald: { badgeBg: "bg-emerald-500/10", badgeBorder: "border-emerald-500/30", text: "text-emerald-400", checkColor: "text-[#00FFAB]" },
};


export default function SkillersZoneMethodSection() {
  const [sectionData, setSectionData] = useState(DEFAULT_WHAT_WE_DELIVER);
  const [methodData, setMethodData] = useState(DEFAULT_SKILLERSZONE_METHOD);

  useEffect(() => {
    // 1. Immediately read from localStorage cache for instant render without layout shift
    try {
      const cachedDeliver = localStorage.getItem('digital_spyke_what_we_deliver');
      if (cachedDeliver) {
        setSectionData(JSON.parse(cachedDeliver));
      }
    } catch (e) {}

    try {
      const cachedMethod = localStorage.getItem('digital_spyke_skillerszone_method');
      if (cachedMethod) {
        setMethodData(JSON.parse(cachedMethod));
      }
    } catch (e) {}

    // 2. Fetch fresh updates from API
    async function fetchData() {
      try {
        const [resDeliver, resMethod] = await Promise.all([
          fetch('/api/what-we-deliver', { cache: 'no-store' }),
          fetch('/api/skillerszone-method', { cache: 'no-store' }),
        ]);

        const jsonDeliver = await resDeliver.json();
        if (jsonDeliver.success && jsonDeliver.data) {
          setSectionData(jsonDeliver.data);
          try {
            localStorage.setItem('digital_spyke_what_we_deliver', JSON.stringify(jsonDeliver.data));
          } catch (e) {}
        }

        const jsonMethod = await resMethod.json();
        if (jsonMethod.success && jsonMethod.data) {
          setMethodData(jsonMethod.data);
          try {
            localStorage.setItem('digital_spyke_skillerszone_method', JSON.stringify(jsonMethod.data));
          } catch (e) {}
        }
      } catch (err) {
        console.warn('Failed to load section data:', err);
      }
    }
    fetchData();
  }, []);

  const dynamicTimelineSteps: TimelineEntry[] = (methodData.steps || []).map((step, idx) => {
    const Icon = getIconComponent(step.icon);
    const colorScheme = METHOD_COLOR_MAP[step.themeColor || 'cyan'] || METHOD_COLOR_MAP.cyan;

    return {
      title: step.stepTag || `STEP ${idx + 1}`,
      content: (
        <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${colorScheme.badgeBg} border ${colorScheme.badgeBorder} ${colorScheme.text}`}>
              <Icon className="w-5 h-5" />
            </div>
            {step.category ? (
              <span className={`text-xs font-semibold tracking-wider ${colorScheme.text} uppercase`}>
                {step.category}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <div className="mb-3">
            {isHtml(step.title) ? (
              <div
                style={step.titleFontSize ? { fontSize: step.titleFontSize } : undefined}
                className="text-xl sm:text-2xl font-bold text-white leading-snug [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: step.title }}
              />
            ) : (
              <h4
                style={step.titleFontSize ? { fontSize: step.titleFontSize } : undefined}
                className="text-xl sm:text-2xl font-bold text-white leading-snug"
              >
                {step.title}
              </h4>
            )}
          </div>

          {/* Description */}
          {isHtml(step.description) ? (
            <div
              style={step.descriptionFontSize ? { fontSize: step.descriptionFontSize } : undefined}
              className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: step.description }}
            />
          ) : (
            <p
              style={step.descriptionFontSize ? { fontSize: step.descriptionFontSize } : undefined}
              className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6"
            >
              {step.description}
            </p>
          )}

          {/* Deliverables Checklist */}
          {step.deliverables && step.deliverables.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
              {step.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className={`w-4 h-4 ${colorScheme.checkColor} shrink-0`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    };
  });

  const BadgeIcon = getIconComponent(sectionData.badgeIcon || 'Sparkles');

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* ----------------- SECTION 1: CORE SERVICES ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Badge */}
          <div
            style={sectionData.badgeFontSize ? { fontSize: sectionData.badgeFontSize } : undefined}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-4"
          >
            <BadgeIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            {isHtml(sectionData.badgeText) ? (
              <span
                className="font-semibold tracking-widest text-cyan-400 uppercase [&_p]:inline [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: sectionData.badgeText }}
              />
            ) : (
              <span className="font-semibold tracking-widest text-cyan-400 uppercase">
                {sectionData.badgeText || 'What We Deliver'}
              </span>
            )}
          </div>

          {/* Main Heading */}
          <h2
            style={sectionData.headingFontSize ? { fontSize: sectionData.headingFontSize } : undefined}
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            {isHtml(sectionData.headingPrefix) ? (
              <span
                className="[&_p]:inline [&_p]:m-0 [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: sectionData.headingPrefix }}
              />
            ) : (
              sectionData.headingPrefix
            )}
            {sectionData.headingHighlight ? (
              <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent ml-1.5">
                {sectionData.headingHighlight}
              </span>
            ) : null}
          </h2>

          {/* Subtitle / Description */}
          {isHtml(sectionData.description) ? (
            <div
              style={sectionData.descriptionFontSize ? { fontSize: sectionData.descriptionFontSize } : undefined}
              className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: sectionData.description }}
            />
          ) : (
            <p
              style={sectionData.descriptionFontSize ? { fontSize: sectionData.descriptionFontSize } : undefined}
              className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed"
            >
              {sectionData.description}
            </p>
          )}
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {(sectionData.services || []).map((service, index) => {
            const Icon = getIconComponent(service.icon);
            return (
              <motion.div
                key={service.number || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-white/10 bg-[#091021]/50 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,85,255,0.12)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {service.number}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <div className="mb-3">
                    {isHtml(service.title) ? (
                      <div
                        style={service.titleFontSize ? { fontSize: service.titleFontSize } : undefined}
                        className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors [&_p]:m-0 leading-tight"
                        dangerouslySetInnerHTML={{ __html: service.title }}
                      />
                    ) : (
                      <h3
                        style={service.titleFontSize ? { fontSize: service.titleFontSize } : undefined}
                        className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight"
                      >
                        {service.title}
                      </h3>
                    )}
                  </div>

                  {/* Description */}
                  {isHtml(service.description) ? (
                    <div
                      style={service.descriptionFontSize ? { fontSize: service.descriptionFontSize } : undefined}
                      className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  ) : (
                    <p
                      style={service.descriptionFontSize ? { fontSize: service.descriptionFontSize } : undefined}
                      className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6"
                    >
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {(Array.isArray(service.tags) ? service.tags : []).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ----------------- SECTION 2: ACETERNITY TIMELINE ----------------- */}
      <Timeline
        data={dynamicTimelineSteps}
        header={
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              {isHtml(methodData.badgeText) ? (
                <div
                  style={methodData.badgeFontSize ? { fontSize: methodData.badgeFontSize } : undefined}
                  className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase [&_p]:inline [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: methodData.badgeText }}
                />
              ) : (
                <span
                  style={methodData.badgeFontSize ? { fontSize: methodData.badgeFontSize } : undefined}
                  className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase"
                >
                  {methodData.badgeText || "THE SKILLERSZONE METHOD"}
                </span>
              )}
            </div>

            <h2
              style={methodData.headingFontSize ? { fontSize: methodData.headingFontSize } : undefined}
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]"
            >
              {isHtml(methodData.headingPrefix) ? (
                <span
                  className="[&_p]:inline [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: methodData.headingPrefix }}
                />
              ) : (
                <span>{methodData.headingPrefix} </span>
              )}
              {methodData.headingHighlight ? (
                <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                  {methodData.headingHighlight}
                </span>
              ) : null}
            </h2>

            {isHtml(methodData.description) ? (
              <div
                style={methodData.descriptionFontSize ? { fontSize: methodData.descriptionFontSize } : undefined}
                className="max-w-2xl text-sm sm:text-base md:text-lg mt-5 mx-auto text-gray-400 leading-relaxed [&_p]:m-0 [&_p+p]:mt-2 [&_a]:text-cyan-400 [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: methodData.description }}
              />
            ) : (
              <p
                style={methodData.descriptionFontSize ? { fontSize: methodData.descriptionFontSize } : undefined}
                className="max-w-2xl text-sm sm:text-base md:text-lg mt-5 mx-auto text-gray-400 leading-relaxed"
              >
                {methodData.description}
              </p>
            )}
          </div>
        }
      />
    </section>
  );
}
