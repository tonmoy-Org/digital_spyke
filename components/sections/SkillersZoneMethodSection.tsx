"use client";

import React from "react";
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
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Software Development",
    icon: Code2,
    description:
      "From intuitive interfaces to advanced integrations, we build software that helps you launch and grow without the tech headaches. Create powerful solutions designed for performance and scale.",
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
    icon: TrendingUp,
    description:
      "A full suite of digital marketing solutions, from social media management and ad campaigns to SEO and content creation. Engage the right audience, build lasting visibility, and achieve measurable results.",
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
    icon: Users2,
    description:
      "Streamline your business operations smoothly as we handle customer support, back-office processes, and other tasks, allowing your team to focus on growth, efficiency, and better service outcomes.",
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
    icon: ShoppingBag,
    description:
      "Launch your online business with Amazon FBA, FBM, dropshipping, and other top e-commerce platforms. Gain visibility on marketplaces and open your storefront to shoppers worldwide.",
    tags: [
      "Amazon (FBA, FBM, Dropshipping)",
      "Shopify",
      "Walmart",
      "Etsy",
    ],
    accentGradient: "from-purple-500 to-pink-500",
  },
];

const timelineSteps: TimelineEntry[] = [
  {
    title: "STEP 1",
    content: (
      <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Discovery & Alignment
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Strategy &amp; Roadmap
        </h4>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          We start by understanding your business goals, target audience, and challenges. This insight allows us to create a personalized strategy that forms the roadmap for your success.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Target Market &amp; Competitor Audit</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Technical Architecture Blueprint</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Milestone Timeline &amp; KPI Definition</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Resource &amp; Budget Optimization</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 2",
    content: (
      <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
            Sprint Deployment
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Execution &amp; Monitoring
        </h4>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          From planning to execution, we provide complete support, ensuring every aspect of your operations is streamlined for efficiency, scalability, and measurable results.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Agile Sprint Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Continuous QA &amp; Integration</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>24/7 Operations Monitoring</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Scalable Cloud Infrastructure</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 3",
    content: (
      <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
            Full Visibility
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Client Dashboard
        </h4>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          Your personalized dashboard with full visibility and control. Access the software on a test basis, track performance, and experience how it streamlines operations before going live.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Real-time Milestone Tracking</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Live Staging Sandbox Preview</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Direct Team Communication Hub</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Performance &amp; SLA Metrics</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 4",
    content: (
      <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">
            Honest Accountability
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Transparency, Credibility &amp; Reporting
        </h4>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          Our data-driven reports ensure full transparency, reinforce credibility, and keep you informed at every stage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Weekly Detailed Analytics Reports</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Conversion &amp; Traffic Breakdowns</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Transparent Resource Logging</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Clear ROI Impact Tracking</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 5",
    content: (
      <div className="rounded-2xl border border-white/10 bg-[#091021]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <LineChart className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Continuous Evolution
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Growth Analysis &amp; Feedback
        </h4>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
          We continuously monitor performance, refine strategies, track your growth and provide ongoing feedback helping your business adapt, scale, and thrive in a competitive market.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Continuous Strategy Iteration</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Market Expansion Advisory</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Long-term Scaling Support</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#00FFAB] shrink-0" />
            <span>Dedicated Growth Partnership</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function SkillersZoneMethodSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden">
      {/* ----------------- SECTION 1: CORE SERVICES ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase">
              What We Deliver
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            High-Impact Solutions for{" "}
            <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
              Global Scale
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            From technical development to digital reach and operations, our end-to-end expertise fuels sustainable growth.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.number}
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

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {service.tags.map((tag) => (
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
        data={timelineSteps}
        header={
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase">
                THE SKILLERSZONE METHOD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              Simple, transparent steps <br />
              <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                that scale with your needs
              </span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg mt-5 mx-auto text-gray-400 leading-relaxed">
              Our systematic approach provides complete clarity, consistent execution, and guaranteed milestones at every stage of growth.
            </p>
          </div>
        }
      />
    </section>
  );
}
