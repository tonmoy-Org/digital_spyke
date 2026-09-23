"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronDown,
  ArrowUpRight,
  HelpCircle,
  FileQuestion,
  Sparkles,
  Shield,
  Lock,
  Zap,
  Rocket,
  Cpu,
  Server,
  Cloud,
  Globe,
  Building2,
  Briefcase,
  Headphones,
  MessageSquareQuote,
  CheckCircle2,
  Star,
  Award,
  Crown,
  Heart,
  ThumbsUp,
  Compass,
  Layers,
  Code2,
} from "lucide-react";
import { FAQSectionData, DEFAULT_FAQ_DATA, FAQItem } from "@/types/faq";

// Icon library mapping for optional icons
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle,
  FileQuestion,
  Sparkles,
  Shield,
  Lock,
  Zap,
  Rocket,
  Cpu,
  Server,
  Cloud,
  Globe,
  Building2,
  Briefcase,
  Headphones,
  MessageSquareQuote,
  CheckCircle2,
  Star,
  Award,
  Crown,
  Heart,
  ThumbsUp,
  Compass,
  Layers,
  Code2,
};

export default function FAQSection() {
  const [data, setData] = useState<FAQSectionData>(DEFAULT_FAQ_DATA);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Fetch live FAQ data from API
  useEffect(() => {
    let isMounted = true;
    async function fetchFAQData() {
      try {
        const res = await fetch("/api/faq", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            setData(json.data);
          }
        }
      } catch (err) {
        console.warn("[FAQSection] Could not load live FAQ data, using default:", err);
      }
    }
    fetchFAQData();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter active FAQs and sort by order
  const activeFaqs = (data.faqs || [])
    .filter((f) => f.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Filter by category if user clicks a tab
  const displayedFaqs = activeFaqs.filter((faq) => {
    if (!data.showCategoryFilter || activeCategory === "All") return true;
    return faq.category === activeCategory;
  });

  // Extract unique categories from active FAQs
  const availableCategories = [
    "All",
    ...Array.from(
      new Set(
        activeFaqs
          .map((f) => f.category)
          .filter((c): c is string => Boolean(c && c !== "All"))
      )
    ),
  ];

  const iconColor = data.iconColor || "#22d3ee";

  return (
    <section className="relative w-full pt-16 sm:pt-24 pb-24 sm:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030712]">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Optional Badge, Description, Optional Side Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            {/* Optional Badge */}
            {data.showBadge && data.badgeText && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-4 border border-white/10"
                style={{
                  fontSize: data.badgeFontSize || "0.75rem",
                  color: data.badgeColor || "#00FFAB",
                  backgroundColor: data.badgeBgColor || "rgba(0, 255, 171, 0.1)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                <span>{data.badgeText}</span>
              </div>
            )}

            {/* Main Heading */}
            {data.headingHtml ? (
              <div
                className="font-extrabold text-white tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl [&_span]:inline-block"
                style={{ fontSize: data.headingFontSize || undefined }}
                dangerouslySetInnerHTML={{ __html: data.headingHtml }}
              />
            ) : (
              <h2
                className="font-extrabold text-white tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl"
                style={{ fontSize: data.headingFontSize || undefined }}
              >
                <span className="block text-white">{data.headingPrefix || "Frequently asked"}</span>
                <span className="bg-gradient-to-r from-[#00FFAB] via-[#22d3ee] to-[#6B46FF] bg-clip-text text-transparent inline-block">
                  {data.headingHighlight || "questions"}
                </span>
                {data.headingSuffix ? (
                  <span className="text-white"> {data.headingSuffix}</span>
                ) : null}
              </h2>
            )}

            {/* Description */}
            {data.descriptionHtml ? (
              <div
                className="mt-5 text-gray-400 leading-relaxed max-w-md text-sm sm:text-base [&_p]:leading-relaxed"
                style={{ fontSize: data.descriptionFontSize || undefined }}
                dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
              />
            ) : (
              <p
                className="mt-5 text-gray-400 leading-relaxed max-w-md text-sm sm:text-base"
                style={{ fontSize: data.descriptionFontSize || undefined }}
              >
                {data.description}
              </p>
            )}

            {/* Optional Side Image / Graphic */}
            {data.showSideImage && data.sideImageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8 pt-2"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 backdrop-blur-sm max-w-sm group hover:border-cyan-500/30 transition-all">
                  <img
                    src={data.sideImageUrl}
                    alt={data.sideImageAlt || "FAQ Illustration"}
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Category Filters (optional) & Accordion List */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            {/* Optional Category Filter Pills */}
            {data.showCategoryFilter && availableCategories.length > 2 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      activeCategory === category
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Accordion Container */}
            <div className="border-t border-white/10">
              {displayedFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const IconComponent =
                  (faq.icon && ICON_MAP[faq.icon]) || HelpCircle;

                return (
                  <div
                    key={faq.id || index}
                    className="border-b border-white/10 transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-5 sm:py-6 flex items-start gap-4 text-left group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      {/* Left: Indicator Icon (+ that rotates to x by default) */}
                      <div className="mt-1 flex items-center justify-center shrink-0">
                        {data.accordionIconType === "chevron" ? (
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="text-cyan-400 group-hover:text-cyan-300"
                            style={{ color: iconColor }}
                          >
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                          </motion.div>
                        ) : data.accordionIconType === "arrow" ? (
                          <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="text-cyan-400 group-hover:text-cyan-300"
                            style={{ color: iconColor }}
                          >
                            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          </motion.div>
                        ) : data.accordionIconType === "help" ? (
                          <div
                            className="text-cyan-400 group-hover:text-cyan-300"
                            style={{ color: iconColor }}
                          >
                            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                        ) : (
                          /* Default Plus icon with 45deg rotation on open */
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="text-cyan-400 group-hover:text-cyan-300"
                            style={{ color: iconColor }}
                          >
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Optional Custom Icon/Image if configured on the item */}
                      {faq.iconType === "image" && faq.image ? (
                        <div className="mt-0.5 w-6 h-6 rounded-md overflow-hidden shrink-0 border border-white/10 bg-white/5">
                          <img
                            src={faq.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : faq.iconType === "icon" && faq.icon && faq.icon !== "HelpCircle" ? (
                        <div
                          className="mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 border border-white/10"
                          style={{
                            backgroundColor: faq.iconBgColor || "rgba(0, 255, 171, 0.15)",
                          }}
                        >
                          <IconComponent className="w-3.5 h-3.5 text-cyan-300" />
                        </div>
                      ) : null}

                      {/* Question Text */}
                      <span
                        className="font-medium text-white group-hover:text-cyan-300 transition-colors text-base sm:text-lg leading-snug flex-1"
                        style={{
                          fontSize: faq.questionFontSize || undefined,
                          color: faq.questionColor || "#ffffff",
                        }}
                      >
                        {faq.question}
                      </span>
                    </button>

                    {/* Smooth Collapsible Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div
                            className="pb-6 pl-9 sm:pl-10 pr-2 leading-relaxed font-normal text-gray-400 text-sm sm:text-base [&_strong]:text-cyan-300 [&_strong]:font-semibold [&_em]:text-gray-200 [&_a]:text-cyan-400 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:mb-1 [&_p]:mb-2 last:[&_p]:mb-0"
                            style={{
                              fontSize: faq.answerFontSize || undefined,
                              color: faq.answerColor || undefined,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: faq.answerHtml || faq.answer,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {displayedFaqs.length === 0 && (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No FAQs available at the moment.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
