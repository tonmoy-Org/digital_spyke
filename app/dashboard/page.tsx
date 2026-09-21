'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Sliders, ArrowRight, Sparkles, Building2, FolderKanban } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
      {/* Header Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Spyke Control Center</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome to Digital Spyke Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Manage website content, update hero sections, and configure live portal settings dynamically.
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link
          href="/dashboard/hero-banner"
          className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Hero Banner
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Edit homepage brand title, subheadings, typewriter animated entries, and location text with Rich Text Editors.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Manage Hero Banner</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/our-concerns"
          className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              Our Concerns & Partners
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Manage marquee logos, brand presets, titles, subtitles, links, speeds, and icons dynamically from the admin panel.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>Manage Concerns</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/projects-industries"
          className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
              Projects & Industries
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Edit industry headings with rich text, configure highlight points (01, 02), and upload portfolio project images from device.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
            <span>Manage Projects</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </main>
  );
}
