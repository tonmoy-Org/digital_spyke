'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import Marquee from 'react-fast-marquee';
import {
  FolderKanban,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Edit2,
  UploadCloud,
  Loader2,
  Zap,
  Navigation,
  Sparkles,
  Rocket,
  Target,
  Shield,
  Code2,
  Cpu,
  Layers,
  Globe,
  Award,
  TrendingUp,
  CheckCircle2,
  Compass,
  Palette,
  Briefcase,
  Building2,
  ShoppingBag,
} from 'lucide-react';
import {
  ProjectPoint,
  ProjectImageItem,
  ProjectsSectionData,
  DEFAULT_PROJECTS_DATA,
} from '@/types/projects-industries';

// Dynamically import ReactQuill to prevent SSR hydration mismatches
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-24 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

const quillModules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
};

const quillFormats = ['size', 'bold', 'italic', 'underline', 'strike', 'color', 'background'];

const HEADING_FONT_OPTIONS = [
  { label: 'Medium (2rem)', value: '2rem' },
  { label: 'Default Large (2.5rem)', value: '2.5rem' },
  { label: 'Extra Large (3rem)', value: '3rem' },
  { label: 'Huge (3.5rem)', value: '3.5rem' },
  { label: 'Massive (4rem)', value: '4rem' },
];

const DESCRIPTION_FONT_OPTIONS = [
  { label: 'Small (0.875rem)', value: '0.875rem' },
  { label: 'Default Base (1rem)', value: '1rem' },
  { label: 'Medium (1.125rem)', value: '1.125rem' },
  { label: 'Large (1.25rem)', value: '1.25rem' },
  { label: 'Extra Large (1.5rem)', value: '1.5rem' },
];

const POINT_FONT_OPTIONS = [
  { label: 'Small (0.875rem)', value: '0.875rem' },
  { label: 'Default (1rem)', value: '1rem' },
  { label: 'Medium (1.125rem)', value: '1.125rem' },
  { label: 'Large (1.25rem)', value: '1.25rem' },
];

const POINT_ICONS: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Zap,
  Navigation,
  Sparkles,
  Rocket,
  Target,
  Shield,
  Code2,
  Cpu,
  Layers,
  Globe,
  Award,
  TrendingUp,
  CheckCircle2,
  Compass,
  Palette,
  Briefcase,
  Building2,
  ShoppingBag,
};

function renderPointIcon(point: ProjectPoint) {
  const { iconType, iconValue } = point;

  if (iconType === 'lucide') {
    const IconComponent = POINT_ICONS[iconValue] || Zap;
    return <IconComponent className="w-5 h-5" />;
  }

  if (iconType === 'upload' || (iconType as any) === 'image') {
    if (iconValue) {
      return (
        <img
          src={iconValue}
          alt="Point Icon"
          className="w-5 h-5 object-contain"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );
    }
  }

  if (iconType === 'svg') {
    if (iconValue && iconValue.trim().startsWith('<svg')) {
      return (
        <div
          className="w-5 h-5 flex items-center justify-center fill-current"
          dangerouslySetInnerHTML={{ __html: iconValue }}
        />
      );
    }
  }

  return <Zap className="w-5 h-5" />;
}

export default function ProjectsIndustriesDashboardPage() {
  const [formData, setFormData] = useState<ProjectsSectionData>(DEFAULT_PROJECTS_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState<'all' | 'row1' | 'row2'>('all');

  // Point Editor Modal
  const [editingPoint, setEditingPoint] = useState<ProjectPoint | null>(null);
  const [isNewPoint, setIsNewPoint] = useState(false);

  // File Upload State
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial data (LocalStorage + API)
  useEffect(() => {
    // 1. Check local storage cache for immediate paint
    try {
      const cached = localStorage.getItem('digital_spyke_projects_industries');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.images) && parsed.images.length > 0) {
          setFormData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}

    // 2. Fetch fresh data from API
    async function loadData() {
      try {
        const res = await fetch('/api/projects-industries', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setFormData({
            headingHtml: json.data.headingHtml || DEFAULT_PROJECTS_DATA.headingHtml,
            headingFontSize: json.data.headingFontSize || DEFAULT_PROJECTS_DATA.headingFontSize,
            descriptionHtml: json.data.descriptionHtml || DEFAULT_PROJECTS_DATA.descriptionHtml,
            descriptionFontSize: json.data.descriptionFontSize || DEFAULT_PROJECTS_DATA.descriptionFontSize,
            speedRow1: typeof json.data.speedRow1 === 'number' ? json.data.speedRow1 : 30,
            speedRow2: typeof json.data.speedRow2 === 'number' ? json.data.speedRow2 : 30,
            pauseOnHover: json.data.pauseOnHover !== undefined ? json.data.pauseOnHover : true,
            points: Array.isArray(json.data.points) && json.data.points.length > 0
              ? json.data.points
              : DEFAULT_PROJECTS_DATA.points,
            images: Array.isArray(json.data.images) && json.data.images.length > 0
              ? json.data.images
              : DEFAULT_PROJECTS_DATA.images,
          });
          try {
            localStorage.setItem('digital_spyke_projects_industries', JSON.stringify(json.data));
          } catch {}
        }
      } catch (err) {
        console.error('Failed to load projects data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Helper to persist data to API & LocalStorage
  const persistData = async (dataToSave: ProjectsSectionData) => {
    try {
      localStorage.setItem('digital_spyke_projects_industries', JSON.stringify(dataToSave));
    } catch {}

    await fetch('/api/projects-industries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave),
    });
  };

  // Manual Save Settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await persistData(formData);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'Settings saved successfully',
      });
    } catch (err: any) {
      console.error('Save error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Save Error',
        text: 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to Defaults
  const handleResetToDefault = async () => {
    const result = await Swal.fire({
      title: 'Reset Defaults?',
      text: 'This will restore default headings, points, and images.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1868df',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reset',
    });

    if (result.isConfirmed) {
      const defaultData = JSON.parse(JSON.stringify(DEFAULT_PROJECTS_DATA));
      setFormData(defaultData);
      await persistData(defaultData);
      Swal.fire({
        icon: 'success',
        title: 'Defaults Restored',
        timer: 1800,
        showConfirmButton: false,
      });
    }
  };

  // Upload Images from Device (auto-saves immediately so refresh never loses it)
  const handleDeviceImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploadedImages: ProjectImageItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadData = new FormData();
        uploadData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          newUploadedImages.push({
            id: `img-${Date.now()}-${i}`,
            src: json.url,
            alt: file.name.replace(/\.[^/.]+$/, ''),
            row: activeImageTab === 'row2' ? 2 : 1,
          });
        }
      }

      if (newUploadedImages.length > 0) {
        const updatedImages = [...newUploadedImages, ...formData.images];
        const updatedFormData = {
          ...formData,
          images: updatedImages,
        };

        setFormData(updatedFormData);
        // Persist immediately so page refresh never loses uploaded images!
        await persistData(updatedFormData);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'success',
          title: `Uploaded & Saved ${newUploadedImages.length} image(s)`,
        });
      }
    } catch (err) {
      console.error('Upload error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'Failed to upload image(s).',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete Image
  const handleDeleteImage = async (id: string) => {
    if (formData.images.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'At least one project image is required.',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    });

    if (result.isConfirmed) {
      const updatedImages = formData.images.filter((img) => img.id !== id);
      const updatedFormData = { ...formData, images: updatedImages };
      setFormData(updatedFormData);
      await persistData(updatedFormData);
    }
  };

  // Move Image Left / Right
  const handleMoveImage = async (id: string, direction: 'left' | 'right') => {
    const index = formData.images.findIndex((img) => img.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.images.length) return;

    const updated = [...formData.images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const updatedFormData = { ...formData, images: updated };
    setFormData(updatedFormData);
    await persistData(updatedFormData);
  };

  // Toggle Image Row (1 <-> 2)
  const handleToggleImageRow = async (id: string) => {
    const updatedImages = formData.images.map((img) =>
      img.id === id ? { ...img, row: (img.row === 1 ? 2 : 1) as 1 | 2 } : img
    );
    const updatedFormData = { ...formData, images: updatedImages };
    setFormData(updatedFormData);
    await persistData(updatedFormData);
  };

  // Highlight Point Actions
  const handleAddNewPoint = () => {
    const nextNum = (formData.points.length + 1).toString().padStart(2, '0');
    const newPoint: ProjectPoint = {
      id: `point-${Date.now()}`,
      number: nextNum,
      iconType: 'lucide',
      iconValue: 'Sparkles',
      text: 'New highlight point description.',
      fontSize: '1rem',
    };
    setEditingPoint(newPoint);
    setIsNewPoint(true);
  };

  const handleEditPoint = (point: ProjectPoint) => {
    setEditingPoint({ ...point, fontSize: point.fontSize || '1rem' });
    setIsNewPoint(false);
  };

  const handleSavePoint = async () => {
    if (!editingPoint) return;
    let updatedPoints = [...formData.points];
    if (isNewPoint) {
      updatedPoints.push(editingPoint);
    } else {
      updatedPoints = updatedPoints.map((p) =>
        p.id === editingPoint.id ? editingPoint : p
      );
    }

    const updatedFormData = { ...formData, points: updatedPoints };
    setFormData(updatedFormData);
    await persistData(updatedFormData);
    setEditingPoint(null);
  };

  const handleDeletePoint = async (id: string) => {
    if (formData.points.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'At least one highlight point is required.',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Highlight Point?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    });

    if (result.isConfirmed) {
      const updatedPoints = formData.points.filter((p) => p.id !== id);
      const updatedFormData = { ...formData, points: updatedPoints };
      setFormData(updatedFormData);
      await persistData(updatedFormData);
    }
  };

  // Filtered Images
  const filteredImages = useMemo(() => {
    return formData.images.filter((img) => {
      if (activeImageTab === 'row1' && img.row !== 1) return false;
      if (activeImageTab === 'row2' && img.row !== 2) return false;
      return true;
    });
  }, [formData.images, activeImageTab]);

  const row1Images = formData.images.filter((i) => i.row === 1);
  const row2Images = formData.images.filter((i) => i.row === 2);

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading Projects & Industries...</p>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
            Home Landing Page
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-blue-600" />
            Projects & Industries
          </h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold transition-all shadow-sm"
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

      {/* 1. Heading & Description (Text Editors + Font Size Controls) */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm pb-2 border-b border-gray-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Heading & Description</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Heading Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Heading</label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500 font-medium">Size:</span>
                <select
                  value={formData.headingFontSize || '2.5rem'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, headingFontSize: e.target.value }))}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white font-semibold text-blue-600"
                >
                  {HEADING_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
              <ReactQuill
                theme="snow"
                value={formData.headingHtml}
                onChange={(val) => setFormData((prev) => ({ ...prev, headingHtml: val }))}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white [&_.ql-editor]:min-h-[80px] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-none"
              />
            </div>
          </div>

          {/* Description Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-500 font-medium">Size:</span>
                <select
                  value={formData.descriptionFontSize || '1rem'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, descriptionFontSize: e.target.value }))}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white font-semibold text-blue-600"
                >
                  {DESCRIPTION_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
              <ReactQuill
                theme="snow"
                value={formData.descriptionHtml}
                onChange={(val) => setFormData((prev) => ({ ...prev, descriptionHtml: val }))}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white [&_.ql-editor]:min-h-[80px] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-none"
              />
            </div>
          </div>
        </div>

        {/* Marquee Speeds */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Row 1 Speed</label>
              <span className="text-xs text-blue-600 font-bold">{formData.speedRow1 || 30}</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={formData.speedRow1 || 30}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, speedRow1: parseInt(e.target.value) || 30 }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Row 2 Speed</label>
              <span className="text-xs text-blue-600 font-bold">{formData.speedRow2 || 30}</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={formData.speedRow2 || 30}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, speedRow2: parseInt(e.target.value) || 30 }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-between">
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

      {/* 2. Highlight Points (01, 02...) */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <Zap className="w-4 h-4 text-purple-600" />
            <span>Highlight Points</span>
          </div>

          <button
            onClick={handleAddNewPoint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Point</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {formData.points.map((point, index) => (
            <div
              key={point.id || index}
              className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/50 hover:bg-white transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {point.number}
                </span>

                <div className="text-purple-600 shrink-0">
                  {renderPointIcon(point)}
                </div>

                <div
                  style={{ fontSize: point.fontSize || '1rem' }}
                  className="text-slate-800 font-medium line-clamp-2 min-w-0"
                  dangerouslySetInnerHTML={{ __html: point.text }}
                />
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleEditPoint(point)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Point"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeletePoint(point.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Point"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Project Images (Device Upload & Rows) */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <span>Project Images</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveImageTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeImageTab === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              All ({formData.images.length})
            </button>
            <button
              onClick={() => setActiveImageTab('row1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeImageTab === 'row1'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Row 1 ({row1Images.length})
            </button>
            <button
              onClick={() => setActiveImageTab('row2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeImageTab === 'row2'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Row 2 ({row2Images.length})
            </button>
          </div>
        </div>

        {/* Device Upload Dropzone */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.svg"
          className="hidden"
          onChange={(e) => handleDeviceImageUpload(e.target.files)}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDeviceImageUpload(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-blue-600 py-2">
              <Loader2 className="w-7 h-7 animate-spin" />
              <span className="text-xs font-bold">Uploading & Saving...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Click or drag & drop images to upload
              </p>
              <p className="text-[11px] text-gray-400">
                PNG, JPG, WebP, SVG • Automatically saved to {activeImageTab === 'row2' ? 'Row 2' : 'Row 1'}
              </p>
            </>
          )}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
          {filteredImages.map((image, index) => (
            <div
              key={image.id || index}
              className="group border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full bg-gray-950 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <button
                  onClick={() => handleToggleImageRow(image.id)}
                  className={`absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md border ${
                    image.row === 1
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-indigo-600 text-white border-indigo-400'
                  }`}
                  title="Click to toggle Row"
                >
                  R{image.row}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="p-2 flex items-center justify-between gap-1 border-t border-gray-100">
                <div className="flex items-center">
                  <button
                    onClick={() => handleMoveImage(image.id, 'left')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-slate-700 disabled:opacity-20"
                    title="Move Left"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveImage(image.id, 'right')}
                    disabled={index === filteredImages.length - 1}
                    className="p-1 text-gray-400 hover:text-slate-700 disabled:opacity-20"
                    title="Move Right"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Live Preview */}
      <div className="bg-[#091021] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 text-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </div>
        </div>

        <div className="py-2 space-y-5">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div
              style={{ fontSize: formData.headingFontSize || '2.5rem' }}
              className="font-bold tracking-tight text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: formData.headingHtml }}
            />
            <div
              style={{ fontSize: formData.descriptionFontSize || '1rem' }}
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formData.descriptionHtml }}
            />
          </div>

          {/* Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {formData.points.map((p, i) => (
              <div
                key={`prev-pt-${p.id || i}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <span className="w-7 h-7 rounded bg-white/10 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {p.number}
                </span>
                <div className="text-purple-400 shrink-0">
                  {renderPointIcon(p)}
                </div>
                <div
                  style={{ fontSize: p.fontSize || '1rem' }}
                  className="text-white"
                  dangerouslySetInnerHTML={{ __html: p.text }}
                />
              </div>
            ))}
          </div>

          {/* Marquee Row 1 */}
          {row1Images.length > 0 && (
            <Marquee
              gradient={true}
              speed={formData.speedRow1 || 30}
              pauseOnHover={formData.pauseOnHover}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={80}
            >
              {row1Images.map((img, i) => (
                <div
                  key={`prev-r1-${img.id || i}`}
                  className="w-48 h-28 rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] mx-2 relative shrink-0"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </Marquee>
          )}

          {/* Marquee Row 2 */}
          {row2Images.length > 0 && (
            <Marquee
              direction="right"
              gradient={true}
              speed={formData.speedRow2 || 30}
              pauseOnHover={formData.pauseOnHover}
              gradientColor="hsl(220, 65%, 3.52%)"
              gradientWidth={80}
            >
              {row2Images.map((img, i) => (
                <div
                  key={`prev-r2-${img.id || i}`}
                  className="w-48 h-28 rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] mx-2 relative shrink-0"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </Marquee>
          )}
        </div>
      </div>

      {/* Point Modal (Add / Edit) */}
      {editingPoint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 space-y-4 border border-gray-100 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>{isNewPoint ? 'Add Highlight Point' : 'Edit Highlight Point'}</span>
              </h2>
              <button
                onClick={() => setEditingPoint(null)}
                className="p-1.5 text-gray-400 hover:text-slate-800 rounded-lg hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Point Number</label>
                  <input
                    type="text"
                    value={editingPoint.number}
                    onChange={(e) =>
                      setEditingPoint((prev) => (prev ? { ...prev, number: e.target.value } : null))
                    }
                    placeholder="01"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Text Size</label>
                  <select
                    value={editingPoint.fontSize || '1rem'}
                    onChange={(e) =>
                      setEditingPoint((prev) => (prev ? { ...prev, fontSize: e.target.value } : null))
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-semibold text-blue-600"
                  >
                    {POINT_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Point Text Rich Text Editor */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Point Description
                </label>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <ReactQuill
                    theme="snow"
                    value={editingPoint.text}
                    onChange={(val) =>
                      setEditingPoint((prev) => (prev ? { ...prev, text: val } : null))
                    }
                    modules={quillModules}
                    formats={quillFormats}
                    className="bg-white [&_.ql-editor]:min-h-[70px] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-none"
                  />
                </div>
              </div>

              {/* Icon Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Select Icon</label>
                <div className="grid grid-cols-6 gap-1.5 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                  {Object.keys(POINT_ICONS).map((key) => {
                    const IconComp = POINT_ICONS[key];
                    const isSelected =
                      editingPoint.iconType === 'lucide' && editingPoint.iconValue === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setEditingPoint((prev) =>
                            prev ? { ...prev, iconType: 'lucide', iconValue: key } : null
                          )
                        }
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50 shadow-sm text-purple-600'
                            : 'border-gray-200 bg-white hover:border-gray-300 text-slate-700'
                        }`}
                        title={key}
                      >
                        <IconComp className="w-4 h-4" />
                        <span className="text-[8px] truncate max-w-full">{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setEditingPoint(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePoint}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md"
              >
                {isNewPoint ? 'Add Point' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
