'use client';

import React from 'react';
import { ConcernItem, PRESET_ICONS } from '@/types/concerns';
import {
  Building2,
  Store,
  GraduationCap,
  HeartHandshake,
  Globe,
  ShoppingBag,
  Plane,
  ShoppingCart,
  Code2,
  Shield,
  Sparkles,
  Cpu,
  Layers,
  Newspaper,
  BookOpen,
  Stethoscope,
  Activity,
  Laptop,
  Smartphone,
  Rocket,
  Target,
  Zap,
  Compass,
  CheckCircle2,
  Award,
  Briefcase,
  Flame,
  Gem,
  Palette,
  Users,
  TrendingUp,
  Tag,
  HelpCircle,
} from 'lucide-react';

export const LUCIDE_CONCERN_ICONS: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Building2,
  Store,
  GraduationCap,
  HeartHandshake,
  Globe,
  ShoppingBag,
  Plane,
  ShoppingCart,
  Code2,
  Shield,
  Sparkles,
  Cpu,
  Layers,
  Newspaper,
  BookOpen,
  Stethoscope,
  Activity,
  Laptop,
  Smartphone,
  Rocket,
  Target,
  Zap,
  Compass,
  CheckCircle2,
  Award,
  Briefcase,
  Flame,
  Gem,
  Palette,
  Users,
  TrendingUp,
  Tag,
};

export function renderConcernIcon(item: ConcernItem): React.ReactNode {
  const { iconType, iconValue, name } = item;

  if (iconType === 'preset') {
    const matchedPreset = PRESET_ICONS.find((p) => p.id === iconValue);
    if (matchedPreset) {
      return (
        <div
          className="flex items-center justify-center shrink-0"
          dangerouslySetInnerHTML={{ __html: matchedPreset.svg }}
        />
      );
    }
  }

  if (iconType === 'lucide') {
    const IconComponent = LUCIDE_CONCERN_ICONS[iconValue] || HelpCircle;
    return <IconComponent className="w-7 h-7 shrink-0 text-white" />;
  }

  if (iconType === 'svg') {
    if (iconValue && iconValue.trim().startsWith('<svg')) {
      return (
        <div
          className="flex items-center justify-center shrink-0 max-w-[32px] max-h-[32px] overflow-hidden text-white fill-current"
          dangerouslySetInnerHTML={{ __html: iconValue }}
        />
      );
    }
  }

  if (iconType === 'upload' || iconType === 'image') {
    if (iconValue) {
      return (
        <img
          src={iconValue}
          alt={name || 'Concern Logo'}
          className="w-7 h-7 object-contain shrink-0 rounded"
          onError={(e) => {
            // Fallback gracefully on broken images
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );
    }
  }

  if (iconType === 'monogram') {
    return (
      <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center shrink-0">
        <span className="text-xs font-serif font-bold italic text-white">
          {iconValue || name?.charAt(0) || 'C'}
        </span>
      </div>
    );
  }

  // Default fallback if unknown
  return <Building2 className="w-7 h-7 shrink-0 text-white" />;
}

export default function ConcernIcon({ item }: { item: ConcernItem }) {
  return <>{renderConcernIcon(item)}</>;
}
