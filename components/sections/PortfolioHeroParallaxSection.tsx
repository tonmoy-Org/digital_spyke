"use client";

import React from "react";
import { HeroParallax, HeroParallaxProduct } from "@/components/ui/hero-parallax";

export const products: HeroParallaxProduct[] = [
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

export default function PortfolioHeroParallaxSection() {
  return (
    <section className="relative w-full  overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/[0.04] blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-40 right-1/4 w-[600px] h-[400px] bg-blue-600/[0.04] blur-[140px] rounded-full" />

      <HeroParallax
        products={products}
        header={
          <div className="max-w-7xl relative mx-auto py-16 sm:py-24 md:py-36 px-4 sm:px-6 lg:px-8 w-full left-0 top-0 z-20">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase">
                PORTFOLIO
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Our journey of <br />
              <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                success stories
              </span>
            </h2>

            <p className="max-w-2xl text-sm sm:text-base md:text-xl mt-6 text-gray-400 leading-relaxed font-light">
              We build beautiful products with the latest technologies and frameworks.
              Explore our featured work showcasing cutting-edge development, seamless user experience, and measurable brand growth.
            </p>
          </div>
        }
      />
    </section>
  );
}
