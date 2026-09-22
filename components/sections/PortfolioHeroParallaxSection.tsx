"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeroParallax, HeroParallaxProduct } from "@/components/ui/hero-parallax";
import {
  DEFAULT_PORTFOLIO_DATA,
  PortfolioSectionData,
} from "@/types/portfolio";
import {
  Sparkles,
  Briefcase,
  Layers,
  FolderKanban,
  Star,
  Award,
  Crown,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const products: HeroParallaxProduct[] = DEFAULT_PORTFOLIO_DATA.products;

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Briefcase,
  Layers,
  FolderKanban,
  Star,
  Award,
  Crown,
  Zap,
  CheckCircle2,
};

export default function PortfolioHeroParallaxSection() {
  const [data, setData] = useState<PortfolioSectionData>(DEFAULT_PORTFOLIO_DATA);

  const loadData = useCallback(() => {
    try {
      const saved = localStorage.getItem("digital_spyke_portfolio");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.products)) {
          setData(parsed);
        }
      }
    } catch {
      // ignore
    }

    fetch("/api/portfolio")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to load");
      })
      .then((apiRes) => {
        const apiData = apiRes?.data || apiRes;
        if (apiData && Array.isArray(apiData.products) && apiData.products.length > 0) {
          setData(apiData);
          try {
            localStorage.setItem("digital_spyke_portfolio", JSON.stringify(apiData));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // use current or default
      });
  }, []);

  useEffect(() => {
    loadData();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "digital_spyke_portfolio" && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    const handleCustomUpdate = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("digital_spyke_portfolio_updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("digital_spyke_portfolio_updated", handleCustomUpdate);
    };
  }, [loadData]);

  // Badge Icon Component
  const BadgeIconComponent = data.badgeIcon && ICON_MAP[data.badgeIcon] ? ICON_MAP[data.badgeIcon] : null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/[0.04] blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 w-[600px] h-[400px] bg-blue-600/[0.04] blur-[140px] rounded-full" />

      <HeroParallax
        products={data.products && data.products.length > 0 ? data.products : DEFAULT_PORTFOLIO_DATA.products}
        header={
          <div className="max-w-7xl relative mx-auto py-16 sm:py-24 md:py-36 px-4 sm:px-6 lg:px-8 w-full left-0 top-0 z-20">
            {/* Admin-controlled Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              {BadgeIconComponent ? (
                <BadgeIconComponent
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: data.badgeIconColor || "#38bdf8" }}
                />
              ) : (
                <span
                  className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_#38bdf8]"
                  style={{ backgroundColor: data.badgeIconColor || "#38bdf8" }}
                />
              )}
              <span
                className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase"
                style={data.badgeFontSize ? { fontSize: data.badgeFontSize } : undefined}
                dangerouslySetInnerHTML={{ __html: data.badgeText || "PORTFOLIO" }}
              />
            </div>

            {/* Admin-controlled Heading */}
            {data.headingHtml ? (
              <h2
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                style={data.headingFontSize ? { fontSize: data.headingFontSize } : undefined}
                dangerouslySetInnerHTML={{ __html: data.headingHtml }}
              />
            ) : (
              <h2
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                style={data.headingFontSize ? { fontSize: data.headingFontSize } : undefined}
              >
                {data.headingPrefix || "Our journey of "} <br />
                <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                  {data.headingHighlight || "success stories"}
                </span>
              </h2>
            )}

            {/* Admin-controlled Subtitle/Description */}
            <div
              className="max-w-2xl text-sm sm:text-base md:text-xl mt-6 text-gray-400 leading-relaxed font-light"
              style={data.descriptionFontSize ? { fontSize: data.descriptionFontSize } : undefined}
              dangerouslySetInnerHTML={{
                __html:
                  data.descriptionHtml ||
                  data.description ||
                  "We build beautiful products with the latest technologies and frameworks.",
              }}
            />
          </div>
        }
      />
    </section>
  );
}
