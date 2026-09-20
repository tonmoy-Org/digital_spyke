'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { BlurIn } from '@/components/magicui/blur-in';
import SmokeBackground from '@/components/ui/SmokeBackground';
import { OrbitingCirclesDemo } from '@/components/sections/OrbitingCirclesDemo';

const DEFAULT_HERO = {
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

export default function HeroSection() {
  const [heroData, setHeroData] = useState(DEFAULT_HERO);

  useEffect(() => {
    // 1. Try local storage cache for immediate paint
    try {
      const cached = localStorage.getItem('digital_spyke_hero_banner');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.brandTitle) {
          setHeroData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      // Ignore storage errors
    }

    // 2. Fetch fresh data from API
    async function loadHero() {
      try {
        const res = await fetch('/api/hero-banner', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.hero) {
          const freshData = {
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
          };
          setHeroData(freshData);
          try {
            localStorage.setItem('digital_spyke_hero_banner', JSON.stringify(freshData));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Failed to load hero banner data:', err);
      }
    }
    loadHero();
  }, []);

  const typeSequence = useMemo(() => {
    const seq: (string | number)[] = [];
    heroData.animatedTexts.forEach((txt) => {
      // Strip HTML tags for clean typewriter animation
      const cleanText = txt.replace(/<[^>]*>?/gm, '');
      seq.push(cleanText, 1200);
    });
    return seq;
  }, [heroData.animatedTexts]);

  const isTaglineHtml = /<[a-z][\s\S]*>/i.test(heroData.tagline);
  const isLocationHtml = /<[a-z][\s\S]*>/i.test(heroData.location);

  return (
    <div className="relative w-full min-h-[60vh] h-screen flex flex-col items-center justify-start pt-20 sm:pt-28 lg:pt-32 overflow-hidden bg-black">
      {/* Dynamic Animated Smoke Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SmokeBackground intensity={1.15} />
      </div>

      {/* Content */}
      <section className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <BlurIn
          key={heroData.brandTitle + heroData.titleFontSize}
          word={heroData.brandTitle}
          style={{ fontSize: heroData.titleFontSize || '6rem' }}
          className="font-bold text-white mb-6 sm:mb-8 tracking-tighter leading-none transition-all"
          duration={1.2}
        />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isTaglineHtml ? (
            <div
              style={{ fontSize: heroData.taglineFontSize || '2rem' }}
              className="text-white tracking-widest font-light mb-4 sm:mb-6 uppercase [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 leading-normal transition-all"
              dangerouslySetInnerHTML={{ __html: heroData.tagline }}
            />
          ) : (
            <h3
              style={{ fontSize: heroData.taglineFontSize || '2rem' }}
              className="text-white tracking-widest font-light mb-4 sm:mb-6 uppercase leading-normal transition-all"
            >
              {heroData.tagline}
            </h3>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: heroData.typewriterFontSize || '3rem' }}
          className="font-light text-white mb-3 sm:mb-4 leading-tight tracking-wider sm:tracking-widest transition-all"
        >
          <TypeAnimation
            key={JSON.stringify(typeSequence)}
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            deletionSpeed={70}
            className="text-accent inline-block ml-1 sm:ml-2"
            repeat={Infinity}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontSize: heroData.locationFontSize || '1.125rem' }}
          className="text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto tracking-wide sm:tracking-wider mt-4 sm:mt-5 transition-all"
        >
          {isLocationHtml ? (
            <div
              className="[&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0"
              dangerouslySetInnerHTML={{ __html: heroData.location }}
            />
          ) : (
            <p>{heroData.location}</p>
          )}
        </motion.div>
      </section>

      {/* Orbiting Circles at bottom of Hero Section (1/2 visible) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-10 pointer-events-none flex items-center justify-center ">
        <OrbitingCirclesDemo />
      </div>

      {/* Bottom subtle edge blend */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}