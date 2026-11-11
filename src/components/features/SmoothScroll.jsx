'use client';

import { useEffect } from 'react';

// Buttery inertial scrolling (Lenis loaded dynamically to avoid build-time failure if lenis package is missing on server).
const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Touch devices already have native momentum scrolling — leave it alone.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let lenisInstance = null;
    let rafId = null;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (!Lenis) return;
        lenisInstance = new Lenis({
          lerp: 0.085, // even, glassy glide (lower = smoother/longer)
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });

        const raf = (time) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        // If lenis isn't installed on the environment, fallback silently to native scrolling
        console.warn('Smooth scroll (lenis) skipped:', err?.message || err);
      });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
