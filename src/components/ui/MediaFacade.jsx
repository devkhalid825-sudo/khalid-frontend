'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

// ── Scroll-idle mount queue ──
// Booting a YouTube embed costs ~100–150ms of main-thread JS. Mounting several
// mid-scroll caused visible scroll jank, so players are mounted one at a time,
// only after scrolling has been idle for a moment.
const IDLE_MS = 350;
const GAP_MS = 250;
let lastScrollAt = 0;
let listening = false;
const queue = [];
let draining = false;

const ensureScrollListener = () => {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener('scroll', () => { lastScrollAt = performance.now(); }, { passive: true });
  window.addEventListener('wheel', () => { lastScrollAt = performance.now(); }, { passive: true });
};

const drain = () => {
  if (draining) return;
  draining = true;
  const step = () => {
    if (!queue.length) { draining = false; return; }
    const since = performance.now() - lastScrollAt;
    if (since < IDLE_MS) { setTimeout(step, IDLE_MS - since + 20); return; }
    const job = queue.shift();
    const run = () => { job.fn(); setTimeout(step, GAP_MS); };
    if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 800 });
    else setTimeout(run, 0);
  };
  step();
};

const scheduleMount = (fn) => {
  ensureScrollListener();
  const job = { fn };
  queue.push(job);
  drain();
  return () => {
    const i = queue.indexOf(job);
    if (i !== -1) queue.splice(i, 1);
  };
};

/**
 * MediaFacade
 * 
 * Replaces heavy auto-loading YouTube iframes and HTML5 video tags with a lightweight
 * poster facade. The real iframe/video is only mounted into the DOM when the user interacts
 * or when `isActive` is explicitly true.
 * 
 * When unmounted / inactive, WebKit/Chrome media decoders are instantly released, preventing
 * iOS Safari crashes and main-thread freezing.
 */
export default function MediaFacade({
  videoUrl,
  posterUrl,
  title = 'Video player',
  isActive = false,
  autoPlay = false,
  muted = true,
  controls = true,
  loop = true,
  className = '',
  aspectRatio = 'aspect-video',
  onEnded,
  setRef,
  chromeless = false,
}) {
  const [userActivated, setUserActivated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ytId = useMemo(() => getYouTubeId(videoUrl), [videoUrl]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // `isActive` players wait for the scroll-idle queue; a click mounts instantly.
  const [idleReady, setIdleReady] = useState(false);
  useEffect(() => {
    if (!isActive) return undefined;
    let alive = true;
    const cancel = scheduleMount(() => { if (alive) setIdleReady(true); });
    return () => { alive = false; cancel(); setIdleReady(false); };
  }, [isActive]);

  const shouldRenderPlayer = mounted && ((isActive && idleReady) || userActivated);

  const resolvedPoster = useMemo(() => {
    if (posterUrl) return posterUrl;
    if (ytId) return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    return null;
  }, [posterUrl, ytId]);

  if (shouldRenderPlayer) {
    if (ytId) {
      const muteParam = muted ? '1' : '0';
      const autoPlayParam = (autoPlay || userActivated) ? '1' : '0';
      // chromeless: hide YouTube's own controls/overlays; the parent drives play/mute via the JS API
      const chromeParams = chromeless
        ? `&controls=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0${loop ? `&loop=1&playlist=${ytId}` : ''}`
        : '';
      const embedSrc = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=${autoPlayParam}&mute=${muteParam}&enablejsapi=1&playsinline=1&rel=0&modestbranding=1${chromeParams}`;

      return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
          <iframe
            ref={setRef}
            src={embedSrc}
            title={title}
            className={`w-full h-full border-0 ${chromeless ? 'pointer-events-none' : ''}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          ref={setRef}
          src={videoUrl}
          poster={resolvedPoster || undefined}
          autoPlay={autoPlay || userActivated}
          muted={muted}
          controls={controls}
          loop={loop}
          playsInline
          onEnded={onEnded}
          className={`w-full h-full ${chromeless ? "object-contain" : "object-cover"} bg-black`}
        />
      </div>
    );
  }

  // Lightweight Facade Placeholder: Zero GPU / decoder allocation
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play ${title}`}
      onClick={() => setUserActivated(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setUserActivated(true);
        }
      }}
      className={`group relative w-full h-full overflow-hidden bg-[#1a1a1c] cursor-pointer flex items-center justify-center select-none ${className}`}
    >
      {resolvedPoster ? (
        <Image
          src={resolvedPoster}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#222] flex items-center justify-center text-zinc-600">
          <span className="text-xs uppercase tracking-widest font-mono">Video Preview</span>
        </div>
      )}

      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

      {/* Play button indicator */}
      <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#4169E1] text-white flex items-center justify-center shadow-lg shadow-[#4169E1]/40 transform group-hover:scale-110 transition-transform">
        <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
