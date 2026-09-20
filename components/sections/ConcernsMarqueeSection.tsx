'use client';

import React from 'react';
import { Marquee } from '@/components/magicui/marquee';

interface ConcernIconItem {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

// Row 1 Concerns & Relevant Tech Icons
const firstRowConcerns: ConcernIconItem[] = [
  {
    id: 'skillers',
    name: 'SKILLERS ZONE LTD',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 40 40">
          <path d="M20 4C11.16 4 4 11.16 4 20c0 6.64 4.02 12.34 9.77 14.73l2.84-3.5A12.02 12.02 0 0 1 8 20c0-6.63 5.37-12 12-12s12 5.37 12 12c0 4.2-2.16 7.9-5.46 10.05l2.45 3.8A15.93 15.93 0 0 0 36 20c0-8.84-7.16-16-16-16z" />
          <path d="M25 15l-10 6 5 2-3 4 10-6-5-2 3-4z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-wider text-white font-sans leading-none uppercase">
            SKILLERS
          </span>
          <span className="text-[9px] tracking-[0.28em] text-gray-300 font-semibold uppercase leading-tight mt-0.5 border-t border-gray-600 pt-0.5">
            ZONE LTD
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'tagless',
    name: 'Tagless Society',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-7 h-7 shrink-0 stroke-white fill-none stroke-[2.2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M5 3h6.586a1 1 0 0 1 .707.293l8.414 8.414a2 2 0 0 1 0 2.828l-5.172 5.172a2 2 0 0 1-2.828 0L4.293 11.293A1 1 0 0 1 4 10.586V5a2 2 0 0 1 2-2z" />
          <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-none">
            Tagless
          </span>
          <span className="text-[10px] tracking-widest text-gray-300 font-medium lowercase leading-tight">
            Society
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'uae-store',
    name: 'UAE DIGITAL STORE',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2.2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-wider text-white font-mono leading-none">
            UAE
          </span>
          <span className="text-[8.5px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5">
            DIGITAL STORE
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'unity-hand',
    name: 'Unity Hand Foundation',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fillOpacity="0.3" />
          <path d="M9 11h6v2H9zm-2 4h10v2H7z" fill="white" />
          <path d="M18 7l-3-3-1.41 1.41L15.17 7H3v2h12.17l-1.58 1.59L15 12l3-3z" fill="white" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-none">
            Unity Hand
          </span>
          <span className="text-[9px] tracking-widest text-gray-400 font-medium uppercase leading-tight mt-0.5 border-t border-gray-600/70 pt-0.5">
            Foundation
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'meerab',
    name: 'MEERAB Properties',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-extrabold tracking-widest text-white leading-none uppercase">
            MEERAB
          </span>
          <span className="text-[9px] tracking-[0.25em] text-gray-300 font-light uppercase leading-tight mt-0.5">
            Properties
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'western-loom',
    name: 'Western Loom',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center shrink-0">
          <span className="text-xs font-serif font-bold italic text-white">W.</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-serif tracking-wide text-white leading-none">
            Western Loom
          </span>
          <span className="text-[9px] tracking-widest text-gray-400 font-sans uppercase leading-tight mt-0.5">
            Textile & Apparel
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'study-line',
    name: 'STUDY LINE CONSULTANCY',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-sm sm:text-base font-bold tracking-wider text-white leading-none uppercase">
            STUDY LINE
          </span>
          <span className="text-[8.5px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5">
            CONSULTANCY
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 180 180">
          <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
            <circle cx="90" cy="90" fill="black" r="90" />
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="white" strokeWidth="6" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
            <rect fill="white" height="72" width="12" x="115" y="54" />
          </g>
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
          Next.js
        </span>
      </div>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-7 h-7 shrink-0 text-white fill-current" viewBox="0 0 38 57">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white">
          Figma
        </span>
      </div>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 109.5 124.5">
          <path d="M95.6 27.6c-.3-.2-1-.3-1.6-.3s-.4-.3-.4-.5c-.3-2.9-1.5-12.8-4.2-15.5-2.2-2.2-5.4-2.5-9.3-1-1.2-2.9-3.2-5.4-6.3-7.2-4.9-2.8-10.8-3.3-16.1-1.3-4.2 1.6-8 4.7-10.7 8.9-6.3.7-12.4 2.8-14.7 9.4-.8 2.2-1 4.7-1.1 7.6-5.8 1.8-9.8 3.1-10 3.2-3.1 1-3.2 1.2-3.6 4.3-.3 2.4-8.8 67.8-8.8 67.8l69.7 13.2 39.4-8.2s-22.1-70.2-22.4-70.5zm-33.1-19.1c3.5-1.3 7.8-1 11.2.9 2.5 1.4 4.1 3.5 5 5.8-5.3 1.9-11.4 4.2-18 6.7 1.4-5.5 4.1-10.1 7.2-12.2-.4-.4-.8-.8-1.2-1.2z" />
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white">
          Shopify
        </span>
      </div>
    ),
  },
];

// Row 2 Concerns & Relevant Tech Icons (Reversed)
const secondRowConcerns: ConcernIconItem[] = [
  {
    id: 'alfahd',
    name: 'Al-Fahd Academy',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-serif font-bold tracking-wide text-white leading-none">
            Al-Fahd
          </span>
          <span className="text-[9px] tracking-[0.25em] text-gray-300 font-sans uppercase leading-tight mt-0.5">
            Academy
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'bpo-doctor',
    name: 'BPO DOCTOR',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-none">
            BPO
          </span>
          <span className="text-[9px] tracking-widest text-gray-300 font-bold uppercase leading-tight mt-0.5">
            DOCTOR
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'news-bd',
    name: 'The News Bangladesh',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-serif font-black tracking-normal text-white leading-none">
            The News
          </span>
          <span className="text-[9px] tracking-[0.22em] text-gray-300 font-sans uppercase leading-tight mt-0.5 border-t border-gray-600 pt-0.5">
            Bangladesh
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'khariddar',
    name: 'Khariddar',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-7 h-7 shrink-0 text-white fill-none stroke-white stroke-[2.2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-bold text-white leading-none">
            খরিদ্দার
          </span>
          <span className="text-[9px] tracking-widest text-gray-400 font-sans uppercase leading-tight mt-0.5">
            Khariddar
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'safr',
    name: 'SAFR Travels',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-widest text-white leading-none italic uppercase">
            SAFR
          </span>
          <span className="text-[8.5px] tracking-widest text-gray-400 font-sans uppercase leading-tight mt-0.5">
            Travel & Tour
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'bd-beponi',
    name: 'bd beponi',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-bold text-white leading-none">
            bd beponi
          </span>
          <span className="text-[8px] tracking-wide text-gray-400 uppercase leading-tight mt-0.5">
            The Ultimate Shopping Hub
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'careone-bd',
    name: 'CareOneBD',
    renderLogo: () => (
      <div className="flex items-center gap-2.5 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-none">
            CareOneBD
          </span>
          <span className="text-[8.5px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5">
            Healthcare
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'react',
    name: 'React',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-none stroke-white stroke-[1.8]" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="white" />
          <g stroke="white">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
          React
        </span>
      </div>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
          Tailwind CSS
        </span>
      </div>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-7 h-7 shrink-0 text-white fill-current" viewBox="0 0 24 24">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12 4.5h8.5v3.25h-2.5v11.75H14.5V7.75H12V4.5zM4 9.25h6.5c.345 0 .625.28.625.625v1.25a.625.625 0 0 1-.625.625H6.75c-.414 0-.75.336-.75.75v1c0 .414.336.75.75.75H9c1.519 0 2.75 1.231 2.75 2.75v1A2.75 2.75 0 0 1 9 20.5H2.5a.625.625 0 0 1-.625-.625v-1.25c0-.345.28-.625.625-.625H6c.414 0 .75-.336.75-.75v-1c0-.414-.336-.75-.75-.75H3.75A2.75 2.75 0 0 1 1 12.75v-1A2.75 2.75 0 0 1 3.75 9H4z" />
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
          TypeScript
        </span>
      </div>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    renderLogo: () => (
      <div className="flex items-center gap-2 px-4 py-2">
        <svg className="w-8 h-8 shrink-0 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387L3.454 9.883C3.15 9.006 3 8.026 3 7c0-2.206.897-4.206 2.344-5.656C7.29 2.146 9.53 1.5 12 1.5c2.47 0 4.71.646 6.656 1.844C20.103 4.794 21 6.794 21 9c0 1.026-.15 2.006-.454 2.883l-4.753 13.504C20.562 23.8 24 19.302 24 12c0-6.627-5.373-12-12-12zm-1.027 18.067L6.44 5.926C7.545 4.72 9.08 4 10.78 4c.646 0 1.27.108 1.854.307L8.47 18.42c.81.42 1.72.67 2.68.67.6 0 1.18-.09 1.73-.25l2.42-7.07 1.85 5.38c-1.39 1.04-3.14 1.67-5.02 1.67-.39 0-.77-.03-1.15-.09z" />
        </svg>
        <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
          WordPress
        </span>
      </div>
    ),
  },
];

function IconCard({ item }: { item: ConcernIconItem }) {
  return (
    <div
      className="group relative flex items-center justify-center cursor-pointer transition-all duration-300 select-none mx-2 sm:mx-4 opacity-70 hover:opacity-100 hover:scale-105"
      title={item.name}
    >
      <div className="relative flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]">
        {item.renderLogo()}
      </div>
    </div>
  );
}

export default function ConcernsMarqueeSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 overflow-hidden ">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.06] blur-[120px] rounded-full" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 px-4">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          Our Concerns
        </h3>
      </div>

      {/* Marquee Container with subtle edge fade masks */}
      <div className="relative flex w-full flex-col items-center justify-center gap-4 sm:gap-6 overflow-hidden">
        {/* Row 1 - Forward */}
        <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem] sm:[--gap:1.5rem]">
          {firstRowConcerns.map((item) => (
            <IconCard key={item.id} item={item} />
          ))}
        </Marquee>

        {/* Row 2 - Reversed */}
        <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:1rem] sm:[--gap:1.5rem]">
          {secondRowConcerns.map((item) => (
            <IconCard key={item.id} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
