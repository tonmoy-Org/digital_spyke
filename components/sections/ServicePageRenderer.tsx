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
  Globe,
  Smartphone,
  Cloud,
  Laptop,
  Database,
  Layers,
  Briefcase,
  Search,
  Server,
  Terminal,
  Lock,
  Settings,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowingBorderCard } from "@/components/ui/glowing-border-card";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Marquee } from "@/components/magicui/marquee";
import {
  FullServicePageConfig,
  DEFAULT_PRIMARY_SERVICE,
  DEFAULT_HERO_SLIDER_IMAGES,
} from "@/types/services";
import { cn } from "@/lib/utils";

export const DEFAULT_PORTFOLIO_PRODUCTS = [
  {
    id: "prod-1",
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    id: "prod-2",
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    id: "prod-3",
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    id: "prod-4",
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    id: "prod-5",
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    id: "prod-6",
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    id: "prod-7",
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    id: "prod-8",
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    id: "prod-9",
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    id: "prod-10",
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    id: "prod-11",
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    id: "prod-12",
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
];

export const SERVICE_TESTIMONIALS_FALLBACK = [
  {
    quote:
      "Digital Spyke engineered our application from the ground up using Next.js and TypeScript. Their architectural decisions helped us scale smoothly. The cleanest codebase we've ever inherited.",
    author: "Michael Andersson",
    location: "VP of Engineering, Chicago",
  },
  {
    quote:
      "As a non-technical founder, finding an engineering partner who communicates clearly while writing bulletproof code was a game changer. Digital Spyke brought our vision to life seamlessly.",
    author: "Stefan Müller",
    location: "Co-Founder & CEO, Berlin",
  },
  {
    quote:
      "The applications built by Digital Spyke are fast, robust, and secure. Their automated CI/CD pipeline and automated test coverage gave our stakeholders complete confidence.",
    author: "Elena Rostova",
    location: "Engineering Manager, Seattle",
  },
  {
    quote:
      "Outstanding development velocity. They transformed complex business logic into an intuitive, ultra-fast web portal that our internal operations team now relies on daily.",
    author: "Marcus Vance",
    location: "Operations Director, London",
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  compass: Compass,
  target: Target,
  rocket: Rocket,
  layoutdashboard: LayoutDashboard,
  trendingup: TrendingUp,
  reporting: FileText,
  filetext: FileText,
  cpu: Cpu,
  filecheck2: FileCheck2,
  linechart: LineChart,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
  code: Code2,
  code2: Code2,
  workflow: Workflow,
  boxes: Boxes,
  award: Award,
  hearthandshake: HeartHandshake,
  zap: Zap,
  sparkles: Sparkles,
  globe: Globe,
  smartphone: Smartphone,
  cloud: Cloud,
  laptop: Laptop,
  database: Database,
  layers: Layers,
  briefcase: Briefcase,
  star: Star,
  search: Search,
  checkcircle2: CheckCircle2,
  palette: Palette,
  lightbulb: Lightbulb,
  slidershorizontal: SlidersHorizontal,
  barchart3: BarChart3,
  send: Send,
  externallink: ExternalLink,
  server: Server,
  terminal: Terminal,
  lock: Lock,
  settings: Settings,
};

function renderDynamicIcon(iconNameOrEmoji: string | undefined, defaultIcon: React.ElementType = Compass) {
  if (!iconNameOrEmoji) {
    const Fallback = defaultIcon;
    return <Fallback className="w-7 h-7 text-[#3BA2F9]" />;
  }

  // If icon is an emoji or non-ascii string
  if (/[^\u0000-\u007F]/.test(iconNameOrEmoji)) {
    return <span className="text-2xl">{iconNameOrEmoji}</span>;
  }

  const key = iconNameOrEmoji.toLowerCase().replace(/[^a-z0-9]/g, "");
  const IconComp = ICON_MAP[key] || defaultIcon;
  return <IconComp className="w-7 h-7 text-[#3BA2F9]" />;
}

interface ServicePageRendererProps {
  slug?: string;
  initialConfig?: FullServicePageConfig;
}

export default function ServicePageRenderer({ slug, initialConfig }: ServicePageRendererProps) {
  const [config, setConfig] = useState<FullServicePageConfig>(initialConfig || DEFAULT_PRIMARY_SERVICE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialConfig);

  // SECTION 3: Horizontal Scroll Setup
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

  const stepsCount = config.workProcessSection?.steps?.length || 5;
  const desktopScrollVw = Math.max(0, stepsCount - 3) * 33.333333;
  const mobileScrollVw = Math.max(0, stepsCount - 1) * 85;
  const targetScrollVw = isMobile ? mobileScrollVw : desktopScrollVw;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${targetScrollVw}vw`]);

  // Lead Gen Form State
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch dynamic CMS configuration
  useEffect(() => {
    async function loadConfig() {
      try {
        setIsLoading(true);
        const endpoint = slug ? `/api/services?slug=${encodeURIComponent(slug)}` : `/api/services-config`;
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          if (data?.service) {
            setConfig(data.service);
          } else if (data?.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        // keep fallback
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, [slug]);

  // Handle Form Submission
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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_CONTACT || "c3bf9d7a-7db0-4fd1-b0db-6e690f050b18",
          subject: `New Services Inquiry [${config.navTitle} - ${inquiryType}]: ${formName}`,
          from_name: formName,
          email: formEmail,
          message: `Service Page: ${config.navTitle}\nInquiry Type: ${inquiryType}\n\nMessage:\n${formMessage}`,
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      } else {
        setFormSuccess(true);
      }
    } catch (err) {
      setFormSuccess(true);
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

  const sliderImages = heroSection?.sliderImages && heroSection.sliderImages.length > 0
    ? heroSection.sliderImages
    : DEFAULT_HERO_SLIDER_IMAGES;

  return (
    <div className="relative min-h-screen bg-[#070d1d] text-white selection:bg-blue-600 selection:text-white overflow-x-clip">
      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: HERO BANNER [ACETERNITY IMAGES SLIDER]
        ───────────────────────────────────────────────────────────── */}
        {heroSection?.enabled && (
          <section
            id="hero"
            aria-label={`${config.navTitle} Hero`}
            className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
          >
            <ImagesSlider
              className="min-h-[75vh] md:min-h-[85vh] w-full pt-28 pb-16"
              images={sliderImages}
              overlayClassName="bg-gradient-to-b from-black/50 via-black/30 to-[#070d1d]"
            >
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20 z-20 pointer-events-none"
                fill="rgba(59, 130, 246, 0.4)"
              />

              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-50 flex flex-col justify-center items-center max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8"
              >
                {/* Badge Tag */}
                {heroSection.badgeTag && (
                  <div
                    className="inline-block px-3.5 py-1 rounded-full border mb-5 font-mono font-bold tracking-widest uppercase shadow-sm"
                    style={{
                      fontSize: heroSection.badgeFontSize || "0.75rem",
                      color: heroSection.badgeColor || "#3BA2F9",
                      backgroundColor: heroSection.badgeBgColor || "rgba(59, 162, 249, 0.1)",
                      borderColor: "rgba(59, 162, 249, 0.25)",
                    }}
                  >
                    {heroSection.badgeTag}
                  </div>
                )}

                {/* Headline with Rich Text & Sized Control */}
                {heroSection.headlineHtml ? (
                  <h1
                    className="font-extrabold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8 drop-shadow-md text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ fontSize: heroSection.headlineFontSize || undefined }}
                    dangerouslySetInnerHTML={{ __html: heroSection.headlineHtml }}
                  />
                ) : (
                  <h1
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8 drop-shadow-md"
                    style={{ fontSize: heroSection.headlineFontSize || undefined }}
                  >
                    {heroSection.headline}
                  </h1>
                )}

                {/* Description with Rich Text & Sized Control */}
                {heroSection.descriptionHtml ? (
                  <div
                    className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 font-normal text-sm sm:text-base md:text-lg"
                    style={{ fontSize: heroSection.descriptionFontSize || undefined }}
                    dangerouslySetInnerHTML={{ __html: heroSection.descriptionHtml }}
                  />
                ) : (
                  <p
                    className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 font-normal"
                    style={{ fontSize: heroSection.descriptionFontSize || undefined }}
                  >
                    {heroSection.description}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {heroSection.primaryCta && (
                    <Link
                      href={heroSection.primaryCta.href || "#contact"}
                      className={cn(
                        "group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-white",
                        "bg-[#1D4ED8] hover:bg-[#1e40af] transition-all duration-300 shadow-[0_0_25px_rgba(29,78,216,0.6)] hover:shadow-[0_0_35px_rgba(29,78,216,0.85)] hover:-translate-y-0.5",
                        !isHydrated && "pointer-events-none opacity-80"
                      )}
                      style={{
                        fontSize: heroSection.primaryCta.fontSize || undefined,
                        backgroundColor: heroSection.primaryCta.bgColor || undefined,
                        color: heroSection.primaryCta.textColor || undefined,
                      }}
                    >
                      <span>{heroSection.primaryCta.text || "START YOUR PROJECT"}</span>
                      {heroSection.primaryCta.showIcon !== false && (
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </Link>
                  )}

                  {heroSection.secondaryCta?.enabled && (
                    <Link
                      href={heroSection.secondaryCta.href || "#services-grid"}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                      style={{
                        fontSize: heroSection.secondaryCta.fontSize || undefined,
                      }}
                    >
                      <span>{heroSection.secondaryCta.text || "EXPLORE CAPABILITIES"}</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            </ImagesSlider>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: CORE OFFERINGS [ROW LAYOUT]
        ───────────────────────────────────────────────────────────── */}
        {subServicesSection?.enabled && subServicesSection.services?.length > 0 && (
          <section
            id="services-grid"
            aria-label="Core Services Offerings"
            className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3
                className="font-bold tracking-wider text-[#3BA2F9] uppercase mb-4"
                style={{ fontSize: subServicesSection.tagFontSize || "0.875rem" }}
              >
                {subServicesSection.tag || "OUR CORE CAPABILITIES"}
              </h3>
              {subServicesSection.headlineHtml ? (
                <h2
                  className="font-extrabold text-white tracking-tight text-3xl sm:text-4xl lg:text-5xl"
                  style={{ fontSize: subServicesSection.headlineFontSize || undefined }}
                  dangerouslySetInnerHTML={{ __html: subServicesSection.headlineHtml }}
                />
              ) : (
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
                  style={{ fontSize: subServicesSection.headlineFontSize || undefined }}
                >
                  {subServicesSection.headline}
                </h2>
              )}
            </div>

            <div className="flex flex-col border-t border-white/[0.08]">
              {subServicesSection.services.map((service, idx) => (
                <div
                  key={service.id || idx}
                  className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-full md:w-[32%] mb-4 md:mb-0 md:pr-6">
                    <h3
                      className="font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors text-xl md:text-2xl"
                      style={{ fontSize: service.titleFontSize || undefined }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div className="w-full md:w-[18%] flex md:justify-center mb-4 md:mb-0">
                    <div className="opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      {renderDynamicIcon(service.icon, Code2)}
                    </div>
                  </div>

                  <div className="w-full md:w-[50%] md:pl-8">
                    {service.descriptionHtml ? (
                      <div
                        className="text-gray-300 leading-relaxed text-sm md:text-base"
                        style={{ fontSize: service.descriptionFontSize || undefined }}
                        dangerouslySetInnerHTML={{ __html: service.descriptionHtml }}
                      />
                    ) : (
                      <p
                        className="text-sm md:text-base text-gray-400 leading-relaxed"
                        style={{ fontSize: service.descriptionFontSize || undefined }}
                      >
                        {service.description}
                      </p>
                    )}

                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {service.features.map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] text-gray-300 border border-white/[0.06]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3BA2F9]" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: THE WORK PROCESS [HORIZONTAL PINNED SCROLL]
        ───────────────────────────────────────────────────────────── */}
        {workProcessSection?.enabled && workProcessSection.steps?.length > 0 && (
          <section
            id="methodology"
            aria-label="The Work Process"
            ref={targetRef}
            className="relative h-[180vh] bg-[#070d1d]"
          >
            <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden bg-[#070d1d] z-20 py-4">
              <Spotlight className="-top-24 left-1/4" fill="rgba(59, 130, 246, 0.25)" />

              <div className="text-center max-w-3xl mx-auto px-4 mb-4 sm:mb-6 relative z-10">
                <h3
                  className="font-bold tracking-widest text-[#3BA2F9] uppercase mb-1.5"
                  style={{ fontSize: workProcessSection.tagFontSize || "0.875rem" }}
                >
                  {workProcessSection.tag || "OUR ENGINEERING LIFECYCLE"}
                </h3>
                {workProcessSection.headlineHtml ? (
                  <h2
                    className="font-extrabold text-white tracking-tight text-2xl sm:text-4xl lg:text-5xl"
                    style={{ fontSize: workProcessSection.headlineFontSize || undefined }}
                    dangerouslySetInnerHTML={{ __html: workProcessSection.headlineHtml }}
                  />
                ) : (
                  <h2
                    className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
                    style={{ fontSize: workProcessSection.headlineFontSize || undefined }}
                  >
                    {workProcessSection.headline}
                  </h2>
                )}
              </div>

              <div className="relative w-full overflow-hidden py-2">
                <motion.div style={{ x }} className="flex gap-5 sm:gap-6 px-4 sm:px-8 w-max">
                  {workProcessSection.steps.map((step, idx) => {
                    const stepNumStr = step.stepNumber
                      ? String(step.stepNumber).padStart(2, "0")
                      : String(idx + 1).padStart(2, "0");

                    return (
                      <div
                        key={step.id || idx}
                        className="w-[85vw] sm:w-[46vw] md:w-[31vw] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1836] via-[#091126] to-[#070d1d] hover:border-[#3BA2F9]/50 hover:shadow-[0_8px_32px_rgba(59,162,249,0.15)] transition-all duration-300 p-6 sm:p-7 md:p-8 flex flex-col justify-between h-[430px] sm:h-[460px] group relative overflow-hidden backdrop-blur-xl"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3BA2F9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div>
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

                          <div>
                            <div className="w-12 h-12 rounded-xl bg-[#3BA2F9]/10 border border-[#3BA2F9]/30 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#3BA2F9]/20 group-hover:border-[#3BA2F9]/50 shadow-[0_0_20px_rgba(59,162,249,0.15)] transition-all duration-300">
                              {renderDynamicIcon(step.icon, Compass)}
                            </div>

                            <h3
                              className="font-bold text-white tracking-tight group-hover:text-[#3BA2F9] transition-colors text-lg sm:text-xl"
                              style={{ fontSize: step.titleFontSize || undefined }}
                            >
                              {step.shortTitle || step.title}
                            </h3>

                            {step.shortTitle && step.shortTitle !== step.title && (
                              <p className="text-[11px] uppercase font-semibold tracking-wider text-cyan-400/90 mt-1">
                                {step.title}
                              </p>
                            )}

                            {step.descriptionHtml ? (
                              <div
                                className="text-gray-300/80 leading-relaxed mt-2.5 line-clamp-3 group-hover:text-gray-200 transition-colors"
                                style={{ fontSize: step.descriptionFontSize || undefined }}
                                dangerouslySetInnerHTML={{ __html: step.descriptionHtml }}
                              />
                            ) : (
                              <p
                                className="text-gray-300/80 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3 group-hover:text-gray-200 transition-colors"
                                style={{ fontSize: step.descriptionFontSize || undefined }}
                              >
                                {step.description}
                              </p>
                            )}
                          </div>
                        </div>

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
            SECTION 4: WHY CHOOSE US / ARCHITECTURAL STRENGTHS
        ───────────────────────────────────────────────────────────── */}
        {whyChooseUsSection?.enabled && (
          <section id="strengths" aria-label="Our Strengths" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <h3
                className="font-bold tracking-widest text-[#3BA2F9] uppercase mb-4"
                style={{ fontSize: whyChooseUsSection.tagFontSize || "0.875rem" }}
              >
                {whyChooseUsSection.tag || "WHY CHOOSE DIGITAL SPYKE"}
              </h3>
              {whyChooseUsSection.headlineHtml ? (
                <h2
                  className="font-extrabold text-white tracking-tight leading-[1.2] text-3xl sm:text-4xl lg:text-5xl"
                  style={{ fontSize: whyChooseUsSection.headlineFontSize || undefined }}
                  dangerouslySetInnerHTML={{ __html: whyChooseUsSection.headlineHtml }}
                />
              ) : (
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]"
                  style={{ fontSize: whyChooseUsSection.headlineFontSize || undefined }}
                >
                  {whyChooseUsSection.headline}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {whyChooseUsSection.features?.map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  className="group border border-white/10 hover:border-white/25 bg-transparent transition-all duration-300 p-8 sm:p-10 flex flex-col justify-start rounded-xl"
                >
                  <div className="mb-6 sm:mb-8 text-white/90 group-hover:text-[#3BA2F9] transition-colors">
                    {renderDynamicIcon(feat.icon, Workflow)}
                  </div>
                  <h3
                    className="font-bold text-white tracking-tight mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors text-xl sm:text-2xl"
                    style={{ fontSize: feat.titleFontSize || undefined }}
                  >
                    {feat.title}
                  </h3>
                  {feat.descriptionHtml ? (
                    <div
                      className="text-gray-400 text-sm sm:text-base leading-relaxed"
                      style={{ fontSize: feat.descriptionFontSize || undefined }}
                      dangerouslySetInnerHTML={{ __html: feat.descriptionHtml }}
                    />
                  ) : (
                    <p
                      className="text-gray-400 text-sm sm:text-base leading-relaxed"
                      style={{ fontSize: feat.descriptionFontSize || undefined }}
                    >
                      {feat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: PORTFOLIO SHOWCASE
        ───────────────────────────────────────────────────────────── */}
        {portfolioSection?.enabled && (
          <section id="portfolio" aria-label="Portfolio & Case Studies" className="w-full relative z-10">
            <HeroParallax
              products={
                portfolioSection.products && portfolioSection.products.length > 0
                  ? portfolioSection.products
                  : DEFAULT_PORTFOLIO_PRODUCTS
              }
              header={
                <div className="max-w-7xl relative mx-auto py-16 sm:py-24 md:py-36 px-4 w-full left-0 top-0 z-20">
                  {portfolioSection.tag && (
                    <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                      <span
                        className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase"
                        style={{ fontSize: portfolioSection.tagFontSize || "0.875rem" }}
                      >
                        {portfolioSection.tag}
                      </span>
                    </div>
                  )}
                  {portfolioSection.headlineHtml ? (
                    <div
                      className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] [&_span]:inline-block"
                      style={{ fontSize: portfolioSection.headlineFontSize || undefined }}
                      dangerouslySetInnerHTML={{ __html: portfolioSection.headlineHtml }}
                    />
                  ) : (
                    <h2
                      className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                      style={{ fontSize: portfolioSection.headlineFontSize || undefined }}
                    >
                      {portfolioSection.headline || "Proven Web Applications & Engineering Case Studies"}
                    </h2>
                  )}
                  {portfolioSection.description && (
                    <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-6 text-gray-400 leading-relaxed">
                      {portfolioSection.description}
                    </p>
                  )}
                </div>
              }
            />
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 6: FAQ
        ───────────────────────────────────────────────────────────── */}
        {config.faqSection?.enabled !== false && (
          <FAQSection
            overrideData={{
              enabled: config.faqSection?.enabled,
              tag: config.faqSection?.tag,
              tagFontSize: config.faqSection?.tagFontSize,
              headline: config.faqSection?.headline,
              headlineHtml: config.faqSection?.headlineHtml,
              headlineFontSize: config.faqSection?.headlineFontSize,
              description: config.faqSection?.description,
              inheritGlobalFaqs: config.faqSection?.inheritGlobalFaqs,
              faqs: config.faqSection?.faqs,
            }}
          />
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 7: TESTIMONIALS MARQUEE
        ───────────────────────────────────────────────────────────── */}
        {testimonialsSection?.enabled && (
          <section id="testimonials" aria-label="Client Testimonials" className="py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4 relative z-10">
              <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                <span
                  className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase"
                  style={{ fontSize: testimonialsSection.tagFontSize || "0.875rem" }}
                >
                  {testimonialsSection.tag || "TESTIMONIALS"}
                </span>
              </div>
              {testimonialsSection.headlineHtml ? (
                <h2
                  className="font-extrabold text-white tracking-tight leading-[1.15] text-3xl sm:text-5xl lg:text-6xl"
                  style={{ fontSize: testimonialsSection.headlineFontSize || undefined }}
                  dangerouslySetInnerHTML={{ __html: testimonialsSection.headlineHtml }}
                />
              ) : (
                <h2
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
                  style={{ fontSize: testimonialsSection.headlineFontSize || undefined }}
                >
                  {testimonialsSection.headline}
                </h2>
              )}
            </div>

            <div className="relative w-full overflow-hidden space-y-4">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-[#070d1d] via-[#070d1d]/90 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-[#070d1d] via-[#070d1d]/90 to-transparent z-10" />

              {(() => {
                const cmsItems = testimonialsSection.testimonials || [];
                const allItems = cmsItems.length > 0 ? cmsItems : SERVICE_TESTIMONIALS_FALLBACK;
                const half = Math.ceil(allItems.length / 2);
                const firstRow = allItems.slice(0, half);
                const secondRow = allItems.length > 1 ? allItems.slice(half) : allItems;

                const renderCard = (item: any, key: string) => (
                  <div
                    key={key}
                    className="w-[320px] sm:w-[380px] md:w-[400px] h-[190px] sm:h-[200px] rounded-xl bg-[#0c152a]/95 border border-[#1b2b48]/80 hover:border-cyan-500/50 hover:bg-[#0f1b35] p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md group shrink-0"
                  >
                    <p
                      style={{ fontSize: item.quoteFontSize || undefined }}
                      className="text-[13px] sm:text-sm text-gray-300 font-normal leading-relaxed line-clamp-4"
                    >
                      {item.quote}
                    </p>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-3">
                      {item.avatar ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/40 shrink-0 bg-slate-800">
                          <Image
                            src={item.avatar}
                            alt={item.author || "Client"}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_12px_rgba(59,162,249,0.3)]">
                          {item.author ? item.author.charAt(0).toUpperCase() : "C"}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors truncate">
                          {item.author}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 truncate">
                          {item.location || `${item.role || "Client"}${item.company ? `, ${item.company}` : ""}`}
                        </div>
                      </div>
                    </div>
                  </div>
                );

                return (
                  <>
                    {/* Row 1 - Forward */}
                    <Marquee pauseOnHover repeat={3} className="py-1 [--duration:40s] [--gap:1.5rem]">
                      {firstRow.map((item: any, idx: number) => renderCard(item, `t1-${idx}`))}
                    </Marquee>

                    {/* Row 2 - Reverse */}
                    <Marquee reverse pauseOnHover repeat={3} className="py-1 [--duration:45s] [--gap:1.5rem]">
                      {secondRow.map((item: any, idx: number) => renderCard(item, `t2-${idx}`))}
                    </Marquee>
                  </>
                );
              })()}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 8: LEAD GENERATION & CONTACT
        ───────────────────────────────────────────────────────────── */}
        {leadGenSection?.enabled && (
          <section id="contact" aria-label="Lead Generation & Contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="relative rounded-2xl border border-white/15 bg-[#070d1d] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
                <div className="lg:col-span-7">
                  {leadGenSection.tag && (
                    <div className="inline-block mb-3 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                      <span
                        className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono"
                        style={{ fontSize: leadGenSection.tagFontSize || "0.75rem" }}
                      >
                        {leadGenSection.tag}
                      </span>
                    </div>
                  )}
                  <p
                    className="font-medium text-gray-300 mb-2.5 tracking-wide"
                    style={{ fontSize: leadGenSection.subheadlineFontSize || "0.875rem" }}
                  >
                    {leadGenSection.subheadline || "Ready to build your next application? Let's talk architecture."}
                  </p>

                  {leadGenSection.headlineHtml ? (
                    <h2
                      className="font-extrabold text-white tracking-tight leading-[1.1] mb-10 sm:mb-12 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
                      style={{ fontSize: leadGenSection.headlineFontSize || undefined }}
                      dangerouslySetInnerHTML={{ __html: leadGenSection.headlineHtml }}
                    />
                  ) : (
                    <h2
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-10 sm:mb-12"
                      style={{ fontSize: leadGenSection.headlineFontSize || undefined }}
                    >
                      {leadGenSection.headline}
                    </h2>
                  )}

                  <form onSubmit={handleSubmitLead} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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

                      <div className="relative">
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white text-sm outline-none appearance-none cursor-pointer pr-7 transition-colors"
                        >
                          {(leadGenSection.inquiryTypes && leadGenSection.inquiryTypes.length > 0
                            ? leadGenSection.inquiryTypes
                            : ["Custom Web Application", "Enterprise SaaS Platform", "Mobile App Development", "API & Cloud Infrastructure"]
                          ).map((type) => (
                            <option key={type} value={type} className="bg-[#070d1d] text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Your project idea or requirements"
                          className="w-full bg-transparent border-b border-gray-600/70 focus:border-[#00d2ff] py-3 text-white placeholder-gray-400 text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {formError && (
                      <p className="text-red-400 text-xs sm:text-sm font-medium pt-2">{formError}</p>
                    )}

                    {formSuccess && (
                      <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2 mt-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Thank you! Your inquiry has been sent successfully.</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ fontSize: leadGenSection.submitButtonFontSize || undefined }}
                        className="relative group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0e172a] hover:bg-[#13203c] border border-white/15 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.12)] cursor-pointer disabled:opacity-50"
                      >
                        <span>{isSubmitting ? "Sending..." : (leadGenSection.submitButtonText || "Send Message")}</span>
                        <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        <div className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 group-hover:opacity-100" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Emblem */}
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
                    <polygon points="100,225 65,155 135,155" fill="url(#pinGrad)" opacity="0.95" />
                    <circle cx="100" cy="100" r="76" stroke="url(#emblemGrad)" strokeWidth="14" fill="#070d1d" />
                    <path
                      d="M 136,70 C 136,52 120,44 100,44 C 74,44 64,62 64,76 C 64,98 84,103 106,111 C 128,119 136,132 136,150 C 136,170 120,180 98,180 C 74,180 64,164 64,152"
                      stroke="url(#emblemGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      fill="none"
                    />
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
