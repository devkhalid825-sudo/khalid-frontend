'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiZap,
  FiMonitor,
  FiFilm,
  FiLayers,
  FiSun,
  FiRadio,
  FiDollarSign,
  FiTrendingUp,
  FiCamera,
  FiBox,
  FiAlertTriangle,
  FiChevronDown,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Placeholder images — swap later with final article visuals
import _heroImg from '../../assets/About-page/roohafza.webp';
import _briefImg from '../../assets/About-page/anamorphicanimation.webp';
import _opticsImg from '../../assets/ElipseImages/projects/0.webp';
import _pipelineImg from '../../assets/About-page/lahore-2.webp';
import _playbackImg from '../../assets/About-page/roohafza-2.png';
import _lahoreImg from '../../assets/About-page/lahore.webp';
import _roohafzaImg from '../../assets/About-page/roohafza.webp';

const heroImg = getImgSrc(_heroImg);
const briefImg = getImgSrc(_briefImg);
const opticsImg = getImgSrc(_opticsImg);
const pipelineImg = getImgSrc(_pipelineImg);
const playbackImg = getImgSrc(_playbackImg);
const lahoreImg = getImgSrc(_lahoreImg);
const roohafzaImg = getImgSrc(_roohafzaImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || '3D anamorphic billboard production'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {actionLink ? (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        {cap && <span className="font-serif italic text-xs sm:text-sm text-zinc-600">{cap}</span>}
        <Link
          href={actionLink}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span>{actionText || 'View Case Study'}</span>
          <FiExternalLink className="text-xs" />
        </Link>
      </div>
    ) : cap ? (
      <p className="font-serif italic text-xs sm:text-sm text-zinc-500 text-center sm:text-left">{cap}</p>
    ) : null}
  </div>
);

const EntryNumber = ({ n }) => (
  <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
    {n}
  </div>
);

const Check = ({ title, children }) => (
  <div className="flex items-start gap-2.5">
    <span className="text-zinc-900 font-bold">✓</span>
    <span className="text-zinc-700">
      {title && <strong>{title}: </strong>}
      {children}
    </span>
  </div>
);

const Cross = ({ title, children }) => (
  <div className="flex items-start gap-2.5">
    <span className="text-zinc-400 font-bold">✕</span>
    <span className="text-zinc-700">
      {title && <strong>{title}: </strong>}
      {children}
    </span>
  </div>
);

const Delivers = ({ label = 'The Elipse Approach', children }) => (
  <div className="bg-black text-white rounded-none p-5 sm:p-6 border border-black shadow-sm mt-5">
    <div className="flex items-center gap-2.5 text-white font-bold font-sans text-xs sm:text-sm uppercase tracking-wider mb-2.5">
      <FiZap className="text-sm sm:text-base text-white shrink-0" />
      <span>{label}</span>
    </div>
    <p className="text-xs sm:text-sm md:text-base text-neutral-100 leading-relaxed font-sans">{children}</p>
  </div>
);

const Pill = ({ children }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-900 border border-zinc-300 mb-2">
    {children}
  </div>
);

/**
 * Responsive data table in the article's black-header style.
 * cols: [{ key, label, span, strong? }] — spans must sum to 12.
 */
const DataTable = ({ icon: Icon, title, cols, rows }) => (
  <div className="w-full border border-zinc-300 bg-white shadow-sm">
    <div className="hidden md:grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider">
      {cols.map((c, i) => (
        <div key={c.key} className={`${spanClass[c.span]} ${i === 0 ? 'text-zinc-400' : c.strong ? 'text-white' : 'text-zinc-300'} pr-2`}>
          {c.label}
        </div>
      ))}
    </div>
    <div className="md:hidden bg-black text-white px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{title}</span>
    </div>
    <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">
      {rows.map((row) => (
        <div key={row[cols[0].key]} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-0 p-4 sm:p-5 items-start md:items-center hover:bg-zinc-50/70 transition-colors">
          {cols.map((c, i) => (
            <div
              key={c.key}
              className={`${mdSpanClass[c.span]} md:pr-3 ${i === 0 ? 'font-bold text-zinc-900 text-sm' : c.strong ? 'font-extrabold text-black' : 'text-zinc-600'}`}
            >
              {i > 0 && <span className="md:hidden font-semibold text-zinc-500">{c.label}: </span>}
              {row[c.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Static class maps so Tailwind picks up every span used above
const spanClass = { 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5' };
const mdSpanClass = { 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5' };

const architectureRows = [
  { arch: '90° Hard Corner Wrap', angle: '90°', depth: 'Maximum (8–12m perceived depth)', best: 'Skyscraper corners, plaza columns' },
  { arch: 'Curved Concave Cabinet', angle: '120°–150°', depth: 'Moderate (4–6m depth)', best: 'Mall atriums, branded experience zones' },
  { arch: 'Cylindrical Column', angle: '360°', depth: 'Limited (looping parallax)', best: 'Transport hubs, stadium pillars' },
  { arch: 'Freestanding Cube', angle: 'All 4 faces', depth: 'High (multi-angle looping)', best: 'Retail plazas, flagship store exteriors' },
];

const resolutionRows = [
  { tier: 'Tier 3 (Local landmark)', pitch: 'P6–P8', config: '6m × 6m', res: '~2K × 2K per face', spec: '4K / 30 FPS' },
  { tier: 'Tier 2 (City prime)', pitch: 'P4–P5', config: '8m × 10m', res: '~3.5K × 3K per face', spec: '6K / 60 FPS' },
  { tier: 'Tier 1 (Times Square / Piccadilly)', pitch: 'P2.5–P3', config: '10m × 12m+', res: '~5K × 4K per face', spec: '8K / 60 FPS' },
  { tier: 'Ultra-Premium (Dubai / NYC landmark)', pitch: 'P1.8–P2', config: '12m × 20m+', res: '~8K × 6K per face', spec: '12–16K / 60 FPS' },
];

const mediaRows = [
  { loc: 'Times Square, NYC', site: 'Corner LED wrap', rate: '$45,000–$80,000/wk', min: '2 weeks', notes: 'Peak Q4 rates +40%' },
  { loc: 'Piccadilly Circus, London', site: 'The Curve LED', rate: '£35,000–£65,000/wk', min: '1 week', notes: 'Single-vendor monopoly' },
  { loc: 'Sheikh Zayed Rd, Dubai', site: 'Premium tower', rate: '$25,000–$50,000/wk', min: '1 week', notes: 'Lower rates, high impact' },
  { loc: 'Regional Prime (Karachi, Lahore)', site: 'Giant corner LED', rate: '$2,000–$8,000/wk', min: '2 weeks', notes: 'High viral potential, low spend' },
];

const productionRows = [
  { tier: 'Essential', res: 'Up to 6K / 30 FPS', dur: '15–30 sec loop', scope: 'Product hero shot, motion graphic elements', fee: '$18,000–$28,000' },
  { tier: 'Standard', res: '8K / 60 FPS', dur: '30–45 sec loop', scope: 'Character/creature, full 3D scene', fee: '$28,000–$45,000' },
  { tier: 'Premium', res: '8K–12K / 60 FPS', dur: '45–60 sec + variants', scope: 'High-detail sim, environmental VFX', fee: '$45,000–$65,000' },
  { tier: 'Flagship', res: '12K–16K / 60 FPS', dur: 'Full campaign suite', scope: 'Film-grade production, multiple assets', fee: '$65,000–$120,000+' },
];

const faqs = [
  {
    q: 'How long does 3D anamorphic billboard production take?',
    a: 'A standard 30–45 second anamorphic content piece from brief to final deliverable takes 8–12 weeks. This includes screen architecture survey, 3D modelling, rigging, simulation, rendering, compositing, and technical mastering. Rush timelines (4–6 weeks) are possible with premium render farm prioritisation but add 20–30% to production cost.',
  },
  {
    q: 'Do we need to own the LED screen to produce anamorphic content?',
    a: 'No. Elipse Studio works with existing LED installations globally — including screens owned by JCDecaux, Clear Channel, and independent operators. We require the technical specifications sheet for your booked screen before production begins. If you have not yet booked a screen, we can advise on locations and operators that have the corner architecture needed for a high-quality anamorphic effect.',
  },
  {
    q: 'Can anamorphic content be re-used across multiple screens?',
    a: 'Only partially. Because the camera frustum is calibrated to a specific corner geometry, a piece produced for a Times Square 90° corner cannot be used unchanged on a Dubai tower with different dimensions. However, the core 3D assets — character models, simulations, and animation rigs — can be re-rendered for a new frustum at approximately 30–40% of the original production cost.',
  },
  {
    q: 'What is the minimum billboard size for a convincing 3D effect?',
    a: 'The minimum viable configuration for a commercially convincing naked-eye 3D effect is a 4m × 4m corner wrap with P5 or better pixel pitch, at a viewing sweet-spot distance of 15m minimum. Below this threshold, pixel density is insufficient to support the micro-parallax cues the brain needs to construct the illusion. For campaigns where social virality is the primary goal, we recommend a minimum 6m × 8m configuration with P4 pitch.',
  },
  {
    q: 'Does Elipse Studio manage media buying in addition to production?',
    a: 'Elipse Studio is a production and creative technology studio, not a media buying agency. We produce the content — including all technical mastering for the specific screen. For media buying, we have established relationships with OOH media owners in Pakistan, UAE, Saudi Arabia, UK, and the US, and can facilitate introductions to the right operators for your target markets.',
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left p-4 sm:p-5 cursor-pointer hover:bg-zinc-50 transition-colors"
      >
        <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-900">{q}</h4>
        <FiChevronDown className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${open ? 'block' : 'hidden'} px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans`}>
        {a}
      </div>
    </div>
  );
};

const AnamorphicBillboardProductionArticle = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSound = () => {
    if (!iframeRef.current) return;
    try {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      const command = nextMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    } catch {
      // ignore
    }
  };

  const marqueeItems = [
    'NAKED-EYE 3D',
    '✦',
    'ANAMORPHIC LED',
    '✦',
    'TIMES SQUARE',
    '✦',
    'PICCADILLY CIRCUS',
    '✦',
    'DUBAI',
    '✦',
    '8K / 60 FPS',
    '✦',
    'GENLOCK SYNC',
    '✦',
    'EARNED MEDIA',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#3558D4]/30 selection:text-white">
      <Header lightHero={true} hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20 bg-white">

        {/* ══════ HERO SECTION ══════ */}
        <section className="relative bg-white text-neutral-900 pt-0 pb-6 sm:pb-8 md:pt-1 md:pb-10 overflow-hidden mb-4 sm:mb-8">
          <div className="hidden lg:block absolute top-2 left-6 text-[#4169E1] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          <div className="hidden lg:block absolute top-2 right-8 text-[#4169E1] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug sm:leading-tight mb-4 sm:mb-6 px-3 sm:px-4">
              <span className="text-[#4169E1]">Commercial 3D Anamorphic Billboards:</span>{' '}
              Engineering Naked-Eye 3D LED Campaigns
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Technical Production Guide
            </p>

            {/* ── PROMINENT HD 16:9 WIDESCREEN VIDEO SHOWCASE ── */}
            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              {/* Subtle backdrop glow */}
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black group z-10">
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/q9HVh2TtG2M?autoplay=1&mute=1&loop=1&playlist=q9HVh2TtG2M&playsinline=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&fs=1&enablejsapi=1"
                  title="Commercial 3D Anamorphic Billboard Production | Elipse Studio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 object-cover"
                />

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleSound}
                  type="button"
                  className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                >
                  {isMuted ? (
                    <FiVolumeX className="text-base text-white/90" />
                  ) : (
                    <FiVolume2 className="text-base text-white/90" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                data-track-id="article-calendly-1"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                Book a production brief ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | November 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a href="#journal" className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer">
                Read Full Breakdown ↓
              </a>
            </div>

            {/* Mobile CTA */}
            <a
              data-track-id="article-calendly-1-mobile"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center justify-center gap-2 w-full max-w-xs px-5 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-lg"
            >
              Book a production brief <FiArrowRight />
            </a>
          </div>
        </section>

        {/* ══════ DARK MARQUEE TICKER ══════ */}
        <section className="my-6 sm:my-10 md:my-12 overflow-hidden border-y border-zinc-200 py-3 sm:py-4 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ EXECUTIVE BRIEFING ══════ */}
        <section className="py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-start">
            <div className="md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">
                Executive Briefing · The Illusion That Stops Traffic
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Why 3D Anamorphic LED Billboards Are the Most Powerful OOH Format of 2026
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A great white shark breaching the corner of a Jeddah skyscraper. A neon dragon coiling out of a Tokyo LED cube. A hypercar accelerating through a Piccadilly screen at 60 frames per second. These are executed commercial campaigns — and the brands behind them capture tens of millions of organic social impressions for a fraction of a Super Bowl slot.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                <strong>3D anamorphic billboard production</strong> — engineering naked-eye optical illusions on giant curved LED screens — has moved from novelty to mainstream media strategy. Times Square alone saw 23 confirmed anamorphic activations in H1 2026, and 3D anamorphic content commands a 40–60% CPM premium over static digital out-of-home.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide is for brand CMOs, creative directors and OOH media buyers entering production for the first time — or who have been quoted wildly different numbers. It draws on benchmarks from our own campaigns, including the{' '}
                <Link href="/project/lahore-zoo" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">Lahore Zoo naked-eye 3D wildlife activation</Link>{' '}
                and the{' '}
                <Link href="/project/anamorphic-animation" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">Rooh Afza billboard series</Link>.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={briefImg}
                  alt="Naked-eye 3D anamorphic animation on a corner LED screen"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                No glasses, no holograms · Pure forced perspective
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Technical &amp; Commercial Production Guide</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ══════ ENTRY 01: OPTICS & SWEET-SPOT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 items-center">
              <div className="md:order-2">
                <EntryNumber n="01" />
                <Pill>Optics, Sweet-Spots &amp; Screen Architecture</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  How Forced Perspective Creates 3D on a Flat (and Curved) Screen
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                  The effect is an engineered optical illusion built on a 400-year-old principle: <strong>anamorphosis</strong>. The render is distorted so it only resolves into correct perspective from one viewing angle — the sweet-spot.
                </p>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The breakthrough is the <strong>90° convex corner wrap</strong>: two flat LED panels joined at a right angle, outer corner facing the audience. Render through a virtual camera frustum that matches that exact geometry and the brain reads both planes as one 3D space — objects appear to leap out into the street.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={opticsImg}
                  cap="One camera frustum, locked to the real corner geometry — Lahore Zoo naked-eye 3D activation"
                  alt="Lahore Zoo 3D anamorphic corner billboard forced perspective illusion"
                />
              </div>
            </article>

            <div className="pb-10 sm:pb-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
                {[
                  ['20–35°', 'Horizontal Angle', 'Off the corner’s bisecting centreline'],
                  ['1.5–3×', 'Viewing Distance', 'Of the LED installation height'],
                  ['15–80m', 'From Screen', 'Depending on pixel pitch (P4–P6)'],
                ].map(([v, l, s]) => (
                  <div key={l} className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-black">{v}</div>
                    <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">{s}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-8">
                For a Times Square 6m × 12m corner, the sweet-spot covers a sidewalk zone roughly 10m wide × 20m deep — 15,000–30,000 passers-by per hour in direct sightline at peak.
              </p>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">Corner Architecture Variants</h4>
              <DataTable
                icon={FiLayers}
                title="LED Screen Architectures"
                cols={[
                  { key: 'arch', label: 'Architecture', span: 3 },
                  { key: 'angle', label: 'Corner Angle', span: 2 },
                  { key: 'depth', label: 'Illusion Depth', span: 3, strong: true },
                  { key: 'best', label: 'Best For', span: 4 },
                ]}
                rows={architectureRows}
              />
            </div>

            {/* ══════ ENTRY 02: PRODUCTION PIPELINE ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="02" />
                  <Pill>Blueprint to 8K Render</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    The 3D Production Pipeline
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                    Before a single frame is animated, the pipeline starts with a precise architectural survey of the LED installation. It isn&apos;t optional — it&apos;s what separates technically correct anamorphic content from content that &quot;almost works.&quot;
                  </p>
                </div>
                <Frame
                  src={pipelineImg}
                  cap="Survey, simulate, render, master — in that order"
                  alt="Lahore Zoo 3D anamorphic wildlife production pipeline"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 1</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">Screen Ingestion &amp; Virtual Environment</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>LED spec sheet: cabinet size, pixel pitch, per-face resolution, refresh rate, nits</Check>
                    <Check>Exact corner model in Blender / Cinema 4D — bezel, frame depth, corner radius (even 10mm matters at 8K)</Check>
                    <Check>Virtual camera frustum matching the real sweet-spot</Check>
                    <Check>Camera locked — all motion comes from animating the asset</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 2</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">Asset Creation &amp; Simulation</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>Fidelity for 15–80m viewing <em>and</em> 2–10× smartphone zoom</Check>
                    <Check>Assets built in a 3D volume extending 2–4m in front of the screen plane</Check>
                    <Check>Lighting matched to real ambient conditions — e.g. daytime HDRI for a 2 PM Dubai slot at 6,000 nits</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 3</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">Compositing &amp; Mastering</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>Colour space conversion to the panel profile (Rec.2020 / Display-P3)</Check>
                    <Check>Brightness ramp for 4,000–8,000 nit outdoor panels</Check>
                    <Check>60 FPS lock (120 FPS where supported), zero dropped frames</Check>
                    <Check>Dual-channel left/right masters, bit-perfect in sync</Check>
                    <Check>ProRes 4444 or HAP; H.265 for lower-tier players</Check>
                  </div>
                </div>
              </div>

              <Delivers label="Lahore Zoo Build Spec">
                Photo-reference-accurate wildlife models at 4–8M polygons, full fur and feather simulation in Houdini, custom crowd simulation for herding sequences, and 8K ray-traced renders at 60 FPS on a distributed render farm.{' '}
                <strong className="text-white font-bold">Broadcast CGI standards are the floor, not the ceiling.</strong>
              </Delivers>
            </article>

            {/* ══════ ENTRY 03: PLAYBACK ENGINEERING ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Tarmac to Times Square</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Technical Playback Engineering: What &quot;8K to 16K Native&quot; Actually Means
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  &quot;8K billboard&quot; is commonly misused. A 10m × 10m P4 corner yields about 2,500 × 2,500 pixels per face — roughly 4K per side, ~5,000 × 2,500 stitched. Premium Times Square sites on P2.5 cabinets reach genuine 8K (7,680 × 4,320 stitched); Dubai towers at P2 reach 12K–16K at full height.
                </p>
              </div>

              <DataTable
                icon={FiMonitor}
                title="Resolution by Location Tier"
                cols={[
                  { key: 'tier', label: 'Location Tier', span: 4 },
                  { key: 'pitch', label: 'Pixel Pitch', span: 2 },
                  { key: 'config', label: 'Corner Config', span: 2 },
                  { key: 'res', label: 'Native Resolution', span: 2 },
                  { key: 'spec', label: 'Min. Render', span: 2, strong: true },
                ]}
                rows={resolutionRows}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start mt-10">
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <FiRadio className="w-5 h-5 text-black shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Dual-Output Frame Sync</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-3">
                      The most common failure in amateur installs: a 1-frame offset at 60 FPS (16.6ms) splits the object at the corner seam and kills the illusion.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <Check>Genlock-capable controllers (NovaStar, Colorlight or equivalent)</Check>
                      <Check>One media server split to both faces — never two players with software sync</Check>
                      <Check>Checkerboard sync test filmed at 240 FPS to catch sub-frame drift</Check>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <FiSun className="w-5 h-5 text-black shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Daytime High-Contrast Grading</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-3">
                      Summer sun delivers 50,000–100,000 lux. Standard 1,000-nit broadcast HDR is effectively invisible.
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <Check>4,000 nit sustained target, 8,000 nit peak highlights</Check>
                      <Check>Shadow floor lifted to 8–12 IRE — pure black vanishes in full sun</Check>
                      <Check>Saturation boost in orange / yellow / cyan</Check>
                      <Check>White-level compression to avoid bloom on phone captures</Check>
                    </div>
                  </div>
                </div>
                <Frame
                  src={playbackImg}
                  cap="Graded for the street, not the edit suite"
                  alt="Rooh Afza anamorphic billboard calibrated for outdoor LED brightness"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: ECONOMICS ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>Media Buying vs. Production Economics</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  The Two-Budget Model Every Media Buyer Must Understand
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Media rental and creative production are <strong>independent budgets</strong> — different vendors, timelines and risk profiles. Treating them as one line item is why most first-time anamorphic campaigns come in 40% over budget.
                </p>
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-2">Media Rental — The Screen Cost</h4>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                Bought from the OOH media owner — JCDecaux, Clear Channel, Lamar or independent operators. Rates vary by tier, booking window and exclusivity.
              </p>
              <DataTable
                icon={FiDollarSign}
                title="Weekly Media Rental"
                cols={[
                  { key: 'loc', label: 'Location', span: 3 },
                  { key: 'site', label: 'Site Type', span: 2 },
                  { key: 'rate', label: 'Weekly Rate', span: 3, strong: true },
                  { key: 'min', label: 'Minimum', span: 2 },
                  { key: 'notes', label: 'Notes', span: 2 },
                ]}
                rows={mediaRows}
              />

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mt-10 mb-2">3D Creative Production — What Elipse Studio Delivers</h4>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                Priced on asset complexity, render resolution, variants and revision cycles — not screen size. Technically correct 8K content needs the same infrastructure on a $5,000/week regional board as on an $80,000/week Times Square site.
              </p>
              <DataTable
                icon={FiFilm}
                title="Production Tiers"
                cols={[
                  { key: 'tier', label: 'Tier', span: 2 },
                  { key: 'res', label: 'Resolution', span: 2 },
                  { key: 'dur', label: 'Duration', span: 2 },
                  { key: 'scope', label: 'Asset Complexity', span: 3 },
                  { key: 'fee', label: 'Production Fee', span: 3, strong: true },
                ]}
                rows={productionRows}
              />

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mt-10 mb-4">Total Campaign Budget Benchmarks (2026)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {[
                  ['$25k–$55k', 'Regional Launch', 'South Asia / MENA tier 2 city'],
                  ['$60k–$120k', 'MENA Tier 1', 'Dubai Sheikh Zayed Rd, 2 weeks'],
                  ['$120k–$200k+', 'Global Flagship', 'Times Square or Piccadilly, 2 weeks'],
                ].map(([v, l, s]) => (
                  <div key={l} className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-black">{v}</div>
                    <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">{s}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                Media + production + technical installation, excluding brand travel and PR.
              </p>
              <Delivers label="Screen-to-Social Package">
                Our turnkey package — pre-production, rendering, technical mastering, on-site playback QA and a social capture-and-edit deliverable — typically represents{' '}
                <strong className="text-white font-bold">35–50% of total campaign investment</strong>, with media rental making up the balance.
              </Delivers>
            </article>

            {/* ══════ ENTRY 05: VIRAL AMPLIFICATION ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="05" />
                <Pill>The Viral Amplification Factor</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  The Most Efficient Earned-Media Vehicle in OOH
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The investment case isn&apos;t billboard impressions — it&apos;s earned media multiplication. Across 40+ documented anamorphic campaigns (2023–2026):
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {[
                  ['8M–25M', 'Earned Impressions', 'Per week live (TikTok, Reels, X)'],
                  ['10:1–30:1', 'Earned vs Paid', 'Digital to paid OOH impressions'],
                  ['$0.50–$3', 'Blended CPM', '~90% below paid social CPMs'],
                ].map(([v, l, s]) => (
                  <div key={l} className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-black">{v}</div>
                    <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">{s}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <FiTrendingUp className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">High Viral Coefficient</span>
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="The reveal moment">A 3–5 second sequence where the asset convincingly crosses the screen boundary — this is what gets filmed.</Check>
                    <Check title="Creatures and vehicles">Tangible objects trigger stronger depth cues than abstract brand graphics.</Check>
                    <Check title="Real reactions">Staged actor reactions are instantly detectable and suppress authenticity.</Check>
                    <Check title="Clean sightlines">Street furniture or competing visuals ruin phone footage.</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <FiAlertTriangle className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Viral Killers</span>
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Cross title="Seam sync drift">Signals &quot;fake&quot; and triggers debunking content that overtakes the original.</Cross>
                    <Cross title="Low brightness">Washed-out daylight content photographs poorly and reads as low-budget.</Cross>
                    <Cross title="Product-only content">A floating shampoo bottle doesn&apos;t share like a creature or environment narrative.</Cross>
                    <Cross title="No on-ground capture">If no one is filming, reach stops at the physical footprint.</Cross>
                  </div>
                </div>
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-4">The Elipse Studio Social Capture Protocol</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  { icon: FiCamera, title: '9:16 vertical edit', body: 'Pre-graded for TikTok / Reels — a different grade than the LED master.' },
                  { icon: FiZap, title: '3–5 second hero clip', body: 'Built for 3-second view completion, the primary TikTok signal.' },
                  { icon: FiBox, title: 'Thumbnail stills', body: 'For LinkedIn and X — stills often out-engage video with professional audiences.' },
                  { icon: FiFilm, title: 'BTS package', body: 'Behind-the-scenes production content — consistently a top performer for B2B audiences.' },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-3 bg-zinc-50 p-4 border border-zinc-200">
                    <Icon className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <span className="text-zinc-700"><strong>{title}:</strong> {body}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* ══════ ENTRY 06: LAHORE ZOO ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="06" />
                <Pill>Case Study · Lahore Zoo</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  Giant Naked-Eye 3D Wildlife Anamorphic Activation
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  One of the most technically ambitious anamorphic activations in South Asia: a full-screen experience celebrating indigenous Pakistani wildlife — snow leopards, Himalayan brown bears and Indus River dolphins.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    ['7', 'Rigged Characters'],
                    ['48–72h', 'Fur Sim / Character'],
                    ['8K · 60', 'FPS, ProRes 4444'],
                    ['3m 45s', 'Looping Suite'],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-neutral-50 border border-neutral-300 p-3 sm:p-4 text-center sm:text-left shadow-sm">
                      <div className="text-lg sm:text-2xl font-extrabold text-black">{v}</div>
                      <p className="text-[10px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    </div>
                  ))}
                </div>
                <Delivers label="The Result">
                  <strong className="text-white font-bold">12M+ organic social impressions in the first 72 hours</strong> — driven by visitor TikTok captures and amplified by Pakistani lifestyle and technology media.
                </Delivers>
              </div>
              <div className="md:order-1">
                <Frame
                  src={lahoreImg}
                  cap="6 activations, 4–8M polygons per character"
                  alt="Lahore Zoo naked-eye 3D wildlife anamorphic billboard by Elipse Studio"
                  actionLink="/project/lahore-zoo"
                />
              </div>
            </article>

            {/* ══════ ENTRY 07: ROOH AFZA ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <EntryNumber n="07" />
                <Pill>Case Study · Rooh Afza</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  Commercial Billboard Series for FMCG
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Proof the format works for FMCG — a category many teams assume is too product-focused. We brought the iconic Rooh Afza glass to life as a 3D object breaking the screen plane, inside the brand&apos;s heritage visual language. Three principles now guide all our FMCG anamorphic work:
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="Product as character">The glass got a custom fluid simulation, pouring in from outside the frame — motion personality, not a floating pack shot.</Check>
                  <Check title="Heritage palette protection">Wide-gamut calibration locked to the brand&apos;s red and green Pantone values at peak outdoor brightness.</Check>
                  <Check title="Ramadan timing">A 2-week window timed to Iftar hours — peak footfall at dusk, when LED contrast and phone captures are at their best.</Check>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={roohafzaImg}
                  cap="The product, given motion personality"
                  alt="Rooh Afza 3D anamorphic billboard with fluid simulation"
                  actionLink="/project/anamorphic-animation"
                />
              </div>
            </article>

            {/* ══════ ENTRY 08: IS IT RIGHT FOR YOU ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="08" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  Is 3D Anamorphic Right for Your Brand?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-3">Maximum ROI When</span>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check>You have a hero product, character or visual asset that benefits from dimensional rendering</Check>
                    <Check>Earned media and awareness rank alongside direct response</Check>
                    <Check>There&apos;s a launch, anniversary or cultural moment with natural shareability</Check>
                    <Check>Competitor advertising in your category is visually undifferentiated</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-3">Standard OOH Is the Better Choice When</span>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Cross>Content needs frequent revisions — the pipeline is 6–12 weeks and offers can&apos;t change after render</Cross>
                    <Cross>The campaign is hyper-local, viewed under 10m on a P6 screen</Cross>
                    <Cross>Total production budget is under $20,000 — a convincing illusion has a floor cost</Cross>
                  </div>
                </div>
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-6">
                Planning a launch that pairs an OOH moment with an interactive product experience? See our{' '}
                <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">3D product configurators</Link>.
              </p>
            </article>

            {/* ══════ ENTRY 09: FAQ ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="09" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  FAQ — Questions from Brand Teams &amp; Media Buyers
                </h3>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Getting Started
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Ready to Engineer Your Anamorphic Activation?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4 max-w-2xl mx-auto">
              We&apos;ve produced anamorphic 3D billboard content for screens across South Asia, the Middle East and international markets — combining architectural survey precision with film-grade CGI, the two non-negotiables of an illusion that actually works.
            </p>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Planning for 2026 or 2027? The production timeline starts now — flagship sites in Times Square and Piccadilly are already booking Q1 2027 dates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a Production Brief</span>
                <FiArrowRight className="text-sm" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Contact Us
              </Link>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-black" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="text-zinc-800" />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-12 text-center">
              <div className="font-serif italic text-2xl text-zinc-900 font-semibold mb-1">Elipse Studio</div>
              <p className="text-[11px] sm:text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">
                Naked-eye 3D anamorphic billboards, commercial CGI, 3D configurators and interactive spatial experiences for global brands.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AnamorphicBillboardProductionArticle;
