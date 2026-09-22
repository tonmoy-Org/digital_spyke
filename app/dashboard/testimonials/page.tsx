'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import Marquee from 'react-fast-marquee';
import 'react-quill/dist/quill.snow.css';
import {
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Copy,
  Star,
  Upload,
  Image as ImageIcon,
  User,
  UserCheck,
  Building2,
  Briefcase,
  Quote,
  Award,
  Crown,
  Heart,
  Shield,
  ThumbsUp,
  Zap,
  CheckCircle2,
  MessageSquareQuote,
  X,
  Smile,
  Compass,
  Layers,
  Edit3,
  Check,
} from 'lucide-react';
import {
  TestimonialItem,
  TestimonialsSectionData,
  DEFAULT_TESTIMONIALS_DATA,
} from '@/types/testimonials';

// Dynamically import ReactQuill to prevent SSR hydration errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-10 bg-gray-50 border border-gray-200 rounded-lg animate-pulse flex items-center justify-center text-xs text-gray-400">
      Loading Editor...
    </div>
  ),
});

// Font Size Options
const HEADING_FONT_OPTIONS = [
  { label: 'Small (1.75rem / 28px)', value: '1.75rem' },
  { label: 'Medium (2.25rem / 36px)', value: '2.25rem' },
  { label: 'Default (2.5rem / 40px)', value: '2.5rem' },
  { label: 'Large (3rem / 48px)', value: '3rem' },
  { label: 'Extra Large (3.75rem / 60px)', value: '3.75rem' },
  { label: 'Huge (4.5rem / 72px)', value: '4.5rem' },
];

const SUBTITLE_FONT_OPTIONS = [
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
];

const AUTHOR_FONT_OPTIONS = [
  { label: 'Small (0.8125rem / 13px)', value: '0.8125rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Medium (1rem / 16px)', value: '1rem' },
  { label: 'Large (1.125rem / 18px)', value: '1.125rem' },
];

const ROLE_FONT_OPTIONS = [
  { label: 'Tiny (0.6875rem / 11px)', value: '0.6875rem' },
  { label: 'Default (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Medium (0.8125rem / 13px)', value: '0.8125rem' },
  { label: 'Base (0.875rem / 14px)', value: '0.875rem' },
];

const COMPANY_FONT_OPTIONS = [
  { label: 'Tiny (0.6875rem / 11px)', value: '0.6875rem' },
  { label: 'Default (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Medium (0.8125rem / 13px)', value: '0.8125rem' },
  { label: 'Base (0.875rem / 14px)', value: '0.875rem' },
];

const FEEDBACK_FONT_OPTIONS = [
  { label: 'Small (0.8rem / 12.8px)', value: '0.8rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Medium (0.9rem / 14.4px)', value: '0.9rem' },
  { label: 'Large (1rem / 16px)', value: '1rem' },
  { label: 'Extra Large (1.125rem / 18px)', value: '1.125rem' },
];

// Compact Quill Toolbar configurations
const compactQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    ['clean'],
  ],
};
const compactQuillFormats = ['bold', 'italic', 'underline', 'color'];

const fullQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};
const fullQuillFormats = ['bold', 'italic', 'underline', 'color', 'background'];

// Preset Colors for Avatar Background
const AVATAR_COLOR_PRESETS = [
  { label: 'Purple', value: 'rgba(107, 70, 255, 0.25)' },
  { label: 'Cyan', value: 'rgba(0, 255, 171, 0.25)' },
  { label: 'Blue', value: 'rgba(0, 136, 255, 0.25)' },
  { label: 'Indigo', value: 'rgba(79, 70, 229, 0.3)' },
  { label: 'Rose', value: 'rgba(244, 63, 94, 0.25)' },
  { label: 'Amber', value: 'rgba(245, 158, 11, 0.25)' },
  { label: 'Emerald', value: 'rgba(16, 185, 129, 0.25)' },
];

// Available Icons for selection
const ICON_OPTIONS = [
  { id: 'User', label: 'User', icon: User },
  { id: 'UserCheck', label: 'Verified', icon: UserCheck },
  { id: 'Building2', label: 'Business', icon: Building2 },
  { id: 'Briefcase', label: 'Corporate', icon: Briefcase },
  { id: 'Quote', label: 'Quote', icon: Quote },
  { id: 'Star', label: 'Star', icon: Star },
  { id: 'Award', label: 'Award', icon: Award },
  { id: 'Crown', label: 'VIP', icon: Crown },
  { id: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'Heart', label: 'Love', icon: Heart },
  { id: 'Shield', label: 'Shield', icon: Shield },
  { id: 'ThumbsUp', label: 'Like', icon: ThumbsUp },
  { id: 'Zap', label: 'Speed', icon: Zap },
  { id: 'CheckCircle2', label: 'Checked', icon: CheckCircle2 },
  { id: 'Smile', label: 'Happy', icon: Smile },
  { id: 'Compass', label: 'Compass', icon: Compass },
  { id: 'Layers', label: 'Layers', icon: Layers },
];

// Helper to safely strip HTML tags from text
function stripHtml(html?: string): string {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function TestimonialsAdminPage() {
  const [formData, setFormData] = useState<TestimonialsSectionData>(DEFAULT_TESTIMONIALS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [rowFilter, setRowFilter] = useState<'all' | 'row1' | 'row2'>('all');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Derive the active editing card from formData (Single Source of Truth)
  const editingCard = formData.testimonials.find((c) => c.id === editingCardId) || null;

  // Fetch data
  useEffect(() => {
    async function loadData() {
      try {
        const cached = localStorage.getItem('digital_spyke_testimonials');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && Array.isArray(parsed.testimonials)) {
            setFormData(parsed);
          }
        }

        const res = await fetch('/api/testimonials', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setFormData(json.data);
          try {
            localStorage.setItem('digital_spyke_testimonials', JSON.stringify(json.data));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Save Settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      try {
        localStorage.setItem('digital_spyke_testimonials', JSON.stringify(formData));
      } catch (e) {}

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: 'success',
          title: 'Saved successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: data.message || 'Failed to save testimonials',
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Add Card
  const handleAddNewCard = (row: 'row1' | 'row2' = 'row1') => {
    const newId = `testi-${Date.now()}`;
    const newCard: TestimonialItem = {
      id: newId,
      author: 'Client Name',
      authorFontSize: '0.875rem',
      role: '@Position',
      roleFontSize: '0.75rem',
      company: 'Company Name',
      companyFontSize: '0.75rem',
      feedback:
        'Digital Spyke delivered exceptional results for our business. Highly professional and recommended!',
      feedbackFontSize: '0.9rem',
      rating: 5,
      avatarType: 'initials',
      avatarBgColor: 'rgba(107, 70, 255, 0.25)',
      row: row,
    };

    setFormData((prev) => ({
      ...prev,
      testimonials: [newCard, ...prev.testimonials],
    }));
    setEditingCardId(newId);
  };

  // Duplicate Card
  const handleDuplicateCard = (card: TestimonialItem) => {
    const duplicated: TestimonialItem = {
      ...card,
      id: `testi-${Date.now()}`,
      author: `${stripHtml(card.author)} (Copy)`,
    };
    setFormData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, duplicated],
    }));
  };

  // Delete Card
  const handleDeleteCard = (id: string, name: string) => {
    Swal.fire({
      title: 'Delete testimonial?',
      text: `Are you sure you want to remove "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => ({
          ...prev,
          testimonials: prev.testimonials.filter((c) => c.id !== id),
        }));
        if (editingCardId === id) setEditingCardId(null);
      }
    });
  };

  // Reorder Card
  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.testimonials.length) return;

    const updated = [...formData.testimonials];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setFormData((prev) => ({ ...prev, testimonials: updated }));
  };

  // Update card in form state (with equality check to prevent infinite re-render loop from Quill)
  const handleUpdateEditingCard = (field: keyof TestimonialItem, value: any) => {
    if (!editingCardId) return;
    setFormData((prev) => {
      const card = prev.testimonials.find((c) => c.id === editingCardId);
      if (!card || card[field] === value) return prev;
      return {
        ...prev,
        testimonials: prev.testimonials.map((c) =>
          c.id === editingCardId ? { ...c, [field]: value } : c
        ),
      };
    });
  };

  // Image Upload handler
  const handleImageUpload = async (file: File) => {
    if (!editingCardId) return;
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        handleUpdateEditingCard('avatarImage', data.url);
        handleUpdateEditingCard('avatarType', 'image');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: data.message || 'Image upload failed',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'Failed to upload image.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredTestimonials = formData.testimonials.filter((c) => {
    if (rowFilter === 'row1') return c.row === 'row1';
    if (rowFilter === 'row2') return c.row === 'row2';
    return true;
  });

  const row1Count = formData.testimonials.filter((c) => c.row === 'row1').length;
  const row2Count = formData.testimonials.filter((c) => c.row === 'row2').length;

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 text-xs font-semibold">Loading Testimonials...</p>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-400 font-medium mb-1">
            Home Landing Page / Testimonials & Reviews
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-blue-600" />
            <span>Testimonials & Reviews</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HEADER & MARQUEE SETTINGS */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Section Header Settings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Heading Text Editor + Size */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Section Heading</label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500">Size:</span>
                <select
                  value={formData.headingFontSize || '2.5rem'}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, headingFontSize: e.target.value }))
                  }
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-blue-500"
                >
                  {HEADING_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[60px] [&_.ql-editor]:text-xs">
              <ReactQuill
                theme="snow"
                value={
                  formData.headingHtml ||
                  `${formData.headingPrefix || ''}${formData.headingHighlight || ''}${formData.headingSuffix || ''}`
                }
                onChange={(val) => {
                  setFormData((prev) => (prev.headingHtml === val ? prev : { ...prev, headingHtml: val }));
                }}
                modules={compactQuillModules}
                formats={compactQuillFormats}
                placeholder="Section heading text..."
              />
            </div>
          </div>

          {/* Subtitle Text Editor + Size */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Section Subtitle</label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500">Size:</span>
                <select
                  value={formData.descriptionFontSize || '1rem'}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descriptionFontSize: e.target.value }))
                  }
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-blue-500"
                >
                  {SUBTITLE_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[60px] [&_.ql-editor]:text-xs">
              <ReactQuill
                theme="snow"
                value={formData.descriptionHtml || formData.description || ''}
                onChange={(val) => {
                  setFormData((prev) => {
                    if (prev.descriptionHtml === val) return prev;
                    return {
                      ...prev,
                      description: stripHtml(val),
                      descriptionHtml: val,
                    };
                  });
                }}
                modules={compactQuillModules}
                formats={compactQuillFormats}
                placeholder="Section subtitle text..."
              />
            </div>
          </div>
        </div>

        {/* Marquee Speed & Pause Controls */}
        <div className="pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
              <span>Row 1 Speed (Left)</span>
              <span className="text-blue-600">{formData.row1Speed || 30}s</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.row1Speed || 30}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, row1Speed: Number(e.target.value) }))
              }
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
              <span>Row 2 Speed (Right)</span>
              <span className="text-purple-600">{formData.row2Speed || 30}s</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.row2Speed || 30}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, row2Speed: Number(e.target.value) }))
              }
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-xl">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Pause on Hover</span>
              <span className="text-[10px] text-gray-400">Pause cards when hovered</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, pauseOnHover: !prev.pauseOnHover }))
              }
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                formData.pauseOnHover ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${
                  formData.pauseOnHover ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: TESTIMONIAL CARDS LIST */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Testimonials List ({formData.testimonials.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRowFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  rowFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-gray-500'
                }`}
              >
                All ({formData.testimonials.length})
              </button>
              <button
                type="button"
                onClick={() => setRowFilter('row1')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  rowFilter === 'row1' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500'
                }`}
              >
                Row 1 ({row1Count})
              </button>
              <button
                type="button"
                onClick={() => setRowFilter('row2')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  rowFilter === 'row2' ? 'bg-white text-purple-600 shadow-xs' : 'text-gray-500'
                }`}
              >
                Row 2 ({row2Count})
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleAddNewCard(rowFilter === 'row2' ? 'row2' : 'row1')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTestimonials.map((card) => {
            const globalIndex = formData.testimonials.findIndex((c) => c.id === card.id);
            const isSelectedForEdit = editingCardId === card.id;

            return (
              <div
                key={card.id}
                className={`border rounded-2xl p-4 flex flex-col justify-between transition-all bg-white ${
                  isSelectedForEdit
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-gray-200/80 hover:border-gray-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Bar: Avatar, Info, Row Tag */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-white/20 overflow-hidden text-white shadow-xs"
                        style={{
                          backgroundColor: card.avatarBgColor || 'rgba(107, 70, 255, 0.25)',
                        }}
                      >
                        {card.avatarType === 'image' && card.avatarImage ? (
                          <img
                            src={card.avatarImage}
                            alt={stripHtml(card.author)}
                            className="w-full h-full object-cover"
                          />
                        ) : card.avatarType === 'icon' && card.avatarIcon ? (
                          (() => {
                            const iconObj = ICON_OPTIONS.find((i) => i.id === card.avatarIcon);
                            const IconCmp = iconObj ? iconObj.icon : User;
                            return <IconCmp className="w-4 h-4 text-white" />;
                          })()
                        ) : (
                          <span>{stripHtml(card.author).charAt(0) || 'A'}</span>
                        )}
                      </div>

                      <div>
                        <div
                          className="font-bold text-slate-800 text-xs leading-tight [&_p]:m-0 [&_p]:inline"
                          dangerouslySetInnerHTML={{ __html: card.author || 'Author' }}
                        />
                        <div
                          className="text-[11px] text-gray-500 leading-tight [&_p]:m-0 [&_p]:inline"
                          dangerouslySetInnerHTML={{ __html: card.role || '@Role' }}
                        />
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        card.row === 'row1'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {card.row === 'row1' ? 'Row 1' : 'Row 2'}
                    </span>
                  </div>

                  {/* Rating & Company */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < card.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className="text-[11px] font-semibold text-gray-600 italic truncate max-w-[120px] [&_p]:m-0 [&_p]:inline"
                      dangerouslySetInnerHTML={{ __html: `"${stripHtml(card.company)}"` }}
                    />
                  </div>

                  {/* Feedback Snippet */}
                  <div
                    className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: card.feedback || '' }}
                  />
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveCard(globalIndex, 'up')}
                      disabled={globalIndex === 0}
                      title="Move Up"
                      className="p-1 text-gray-400 hover:text-slate-800 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveCard(globalIndex, 'down')}
                      disabled={globalIndex === formData.testimonials.length - 1}
                      title="Move Down"
                      className="p-1 text-gray-400 hover:text-slate-800 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateCard(card)}
                      title="Duplicate"
                      className="p-1 text-gray-400 hover:text-blue-600 rounded"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(card.id, stripHtml(card.author))}
                      title="Delete"
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Explicit Edit Button */}
                  <button
                    type="button"
                    onClick={() => setEditingCardId(isSelectedForEdit ? null : card.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isSelectedForEdit
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isSelectedForEdit ? 'Editing' : 'Edit'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: DEDICATED EDIT CARD PANEL (Appears whenever editingCard is active) */}
      {editingCard && (
        <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-lg space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Edit Testimonial:{' '}
                <span className="text-blue-600">
                  {stripHtml(editingCard.author) || 'Card'}
                </span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setEditingCardId(null)}
              className="text-xs font-bold px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Done Editing</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Row */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Marquee Row
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateEditingCard('row', 'row1')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    editingCard.row === 'row1'
                      ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Row 1 (Left Marquee)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateEditingCard('row', 'row2')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    editingCard.row === 'row2'
                      ? 'bg-purple-50 border-purple-500 text-purple-600 shadow-xs'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Row 2 (Right Marquee)
                </button>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => handleUpdateEditingCard('rating', starVal)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starVal <= editingCard.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-700 ml-2">
                  {editingCard.rating} / 5 Stars
                </span>
              </div>
            </div>
          </div>

          {/* EVERY TEXT FIELD HAS A TEXT EDITOR + FONT SIZE CONTROL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Author Name Text Editor + Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Author Name</label>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">Size:</span>
                  <select
                    value={editingCard.authorFontSize || '0.875rem'}
                    onChange={(e) => handleUpdateEditingCard('authorFontSize', e.target.value)}
                    className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none"
                  >
                    {AUTHOR_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[46px] [&_.ql-editor]:text-xs">
                <ReactQuill
                  key={`${editingCard.id}-author`}
                  theme="snow"
                  value={editingCard.author || ''}
                  onChange={(val) => handleUpdateEditingCard('author', val)}
                  modules={compactQuillModules}
                  formats={compactQuillFormats}
                  placeholder="e.g. Emily J"
                />
              </div>
            </div>

            {/* Role / Handle Text Editor + Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Role / Handle</label>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">Size:</span>
                  <select
                    value={editingCard.roleFontSize || '0.75rem'}
                    onChange={(e) => handleUpdateEditingCard('roleFontSize', e.target.value)}
                    className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none"
                  >
                    {ROLE_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[46px] [&_.ql-editor]:text-xs">
                <ReactQuill
                  key={`${editingCard.id}-role`}
                  theme="snow"
                  value={editingCard.role || ''}
                  onChange={(val) => handleUpdateEditingCard('role', val)}
                  modules={compactQuillModules}
                  formats={compactQuillFormats}
                  placeholder="e.g. @Agency Owner"
                />
              </div>
            </div>

            {/* Company Tag Text Editor + Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Company / Tag</label>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">Size:</span>
                  <select
                    value={editingCard.companyFontSize || '0.75rem'}
                    onChange={(e) => handleUpdateEditingCard('companyFontSize', e.target.value)}
                    className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none"
                  >
                    {COMPANY_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[46px] [&_.ql-editor]:text-xs">
                <ReactQuill
                  key={`${editingCard.id}-company`}
                  theme="snow"
                  value={editingCard.company || ''}
                  onChange={(val) => handleUpdateEditingCard('company', val)}
                  modules={compactQuillModules}
                  formats={compactQuillFormats}
                  placeholder="e.g. NUTRIMERCHANT"
                />
              </div>
            </div>
          </div>

          {/* Avatar / Media Controls */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Avatar & Media Options</span>
              </label>

              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => handleUpdateEditingCard('avatarType', 'initials')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    editingCard.avatarType === 'initials'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-slate-800'
                  }`}
                >
                  Initials
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateEditingCard('avatarType', 'image')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    editingCard.avatarType === 'image'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-slate-800'
                  }`}
                >
                  Photo Image
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateEditingCard('avatarType', 'icon')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    editingCard.avatarType === 'icon'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-slate-800'
                  }`}
                >
                  Icon
                </button>
              </div>
            </div>

            {/* Initials configuration */}
            {editingCard.avatarType === 'initials' && (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/20"
                  style={{
                    backgroundColor: editingCard.avatarBgColor || 'rgba(107, 70, 255, 0.25)',
                  }}
                >
                  {stripHtml(editingCard.author).charAt(0) || 'A'}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_COLOR_PRESETS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => handleUpdateEditingCard('avatarBgColor', c.value)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        editingCard.avatarBgColor === c.value
                          ? 'border-blue-600 scale-110 shadow-xs'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.label}
                    />
                  ))}
                  <input
                    type="text"
                    value={editingCard.avatarBgColor || ''}
                    onChange={(e) => handleUpdateEditingCard('avatarBgColor', e.target.value)}
                    placeholder="custom color or rgba"
                    className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-lg w-32 text-gray-700"
                  />
                </div>
              </div>
            )}

            {/* Image upload */}
            {editingCard.avatarType === 'image' && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
                  {editingCard.avatarImage ? (
                    <img
                      src={editingCard.avatarImage}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <label className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={editingCard.avatarImage || ''}
                    onChange={(e) => handleUpdateEditingCard('avatarImage', e.target.value)}
                    placeholder="Or paste image URL"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl text-gray-800"
                  />

                  {editingCard.avatarImage && (
                    <button
                      type="button"
                      onClick={() => handleUpdateEditingCard('avatarImage', '')}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Icon selection */}
            {editingCard.avatarType === 'icon' && (
              <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 pt-1">
                {ICON_OPTIONS.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = editingCard.avatarIcon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleUpdateEditingCard('avatarIcon', item.id)}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 border transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                      }`}
                      title={item.label}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span className="text-[9px] truncate w-full text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Feedback Text Editor + Size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Testimonial Feedback / Review Text
              </label>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400">Size:</span>
                <select
                  value={editingCard.feedbackFontSize || '0.9rem'}
                  onChange={(e) => handleUpdateEditingCard('feedbackFontSize', e.target.value)}
                  className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-700 focus:outline-none"
                >
                  {FEEDBACK_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[80px] [&_.ql-editor]:text-xs">
              <ReactQuill
                key={`${editingCard.id}-feedback`}
                theme="snow"
                value={editingCard.feedback || ''}
                onChange={(val) => handleUpdateEditingCard('feedback', val)}
                modules={fullQuillModules}
                formats={fullQuillFormats}
                placeholder="Write the client's detailed testimonial..."
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PERMANENT LIVE PREVIEW BELOW THE PAGE */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-sm font-bold text-slate-800">
              Live Website Preview (Updates in Real-Time)
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Shows exactly how your live site renders
          </span>
        </div>

        {/* Live Section Render */}
        <div className="bg-[#030712] rounded-3xl py-10 px-4 md:px-8 border border-white/10 shadow-2xl space-y-8 overflow-hidden">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <div
              className="font-medium text-white tracking-tight leading-tight [&_p]:m-0 [&_p]:inline"
              style={{ fontSize: formData.headingFontSize || '2.5rem' }}
              dangerouslySetInnerHTML={{
                __html:
                  formData.headingHtml ||
                  `${formData.headingPrefix || ''}<span style="background: linear-gradient(to right, #00FFAB, #6B46FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; display: inline-block;">${formData.headingHighlight || ''}</span>${formData.headingSuffix || ''}`,
              }}
            />

            <div
              className="text-white/70 leading-relaxed [&_p]:m-0"
              style={{ fontSize: formData.descriptionFontSize || '1rem' }}
              dangerouslySetInnerHTML={{
                __html: formData.descriptionHtml || formData.description || '',
              }}
            />
          </div>

          {/* Marquee Row 1 */}
          <div>
            <Marquee
              gradient={true}
              speed={formData.row1Speed || 30}
              pauseOnHover={formData.pauseOnHover !== false}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={80}
              style={{ width: '100%' }}
            >
              {formData.testimonials
                .filter((c) => c.row === 'row1')
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-[320px] min-w-[320px] m-3 p-5 rounded-xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="h-[1px] absolute top-0 left-8 right-8 bg-gradient-to-r from-transparent via-[#0055ff] to-transparent" />
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/20 overflow-hidden"
                        style={{
                          backgroundColor:
                            testimonial.avatarBgColor || 'rgba(107, 70, 255, 0.2)',
                        }}
                      >
                        {testimonial.avatarType === 'image' && testimonial.avatarImage ? (
                          <img
                            src={testimonial.avatarImage}
                            alt={stripHtml(testimonial.author)}
                            className="w-full h-full object-cover"
                          />
                        ) : testimonial.avatarType === 'icon' && testimonial.avatarIcon ? (
                          (() => {
                            const iconObj = ICON_OPTIONS.find((i) => i.id === testimonial.avatarIcon);
                            const IconCmp = iconObj ? iconObj.icon : User;
                            return <IconCmp className="w-4 h-4 text-white" />;
                          })()
                        ) : (
                          <span>{stripHtml(testimonial.author).charAt(0) || 'A'}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div
                          className="font-medium text-white leading-tight [&_p]:m-0 [&_p]:inline"
                          style={{ fontSize: testimonial.authorFontSize || '0.875rem' }}
                          dangerouslySetInnerHTML={{ __html: testimonial.author || '' }}
                        />
                        <div
                          className="text-white/70 block leading-tight mt-0.5 [&_p]:m-0 [&_p]:inline"
                          style={{ fontSize: testimonial.roleFontSize || '0.75rem' }}
                          dangerouslySetInnerHTML={{ __html: testimonial.role || '' }}
                        />
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < testimonial.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="italic text-white/90 mb-2 font-medium mt-2 [&_p]:m-0 [&_p]:inline"
                      style={{ fontSize: testimonial.companyFontSize || '0.75rem' }}
                      dangerouslySetInnerHTML={{ __html: `"${stripHtml(testimonial.company)}"` }}
                    />

                    <div
                      className="text-white/85 leading-relaxed text-xs [&_p]:m-0"
                      style={{ fontSize: testimonial.feedbackFontSize || '0.875rem' }}
                      dangerouslySetInnerHTML={{ __html: testimonial.feedback || '' }}
                    />
                  </div>
                ))}
            </Marquee>
          </div>

          {/* Marquee Row 2 */}
          <div>
            <Marquee
              direction="right"
              gradient={true}
              speed={formData.row2Speed || 30}
              pauseOnHover={formData.pauseOnHover !== false}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={80}
              style={{ width: '100%' }}
            >
              {formData.testimonials
                .filter((c) => c.row === 'row2')
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-[320px] min-w-[320px] m-3 p-5 rounded-xl border border-white/10 bg-white/[0.01] backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="h-[0.5px] absolute top-0 left-8 right-8 bg-gradient-to-r from-transparent via-[#0055ff] to-transparent" />
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/20 overflow-hidden"
                        style={{
                          backgroundColor:
                            testimonial.avatarBgColor || 'rgba(107, 70, 255, 0.2)',
                        }}
                      >
                        {testimonial.avatarType === 'image' && testimonial.avatarImage ? (
                          <img
                            src={testimonial.avatarImage}
                            alt={stripHtml(testimonial.author)}
                            className="w-full h-full object-cover"
                          />
                        ) : testimonial.avatarType === 'icon' && testimonial.avatarIcon ? (
                          (() => {
                            const iconObj = ICON_OPTIONS.find((i) => i.id === testimonial.avatarIcon);
                            const IconCmp = iconObj ? iconObj.icon : User;
                            return <IconCmp className="w-4 h-4 text-white" />;
                          })()
                        ) : (
                          <span>{stripHtml(testimonial.author).charAt(0) || 'A'}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div
                          className="font-medium text-white leading-tight [&_p]:m-0 [&_p]:inline"
                          style={{ fontSize: testimonial.authorFontSize || '0.875rem' }}
                          dangerouslySetInnerHTML={{ __html: testimonial.author || '' }}
                        />
                        <div
                          className="text-white/70 block leading-tight mt-0.5 [&_p]:m-0 [&_p]:inline"
                          style={{ fontSize: testimonial.roleFontSize || '0.75rem' }}
                          dangerouslySetInnerHTML={{ __html: testimonial.role || '' }}
                        />
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < testimonial.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="italic text-white/90 mb-2 font-medium mt-2 [&_p]:m-0 [&_p]:inline"
                      style={{ fontSize: testimonial.companyFontSize || '0.75rem' }}
                      dangerouslySetInnerHTML={{ __html: `"${stripHtml(testimonial.company)}"` }}
                    />

                    <div
                      className="text-white/85 leading-relaxed text-xs [&_p]:m-0"
                      style={{ fontSize: testimonial.feedbackFontSize || '0.875rem' }}
                      dangerouslySetInnerHTML={{ __html: testimonial.feedback || '' }}
                    />
                  </div>
                ))}
            </Marquee>
          </div>
        </div>
      </div>
    </main>
  );
}
