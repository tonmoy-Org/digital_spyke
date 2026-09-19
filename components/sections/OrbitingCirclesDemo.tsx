'use client';

import React from 'react';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import {
  Smartphone,
  Globe,
  TrendingUp,
  Building2,
  ShoppingBag,
  Bot,
  Sparkles,
  Cloud,
  Headphones,
  Palette,
  BarChart3,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface OrbitPillProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

function OrbitPill({ icon: Icon, text }: OrbitPillProps) {
  return (
    <div className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030914]/90 border border-cyan-500/25 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.18)] hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(56,189,248,0.35)] hover:scale-105 transition-all cursor-pointer select-none whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8] shrink-0" />
      <Icon className="w-3 h-3 text-cyan-300 shrink-0 group-hover:text-white transition-colors" />
      <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-gray-100 uppercase whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}

export function OrbitingCirclesDemo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex h-[960px] w-[960px] flex-col items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* Central Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-cyan-500/[0.08] blur-2xl pointer-events-none" />

      {/* Central Pulsing Core Node */}
      <div className="absolute z-10 flex items-center justify-center">
        <div className="absolute w-10 h-10 rounded-full bg-cyan-400/20 animate-ping" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_18px_rgba(56,189,248,0.7)] border border-cyan-300/50 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Ring 1 (Inner Orbit - Radius 180px, 3 items) */}
      <OrbitingCircles
        radius={180}
        duration={28}
        speed={1}
        pathClassName="stroke-cyan-500/35 stroke-[1.2]"
      >
        <OrbitPill icon={Bot} text="AI Chat" />
        <OrbitPill icon={Cloud} text="Cloud Sync" />
        <OrbitPill icon={Headphones} text="Support" />
      </OrbitingCircles>

      {/* Ring 2 (Middle Orbit - Radius 300px, 4 items, reversed) */}
      <OrbitingCircles
        radius={300}
        duration={38}
        speed={1}
        reverse
        pathClassName="stroke-cyan-400/35 stroke-[1.2]"
      >
        <OrbitPill icon={Globe} text="Web Design" />
        <OrbitPill icon={TrendingUp} text="SEO & SMM" />
        <OrbitPill icon={Palette} text="Branding" />
        <OrbitPill icon={ShoppingBag} text="E-Commerce" />
      </OrbitingCircles>

      {/* Ring 3 (Outer Orbit - Radius 420px, 5 items) */}
      <OrbitingCircles
        radius={420}
        duration={48}
        speed={1}
        pathClassName="stroke-cyan-400/40 stroke-[1.2]"
      >
        <OrbitPill icon={Smartphone} text="App Dev" />
        <OrbitPill icon={Building2} text="Business" />
        <OrbitPill icon={BarChart3} text="Analytics" />
        <OrbitPill icon={ShieldCheck} text="Security" />
        <OrbitPill icon={Zap} text="Marketing" />
      </OrbitingCircles>

      {/* Outermost Thin Guide Ring */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <circle
          className="stroke-cyan-500/20 stroke-[1] fill-none"
          cx="50%"
          cy="50%"
          r={460}
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}
