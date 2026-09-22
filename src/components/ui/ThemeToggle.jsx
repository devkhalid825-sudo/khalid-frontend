'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { FaSun, FaMoon } from '@/components/ui/Icons';

export default function ThemeToggle({ className = '', variant = 'header' }) {
  const { theme, isLight, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 opacity-60 ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'menu-item') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 ${
          isLight
            ? 'bg-black/5 hover:bg-black/10 text-black border-black/10'
            : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
        } ${className}`}
        aria-label={isLight ? 'Switch to Dark mode' : 'Switch to Light mode'}
      >
        <span className="flex items-center gap-2.5">
          {isLight ? (
            <FaSun className="w-4 h-4 text-black" />
          ) : (
            <FaMoon className="w-4 h-4 text-white" />
          )}
          <span>{isLight ? 'Day Mode' : 'Night Mode'}</span>
        </span>
        <span className="text-xs uppercase tracking-wider font-bold opacity-60">
          {isLight ? 'Light Active' : 'Dark Active'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative p-2 sm:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-md active:scale-90 ${
        isLight
          ? 'border-black/20 bg-black/5 text-black hover:border-black/50 hover:bg-black/10'
          : 'border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10'
      } ${className}`}
      aria-label={isLight ? 'Light mode active - Switch to Dark mode' : 'Dark mode active - Switch to Light mode'}
      title={isLight ? 'Switch to Dark mode' : 'Switch to Light mode'}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {isLight ? (
          <FaSun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black transition-colors" />
        ) : (
          <FaMoon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white transition-colors" />
        )}
      </div>
    </button>
  );
}
