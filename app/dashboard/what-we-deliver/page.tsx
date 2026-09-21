'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import {
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Layers,
  Copy,
  Tag,
  Eye,
  Code2,
  TrendingUp,
  Users2,
  ShoppingBag,
  Rocket,
  Cpu,
  Shield,
  Zap,
  Target,
  Compass,
  LayoutDashboard,
  LineChart,
  FileCheck2,
  CheckCircle2,
  Globe,
  Laptop,
  Smartphone,
  Search,
  Share2,
  Database,
  Bot,
  Workflow,
  ArrowUpRight,
  Palette,
} from 'lucide-react';

// Dynamically import ReactQuill to prevent SSR hydration mismatches
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

// Font Size Options
const BADGE_FONT_OPTIONS = [
  { label: 'Tiny (0.625rem / 10px)', value: '0.625rem' },
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Medium (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Large (1.125rem / 18px)', value: '1.125rem' },
];

const HEADING_FONT_OPTIONS = [
  { label: 'Small (1.75rem / 28px)', value: '1.75rem' },
  { label: 'Medium (2.25rem / 36px)', value: '2.25rem' },
  { label: 'Large (3rem / 48px)', value: '3rem' },
  { label: 'Default Large (3.75rem / 60px)', value: '3.75rem' },
  { label: 'Extra Large (4.5rem / 72px)', value: '4.5rem' },
  { label: 'Huge (5.5rem / 88px)', value: '5.5rem' },
];

const DESCRIPTION_FONT_OPTIONS = [
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Extra Large (1.5rem / 24px)', value: '1.5rem' },
];

const CARD_TITLE_FONT_OPTIONS = [
  { label: 'Small (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Default (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Medium (1.75rem / 28px)', value: '1.75rem' },
  { label: 'Large (2rem / 32px)', value: '2rem' },
  { label: 'Extra Large (2.5rem / 40px)', value: '2.5rem' },
];

const CARD_DESC_FONT_OPTIONS = [
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
];

// Quill Toolbar Configurations
const badgeQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};
const badgeQuillFormats = ['bold', 'italic', 'underline', 'color', 'background'];

const titleQuillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};
const titleQuillFormats = ['size', 'bold', 'italic', 'underline', 'strike', 'color', 'background'];

const subtitleQuillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'clean'],
  ],
};
const subtitleQuillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'align',
  'link',
];

const isHtml = (str?: string) => Boolean(str && /<[a-z][\s\S]*>/i.test(str));

// Lucide Icons Map
const ICON_OPTIONS = [
  { id: 'Code2', label: 'Code & Software', icon: Code2 },
  { id: 'TrendingUp', label: 'Marketing & Growth', icon: TrendingUp },
  { id: 'Users2', label: 'Team & Augmentation', icon: Users2 },
  { id: 'ShoppingBag', label: 'E-commerce & Retail', icon: ShoppingBag },
  { id: 'Sparkles', label: 'Sparkles / AI', icon: Sparkles },
  { id: 'Rocket', label: 'Rocket / Launch', icon: Rocket },
  { id: 'Cpu', label: 'Technology / CPU', icon: Cpu },
  { id: 'Shield', label: 'Security & QA', icon: Shield },
  { id: 'Zap', label: 'Speed & Performance', icon: Zap },
  { id: 'Target', label: 'Strategy & Targeting', icon: Target },
  { id: 'Compass', label: 'Discovery / Roadmap', icon: Compass },
  { id: 'LayoutDashboard', label: 'Dashboard / Portal', icon: LayoutDashboard },
  { id: 'LineChart', label: 'Analytics / Metrics', icon: LineChart },
  { id: 'FileCheck2', label: 'Reporting / Verified', icon: FileCheck2 },
  { id: 'CheckCircle2', label: 'Success / Completed', icon: CheckCircle2 },
  { id: 'Globe', label: 'Global / Web', icon: Globe },
  { id: 'Laptop', label: 'Web Platform / PC', icon: Laptop },
  { id: 'Smartphone', label: 'Mobile Apps', icon: Smartphone },
  { id: 'Search', label: 'SEO & Search', icon: Search },
  { id: 'Share2', label: 'Social Media', icon: Share2 },
  { id: 'Database', label: 'Database & Cloud', icon: Database },
  { id: 'Bot', label: 'AI Automation / Bot', icon: Bot },
  { id: 'Workflow', label: 'Agile Workflow', icon: Workflow },
  { id: 'Layers', label: 'Full Stack / Layers', icon: Layers },
];

const ACCENT_GRADIENT_OPTIONS = [
  { id: 'from-cyan-500 to-blue-600', label: 'Cyan to Blue' },
  { id: 'from-emerald-400 to-cyan-500', label: 'Emerald to Cyan' },
  { id: 'from-blue-500 to-indigo-600', label: 'Blue to Indigo' },
  { id: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { id: 'from-amber-400 to-orange-500', label: 'Amber to Orange' },
  { id: 'from-rose-500 to-red-600', label: 'Rose to Red' },
];

function getIconComponent(iconName?: string) {
  const match = ICON_OPTIONS.find((item) => item.id.toLowerCase() === (iconName || '').toLowerCase());
  return match ? match.icon : Code2;
}

export interface ServiceCard {
  id: string;
  number: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  icon: string;
  tags: string[];
  accentGradient?: string;
}

export interface WhatWeDeliverData {
  badgeText: string;
  badgeFontSize?: string;
  badgeIcon?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  services: ServiceCard[];
}

const DEFAULT_DATA: WhatWeDeliverData = {
  badgeText: 'What We Deliver',
  badgeFontSize: '0.75rem',
  badgeIcon: 'Sparkles',
  headingPrefix: 'High-Impact Solutions for ',
  headingHighlight: 'Global Scale',
  headingFontSize: '3rem',
  description:
    'From technical development to digital reach and operations, our end-to-end expertise fuels sustainable growth.',
  descriptionFontSize: '1.125rem',
  services: [
    {
      id: 'service-1',
      number: '01',
      title: 'Software Development',
      titleFontSize: '1.5rem',
      description:
        'From intuitive interfaces to advanced integrations, we build software that helps you launch and grow without the tech headaches. Create powerful solutions designed for performance and scale.',
      descriptionFontSize: '0.875rem',
      icon: 'Code2',
      tags: [
        'Website Design & Development',
        'UI/UX Design',
        'Apps Development',
        'ERP Development',
      ],
      accentGradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'service-2',
      number: '02',
      title: 'Digital Marketing',
      titleFontSize: '1.5rem',
      description:
        'A full suite of digital marketing solutions, from social media management and ad campaigns to SEO and content creation. Engage the right audience, build lasting visibility, and achieve measurable results.',
      descriptionFontSize: '0.875rem',
      icon: 'TrendingUp',
      tags: [
        'Social Media Management',
        'Search Engine Optimization',
        'Ad Management',
        'Content Creation & Curation',
      ],
      accentGradient: 'from-emerald-400 to-cyan-500',
    },
    {
      id: 'service-3',
      number: '03',
      title: 'Resource Augmentation',
      titleFontSize: '1.5rem',
      description:
        'Streamline your business operations smoothly as we handle customer support, back-office processes, and other tasks, allowing your team to focus on growth, efficiency, and better service outcomes.',
      descriptionFontSize: '0.875rem',
      icon: 'Users2',
      tags: ['Virtual Assistant', 'Appointment Setter', 'Lead Generation'],
      accentGradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'service-4',
      number: '04',
      title: 'E-commerce Store Management',
      titleFontSize: '1.5rem',
      description:
        'Launch your online business with Amazon FBA, FBM, dropshipping, and other top e-commerce platforms. Gain visibility on marketplaces and open your storefront to shoppers worldwide.',
      descriptionFontSize: '0.875rem',
      icon: 'ShoppingBag',
      tags: [
        'Amazon (FBA, FBM, Dropshipping)',
        'Shopify',
        'Walmart',
        'Etsy',
      ],
      accentGradient: 'from-purple-500 to-pink-500',
    },
  ],
};

export default function WhatWeDeliverDashboardPage() {
  const [formData, setFormData] = useState<WhatWeDeliverData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewCardIndex, setPreviewCardIndex] = useState(0);
  const [newTagInputs, setNewTagInputs] = useState<{ [key: string]: string }>({});

  // Fetch data on load
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/what-we-deliver', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          const rawServices = Array.isArray(json.data.services) && json.data.services.length > 0
            ? json.data.services
            : DEFAULT_DATA.services;

          const sanitizedServices: ServiceCard[] = rawServices.map((s: any, idx: number) => ({
            id: s.id || `service-${idx + 1}-${Date.now()}`,
            number: s.number || `${idx + 1}`.padStart(2, '0'),
            title: s.title ?? `Service ${idx + 1}`,
            titleFontSize: s.titleFontSize || '1.5rem',
            description: s.description ?? '',
            descriptionFontSize: s.descriptionFontSize || '0.875rem',
            icon: s.icon || 'Code2',
            tags: Array.isArray(s.tags)
              ? s.tags
              : typeof s.tags === 'string'
              ? (s.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean)
              : [],
            accentGradient: s.accentGradient || 'from-cyan-500 to-blue-600',
          }));

          setFormData({
            badgeText: json.data.badgeText || DEFAULT_DATA.badgeText,
            badgeFontSize: json.data.badgeFontSize || DEFAULT_DATA.badgeFontSize || '0.75rem',
            badgeIcon: json.data.badgeIcon || DEFAULT_DATA.badgeIcon || 'Sparkles',
            headingPrefix: json.data.headingPrefix ?? DEFAULT_DATA.headingPrefix,
            headingHighlight: json.data.headingHighlight || DEFAULT_DATA.headingHighlight,
            headingFontSize: json.data.headingFontSize || DEFAULT_DATA.headingFontSize || '3rem',
            description: json.data.description || DEFAULT_DATA.description,
            descriptionFontSize: json.data.descriptionFontSize || DEFAULT_DATA.descriptionFontSize || '1.125rem',
            services: sanitizedServices,
          });
        }
      } catch (err) {
        console.error('Failed to load what we deliver data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Update Section level field
  const handleSectionChange = (field: keyof Omit<WhatWeDeliverData, 'services'>, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Add Card
  const handleAddCard = () => {
    const nextIndex = formData.services.length + 1;
    const formattedNum = nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`;
    const newCard: ServiceCard = {
      id: `service-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      number: formattedNum,
      title: `New Service ${nextIndex}`,
      titleFontSize: '1.5rem',
      description: 'Describe the deliverables, scope of work, and solutions provided in this service.',
      descriptionFontSize: '0.875rem',
      icon: 'Rocket',
      tags: ['Deliverable', 'Solutions', 'Agile'],
      accentGradient: 'from-cyan-500 to-blue-600',
    };

    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, newCard],
    }));

    setPreviewCardIndex(formData.services.length);
  };

  // Duplicate Card
  const handleDuplicateCard = (index: number) => {
    const target = formData.services[index];
    const duplicated: ServiceCard = {
      ...target,
      id: `service-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      number: `${formData.services.length + 1}`.padStart(2, '0'),
      title: target.title ? `${target.title} (Copy)` : 'Copy',
      titleFontSize: target.titleFontSize || '1.5rem',
      descriptionFontSize: target.descriptionFontSize || '0.875rem',
      tags: Array.isArray(target.tags) ? [...target.tags] : [],
    };

    const newCards = [...formData.services];
    newCards.splice(index + 1, 0, duplicated);
    setFormData((prev) => ({ ...prev, services: newCards }));
    setPreviewCardIndex(index + 1);
  };

  // Delete Card
  const handleDeleteCard = async (index: number) => {
    if (formData.services.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Card Required',
        text: 'You need at least one service card in this section.',
      });
      return;
    }

    const card = formData.services[index];
    const result = await Swal.fire({
      title: `Delete "${card.title}"?`,
      text: 'Are you sure you want to remove this service card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      const updated = formData.services.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, services: updated }));
      if (previewCardIndex >= updated.length) {
        setPreviewCardIndex(Math.max(0, updated.length - 1));
      }
    }
  };

  // Move Card
  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.services.length) return;

    const updated = [...formData.services];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, services: updated }));
    setPreviewCardIndex(targetIndex);
  };

  // Edit Card Property
  const handleCardChange = (index: number, field: keyof ServiceCard, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.services];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, services: updated };
    });
  };

  // Add Tag
  const handleAddTag = (cardIndex: number, specificTag?: string) => {
    const card = formData.services[cardIndex];
    if (!card) return;
    const cardKey = card.id || `service-${cardIndex}`;
    const rawInput = specificTag !== undefined ? specificTag : (newTagInputs[cardKey] || '');
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const tagsToAdd = trimmed
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tagsToAdd.length === 0) return;

    setFormData((prev) => {
      const updated = [...prev.services];
      const currentCard = updated[cardIndex];
      if (!currentCard) return prev;

      let existingTags: string[] = [];
      if (Array.isArray(currentCard.tags)) {
        existingTags = [...currentCard.tags];
      } else if (typeof currentCard.tags === 'string') {
        existingTags = (currentCard.tags as string).split(',').map((t) => t.trim()).filter(Boolean);
      }

      for (const tag of tagsToAdd) {
        if (!existingTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
          existingTags.push(tag);
        }
      }

      updated[cardIndex] = { ...currentCard, tags: existingTags };
      return { ...prev, services: updated };
    });

    setNewTagInputs((prev) => ({ ...prev, [cardKey]: '' }));
    setPreviewCardIndex(cardIndex);
  };

  // Remove Tag
  const handleRemoveTag = (cardIndex: number, tagIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.services];
      const currentCard = updated[cardIndex];
      if (!currentCard) return prev;

      const tags = Array.isArray(currentCard.tags) ? [...currentCard.tags] : [];
      tags.splice(tagIndex, 1);
      updated[cardIndex] = { ...currentCard, tags };
      return { ...prev, services: updated };
    });
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    const result = await Swal.fire({
      title: 'Reset to Defaults?',
      text: 'This will revert all titles, subtitles, icons, and services to the default 4 cards.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, reset',
    });

    if (result.isConfirmed) {
      setFormData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
      setPreviewCardIndex(0);
    }
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // 1. Update localStorage for instant local preview
      try {
        localStorage.setItem('digital_spyke_what_we_deliver', JSON.stringify(formData));
      } catch (e) {}

      // 2. Persist to API
      const res = await fetch('/api/what-we-deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: 'success',
          title: 'What We Deliver updated successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: data.message || 'Failed to save settings',
        });
      }
    } catch (err: any) {
      console.error('Save error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving settings.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[450px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 text-xs font-semibold">Loading What We Deliver Settings...</p>
      </div>
    );
  }

  const activePreviewCard =
    formData.services[previewCardIndex] || formData.services[0] || null;
  const ActiveIcon = activePreviewCard
    ? getIconComponent(activePreviewCard.icon)
    : Code2;
  const BadgeIcon = getIconComponent(formData.badgeIcon || 'Sparkles');

  return (
    <main className="p-6 space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Home Landing Page
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {formData.services.length} Service Cards Active
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">What We Deliver Configuration</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Full control over the &ldquo;What We Deliver: High-Impact Solutions for Global Scale&rdquo; section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            type="button"
            className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            title="Reset to default original content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Controls Left (60%), Live Preview Right (40%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="xl:col-span-7 space-y-6">
          {/* Section Header Controls */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Section Header &amp; Text Settings</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top Badge Text (Rich Text) & Size */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Top Badge Text</span>
                    <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                    <select
                      value={formData.badgeFontSize || '0.75rem'}
                      onChange={(e) => handleSectionChange('badgeFontSize', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                    >
                      {BADGE_FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-toolbar]:bg-gray-50/70 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[42px] [&_.ql-editor]:text-xs [&_.ql-editor]:py-2">
                  <ReactQuill
                    theme="snow"
                    value={formData.badgeText}
                    onChange={(val) => handleSectionChange('badgeText', val)}
                    modules={badgeQuillModules}
                    formats={badgeQuillFormats}
                    placeholder="What We Deliver"
                  />
                </div>
              </div>

              {/* Badge Icon Picker */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <BadgeIcon className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Badge Icon</span>
                </label>
                <select
                  value={formData.badgeIcon || 'Sparkles'}
                  onChange={(e) => handleSectionChange('badgeIcon', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white font-medium"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Heading Prefix (Rich Text) & Size */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Section Main Heading Title</span>
                    <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                    <select
                      value={formData.headingFontSize || '3rem'}
                      onChange={(e) => handleSectionChange('headingFontSize', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                    >
                      {HEADING_FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-toolbar]:bg-gray-50/70 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[48px] [&_.ql-editor]:text-xs [&_.ql-editor]:py-2">
                  <ReactQuill
                    theme="snow"
                    value={formData.headingPrefix}
                    onChange={(val) => handleSectionChange('headingPrefix', val)}
                    modules={titleQuillModules}
                    formats={titleQuillFormats}
                    placeholder="High-Impact Solutions for"
                  />
                </div>
              </div>

              {/* Heading Highlight Word */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                  <span>Highlighted Glow Words (Suffix)</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Gradient Emerald/Cyan/Purple</span>
                </label>
                <input
                  type="text"
                  value={formData.headingHighlight}
                  onChange={(e) => handleSectionChange('headingHighlight', e.target.value)}
                  placeholder="Global Scale"
                  className="w-full px-3.5 py-2 text-xs border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-emerald-50/30 text-emerald-900 font-bold"
                />
              </div>

              {/* Section Subtitle / Description (Rich Text) & Size */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Section Subtitle / Description</span>
                    <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                    <select
                      value={formData.descriptionFontSize || '1.125rem'}
                      onChange={(e) => handleSectionChange('descriptionFontSize', e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                    >
                      {DESCRIPTION_FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-toolbar]:bg-gray-50/70 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[80px] [&_.ql-editor]:text-xs [&_.ql-editor]:leading-relaxed">
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={(val) => handleSectionChange('description', val)}
                    modules={subtitleQuillModules}
                    formats={subtitleQuillFormats}
                    placeholder="From technical development to digital reach and operations..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Cards Management */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Service Cards ({formData.services.length})</span>
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Control every title, subtitle, icon, number tag, and pill tags for each service.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-blue-200 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service Card</span>
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
              {formData.services.map((card, index) => {
                const IconComp = getIconComponent(card.icon);
                const isSelectedForPreview = previewCardIndex === index;
                const cardKey = card.id || `service-${index}`;

                return (
                  <div
                    key={card.id || index}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isSelectedForPreview
                        ? 'border-blue-400 bg-blue-50/10 shadow-sm ring-1 ring-blue-400/30'
                        : 'border-gray-200/80 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Card Header Toolbar */}
                    <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-xs">
                          {card.number || `${index + 1}`.padStart(2, '0')}
                        </span>
                        <IconComp className="w-4 h-4 text-cyan-600" />
                        <span className="font-bold text-slate-800 text-xs truncate max-w-[200px]">
                          {card.title || 'Untitled Service'}
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200/60 px-2 py-0.5 rounded-md font-mono">
                          {card.tags?.length || 0} tags
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Preview Selector */}
                        <button
                          type="button"
                          onClick={() => setPreviewCardIndex(index)}
                          className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                            isSelectedForPreview
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 hover:bg-gray-200'
                          }`}
                          title="Preview this card in live panel"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">Preview</span>
                        </button>

                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveCard(index, 'up')}
                          className="p-1.5 text-gray-500 hover:text-slate-800 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={index === formData.services.length - 1}
                          onClick={() => handleMoveCard(index, 'down')}
                          className="p-1.5 text-gray-500 hover:text-slate-800 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate */}
                        <button
                          type="button"
                          onClick={() => handleDuplicateCard(index)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Duplicate card"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteCard(index)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body Form */}
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Number Identifier */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500">
                            Service Number
                          </label>
                          <input
                            type="text"
                            value={card.number}
                            onChange={(e) => handleCardChange(index, 'number', e.target.value)}
                            placeholder="01"
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono font-bold bg-gray-50/40"
                          />
                        </div>

                        {/* Icon Picker */}
                        <div className="sm:col-span-5 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                            <span>Service Icon</span>
                            <IconComp className="w-3.5 h-3.5 text-cyan-600" />
                          </label>
                          <select
                            value={card.icon}
                            onChange={(e) => handleCardChange(index, 'icon', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Accent Gradient */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                            <Palette className="w-3 h-3 text-purple-500" />
                            <span>Card Accent</span>
                          </label>
                          <select
                            value={card.accentGradient || 'from-cyan-500 to-blue-600'}
                            onChange={(e) => handleCardChange(index, 'accentGradient', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                          >
                            {ACCENT_GRADIENT_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Card Title (Rich Text) & Title Size */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-700 flex items-center gap-1.5">
                            <span>Service Title</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text</span>
                          </label>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={card.titleFontSize || '1.5rem'}
                              onChange={(e) => handleCardChange(index, 'titleFontSize', e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                            >
                              {CARD_TITLE_FONT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-toolbar]:bg-gray-50/70 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[44px] [&_.ql-editor]:text-xs [&_.ql-editor]:py-2">
                          <ReactQuill
                            theme="snow"
                            value={card.title}
                            onChange={(val) => handleCardChange(index, 'title', val)}
                            modules={titleQuillModules}
                            formats={titleQuillFormats}
                            placeholder="e.g. Software Development"
                          />
                        </div>
                      </div>

                      {/* Service Subtitle / Description (Rich Text) & Title Size */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <span>Service Subtitle / Description</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={card.descriptionFontSize || '0.875rem'}
                              onChange={(e) => handleCardChange(index, 'descriptionFontSize', e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                            >
                              {CARD_DESC_FONT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-toolbar]:bg-gray-50/70 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[75px] [&_.ql-editor]:text-xs [&_.ql-editor]:leading-relaxed">
                          <ReactQuill
                            theme="snow"
                            value={card.description}
                            onChange={(val) => handleCardChange(index, 'description', val)}
                            modules={subtitleQuillModules}
                            formats={subtitleQuillFormats}
                            placeholder="Describe this service offering..."
                          />
                        </div>
                      </div>

                      {/* Pill Tags (Highlights) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-cyan-500" />
                            <span>Pill Tags (Highlights)</span>
                          </label>
                          <span className="text-[10px] text-gray-400">Press Enter or click + to add tags</span>
                        </div>

                        {/* Existing tags container */}
                        <div className="flex flex-wrap gap-1.5 items-center min-h-[36px] p-2 bg-gray-50/70 rounded-xl border border-gray-200/80">
                          {(Array.isArray(card.tags) ? card.tags : []).map((tag, tagIdx) => (
                            <span
                              key={`${tag}-${tagIdx}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-cyan-50 text-cyan-800 border border-cyan-200/80 shadow-xs transition-all hover:bg-cyan-100"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveTag(index, tagIdx);
                                }}
                                className="text-cyan-500 hover:text-red-500 hover:bg-white rounded-full p-0.5 transition-colors"
                                title="Remove tag"
                              >
                                &times;
                              </button>
                            </span>
                          ))}

                          {/* Add tag inline field */}
                          <div className="flex items-center gap-1.5 ml-1">
                            <input
                              type="text"
                              value={newTagInputs[cardKey] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNewTagInputs((prev) => ({
                                  ...prev,
                                  [cardKey]: val,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddTag(index);
                                }
                              }}
                              placeholder="Add tag..."
                              className="px-3 py-1 text-xs border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 w-32 bg-white"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddTag(index);
                              }}
                              className="p-1 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white transition-all shadow-xs flex items-center justify-center cursor-pointer"
                              title="Add tag"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Website Preview (Sticky) */}
        <div className="xl:col-span-5">
          <div className="sticky top-20 bg-[#060811] border border-blue-950/60 rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-6 overflow-hidden relative">
            {/* Ambient preview glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Preview Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-wide uppercase text-gray-300">
                  Live Website Preview
                </span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Matches Website
              </span>
            </div>

            {/* Section Header Preview */}
            <div className="text-center space-y-3 relative z-10 pt-2">
              {/* Badge */}
              <div
                style={formData.badgeFontSize ? { fontSize: formData.badgeFontSize } : undefined}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
              >
                <BadgeIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {isHtml(formData.badgeText) ? (
                  <span
                    className="font-semibold tracking-widest text-cyan-400 uppercase [&_p]:inline [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: formData.badgeText }}
                  />
                ) : (
                  <span className="font-semibold tracking-widest text-cyan-400 uppercase">
                    {formData.badgeText || 'What We Deliver'}
                  </span>
                )}
              </div>

              {/* Main Heading */}
              <h3
                style={formData.headingFontSize ? { fontSize: formData.headingFontSize } : undefined}
                className="font-bold text-white tracking-tight leading-tight"
              >
                {isHtml(formData.headingPrefix) ? (
                  <span
                    className="[&_p]:inline [&_p]:m-0 [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: formData.headingPrefix }}
                  />
                ) : (
                  formData.headingPrefix
                )}
                {formData.headingHighlight ? (
                  <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent ml-1.5">
                    {formData.headingHighlight}
                  </span>
                ) : null}
              </h3>

              {/* Subtitle */}
              {isHtml(formData.description) ? (
                <div
                  style={formData.descriptionFontSize ? { fontSize: formData.descriptionFontSize } : undefined}
                  className="text-gray-400 leading-relaxed max-w-md mx-auto [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              ) : (
                <p
                  style={formData.descriptionFontSize ? { fontSize: formData.descriptionFontSize } : undefined}
                  className="text-gray-400 leading-relaxed max-w-md mx-auto"
                >
                  {formData.description}
                </p>
              )}
            </div>

            {/* Service Stepper Switcher */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 relative z-10">
              {formData.services.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPreviewCardIndex(i)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${
                    previewCardIndex === i
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30 ring-1 ring-cyan-400'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Card {c.number || `${i + 1}`.padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Active Card Replica Preview */}
            {activePreviewCard && (
              <div className="group relative rounded-2xl border border-white/10 bg-[#091021]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 shadow-[0_10px_30px_rgba(0,85,255,0.12)] flex flex-col justify-between relative overflow-hidden">
                {/* Accent top gradient indicator */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    activePreviewCard.accentGradient || 'from-cyan-500 to-blue-600'
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 shadow-sm">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {activePreviewCard.number || '01'}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 text-cyan-400" />
                  </div>

                  {/* Title */}
                  <div className="mb-3">
                    {isHtml(activePreviewCard.title) ? (
                      <div
                        style={activePreviewCard.titleFontSize ? { fontSize: activePreviewCard.titleFontSize } : undefined}
                        className="font-bold text-white [&_p]:m-0 leading-tight"
                        dangerouslySetInnerHTML={{ __html: activePreviewCard.title }}
                      />
                    ) : (
                      <h4
                        style={activePreviewCard.titleFontSize ? { fontSize: activePreviewCard.titleFontSize } : undefined}
                        className="font-bold text-white leading-tight"
                      >
                        {activePreviewCard.title || 'Service Title'}
                      </h4>
                    )}
                  </div>

                  {/* Description */}
                  {isHtml(activePreviewCard.description) ? (
                    <div
                      style={activePreviewCard.descriptionFontSize ? { fontSize: activePreviewCard.descriptionFontSize } : undefined}
                      className="text-gray-400 leading-relaxed mb-6 font-normal [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                      dangerouslySetInnerHTML={{ __html: activePreviewCard.description }}
                    />
                  ) : (
                    <p
                      style={activePreviewCard.descriptionFontSize ? { fontSize: activePreviewCard.descriptionFontSize } : undefined}
                      className="text-gray-400 leading-relaxed mb-6 font-normal"
                    >
                      {activePreviewCard.description}
                    </p>
                  )}
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {(Array.isArray(activePreviewCard.tags) ? activePreviewCard.tags : []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
