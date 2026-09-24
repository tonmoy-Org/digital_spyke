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
  Layers,
  Edit3,
  Search,
  HelpCircle,
  X,
  Check,
  Eye,
  Type,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
  Filter,
} from 'lucide-react';
import { FAQItem, FAQSectionData, DEFAULT_FAQ_DATA } from '@/types/faq';

// Dynamically import ReactQuill to prevent SSR hydration errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-28 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Text Editor...
    </div>
  ),
});

// Clean, professional Quill toolbar: only formatting needed for FAQ answers
const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};
const quillFormats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];

const DEFAULT_CATEGORIES = ['General', 'Services', 'Security', 'Support'];

export default function FAQAdminPage() {
  const [formData, setFormData] = useState<FAQSectionData>(DEFAULT_FAQ_DATA);
  const [initialData, setInitialData] = useState<FAQSectionData>(DEFAULT_FAQ_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'faqs' | 'heading' | 'preview'>('faqs');
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
          title: 'Changes Saved',
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
      category: selectedCategory !== 'All' ? selectedCategory : 'General',
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
      Swal.fire({
        icon: 'warning',
        title: 'Question Required',
        text: 'Please enter a question title.',
      });
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

  // Delete FAQ Item
  const handleDeleteItem = (id: string, q: string) => {
    Swal.fire({
      title: 'Delete Question?',
      html: `Are you sure you want to delete:<br/><b class="text-rose-600 font-semibold">"${q || 'Untitled'}"</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          ...formData,
          faqs: formData.faqs.filter((f) => f.id !== id),
        });
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Question removed from FAQ list.',
          timer: 1200,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
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

  // Unique categories for filter
  const uniqueCategories = useMemo(() => {
    const cats = formData.faqs.map((f) => f.category || 'General').filter(Boolean);
    return ['All', ...Array.from(new Set(cats))];
  }, [formData.faqs]);

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

  // Metrics summary
  const totalCount = formData.faqs.length;
  const activeCount = formData.faqs.filter((f) => f.isActive).length;
  const inactiveCount = totalCount - activeCount;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-gray-500 text-xs font-medium">Loading FAQ Manager...</p>
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
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">FAQ Management</h1>
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
              Manage frequently asked questions, answers, and section copy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
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

      {/* ─── QUICK METRICS SUMMARY ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            Total Questions
          </span>
          <span className="text-2xl font-bold text-slate-800 mt-1 block">{totalCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Active on Site
          </span>
          <span className="text-2xl font-bold text-slate-800 mt-1 block">{activeCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            Hidden / Drafts
          </span>
          <span className="text-2xl font-bold text-slate-800 mt-1 block">{inactiveCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-cyan-600 uppercase tracking-wider block">
            Categories
          </span>
          <span className="text-2xl font-bold text-slate-800 mt-1 block">
            {uniqueCategories.filter((c) => c !== 'All').length || 1}
          </span>
        </div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex border-b border-gray-200 bg-white rounded-xl px-2 pt-1 shadow-2xs gap-1">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'faqs'
              ? 'border-cyan-500 text-cyan-600 bg-cyan-50/40 rounded-t-lg'
              : 'border-transparent text-gray-500 hover:text-slate-800 hover:bg-gray-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Questions & Answers ({totalCount})</span>
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
          <span>Section Header & Copy</span>
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
          <span>Live Preview</span>
        </button>
      </div>

      {/* ─── TAB 1: FAQS MANAGER ─── */}
      {activeTab === 'faqs' && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          {/* Search & Category Filter Bar */}
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

            {/* Category Filter Pills / Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddItem}
                className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs whitespace-nowrap hover:opacity-95"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>
          </div>

          {/* List of FAQ Items */}
          {filteredFaqs.length === 0 ? (
            <div className="py-14 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <FileQuestion className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No questions found</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {searchQuery
                  ? 'Try a different search keyword.'
                  : 'Click "Add FAQ" to create your first question.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredFaqs.map((faq) => {
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
                        {faq.answer?.replace(/<[^>]*>/g, '').slice(0, 100) ||
                          'No answer provided yet.'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
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

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleEditItem(faq)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Question & Answer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(faq.id, faq.question)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 2: SECTION HEADER & COPY ─── */}
      {activeTab === 'heading' && (
        <div className="space-y-5">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Section Title Configuration</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Controls the title and description displayed in the left column on the website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Heading Line 1 (White Bold)
                </label>
                <input
                  type="text"
                  value={formData.headingPrefix || ''}
                  onChange={(e) => setFormData({ ...formData, headingPrefix: e.target.value })}
                  placeholder="Frequently asked"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Heading Line 2 (Vibrant Gradient)
                </label>
                <input
                  type="text"
                  value={formData.headingHighlight || ''}
                  onChange={(e) => setFormData({ ...formData, headingHighlight: e.target.value })}
                  placeholder="questions"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Section Subtitle / Description
              </label>
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

            {/* Live Heading Preview Banner */}
            <div className="p-6 bg-[#030712] rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-2">
                Live Heading Preview
              </span>
              <div className="font-extrabold text-white text-3xl sm:text-4xl leading-tight tracking-tight">
                <span className="block text-white">
                  {formData.headingPrefix || 'Frequently asked'}
                </span>
                <span className="bg-gradient-to-r from-[#00FFAB] via-[#22d3ee] to-[#6B46FF] bg-clip-text text-transparent inline-block">
                  {formData.headingHighlight || 'questions'}
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed max-w-md">
                {formData.description ||
                  'Everything you need to know about our services, process, security standards, and support.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: LIVE PREVIEW ─── */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Interactive Website Preview
              </h3>
            </div>
            <span className="text-[11px] text-gray-400">
              Click questions to test expand/collapse
            </span>
          </div>

          {/* Exact Replica of Dark Website Section */}
          <div className="bg-[#030712] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left Column: Heading & Description */}
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="font-extrabold text-white tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
                    <span className="block text-white">
                      {formData.headingPrefix || 'Frequently asked'}
                    </span>
                    <span className="bg-gradient-to-r from-[#00FFAB] via-[#22d3ee] to-[#6B46FF] bg-clip-text text-transparent inline-block">
                      {formData.headingHighlight || 'questions'}
                    </span>
                  </h2>

                  <p className="mt-4 text-gray-400 leading-relaxed max-w-md text-sm sm:text-base">
                    {formData.description ||
                      'Everything you need to know about our services, process, security standards, and support.'}
                  </p>
                </div>

                {/* Right Column: Interactive Accordion */}
                <div className="lg:col-span-7">
                  <div className="border-t border-white/10">
                    {formData.faqs
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
                              {/* Plus icon rotating 45deg to x */}
                              <div className="mt-1 flex items-center justify-center shrink-0">
                                <motion.div
                                  animate={{ rotate: isOpen ? 45 : 0 }}
                                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                                  className="text-cyan-400"
                                >
                                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                                </motion.div>
                              </div>

                              {/* Question Text */}
                              <span className="font-medium text-white group-hover:text-cyan-300 transition-colors text-base sm:text-lg leading-snug flex-1">
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
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    className="pb-6 pl-9 sm:pl-10 pr-2 leading-relaxed font-normal text-gray-400 text-sm sm:text-base [&_strong]:text-cyan-300 [&_strong]:font-semibold [&_em]:text-gray-200 [&_a]:text-cyan-400 [&_a]:underline"
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

                    {formData.faqs.filter((f) => f.isActive).length === 0 && (
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
                    Enter the question title, category, and formatted answer.
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
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* Question Input */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Question Title <span className="text-rose-500">*</span>
                  </label>
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

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Category</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, category: cat })}
                        className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                          editingItem.category === cat
                            ? 'bg-cyan-50 border-cyan-300 text-cyan-700 font-semibold'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="Or type a custom category..."
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl"
                  />
                </div>

                {/* Answer Rich Text Editor */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Answer Content <span className="text-rose-500">*</span>
                  </label>
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
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your answer here..."
                    />
                  </div>
                </div>

                {/* Status Switch */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isActive}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isActive: e.target.checked })
                      }
                      className="w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Active on website
                      </span>
                      <span className="text-[11px] text-gray-400 block">
                        When enabled, this question will appear in the live FAQ section.
                      </span>
                    </div>
                  </label>
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
                  <span>{isNewItem ? 'Add Question' : 'Save Question'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
