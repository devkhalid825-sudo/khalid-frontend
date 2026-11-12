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
  FiLayers,
  FiDollarSign,
  FiGlobe,
  FiChevronDown,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// kumar-hd / nevegan-hd are 1600px WebP versions of kumar.png and Nevegan.jpg (~2MB originals).
import _heroImg from '../../assets/About-page/kumar-hd.webp';
import _timBarthImg from '../../assets/About-page/tim-barth.webp';
import _dayNightImg from '../../assets/About-page/virtual-tour-1.png';
import _villaImg from '../../assets/About-page/modern-villas.webp';
import _neveganImg from '../../assets/About-page/nevegan-hd.webp';

const heroImg = getImgSrc(_heroImg);
const timBarthImg = getImgSrc(_timBarthImg);
const dayNightImg = getImgSrc(_dayNightImg);
const villaImg = getImgSrc(_villaImg);
const neveganImg = getImgSrc(_neveganImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';
const KUMAR_TOUR_URL = '/kumar-residence-360-vitrual-tour/';
const HERO_VIDEO_ID = 'rn0Lf782Cug';

const Frame = ({ src, cap, alt, actionLink, actionText, external }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Interactive 3D virtual tour for luxury real estate'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {actionLink ? (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        {cap && <span className="font-serif italic text-xs sm:text-sm text-zinc-600">{cap}</span>}
        <a
          href={actionLink}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span>{actionText || 'View Project'}</span>
          <FiExternalLink className="text-xs" />
        </a>
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

const Stat = ({ v, l, s }) => (
  <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
    <div className="text-2xl sm:text-3xl font-extrabold text-black">{v}</div>
    <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
    {s && <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">{s}</p>}
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
const spanClass = { 4: 'col-span-4', 5: 'col-span-5', 7: 'col-span-7' };
const mdSpanClass = { 4: 'md:col-span-4', 5: 'md:col-span-5', 7: 'md:col-span-7' };

const comparisonRows = [
  { feature: 'Movement', tour: 'Fixed hotspot positions', ue5: 'Continuous free movement' },
  { feature: 'Lighting', tour: 'Fixed at capture time', ue5: 'Full time-of-day control' },
  { feature: 'Finish variants', tour: 'Fixed at shoot time', ue5: 'Real-time material swapping' },
  { feature: 'VR', tour: '360 video (look around only)', ue5: 'Full 6DOF VR on Meta Quest' },
  { feature: 'Spatial accuracy', tour: 'Camera-angle dependent', ue5: '1:1 scale from BIM' },
  { feature: 'Update cost', tour: 'Full reshoot for any change', ue5: 'Material parameter update' },
  { feature: 'Remote buyers', tour: 'Yes', ue5: 'Yes (WebRTC Pixel Streaming)' },
  { feature: 'Production cost', tour: '$8K–$25K', ue5: '$35K–$120K' },
];

const suiteCostRows = [
  { item: 'Construction and fit-out', range: '$80K–$220K' },
  { item: 'FF&E at specification level', range: '$40K–$150K' },
  { item: 'Branding, graphics, AV', range: '$15K–$40K' },
  { item: 'Operations (per month)', range: '$4K–$12K' },
  { item: 'Reshoots and material updates', range: '$10K–$30K' },
  { item: 'Dismantling at campaign end', range: '$5K–$15K' },
  { item: 'Total over 24 months', range: '$214K–$595K' },
];

const faqs = [
  {
    q: 'What is the difference between a 360 virtual tour and an interactive 3D walkthrough?',
    a: 'A 360 tour is a set of fixed panoramic viewpoints that buyers jump between by clicking hotspots, shot with one finish specification and one lighting condition. An Unreal Engine 5 walkthrough is a real-time 3D environment: buyers move freely and continuously, change the time of day, and swap finishes such as marble, timber and kitchen stone instantly.',
  },
  {
    q: 'How much does an interactive 3D sales environment cost compared to a physical sales suite?',
    a: 'A full UE5 sales environment typically costs $35,000–$120,000 to produce and $2,000–$4,000 per month to run. Over a 24-month campaign that is $83,000–$216,000, compared with $214,000–$595,000 for a physical sales suite in a tier-1 market.',
  },
  {
    q: 'Can international buyers view the walkthrough without a VR headset?',
    a: 'Yes. With WebRTC Pixel Streaming, buyers open a link in any browser on a laptop, iPad or TV. The full-quality environment renders on a cloud GPU and streams to their device, so their own hardware does not limit the visual quality.',
  },
  {
    q: 'How long does it take to build a UE5 walkthrough from BIM files?',
    a: 'About 14 weeks: BIM and CAD ingestion (weeks 1–3), the UE5 environment build (weeks 4–9), multi-device deployment for VR, kiosk and streaming (weeks 10–12), and sales team training and launch (weeks 13–14).',
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

const VirtualTours360VsUe5Article = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  const toggleSound = () => {
    if (!iframeRef.current) return;
    try {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: nextMuted ? 'mute' : 'unMute', args: [] }),
        '*'
      );
    } catch {
      // ignore
    }
  };

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

  const marqueeItems = [
    'OFF-PLAN SALES',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    'LUMEN & NANITE',
    '✦',
    'META QUEST 3',
    '✦',
    'PIXEL STREAMING',
    '✦',
    'DUBAI · MIAMI · LONDON',
    '✦',
    'REAL-TIME FINISHES',
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

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug sm:leading-tight mb-4 sm:mb-6 px-3 sm:px-4">
              <span className="text-[#4169E1]">Interactive 3D Virtual Tours vs 360 Video:</span>{' '}
              Closing High-Net-Worth Off-Plan Buyers
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Developer Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black group z-10">
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&playsinline=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=1&enablejsapi=1`}
                  title="Interactive 3D Virtual Tour for Luxury Real Estate | Elipse Studio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 object-cover"
                />
                <button
                  onClick={toggleSound}
                  type="button"
                  className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                >
                  {isMuted ? <FiVolumeX className="text-base text-white/90" /> : <FiVolume2 className="text-base text-white/90" />}
                </button>
              </div>
            </div>

            <div className="mt-2 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                data-track-id="article-calendly-1"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                Book a BIM review ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | November 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a href="#journal" className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer">
                Read the Guide ↓
              </a>
            </div>

            <a
              data-track-id="article-calendly-1-mobile"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center justify-center gap-2 w-full max-w-xs px-5 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-lg"
            >
              Book a BIM review <FiArrowRight />
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
                Executive Briefing · Selling a Building That Does Not Exist Yet
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Why the Physical Sales Suite No Longer Scales
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                Off-plan sales ask buyers to commit seven, eight or nine figures to a building that is not built. The show flat made that leap tangible — but it now breaks on two fronts.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                <strong>Geography:</strong> the buyer for a $5M Dubai penthouse or a $3M Miami duplex is in London, Singapore, Riyadh or New York — not next to your sales suite. <strong>Cost:</strong> a developer-grade suite runs $150,000–$500,000 to build, plus operating costs for the whole campaign.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                <strong>Interactive 3D virtual tours built on Unreal Engine 5</strong> solve both — at a fidelity that 360 video and floor plans cannot reach. Here is the technology difference, the hardware options, the ROI and the production process.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={timBarthImg}
                  alt="Luxury kitchen interior from the Tim Barth interactive virtual tour by Elipse Studio"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Stone, light and proportion — what a floor plan cannot show ·{' '}
                <Link href="/project/tim-barth" className="underline hover:text-[#2563EB]">Tim Barth virtual tour</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Luxury Off-Plan Developer Guide</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ══════ ENTRY 01: THE OFF-PLAN DILEMMA ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="01" />
                <Pill>The Off-Plan Sales Dilemma</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  What Floor Plans and 360 Tours Fail to Communicate
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  A floor plan tells a buyer that 220 sqm is large. It does not let them <em>feel</em> the ceiling height, the depth of the living room opening onto the terrace, or morning light across the kitchen stone — the qualities that justify a $4M price. 360 tours close part of that gap, and work well for mid-market, finished homes. For luxury off-plan sales to international investors they fall short in three ways:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Static camera positions">8–20 fixed viewpoints joined by jump cuts. The buyer never builds a continuous sense of the space.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="No finish choice">Shot with one specification. Buyers cannot see the apartment they are actually buying, with their marble and timber.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="No dynamic lighting">The light is whatever it was on shoot day — often not the morning light the marketing promises.</Cross>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 02: REAL-TIME UE5 ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="02" />
                  <Pill>360 Video vs Real-Time UE5</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    What a Real-Time Walkthrough Enables
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    An Unreal Engine 5 walkthrough is not a video — it is a live 3D environment. Buyers move freely with a VR controller, touchscreen or mouse, with no fixed camera positions.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Lumen lighting">Set any time of day — sunrise, midday, golden hour, city lights — in one session.</Check>
                    <Check title="Instant finish swaps">Pick a marble from the swatch panel and the whole apartment updates in a fraction of a second.</Check>
                    <Check title="Nanite detail">Stone edges, reveal joints and plaster texture at photographic polygon density.</Check>
                    <Check title="1:1 scale">Built from the BIM model, so ceiling heights and proportions are geometrically accurate.</Check>
                  </div>
                </div>
                <Frame
                  src={dayNightImg}
                  cap="Teleport menu and day/night toggle inside one real-time walkthrough"
                  alt="Unreal Engine 5 apartment walkthrough with teleportation menu and day and night lighting control"
                />
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">Head-to-Head Comparison</h4>
              <DataTable
                icon={FiLayers}
                title="360 Tour vs UE5 Walkthrough"
                cols={[
                  { key: 'feature', label: 'Feature', span: 4 },
                  { key: 'tour', label: '360 Panoramic Tour', span: 4 },
                  { key: 'ue5', label: 'UE5 Real-Time Walkthrough', span: 4, strong: true },
                ]}
                rows={comparisonRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4">
                The cost gap is real, but it is not a like-for-like comparison: a 360 tour is a finished asset fixed on shoot day, while a UE5 environment is a sales platform that shows any finish, in any light, on any device, for the whole campaign.
              </p>
            </article>

            {/* ══════ ENTRY 03: HARDWARE ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Sales Gallery Hardware</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  One 3D Environment, Three Ways to Deploy It
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The same optimised model serves every buyer context in the campaign.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Mode 1</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">Untethered VR · Meta Quest 3</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>Highest-fidelity spatial experience for galleries, roadshows and expos</Check>
                    <Check>No cables — buyers walk the apartment freely</Check>
                    <Check>Sales agent &quot;director&quot; iPad controls finishes and time of day alongside the buyer</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Mode 2</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">65&quot; 4K Touchscreen Kiosk</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>For buyers who skip the headset, and for group presentations</Check>
                    <Check>Touch to walk, tap swatches, slide the time of day</Check>
                    <Check>Local RTX-class PC rendering at 60 FPS</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Mode 3</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">WebRTC Pixel Streaming</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>Remote investors open a link in any browser</Check>
                    <Check>Rendered on a cloud GPU, quality independent of their device</Check>
                    <Check>Shared sessions let an agent guide a buyer 8,000 miles away</Check>
                  </div>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 04: ROI ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>Measurable Commercial ROI</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  What a Digital Sales Environment Saves and Generates
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  A physical suite for a luxury tower in London, Dubai, New York or Singapore:
                </p>
              </div>

              <DataTable
                icon={FiDollarSign}
                title="Physical Sales Suite Cost"
                cols={[
                  { key: 'item', label: 'Cost Component', span: 7 },
                  { key: 'range', label: 'Typical Range', span: 5, strong: true },
                ]}
                rows={suiteCostRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4 mb-8">
                A full UE5 environment — BIM modelling, finish library, VR and kiosk builds, and streaming — costs $35,000–$120,000 to produce and $2,000–$4,000 per month to run. Over 24 months that is <strong>$83,000–$216,000</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <Stat v="$131k–$379k" l="Saved vs Physical Suite" s="Over a 24-month campaign" />
                <Stat v="40%" l="Faster to Reservation" s="International buyers, first contact to reservation" />
                <Stat v="4" l="Countries, Zero Site Visits" s="Kumar Residence pre-launch buyers" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <FiGlobe className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Remote Qualification</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    International buyers experience the product before they travel. The first site visit happens later, once conviction is already built — compressing the sales cycle.
                  </p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-3">
                    <FiMonitor className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Finish Confidence</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Buyers who chose their marble in their own apartment&apos;s light make far fewer post-reservation change requests than those who chose from physical swatches.
                  </p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 05: BLUEPRINT ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="05" />
                <Pill>BIM to Multi-Device Launch</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  The 4-Phase Developer Blueprint (14 Weeks)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  {
                    phase: 'Phase 1 · Weeks 1–3',
                    title: 'BIM & CAD Ingestion',
                    items: ['Revit / ArchiCAD to FBX or glTF', 'Strip engineering geometry, add interior detail', 'PBR library for every finish option'],
                  },
                  {
                    phase: 'Phase 2 · Weeks 4–9',
                    title: 'UE5 Environment Build',
                    items: ['Nanite meshes, Lumen GI with real sun angle', 'Real-time finish-swap system', 'Time-of-day presets, guided tour and director mode'],
                  },
                  {
                    phase: 'Phase 3 · Weeks 10–12',
                    title: 'Multi-Device Deployment',
                    items: ['Meta Quest 3 build via enterprise distribution', 'Locked-down kiosk build', 'Pixel Streaming GPU pool, queue and TURN server'],
                  },
                  {
                    phase: 'Phase 4 · Weeks 13–14',
                    title: 'Sales Integration & Launch',
                    items: ['Two-day sales team training', 'Finish selections logged to the CRM', 'Session analytics, then go live'],
                  },
                ].map((p) => (
                  <div key={p.title} className="p-5 border border-zinc-200 bg-white">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">{p.phase}</span>
                    <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">{p.title}</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      {p.items.map((it) => (
                        <Check key={it}>{it}</Check>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Delivers label="Analytics That Inform the Sales Narrative">
                Every session shows which rooms buyers linger in, which finishes they pick and reject, and which lighting states they ask for —{' '}
                <strong className="text-white font-bold">data a physical suite never gives you.</strong>
              </Delivers>
            </article>

            {/* ══════ ENTRY 06: KUMAR RESIDENCE ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <EntryNumber n="06" />
                <Pill>Case Study · Kumar Residence</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  Buyers in Four Countries, Zero Site Visits
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  During pre-launch, the Kumar Residence interactive environment was explored by qualified buyers in four countries — without a single buyer visiting the physical location. A campaign that static renders or 360 photography could not have run.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src={heroImg}
                  cap="Kumar Residence interactive virtual tour"
                  alt="Kumar Residence interactive virtual tour by Elipse Studio"
                  actionLink={KUMAR_TOUR_URL}
                  actionText="Open the Tour"
                  external
                />
              </div>
            </article>

            {/* ══════ ENTRY 07: MODERN VILLAS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="07" />
                <Pill>Case Study · Modern Villas</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  From Exterior Render to VR Walkthrough
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  A contemporary villa presented as both photoreal exterior visuals and a VR walkthrough — so buyers judge the massing, materials and outdoor living before construction starts.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="One model, every output">The same 3D build serves the stills, the walkthrough and the headset.</Check>
                  <Check title="Spatial confidence">Buyers walk from the carport to the terrace at true 1:1 scale.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={villaImg}
                  cap="Modern Villas · exterior and VR walkthrough"
                  alt="Modern villa architectural visualization by Elipse Studio"
                  actionLink="/project/villa"
                />
              </div>
            </article>

            {/* ══════ ENTRY 08: NEVEGAN APARTMENT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <EntryNumber n="08" />
                <Pill>Case Study · Nevegan Apartment</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[28ch] leading-tight mb-3">
                  From 2D Blueprints to a Space Buyers Can Feel
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The challenge: turn 2D architectural blueprints and interior concepts into a realistic digital showcase, so clients could genuinely experience the apartment before construction.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="Spatial depth">Open-plan living, kitchen and balcony read at true scale.</Check>
                  <Check title="Natural light and finishes">Daylight and premium materials conveyed as they will look on completion.</Check>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={neveganImg}
                  cap="Nevegan · apartment 3D visualization and VR"
                  alt="Nevegan apartment living room 3D visualization by Elipse Studio"
                  actionLink="/project/neveganapartment"
                />
              </div>
            </article>

            {/* ══════ ENTRY 09: FAQ ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="09" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  FAQ — Questions from Developers
                </h3>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-6">
                Exploring the full off-plan playbook? Read{' '}
                <Link href="/blog/real-time-archviz-vr-luxury-real-estate-presales-2026" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">how developers presell properties 6–12 months before groundbreak</Link>{' '}
                or see our{' '}
                <Link href="/services/architectural-visualization" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">architectural visualization services</Link>.
              </p>
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
              Planning a Luxury Pre-Launch Campaign?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              An interactive 3D sales environment is a sales infrastructure decision, not a technology one. Send us your BIM model and we will scope finish variants, buyer hardware and a production timeline — before any commitment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a BIM Review</span>
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
                Interactive 3D virtual tours, Unreal Engine 5 walkthroughs, VR sales galleries and architectural visualization for developers worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VirtualTours360VsUe5Article;
