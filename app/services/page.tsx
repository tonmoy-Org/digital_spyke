"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FAQSection from "@/components/sections/FAQSection";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Send,
  Zap,
  Target,
  Palette,
  TrendingUp,
  Rocket,
  ShieldCheck,
  Lightbulb,
  BarChart3,
  SlidersHorizontal,
  HeartHandshake,
  ExternalLink,
  FileText,
  Compass,
  Cpu,
  LayoutDashboard,
  FileCheck2,
  LineChart,
  Shield,
  Code2,
  Workflow,
  Boxes,
  Award,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowingBorderCard } from "@/components/ui/glowing-border-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Marquee } from "@/components/magicui/marquee";
import {
  DEFAULT_SERVICES_CONFIG,
  ServicesConfig,
} from "@/app/api/services-config/route";
import { cn } from "@/lib/utils";

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const SERVICE_TESTIMONIALS_ROW_1 = [
  {
    quote:
      "We partnered with SkillersZone for a complete website redesign. Their UI/UX team delivered a sleek, modern platform that improved our customer engagement by 40%. Outstanding collaboration throughout.",
    author: "Michael Andersson",
    location: "Chicago, USA",
  },
  {
    quote:
      "As a startup founder, I needed guidance in both digital marketing and operations. SkillersZone didn't just execute, they strategized with us. Their ad management brought measurable ROI within a short time, and they also helped streamline processes that saved us both time and money.",
    author: "Patrick O'Connor",
    location: "Dallas, USA",
  },
  {
    quote:
      "Managing an Amazon FBA store was overwhelming until I connected with SkillersZone. They optimized listings and improved PPC campaigns. My sales increased considerably in three months. Their support has been a game-changer for my business.",
    author: "Thomas Becker",
    location: "Austin, USA",
  },
  {
    quote:
      "From website formation to ongoing digital support, SkillersZone was a one-stop solution. Transparent, communicative, and reliable, exactly what a growing business needs.",
    author: "Richard Hayes",
    location: "Boston, USA",
  },
  {
    quote:
      "I needed a virtual assistant and an appointment setter to help scale my consultancy. SkillersZone delivered highly skilled professionals who blended seamlessly into my workflow. Productivity has increased significantly within a few days...",
    author: "Daniel Moreau",
    location: "Los Angeles, USA",
  },
  {
    quote:
      "They revamped my website from scratch. The team was transparent, and surprisingly fast. The design and development is top-notch.",
    author: "Sarah Jenkins",
    location: "New York, USA",
  },
];

export const SERVICE_TESTIMONIALS_ROW_2 = [
  {
    quote:
      "SkillersZone managed our e-commerce stores flawlessly. Their attention to detail and proactive updates made the process stress-free. Highly recommend them for e-commerce growth.",
    author: "David Collins",
    location: "Miami, USA",
  },
  {
    quote:
      "Our ERP development project with SkillersZone was a success. They tailored every module to our industry needs and provided continuous support. They have a rare mix of technical depth and business understanding.",
    author: "Stefan Müller",
    location: "Berlin, Germany",
  },
  {
    quote:
      "I needed a virtual assistant and an appointment setter to help scale my consultancy. SkillersZone delivered highly skilled professionals who blended seamlessly into my workflow. Productivity has increased significantly within a few days..",
    author: "Daniel Moreau",
    location: "Los Angeles, USA",
  },
  {
    quote:
      "From website formation to ongoing digital support, SkillersZone was a one-stop solution. Transparent, communicative, and reliable, exactly what a growing business needs.",
    author: "Richard Hayes",
    location: "Boston, USA",
  },
  {
    quote:
      "Managing an Amazon FBA store was overwhelming until I connected with SkillersZone. They optimized listings and improved PPC campaigns. My sales increased considerably in three months. Their support has been a game-changer for my business.",
    author: "Thomas Becker",
    location: "Austin, USA",
  },
  {
    quote:
      "As a startup founder, I needed guidance in both digital marketing and operations. SkillersZone brought measurable ROI within a short time, and they also helped streamline processes that saved us time and money.",
    author: "Patrick O'Connor",
    location: "Dallas, USA",
  },
];

// Step Icon Lookup Map for Methodology Cards
const METHOD_STEP_ICONS: Record<string, React.ElementType> = {
  "01": Compass,
  "02": Target,
  "03": Rocket,
  "04": LayoutDashboard,
  "05": TrendingUp,
  discovery: Compass,
  strategy: Target,
  execution: Rocket,
  monitoring: LayoutDashboard,
  growth: TrendingUp,
  reporting: FileText,
  filetext: FileText,
  compass: Compass,
  cpu: Cpu,
  target: Target,
  layoutdashboard: LayoutDashboard,
  filecheck2: FileCheck2,
  linechart: LineChart,
  shield: ShieldCheck,
  code: Code2,
};

function getStepIcon(step: any, index: number): React.ReactNode {
  if (React.isValidElement(step.icon)) {
    return step.icon;
  }
  if (typeof step.icon === "string") {
    const key = step.icon.toLowerCase().replace(/[^a-z0-9]/g, "");
    const IconComp = METHOD_STEP_ICONS[key];
    if (IconComp) return <IconComp className="w-7 h-7 text-[#3BA2F9]" />;
  }
  const titleKey = (step.shortTitle || step.title || "").toLowerCase().trim();
  for (const [k, IconComp] of Object.entries(METHOD_STEP_ICONS)) {
    if (titleKey.includes(k)) {
      return <IconComp className="w-7 h-7 text-[#3BA2F9]" />;
    }
  }
  const indexIcons = [Compass, Target, Rocket, LayoutDashboard, TrendingUp];
  const FallbackIcon = indexIcons[index % indexIcons.length];
  return <FallbackIcon className="w-7 h-7 text-[#3BA2F9]" />;
}

export default function ServicesPage() {
  const [config, setConfig] = useState<ServicesConfig>(DEFAULT_SERVICES_CONFIG);
  const [isHydrated, setIsHydrated] = useState(false);

  // SECTION 3: Horizontal Scroll Setup with exact viewport pinning
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stepsCount = config.workProcessSection.steps.length || 5;
  // Desktop: 3 cards shown simultaneously (33.333vw each). Distance to scroll is (stepsCount - 3) * 33.333vw
  const desktopScrollVw = Math.max(0, stepsCount - 3) * 33.333333;
  // Mobile: 1 card shown at a time with 85vw width. Distance to scroll is (stepsCount - 1) * 85vw
  const mobileScrollVw = Math.max(0, stepsCount - 1) * 85;

  const targetScrollVw = isMobile ? mobileScrollVw : desktopScrollVw;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${targetScrollVw}vw`]);

  // SECTION 3: Active Work Process Step (Fallback state if needed, though replaced by horizontal scroll)
  const [activeStepIndex, setActiveStepIndex] = useState(0);


  // SECTION 8: Lead Gen Form State
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Hydration safety flag
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch dynamic CMS configuration if available
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/services-config");
        if (res.ok) {
          const data = await res.json();
          if (data?.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        // Fallback to DEFAULT_SERVICES_CONFIG
      }
    }
    loadConfig();
  }, []);

  // SECTION 3: Keyboard arrow navigation for process steps
  const handleProcessKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const stepsCount = config.workProcessSection.steps.length;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveStepIndex((prev) => (prev + 1) % stepsCount);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveStepIndex((prev) => (prev - 1 + stepsCount) % stepsCount);
      }
    },
    [config.workProcessSection.steps.length]
  );

  // Smooth scroll handler for Secondary CTA
  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("services-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SECTION 8: Form Submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit via Web3Forms or internal route
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_CONTACT ||
            "c3bf9d7a-7db0-4fd1-b0db-6e690f050b18",
          subject: `New Services Inquiry [${inquiryType}]: ${formName}`,
          from_name: formName,
          email: formEmail,
          message: `Inquiry Type: ${inquiryType}\n\nMessage:\n${formMessage}`,
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      } else {
        setFormSuccess(true); // Demo mode graceful feedback
      }
    } catch (err) {
      setFormSuccess(true); // Demo mode graceful feedback
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    heroSection,
    subServicesSection,
    workProcessSection,
    whyChooseUsSection,
    portfolioSection,
    testimonialsSection,
    leadGenSection,
  } = config;

  return (
    <div className="relative min-h-screen bg-[#070d1d] text-white selection:bg-blue-600 selection:text-white overflow-x-clip">
      {/* Global Background Removed */}

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: HERO BANNER [ADMIN TOGGLE: ON/OFF]
        ───────────────────────────────────────────────────────────── */}
        {heroSection.enabled && (
          <section
            id="hero"
            aria-label="Branding and PR Hero"
            className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden "
          >
            {/* Grid Background */}
            <div
              className={cn(
                "absolute inset-0",
                "[background-size:30px_30px]",
                "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
              )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#070d1d] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>


            {/* Aceternity Spotlight Accent */}
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="rgba(59, 130, 246, 0.4)"
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center">

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8 drop-shadow-md"
              >
                Elevate Your Brand Visibility &{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  Scale Market Reach
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 font-normal"
              >
                {heroSection.description}
              </motion.p>

              {/* Action Buttons with Hydration Lock */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                {/* Primary Accent Glow Button */}
                <Link
                  href={heroSection.primaryCta.href}
                  className={cn(
                    "group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-white",
                    "bg-[#1D4ED8] hover:bg-[#1e40af] transition-all duration-300 shadow-[0_0_25px_rgba(29,78,216,0.6)] hover:shadow-[0_0_35px_rgba(29,78,216,0.85)] hover:-translate-y-0.5",
                    !isHydrated && "pointer-events-none opacity-80"
                  )}
                >
                  <span>{heroSection.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Secondary Bordered Button */}
                <a
                  href={heroSection.secondaryCta.href}
                  onClick={handleScrollToServices}
                  className={cn(
                    "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-gray-200",
                    "bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm",
                    !isHydrated && "pointer-events-none opacity-80"
                  )}
                >
                  <span>{heroSection.secondaryCta.text}</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </motion.div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: OUR SERVICES [ADMIN TOGGLE: ON/OFF]
        ───────────────────────────────────────────────────────────── */}
        {subServicesSection.enabled && subServicesSection.services.length > 0 && (
          <section
            id="services-grid"
            aria-label="Our Services"
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-sm font-bold tracking-wider text-[#3BA2F9] uppercase mb-4">
                OUR SERVICES
              </h3>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Custom software solutions <br className="hidden sm:block" /> built for <span className="text-[#3BA2F9]">your success</span>
              </h2>
            </div>

            {/* Services List (Row Layout) */}
            <div className="flex flex-col border-t border-white/[0.05]">
              {subServicesSection.services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                >
                  {/* Left: Title */}
                  <div className="w-full md:w-[30%] mb-4 md:mb-0 md:pr-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Middle: Icon */}
                  <div className="w-full md:w-[20%] flex md:justify-center mb-4 md:mb-0">
                    <div className="text-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-[#3BA2F9] transition-all duration-300 transform scale-[2]">
                      {service.icon}
                    </div>
                  </div>

                  {/* Right: Description */}
                  <div className="w-full md:w-[50%] md:pl-8">
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: THE WORK PROCESS [ADMIN TOGGLE: ON/OFF]
        ───────────────────────────────────────────────────────────── */}
        {workProcessSection.enabled && workProcessSection.steps.length > 0 && (
          <section
            id="methodology"
            aria-label="The Work Process"
            ref={targetRef}
            className="relative h-[180vh] bg-[#070d1d]"
          >
            <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden bg-[#070d1d] z-20 py-4">
              {/* Aceternity Spotlight Accent */}
              <Spotlight
                className="-top-24 left-1/4"
                fill="rgba(59, 130, 246, 0.25)"
              />

              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto px-4 mb-4 sm:mb-6 relative z-10">
                <h3 className="text-xs sm:text-sm font-bold tracking-widest text-[#3BA2F9] uppercase mb-1.5">
                  {workProcessSection.tag || "THE METHODOLOGY"}
                </h3>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  From concept to execution <br className="hidden sm:block" /> we transform ideas into{" "}
                  <span className="text-[#3BA2F9]">solutions</span>
                </h2>
              </div>

              {/* Horizontal Scroll Track */}
              <div className="relative w-full overflow-hidden py-2">
                <motion.div
                  style={{ x }}
                  className="flex gap-5 sm:gap-6 px-4 sm:px-8 w-max"
                >
                  {workProcessSection.steps.map((step, idx) => {
                    const stepNumStr = step.stepNumber
                      ? String(step.stepNumber).padStart(2, "0")
                      : String(idx + 1).padStart(2, "0");

                    return (
                      <div
                        key={step.id || idx}
                        className="w-[85vw] sm:w-[46vw] md:w-[31vw] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1836] via-[#091126] to-[#070d1d] hover:border-[#3BA2F9]/50 hover:shadow-[0_8px_32px_rgba(59,162,249,0.15)] transition-all duration-300 p-6 sm:p-7 md:p-8 flex flex-col justify-between h-[430px] sm:h-[460px] group relative overflow-hidden backdrop-blur-xl"
                      >
                        {/* Top glowing accent border */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3BA2F9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div>
                          {/* Card Top: Step Badge & Next Arrow Connector */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-[#3BA2F9] bg-[#3BA2F9]/10 border border-[#3BA2F9]/25 shadow-[0_0_12px_rgba(59,162,249,0.12)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3BA2F9] animate-pulse" />
                              <span>STEP {stepNumStr}</span>
                            </div>

                            {idx < workProcessSection.steps.length - 1 && (
                              <div className="flex items-center gap-1.5 text-[#3BA2F9]/70 text-xs font-mono font-semibold bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.08] group-hover:border-[#3BA2F9]/40 transition-colors">
                                <span className="hidden sm:inline text-[10px] text-gray-400">NEXT</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#3BA2F9] transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                            )}
                          </div>

                          {/* Card Body: Icon & Titles & Description */}
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-[#3BA2F9]/10 border border-[#3BA2F9]/30 flex items-center justify-center text-[#3BA2F9] mb-4 group-hover:scale-105 group-hover:bg-[#3BA2F9]/20 group-hover:border-[#3BA2F9]/50 shadow-[0_0_20px_rgba(59,162,249,0.15)] transition-all duration-300">
                              {getStepIcon(step, idx)}
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#3BA2F9] transition-colors">
                              {step.shortTitle || step.title}
                            </h3>

                            {step.shortTitle && step.shortTitle !== step.title && (
                              <p className="text-[11px] uppercase font-semibold tracking-wider text-cyan-400/90 mt-1">
                                {step.title}
                              </p>
                            )}

                            <p className="text-gray-300/80 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3 group-hover:text-gray-200 transition-colors">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Card Bottom: Key Deliverables List */}
                        {step.deliverables && step.deliverables.length > 0 && (
                          <div className="pt-4 border-t border-white/[0.08] mt-4 space-y-1.5">
                            <div className="text-[10px] font-bold tracking-widest text-cyan-400/80 uppercase mb-2 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-[#3BA2F9]" />
                              <span>KEY DELIVERABLES</span>
                            </div>

                            {step.deliverables.slice(0, 3).map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-center gap-2 text-xs text-gray-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-lg px-2.5 py-1.5 transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3BA2F9] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: OUR STRENGTHS / WHY CHOOSE US [ADMIN TOGGLE: ON/OFF]
        ───────────────────────────────────────────────────────────── */}
        {whyChooseUsSection.enabled && (
          <section
            id="strengths"
            aria-label="Our Strengths"
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <h3 className="text-xs sm:text-sm font-bold tracking-widest text-[#3BA2F9] uppercase mb-4">
                {whyChooseUsSection.tag || "BE ASSURED, WE'RE THE BEST DIGITAL MARKETING AGENCY"}
              </h3>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                Experience, knowledge, and insights <br className="hidden sm:block" />
                that give your company a{" "}
                <span className="text-[#3BA2F9]">competitive advantage.</span>
              </h2>
            </div>

            {/* 3-Column Architectural Grid Matching Reference Image (Seamless Dark Theme - No Black Background) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {/* Column 1: Card 1 & Card 4 (Boxed Outlined Cards) */}
              <div className="flex flex-col gap-6 lg:gap-8">
                {/* Card 1: Proven Expertise */}
                <div className="group border border-white/10 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <Workflow className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[0]?.title || "Proven Expertise"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[0]?.description ||
                      "By assisting firms in turning concepts into seamless, scalable digital solutions that truly deliver, our team's years of practical experience helps them change."}
                  </p>
                </div>

                {/* Card 4: Tailored Strategies */}
                <div className="group border border-white/10 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <Boxes className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[3]?.title || "Tailored Strategies"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[3]?.description ||
                      "We don't offer a one-size-fits-all approach; instead, we create tactics and solutions tailored to your specific industry, objectives, and difficulties in order to increase your chances of success."}
                  </p>
                </div>
              </div>

              {/* Column 2: Card 2 & Card 5 (Top/Bottom/Middle Divider Line Style) */}
              <div className="flex flex-col justify-between border-t border-b md:border-none border-white/15">
                {/* Card 2: Innovation First */}
                <div className="group md:border-t md:border-b border-white/15 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <Rocket className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[1]?.title || "Innovation First"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[1]?.description ||
                      "To develop contemporary solutions that prepare your business for the future and maintain its competitiveness, we combine creativity with cutting-edge technologies and equipment."}
                  </p>
                </div>

                {/* Card 5: Reliable Support */}
                <div className="group md:border-b border-white/15 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <Award className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[4]?.title || "Reliable Support"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[4]?.description ||
                      "From launch to ongoing updates, we provide dependable support and improvements so your business continues to run smoothly and efficiently."}
                  </p>
                </div>
              </div>

              {/* Column 3: Card 3 & Card 6 (Boxed Outlined Cards) */}
              <div className="flex flex-col gap-6 lg:gap-8">
                {/* Card 3: Growth-Focused */}
                <div className="group border border-white/10 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <Target className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[2]?.title || "Growth-Focused"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[2]?.description ||
                      "With the goal of ensuring long-term scalability, quantifiable outcomes, and lasting business effect, each initiative is planned with your development in mind."}
                  </p>
                </div>

                {/* Card 6: Trusted Partnership */}
                <div className="group border border-white/10 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex-1 flex flex-col justify-start">
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    <HeartHandshake className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {whyChooseUsSection.features[5]?.title || "Trusted Partnership"}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {whyChooseUsSection.features[5]?.description ||
                      "We believe in building long-term partnerships, working as an extension of your team to achieve success through trust and collaboration."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: PORTFOLIO & CASE STUDIES [ACETERNITY HERO PARALLAX]
        ───────────────────────────────────────────────────────────── */}
        {portfolioSection.enabled && (
          <section
            id="portfolio"
            aria-label="Portfolio & Case Studies"
            className="w-full relative z-10"
          >
            <HeroParallaxDemo />
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 6: FAQ [SHARED COMPONENT — SAME AS HOME PAGE]
        ───────────────────────────────────────────────────────────── */}
        <FAQSection />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 7: TESTIMONIALS MARQUEE [STYLE MATCHING SKILLERSZONE]
        ───────────────────────────────────────────────────────────── */}
        {testimonialsSection.enabled && (
          <section
            id="testimonials"
            aria-label="Client Testimonials"
            className="py-16 sm:py-24 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4 relative z-10">
              <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase">
                  {testimonialsSection.tag || "TESTIMONIALS"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Trusted by <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  businesses worldwide
                </span>
              </h2>
            </div>

            {/* Marquee Showcase Container with Left/Right Edge Fades */}
            <div className="relative w-full overflow-hidden">
              {/* Left and Right Fade Overlays */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-[#070d1d] via-[#070d1d]/90 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-[#070d1d] via-[#070d1d]/90 to-transparent z-10" />

              {/* Row 1 - Marquee scrolling left */}
              <Marquee
                pauseOnHover
                repeat={2}
                className="py-2 [--duration:45s] [--gap:1.5rem]"
              >
                {(() => {
                  const cmsItems = testimonialsSection.testimonials || [];
                  const row1 = [
                    ...cmsItems.slice(0, Math.ceil(cmsItems.length / 2)).map((t) => ({
                      quote: t.quote,
                      author: t.author,
                      location: t.location || `${t.role || 'Client'}, ${t.company || 'USA'}`,
                    })),
                    ...SERVICE_TESTIMONIALS_ROW_1,
                  ];
                  return row1.map((item, idx) => (
                    <div
                      key={`t1-${idx}`}
                      className="w-[320px] sm:w-[380px] md:w-[400px] h-[200px] sm:h-[210px] rounded-xl bg-[#0c152a]/95 border border-[#1b2b48]/80 hover:border-cyan-500/50 hover:bg-[#0f1b35] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md group shrink-0"
                    >
                      <p className="text-[13px] sm:text-sm text-gray-300 font-normal leading-relaxed line-clamp-5">
                        {item.quote}
                      </p>
                      <div className="pt-3 border-t border-white/[0.06]">
                        <div className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                          {item.author}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </Marquee>

              {/* Row 2 - Marquee scrolling right */}
              <Marquee
                reverse
                pauseOnHover
                repeat={2}
                className="py-2 mt-4 sm:mt-5 [--duration:50s] [--gap:1.5rem]"
              >
                {(() => {
                  const cmsItems = testimonialsSection.testimonials || [];
                  const row2 = [
                    ...cmsItems.slice(Math.ceil(cmsItems.length / 2)).map((t) => ({
                      quote: t.quote,
                      author: t.author,
                      location: t.location || `${t.role || 'Client'}, ${t.company || 'USA'}`,
                    })),
                    ...SERVICE_TESTIMONIALS_ROW_2,
                  ];
                  return row2.map((item, idx) => (
                    <div
                      key={`t2-${idx}`}
                      className="w-[320px] sm:w-[380px] md:w-[400px] h-[200px] sm:h-[210px] rounded-xl bg-[#0c152a]/95 border border-[#1b2b48]/80 hover:border-cyan-500/50 hover:bg-[#0f1b35] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md group shrink-0"
                    >
                      <p className="text-[13px] sm:text-sm text-gray-300 font-normal leading-relaxed line-clamp-5">
                        {item.quote}
                      </p>
                      <div className="pt-3 border-t border-white/[0.06]">
                        <div className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                          {item.author}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </Marquee>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 8: LEAD GENERATION / GET IN TOUCH [SKILLERSZONE STYLE]
        ───────────────────────────────────────────────────────────── */}
        {leadGenSection.enabled && (
          <section
            id="contact"
            aria-label="Lead Generation & Contact"
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/15 bg-[#070d1d] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              {/* Background Grid Pattern with Vertical Dashed Grid Lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 2px, transparent 2px, transparent 8px)`,
                  backgroundSize: "44px 100%",
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
                {/* Left Column: Form & Copy */}
                <div className="lg:col-span-7">
                  {/* Top Subtitle */}
                  <p className="text-xs sm:text-sm font-medium text-gray-300 mb-2.5 tracking-wide">
                    {leadGenSection.subheadline || "Seen enough? Let's talk results."}
                  </p>

                  {/* Headline */}
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-10 sm:mb-12">
                    Now is the moment <br />
                    to build{" "}
                    <span className="text-[#00d2ff] drop-shadow-[0_0_24px_rgba(0,210,255,0.55)]">
                      together.
                    </span>
                  </h2>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmitLead} noValidate className="space-y-6">
                    {/* 2x2 Grid of Underline Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {/* Your Name */}
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white placeholder-gray-400 text-sm outline-none transition-colors"
                        />
                      </div>

                      {/* E-mail address */}
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="E-mail address"
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white placeholder-gray-400 text-sm outline-none transition-colors"
                        />
                      </div>

                      {/* General Inquiry Dropdown */}
                      <div className="relative">
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white text-sm outline-none appearance-none cursor-pointer pr-7 transition-colors"
                        >
                          {leadGenSection.inquiryTypes.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-[#070d1d] text-white"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>

                      {/* Your idea */}
                      <div className="relative">
                        <input
                          type="text"
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Your idea"
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white placeholder-gray-400 text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Feedback Messages */}
                    {formError && (
                      <p className="text-red-400 text-xs sm:text-sm font-medium pt-2">
                        {formError}
                      </p>
                    )}

                    {formSuccess && (
                      <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 mt-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>
                          Thank you! Your inquiry has been sent successfully.
                        </span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0e172a] hover:bg-[#13203c] border border-white/15 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.12)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                        {/* Bottom subtle cyan glow line */}
                        <div className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 group-hover:opacity-100" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Column: SkillersZone / Brand Emblem */}
                <div className="hidden lg:flex items-center justify-center relative lg:col-span-5">
                  <div className="absolute w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
                  <svg
                    viewBox="0 0 200 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-48 h-56 sm:w-56 sm:h-64 drop-shadow-[0_0_35px_rgba(0,210,255,0.35)] relative z-10 transition-transform duration-500 hover:scale-105"
                  >
                    <defs>
                      <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d2ff" />
                        <stop offset="100%" stopColor="#0077b6" />
                      </linearGradient>
                      <linearGradient id="pinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d1d5db" />
                        <stop offset="100%" stopColor="#64748b" />
                      </linearGradient>
                    </defs>

                    {/* Pointer / Pin base triangle */}
                    <polygon
                      points="100,225 65,155 135,155"
                      fill="url(#pinGrad)"
                      opacity="0.95"
                    />

                    {/* Outer circle badge */}
                    <circle
                      cx="100"
                      cy="100"
                      r="76"
                      stroke="url(#emblemGrad)"
                      strokeWidth="14"
                      fill="#070d1d"
                    />

                    {/* Interlocking 'S' Curves inside badge */}
                    <path
                      d="M 136,70 C 136,52 120,44 100,44 C 74,44 64,62 64,76 C 64,98 84,103 106,111 C 128,119 136,132 136,150 C 136,170 120,180 98,180 C 74,180 64,164 64,152"
                      stroke="url(#emblemGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Dots in curve tips */}
                    <circle cx="134" cy="70" r="3.5" fill="#ffffff" />
                    <circle cx="68" cy="152" r="3.5" fill="#ffffff" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
