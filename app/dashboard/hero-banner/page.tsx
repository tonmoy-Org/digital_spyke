'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import { Save, Plus, Trash2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR window hydration errors
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-24 bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400 font-medium">
      Loading Editor...
    </div>
  ),
});

interface HeroData {
  brandTitle: string;
  tagline: string;
  animatedTexts: string[];
  location: string;
  titleFontSize: string;
  taglineFontSize: string;
  typewriterFontSize: string;
  locationFontSize: string;
}

const DEFAULT_HERO: HeroData = {
  brandTitle: 'DIGITAL SPYKE',
  tagline: 'FULL-STACK AGENCY',
  animatedTexts: [
    'In  Web Design',
    'In  Search Engine Optimization',
    'In  Brand Design',
  ],
  location: 'Toronto, Canada',
  titleFontSize: '6rem',
  taglineFontSize: '2rem',
  typewriterFontSize: '3rem',
  locationFontSize: '1.125rem',
};

const TITLE_FONT_OPTIONS = [
  { label: 'Small (3rem / 48px)', value: '3rem' },
  { label: 'Medium (4rem / 64px)', value: '4rem' },
  { label: 'Large (5rem / 80px)', value: '5rem' },
  { label: 'Default Large (6rem / 96px)', value: '6rem' },
  { label: 'Extra Large (7rem / 112px)', value: '7rem' },
  { label: 'Huge (8rem / 128px)', value: '8rem' },
  { label: 'Gigantic (9rem / 144px)', value: '9rem' },
  { label: 'Max (10rem / 160px)', value: '10rem' },
];

const TAGLINE_FONT_OPTIONS = [
  { label: 'Small (1rem / 16px)', value: '1rem' },
  { label: 'Medium (1.25rem / 20px)', value: '1.25rem' },
  { label: 'Semi Large (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Large (1.75rem / 28px)', value: '1.75rem' },
  { label: 'Default Large (2rem / 32px)', value: '2rem' },
  { label: 'Extra Large (2.5rem / 40px)', value: '2.5rem' },
  { label: 'Huge (3rem / 48px)', value: '3rem' },
];

const TYPEWRITER_FONT_OPTIONS = [
  { label: 'Small (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Medium (2.25rem / 36px)', value: '2.25rem' },
  { label: 'Default Large (3rem / 48px)', value: '3rem' },
  { label: 'Extra Large (4rem / 64px)', value: '4rem' },
  { label: 'Huge (5rem / 80px)', value: '5rem' },
];

const LOCATION_FONT_OPTIONS = [
  { label: 'Small (0.875rem / 14px)', value: '0.875rem' },
  { label: 'Default Medium (1.125rem / 18px)', value: '1.125rem' },
  { label: 'Large (1.5rem / 24px)', value: '1.5rem' },
  { label: 'Extra Large (2rem / 32px)', value: '2rem' },
  { label: 'Huge (2.5rem / 40px)', value: '2.5rem' },
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'align',
];

export default function HeroBannerPage() {
  const [formData, setFormData] = useState<HeroData>(DEFAULT_HERO);
  const [newAnimatedText, setNewAnimatedText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  // Fetch Hero Banner Data on mount
  useEffect(() => {
    async function fetchHeroData() {
      try {
        const res = await fetch('/api/hero-banner', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.hero) {
          setFormData({
            brandTitle: data.hero.brandTitle || DEFAULT_HERO.brandTitle,
            tagline: data.hero.tagline || DEFAULT_HERO.tagline,
            animatedTexts:
              Array.isArray(data.hero.animatedTexts) && data.hero.animatedTexts.length > 0
                ? data.hero.animatedTexts
                : DEFAULT_HERO.animatedTexts,
            location: data.hero.location || DEFAULT_HERO.location,
            titleFontSize: data.hero.titleFontSize || DEFAULT_HERO.titleFontSize,
            taglineFontSize: data.hero.taglineFontSize || DEFAULT_HERO.taglineFontSize,
            typewriterFontSize: data.hero.typewriterFontSize || DEFAULT_HERO.typewriterFontSize,
            locationFontSize: data.hero.locationFontSize || DEFAULT_HERO.locationFontSize,
          });
        }
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHeroData();
  }, []);

  const handleInputChange = (field: keyof HeroData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAnimatedText = () => {
    if (!newAnimatedText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      animatedTexts: [...prev.animatedTexts, newAnimatedText.trim()],
    }));
    setNewAnimatedText('');
    setPreviewKey((k) => k + 1);
  };

  const handleRemoveAnimatedText = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      animatedTexts: prev.animatedTexts.filter((_, i) => i !== index),
    }));
    setPreviewKey((k) => k + 1);
  };

  const handleAnimatedTextEdit = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.animatedTexts];
      updated[index] = value;
      return { ...prev, animatedTexts: updated };
    });
    setPreviewKey((k) => k + 1);
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      try {
        localStorage.setItem('digital_spyke_hero_banner', JSON.stringify(formData));
      } catch (err) {}

      const res = await fetch('/api/hero-banner', {
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
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Hero Banner settings updated successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: data.message || 'Failed to save settings',
        });
      }
    } catch (err) {
      console.error('Save error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Build TypeAnimation sequence array from animatedTexts
  const typeAnimationSequence = React.useMemo(() => {
    if (formData.animatedTexts.length === 0) return ['In  Web Design', 1200];
    const seq: (string | number)[] = [];
    formData.animatedTexts.forEach((txt) => {
      const cleanText = txt.replace(/<[^>]*>?/gm, '');
      seq.push(cleanText, 1200);
    });
    return seq;
  }, [formData.animatedTexts]);

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 text-xs font-semibold">Loading Hero Settings...</p>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
      {/* Top Header */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Hero Banner</h1>
        </div>

        <button
          onClick={() => handleSaveSettings()}
          disabled={isSaving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-800 border-b border-gray-100 pb-3">
            Configuration
          </h2>

          <div className="space-y-6 text-xs">
            {/* Main Brand Title Editor & Size Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Main Brand Title</label>

                {/* Font Size Selector for Main Title */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">Size:</span>
                  <select
                    value={formData.titleFontSize}
                    onChange={(e) => handleInputChange('titleFontSize', e.target.value)}
                    className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {TITLE_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
                <ReactQuill
                  theme="snow"
                  value={formData.brandTitle}
                  onChange={(val) => handleInputChange('brandTitle', val)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="e.g. DIGITAL SPYKE"
                />
              </div>
            </div>

            {/* Subheading / Agency Tagline & Size Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Subheading / Agency Tagline</label>

                {/* Font Size Selector for Tagline */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">Size:</span>
                  <select
                    value={formData.taglineFontSize}
                    onChange={(e) => handleInputChange('taglineFontSize', e.target.value)}
                    className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {TAGLINE_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
                <ReactQuill
                  theme="snow"
                  value={formData.tagline}
                  onChange={(val) => handleInputChange('tagline', val)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="e.g. FULL-STACK AGENCY"
                />
              </div>
            </div>

            {/* Typewriter Animated Titles & Size Control */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Typewriter Animated Titles</label>

                {/* Font Size Selector for Typewriter Titles */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">Size:</span>
                  <select
                    value={formData.typewriterFontSize}
                    onChange={(e) => handleInputChange('typewriterFontSize', e.target.value)}
                    className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {TYPEWRITER_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {formData.animatedTexts.map((text, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-gray-400 font-mono text-[11px] w-5 text-right">{idx + 1}.</span>
                    <input
                      type="text"
                      value={text.replace(/<[^>]*>?/gm, '')}
                      onChange={(e) => handleAnimatedTextEdit(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAnimatedText(idx)}
                      disabled={formData.animatedTexts.length <= 1}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Animated Text */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newAnimatedText}
                  onChange={(e) => setNewAnimatedText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAnimatedText();
                    }
                  }}
                  placeholder="e.g. In Search Engine Optimization"
                  className="flex-1 px-3 py-2 bg-white border border-dashed border-gray-300 rounded-lg text-slate-800 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddAnimatedText}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Location Editor & Size Control */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Location / Footer Line</label>

                {/* Font Size Selector for Location */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">Size:</span>
                  <select
                    value={formData.locationFontSize}
                    onChange={(e) => handleInputChange('locationFontSize', e.target.value)}
                    className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {LOCATION_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
                <ReactQuill
                  theme="snow"
                  value={formData.location}
                  onChange={(val) => handleInputChange('location', val)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="e.g. Toronto, Canada"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Real-time Preview */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
              <h2 className="text-sm font-bold text-slate-800">Live Preview</h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Matches Website
              </span>
            </div>

            {/* Simulated Homepage Dark Smoke Hero Frame */}
            <div
              key={previewKey}
              className="p-8 bg-black text-white rounded-2xl border border-gray-900 shadow-2xl space-y-5 text-center relative overflow-hidden min-h-[380px] flex flex-col items-center justify-center"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black pointer-events-none" />

              {/* Brand Title (HTML & Dynamic Style FontSize rendered) */}
              <div
                style={{ fontSize: formData.titleFontSize || '6rem' }}
                className="font-extrabold text-white tracking-tighter relative z-10 [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 leading-none transition-all"
                dangerouslySetInnerHTML={{ __html: formData.brandTitle || 'DIGITAL SPYKE' }}
              />

              {/* Agency Tagline (HTML & Dynamic Style FontSize rendered) */}
              <div
                style={{ fontSize: formData.taglineFontSize || '2rem' }}
                className="text-gray-300 tracking-widest font-light uppercase relative z-10 [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 leading-normal transition-all"
                dangerouslySetInnerHTML={{ __html: formData.tagline || 'FULL-STACK AGENCY' }}
              />

              {/* Typewriter Animation Preview (Dynamic Style FontSize rendered) */}
              <div className="min-h-[40px] flex items-center justify-center relative z-10">
                <h2
                  style={{ fontSize: formData.typewriterFontSize || '3rem' }}
                  className="font-light text-white tracking-wider leading-none transition-all"
                >
                  <TypeAnimation
                    key={JSON.stringify(typeAnimationSequence)}
                    sequence={typeAnimationSequence}
                    wrapper="span"
                    speed={50}
                    deletionSpeed={70}
                    className="text-cyan-400 font-normal inline-block"
                    repeat={Infinity}
                  />
                </h2>
              </div>

              {/* Location Text (HTML & Dynamic Style FontSize rendered) */}
              <div
                style={{ fontSize: formData.locationFontSize || '1.125rem' }}
                className="text-gray-400 tracking-wide mt-2 relative z-10 [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 leading-normal transition-all"
                dangerouslySetInnerHTML={{ __html: formData.location || 'Toronto, Canada' }}
              />

              {/* Subtle bottom edge line */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
