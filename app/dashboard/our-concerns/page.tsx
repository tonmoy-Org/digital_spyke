'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import {
  Building2,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Search,
  Check,
  Sparkles,
  Sliders,
  Code2,
  Image as ImageIcon,
  Type,
  Eye,
  ArrowRightLeft,
  X,
  Edit2,
  UploadCloud,
  FileImage,
  Loader2,
} from 'lucide-react';
import {
  ConcernItem,
  ConcernsSectionData,
  DEFAULT_CONCERNS_DATA,
  PRESET_ICONS,
  IconType,
} from '@/types/concerns';
import { Marquee } from '@/components/magicui/marquee';
import ConcernIcon, { LUCIDE_CONCERN_ICONS } from '@/components/sections/ConcernIcon';

const FONT_SIZE_OPTIONS = [
  { label: 'Small (0.75rem)', value: '0.75rem' },
  { label: 'Medium (0.875rem)', value: '0.875rem' },
  { label: 'Base (1rem)', value: '1rem' },
  { label: 'Large (1.125rem)', value: '1.125rem' },
  { label: 'Extra Large (1.25rem)', value: '1.25rem' },
];

export default function OurConcernsDashboardPage() {
  const [formData, setFormData] = useState<ConcernsSectionData>(DEFAULT_CONCERNS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'row1' | 'row2'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Item Editor State (Modal)
  const [editingItem, setEditingItem] = useState<ConcernItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [iconPickerTab, setIconPickerTab] = useState<IconType>('upload');
  const [lucideSearch, setLucideSearch] = useState('');

  // File Upload State
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/our-concerns', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setFormData({
            title: json.data.title || DEFAULT_CONCERNS_DATA.title,
            titleFontSize: json.data.titleFontSize || DEFAULT_CONCERNS_DATA.titleFontSize,
            showTitle: json.data.showTitle !== undefined ? json.data.showTitle : true,
            speedRow1: typeof json.data.speedRow1 === 'number' ? json.data.speedRow1 : 40,
            speedRow2: typeof json.data.speedRow2 === 'number' ? json.data.speedRow2 : 40,
            pauseOnHover: json.data.pauseOnHover !== undefined ? json.data.pauseOnHover : true,
            items: Array.isArray(json.data.items) && json.data.items.length > 0
              ? json.data.items
              : DEFAULT_CONCERNS_DATA.items,
          });
        }
      } catch (err) {
        console.error('Failed to load concerns data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    try {
      try {
        localStorage.setItem('digital_spyke_our_concerns', JSON.stringify(formData));
      } catch (e) {}

      const res = await fetch('/api/our-concerns', {
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
          title: 'Our Concerns updated successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: data.message || 'Could not save settings.',
        });
      }
    } catch (err: any) {
      console.error('Save error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleResetToDefault = async () => {
    const result = await Swal.fire({
      title: 'Reset to Defaults?',
      text: 'This will restore all default preset logos and marquee settings.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1868df',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reset',
    });

    if (result.isConfirmed) {
      setFormData(JSON.parse(JSON.stringify(DEFAULT_CONCERNS_DATA)));
      Swal.fire({
        icon: 'info',
        title: 'Restored',
        text: 'Defaults loaded. Click "Save Changes" to apply permanently.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Open modal to add item
  const handleAddNewItem = () => {
    const newItem: ConcernItem = {
      id: `concern-${Date.now()}`,
      name: '',
      subtitle: '',
      row: activeTab === 'row2' ? 2 : 1,
      iconType: 'upload',
      iconValue: '',
      url: '',
    };
    setEditingItem(newItem);
    setIsNewItem(true);
    setIconPickerTab('upload');
  };

  // Open modal to edit item
  const handleEditItem = (item: ConcernItem) => {
    setEditingItem({
      ...item,
      name: item.name || item.title || '',
      subtitle: item.subtitle || '',
    });
    setIsNewItem(false);
    setIconPickerTab(item.iconType || 'preset');
  };

  // Device File Upload Handler
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setEditingItem((prev) =>
          prev
            ? {
                ...prev,
                iconType: 'upload',
                iconValue: data.url,
                name: prev.name || file.name.replace(/\.[^/.]+$/, ''),
              }
            : null
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: data.message || 'Failed to upload file from device.',
        });
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'Failed to upload file from device.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Save edited or new item
  const handleSaveModalItem = () => {
    if (!editingItem) return;

    if (!editingItem.name?.trim() && !editingItem.iconValue?.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please provide either a brand name or an icon logo.',
      });
      return;
    }

    const cleanItem: ConcernItem = {
      ...editingItem,
      name: editingItem.name?.trim() || '',
      subtitle: editingItem.subtitle?.trim() || '',
      title: editingItem.name?.trim() || '',
    };

    setFormData((prev) => {
      let updatedItems = [...prev.items];
      if (isNewItem) {
        updatedItems.push(cleanItem);
      } else {
        updatedItems = updatedItems.map((item) =>
          item.id === cleanItem.id ? cleanItem : item
        );
      }
      return { ...prev, items: updatedItems };
    });

    setEditingItem(null);
  };

  // Delete item
  const handleDeleteItem = async (id: string, name: string) => {
    if (formData.items.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'At least one item is required in the marquee.',
      });
      return;
    }

    const result = await Swal.fire({
      title: `Delete "${name || 'this item'}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    });

    if (result.isConfirmed) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  // Duplicate item
  const handleDuplicateItem = (item: ConcernItem) => {
    const duplicated: ConcernItem = {
      ...item,
      id: `concern-${Date.now()}`,
      name: item.name ? `${item.name} (Copy)` : 'Copy',
    };
    const index = formData.items.findIndex((i) => i.id === item.id);
    const updated = [...formData.items];
    updated.splice(index + 1, 0, duplicated);
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  // Move item up / down
  const handleMove = (id: string, direction: 'up' | 'down') => {
    const index = formData.items.findIndex((i) => i.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.items.length) return;

    const updated = [...formData.items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  // Toggle item row (1 <-> 2)
  const handleToggleRow = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, row: item.row === 1 ? 2 : 1 } : item
      ),
    }));
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return formData.items.filter((item) => {
      if (activeTab === 'row1' && item.row !== 1) return false;
      if (activeTab === 'row2' && item.row !== 2) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const displayName = (item.name || item.title || '').toLowerCase();
        const subtitle = (item.subtitle || '').toLowerCase();
        return displayName.includes(q) || subtitle.includes(q);
      }
      return true;
    });
  }, [formData.items, activeTab, searchQuery]);

  const row1Count = formData.items.filter((i) => i.row === 1).length;
  const row2Count = formData.items.filter((i) => i.row === 2).length;

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading Our Concerns...</p>
      </div>
    );
  }

  const liveRow1 = formData.items.filter((i) => i.row === 1);
  const liveRow2 = formData.items.filter((i) => i.row === 2);

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Home Landing Page / Our Concerns
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-blue-600" />
            Our Concerns
          </h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm pb-2 border-b border-gray-100">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span>Marquee Settings</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Section Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Our Concerns"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Title Font Size */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Title Size</label>
            <select
              value={formData.titleFontSize || '0.875rem'}
              onChange={(e) => setFormData((prev) => ({ ...prev, titleFontSize: e.target.value }))}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              {FONT_SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Show Title Toggle */}
          <div className="space-y-1.5 flex flex-col justify-between">
            <label className="text-xs font-semibold text-slate-700">Show Section Title</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, showTitle: !prev.showTitle }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  formData.showTitle ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.showTitle ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs text-gray-600 font-medium">
                {formData.showTitle ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>

          {/* Row 1 Speed */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Row 1 Speed</label>
              <span className="text-xs text-blue-600 font-bold">{formData.speedRow1 || 40}s</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={formData.speedRow1 || 40}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, speedRow1: parseInt(e.target.value) || 40 }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Row 2 Speed */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Row 2 Speed</label>
              <span className="text-xs text-blue-600 font-bold">{formData.speedRow2 || 40}s</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={formData.speedRow2 || 40}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, speedRow2: parseInt(e.target.value) || 40 }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Pause on Hover */}
          <div className="space-y-1.5 flex flex-col justify-between">
            <label className="text-xs font-semibold text-slate-700">Pause on Hover</label>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, pauseOnHover: !prev.pauseOnHover }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  formData.pauseOnHover ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.pauseOnHover ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs text-gray-600 font-medium">
                {formData.pauseOnHover ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-[#091021] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 text-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Eye className="w-4 h-4" />
            <span>Live Marquee Preview</span>
          </div>
        </div>

        <div className="py-2">
          {formData.showTitle && (
            <div className="text-center mb-5">
              <h3
                style={{ fontSize: formData.titleFontSize || '0.875rem' }}
                className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                {formData.title || 'Our Concerns'}
              </h3>
            </div>
          )}

          <div className="space-y-4">
            {/* Row 1 Preview */}
            <Marquee
              pauseOnHover={formData.pauseOnHover}
              style={{ '--duration': `${formData.speedRow1 || 40}s` } as React.CSSProperties}
              className="[--gap:1rem]"
            >
              {(liveRow1.length > 0 ? liveRow1 : formData.items).map((item) => {
                const displayName = item.name || item.title || '';
                return (
                  <div
                    key={`p1-${item.id}`}
                    className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-2.5 mx-2"
                  >
                    <ConcernIcon item={item} />
                    {(displayName || item.subtitle) && (
                      <div className="flex flex-col text-left">
                        {displayName && (
                          <span className="text-sm font-bold tracking-tight text-white leading-none whitespace-nowrap">
                            {displayName}
                          </span>
                        )}
                        {item.subtitle && (
                          <span className="text-[8.5px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5 whitespace-nowrap">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </Marquee>

            {/* Row 2 Preview */}
            <Marquee
              reverse
              pauseOnHover={formData.pauseOnHover}
              style={{ '--duration': `${formData.speedRow2 || 40}s` } as React.CSSProperties}
              className="[--gap:1rem]"
            >
              {(liveRow2.length > 0 ? liveRow2 : formData.items).map((item) => {
                const displayName = item.name || item.title || '';
                return (
                  <div
                    key={`p2-${item.id}`}
                    className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-2.5 mx-2"
                  >
                    <ConcernIcon item={item} />
                    {(displayName || item.subtitle) && (
                      <div className="flex flex-col text-left">
                        {displayName && (
                          <span className="text-sm font-bold tracking-tight text-white leading-none whitespace-nowrap">
                            {displayName}
                          </span>
                        )}
                        {item.subtitle && (
                          <span className="text-[8.5px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5 whitespace-nowrap">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Concerns Items List */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              All ({formData.items.length})
            </button>
            <button
              onClick={() => setActiveTab('row1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'row1'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Row 1 ({row1Count})
            </button>
            <button
              onClick={() => setActiveTab('row2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'row2'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Row 2 ({row2Count})
            </button>
          </div>

          {/* Search & Add */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-44 sm:w-56"
              />
            </div>

            <button
              onClick={handleAddNewItem}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Concern</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredItems.map((item, index) => {
            const displayName = item.name || item.title || 'Untitled';
            return (
              <div
                key={item.id}
                className="border border-gray-200/90 hover:border-blue-300 rounded-xl p-3.5 bg-white transition-all shadow-sm flex items-center justify-between gap-3"
              >
                {/* Left: Visual Badge */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-[#0b1329] p-2 rounded-lg border border-gray-800 flex items-center justify-center shrink-0">
                    <ConcernIcon item={item} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {displayName}
                    </p>
                    {item.subtitle && (
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleRow(item.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                      item.row === 1
                        ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                        : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
                    }`}
                    title="Click to switch Row"
                  >
                    R{item.row}
                  </button>

                  <div className="flex items-center">
                    <button
                      onClick={() => handleMove(item.id, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-slate-700 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(item.id, 'down')}
                      disabled={index === filteredItems.length - 1}
                      className="p-1 text-gray-400 hover:text-slate-700 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDuplicateItem(item)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleEditItem(item)}
                    className="p-1 text-blue-600 hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id, displayName)}
                    className="p-1 text-gray-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-xs">
            No concerns found.
          </div>
        )}
      </div>

      {/* Item Modal (Add / Edit) */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-5 border border-gray-100 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{isNewItem ? 'Add Concern' : 'Edit Concern'}</span>
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-gray-400 hover:text-slate-800 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Preview Inside Modal */}
            <div className="bg-[#0b1329] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ConcernIcon item={editingItem} />
                {(editingItem.name || editingItem.subtitle) && (
                  <div className="flex flex-col text-left">
                    {editingItem.name && (
                      <span className="text-base font-bold tracking-tight text-white leading-none">
                        {editingItem.name}
                      </span>
                    )}
                    {editingItem.subtitle && (
                      <span className="text-[9px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5">
                        {editingItem.subtitle}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider">
                Preview
              </span>
            </div>

            {/* Clean Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Brand / Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                  placeholder="e.g. Next.js, UAE, Figma"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Subtitle <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => (prev ? { ...prev, subtitle: e.target.value } : null))
                  }
                  placeholder="e.g. DIGITAL STORE"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Row</label>
                <select
                  value={editingItem.row}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, row: parseInt(e.target.value) === 2 ? 2 : 1 } : null
                    )
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                >
                  <option value={1}>Row 1 (Forward)</option>
                  <option value={2}>Row 2 (Reversed)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Link URL <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={editingItem.url || ''}
                  onChange={(e) =>
                    setEditingItem((prev) => (prev ? { ...prev, url: e.target.value } : null))
                  }
                  placeholder="https://..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Icon Selection with Device Upload */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <label className="text-xs font-bold text-slate-800">
                Logo Icon Source
              </label>

              {/* Source Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setIconPickerTab('upload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'upload'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload from Device</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIconPickerTab('preset');
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'preset', iconValue: prev.iconValue || 'skillers' } : null
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'preset'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Presets</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIconPickerTab('lucide');
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'lucide', iconValue: 'Building2' } : null
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'lucide'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Icons</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIconPickerTab('svg');
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'svg', iconValue: prev.iconValue || '' } : null
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'svg'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Custom SVG</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIconPickerTab('image');
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'image', iconValue: prev.iconValue || '' } : null
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'image'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image URL</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIconPickerTab('monogram');
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'monogram', iconValue: prev.name?.charAt(0) || 'M' } : null
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    iconPickerTab === 'monogram'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-slate-800'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Monogram</span>
                </button>
              </div>

              {/* Tab 1: Upload from Device */}
              {iconPickerTab === 'upload' && (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/svg+xml,image/png,image/jpeg,image/webp,.svg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2 text-blue-600">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-xs font-bold">Uploading from device...</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-800">
                          Click to upload or drag and drop logo
                        </p>
                        <p className="text-[11px] text-gray-400">
                          SVG, PNG, WebP, JPG (Transparent background recommended)
                        </p>
                      </>
                    )}
                  </div>

                  {editingItem.iconType === 'upload' && editingItem.iconValue && (
                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={editingItem.iconValue}
                          alt="Uploaded Logo"
                          className="w-8 h-8 object-contain rounded bg-[#0b1329] p-1 border border-gray-800"
                        />
                        <span className="text-xs font-medium text-slate-700 truncate max-w-[200px]">
                          Logo ready
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-blue-600 font-bold hover:underline"
                      >
                        Change File
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Brand Presets */}
              {iconPickerTab === 'preset' && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                  {PRESET_ICONS.map((preset) => {
                    const isSelected =
                      editingItem.iconType === 'preset' && editingItem.iconValue === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() =>
                          setEditingItem((prev) =>
                            prev ? { ...prev, iconType: 'preset', iconValue: preset.id } : null
                          )
                        }
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-sm text-blue-600 font-bold'
                            : 'border-gray-200 bg-white hover:border-gray-300 text-slate-700'
                        }`}
                      >
                        <div className="bg-[#0b1329] p-1.5 rounded flex items-center justify-center">
                          <div
                            className="w-5 h-5 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: preset.svg }}
                          />
                        </div>
                        <span className="text-[10px] truncate max-w-full text-center">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 3: Lucide Icons */}
              {iconPickerTab === 'lucide' && (
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search icon..."
                      value={lucideSearch}
                      onChange={(e) => setLucideSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-44 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                    {Object.keys(LUCIDE_CONCERN_ICONS)
                      .filter((key) => key.toLowerCase().includes(lucideSearch.toLowerCase()))
                      .map((key) => {
                        const IconComp = LUCIDE_CONCERN_ICONS[key];
                        const isSelected =
                          editingItem.iconType === 'lucide' && editingItem.iconValue === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setEditingItem((prev) =>
                                prev ? { ...prev, iconType: 'lucide', iconValue: key } : null
                              )
                            }
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-sm text-blue-600'
                                : 'border-gray-200 bg-white hover:border-gray-300 text-slate-700'
                            }`}
                            title={key}
                          >
                            <IconComp className="w-5 h-5" />
                            <span className="text-[9px] truncate max-w-full">{key}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Tab 4: Custom SVG Code */}
              {iconPickerTab === 'svg' && (
                <textarea
                  rows={4}
                  value={editingItem.iconType === 'svg' ? editingItem.iconValue : ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'svg', iconValue: e.target.value } : null
                    )
                  }
                  placeholder={`<svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">...</svg>`}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              )}

              {/* Tab 5: Image URL */}
              {iconPickerTab === 'image' && (
                <input
                  type="text"
                  value={editingItem.iconType === 'image' ? editingItem.iconValue : ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'image', iconValue: e.target.value } : null
                    )
                  }
                  placeholder="https://example.com/logo.png"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              )}

              {/* Tab 6: Monogram */}
              {iconPickerTab === 'monogram' && (
                <input
                  type="text"
                  maxLength={3}
                  value={editingItem.iconType === 'monogram' ? editingItem.iconValue : ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, iconType: 'monogram', iconValue: e.target.value } : null
                    )
                  }
                  placeholder="e.g. W."
                  className="w-24 text-center text-sm font-serif font-bold uppercase px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModalItem}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
              >
                {isNewItem ? 'Add Concern' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
