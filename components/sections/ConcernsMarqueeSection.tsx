'use client';

import React, { useState, useEffect } from 'react';
import { Marquee } from '@/components/magicui/marquee';
import { ConcernItem, ConcernsSectionData, DEFAULT_CONCERNS_DATA } from '@/types/concerns';
import ConcernIcon from '@/components/sections/ConcernIcon';

function IconCard({ item }: { item: ConcernItem }) {
  const content = (
    <div className="relative flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]">
      <div className="flex items-center gap-2.5 px-2 py-1 sm:px-3 sm:py-1.5">
        <ConcernIcon item={item} />
        {(item.name || item.title || item.subtitle) && (
          <div className="flex flex-col text-left">
            {(item.name || item.title) && (
              <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-none whitespace-nowrap">
                {item.name || item.title}
              </span>
            )}
            {item.subtitle && (
              <span className="text-[9px] tracking-widest text-gray-300 font-semibold uppercase leading-tight mt-0.5 whitespace-nowrap">
                {item.subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center transition-all duration-300 select-none mx-2 sm:mx-4 opacity-70 hover:opacity-100 hover:scale-105"
        title={item.name || item.title}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="group relative flex items-center justify-center cursor-pointer transition-all duration-300 select-none mx-2 sm:mx-4 opacity-70 hover:opacity-100 hover:scale-105"
      title={item.name || item.title}
    >
      {content}
    </div>
  );
}

export default function ConcernsMarqueeSection() {
  const [data, setData] = useState<ConcernsSectionData>(DEFAULT_CONCERNS_DATA);

  useEffect(() => {
    // 1. Try local storage cache for immediate paint
    try {
      const cached = localStorage.getItem('digital_spyke_our_concerns');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          setData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Fetch fresh data from API
    async function loadData() {
      try {
        const res = await fetch('/api/our-concerns', { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          try {
            localStorage.setItem('digital_spyke_our_concerns', JSON.stringify(json.data));
          } catch {
            // Ignore storage write error
          }
        }
      } catch (err) {
        console.warn('Failed to load Our Concerns data from API:', err);
      }
    }

    loadData();
  }, []);

  const row1Items = (data.items || []).filter((item) => item.row === 1);
  const row2Items = (data.items || []).filter((item) => item.row === 2);

  // Fallback to row1 if row2 is empty, or vice versa
  const finalRow1 = row1Items.length > 0 ? row1Items : data.items || [];
  const finalRow2 = row2Items.length > 0 ? row2Items : data.items || [];

  const durationRow1 = `${Math.max(10, data.speedRow1 || 40)}s`;
  const durationRow2 = `${Math.max(10, data.speedRow2 || 40)}s`;

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Title */}
      {data.showTitle !== false && (
        <div className="relative z-10 text-center mb-8 sm:mb-12 px-4">
          <h3
            style={{ fontSize: data.titleFontSize || '0.875rem' }}
            className="font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            {data.title || 'Our Concerns'}
          </h3>
        </div>
      )}

      {/* Marquee Container with subtle edge fade masks */}
      <div className="relative flex w-full flex-col items-center justify-center gap-4 sm:gap-6 overflow-hidden">
        {/* Row 1 - Forward */}
        {finalRow1.length > 0 && (
          <Marquee
            pauseOnHover={data.pauseOnHover !== false}
            style={{ '--duration': durationRow1 } as React.CSSProperties}
            className="[--gap:1rem] sm:[--gap:1.5rem]"
          >
            {finalRow1.map((item) => (
              <IconCard key={item.id} item={item} />
            ))}
          </Marquee>
        )}

        {/* Row 2 - Reversed */}
        {finalRow2.length > 0 && (
          <Marquee
            reverse
            pauseOnHover={data.pauseOnHover !== false}
            style={{ '--duration': durationRow2 } as React.CSSProperties}
            className="[--gap:1rem] sm:[--gap:1.5rem]"
          >
            {finalRow2.map((item) => (
              <IconCard key={item.id} item={item} />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
