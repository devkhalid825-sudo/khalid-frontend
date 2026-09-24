'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';

const HeroCTA = () => {
  const { isLight } = useTheme();
  return (
    <section className={`px-[15px] pt-4 pb-4 md:hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-black'}`}>
      <div className="flex items-center justify-start w-full">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-[#4169E1] hover:bg-[#3558c8] active:bg-[#2e4fba] text-white font-medium text-sm sm:text-base tracking-wide rounded-full px-5 py-2.5 transition-all duration-300 shadow-md shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 shrink-0 translate-y-[0.5px]"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="leading-none flex items-center">Contact Us</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroCTA;
