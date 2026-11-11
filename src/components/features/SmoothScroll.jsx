'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Buttery inertial scrolling (Lenis). Mounted only where used (Home page),
// and fully torn down on unmount so other pages keep native scrolling.
// Elements that need their own native scroll can add `data-lenis-prevent`.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Touch devices already have native momentum scrolling — leave it alone.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      lerp: 0.085, // even, glassy glide (lower = smoother/longer)
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
