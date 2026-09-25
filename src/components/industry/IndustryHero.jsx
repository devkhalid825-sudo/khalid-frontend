'use client';

import React from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import Header from '../layouts/Header';

/**
 * Standardized Industry Hero Component
 * Replicates the Blog / LEAP 2026 Hero design system:
 * - Category leaf / badge element with sparkle
 * - Responsive typography (text-3xl on mobile to text-5xl/6xl on desktop)
 * - Decorative ✦ accent and curved arrow
 * - Dual touch-friendly CTA buttons
 * - Hero media card with circular backdrop glow
 * - Zero horizontal overflow
 */
export default function IndustryHero({
  title,
  category = 'Industry Solution',
  hero,
  solutionsCount = 0,
  onStartProject,
}) {
  const headline = hero?.headline || `Enterprise 3D & Immersive Tech for ${title}`;
  const subheadline = hero?.subheadline || `Discover how Elipse Studio powers photorealistic rendering, real-time configurators, and spatial experiences for ${title.toLowerCase()} leaders worldwide.`;
  const heroImage = hero?.image;
  const ctaText = hero?.ctaText || 'Get in Touch';
  const ctaLink = hero?.ctaLink || '/contact';

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-3 sm:px-6 md:px-10 lg:px-14 pt-[85px] sm:pt-[105px] md:pt-[115px] pb-8 sm:pb-12 overflow-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30">
      <Header />

      {/* Decorative ✦ top-left */}
      <div
        className="hidden lg:block absolute top-[110px] lg:top-[130px] left-8 sm:left-12 lg:left-16 text-[#4169E1] text-3xl font-bold select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        ✦
      </div>

      {/* Decorative arrow top-right */}
      <div
        className="hidden lg:block absolute top-[110px] lg:top-[130px] right-8 sm:right-12 lg:right-16 text-[#4169E1] text-lg font-bold select-none pointer-events-none opacity-70 z-10"
        aria-hidden="true"
      >
        <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
          <path
            d="M4 20 Q20 4 40 16 Q52 22 54 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M48 6 L54 10 L50 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-[1500px] mx-auto flex flex-col items-center text-center w-full px-2 sm:px-6 my-auto">
        {/* Leaf / Badge Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase bg-[#4169E1]/10 text-[#4169E1] border border-[#4169E1]/25 shadow-sm">
            <span className="text-xs">✦</span>
            <span>{category}</span>
          </span>
        </div>

        {/* Main Center Headline */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] lg:text-6xl font-bold tracking-tight max-w-4xl leading-[1.08] mb-3 sm:mb-5 px-1 sm:px-4 text-white">
          {title}
          <span className="text-[#4169E1]">.</span>
        </h1>

        {/* Subtitle / Headline from Data */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/90 max-w-3xl mx-auto leading-relaxed mb-3 sm:mb-4 px-2">
          {headline}
        </p>

        {/* Supporting description */}
        {subheadline && (
          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-3">
            {subheadline}
          </p>
        )}

        {/* Metadata Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xs font-medium">
          <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
            <strong className="text-white">Focus:</strong> Immersive 3D & Real-Time
          </span>
          <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
            <strong className="text-white">Deployment:</strong> Global Reach (US · UK · GCC)
          </span>
          {solutionsCount > 0 && (
            <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
              <strong className="text-white">Solutions:</strong> {solutionsCount} Core Areas
            </span>
          )}
        </div>

        {/* Dual CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Link
            href={ctaLink}
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#4169E1] text-white hover:bg-[#3158D4] transition-all duration-200 shadow-lg shadow-[#4169E1]/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            {ctaText}
          </Link>
          <button
            type="button"
            onClick={onStartProject}
            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            Start a Project →
          </button>
        </div>

        {/* Hero Visual Card with Circular Glow */}
        <div className="w-full relative flex flex-col items-center justify-center">
          {/* Circular backdrop glow */}
          <div
            className="absolute w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[46rem] lg:h-[46rem] bg-white/[0.02] border border-white/5 rounded-full -z-10 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <span className="absolute bottom-6 text-neutral-500 text-2xl select-none">⚡</span>
          </div>

          <div className="w-full max-w-[1240px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 relative flex items-center justify-center">
            {heroImage ? (
              <img
                src={heroImage}
                alt={`${title} visualization & solutions`}
                width="1200"
                height="675"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto max-h-[680px] object-contain block mx-auto"
              />
            ) : (
              <div className="w-full min-h-[360px] sm:min-h-[460px] bg-gradient-to-br from-[#0d0d0d] via-[#121829] to-[#0d0d0d] flex items-center justify-center p-6 text-center">
                <div className="space-y-3">
                  <span className="text-[#4169E1] text-4xl block">✦</span>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {title} 3D Experiences
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                    Photorealistic CGI, real-time configurators, and immersive VR built for industry leaders.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
