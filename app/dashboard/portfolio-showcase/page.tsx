'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import {
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Copy,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Edit3,
  Check,
  X,
  Briefcase,
  Layers,
  FolderKanban,
  Star,
  Award,
  Crown,
  Zap,
  CheckCircle2,
  Circle,
  Eye,
} from 'lucide-react';
import {
  PortfolioProduct,
  PortfolioSectionData,
  DEFAULT_PORTFOLIO_DATA,
} from '@/types/portfolio';

// Dynamically load ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-10 bg-gray-50 border border-gray-200 rounded-lg animate-pulse flex items-center justify-center text-xs text-gray-400">
      Loading Editor...
    </div>
  ),
});

// Font size options
const BADGE_FONT_OPTIONS = [
  { label: 'Small (0.75rem / 12px)', value: '0.75rem' },
  { label: 'Medium (0.8125rem / 13px)', value: '0.8125rem' },
  { label: 'Default (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Large (1rem / 16px)', value: '1rem' },
  { label: 'Extra Large (1.125rem / 18px)', value: '1.125rem' },
];

const HEADING_FONT_OPTIONS = [
  { label: 'Small (2.25rem / 36px)', value: '2.25rem' },
  { label: 'Medium (3rem / 48px)', value: '3rem' },
  { label: 'Large (3.75rem / 60px)', value: '3.75rem' },
  { label: 'Default (4.5rem / 72px)', value: '4.5rem' },
  { label: 'Huge (5rem / 80px)', value: '5rem' },
];

const SUBTITLE_FONT_OPTIONS = [
  { label: 'Small (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Default (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Extra Large (1.5rem / 24px)', value: '1.5rem' },
];

const CARD_TITLE_FONT_OPTIONS = [
  { label: 'Small (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Default (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Extra Large (1.5rem / 24px)', value: '1.5rem' },
];

// Quill modules
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

// Available Icons for Badge
const BADGE_ICONS = [
  { id: 'Dot', label: 'Glowing Dot', icon: Circle },
  { id: 'Sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'Briefcase', label: 'Briefcase', icon: Briefcase },
  { id: 'Layers', label: 'Layers', icon: Layers },
  { id: 'FolderKanban', label: 'Projects', icon: FolderKanban },
  { id: 'Star', label: 'Star', icon: Star },
  { id: 'Award', label: 'Award', icon: Award },
  { id: 'Crown', label: 'Crown', icon: Crown },
  { id: 'Zap', label: 'Zap', icon: Zap },
  { id: 'CheckCircle2', label: 'Checkmark', icon: CheckCircle2 },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Dot: Circle,
  Sparkles,
  Briefcase,
  Layers,
  FolderKanban,
  Star,
  Award,
  Crown,
  Zap,
  CheckCircle2,
};

const COLOR_PRESETS = [
  { label: 'Sky Blue', value: '#38bdf8' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'White', value: '#ffffff' },
];

// Helper to strip HTML tags safely
const stripHtml = (html?: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

export default function PortfolioShowcaseDashboardPage() {
  const [formData, setFormData] = useState<PortfolioSectionData>(DEFAULT_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const editPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('digital_spyke_portfolio');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.products)) {
          setFormData(parsed);
          if (parsed.products.length > 0) {
            setEditingCardId(parsed.products[0].id);
          }
        }
      }
    } catch {
      // ignore
    }

    fetch('/api/portfolio')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load portfolio data');
      })
      .then((resJson) => {
        const data = resJson?.data || resJson;
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setFormData(data);
          try {
            localStorage.setItem('digital_spyke_portfolio', JSON.stringify(data));
          } catch {
            // ignore
          }
          if (!editingCardId) {
            setEditingCardId(data.products[0].id);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching portfolio data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Sync to localStorage for immediate live feedback
  const syncLocal = (newData: PortfolioSectionData) => {
    try {
      localStorage.setItem('digital_spyke_portfolio', JSON.stringify(newData));
      window.dispatchEvent(new Event('digital_spyke_portfolio_updated'));
    } catch {
      // ignore
    }
  };

  // Section fields updates
  const handleUpdateField = (field: keyof PortfolioSectionData, value: string) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
      const updated = { ...prev, [field]: value };
      syncLocal(updated);
      return updated;
    });
  };

  // Card updates
  const handleUpdateCard = (id: string, field: keyof PortfolioProduct, value: string) => {
    setFormData((prev) => {
      const card = prev.products.find((p) => p.id === id);
      if (!card || card[field] === value) return prev;

      const updatedProducts = prev.products.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      );
      const updated = { ...prev, products: updatedProducts };
      syncLocal(updated);
      return updated;
    });
  };

  // Add Product
  const handleAddProduct = () => {
    const newId = `prod-${Date.now()}`;
    const newProduct: PortfolioProduct = {
      id: newId,
      title: 'New Showcase Project',
      titleFontSize: '1.125rem',
      link: 'https://example.com',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    };

    setFormData((prev) => {
      const updated = { ...prev, products: [...prev.products, newProduct] };
      syncLocal(updated);
      return updated;
    });

    setEditingCardId(newId);
    setTimeout(() => {
      editPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Duplicate Product
  const handleDuplicateProduct = (card: PortfolioProduct) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: PortfolioProduct = {
      ...card,
      id: newId,
      title: `${card.title} (Copy)`,
    };

    setFormData((prev) => {
      const index = prev.products.findIndex((p) => p.id === card.id);
      const updatedProducts = [...prev.products];
      updatedProducts.splice(index + 1, 0, newProduct);
      const updated = { ...prev, products: updatedProducts };
      syncLocal(updated);
      return updated;
    });

    setEditingCardId(newId);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (formData.products.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'You must have at least one project in the portfolio showcase.',
      });
      return;
    }

    Swal.fire({
      title: 'Delete Project?',
      text: 'Are you sure you want to remove this project from the showcase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => {
          const updatedProducts = prev.products.filter((p) => p.id !== id);
          const updated = { ...prev, products: updatedProducts };
          syncLocal(updated);
          return updated;
        });

        if (editingCardId === id) {
          const remaining = formData.products.filter((p) => p.id !== id);
          setEditingCardId(remaining.length > 0 ? remaining[0].id : null);
        }
      }
    });
  };

  // Move product position
  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.products.length) return;

    setFormData((prev) => {
      const items = [...prev.products];
      const temp = items[index];
      items[index] = items[newIndex];
      items[newIndex] = temp;
      const updated = { ...prev, products: items };
      syncLocal(updated);
      return updated;
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
        handleUpdateCard(editingCardId, 'thumbnail', data.url);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: data.message || 'Image upload failed',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'Failed to upload image.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Save to MongoDB
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        syncLocal(formData);
        Swal.fire({
          icon: 'success',
          title: 'Saved Successfully',
          text: 'Portfolio Showcase section updated!',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || 'Failed to save');
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err?.message || 'Could not save to database.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Derive active editing card from state
  const activeEditingCard = formData.products.find((p) => p.id === editingCardId) || null;

  // Selected Badge Icon
  const SelectedBadgeIcon = formData.badgeIcon && ICON_MAP[formData.badgeIcon] ? ICON_MAP[formData.badgeIcon] : Circle;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading Portfolio Showcase Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Portfolio Showcase</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your interactive portfolio showcase section, titles, badges, and project cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl text-sm shadow-md transition-all"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Header & Typography Controls */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-semibold text-gray-900">Header & Section Settings</h2>
        </div>

        {/* Badge Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-4 bg-gray-50/70 rounded-xl border border-gray-100">
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Badge Text
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500">Size:</span>
                <select
                  value={formData.badgeFontSize || '0.875rem'}
                  onChange={(e) => handleUpdateField('badgeFontSize', e.target.value)}
                  className="text-xs py-1 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {BADGE_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
              <ReactQuill
                theme="snow"
                value={formData.badgeText || ''}
                onChange={(val) => handleUpdateField('badgeText', val)}
                modules={compactQuillModules}
                formats={compactQuillFormats}
                className="quill-compact"
              />
            </div>
          </div>

          {/* Badge Icon & Color Picker */}
          <div className="md:col-span-6 space-y-3">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
              Badge Icon & Accent Color
            </label>

            <div className="flex flex-wrap gap-2">
              {BADGE_ICONS.map((item) => {
                const IconComp = item.icon;
                const isSelected = (formData.badgeIcon || 'Dot') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleUpdateField('badgeIcon', item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-500 font-medium">Color:</span>
              <div className="flex items-center gap-1.5">
                {COLOR_PRESETS.map((col) => (
                  <button
                    key={col.value}
                    type="button"
                    onClick={() => handleUpdateField('badgeIconColor', col.value)}
                    style={{ backgroundColor: col.value }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      (formData.badgeIconColor || '#38bdf8') === col.value
                        ? 'scale-110 border-blue-600 ring-2 ring-blue-300'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    title={col.label}
                  />
                ))}
              </div>
              <input
                type="text"
                value={formData.badgeIconColor || '#38bdf8'}
                onChange={(e) => handleUpdateField('badgeIconColor', e.target.value)}
                placeholder="#38bdf8"
                className="w-24 text-xs py-1 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section Title (Heading) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Section Title (Heading)
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-500">Size:</span>
              <select
                value={formData.headingFontSize || '4.5rem'}
                onChange={(e) => handleUpdateField('headingFontSize', e.target.value)}
                className="text-xs py-1 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {HEADING_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200">
            <ReactQuill
              theme="snow"
              value={formData.headingHtml || formData.headingPrefix + formData.headingHighlight || ''}
              onChange={(val) => handleUpdateField('headingHtml', val)}
              modules={fullQuillModules}
              formats={fullQuillFormats}
              className="quill-compact"
            />
          </div>
        </div>

        {/* Section Subtitle (Description) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Section Subtitle / Description
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-500">Size:</span>
              <select
                value={formData.descriptionFontSize || '1.125rem'}
                onChange={(e) => handleUpdateField('descriptionFontSize', e.target.value)}
                className="text-xs py-1 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {SUBTITLE_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200">
            <ReactQuill
              theme="snow"
              value={formData.descriptionHtml || formData.description || ''}
              onChange={(val) => {
                handleUpdateField('descriptionHtml', val);
                handleUpdateField('description', stripHtml(val));
              }}
              modules={fullQuillModules}
              formats={fullQuillFormats}
              className="quill-compact"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Portfolio Projects List */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-900">
              Showcase Projects ({formData.products.length})
            </h2>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.products.map((product, index) => {
            const isEditing = editingCardId === product.id;
            const plainTitle = stripHtml(product.title) || 'Untitled Project';

            return (
              <div
                key={product.id}
                className={`relative rounded-xl p-4 border transition-all ${
                  isEditing
                    ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/20 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Card Thumbnail */}
                <div className="relative h-36 w-full rounded-lg overflow-hidden bg-gray-100 mb-3 border border-gray-100">
                  <Image
                    src={product.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                    alt={plainTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                    #{index + 1}
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-1 mb-4">
                  <h3
                    className="font-bold text-gray-900 text-sm truncate"
                    dangerouslySetInnerHTML={{ __html: product.title || 'Untitled' }}
                  />
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline truncate"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{product.link}</span>
                  </a>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-gray-500">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveProduct(index, 'up')}
                      className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === formData.products.length - 1}
                      onClick={() => handleMoveProduct(index, 'down')}
                      className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDuplicateProduct(product)}
                      className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded"
                      title="Duplicate Item"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCardId(product.id);
                        setTimeout(() => {
                          editPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 50);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isEditing
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isEditing ? 'Editing' : 'Edit'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Focused Edit Panel for Selected Item */}
      {activeEditingCard && (
        <div
          ref={editPanelRef}
          className="bg-white rounded-2xl p-6 border-2 border-blue-500/80 shadow-lg space-y-6 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-semibold text-gray-900">
                Editing Project: <span className="text-blue-600">{stripHtml(activeEditingCard.title) || 'Untitled'}</span>
              </h2>
            </div>
            <button
              onClick={() => setEditingCardId(null)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Close Edit Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Thumbnail Upload & Preview */}
            <div className="lg:col-span-5 space-y-3">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Project Image / Thumbnail
              </label>

              <div className="relative h-52 w-full rounded-xl overflow-hidden bg-slate-900 border border-gray-200 group">
                <Image
                  src={activeEditingCard.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                  alt={stripHtml(activeEditingCard.title)}
                  fill
                  className="object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 text-white">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium">Uploading image...</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>
              </div>

              <div>
                <label className="text-[11px] text-gray-500 font-medium mb-1 block">
                  Or Image URL:
                </label>
                <input
                  type="text"
                  value={activeEditingCard.thumbnail || ''}
                  onChange={(e) => handleUpdateCard(activeEditingCard.id, 'thumbnail', e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs py-2 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Title & Link Details */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Project Title
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-500">Size:</span>
                    <select
                      value={activeEditingCard.titleFontSize || '1.125rem'}
                      onChange={(e) => handleUpdateCard(activeEditingCard.id, 'titleFontSize', e.target.value)}
                      className="text-xs py-1 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {CARD_TITLE_FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                  <ReactQuill
                    key={`${activeEditingCard.id}-title`}
                    theme="snow"
                    value={activeEditingCard.title || ''}
                    onChange={(val) => handleUpdateCard(activeEditingCard.id, 'title', val)}
                    modules={compactQuillModules}
                    formats={compactQuillFormats}
                    className="quill-compact"
                  />
                </div>
              </div>

              {/* Project Target URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                  Project Target URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeEditingCard.link || ''}
                    onChange={(e) => handleUpdateCard(activeEditingCard.id, 'link', e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 text-xs py-2 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {activeEditingCard.link && (
                    <a
                      href={activeEditingCard.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                      title="Open URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCardId(null)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Done Editing This Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Permanent Real-time Live Preview (Always visible at the bottom) */}
      <div className="bg-[#050814] rounded-2xl p-6 md:p-8 border border-cyan-500/20 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow ambient effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />

        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-white tracking-wide">
              Live Preview (Real-time)
            </h2>
          </div>
          <span className="text-[11px] text-cyan-400/80 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
            Updates Live
          </span>
        </div>

        {/* Live Preview Header */}
        <div className="relative z-10 max-w-4xl space-y-4 pt-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <SelectedBadgeIcon
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: formData.badgeIconColor || '#38bdf8' }}
            />
            <span
              className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase"
              style={formData.badgeFontSize ? { fontSize: formData.badgeFontSize } : undefined}
              dangerouslySetInnerHTML={{ __html: formData.badgeText || 'PORTFOLIO' }}
            />
          </div>

          {/* Heading */}
          {formData.headingHtml ? (
            <h2
              className="font-bold text-white tracking-tight leading-[1.1]"
              style={formData.headingFontSize ? { fontSize: formData.headingFontSize } : { fontSize: '3rem' }}
              dangerouslySetInnerHTML={{ __html: formData.headingHtml }}
            />
          ) : (
            <h2
              className="font-bold text-white tracking-tight leading-[1.1]"
              style={formData.headingFontSize ? { fontSize: formData.headingFontSize } : { fontSize: '3rem' }}
            >
              {formData.headingPrefix || 'Our journey of '} <br />
              <span className="bg-gradient-to-r from-[#00FFAB] via-cyan-400 to-[#6B46FF] bg-clip-text text-transparent">
                {formData.headingHighlight || 'success stories'}
              </span>
            </h2>
          )}

          {/* Subtitle */}
          <div
            className="text-gray-400 leading-relaxed font-light max-w-2xl"
            style={formData.descriptionFontSize ? { fontSize: formData.descriptionFontSize } : undefined}
            dangerouslySetInnerHTML={{
              __html:
                formData.descriptionHtml ||
                formData.description ||
                'We build beautiful products with the latest technologies and frameworks.',
            }}
          />
        </div>

        {/* Live Preview Cards Grid */}
        <div className="relative z-10 pt-6">
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 flex items-center justify-between">
            <span>Project Cards Showcase</span>
            <span>{formData.products.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formData.products.map((product) => {
              const plainTitle = stripHtml(product.title) || 'Product';
              return (
                <div
                  key={product.id}
                  className="group relative h-60 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                >
                  <Image
                    src={product.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'}
                    alt={plainTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h3
                      className="text-white font-bold drop-shadow-md truncate pr-2"
                      style={product.titleFontSize ? { fontSize: product.titleFontSize } : undefined}
                      dangerouslySetInnerHTML={{ __html: product.title || 'Product' }}
                    />
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 font-medium px-2.5 py-1 rounded-full bg-black/70 border border-cyan-500/40 backdrop-blur-sm shrink-0 hover:bg-cyan-500/20 transition-colors"
                    >
                      Visit &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
