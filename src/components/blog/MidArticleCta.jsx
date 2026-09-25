'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function MidArticleCta({
  title = 'Ready to launch a custom 3D configurator?',
  description = 'We build real-time WebGL product configurators for enterprise brands — Shopify integration, photorealistic rendering, any device.',
  buttonText = 'Request an interactive demo →',
  buttonLink = '/contact',
  className = '',
}) {
  const themeContext = useTheme();
  const isLight = themeContext?.isLight || false;

  return (
    <aside
      aria-label="Interactive 3D Configurator Callout"
      className={`w-full rounded-2xl p-5 sm:p-7 md:p-9 transition-colors duration-200 text-left border ${
        isLight
          ? 'bg-neutral-50 border-neutral-200 shadow-sm'
          : 'bg-[#141414] border-white/10 shadow-lg'
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h3
            className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs sm:text-sm font-normal leading-relaxed ${
              isLight ? 'text-neutral-600' : 'text-zinc-400'
            }`}
          >
            {description}
          </p>
        </div>

        <div className="shrink-0 self-start md:self-auto pt-1 md:pt-0">
          <Link
            href={buttonLink}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all whitespace-nowrap shadow-sm hover:shadow ${
              isLight
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8]'
                : 'bg-[#4169E1] hover:bg-[#3158D4]'
            }`}
          >
            <span>{buttonText}</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
