'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR window hydration errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

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
  { label: 'Small (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Medium (2rem / 32px)', value: '2rem' },
  { label: 'Semi Large (2.5rem / 40px)', value: '2.5rem' },
  { label: 'Large (3rem / 48px)', value: '3rem' },
  { label: 'Default Large (3.75rem / 60px)', value: '3.75rem' },
  { label: 'Extra Large (4.5rem / 72px)', value: '4.5rem' },
  { label: 'Huge (5.5rem / 88px)', value: '5.5rem' },
];

const STEP_DESCRIPTION_FONT_OPTIONS = [
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
];

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

const titleQuillFormats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
];

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
  ExternalLink,
} from 'lucide-react';
import {
  Calendar,
  Grid,
  Paintbrush,
  Code2,
  Bug,
  CloudUpload,
  Rocket,
  Shield,
  Zap,
  Target,
  Smartphone,
  Cpu,
  Lightbulb,
  CheckCircle2,
  Boxes,
  Compass,
} from 'lucide-react';

export interface ProcessCard {
  id: string;
  step: string;
  title: string;
  titleFontSize?: string;
  description: string;
  descriptionFontSize?: string;
  icon: string;
  tags: string[];
  bgImage?: string;
}

export interface ProcessSectionData {
  badgeText: string;
  badgeFontSize?: string;
  headingPrefix: string;
  headingFontSize?: string;
  headingHighlight: string;
  description: string;
  descriptionFontSize?: string;
  ctaText: string;
  ctaLink: string;
  cards: ProcessCard[];
}

const DEFAULT_PROCESS_DATA: ProcessSectionData = {
  badgeText: 'OUR PROVEN PROCESS',
  badgeFontSize: '0.75rem',
  headingPrefix: 'We Simplify The ',
  headingFontSize: '3.75rem',
  headingHighlight: 'Journey',
  description:
    'From initial ideation to live global deployment, we execute every phase with precision, transparent communication, and Agile velocity.',
  descriptionFontSize: '1rem',
  ctaText: 'Work With Us!',
  ctaLink: '/contact',
  cards: [
    {
      id: 'step-1',
      step: '01',
      title: 'Planning',
      description:
        'At the start of each project, we work with our clients to build a solid project plan. The initial scope document can come from the client or through a combined process of phone calls and in-person meetings.',
      icon: 'EventNote',
      tags: ['Project Scope', 'Milestone Planning', 'Roadmap'],
    },
    {
      id: 'step-2',
      step: '02',
      title: 'Wireframing',
      description:
        'Once the project plan and scope have been finalized, our wireframing team determines the placement of all objects on each page of the application. Whether it is a consumer mobile app or a backend business application, this stage ensures final agreement on what will be placed on each page for the user to access.',
      icon: 'GridView',
      tags: ['UX Architecture', 'Interactive Wireframes', 'Layout'],
    },
    {
      id: 'step-3',
      step: '03',
      title: 'Design',
      description:
        'After finalizing wireframes, our design team creates the final appearance and functionality of the application. This is an exciting stage where the entire application comes to life. We provide clickable versions to fully experience user interactions before development begins.',
      icon: 'Brush',
      tags: ['UI Design', 'Design Systems', 'Interactive Prototypes'],
    },
    {
      id: 'step-4',
      step: '04',
      title: 'Development',
      description:
        'With finalized wireframes and designs, we begin coding the application. As an Agile development team, we break down the project into feature sets called Sprints. This approach allows customers to review progress regularly and provide feedback at the end of each Sprint, ensuring continuous involvement.',
      icon: 'Code',
      tags: ['Full-Stack Code', 'Agile Sprints', 'Clean Architecture'],
    },
    {
      id: 'step-5',
      step: '05',
      title: 'Testing',
      description:
        "The testing process ensures that the application is functional, reliable, and user-friendly. It involves multiple stages, using various techniques and tools to identify and fix defects, bugs, and usability issues before release. This step improves the user experience and guarantees the product's success.",
      icon: 'BugReport',
      tags: ['Quality Assurance', 'Security & Speed', 'Cross-Device QA'],
    },
    {
      id: 'step-6',
      step: '06',
      title: 'Deployment',
      description:
        'After the application passes internal QA, project management, and client approval, it is ready for deployment. Hosting options vary from client-owned servers to web or cloud hosting. We guide clients through these options and handle the final deployment stages.',
      icon: 'CloudUpload',
      tags: ['Cloud Infrastructure', 'CI/CD Pipeline', 'Live Launch'],
    },
  ],
};

const ICON_OPTIONS = [
  { id: 'EventNote', label: 'Planning / Notes', icon: Calendar },
  { id: 'GridView', label: 'Wireframe / Grid', icon: Grid },
  { id: 'Brush', label: 'Design / Brush', icon: Paintbrush },
  { id: 'Code', label: 'Development / Code', icon: Code2 },
  { id: 'BugReport', label: 'Testing / QA', icon: Bug },
  { id: 'CloudUpload', label: 'Deployment / Cloud', icon: CloudUpload },
  { id: 'Rocket', label: 'Launch / Rocket', icon: Rocket },
  { id: 'Shield', label: 'Security / Shield', icon: Shield },
  { id: 'Zap', label: 'Speed / Energy', icon: Zap },
  { id: 'Target', label: 'Strategy / Target', icon: Target },
  { id: 'Smartphone', label: 'Mobile / App', icon: Smartphone },
  { id: 'Cpu', label: 'Tech / System', icon: Cpu },
  { id: 'Lightbulb', label: 'Idea / Innovation', icon: Lightbulb },
  { id: 'CheckCircle', label: 'Success / Completed', icon: CheckCircle2 },
  { id: 'Boxes', label: 'Modules / Structure', icon: Boxes },
  { id: 'Compass', label: 'Discovery / Direction', icon: Compass },
];

function getIconComponent(iconName: string) {
  const match = ICON_OPTIONS.find((opt) => opt.id === iconName);
  return match ? match.icon : Calendar;
}

export default function ProcessStepsDashboardPage() {
  const [formData, setFormData] = useState<ProcessSectionData>(DEFAULT_PROCESS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewCardIndex, setPreviewCardIndex] = useState(0);
  const [newTagInputs, setNewTagInputs] = useState<{ [cardId: string]: string }>({});

  // Fetch current data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/process-steps', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          const rawCards = Array.isArray(json.data.cards) && json.data.cards.length > 0
            ? json.data.cards
            : DEFAULT_PROCESS_DATA.cards;

          const sanitizedCards: ProcessCard[] = rawCards.map((c: any, idx: number) => ({
            id: c.id || `step-${idx + 1}-${Date.now()}`,
            step: c.step || `${idx + 1}`.padStart(2, '0'),
            title: c.title ?? `Phase ${idx + 1}`,
            titleFontSize: c.titleFontSize || '3.75rem',
            description: c.description ?? '',
            descriptionFontSize: c.descriptionFontSize || '0.875rem',
            icon: c.icon || 'Rocket',
            tags: Array.isArray(c.tags)
              ? c.tags
              : typeof c.tags === 'string'
              ? (c.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean)
              : [],
            bgImage: c.bgImage || '',
          }));

          setFormData({
            badgeText: json.data.badgeText || DEFAULT_PROCESS_DATA.badgeText,
            badgeFontSize: json.data.badgeFontSize || DEFAULT_PROCESS_DATA.badgeFontSize || '0.75rem',
            headingPrefix: json.data.headingPrefix ?? DEFAULT_PROCESS_DATA.headingPrefix,
            headingFontSize: json.data.headingFontSize || DEFAULT_PROCESS_DATA.headingFontSize || '3.75rem',
            headingHighlight: json.data.headingHighlight || DEFAULT_PROCESS_DATA.headingHighlight,
            description: json.data.description || DEFAULT_PROCESS_DATA.description,
            descriptionFontSize: json.data.descriptionFontSize || DEFAULT_PROCESS_DATA.descriptionFontSize || '1rem',
            ctaText: json.data.ctaText || DEFAULT_PROCESS_DATA.ctaText,
            ctaLink: json.data.ctaLink || DEFAULT_PROCESS_DATA.ctaLink,
            cards: sanitizedCards,
          });
        }
      } catch (err) {
        console.error('Failed to load process data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Update Section Level text
  const handleSectionChange = (field: keyof Omit<ProcessSectionData, 'cards'>, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Add Card
  const handleAddCard = () => {
    const nextIndex = formData.cards.length + 1;
    const formattedStep = nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`;
    const newCard: ProcessCard = {
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      step: formattedStep,
      title: `Phase ${nextIndex}`,
      titleFontSize: '3.75rem',
      description: 'Enter comprehensive step description here outlining deliverables, client collaboration, and goals.',
      descriptionFontSize: '0.875rem',
      icon: 'Rocket',
      tags: ['Deliverables', 'Milestone'],
    };

    setFormData((prev) => ({
      ...prev,
      cards: [...prev.cards, newCard],
    }));

    setPreviewCardIndex(formData.cards.length);
  };

  // Duplicate Card
  const handleDuplicateCard = (index: number) => {
    const target = formData.cards[index];
    const duplicated: ProcessCard = {
      ...target,
      id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      step: `${formData.cards.length + 1}`.padStart(2, '0'),
      title: target.title ? `${target.title} (Copy)` : 'Copy',
      titleFontSize: target.titleFontSize || '3.75rem',
      descriptionFontSize: target.descriptionFontSize || '0.875rem',
      tags: Array.isArray(target.tags) ? [...target.tags] : [],
    };

    const newCards = [...formData.cards];
    newCards.splice(index + 1, 0, duplicated);
    setFormData((prev) => ({ ...prev, cards: newCards }));
    setPreviewCardIndex(index + 1);
  };

  // Delete Card
  const handleDeleteCard = async (index: number) => {
    if (formData.cards.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Card Required',
        text: 'You need at least one card in the process section.',
      });
      return;
    }

    const card = formData.cards[index];
    const result = await Swal.fire({
      title: `Delete "${card.title}"?`,
      text: 'Are you sure you want to remove this process card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      const updated = formData.cards.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, cards: updated }));
      if (previewCardIndex >= updated.length) {
        setPreviewCardIndex(Math.max(0, updated.length - 1));
      }
    }
  };

  // Move Card Up/Down
  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.cards.length) return;

    const updated = [...formData.cards];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, cards: updated }));
    setPreviewCardIndex(targetIndex);
  };

  // Edit Card property
  const handleCardChange = (index: number, field: keyof ProcessCard, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.cards];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, cards: updated };
    });
  };

  // Add Tag to Card (supports Enter, button click, and comma-separated tags)
  const handleAddTag = (cardIndex: number, specificTag?: string) => {
    const card = formData.cards[cardIndex];
    if (!card) return;
    const cardKey = card.id || `card-${cardIndex}`;
    const rawInput = specificTag !== undefined ? specificTag : (newTagInputs[cardKey] || newTagInputs[card.id] || '');
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Support comma-separated tags
    const tagsToAdd = trimmed
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tagsToAdd.length === 0) return;

    setFormData((prev) => {
      const updated = [...prev.cards];
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

      updated[cardIndex] = {
        ...currentCard,
        tags: existingTags,
      };
      return { ...prev, cards: updated };
    });

    // Clear input state
    setNewTagInputs((prev) => ({
      ...prev,
      [cardKey]: '',
      ...(card.id ? { [card.id]: '' } : {}),
      [cardIndex]: '',
    }));

    setPreviewCardIndex(cardIndex);
  };

  // Remove Tag from Card
  const handleRemoveTag = (cardIndex: number, tagIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.cards];
      const currentCard = updated[cardIndex];
      if (!currentCard) return prev;

      let tags: string[] = [];
      if (Array.isArray(currentCard.tags)) {
        tags = [...currentCard.tags];
      } else if (typeof currentCard.tags === 'string') {
        tags = (currentCard.tags as string).split(',').map((t) => t.trim()).filter(Boolean);
      }

      tags.splice(tagIndex, 1);
      updated[cardIndex] = { ...currentCard, tags };
      return { ...prev, cards: updated };
    });
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    const result = await Swal.fire({
      title: 'Reset to Defaults?',
      text: 'This will revert all titles, descriptions, and process cards to the original 6 default steps.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, reset',
    });

    if (result.isConfirmed) {
      setFormData(JSON.parse(JSON.stringify(DEFAULT_PROCESS_DATA)));
      setPreviewCardIndex(0);
    }
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // 1. Update localStorage cache for immediate page-level preview
      try {
        localStorage.setItem('digital_spyke_process_steps', JSON.stringify(formData));
      } catch (e) {}

      // 2. Persist to API
      const res = await fetch('/api/process-steps', {
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
          title: 'Process Steps updated successfully!',
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
        text: 'An error occurred while saving process steps.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[450px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 text-xs font-semibold">Loading Process Steps Settings...</p>
      </div>
    );
  }

  const activePreviewCard =
    formData.cards[previewCardIndex] || formData.cards[0] || null;
  const ActiveIcon = activePreviewCard
    ? getIconComponent(activePreviewCard.icon)
    : Calendar;

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
              {formData.cards.length} Process Steps Active
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Process Steps Configuration</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Full control over the &ldquo;Our Proven Process&rdquo; section on the home landing page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            type="button"
            className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            title="Reset to default original steps"
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
        {/* Left Column: Form Settings */}
        <div className="xl:col-span-7 space-y-6">
          {/* Section Header Controls */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Section Header & Text Settings</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top Badge Text (Rich Text Editor) */}
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
                    placeholder="OUR PROVEN PROCESS"
                  />
                </div>
              </div>

              {/* Main Heading Prefix (Rich Text Editor) */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span>Section Main Heading Title</span>
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
                    placeholder="e.g. We Simplify The"
                  />
                </div>
              </div>

              {/* Heading Highlight Word */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                  <span>Highlighted Glow Word (Suffix)</span>
                  <span className="text-[10px] text-cyan-600 font-medium">Gradient Cyan/Blue</span>
                </label>
                <input
                  type="text"
                  value={formData.headingHighlight}
                  onChange={(e) => handleSectionChange('headingHighlight', e.target.value)}
                  placeholder="Journey"
                  className="w-full px-3.5 py-2 text-xs border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-cyan-50/30 text-cyan-800 font-semibold"
                />
              </div>

              {/* CTA Button Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => handleSectionChange('ctaText', e.target.value)}
                  placeholder="Work With Us!"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
                />
              </div>
            </div>

            {/* Subtitle / Description (Rich Text Editor) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <span>Section Subtitle / Description</span>
                  <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                  <select
                    value={formData.descriptionFontSize || '1rem'}
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
                  placeholder="From initial ideation to live global deployment..."
                />
              </div>
            </div>

            {/* CTA Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">CTA Button Link URL</label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => handleSectionChange('ctaLink', e.target.value)}
                placeholder="/contact"
                className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
              />
            </div>
          </div>

          {/* Cards Management Area */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Process Cards ({formData.cards.length})</span>
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Add, edit, reorder, or delete cards. Changes appear in the live preview and on the website.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-blue-200 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step Card</span>
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-4">
              {formData.cards.map((card, index) => {
                const IconComp = getIconComponent(card.icon);
                const isSelectedForPreview = previewCardIndex === index;

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
                        <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-xs">
                          {card.step || `${index + 1}`.padStart(2, '0')}
                        </span>
                        <span className="font-bold text-slate-800 text-xs truncate max-w-[200px]">
                          {card.title || 'Untitled Step'}
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
                          disabled={index === formData.cards.length - 1}
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
                        {/* Step Number Tag */}
                        <div className="sm:col-span-4 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500">
                            Step Identifier
                          </label>
                          <input
                            type="text"
                            value={card.step}
                            onChange={(e) => handleCardChange(index, 'step', e.target.value)}
                            placeholder="01"
                            className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono font-bold bg-gray-50/40"
                          />
                        </div>

                        {/* Icon Picker */}
                        <div className="sm:col-span-8 space-y-1">
                          <label className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                            <span>Step Icon</span>
                            <IconComp className="w-3 h-3 text-blue-500" />
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
                      </div>

                      {/* Step Title (Rich Text Editor) & Size Control */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-700 flex items-center gap-1.5">
                            <span>Step Title</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text</span>
                          </label>

                          {/* Font Size Selector for Step Title */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={card.titleFontSize || '3.75rem'}
                              onChange={(e) => handleCardChange(index, 'titleFontSize', e.target.value)}
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
                            value={card.title}
                            onChange={(val) => handleCardChange(index, 'title', val)}
                            modules={titleQuillModules}
                            formats={titleQuillFormats}
                            placeholder="e.g. Planning"
                          />
                        </div>
                      </div>

                      {/* Step Subtitle / Description (Rich Text Editor) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <span>Step Subtitle / Description</span>
                            <span className="text-[10px] text-blue-600 font-medium">Rich Text Editor</span>
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">Title Size:</span>
                            <select
                              value={card.descriptionFontSize || '0.875rem'}
                              onChange={(e) => handleCardChange(index, 'descriptionFontSize', e.target.value)}
                              className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none shadow-xs"
                            >
                              {STEP_DESCRIPTION_FONT_OPTIONS.map((opt) => (
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
                            placeholder="Describe this stage in your process..."
                          />
                        </div>
                      </div>

                      {/* Tags Manager (Pill Tags / Highlights) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-blue-500" />
                            <span>Pill Tags (Highlights)</span>
                          </label>
                          <span className="text-[10px] text-gray-400">Press Enter or click + to add tags</span>
                        </div>

                        {/* Existing tags container */}
                        <div className="flex flex-wrap gap-1.5 items-center min-h-[36px] p-2 bg-gray-50/70 rounded-xl border border-gray-200/80">
                          {(Array.isArray(card.tags)
                            ? card.tags
                            : typeof card.tags === 'string'
                            ? (card.tags as string).split(',').map((t) => t.trim()).filter(Boolean)
                            : []
                          ).map((tag, tagIdx) => (
                            <span
                              key={`${tag}-${tagIdx}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs transition-all hover:bg-blue-100"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveTag(index, tagIdx);
                                }}
                                className="hover:text-red-600 font-bold ml-0.5 text-sm leading-none transition-colors p-0.5"
                                title="Remove tag"
                              >
                                &times;
                              </button>
                            </span>
                          ))}

                          {/* Add Tag Input */}
                          <div className="inline-flex items-center gap-1.5">
                            <input
                              type="text"
                              value={newTagInputs[card.id || `card-${index}`] || ''}
                              onChange={(e) => {
                                const key = card.id || `card-${index}`;
                                setNewTagInputs((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
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
                              className="px-3 py-1 text-xs border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-32 bg-white"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddTag(index);
                              }}
                              className="p-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center justify-center cursor-pointer"
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

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
                className="inline-flex items-center justify-center px-3.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
              >
                {isHtml(formData.badgeText) ? (
                  <span
                    className="font-bold tracking-[0.2em] uppercase text-white [&_p]:inline [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: formData.badgeText }}
                  />
                ) : (
                  <span className="font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                    {formData.badgeText || 'OUR PROVEN PROCESS'}
                  </span>
                )}
              </div>

              {/* Main Heading */}
              <h3
                style={formData.headingFontSize ? { fontSize: formData.headingFontSize } : undefined}
                className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight"
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
                  <span className="relative inline-block ml-1.5">
                    <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 blur-lg opacity-35" />
                    <span className="relative bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      {formData.headingHighlight}
                    </span>
                  </span>
                ) : null}
              </h3>

              {/* Subtitle */}
              {isHtml(formData.description) ? (
                <div
                  style={formData.descriptionFontSize ? { fontSize: formData.descriptionFontSize } : undefined}
                  className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              ) : (
                <p
                  style={formData.descriptionFontSize ? { fontSize: formData.descriptionFontSize } : undefined}
                  className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto"
                >
                  {formData.description}
                </p>
              )}
            </div>

            {/* Card Stepper Switcher */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 relative z-10">
              {formData.cards.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPreviewCardIndex(i)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${
                    previewCardIndex === i
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-1 ring-cyan-400'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Step {c.step || `${i + 1}`.padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Card Replica Preview */}
            {activePreviewCard && (
              <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0b0e1b] to-[#060811] border border-blue-500/30 shadow-[0_0_30px_rgba(0,85,255,0.15)] relative overflow-hidden transition-all duration-300">
                {/* Decorative Grid Lines */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Big decorative step watermark */}
                <div className="absolute right-4 top-2 text-6xl sm:text-7xl font-black font-sans select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-blue-500/40 via-blue-700/20 to-transparent">
                  {activePreviewCard.step || '01'}
                </div>

                {/* Top left Icon & Step Tag */}
                <div className="flex flex-col items-start gap-1.5 relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl border border-blue-500/40 bg-gradient-to-br from-blue-500/25 to-[#080b18] shadow-[0_8px_20px_rgba(0,85,255,0.35)] flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full mt-1">
                    Step {activePreviewCard.step || '01'}
                  </span>
                </div>

                {/* Title */}
                <div className="text-center py-4 relative z-10">
                  {isHtml(activePreviewCard.title) ? (
                    <div
                      style={activePreviewCard.titleFontSize ? { fontSize: activePreviewCard.titleFontSize } : undefined}
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white [&_p]:m-0 drop-shadow-[0_0_20px_rgba(0,153,255,0.35)] leading-tight"
                      dangerouslySetInnerHTML={{ __html: activePreviewCard.title }}
                    />
                  ) : (
                    <h4
                      style={activePreviewCard.titleFontSize ? { fontSize: activePreviewCard.titleFontSize } : undefined}
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-tight"
                    >
                      {activePreviewCard.title || 'Step Title'}
                    </h4>
                  )}
                </div>

                {/* Divider Line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-3 relative z-10" />

                {/* Description */}
                {isHtml(activePreviewCard.description) ? (
                  <div
                    style={activePreviewCard.descriptionFontSize ? { fontSize: activePreviewCard.descriptionFontSize } : undefined}
                    className="text-xs text-gray-300/90 leading-relaxed text-center max-w-sm mx-auto mb-4 relative z-10 font-normal [&_p]:m-0 [&_p+p]:mt-1.5 [&_a]:text-cyan-400 [&_strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: activePreviewCard.description }}
                  />
                ) : (
                  <p
                    style={activePreviewCard.descriptionFontSize ? { fontSize: activePreviewCard.descriptionFontSize } : undefined}
                    className="text-xs text-gray-300/90 leading-relaxed text-center max-w-sm mx-auto mb-4 relative z-10 font-normal"
                  >
                    {activePreviewCard.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 justify-center relative z-10">
                  {(Array.isArray(activePreviewCard.tags)
                    ? activePreviewCard.tags
                    : typeof activePreviewCard.tags === 'string'
                    ? (activePreviewCard.tags as string).split(',').map((t) => t.trim()).filter(Boolean)
                    : []
                  ).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-300 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA Button Preview */}
            <div className="pt-2 text-center relative z-10">
              <a
                href={formData.ctaLink || '/contact'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-[0_4px_20px_rgba(0,85,255,0.35)] transition-all"
              >
                <span>{formData.ctaText || 'Work With Us!'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
