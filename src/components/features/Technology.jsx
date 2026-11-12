'use client';

import React from 'react';
import Link from 'next/link';

import { getImgSrc } from '@/utils/api';
import volvoThumbnailRaw from '@/assets/About-page/volvo-thumbnail.webp';

const volvoThumbnail = getImgSrc(volvoThumbnailRaw);
const FALLBACK_PREVIEW_IMG = '/assets/About-page/volvo-thumbnail.webp';

const LiveDemo = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
        <img
          src={volvoThumbnail || FALLBACK_PREVIEW_IMG}
          alt="Volvo 3D Configurator"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_PREVIEW_IMG;
          }}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// Clean Monochrome Minimalist Official Brand Vector Icons
const technologies = [
  {
    name: 'Unreal Engine',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z" />
      </svg>
    ),
  },
  {
    name: '3ds Max',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M6 18V9l6 5.5 6-5.5v9h-3v-4.5L12 16l-3-2V18H6z" fill="currentColor" stroke="none" />
        <path d="M12 6l4.5 4.5-2 2L12 10l-2.5 2.5-2-2L12 6z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Corona',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        <path d="M12 3v2.5m0 13V21M3 12h2.5m13 0H21m-14.36-5.64l1.77 1.77m10.18 10.18l1.77 1.77M18.36 6.36l-1.77 1.77M7.41 17.31l-1.77 1.77" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'V-Ray',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.5 7h4l3 9 3-9h4L13.5 18h-3L5.5 7zm9 0l2.5 6.5 2-4h-2.5l-1 2-1-4.5z" />
      </svg>
    ),
  },
  {
    name: 'ZBrush',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M6.5 8h11l-2 3.5H10.5L17 14v3H6.5l2-3.5h7.5L9.5 10.5V8z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Substance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M12 6.5l5.5 3.2v6.4L12 19.3 6.5 16.1V9.7L12 6.5z" />
        <path d="M12 6.5l5.5 3.2-5.5 3.2-5.5-3.2L12 6.5z" fill="currentColor" fillOpacity="0.25" stroke="none" />
        <path d="M12 13v6.3" />
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="900" letterSpacing="-0.3">Ps</text>
      </svg>
    ),
  },
  {
    name: 'After Effects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="900" letterSpacing="-0.3">Ae</text>
      </svg>
    ),
  },
  {
    name: 'Unity',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <path d="m12.9288 4.2939 3.7997 2.1929c.1366.077.1415.2905 0 .3675l-4.515 2.6076a.4192.4192 0 0 1-.4246 0L7.274 6.8543c-.139-.0745-.1415-.293 0-.3675l3.7972-2.193V0L1.3758 5.5977V16.793l3.7177-2.1456v-4.3858c-.0025-.1565.1813-.2682.318-.1838l4.5148 2.6076a.4252.4252 0 0 1 .2136.3676v5.2127c.0025.1565-.1813.2682-.3179.1838l-3.7996-2.1929-3.7178 2.1457L12 24l9.6954-5.5977-3.7178-2.1457-3.7996 2.1929c-.1341.082-.3229-.0248-.3179-.1838V13.053c0-.1565.087-.2956.2136-.3676l4.5149-2.6076c.134-.082.3228.0224.3179.1838v4.3858l3.7177 2.1456V5.5977L12.9288 0Z" />
      </svg>
    ),
  },
  {
    name: 'PlayCanvas',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <path d="M6.115 0l-.002 3.414 5.823 3.41-5.82 3.414-.003 3.412 11.774-6.826zm11.77 10.35L6.113 17.174 17.887 24l-.002-3.414-5.82-3.412 5.822-3.412z" />
      </svg>
    ),
  },
  {
    name: 'Maya',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M6 8l6 3.5L18 8v9l-6-3.5L6 17V8z" fill="currentColor" stroke="none" />
        <path d="M12 11.5v6.5l6-3.5V8l-6 3.5z" fill="currentColor" fillOpacity="0.4" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Blender',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
        <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626" />
      </svg>
    ),
  },
];

const Technology = () => {
  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-16 bg-black text-white px-[15px] md:px-[40px] overflow-hidden relative">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
        <div className="space-y-8 md:space-y-12 flex flex-col justify-center h-full text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
            Cinematic Real&#8209;Time Technology
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light max-w-md lg:max-w-lg lg:mx-0 mx-auto">
            Most studios are still offline-render shops — pretty pictures, slowly. Elipse Studio pairs traditional photoreal rendering with Unreal Engine real-time technology and Cesium global geospatial data.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 hover:border-white/25 rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col items-center justify-center gap-2.5 group transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 will-change-transform"
              >
                <div className="flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {tech.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 uppercase tracking-wider text-center">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#3558D4] hover:bg-[#2A48B8] text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
            >
              Book Project Consultation
            </Link>

          </div>
        </div>

        <LiveDemo />
      </div>
    </section>
  );
};

export default Technology;
