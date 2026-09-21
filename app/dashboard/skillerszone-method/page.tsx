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
  CheckSquare,
  Eye,
  CheckCircle2,
  Compass,
  Cpu,
  LayoutDashboard,
  FileCheck2,
  LineChart,
  Code2,
  TrendingUp,
  Users2,
  ShoppingBag,
  Rocket,
  Shield,
  Zap,
  Target,
  Globe,
  Laptop,
  Smartphone,
  Search,
  Share2,
  Database,
  Bot,
  Workflow,
  Palette,
} from 'lucide-react';

// Dynamically import ReactQuill to prevent SSR window hydration mismatches
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

// Font Size Presets
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

const STEP_TITLE_FONT_OPTIONS = [
  { label: 'Small (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Default (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Medium (1.75rem / 28px)', value: '1.75rem' },
  { label: 'Large (2rem / 32px)', value: '2rem' },
  { label: 'Extra Large (2.5rem / 40px)', value: '2.5rem' },
];

const STEP_DESC_FONT_OPTIONS = [
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

// Lucide Icon Options
const ICON_OPTIONS = [
  { id: 'Compass', label: 'Discovery / Compass', icon: Compass },
  { id: 'Cpu', label: 'Tech / Deployment / CPU', icon: Cpu },
  { id: 'LayoutDashboard', label: 'Client Dashboard', icon: LayoutDashboard },
  { id: 'FileCheck2', label: 'Verified / Reporting', icon: FileCheck2 },
  { id: 'LineChart', label: 'Growth / Analytics', icon: LineChart },
  { id: 'Sparkles', label: 'Sparkles / AI', icon: Sparkles },
  { id: 'Rocket', label: 'Rocket / Launch', icon: Rocket },
  { id: 'Shield', label: 'Security & QA', icon: Shield },
  { id: 'Zap', label: 'Speed & Agility', icon: Zap },
  { id: 'Target', label: 'Target / Objectives', icon: Target },
  { id: 'CheckCircle2', label: 'Success / Milestone', icon: CheckCircle2 },
  { id: 'Code2', label: 'Development / Code', icon: Code2 },
  { id: 'TrendingUp', label: 'Scale / Growth', icon: TrendingUp },
  { id: 'Users2', label: 'Team / Collaboration', icon: Users2 },
  { id: 'ShoppingBag', label: 'Store / E-Commerce', icon: ShoppingBag },
  { id: 'Globe', label: 'Global Reach', icon: Globe },
  { id: 'Laptop', label: 'Web Platform', icon: Laptop },
  { id: 'Smartphone', label: 'Mobile Apps', icon: Smartphone },
  { id: 'Search', label: 'Search & Audit', icon: Search },
  { id: 'Share2', label: 'Integration / Share', icon: Share2 },
  { id: 'Database', label: 'Database & Cloud', icon: Database },
  { id: 'Bot', label: 'Automation / Bot', icon: Bot },
  { id: 'Workflow', label: 'Workflow Engine', icon: Workflow },
  { id: 'Layers', label: 'Multi-layer Stack', icon: Layers },
];

function getIconComponent(iconName?: string) {
  const match = ICON_OPTIONS.find((item) => item.id.toLowerCase() === (iconName || '').toLowerCase());
  return match ? match.icon : Compass;
}

const CATEGORY_COLOR_OPTIONS = [
  {
    id: 'cyan',
    label: 'Cyan (Default)',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    text: 'text-cyan-400',
    checkColor: 'text-cyan-400',
  },
  {
    id: 'blue',
    label: 'Blue',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/30',
    text: 'text-blue-400',
    checkColor: 'text-[#00FFAB]',
  },
  {
    id: 'purple',
    label: 'Purple',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    text: 'text-purple-400',
    checkColor: 'text-purple-400',
  },
  {
    id: 'sky',
    label: 'Sky',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    text: 'text-sky-400',
    checkColor: 'text-sky-400',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    text: 'text-emerald-400',
    checkColor: 'text-[#00FFAB]',
  },
];

function getColorConfig(colorId?: string) {
  const match = CATEGORY_COLOR_OPTIONS.find((c) => c.id === colorId);
  return match || CATEGORY_COLOR_OPTIONS[0];
}

export interface MethodStep {
  id: string;
  stepTag: string;
  category: string;
  categoryColor: string;
  icon: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  checklist: string[];
}

export interface SkillersZoneMethodData {
  badgeText: string;
  badgeFontSize?: string;
  headingPrefix: string;
  headingHighlight: string;
  headingFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  steps: MethodStep[];
}

const DEFAULT_METHOD_DATA: SkillersZoneMethodData = {
  badgeText: 'THE SKILLERSZONE METHOD',
  badgeFontSize: '0.75rem',
  headingPrefix: 'Simple, transparent steps ',
  headingHighlight: 'that scale with your needs',
  headingFontSize: '3.75rem',
  description:
    'Our systematic approach provides complete clarity, consistent execution, and guaranteed milestones at every stage of growth.',
  descriptionFontSize: '1.125rem',
  steps: [
    {
      id: 'step-1',
      stepTag: 'STEP 1',
      category: 'Discovery & Alignment',
      categoryColor: 'cyan',
      icon: 'Compass',
      title: 'Strategy & Roadmap',
      titleFontSize: '1.5rem',
      description:
        'We start by understanding your business goals, target audience, and challenges. This insight allows us to create a personalized strategy that forms the roadmap for your success.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Target Market & Competitor Audit',
        'Technical Architecture Blueprint',
        'Milestone Timeline & KPI Definition',
        'Resource & Budget Optimization',
      ],
    },
    {
      id: 'step-2',
      stepTag: 'STEP 2',
      category: 'Sprint Deployment',
      categoryColor: 'blue',
      icon: 'Cpu',
      title: 'Execution & Monitoring',
      titleFontSize: '1.5rem',
      description:
        'From planning to execution, we provide complete support, ensuring every aspect of your operations is streamlined for efficiency, scalability, and measurable results.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Agile Sprint Delivery',
        'Continuous QA & Integration',
        '24/7 Operations Monitoring',
        'Scalable Cloud Infrastructure',
      ],
    },
    {
      id: 'step-3',
      stepTag: 'STEP 3',
      category: 'Full Visibility',
      categoryColor: 'purple',
      icon: 'LayoutDashboard',
      title: 'Client Dashboard',
      titleFontSize: '1.5rem',
      description:
        'Your personalized dashboard with full visibility and control. Access the software on a test basis, track performance, and experience how it streamlines operations before going live.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Real-time Milestone Tracking',
        'Live Staging Sandbox Preview',
        'Direct Team Communication Hub',
        'Performance & SLA Metrics',
      ],
    },
    {
      id: 'step-4',
      stepTag: 'STEP 4',
      category: 'Honest Accountability',
      categoryColor: 'sky',
      icon: 'FileCheck2',
      title: 'Transparency, Credibility & Reporting',
      titleFontSize: '1.5rem',
      description:
        'Our data-driven reports ensure full transparency, reinforce credibility, and keep you informed at every stage.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Weekly Detailed Analytics Reports',
        'Conversion & Traffic Breakdowns',
        'Transparent Resource Logging',
        'Clear ROI Impact Tracking',
      ],
    },
    {
      id: 'step-5',
      stepTag: 'STEP 5',
      category: 'Continuous Evolution',
      categoryColor: 'emerald',
      icon: 'LineChart',
      title: 'Growth Analysis & Feedback',
      titleFontSize: '1.5rem',
      description:
        'We continuously monitor performance, refine strategies, track your growth and provide ongoing feedback helping your business adapt, scale, and thrive in a competitive market.',
      descriptionFontSize: '0.875rem',
      checklist: [
        'Continuous Strategy Iteration',
        'Market Expansion Advisory',
        'Long-term Scaling Support',
        'Dedicated Growth Partnership',
      ],
    },
  ],
};

export default function SkillersZoneMethodDashboardPage() {
  const [formData, setFormData] = useState<SkillersZoneMethodData>(DEFAULT_METHOD_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewStepIndex, setPreviewStepIndex] = useState(0);
  const [newChecklistInputs, setNewChecklistInputs] = useState<{ [key: string]: string }>({});

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/skillerszone-method', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          const rawSteps = Array.isArray(json.data.steps) && json.data.steps.length > 0
            ? json.data.steps
            : DEFAULT_METHOD_DATA.steps;

          const sanitizedSteps: MethodStep[] = rawSteps.map((s: any, idx: number) => ({
            id: s.id || `step-${idx + 1}-${Date.now()}`,
            stepTag: s.stepTag || `STEP ${idx + 1}`,
            category: s.category || 'Milestone Phase',
            categoryColor: s.categoryColor || 'cyan',
            icon: s.icon || 'Compass',
            title: s.title ?? `Phase ${idx + 1}`,
            titleFontSize: s.titleFontSize || '1.5rem',
            description: s.description ?? '',
            descriptionFontSize: s.descriptionFontSize || '0.875rem',
            checklist: Array.isArray(s.checklist) ? s.checklist : [],
          }));

          setFormData({
            badgeText: json.data.badgeText || DEFAULT_METHOD_DATA.badgeText,
            badgeFontSize: json.data.badgeFontSize || DEFAULT_METHOD_DATA.badgeFontSize || '0.75rem',
            headingPrefix: json.data.headingPrefix ?? DEFAULT_METHOD_DATA.headingPrefix,
            headingHighlight: json.data.headingHighlight || DEFAULT_METHOD_DATA.headingHighlight,
            headingFontSize: json.data.headingFontSize || DEFAULT_METHOD_DATA.headingFontSize || '3.75rem',
            description: json.data.description || DEFAULT_METHOD_DATA.description,
            descriptionFontSize: json.data.descriptionFontSize || DEFAULT_METHOD_DATA.descriptionFontSize || '1.125rem',
            steps: sanitizedSteps,
          });
        }
      } catch (err) {
        console.error('Failed to load method data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Update Section level field
  const handleSectionChange = (field: keyof Omit<SkillersZoneMethodData, 'steps'>, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Add Step
  const handleAddStep = () => {
    const nextIndex = formData.steps.length + 1;
    const newStep: MethodStep = {
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      stepTag: `STEP ${nextIndex}`,
      category: `Phase ${nextIndex} Execution`,
      categoryColor: 'cyan',
      icon: 'Target',
      title: `Method Step ${nextIndex}`,
      titleFontSize: '1.5rem',
      description: 'Detail the strategic process, goals, and deliverables for this method phase.',
      descriptionFontSize: '0.875rem',
      checklist: ['Milestone Deliverable 1', 'Quality Assurance Inspection'],
    };

    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));

    setPreviewStepIndex(formData.steps.length);
  };

  // Duplicate Step
  const handleDuplicateStep = (index: number) => {
    const target = formData.steps[index];
    const duplicated: MethodStep = {
      ...target,
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      stepTag: `STEP ${formData.steps.length + 1}`,
      title: target.title ? `${target.title} (Copy)` : 'Copy',
      titleFontSize: target.titleFontSize || '1.5rem',
      descriptionFontSize: target.descriptionFontSize || '0.875rem',
      checklist: Array.isArray(target.checklist) ? [...target.checklist] : [],
    };

    const newSteps = [...formData.steps];
    newSteps.splice(index + 1, 0, duplicated);
    setFormData((prev) => ({ ...prev, steps: newSteps }));
    setPreviewStepIndex(index + 1);
  };

  // Delete Step
  const handleDeleteStep = async (index: number) => {
    if (formData.steps.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Step Required',
        text: 'You need at least one step in this section.',
      });
      return;
    }

    const step = formData.steps[index];
    const result = await Swal.fire({
      title: `Delete "${step.title}"?`,
      text: 'Are you sure you want to remove this method step?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      const updated = formData.steps.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, steps: updated }));
      if (previewStepIndex >= updated.length) {
        setPreviewStepIndex(Math.max(0, updated.length - 1));
      }
    }
  };

  // Move Step
  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.steps.length) return;

    const updated = [...formData.steps];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, steps: updated }));
    setPreviewStepIndex(targetIndex);
  };

  // Edit Step Property
  const handleStepChange = (index: number, field: keyof MethodStep, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.steps];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, steps: updated };
    });
  };

  // Add Checklist Item
  const handleAddChecklist = (stepIndex: number, specificText?: string) => {
    const step = formData.steps[stepIndex];
    if (!step) return;
    const stepKey = step.id || `step-${stepIndex}`;
    const rawInput = specificText !== undefined ? specificText : (newChecklistInputs[stepKey] || '');
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    setFormData((prev) => {
      const updated = [...prev.steps];
      const currentStep = updated[stepIndex];
      if (!currentStep) return prev;

      const existing = Array.isArray(currentStep.checklist) ? [...currentStep.checklist] : [];
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
      }

      updated[stepIndex] = { ...currentStep, checklist: existing };
      return { ...prev, steps: updated };
    });

    setNewChecklistInputs((prev) => ({ ...prev, [stepKey]: '' }));
    setPreviewStepIndex(stepIndex);
  };

  // Remove Checklist Item
  const handleRemoveChecklist = (stepIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.steps];
      const currentStep = updated[stepIndex];
      if (!currentStep) return prev;

      const existing = Array.isArray(currentStep.checklist) ? [...currentStep.checklist] : [];
      existing.splice(itemIndex, 1);
      updated[stepIndex] = { ...currentStep, checklist: existing };
      return { ...prev, steps: updated };
    });
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    const result = await Swal.fire({
      title: 'Reset to Defaults?',
      text: 'This will revert all titles, subtitles, and steps to the default 5 method phases.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, reset',
    });

    if (result.isConfirmed) {
      setFormData(JSON.parse(JSON.stringify(DEFAULT_METHOD_DATA)));
      setPreviewStepIndex(0);
    }
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // 1. Update localStorage cache
      try {
        localStorage.setItem('digital_spyke_skillerszone_method', JSON.stringify(formData));
      } catch (e) {}

      // 2. Persist to API
      const res = await fetch('/api/skillerszone-method', {
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
          title: 'SkillersZone Method updated successfully!',
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
        <p className="text-gray-500 text-xs font-semibold">Loading SkillersZone Method Settings...</p>
      </div>
    );
  }

  const activeStep = formData.steps[previewStepIndex] || formData.steps[0] || null;
  const ActiveIcon = activeStep ? getIconComponent(activeStep.icon) : Compass;
  const activeColor = activeStep ? getColorConfig(activeStep.categoryColor) : CATEGORY_COLOR_OPTIONS[0];

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
              {formData.steps.length} Timeline Steps Active
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">SkillersZone Method Configuration</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Full control over the &ldquo;THE SKILLERSZONE METHOD&rdquo; timeline section.
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
                <Compass className="w-4 h-4 text-cyan-500" />
                <span>Section Header &amp; Text Settings</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top Badge Text & Size */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Section Badge Text</span>
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
                    placeholder="THE SKILLERSZONE METHOD"
                  />
                </div>
              </div>

              {/* Main Heading Prefix & Size */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Main Heading Prefix</span>
                    <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                    <select
                      value={formData.headingFontSize || '3.75rem'}
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
                    placeholder="Simple, transparent steps"
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
                  placeholder="that scale with your needs"
                  className="w-full px-3.5 py-2 text-xs border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-emerald-50/30 text-emerald-900 font-bold"
                />
              </div>

              {/* Subtitle / Description & Size */}
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
                    placeholder="Our systematic approach provides complete clarity..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Steps Management */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Timeline Steps ({formData.steps.length})</span>
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Full control over step tag, category, icon, title, description, and checklist deliverables.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-blue-200 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Method Step</span>
              </button>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {formData.steps.map((step, index) => {
                const IconComp = getIconComponent(step.icon);
                const isSelectedForPreview = previewStepIndex === index;
                const stepKey = step.id || `step-${index}`;

                return (
                  <div
                    key={step.id || index}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isSelectedForPreview
                        ? 'border-blue-400 bg-blue-50/10 shadow-sm ring-1 ring-blue-400/30'
                        : 'border-gray-200/80 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Header Toolbar */}
                    <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-xs">
                          {index + 1}
                        </span>
                        <span className="text-[11px] font-bold font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md">
                          {step.stepTag || `STEP ${index + 1}`}
                        </span>
                        <span className="font-bold text-slate-800 text-xs truncate max-w-[180px]">
                          {step.title || 'Untitled Step'}
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200/60 px-2 py-0.5 rounded-md font-mono">
                          {step.checklist?.length || 0} checks
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Preview Selector */}
                        <button
                          type="button"
                          onClick={() => setPreviewStepIndex(index)}
                          className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                            isSelectedForPreview
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 hover:bg-gray-200'
                          }`}
                          title="Preview this step"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">Preview</span>
                        </button>

                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveStep(index, 'up')}
                          className="p-1.5 text-gray-500 hover:text-slate-800 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={index === formData.steps.length - 1}
                          onClick={() => handleMoveStep(index, 'down')}
                          className="p-1.5 text-gray-500 hover:text-slate-800 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate */}
                        <button
                          type="button"
                          onClick={() => handleDuplicateStep(index)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Duplicate step"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteStep(index)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Step Body Form */}
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Step Tag Identifier */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500">
                            Step Tag (e.g. STEP 1)
                          </label>
                          <input
                            type="text"
                            value={step.stepTag}
                            onChange={(e) => handleStepChange(index, 'stepTag', e.target.value)}
                            placeholder="STEP 1"
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono font-bold bg-gray-50/40"
                          />
                        </div>

                        {/* Category Name */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500">
                            Category Title
                          </label>
                          <input
                            type="text"
                            value={step.category}
                            onChange={(e) => handleStepChange(index, 'category', e.target.value)}
                            placeholder="Discovery & Alignment"
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold bg-gray-50/40"
                          />
                        </div>

                        {/* Category Theme Color */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                            <Palette className="w-3 h-3 text-cyan-500" />
                            <span>Color Theme</span>
                          </label>
                          <select
                            value={step.categoryColor || 'cyan'}
                            onChange={(e) => handleStepChange(index, 'categoryColor', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                          >
                            {CATEGORY_COLOR_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Step Icon */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                            <span>Step Icon</span>
                            <IconComp className="w-3.5 h-3.5 text-cyan-600" />
                          </label>
                          <select
                            value={step.icon}
                            onChange={(e) => handleStepChange(index, 'icon', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Step Title & Size */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-700 flex items-center gap-1.5">
                            <span>Step Title</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text</span>
                          </label>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={step.titleFontSize || '1.5rem'}
                              onChange={(e) => handleStepChange(index, 'titleFontSize', e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                            >
                              {STEP_TITLE_FONT_OPTIONS.map((opt) => (
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
                            value={step.title}
                            onChange={(val) => handleStepChange(index, 'title', val)}
                            modules={titleQuillModules}
                            formats={titleQuillFormats}
                            placeholder="e.g. Strategy & Roadmap"
                          />
                        </div>
                      </div>

                      {/* Step Subtitle / Description & Size */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <span>Step Subtitle / Description</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={step.descriptionFontSize || '0.875rem'}
                              onChange={(e) => handleStepChange(index, 'descriptionFontSize', e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                            >
                              {STEP_DESC_FONT_OPTIONS.map((opt) => (
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
                            value={step.description}
                            onChange={(val) => handleStepChange(index, 'description', val)}
                            modules={subtitleQuillModules}
                            formats={subtitleQuillFormats}
                            placeholder="Describe this step in the process..."
                          />
                        </div>
                      </div>

                      {/* Checklist Deliverables */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Checklist Deliverables</span>
                          </label>
                          <span className="text-[10px] text-gray-400">Key deliverables checked off in this phase</span>
                        </div>

                        {/* List of items */}
                        <div className="space-y-1.5">
                          {(Array.isArray(step.checklist) ? step.checklist : []).map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-slate-700"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>{item}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveChecklist(index, itemIdx)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                title="Remove checklist item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}

                          {/* Add item input */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              value={newChecklistInputs[stepKey] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNewChecklistInputs((prev) => ({
                                  ...prev,
                                  [stepKey]: val,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddChecklist(index);
                                }
                              }}
                              placeholder="Add deliverable check item..."
                              className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddChecklist(index)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
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
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

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
                className="inline-block px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
              >
                {isHtml(formData.badgeText) ? (
                  <span
                    className="font-semibold tracking-[0.25em] text-cyan-400 uppercase [&_p]:inline [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: formData.badgeText }}
                  />
                ) : (
                  <span className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase">
                    {formData.badgeText || 'THE SKILLERSZONE METHOD'}
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

            {/* Step Switcher Buttons */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 relative z-10">
              {formData.steps.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPreviewStepIndex(i)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${
                    previewStepIndex === i
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30 ring-1 ring-cyan-400'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {s.stepTag || `STEP ${i + 1}`}
                </button>
              ))}
            </div>

            {/* Active Timeline Step Card Preview */}
            {activeStep && (
              <div className="rounded-2xl border border-white/10 bg-[#091021]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl ${activeColor.badgeBg} border ${activeColor.badgeBorder} ${activeColor.text}`}>
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold tracking-wider ${activeColor.text} uppercase`}>
                    {activeStep.category || 'Milestone Phase'}
                  </span>
                </div>

                {/* Step Title */}
                <div className="mb-3">
                  {isHtml(activeStep.title) ? (
                    <div
                      style={activeStep.titleFontSize ? { fontSize: activeStep.titleFontSize } : undefined}
                      className="font-bold text-white [&_p]:m-0 leading-tight"
                      dangerouslySetInnerHTML={{ __html: activeStep.title }}
                    />
                  ) : (
                    <h4
                      style={activeStep.titleFontSize ? { fontSize: activeStep.titleFontSize } : undefined}
                      className="font-bold text-white leading-tight"
                    >
                      {activeStep.title || 'Step Title'}
                    </h4>
                  )}
                </div>

                {/* Step Description */}
                {isHtml(activeStep.description) ? (
                  <div
                    style={activeStep.descriptionFontSize ? { fontSize: activeStep.descriptionFontSize } : undefined}
                    className="text-gray-400 leading-relaxed mb-6 font-normal [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: activeStep.description }}
                  />
                ) : (
                  <p
                    style={activeStep.descriptionFontSize ? { fontSize: activeStep.descriptionFontSize } : undefined}
                    className="text-gray-400 leading-relaxed mb-6 font-normal"
                  >
                    {activeStep.description}
                  </p>
                )}

                {/* Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/5">
                  {(Array.isArray(activeStep.checklist) ? activeStep.checklist : []).map((check, checkIdx) => (
                    <div key={checkIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${activeColor.checkColor} shrink-0`} />
                      <span>{check}</span>
                    </div>
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
