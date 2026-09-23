'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Layers,
  Copy,
  Edit3,
  Search,
  HelpCircle,
  X,
  Upload,
  Check,
  RotateCcw,
  Eye,
  Sliders,
  Type,
  Palette,
  CheckCircle2,
  FolderPlus,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { FAQItem, FAQSectionData, DEFAULT_FAQ_DATA } from '@/types/faq';

// Dynamically import ReactQuill to prevent SSR hydration errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-20 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400">
      Loading Text Editor...
    </div>
  ),
});

// Font Size Options
const HEADING_FONT_OPTIONS = [
  { label: 'Small (2.5rem / 40px)', value: '2.5rem' },
  { label: 'Medium (3rem / 48px)', value: '3rem' },
  { label: 'Default (3.75rem / 60px)', value: '3.75rem' },
  { label: 'Large (4.25rem / 68px)', value: '4.25rem' },
  { label: 'Extra Large (5rem / 80px)', value: '5rem' },
];

const DESC_FONT_OPTIONS = [
  { label: 'Small (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Default (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.25rem / 20px)', value: '1.25rem' },
];

const Q_FONT_OPTIONS = [
  { label: 'Small (1rem / 16px)', value: '1rem' },
  { label: 'Default (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Medium (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Large (1.375rem / 22px)', value: '1.375rem' },
];

const A_FONT_OPTIONS = [
  { label: 'Small (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Default (0.9375rem / 15px)', value: '0.9375rem' },
  { label: 'Base (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.125rem / 18px)', value: '1.125rem' },
];

const COLOR_PRESETS = [
  '#ffffff',
  '#00FFAB',
  '#22d3ee',
  '#6B46FF',
  '#8b5cf6',
  '#f59e0b',
  '#f43f5e',
  '#9ca3af',
  '#cbd5e1',
];

const compactQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    ['clean'],
  ],
};
const compactQuillFormats = ['bold', 'italic', 'underline', 'color'];

const richQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};
const richQuillFormats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'link',
];

export default function FAQAdminPage() {
  const [formData, setFormData] = useState<FAQSectionData>(DEFAULT_FAQ_DATA);
  const [initialData, setInitialData] = useState<FAQSectionData>(DEFAULT_FAQ_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'faqs' | 'heading' | 'styling' | 'preview'>('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [previewOpenIndex, setPreviewOpenIndex] = useState<number | null>(0);

  // Check for unsaved changes
  const hasChanges = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData]
  );

  // Load FAQ configuration from API
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/faq');
        const json = await res.json();
        if (json.success && json.data) {
          setFormData(json.data);
          setInitialData(json.data);
        }
      } catch (err) {
        console.error('Failed to load FAQ data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Save changes to database
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setInitialData(formData);
        Swal.fire({
          icon: 'success',
          title: 'Changes Saved!',
          text: 'FAQ section updated successfully on the website.',
          timer: 1600,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      } else {
        throw new Error(json.message || 'Failed to save');
      }
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.message || 'An error occurred while saving FAQ data.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default configuration (matching original screenshot)
  const handleResetToDefaults = () => {
    Swal.fire({
      title: 'Reset to Clean Defaults?',
      text: 'This will reset headings, colors, and the 6 default questions matching the original design.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06b6d4',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Reset',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(JSON.parse(JSON.stringify(DEFAULT_FAQ_DATA)));
        Swal.fire({
          icon: 'info',
          title: 'Reset Complete',
          text: 'Click "Save Changes" to apply this to the live website.',
          timer: 1800,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      }
    });
  };

  // Upload side graphic image
  const handleUploadImage = async (file: File, callback: (url: string) => void) => {
    try {
      setIsUploading(true);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (json.success && json.url) {
        callback(json.url);
      } else {
        throw new Error(json.message || 'Upload failed');
      }
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Upload Failed', text: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  // Open Add FAQ Modal
  const handleAddItem = () => {
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: '',
      questionHtml: '',
      questionFontSize: '1.125rem',
      questionColor: '#ffffff',
      answer: '',
      answerHtml: '',
      answerFontSize: '0.9375rem',
      answerColor: '#9ca3af',
      category: 'General',
      iconType: 'none',
      icon: 'HelpCircle',
      iconBgColor: 'rgba(0, 255, 171, 0.15)',
      isActive: true,
      order: formData.faqs.length + 1,
    };
    setEditingItem(newItem);
    setIsNewItem(true);
  };

  // Open Edit FAQ Modal
  const handleEditItem = (item: FAQItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNewItem(false);
  };

  // Save Item from Modal
  const handleSaveItem = () => {
    if (!editingItem) return;
    if (!editingItem.question.trim()) {
      Swal.fire({ icon: 'warning', title: 'Question Required', text: 'Please enter a question.' });
      return;
    }
    const updatedFaqs = isNewItem
      ? [...formData.faqs, editingItem]
      : formData.faqs.map((f) => (f.id === editingItem.id ? editingItem : f));

    const currentCats = formData.categories || ['All', 'General'];
    const newCategory = editingItem.category?.trim() || 'General';
    const updatedCats = Array.from(new Set([...currentCats, newCategory]));

    setFormData({ ...formData, categories: updatedCats, faqs: updatedFaqs });
    setEditingItem(null);
  };

  // Duplicate FAQ Item
  const handleDuplicateItem = (item: FAQItem) => {
    const clonedItem: FAQItem = {
      ...JSON.parse(JSON.stringify(item)),
      id: `faq-${Date.now()}`,
      question: `${item.question} (Copy)`,
      order: formData.faqs.length + 1,
    };
    setFormData({ ...formData, faqs: [...formData.faqs, clonedItem] });
    Swal.fire({
      icon: 'success',
      title: 'FAQ Duplicated',
      timer: 1200,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  };

  // Delete FAQ Item
  const handleDeleteItem = (id: string, q: string) => {
    Swal.fire({
      title: 'Delete Question?',
      html: `Are you sure you want to delete:<br/><b class="text-rose-600">"${q || 'Untitled'}"</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          ...formData,
          faqs: formData.faqs.filter((f) => f.id !== id),
        });
      }
    });
  };

  // Reorder Item Up or Down
  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.faqs.length) return;
    const list = [...formData.faqs];
    [list[index], list[targetIndex]] = [list[targetIndex], list[index]];
    setFormData({
      ...formData,
      faqs: list.map((item, idx) => ({ ...item, order: idx + 1 })),
    });
  };

  // Filtered FAQs list for admin table
  const filteredFaqs = useMemo(() => {
    return formData.faqs.filter((f) => {
      const matchesSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || (f.category || 'General') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [formData.faqs, searchQuery, selectedCategory]);

  const uniqueCategories = useMemo(() => {
    const cats = formData.faqs.map((f) => f.category || 'General');
    return ['All', ...Array.from(new Set(cats))];
  }, [formData.faqs]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-gray-500 text-xs font-medium">Loading FAQ Administration...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* ─── TOP HEADER BAR ─── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">FAQ Section</h1>
              {hasChanges ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Unsaved changes
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Live
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Control section typography, colors, and manage all accordion questions & answers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleResetToDefaults}
            type="button"
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all flex items-center gap-1.5"
            title="Reset to clean defaults matching screenshot"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleAddItem}
            type="button"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add FAQ
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex border-b border-gray-200 bg-white rounded-xl px-2 pt-1 shadow-2xs gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'faqs'
              ? 'border-cyan-500 text-cyan-600 bg-cyan-50/40 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-slate-800 hover:bg-gray-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Questions & Answers ({formData.faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('heading')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'heading'
              ? 'border-cyan-500 text-cyan-600 bg-cyan-50/40 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-slate-800 hover:bg-gray-50'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Section Headings & Copy</span>
        </button>

        <button
          onClick={() => setActiveTab('styling')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'styling'
              ? 'border-cyan-500 text-cyan-600 bg-cyan-50/40 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-slate-800 hover:bg-gray-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Display & Styling Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'preview'
              ? 'border-cyan-500 text-cyan-600 bg-cyan-50/40 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-slate-800 hover:bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Interactive Preview</span>
        </button>
      </div>

      {/* ─── TAB 1: FAQS MANAGER ─── */}
      {activeTab === 'faqs' && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or answers..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-gray-500 whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              >
                {uniqueCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddItem}
                className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>
          </div>

          {/* List of FAQ Cards */}
          {filteredFaqs.length === 0 ? (
            <div className="py-14 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No questions found</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {searchQuery ? 'Try a different search keyword.' : 'Click "Add Question" to create your first FAQ.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredFaqs.map((faq, index) => {
                const globalIndex = formData.faqs.findIndex((f) => f.id === faq.id);
                return (
                  <div
                    key={faq.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all hover:shadow-xs ${
                      faq.isActive
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-200 bg-gray-50/70 opacity-60'
                    }`}
                  >
                    {/* Reorder Arrows */}
                    <div className="flex flex-col gap-0.5 text-gray-300 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveItem(globalIndex, 'up')}
                        disabled={globalIndex === 0}
                        className="p-1 hover:text-cyan-600 disabled:opacity-20 hover:bg-gray-100 rounded"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItem(globalIndex, 'down')}
                        disabled={globalIndex === formData.faqs.length - 1}
                        className="p-1 hover:text-cyan-600 disabled:opacity-20 hover:bg-gray-100 rounded"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Order Number Badge */}
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {globalIndex + 1}
                    </span>

                    {/* Question Indicator Icon Representation */}
                    <div className="w-6 h-6 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Question Content Snippet */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {faq.question || 'Untitled Question'}
                        </p>
                        {faq.category && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-md shrink-0">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {faq.answer?.replace(/<[^>]*>/g, '').slice(0, 90) || 'No answer provided yet.'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Active Status Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            faqs: formData.faqs.map((f) =>
                              f.id === faq.id ? { ...f, isActive: !f.isActive } : f
                            ),
                          })
                        }
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                          faq.isActive
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        }`}
                        title="Toggle visibility on website"
                      >
                        {faq.isActive ? 'Active' : 'Hidden'}
                      </button>

                      {/* Duplicate Button */}
                      <button
                        type="button"
                        onClick={() => handleDuplicateItem(faq)}
                        className="p-1.5 text-gray-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Duplicate Question"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleEditItem(faq)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Question & Answer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(faq.id, faq.question)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: HEADING & COPY ─── */}
      {activeTab === 'heading' && (
        <div className="space-y-5">
          {/* Main Visual Heading Controls */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Section Heading Configuration</h3>
                <p className="text-xs text-gray-500">
                  Control the prominent 2-line title seen on the left column of the FAQ section.
                </p>
              </div>
              <select
                value={formData.headingFontSize || '3.75rem'}
                onChange={(e) => setFormData({ ...formData, headingFontSize: e.target.value })}
                className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl"
              >
                {HEADING_FONT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Heading Prefix (e.g. "Frequently asked") */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Heading Line 1 (White Bold)
                </label>
                <input
                  type="text"
                  value={formData.headingPrefix || ''}
                  onChange={(e) => setFormData({ ...formData, headingPrefix: e.target.value })}
                  placeholder="Frequently asked"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">Appears in solid crisp white font.</p>
              </div>

              {/* Heading Highlight (e.g. "questions") */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Heading Line 2 (Vibrant Gradient)
                </label>
                <input
                  type="text"
                  value={formData.headingHighlight || ''}
                  onChange={(e) => setFormData({ ...formData, headingHighlight: e.target.value })}
                  placeholder="questions"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  Rendered with cyan to purple vibrant gradient.
                </p>
              </div>

              {/* Heading Suffix (optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Heading Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={formData.headingSuffix || ''}
                  onChange={(e) => setFormData({ ...formData, headingSuffix: e.target.value })}
                  placeholder="Optional suffix text..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">Appended after the highlight text.</p>
              </div>
            </div>

            {/* Live Heading Preview Banner */}
            <div className="p-5 bg-[#030712] rounded-xl border border-white/10 mt-3">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-2">
                Live Heading Preview
              </span>
              <div
                className="font-extrabold text-white leading-[1.1] tracking-tight"
                style={{ fontSize: formData.headingFontSize || '3.75rem' }}
              >
                <span className="block text-white">{formData.headingPrefix || 'Frequently asked'}</span>
                <span className="bg-gradient-to-r from-[#00FFAB] via-[#22d3ee] to-[#6B46FF] bg-clip-text text-transparent inline-block">
                  {formData.headingHighlight || 'questions'}
                </span>
                {formData.headingSuffix ? (
                  <span className="text-white"> {formData.headingSuffix}</span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Section Subtitle / Description</h3>
                <p className="text-xs text-gray-500">
                  Supporting text displayed under the heading on the left column.
                </p>
              </div>
              <select
                value={formData.descriptionFontSize || '1rem'}
                onChange={(e) => setFormData({ ...formData, descriptionFontSize: e.target.value })}
                className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl"
              >
                {DESC_FONT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                  descriptionHtml: e.target.value,
                })
              }
              placeholder="Everything you need to know about our services, process, security standards, and support."
              className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* ─── TAB 3: STYLING & DISPLAY SETTINGS ─── */}
      {activeTab === 'styling' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Accordion Styling Controls */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-gray-100 pb-3">
              Accordion Icon & Appearance
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Accordion Indicator Icon
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'plus', label: 'Plus Icon (+)', desc: 'Rotates 45° to × (Original Screenshot)' },
                  { id: 'chevron', label: 'Chevron Icon', desc: 'Rotates 180° on expand' },
                  { id: 'arrow', label: 'Arrow Icon', desc: 'Points right, rotates 90°' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, accordionIconType: type.id as any })
                    }
                    className={`p-3 rounded-xl border text-left transition-all ${
                      (formData.accordionIconType || 'plus') === type.id
                        ? 'border-cyan-500 bg-cyan-50/50 text-cyan-800 ring-2 ring-cyan-500/20'
                        : 'border-gray-200 hover:bg-gray-50 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{type.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Indicator Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.iconColor || '#22d3ee'}
                  onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                  className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.iconColor || '#22d3ee'}
                  onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                  className="px-3 py-1.5 text-xs font-mono border border-gray-200 rounded-lg w-28"
                />
                <div className="flex items-center gap-1">
                  {COLOR_PRESETS.slice(0, 5).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconColor: c })}
                      className="w-5 h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filter Tabs Toggle */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Show Category Filter Pills</p>
                <p className="text-[11px] text-gray-400">
                  Keep OFF for the clean uncluttered look matching the original design.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.showCategoryFilter)}
                  onChange={(e) =>
                    setFormData({ ...formData, showCategoryFilter: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>

          {/* Badge & Side Image Controls */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-gray-100 pb-3">
              Optional Elements (Badge & Image)
            </h3>

            {/* Badge Switch */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Top Badge Pill</p>
                  <p className="text-[11px] text-gray-400">Optional small pill above the main heading.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.showBadge)}
                    onChange={(e) => setFormData({ ...formData, showBadge: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {formData.showBadge && (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2.5 border border-gray-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText || ''}
                      onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                      placeholder="Frequently Asked Questions"
                      className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Text Color
                      </label>
                      <input
                        type="text"
                        value={formData.badgeColor || '#00FFAB'}
                        onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-gray-200 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Background
                      </label>
                      <input
                        type="text"
                        value={formData.badgeBgColor || 'rgba(0, 255, 171, 0.1)'}
                        onChange={(e) => setFormData({ ...formData, badgeBgColor: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs font-mono border border-gray-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Side Graphic Switch */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Left Column Graphic / Image</p>
                  <p className="text-[11px] text-gray-400">Display an illustration beneath the description.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.showSideImage)}
                    onChange={(e) => setFormData({ ...formData, showSideImage: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {formData.showSideImage && (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.sideImageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, sideImageUrl: e.target.value })}
                      placeholder="Image URL or upload →"
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white font-mono"
                    />
                    <label className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleUploadImage(file, (url) =>
                              setFormData((prev) => ({ ...prev, sideImageUrl: url }))
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                  {formData.sideImageUrl && (
                    <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden bg-white p-1">
                      <img
                        src={formData.sideImageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: LIVE INTERACTIVE PREVIEW ─── */}
      {(activeTab === 'preview' || activeTab === 'faqs') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Interactive Website Preview
              </h3>
            </div>
            <span className="text-[11px] text-gray-400">
              Matches website layout 1:1 • Click questions to test expand/collapse
            </span>
          </div>

          {/* Exact Replica of Dark Website Section */}
          <div className="bg-[#030712] rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left Column: Heading & Description */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Optional Badge */}
                  {formData.showBadge && formData.badgeText && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 border border-white/10"
                      style={{
                        fontSize: formData.badgeFontSize || '0.75rem',
                        color: formData.badgeColor || '#00FFAB',
                        backgroundColor: formData.badgeBgColor || 'rgba(0, 255, 171, 0.1)',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{formData.badgeText}</span>
                    </div>
                  )}

                  {/* Main 2-Line Heading */}
                  <h2
                    className="font-extrabold text-white tracking-tight leading-[1.1] text-4xl sm:text-5xl lg:text-6xl"
                    style={{ fontSize: formData.headingFontSize || undefined }}
                  >
                    <span className="block text-white">
                      {formData.headingPrefix || 'Frequently asked'}
                    </span>
                    <span className="bg-gradient-to-r from-[#00FFAB] via-[#22d3ee] to-[#6B46FF] bg-clip-text text-transparent inline-block">
                      {formData.headingHighlight || 'questions'}
                    </span>
                    {formData.headingSuffix ? (
                      <span className="text-white"> {formData.headingSuffix}</span>
                    ) : null}
                  </h2>

                  {/* Description */}
                  <p
                    className="mt-4 text-gray-400 leading-relaxed max-w-md text-sm sm:text-base"
                    style={{ fontSize: formData.descriptionFontSize || undefined }}
                  >
                    {formData.description ||
                      'Everything you need to know about our services, process, security standards, and support.'}
                  </p>

                  {/* Optional Side Image */}
                  {formData.showSideImage && formData.sideImageUrl && (
                    <div className="mt-6 pt-2">
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 backdrop-blur-sm max-w-xs">
                        <img
                          src={formData.sideImageUrl}
                          alt="Side Preview"
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Interactive Accordion */}
                <div className="lg:col-span-7">
                  {/* Category Pills (if enabled) */}
                  {formData.showCategoryFilter && uniqueCategories.length > 2 && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {uniqueCategories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${
                            selectedCategory === category
                              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                              : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Accordion Container with Divider Lines */}
                  <div className="border-t border-white/10">
                    {filteredFaqs
                      .filter((f) => f.isActive)
                      .map((faq, index) => {
                        const isOpen = previewOpenIndex === index;
                        return (
                          <div key={faq.id} className="border-b border-white/10">
                            <button
                              type="button"
                              onClick={() => setPreviewOpenIndex(isOpen ? null : index)}
                              className="w-full py-5 sm:py-6 flex items-start gap-4 text-left group focus:outline-none"
                            >
                              {/* Left Plus/Chevron Icon with smooth rotation */}
                              <div className="mt-1 flex items-center justify-center shrink-0">
                                {formData.accordionIconType === 'chevron' ? (
                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    style={{ color: formData.iconColor || '#22d3ee' }}
                                  >
                                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                                  </motion.div>
                                ) : formData.accordionIconType === 'arrow' ? (
                                  <motion.div
                                    animate={{ rotate: isOpen ? 90 : 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    style={{ color: formData.iconColor || '#22d3ee' }}
                                  >
                                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                  </motion.div>
                                ) : (
                                  /* Default Plus rotates to × */
                                  <motion.div
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    style={{ color: formData.iconColor || '#22d3ee' }}
                                  >
                                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                                  </motion.div>
                                )}
                              </div>

                              {/* Question Text */}
                              <span
                                className="font-medium text-white group-hover:text-cyan-300 transition-colors text-base sm:text-lg leading-snug flex-1"
                                style={{
                                  fontSize: faq.questionFontSize || undefined,
                                  color: faq.questionColor || '#ffffff',
                                }}
                              >
                                {faq.question || 'Untitled Question'}
                              </span>
                            </button>

                            {/* Collapsible Answer */}
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="pb-6 pl-9 sm:pl-10 pr-2 leading-relaxed font-normal text-gray-400 text-sm sm:text-base [&_strong]:text-cyan-300 [&_strong]:font-semibold [&_em]:text-gray-200 [&_a]:text-cyan-400 [&_a]:underline"
                                    style={{
                                      fontSize: faq.answerFontSize || undefined,
                                      color: faq.answerColor || undefined,
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: faq.answerHtml || faq.answer || 'No answer entered.',
                                    }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}

                    {filteredFaqs.filter((f) => f.isActive).length === 0 && (
                      <p className="text-gray-500 text-xs py-8 text-center">
                        No active questions to preview.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT FAQ MODAL ─── */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-gray-100 shadow-2xl my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isNewItem ? 'Add New Question' : 'Edit Question & Answer'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Configure question text, rich answer formatting, font sizes, and category.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Question Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">Question Title</label>
                    <select
                      value={editingItem.questionFontSize || '1.125rem'}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, questionFontSize: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-200 rounded-lg text-xs"
                    >
                      {Q_FONT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    value={editingItem.question}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        question: e.target.value,
                        questionHtml: e.target.value,
                      })
                    }
                    placeholder="e.g. Where can I see Digital Spyke's past work?"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 font-medium"
                  />
                </div>

                {/* Answer Rich Text Editor */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">Answer Text</label>
                    <select
                      value={editingItem.answerFontSize || '0.9375rem'}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, answerFontSize: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-200 rounded-lg text-xs"
                    >
                      {A_FONT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="border border-gray-200 rounded-xl overflow-hidden faq-quill-modal">
                    <ReactQuill
                      theme="snow"
                      value={editingItem.answerHtml || editingItem.answer}
                      onChange={(content) =>
                        setEditingItem({
                          ...editingItem,
                          answerHtml: content,
                          answer: content.replace(/<[^>]*>/g, '').trim(),
                        })
                      }
                      modules={richQuillModules}
                      formats={richQuillFormats}
                      placeholder="Write answer with bold, italic, cyan highlights, or links..."
                    />
                  </div>
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Category</label>
                    <input
                      type="text"
                      value={editingItem.category || 'General'}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, category: e.target.value })
                      }
                      placeholder="e.g. General, Services, Security"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Visibility Status
                    </label>
                    <label className="flex items-center gap-2.5 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingItem.isActive}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, isActive: e.target.checked })
                        }
                        className="w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        {editingItem.isActive ? 'Active (Visible on website)' : 'Hidden (Draft)'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2.5 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveItem}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>{isNewItem ? 'Add Question' : 'Apply Changes'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
