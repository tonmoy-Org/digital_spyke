'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Sliders,
  Boxes,
  Workflow,
  Target,
  Briefcase,
  MessageSquareQuote,
  Send,
  Upload,
  Eye,
  Settings,
  Star,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  X,
  Code2,
  Compass,
  Rocket,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Grid,
  Laptop,
  Database,
  Search,
  Palette,
  Lightbulb,
  SlidersHorizontal,
  BarChart3,
  FileText,
  FileCheck2,
  LineChart,
  HeartHandshake,
  Lock,
  Server,
  Terminal,
} from 'lucide-react';
import {
  FullServicePageConfig,
  DEFAULT_PRIMARY_SERVICE,
  PortfolioProductItem,
  ServiceFaqItem,
  ServiceTestimonial,
} from '@/types/services';
import { DEFAULT_PORTFOLIO_PRODUCTS } from '@/components/sections/ServicePageRenderer';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-28 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

export const FONT_SIZE_OPTIONS = [
  { label: '0.75rem (12px)', value: '0.75rem' },
  { label: '0.875rem (14px)', value: '0.875rem' },
  { label: '1rem (16px)', value: '1rem' },
  { label: '1.125rem (18px)', value: '1.125rem' },
  { label: '1.25rem (20px)', value: '1.25rem' },
  { label: '1.5rem (24px)', value: '1.5rem' },
  { label: '1.875rem (30px)', value: '1.875rem' },
  { label: '2.25rem (36px)', value: '2.25rem' },
  { label: '2.5rem (40px)', value: '2.5rem' },
  { label: '3rem (48px)', value: '3rem' },
  { label: '3.75rem (60px)', value: '3.75rem' },
  { label: '4rem (64px)', value: '4rem' },
  { label: '4.5rem (72px)', value: '4.5rem' },
  { label: '6rem (96px)', value: '6rem' },
];

export const POPULAR_ICONS = [
  'Compass', 'Target', 'Rocket', 'LayoutDashboard', 'TrendingUp',
  'Workflow', 'Boxes', 'Award', 'HeartHandshake', 'Zap',
  'Shield', 'ShieldCheck', 'Sparkles', 'Code2', 'Cpu',
  'FileText', 'FileCheck2', 'LineChart', 'BarChart3', 'SlidersHorizontal',
  'Palette', 'Lightbulb', 'Send', 'ExternalLink', 'Globe',
  'Smartphone', 'Laptop', 'Database', 'Cloud', 'Layers',
  'Briefcase', 'Star', 'Search', 'CheckCircle2'
];

const quillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};

function moveItem<T>(list: T[], index: number, direction: 'up' | 'down'): T[] {
  const targetIdx = direction === 'up' ? index - 1 : index + 1;
  if (targetIdx < 0 || targetIdx >= list.length) return list;
  const copy = [...list];
  const temp = copy[index];
  copy[index] = copy[targetIdx];
  copy[targetIdx] = temp;
  return copy;
}



const DASHBOARD_ICON_MAP: Record<string, React.ElementType> = {
  compass: Compass,
  target: Target,
  rocket: Rocket,
  workflow: Workflow,
  boxes: Boxes,
  zap: Zap,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
  sparkles: Sparkles,
  code: Code2,
  code2: Code2,
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

function renderDashboardIcon(iconNameOrEmoji: string | undefined, defaultIcon: React.ElementType = Compass) {
  if (!iconNameOrEmoji) {
    const Fallback = defaultIcon;
    return <Fallback className="w-5 h-5 text-blue-400" />;
  }
  if (/[^\u0000-\u007F]/.test(iconNameOrEmoji)) {
    return <span className="text-xl">{iconNameOrEmoji}</span>;
  }
  const key = iconNameOrEmoji.toLowerCase().replace(/[^a-z0-9]/g, '');
  const IconComp = DASHBOARD_ICON_MAP[key] || defaultIcon;
  return <IconComp className="w-5 h-5 text-blue-400" />;
}

function SectionLivePreviewWrapper({
  title,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {title}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#070d1d] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function RichFieldEditor({
  label,
  value = '',
  htmlValue = '',
  onChange,
  fontSize,
  onFontSizeChange,
  placeholder,
  multiline = false,
  tag = false,
}: {
  label: string;
  value?: string;
  htmlValue?: string;
  onChange: (plain: string, html: string) => void;
  fontSize?: string;
  onFontSizeChange?: (size: string) => void;
  placeholder?: string;
  multiline?: boolean;
  tag?: boolean;
}) {
  const [useRich, setUseRich] = useState(Boolean(htmlValue && htmlValue.includes('<')));

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {onFontSizeChange && (
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500">Size:</span>
              <select
                value={fontSize || (tag ? '0.75rem' : multiline ? '1rem' : '1.5rem')}
                onChange={(e) => onFontSizeChange(e.target.value)}
                className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
              >
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="button"
            onClick={() => setUseRich(!useRich)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
              useRich
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {useRich ? 'Rich Editor' : 'Plain Text'}
          </button>
        </div>
      </div>

      {useRich ? (
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
          <ReactQuill
            theme="snow"
            value={htmlValue || value}
            onChange={(content) => {
              const plain = content.replace(/<[^>]*>?/gm, '');
              onChange(plain, content);
            }}
            modules={quillModules}
            placeholder={placeholder}
          />
        </div>
      ) : multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value, `<p>${e.target.value}</p>`)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
        />
      )}
    </div>
  );
}

interface ExistingServicesAdminPageProps {
  isCreateMode?: boolean;
}

export default function ExistingServicesAdminPage({ isCreateMode: propIsCreateMode = false }: ExistingServicesAdminPageProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams?.get('id');
  const isCreateMode = propIsCreateMode || searchParams?.get('new') === 'true';

  const [services, setServices] = useState<FullServicePageConfig[]>([]);
  const [formData, setFormData] = useState<FullServicePageConfig>(DEFAULT_PRIMARY_SERVICE);
  const [initialData, setInitialData] = useState<FullServicePageConfig>(DEFAULT_PRIMARY_SERVICE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'general' | 'hero' | 'offerings' | 'process' | 'strengths' | 'portfolio' | 'faq' | 'testimonials' | 'leadgen'
  >('general');
  const [newHeroImageUrl, setNewHeroImageUrl] = useState('');
  const [newInquiryInput, setNewInquiryInput] = useState('');

  const hasChanges = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData]
  );

  // Load services and set selected service from query param
  const loadServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/services');
      const json = await res.json();
      const loadedServices: FullServicePageConfig[] = json.success && Array.isArray(json.services) ? json.services : [];
      setServices(loadedServices);

      if (isCreateMode) {
        // Initialize with pristine copy of DEFAULT_PRIMARY_SERVICE adapted for a new service
        const fresh: FullServicePageConfig = {
          ...JSON.parse(JSON.stringify(DEFAULT_PRIMARY_SERVICE)),
          id: '',
          navTitle: '',
          pageTitle: 'New Service | Digital Spyke',
          slug: '',
          isPrimary: false,
          isActive: true,
          portfolioSection: {
            ...DEFAULT_PRIMARY_SERVICE.portfolioSection,
            products: DEFAULT_PORTFOLIO_PRODUCTS,
          },
          faqSection: {
            ...DEFAULT_PRIMARY_SERVICE.faqSection,
            faqs: DEFAULT_PRIMARY_SERVICE.faqSection?.faqs || [],
          },
          testimonialsSection: {
            ...DEFAULT_PRIMARY_SERVICE.testimonialsSection,
            testimonials: DEFAULT_PRIMARY_SERVICE.testimonialsSection?.testimonials || [],
          },
        };
        setFormData(fresh);
        setInitialData(JSON.parse(JSON.stringify(fresh)));
        return;
      }

      if (loadedServices.length > 0) {
        let target: FullServicePageConfig | undefined;
        if (queryId) {
          target = loadedServices.find((s: FullServicePageConfig) => s.id === queryId);
        }
        if (!target) {
          target = loadedServices.find((s: FullServicePageConfig) => s.isPrimary) || loadedServices[0];
        }

        const selected = target || DEFAULT_PRIMARY_SERVICE;

        // Ensure products and faqs exist if not present on older saved versions
        const normalized: FullServicePageConfig = {
          ...DEFAULT_PRIMARY_SERVICE,
          ...selected,
          portfolioSection: {
            ...DEFAULT_PRIMARY_SERVICE.portfolioSection,
            ...(selected.portfolioSection || {}),
            products:
              selected.portfolioSection?.products && selected.portfolioSection.products.length > 0
                ? selected.portfolioSection.products
                : DEFAULT_PORTFOLIO_PRODUCTS,
          },
          faqSection: {
            ...DEFAULT_PRIMARY_SERVICE.faqSection,
            ...(selected.faqSection || {}),
            faqs:
              selected.faqSection?.faqs && selected.faqSection.faqs.length > 0
                ? selected.faqSection.faqs
                : DEFAULT_PRIMARY_SERVICE.faqSection.faqs,
          },
          testimonialsSection: {
            ...DEFAULT_PRIMARY_SERVICE.testimonialsSection,
            ...(selected.testimonialsSection || {}),
            testimonials:
              selected.testimonialsSection?.testimonials && selected.testimonialsSection.testimonials.length > 0
                ? selected.testimonialsSection.testimonials
                : DEFAULT_PRIMARY_SERVICE.testimonialsSection.testimonials,
          },
        };

        setFormData(normalized);
        setInitialData(JSON.parse(JSON.stringify(normalized)));
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  }, [queryId, isCreateMode]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Save or Create changes
  const handleSave = async () => {
    if (isCreateMode) {
      if (!formData.navTitle?.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Service Name Required',
          text: 'Please enter a navigation name for the new service.',
        });
        return;
      }

      try {
        setIsSaving(true);
        const generatedSlug =
          formData.slug?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
          formData.navTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

        const payload: Partial<FullServicePageConfig> = {
          ...formData,
          navTitle: formData.navTitle.trim(),
          slug: generatedSlug,
          pageTitle: formData.pageTitle?.trim() || `${formData.navTitle.trim()} | Digital Spyke`,
          isActive: formData.isActive !== false,
          isPrimary: false,
        };
        delete (payload as any).id;
        delete (payload as any)._id;

        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();

        if (json.success && json.service) {
          await Swal.fire({
            icon: 'success',
            title: 'Service Created & Published!',
            text: `"${json.service.navTitle}" has been added and published to the frontend navbar.`,
            timer: 2000,
            showConfirmButton: false,
          });

          router.push(`/dashboard/services?id=${json.service.id}`);
          router.refresh();
        } else {
          throw new Error(json.message || 'Failed to create service.');
        }
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Creation Failed',
          text: err.message || 'An error occurred while creating service.',
        });
      } finally {
        setIsSaving(false);
      }
      return;
    }

    // Existing edit flow
    try {
      setIsSaving(true);
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (json.success && json.service) {
        setInitialData(JSON.parse(JSON.stringify(formData)));

        setServices((prev) =>
          prev.map((s) => (s.id === json.service.id ? json.service : (json.service.isPrimary ? { ...s, isPrimary: false } : s)))
        );

        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: `"${formData.navTitle}" updated successfully.`,
          timer: 1600,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });

        router.refresh();
      } else {
        throw new Error(json.message || 'Failed to save changes.');
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.message || 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Revert changes
  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(initialData)));
  };

  // Upload file helper
  const handleGenericUpload = async (file: File, onUploaded: (url: string) => void) => {
    try {
      setIsUploading(true);
      const uploadForm = new FormData();
      uploadForm.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: uploadForm });
      const data = await res.json();

      const publicUrl = data.url || data.fileUrl;
      if (data.success && publicUrl) {
        onUploaded(publicUrl);
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded',
          timer: 1200,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Upload Failed', text: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center min-h-[450px]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 text-sm font-semibold">Loading Service Administration...</p>
      </div>
    );
  }

  const liveHref = isCreateMode
    ? `/services/${formData.slug || 'preview'}`
    : formData.isPrimary
    ? '/services'
    : `/services/${formData.slug}`;

  const tabsConfig = [
    { id: 'general', label: '1. Navigation & Header', icon: Settings, enabled: true },
    { id: 'hero', label: '2. Hero Banner', icon: Sliders, enabled: formData.heroSection?.enabled },
    { id: 'offerings', label: '3. Core Offerings', icon: Boxes, enabled: formData.subServicesSection?.enabled },
    { id: 'process', label: '4. Work Process', icon: Workflow, enabled: formData.workProcessSection?.enabled },
    { id: 'strengths', label: '5. Why Choose Us', icon: Target, enabled: formData.whyChooseUsSection?.enabled },
    { id: 'portfolio', label: '6. Portfolio Showcase', icon: Briefcase, enabled: formData.portfolioSection?.enabled },
    { id: 'faq', label: '7. FAQ Section', icon: HelpCircle, enabled: formData.faqSection?.enabled },
    { id: 'testimonials', label: '8. Testimonials', icon: MessageSquareQuote, enabled: formData.testimonialsSection?.enabled },
    { id: 'leadgen', label: '9. Lead Generation', icon: Send, enabled: formData.leadGenSection?.enabled },
  ] as const;

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans pb-28 text-slate-800">
      {/* ─────────────────────────────────────────────────────────────
          TOP CONTROL BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            {isCreateMode ? <Plus className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isCreateMode
                ? formData.navTitle?.trim()
                  ? `Add New Service: ${formData.navTitle}`
                  : 'Add New Service'
                : formData.navTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {isCreateMode && (
            <Link
              href="/dashboard/services"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </Link>
          )}

          {!isCreateMode && services.length > 1 && (
            <select
              value={formData.id}
              onChange={(e) => {
                const target = services.find((s) => s.id === e.target.value);
                if (target) {
                  router.push(`/dashboard/services?id=${target.id}`);
                }
              }}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.navTitle} {s.isPrimary ? '(Primary)' : ''}
                </option>
              ))}
            </select>
          )}

          {!isCreateMode && (
            <Link
              href="/dashboard/services/add"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm"
              title="Add a new service page"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Service</span>
            </Link>
          )}

          {!isCreateMode && (
            <Link
              href={liveHref}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live</span>
            </Link>
          )}

          {!isCreateMode && hasChanges && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving || (isCreateMode && !formData.navTitle?.trim())}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isCreateMode ? <Sparkles className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>
              {isSaving
                ? isCreateMode
                  ? 'Creating & Publishing...'
                  : 'Saving Changes...'
                : isCreateMode
                ? 'Create & Publish Service'
                : 'Save Changes'}
            </span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION TABS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50 border border-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id !== 'general' && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      tab.enabled
                        ? isActive
                          ? 'bg-white'
                          : 'bg-emerald-500'
                        : isActive
                        ? 'bg-blue-300'
                        : 'bg-slate-300'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: NAVIGATION & HEADER
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'general' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Service Page Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Navigation Title {isCreateMode && <span className="text-blue-600">*</span>}
              </label>
              <input
                type="text"
                value={formData.navTitle}
                placeholder={isCreateMode ? 'e.g. Mobile App Development' : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (isCreateMode) {
                    const autoSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
                    setFormData((prev) => ({
                      ...prev,
                      navTitle: val,
                      slug: autoSlug,
                      pageTitle: val ? `${val} | Digital Spyke` : prev.pageTitle,
                      heroSection: {
                        ...prev.heroSection,
                        headline: val ? `Architecting Scalable ${val}` : prev.heroSection.headline,
                        headlineHtml: val
                          ? `Architecting Scalable <span class="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">${val}</span>`
                          : prev.heroSection.headlineHtml,
                      },
                      subServicesSection: {
                        ...prev.subServicesSection,
                        tag: val ? `OUR ${val.toUpperCase()} CAPABILITIES` : prev.subServicesSection.tag,
                      },
                    }));
                  } else {
                    setFormData({ ...formData, navTitle: val });
                  }
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                URL Slug {isCreateMode && <span className="text-blue-600">*</span>}
              </label>
              <div className="flex items-center">
                <span className="px-3.5 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                  /services/
                </span>
                <input
                  type="text"
                  disabled={!isCreateMode && formData.isPrimary}
                  value={formData.slug}
                  placeholder={isCreateMode ? 'e.g. mobile-app-development' : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    })
                  }
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none font-mono disabled:bg-slate-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Browser Page Title (SEO & Tab Name)
              </label>
              <input
                type="text"
                value={formData.pageTitle}
                onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800">Active (Visible in Frontend Navbar)</span>
              </label>
            </div>
          </div>

          {/* Header Brand Bar Controls */}
          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Header Bar</h3>
                <p className="text-xs text-slate-400">Manage the brand banner and call-to-action button.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.headerSection?.enabled !== false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      headerSection: {
                        ...(formData.headerSection || { brandName: 'Digital Spyke', primaryCta: { text: 'Start a Project', href: '/book-meeting' } }),
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-xs font-semibold text-slate-700">Enabled</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-600">Brand Name</label>
                  <select
                    value={formData.headerSection?.brandNameFontSize || '1.125rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        headerSection: { ...formData.headerSection, brandNameFontSize: e.target.value },
                      })
                    }
                    className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-semibold"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={formData.headerSection?.brandName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      headerSection: { ...formData.headerSection, brandName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-600">Header Button Text</label>
                  <select
                    value={formData.headerSection?.primaryCta?.fontSize || '0.875rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        headerSection: {
                          ...formData.headerSection,
                          primaryCta: { ...formData.headerSection.primaryCta, fontSize: e.target.value },
                        },
                      })
                    }
                    className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-semibold"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={formData.headerSection?.primaryCta?.text || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      headerSection: {
                        ...formData.headerSection,
                        primaryCta: { ...formData.headerSection.primaryCta, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Header Button Link</label>
                <input
                  type="text"
                  value={formData.headerSection?.primaryCta?.href || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      headerSection: {
                        ...formData.headerSection,
                        primaryCta: { ...formData.headerSection.primaryCta, href: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Header & Navigation Identity Live Preview"
            subtitle="Real-time rendering of your brand bar, live navbar status, and direct conversion button"
          >
            <div className="bg-[#0b132b]/90 border border-slate-700/60 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-blue-500/30 tracking-wider">
                  DS
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-extrabold text-white tracking-tight leading-none"
                    style={{ fontSize: formData.headerSection?.brandNameFontSize || '1.125rem' }}
                  >
                    {formData.headerSection?.brandName || 'Digital Spyke'}
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono mt-0.5">{liveHref}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">Active Service:</span>
                  <span className="text-white font-bold">{formData.navTitle || 'Web Development'}</span>
                </div>

                {formData.headerSection?.enabled !== false && (
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(29,78,216,0.6)] cursor-default transition-all"
                    style={{ fontSize: formData.headerSection?.primaryCta?.fontSize || '0.875rem' }}
                  >
                    <span>{formData.headerSection?.primaryCta?.text || 'Start a Project'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'hero' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Hero Banner Configuration</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.heroSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroSection: { ...formData.heroSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          {/* Badge Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Badge Tag Text
              </label>
              <input
                type="text"
                value={formData.heroSection.badgeTag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroSection: { ...formData.heroSection, badgeTag: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Badge Font Size
              </label>
              <select
                value={formData.heroSection.badgeFontSize || '0.75rem'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    heroSection: { ...formData.heroSection, badgeFontSize: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                {FONT_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Hero Headline (Plain & Rich Formatted)
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold">Size:</span>
                <select
                  value={formData.heroSection.headlineFontSize || '4rem'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: { ...formData.heroSection, headlineFontSize: e.target.value },
                    })
                  }
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              value={formData.heroSection.headline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heroSection: { ...formData.heroSection, headline: e.target.value },
                })
              }
              placeholder="Plain text headline"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900"
            />
            <div className="pt-1">
              <ReactQuill
                theme="snow"
                value={formData.heroSection.headlineHtml || formData.heroSection.headline}
                onChange={(content) =>
                  setFormData({
                    ...formData,
                    heroSection: { ...formData.heroSection, headlineHtml: content },
                  })
                }
                modules={quillModules}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Hero Description
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 font-semibold">Size:</span>
                <select
                  value={formData.heroSection.descriptionFontSize || '1.125rem'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: { ...formData.heroSection, descriptionFontSize: e.target.value },
                    })
                  }
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                >
                  {FONT_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ReactQuill
              theme="snow"
              value={formData.heroSection.descriptionHtml || formData.heroSection.description}
              onChange={(content) =>
                setFormData({
                  ...formData,
                  heroSection: {
                    ...formData.heroSection,
                    descriptionHtml: content,
                    description: content.replace(/<[^>]*>?/gm, ''),
                  },
                })
              }
              modules={quillModules}
            />
          </div>

          {/* Slider Background Images */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Hero Parallax Slider Background Images
                </label>
                <p className="text-xs text-slate-400">High-resolution photography cycling in the background.</p>
              </div>
              <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleGenericUpload(file, (url) => {
                        setFormData((prev) => ({
                          ...prev,
                          heroSection: {
                            ...prev.heroSection,
                            sliderImages: [...prev.heroSection.sliderImages, url],
                          },
                        }));
                      });
                    }
                    e.target.value = '';
                  }}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formData.heroSection.sliderImages.map((imgUrl, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-32">
                  <Image src={imgUrl} alt={`Slider ${idx + 1}`} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          heroSection: {
                            ...prev.heroSection,
                            sliderImages: prev.heroSection.sliderImages.filter((_, i) => i !== idx),
                          },
                        }))
                      }
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newHeroImageUrl}
                onChange={(e) => setNewHeroImageUrl(e.target.value)}
                placeholder="Or paste external image URL (https://...)"
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newHeroImageUrl.trim()) return;
                  setFormData((prev) => ({
                    ...prev,
                    heroSection: {
                      ...prev.heroSection,
                      sliderImages: [...prev.heroSection.sliderImages, newHeroImageUrl.trim()],
                    },
                  }));
                  setNewHeroImageUrl('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Add Image URL
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Primary Call-to-Action</h3>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Button Text</label>
                <input
                  type="text"
                  value={formData.heroSection.primaryCta.text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: {
                        ...formData.heroSection,
                        primaryCta: { ...formData.heroSection.primaryCta, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Link (href / anchor)</label>
                <input
                  type="text"
                  value={formData.heroSection.primaryCta.href}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: {
                        ...formData.heroSection,
                        primaryCta: { ...formData.heroSection.primaryCta, href: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Secondary Button</h3>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.heroSection.secondaryCta.enabled}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        heroSection: {
                          ...formData.heroSection,
                          secondaryCta: { ...formData.heroSection.secondaryCta, enabled: e.target.checked },
                        },
                      })
                    }
                    className="w-3.5 h-3.5 text-blue-600 rounded"
                  />
                  <span className="text-[11px] font-semibold text-slate-600">Enabled</span>
                </label>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Button Text</label>
                <input
                  type="text"
                  value={formData.heroSection.secondaryCta.text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: {
                        ...formData.heroSection,
                        secondaryCta: { ...formData.heroSection.secondaryCta, text: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Link (href / anchor)</label>
                <input
                  type="text"
                  value={formData.heroSection.secondaryCta.href}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: {
                        ...formData.heroSection,
                        secondaryCta: { ...formData.heroSection.secondaryCta, href: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Hero Banner Live Preview"
            subtitle="Full visual preview with real-time typography scaling, CTA buttons, and background atmosphere"
          >
            <div className="relative rounded-2xl overflow-hidden min-h-[380px] flex items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-b from-[#0e172e] via-[#070d1d] to-[#040814] border border-blue-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                {formData.heroSection.badgeTag && (
                  <span
                    className="inline-block px-3.5 py-1 rounded-full border mb-4 font-mono font-bold tracking-wider uppercase"
                    style={{
                      fontSize: formData.heroSection.badgeFontSize || '0.75rem',
                      color: formData.heroSection.badgeColor || '#3BA2F9',
                      backgroundColor: formData.heroSection.badgeBgColor || 'rgba(59, 162, 249, 0.1)',
                      borderColor: 'rgba(59, 162, 249, 0.3)',
                    }}
                  >
                    {formData.heroSection.badgeTag}
                  </span>
                )}

                <h1
                  className="font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-lg"
                  style={{ fontSize: formData.heroSection.headlineFontSize || '3rem' }}
                  dangerouslySetInnerHTML={{
                    __html: formData.heroSection.headlineHtml || formData.heroSection.headline,
                  }}
                />

                <div
                  className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6"
                  style={{ fontSize: formData.heroSection.descriptionFontSize || '1.125rem' }}
                  dangerouslySetInnerHTML={{
                    __html: formData.heroSection.descriptionHtml || formData.heroSection.description,
                  }}
                />

                <div className="flex items-center justify-center gap-3.5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-[#1D4ED8] shadow-[0_0_25px_rgba(29,78,216,0.6)] cursor-default text-xs sm:text-sm">
                    <span>{formData.heroSection.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>

                  {formData.heroSection.secondaryCta?.enabled && (
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-slate-200 bg-white/5 border border-white/20 hover:bg-white/10 cursor-default text-xs sm:text-sm backdrop-blur-sm">
                      <span>{formData.heroSection.secondaryCta.text}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: CORE OFFERINGS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'offerings' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Core Capabilities & Offerings</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.subServicesSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subServicesSection: { ...formData.subServicesSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tag / Subtitle</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.subServicesSection.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subServicesSection: { ...formData.subServicesSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.subServicesSection.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subServicesSection: { ...formData.subServicesSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Section Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.subServicesSection.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subServicesSection: { ...formData.subServicesSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.subServicesSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subServicesSection: { ...formData.subServicesSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Offerings Items ({formData.subServicesSection.services.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newItem = {
                    id: `srv-${Date.now()}`,
                    icon: 'Code2',
                    title: 'New Service Capability',
                    titleFontSize: '1.5rem',
                    description: 'Technical capability description...',
                    descriptionHtml: '<p>Technical capability description...</p>',
                    descriptionFontSize: '1rem',
                    features: ['Architecture Design', 'Cloud Integration'],
                  };
                  setFormData({
                    ...formData,
                    subServicesSection: {
                      ...formData.subServicesSection,
                      services: [...formData.subServicesSection.services, newItem],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Offering</span>
              </button>
            </div>

            {formData.subServicesSection.services.map((item, idx) => (
              <div key={item.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{item.title || 'Untitled Offering'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          subServicesSection: {
                            ...formData.subServicesSection,
                            services: moveItem(formData.subServicesSection.services, idx, 'up'),
                          },
                        })
                      }
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.subServicesSection.services.length - 1}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          subServicesSection: {
                            ...formData.subServicesSection,
                            services: moveItem(formData.subServicesSection.services, idx, 'down'),
                          },
                        })
                      }
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          subServicesSection: {
                            ...formData.subServicesSection,
                            services: formData.subServicesSection.services.filter((_, i) => i !== idx),
                          },
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                      title="Delete Offering"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">Title</label>
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400">Size:</span>
                        <select
                          value={item.titleFontSize || '1.5rem'}
                          onChange={(e) => {
                            const updated = [...formData.subServicesSection.services];
                            updated[idx].titleFontSize = e.target.value;
                            setFormData({
                              ...formData,
                              subServicesSection: { ...formData.subServicesSection, services: updated },
                            });
                          }}
                          className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                        >
                          {FONT_SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...formData.subServicesSection.services];
                        updated[idx].title = e.target.value;
                        setFormData({
                          ...formData,
                          subServicesSection: { ...formData.subServicesSection, services: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Icon Name or Emoji</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={item.icon || 'Code2'}
                        onChange={(e) => {
                          const updated = [...formData.subServicesSection.services];
                          updated[idx].icon = e.target.value;
                          setFormData({
                            ...formData,
                            subServicesSection: { ...formData.subServicesSection, services: updated },
                          });
                        }}
                        className="flex-1 px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      >
                        {POPULAR_ICONS.map((ic) => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => {
                          const updated = [...formData.subServicesSection.services];
                          updated[idx].icon = e.target.value;
                          setFormData({
                            ...formData,
                            subServicesSection: { ...formData.subServicesSection, services: updated },
                          });
                        }}
                        placeholder="Emoji"
                        className="w-12 text-center px-1 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600">Description</label>
                    <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-400">Size:</span>
                      <select
                        value={item.descriptionFontSize || '1rem'}
                        onChange={(e) => {
                          const updated = [...formData.subServicesSection.services];
                          updated[idx].descriptionFontSize = e.target.value;
                          setFormData({
                            ...formData,
                            subServicesSection: { ...formData.subServicesSection, services: updated },
                          });
                        }}
                        className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                      >
                        {FONT_SIZE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ReactQuill
                    theme="snow"
                    value={item.descriptionHtml || item.description}
                    onChange={(content) => {
                      const updated = [...formData.subServicesSection.services];
                      updated[idx].descriptionHtml = content;
                      updated[idx].description = content.replace(/<[^>]*>?/gm, '');
                      setFormData({
                        ...formData,
                        subServicesSection: { ...formData.subServicesSection, services: updated },
                      });
                    }}
                    modules={quillModules}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Feature Badges (comma separated tags)
                  </label>
                  <input
                    type="text"
                    value={item.features?.join(', ') || ''}
                    onChange={(e) => {
                      const updated = [...formData.subServicesSection.services];
                      updated[idx].features = e.target.value.split(',').map((f) => f.trim()).filter(Boolean);
                      setFormData({
                        ...formData,
                        subServicesSection: { ...formData.subServicesSection, services: updated },
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.features?.map((f, fIdx) => (
                      <span key={fIdx} className="px-2 py-0.5 rounded bg-blue-100/70 text-blue-700 text-[10px] font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Core Capabilities Live Preview"
            subtitle="Real-time rendering of capability cards, responsive icons, and feature badges"
          >
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                {formData.subServicesSection.tag && (
                  <span
                    className="inline-block px-3 py-0.5 rounded-full border font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 border-blue-500/20"
                    style={{ fontSize: formData.subServicesSection.tagFontSize || '0.75rem' }}
                  >
                    {formData.subServicesSection.tag}
                  </span>
                )}
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: formData.subServicesSection.headlineFontSize || '1.75rem' }}
                >
                  {formData.subServicesSection.headline}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {formData.subServicesSection.services.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="rounded-xl border border-slate-700/60 bg-[#0c152e]/80 p-5 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        {renderDashboardIcon(item.icon)}
                      </div>
                      <span className="font-mono text-xs font-bold text-blue-400/60">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h4
                      className="font-bold text-white tracking-tight"
                      style={{ fontSize: item.titleFontSize || '1.25rem' }}
                    >
                      {item.title}
                    </h4>

                    <div
                      className="text-slate-300 leading-relaxed text-xs"
                      style={{ fontSize: item.descriptionFontSize || '0.875rem' }}
                      dangerouslySetInnerHTML={{
                        __html: item.descriptionHtml || item.description,
                      }}
                    />

                    {item.features && item.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.features.map((f, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: WORK PROCESS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'process' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Work Process (Horizontal Scroll Lifecycle)</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.workProcessSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workProcessSection: { ...formData.workProcessSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tag / Category</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.workProcessSection.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workProcessSection: { ...formData.workProcessSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.workProcessSection.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workProcessSection: { ...formData.workProcessSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.workProcessSection.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workProcessSection: { ...formData.workProcessSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.workProcessSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workProcessSection: { ...formData.workProcessSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Process Phases ({formData.workProcessSection.steps.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newStep = {
                    id: `step-${Date.now()}`,
                    stepNumber: String(formData.workProcessSection.steps.length + 1).padStart(2, '0'),
                    shortTitle: 'Phase Name',
                    title: 'Full Engineering Phase Title',
                    titleFontSize: '1.25rem',
                    icon: 'Rocket',
                    description: 'Detailed explanation of this engineering phase...',
                    descriptionHtml: '<p>Detailed explanation of this engineering phase...</p>',
                    deliverables: ['Deliverable 1', 'Deliverable 2'],
                  };
                  setFormData({
                    ...formData,
                    workProcessSection: {
                      ...formData.workProcessSection,
                      steps: [...formData.workProcessSection.steps, newStep],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>

            {formData.workProcessSection.steps.map((step, idx) => (
              <div key={step.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold">
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{step.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          workProcessSection: {
                            ...formData.workProcessSection,
                            steps: moveItem(formData.workProcessSection.steps, idx, 'up'),
                          },
                        })
                      }
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.workProcessSection.steps.length - 1}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          workProcessSection: {
                            ...formData.workProcessSection,
                            steps: moveItem(formData.workProcessSection.steps, idx, 'down'),
                          },
                        })
                      }
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          workProcessSection: {
                            ...formData.workProcessSection,
                            steps: formData.workProcessSection.steps.filter((_, i) => i !== idx),
                          },
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                      title="Delete Step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Step Number</label>
                    <input
                      type="text"
                      value={step.stepNumber}
                      onChange={(e) => {
                        const updated = [...formData.workProcessSection.steps];
                        updated[idx].stepNumber = e.target.value;
                        setFormData({
                          ...formData,
                          workProcessSection: { ...formData.workProcessSection, steps: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Short Title</label>
                    <input
                      type="text"
                      value={step.shortTitle}
                      onChange={(e) => {
                        const updated = [...formData.workProcessSection.steps];
                        updated[idx].shortTitle = e.target.value;
                        setFormData({
                          ...formData,
                          workProcessSection: { ...formData.workProcessSection, steps: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">Full Title</label>
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400">Size:</span>
                        <select
                          value={step.titleFontSize || '1.25rem'}
                          onChange={(e) => {
                            const updated = [...formData.workProcessSection.steps];
                            updated[idx].titleFontSize = e.target.value;
                            setFormData({
                              ...formData,
                              workProcessSection: { ...formData.workProcessSection, steps: updated },
                            });
                          }}
                          className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                        >
                          {FONT_SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...formData.workProcessSection.steps];
                        updated[idx].title = e.target.value;
                        setFormData({
                          ...formData,
                          workProcessSection: { ...formData.workProcessSection, steps: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Icon</label>
                    <select
                      value={step.icon || 'Compass'}
                      onChange={(e) => {
                        const updated = [...formData.workProcessSection.steps];
                        updated[idx].icon = e.target.value;
                        setFormData({
                          ...formData,
                          workProcessSection: { ...formData.workProcessSection, steps: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    >
                      {POPULAR_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600">Description</label>
                    <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-400">Size:</span>
                      <select
                        value={step.descriptionFontSize || '1rem'}
                        onChange={(e) => {
                          const updated = [...formData.workProcessSection.steps];
                          updated[idx].descriptionFontSize = e.target.value;
                          setFormData({
                            ...formData,
                            workProcessSection: { ...formData.workProcessSection, steps: updated },
                          });
                        }}
                        className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                      >
                        {FONT_SIZE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ReactQuill
                    theme="snow"
                    value={step.descriptionHtml || step.description}
                    onChange={(content) => {
                      const updated = [...formData.workProcessSection.steps];
                      updated[idx].descriptionHtml = content;
                      updated[idx].description = content.replace(/<[^>]*>?/gm, '');
                      setFormData({
                        ...formData,
                        workProcessSection: { ...formData.workProcessSection, steps: updated },
                      });
                    }}
                    modules={quillModules}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Key Deliverables (comma separated)</label>
                  <input
                    type="text"
                    value={step.deliverables?.join(', ') || ''}
                    onChange={(e) => {
                      const updated = [...formData.workProcessSection.steps];
                      updated[idx].deliverables = e.target.value.split(',').map((d) => d.trim()).filter(Boolean);
                      setFormData({
                        ...formData,
                        workProcessSection: { ...formData.workProcessSection, steps: updated },
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {step.deliverables?.map((d, dIdx) => (
                      <span key={dIdx} className="px-2 py-0.5 rounded bg-cyan-100/70 text-cyan-800 text-[10px] font-semibold">
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Work Process Lifecycle Live Preview"
            subtitle="Real-time rendering of engineering steps with phase counters, icons, and deliverable badges"
          >
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                {formData.workProcessSection.tag && (
                  <span
                    className="inline-block px-3 py-0.5 rounded-full border font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 border-blue-500/20"
                    style={{ fontSize: formData.workProcessSection.tagFontSize || '0.75rem' }}
                  >
                    {formData.workProcessSection.tag}
                  </span>
                )}
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: formData.workProcessSection.headlineFontSize || '1.75rem' }}
                >
                  {formData.workProcessSection.headline}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {formData.workProcessSection.steps.map((step, idx) => (
                  <div
                    key={step.id || idx}
                    className="rounded-xl border border-slate-700/60 bg-[#0c152e]/80 p-5 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold shadow-md shadow-blue-500/20">
                        STEP {step.stepNumber || String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        {renderDashboardIcon(step.icon)}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                        {step.shortTitle}
                      </span>
                      <h4
                        className="font-bold text-white tracking-tight leading-snug"
                        style={{ fontSize: step.titleFontSize || '1.125rem' }}
                      >
                        {step.title}
                      </h4>
                    </div>

                    <div
                      className="text-slate-300 leading-relaxed text-xs"
                      style={{ fontSize: step.descriptionFontSize || '0.875rem' }}
                      dangerouslySetInnerHTML={{
                        __html: step.descriptionHtml || step.description,
                      }}
                    />

                    {step.deliverables && step.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/40">
                        {step.deliverables.map((d, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: WHY CHOOSE US
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'strengths' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Why Choose Us (Strengths & Differentiators)</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.whyChooseUsSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whyChooseUsSection: { ...formData.whyChooseUsSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tag / Category</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.whyChooseUsSection.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whyChooseUsSection: { ...formData.whyChooseUsSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.whyChooseUsSection.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whyChooseUsSection: { ...formData.whyChooseUsSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.whyChooseUsSection.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whyChooseUsSection: { ...formData.whyChooseUsSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.whyChooseUsSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whyChooseUsSection: { ...formData.whyChooseUsSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Strengths Cards ({formData.whyChooseUsSection.features.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newFeat = {
                    id: `feat-${Date.now()}`,
                    icon: 'Zap',
                    title: 'New Strength Feature',
                    titleFontSize: '1.375rem',
                    description: 'Strength description explaining client benefits...',
                    descriptionHtml: '<p>Strength description explaining client benefits...</p>',
                    descriptionFontSize: '0.9375rem',
                  };
                  setFormData({
                    ...formData,
                    whyChooseUsSection: {
                      ...formData.whyChooseUsSection,
                      features: [...formData.whyChooseUsSection.features, newFeat],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.whyChooseUsSection.features.map((feat, idx) => (
                <div key={feat.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs font-bold text-blue-600">Feature #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            whyChooseUsSection: {
                              ...formData.whyChooseUsSection,
                              features: moveItem(formData.whyChooseUsSection.features, idx, 'up'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.whyChooseUsSection.features.length - 1}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            whyChooseUsSection: {
                              ...formData.whyChooseUsSection,
                              features: moveItem(formData.whyChooseUsSection.features, idx, 'down'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            whyChooseUsSection: {
                              ...formData.whyChooseUsSection,
                              features: formData.whyChooseUsSection.features.filter((_, i) => i !== idx),
                            },
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                        title="Delete Feature"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-600">Title</label>
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400">Size:</span>
                          <select
                            value={feat.titleFontSize || '1.25rem'}
                            onChange={(e) => {
                              const updated = [...formData.whyChooseUsSection.features];
                              updated[idx].titleFontSize = e.target.value;
                              setFormData({
                                ...formData,
                                whyChooseUsSection: { ...formData.whyChooseUsSection, features: updated },
                              });
                            }}
                            className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                          >
                            {FONT_SIZE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...formData.whyChooseUsSection.features];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            whyChooseUsSection: { ...formData.whyChooseUsSection, features: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Icon</label>
                      <select
                        value={feat.icon || 'Workflow'}
                        onChange={(e) => {
                          const updated = [...formData.whyChooseUsSection.features];
                          updated[idx].icon = e.target.value;
                          setFormData({
                            ...formData,
                            whyChooseUsSection: { ...formData.whyChooseUsSection, features: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      >
                        {POPULAR_ICONS.map((ic) => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">Description</label>
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400">Size:</span>
                        <select
                          value={feat.descriptionFontSize || '0.9375rem'}
                          onChange={(e) => {
                            const updated = [...formData.whyChooseUsSection.features];
                            updated[idx].descriptionFontSize = e.target.value;
                            setFormData({
                              ...formData,
                              whyChooseUsSection: { ...formData.whyChooseUsSection, features: updated },
                            });
                          }}
                          className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                        >
                          {FONT_SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...formData.whyChooseUsSection.features];
                        updated[idx].description = e.target.value;
                        setFormData({
                          ...formData,
                          whyChooseUsSection: { ...formData.whyChooseUsSection, features: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Why Choose Us Features Live Preview"
            subtitle="Real-time rendering of core value pillars, technical guarantees, and high-contrast glowing cards"
          >
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                {formData.whyChooseUsSection.tag && (
                  <span
                    className="inline-block px-3 py-0.5 rounded-full border font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 border-blue-500/20"
                    style={{ fontSize: formData.whyChooseUsSection.tagFontSize || '0.75rem' }}
                  >
                    {formData.whyChooseUsSection.tag}
                  </span>
                )}
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: formData.whyChooseUsSection.headlineFontSize || '1.75rem' }}
                >
                  {formData.whyChooseUsSection.headline}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {formData.whyChooseUsSection.features.map((feat, idx) => (
                  <div
                    key={feat.id || idx}
                    className="rounded-xl border border-slate-700/60 bg-[#0c152e]/80 p-5 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      {renderDashboardIcon(feat.icon)}
                    </div>

                    <h4
                      className="font-bold text-white tracking-tight leading-snug"
                      style={{ fontSize: feat.titleFontSize || '1.125rem' }}
                    >
                      {feat.title}
                    </h4>

                    <p
                      className="text-slate-300 leading-relaxed text-xs"
                      style={{ fontSize: feat.descriptionFontSize || '0.875rem' }}
                    >
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: PORTFOLIO SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'portfolio' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Portfolio Showcase (HeroParallax)</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.portfolioSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioSection: { ...formData.portfolioSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Section Tag</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.portfolioSection.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolioSection: { ...formData.portfolioSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.portfolioSection.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioSection: { ...formData.portfolioSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.portfolioSection.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolioSection: { ...formData.portfolioSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.portfolioSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioSection: { ...formData.portfolioSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Subtitle / Paragraph</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.portfolioSection.descriptionFontSize || '1rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolioSection: { ...formData.portfolioSection, descriptionFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                rows={2}
                value={formData.portfolioSection.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioSection: { ...formData.portfolioSection, description: e.target.value },
                  })
                }
                placeholder="We build beautiful products with the latest technologies..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Showcase Items ({(formData.portfolioSection.products || []).length})
                </span>
                <p className="text-[11px] text-slate-400">Cards rendered in the dynamic 3D Parallax carousel.</p>
              </div>
              <div className="flex items-center gap-2">
                {(!formData.portfolioSection.products || formData.portfolioSection.products.length === 0) && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        portfolioSection: {
                          ...formData.portfolioSection,
                          products: DEFAULT_PORTFOLIO_PRODUCTS,
                        },
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                  >
                    <span>Load 12 Defaults</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const newProd: PortfolioProductItem = {
                      id: `prod-${Date.now()}`,
                      title: 'New Client Platform',
                      link: 'https://example.com',
                      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
                    };
                    setFormData({
                      ...formData,
                      portfolioSection: {
                        ...formData.portfolioSection,
                        products: [...(formData.portfolioSection.products || []), newProd],
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Showcase Item</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.portfolioSection.products || []).map((prod, idx) => (
                <div key={prod.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs font-bold text-slate-800">#{idx + 1} {prod.title}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            portfolioSection: {
                              ...formData.portfolioSection,
                              products: moveItem(formData.portfolioSection.products || [], idx, 'up'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === (formData.portfolioSection.products || []).length - 1}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            portfolioSection: {
                              ...formData.portfolioSection,
                              products: moveItem(formData.portfolioSection.products || [], idx, 'down'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            portfolioSection: {
                              ...formData.portfolioSection,
                              products: (formData.portfolioSection.products || []).filter((_, i) => i !== idx),
                            },
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-24 h-20 rounded-xl overflow-hidden relative border border-slate-300 bg-slate-900 shrink-0">
                      {prod.thumbnail && (
                        <Image src={prod.thumbnail} alt={prod.title} fill className="object-cover" unoptimized />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[10px] font-semibold text-slate-500">Title</label>
                          <div className="flex items-center gap-1 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                            <span className="text-[9px] text-slate-400">Size:</span>
                            <select
                              value={prod.titleFontSize || '1rem'}
                              onChange={(e) => {
                                const updated = [...(formData.portfolioSection.products || [])];
                                updated[idx].titleFontSize = e.target.value;
                                setFormData({
                                  ...formData,
                                  portfolioSection: { ...formData.portfolioSection, products: updated },
                                });
                              }}
                              className="bg-transparent text-[9px] font-bold text-slate-700 outline-none cursor-pointer"
                            >
                              {FONT_SIZE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={prod.title}
                          onChange={(e) => {
                            const updated = [...(formData.portfolioSection.products || [])];
                            updated[idx].title = e.target.value;
                            setFormData({
                              ...formData,
                              portfolioSection: { ...formData.portfolioSection, products: updated },
                            });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Link (URL)</label>
                        <input
                          type="text"
                          value={prod.link}
                          onChange={(e) => {
                            const updated = [...(formData.portfolioSection.products || [])];
                            updated[idx].link = e.target.value;
                            setFormData({
                              ...formData,
                              portfolioSection: { ...formData.portfolioSection, products: updated },
                            });
                          }}
                          className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={prod.thumbnail}
                      onChange={(e) => {
                        const updated = [...(formData.portfolioSection.products || [])];
                        updated[idx].thumbnail = e.target.value;
                        setFormData({
                          ...formData,
                          portfolioSection: { ...formData.portfolioSection, products: updated },
                        });
                      }}
                      placeholder="Thumbnail Image URL"
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                    />
                    <label className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-100 shrink-0">
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleGenericUpload(file, (url) => {
                              const updated = [...(formData.portfolioSection.products || [])];
                              updated[idx].thumbnail = url;
                              setFormData({
                                ...formData,
                                portfolioSection: { ...formData.portfolioSection, products: updated },
                              });
                            });
                          }
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="Portfolio Showcase Live Preview"
            subtitle="Live representation of your client products, responsive cards, and live links"
          >
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                {formData.portfolioSection.tag && (
                  <span
                    className="inline-block px-3 py-0.5 rounded-full border font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 border-blue-500/20"
                    style={{ fontSize: formData.portfolioSection.tagFontSize || '0.75rem' }}
                  >
                    {formData.portfolioSection.tag}
                  </span>
                )}
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: formData.portfolioSection.headlineFontSize || '1.75rem' }}
                >
                  {formData.portfolioSection.headline}
                </h3>
                {formData.portfolioSection.description && (
                  <p
                    className="text-slate-300 text-xs leading-relaxed max-w-xl mx-auto"
                    style={{ fontSize: formData.portfolioSection.descriptionFontSize || '0.875rem' }}
                  >
                    {formData.portfolioSection.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                {(formData.portfolioSection.products || []).slice(0, 8).map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    className="rounded-xl border border-slate-700/60 bg-[#0c152e]/80 overflow-hidden group hover:border-blue-500/50 transition-all flex flex-col"
                  >
                    <div className="aspect-video relative w-full bg-slate-900 overflow-hidden">
                      {prod.thumbnail && (
                        <Image
                          src={prod.thumbnail}
                          alt={prod.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-3 flex items-center justify-between gap-2">
                      <span
                        className="font-bold text-white tracking-tight truncate"
                        style={{ fontSize: prod.titleFontSize || '0.875rem' }}
                      >
                        {prod.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: FAQ SECTION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'faq' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">FAQ Section Configuration</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.faqSection?.enabled !== false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faqSection: { ...formData.faqSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Badge Tag</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.faqSection?.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        faqSection: { ...formData.faqSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.faqSection?.tag || 'FAQ'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faqSection: { ...formData.faqSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.faqSection?.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        faqSection: { ...formData.faqSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.faqSection?.headline || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faqSection: { ...formData.faqSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Description / Subtitle</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.faqSection?.descriptionFontSize || '1rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        faqSection: { ...formData.faqSection, descriptionFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea
                rows={2}
                value={formData.faqSection?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faqSection: { ...formData.faqSection, description: e.target.value },
                  })
                }
                placeholder="Everything you need to know about our web engineering processes..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Toggle global vs custom faqs */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-800">FAQ Content Mode</h4>
              <p className="text-[11px] text-slate-500">
                {formData.faqSection?.inheritGlobalFaqs
                  ? 'Currently inheriting general agency FAQs from the Global FAQ Database.'
                  : 'Currently using dedicated custom FAQs specifically written for this service.'}
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              <input
                type="checkbox"
                checked={!formData.faqSection?.inheritGlobalFaqs}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    faqSection: { ...formData.faqSection, inheritGlobalFaqs: !e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Custom Service FAQs</span>
            </label>
          </div>

          {!formData.faqSection?.inheritGlobalFaqs && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Service FAQs ({(formData.faqSection?.faqs || []).length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq: ServiceFaqItem = {
                      id: `faq-${Date.now()}`,
                      question: 'New Question About This Service?',
                      answer: 'Clear, concise technical or strategic answer...',
                      category: 'General',
                    };
                    setFormData({
                      ...formData,
                      faqSection: {
                        ...formData.faqSection,
                        faqs: [...(formData.faqSection?.faqs || []), newFaq],
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              {(formData.faqSection?.faqs || []).map((faq, idx) => (
                <div key={faq.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-xs font-bold text-slate-800">Q#{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faqSection: {
                              ...formData.faqSection,
                              faqs: moveItem(formData.faqSection?.faqs || [], idx, 'up'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === (formData.faqSection?.faqs || []).length - 1}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faqSection: {
                              ...formData.faqSection,
                              faqs: moveItem(formData.faqSection?.faqs || [], idx, 'down'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            faqSection: {
                              ...formData.faqSection,
                              faqs: (formData.faqSection?.faqs || []).filter((_, i) => i !== idx),
                            },
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-3">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-600">Question</label>
                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400">Size:</span>
                          <select
                            value={faq.questionFontSize || '1rem'}
                            onChange={(e) => {
                              const updated = [...(formData.faqSection?.faqs || [])];
                              updated[idx].questionFontSize = e.target.value;
                              setFormData({
                                ...formData,
                                faqSection: { ...formData.faqSection, faqs: updated },
                              });
                            }}
                            className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                          >
                            {FONT_SIZE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...(formData.faqSection?.faqs || [])];
                          updated[idx].question = e.target.value;
                          setFormData({
                            ...formData,
                            faqSection: { ...formData.faqSection, faqs: updated },
                          });
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <input
                        type="text"
                        value={faq.category || ''}
                        onChange={(e) => {
                          const updated = [...(formData.faqSection?.faqs || [])];
                          updated[idx].category = e.target.value;
                          setFormData({
                            ...formData,
                            faqSection: { ...formData.faqSection, faqs: updated },
                          });
                        }}
                        placeholder="e.g. Engineering"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">Answer</label>
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400">Size:</span>
                        <select
                          value={faq.answerFontSize || '0.875rem'}
                          onChange={(e) => {
                            const updated = [...(formData.faqSection?.faqs || [])];
                            updated[idx].answerFontSize = e.target.value;
                            setFormData({
                              ...formData,
                              faqSection: { ...formData.faqSection, faqs: updated },
                            });
                          }}
                          className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                        >
                          {FONT_SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={faq.answerHtml || faq.answer}
                      onChange={(content) => {
                        const updated = [...(formData.faqSection?.faqs || [])];
                        updated[idx].answerHtml = content;
                        updated[idx].answer = content.replace(/<[^>]*>?/gm, '');
                        setFormData({
                          ...formData,
                          faqSection: { ...formData.faqSection, faqs: updated },
                        });
                      }}
                      modules={quillModules}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section Live Preview */}
          <SectionLivePreviewWrapper
            title="FAQ Accordion Live Preview"
            subtitle="Interactive real-time preview of question cards and comprehensive answers"
          >
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                {formData.faqSection?.tag && (
                  <span
                    className="inline-block px-3 py-0.5 rounded-full border font-mono font-bold tracking-wider text-blue-400 bg-blue-500/10 border-blue-500/20"
                    style={{ fontSize: formData.faqSection.tagFontSize || '0.75rem' }}
                  >
                    {formData.faqSection.tag}
                  </span>
                )}
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: formData.faqSection?.headlineFontSize || '1.75rem' }}
                >
                  {formData.faqSection?.headline || 'Frequently Asked Questions'}
                </h3>
                {formData.faqSection?.description && (
                  <p
                    className="text-slate-300 text-xs leading-relaxed max-w-xl mx-auto"
                    style={{ fontSize: formData.faqSection.descriptionFontSize || '0.875rem' }}
                  >
                    {formData.faqSection.description}
                  </p>
                )}
              </div>

              <div className="max-w-3xl mx-auto space-y-3 pt-2">
                {(formData.faqSection?.faqs || []).map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="rounded-xl border border-slate-700/60 bg-[#0c152e]/80 p-4 space-y-2 transition-all hover:border-blue-500/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {faq.category && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-semibold">
                            {faq.category}
                          </span>
                        )}
                        <h4
                          className="font-bold text-white tracking-tight"
                          style={{ fontSize: faq.questionFontSize || '1rem' }}
                        >
                          {faq.question}
                        </h4>
                      </div>
                      <ChevronDown className="w-4 h-4 text-blue-400 shrink-0" />
                    </div>

                    <div
                      className="text-slate-300 leading-relaxed text-xs pt-1 border-t border-slate-700/30"
                      style={{ fontSize: faq.answerFontSize || '0.875rem' }}
                      dangerouslySetInnerHTML={{
                        __html: faq.answerHtml || faq.answer,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'testimonials' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Client Testimonials Carousel</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.testimonialsSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonialsSection: { ...formData.testimonialsSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tag / Category</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.testimonialsSection.tagFontSize || '0.75rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonialsSection: { ...formData.testimonialsSection, tagFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.testimonialsSection.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonialsSection: { ...formData.testimonialsSection, tag: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
                  <select
                    value={formData.testimonialsSection.headlineFontSize || '2.25rem'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonialsSection: { ...formData.testimonialsSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.testimonialsSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonialsSection: { ...formData.testimonialsSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Reviews ({formData.testimonialsSection.testimonials.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newT: ServiceTestimonial = {
                    id: `testi-${Date.now()}`,
                    quote: 'Outstanding software architecture and delivery velocity. They brought our vision to life seamlessly.',
                    rating: 5,
                    author: 'Client Name',
                    role: 'Chief Technology Officer',
                    company: 'ScaleUp Inc',
                    location: 'New York, USA',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
                  };
                  setFormData({
                    ...formData,
                    testimonialsSection: {
                      ...formData.testimonialsSection,
                      testimonials: [...formData.testimonialsSection.testimonials, newT],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.testimonialsSection.testimonials.map((t, idx) => (
                <div key={t.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">#{idx + 1} {t.author}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        idx < Math.ceil(formData.testimonialsSection.testimonials.length / 2)
                          ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {idx < Math.ceil(formData.testimonialsSection.testimonials.length / 2) ? 'Row 1' : 'Row 2'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              testimonials: moveItem(formData.testimonialsSection.testimonials, idx, 'up'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.testimonialsSection.testimonials.length - 1}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              testimonials: moveItem(formData.testimonialsSection.testimonials, idx, 'down'),
                            },
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            testimonialsSection: {
                              ...formData.testimonialsSection,
                              testimonials: formData.testimonialsSection.testimonials.filter((_, i) => i !== idx),
                            },
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-slate-600">Quote</label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Size:</span>
                        <select
                          value={t.quoteFontSize || '14px'}
                          onChange={(e) => {
                            const updated = [...formData.testimonialsSection.testimonials];
                            updated[idx].quoteFontSize = e.target.value;
                            setFormData({
                              ...formData,
                              testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                            });
                          }}
                          className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-blue-600 focus:outline-none"
                        >
                          {FONT_SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...formData.testimonialsSection.testimonials];
                        updated[idx].quote = e.target.value;
                        setFormData({
                          ...formData,
                          testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Author</label>
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => {
                          const updated = [...formData.testimonialsSection.testimonials];
                          updated[idx].author = e.target.value;
                          setFormData({
                            ...formData,
                            testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Role / Company</label>
                      <input
                        type="text"
                        value={t.role || t.company || ''}
                        onChange={(e) => {
                          const updated = [...formData.testimonialsSection.testimonials];
                          updated[idx].role = e.target.value;
                          setFormData({
                            ...formData,
                            testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Location</label>
                      <input
                        type="text"
                        value={t.location || ''}
                        onChange={(e) => {
                          const updated = [...formData.testimonialsSection.testimonials];
                          updated[idx].location = e.target.value;
                          setFormData({
                            ...formData,
                            testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 relative bg-slate-100 shrink-0">
                      {t.avatar ? (
                        <Image src={t.avatar} alt={t.author || 'Avatar'} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {t.author ? t.author.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={t.avatar || ''}
                      onChange={(e) => {
                        const updated = [...formData.testimonialsSection.testimonials];
                        updated[idx].avatar = e.target.value;
                        setFormData({
                          ...formData,
                          testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                        });
                      }}
                      placeholder="Avatar image URL (https://...)"
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                    />
                    <label className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-100 shrink-0">
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleGenericUpload(file, (url) => {
                              const updated = [...formData.testimonialsSection.testimonials];
                              updated[idx].avatar = url;
                              setFormData({
                                ...formData,
                                testimonialsSection: { ...formData.testimonialsSection, testimonials: updated },
                              });
                            });
                          }
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Staging Live Preview */}
          <SectionLivePreviewWrapper title="Client Testimonials Live Preview">
            <div className="text-center max-w-2xl mx-auto mb-8">
              {formData.testimonialsSection.tag && (
                <span
                  style={{ fontSize: formData.testimonialsSection.tagFontSize || '12px' }}
                  className="inline-block px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase mb-3 bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {formData.testimonialsSection.tag}
                </span>
              )}
              <h3
                style={{ fontSize: formData.testimonialsSection.headlineFontSize || '28px' }}
                className="font-extrabold text-white tracking-tight leading-snug"
              >
                {formData.testimonialsSection.headline}
              </h3>
            </div>

            {(() => {
              const allItems = formData.testimonialsSection.testimonials || [];
              const half = Math.ceil(allItems.length / 2);
              const row1 = allItems.slice(0, half);
              const row2 = allItems.length > 1 ? allItems.slice(half) : [];

              const renderPreviewCard = (item: any, idx: number, rowLabel: string) => (
                <div
                  key={`${rowLabel}-${idx}`}
                  className="p-5 rounded-2xl bg-[#0c1322] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        {rowLabel}
                      </span>
                    </div>
                    <p
                      style={{ fontSize: item.quoteFontSize || '14px' }}
                      className="text-slate-300 italic leading-relaxed mb-4 line-clamp-3"
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 relative bg-blue-600/30 flex items-center justify-center shrink-0">
                      {item.avatar ? (
                        <Image src={item.avatar} alt={item.author} fill className="object-cover" unoptimized />
                      ) : (
                        <span className="text-xs font-bold text-white">
                          {item.author ? item.author.charAt(0) : 'U'}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{item.author}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.role || item.company}{item.location ? ` • ${item.location}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div className="space-y-5">
                  {/* Row 1 Cards */}
                  <div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>Row 1 Cards ({row1.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {row1.map((item, idx) => renderPreviewCard(item, idx, 'Row 1'))}
                    </div>
                  </div>

                  {/* Row 2 Cards */}
                  {row2.length > 0 && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span>Row 2 Cards ({row2.length})</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {row2.map((item, idx) => renderPreviewCard(item, idx, 'Row 2'))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </SectionLivePreviewWrapper>


        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 9: LEAD GENERATION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'leadgen' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Lead Generation Section & Form</h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={formData.leadGenSection.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadGenSection: { ...formData.leadGenSection, enabled: e.target.checked },
                  })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-xs font-bold text-slate-700">Section Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Badge Tag</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Size:</span>
                  <select
                    value={formData.leadGenSection.tagFontSize || '12px'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadGenSection: { ...formData.leadGenSection, tagFontSize: e.target.value },
                      })
                    }
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-blue-600 focus:outline-none"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.leadGenSection.tag || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadGenSection: { ...formData.leadGenSection, tag: e.target.value },
                  })
                }
                placeholder="START YOUR PROJECT"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-cyan-600"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Subheadline</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Size:</span>
                  <select
                    value={formData.leadGenSection.subheadlineFontSize || '15px'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadGenSection: { ...formData.leadGenSection, subheadlineFontSize: e.target.value },
                      })
                    }
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-blue-600 focus:outline-none"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.leadGenSection.subheadline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadGenSection: { ...formData.leadGenSection, subheadline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Headline</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Size:</span>
                  <select
                    value={formData.leadGenSection.headlineFontSize || '32px'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadGenSection: { ...formData.leadGenSection, headlineFontSize: e.target.value },
                      })
                    }
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-blue-600 focus:outline-none"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.leadGenSection.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadGenSection: { ...formData.leadGenSection, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Submit Button Text</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Size:</span>
                  <select
                    value={formData.leadGenSection.submitButtonFontSize || '14px'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leadGenSection: { ...formData.leadGenSection, submitButtonFontSize: e.target.value },
                      })
                    }
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-blue-600 focus:outline-none"
                  >
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={formData.leadGenSection.submitButtonText || 'Send Message'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadGenSection: { ...formData.leadGenSection, submitButtonText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          {/* Inquiry Dropdown Options */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Inquiry Types (Options inside form dropdown)
              </label>
              <p className="text-xs text-slate-400">Add or remove the services users can select when submitting an inquiry.</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(formData.leadGenSection.inquiryTypes || []).map((type, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  <span>{type}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        leadGenSection: {
                          ...formData.leadGenSection,
                          inquiryTypes: formData.leadGenSection.inquiryTypes.filter((_, i) => i !== idx),
                        },
                      });
                    }}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-md pt-1">
              <input
                type="text"
                value={newInquiryInput}
                onChange={(e) => setNewInquiryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!newInquiryInput.trim()) return;
                    setFormData({
                      ...formData,
                      leadGenSection: {
                        ...formData.leadGenSection,
                        inquiryTypes: [...(formData.leadGenSection.inquiryTypes || []), newInquiryInput.trim()],
                      },
                    });
                    setNewInquiryInput('');
                  }
                }}
                placeholder="New inquiry option (press Enter)"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newInquiryInput.trim()) return;
                  setFormData({
                    ...formData,
                    leadGenSection: {
                      ...formData.leadGenSection,
                      inquiryTypes: [...(formData.leadGenSection.inquiryTypes || []), newInquiryInput.trim()],
                    },
                  });
                  setNewInquiryInput('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Add Option
              </button>
            </div>
          </div>

          {/* Real-time Staging Live Preview */}
          <SectionLivePreviewWrapper title="Lead Generation Section Live Preview">
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#0b1528] to-[#070d1d] border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-6 space-y-4">
                  {formData.leadGenSection.tag && (
                    <span
                      style={{ fontSize: formData.leadGenSection.tagFontSize || '12px' }}
                      className="inline-block px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    >
                      {formData.leadGenSection.tag}
                    </span>
                  )}
                  <h3
                    style={{ fontSize: formData.leadGenSection.headlineFontSize || '32px' }}
                    className="font-extrabold text-white tracking-tight leading-tight"
                  >
                    {formData.leadGenSection.headline}
                  </h3>
                  <p
                    style={{ fontSize: formData.leadGenSection.subheadlineFontSize || '15px' }}
                    className="text-slate-300 leading-relaxed"
                  >
                    {formData.leadGenSection.subheadline}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Inquiry Services Supported:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(formData.leadGenSection.inquiryTypes || []).map((type, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-blue-900/30 text-blue-300 border border-blue-500/20 text-[11px] font-medium"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0e172a] border border-white/10 space-y-3.5 shadow-xl">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Quick Intake Form</span>
                      <span className="text-[10px] text-emerald-400 font-mono">LIVE PREVIEW</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-1">Your Name</div>
                        <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400">
                          John Doe
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-1">Work Email</div>
                        <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-400">
                          john@company.com
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 mb-1">Select Service Inquiry</div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-200 flex items-center justify-between">
                        <span>{formData.leadGenSection.inquiryTypes?.[0] || 'Select Inquiry Type'}</span>
                        <span className="text-slate-500 text-[10px]">▼</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 mb-1">Project Details</div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-500 h-16">
                        Brief project requirements...
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled
                      style={{ fontSize: formData.leadGenSection.submitButtonFontSize || '14px' }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-default"
                    >
                      <Send className="w-4 h-4" />
                      <span>{formData.leadGenSection.submitButtonText || 'Send Message'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SectionLivePreviewWrapper>


        </section>
      )}

    </main>
  );
}
