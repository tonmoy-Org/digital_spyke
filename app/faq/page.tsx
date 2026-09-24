import React from "react";
import type { Metadata } from "next";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Digital Spyke",
  description:
    "Find answers to frequently asked questions about Digital Spyke's cloud solutions, custom web design, security standards, and 24/7 dedicated support.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen  text-white pt-24 pb-16">
      {/* Top Page Header Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Help & Knowledge Center
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          How Can We{" "}
          <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
            Help You?
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Explore answers to common questions about our services, cloud architecture, security, scaling, and ongoing client partnerships.
        </p>
      </section>

      {/* Main FAQ Dynamic Component */}
      <FAQSection />
    </main>
  );
}
