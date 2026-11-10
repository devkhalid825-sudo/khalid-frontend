'use client';

import React, { useState, useEffect } from 'react';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiZap,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiBox,
  FiTrendingUp,
  FiSliders,
  FiServer,
  FiLayers,
  FiLock,
  FiDollarSign,
  FiShoppingCart,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Placeholder images — swap later with final article visuals
import _heroImg from '../../assets/About-page/golf-cart.webp';
import _briefImg from '../../assets/ElipseImages/personal/Configurator.webp';
import _renderImg from '../../assets/About-page/seat.webp';
import _parametricImg from '../../assets/About-page/golf-cart.webp';
import _commerceImg from '../../assets/About-page/shark.webp';
import _mobileImg from '../../assets/web-app-ui/cap.webp';
import _processImg from '../../assets/About-page/marine.webp';

const heroImg = getImgSrc(_heroImg);
const briefImg = getImgSrc(_briefImg);
const renderImg = getImgSrc(_renderImg);
const parametricImg = getImgSrc(_parametricImg);
const commerceImg = getImgSrc(_commerceImg);
const mobileImg = getImgSrc(_mobileImg);
const processImg = getImgSrc(_processImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Custom 3D configurator vs SaaS platform'}
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
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span>{actionText || 'View Case Study'}</span>
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

const Delivers = ({ children }) => (
  <div className="bg-black text-white rounded-none p-5 sm:p-6 border border-black shadow-sm mt-5">
    <div className="flex items-center gap-2.5 text-white font-bold font-sans text-xs sm:text-sm uppercase tracking-wider mb-2.5">
      <FiZap className="text-sm sm:text-base text-white shrink-0" />
      <span>The Custom Answer</span>
    </div>
    <p className="text-xs sm:text-sm md:text-base text-neutral-100 leading-relaxed font-sans">{children}</p>
  </div>
);

const ceilingRows = [
  { dim: 'Render Quality', sub: 'Ceiling #1', saas: 'Pre-rendered CDN JPGs', custom: 'Real-time PBR shaders (WebGL / UE5)' },
  { dim: 'Geometry', sub: 'Ceiling #2', saas: 'Material swaps on fixed models', custom: 'Parametric dimensions, accurate to 10mm' },
  { dim: 'Commerce', sub: 'Ceiling #3', saas: 'Shopify variant selection', custom: 'Full CPQ into your ERP' },
  { dim: 'Mobile', sub: 'Ceiling #4', saas: 'Lower quality on every device', custom: 'Best quality each device can render' },
  { dim: 'Asset Ownership', sub: 'Ceiling #5', saas: 'Locked in vendor CDN', custom: 'Open GLB/glTF & FBX you own' },
  { dim: 'Pricing at Scale', sub: 'Ceiling #6', saas: 'Bill grows with every session', custom: 'Fixed infrastructure cost' },
];

const costRows = [
  { tier: 'Standard Custom WebGL', scope: 'Fixed geometry, PBR materials, 50–500 SKUs, Shopify/WooCommerce', timeline: '10–16 weeks', investment: '£18,000–£45,000' },
  { tier: 'Advanced Custom WebGL', scope: 'Parametric dimensions, modular assembly, CPQ, mobile optimisation', timeline: '16–26 weeks', investment: '£45,000–£90,000' },
  { tier: 'UE5 Pixel Streaming', scope: 'Photorealistic render, AR, omnichannel, full CPQ', timeline: '20–36 weeks', investment: '£85,000–£150,000' },
  { tier: 'Enterprise Programme', scope: 'Full platform replacement, ERP integration, multi-brand', timeline: '6–12 months', investment: '£150,000+' },
];

const migrationSignals = [
  { n: 'Signal 1', title: 'Render quality hurts the brand.', body: 'Your team is regularly frustrated that the configurator undersells the product.' },
  { n: 'Signal 2', title: 'Products outgrew the platform.', body: "Bespoke dimensions or complex rules the SaaS tool can't model accurately." },
  { n: 'Signal 3', title: 'Integration needs workarounds.', body: 'CSV exports, manual data entry or custom middleware to reach your ERP or CRM.' },
  { n: 'Signal 4', title: 'Session costs are significant.', body: 'Custom infrastructure would be cost-neutral within 24 months.' },
  { n: 'Signal 5', title: 'Key features stay "on the roadmap".', body: 'Competitors ship AR, room visualisation or CPQ while you wait 18+ months.' },
];

const CustomConfiguratorVsSaasArticle = () => {
  const [copied, setCopied] = useState(false);

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
    'CUSTOM 3D CONFIGURATORS',
    '✦',
    'SAAS VS CUSTOM',
    '✦',
    'PBR SHADERS',
    '✦',
    'PARAMETRIC GEOMETRY',
    '✦',
    'CPQ INTEGRATION',
    '✦',
    'ASSET OWNERSHIP',
    '✦',
    'UE5 PIXEL STREAMING',
    '✦',
    'ENTERPRISE ROI',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20 bg-white">

        {/* ══════ HERO SECTION ══════ */}
        <section className="relative bg-white text-neutral-900 pt-0 pb-6 sm:pb-8 md:pt-1 md:pb-10 overflow-hidden mb-4 sm:mb-8">
          <div className="hidden lg:block absolute top-2 left-6 text-[#2563EB] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          <div className="hidden lg:block absolute top-2 right-8 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-4 sm:mb-6 px-3 sm:px-4">
              <span className="text-[#2563EB]">Custom 3D Configurator vs SaaS Platform:</span>{' '}
              Why Enterprise Brands Outgrow Turnkey SaaS
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · Interactive Experiences &amp; Digital Sales Infrastructure
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Custom 3D Golf Cart Configurator built by Elipse Studio"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
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
                Book a technical review ↗
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
              Book a technical review <FiArrowRight />
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
                Executive Briefing · The SaaS Honeymoon Phase
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                SaaS Gets You Live in Days. Then the Ceiling Appears.
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                For a luxury brand going online, a SaaS configurator feels perfect: upload your SKUs, embed a snippet, and you&apos;re live — no engineering team, no six-figure budget.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                Twelve months later, a £12,000 Chesterfield sofa renders like a mid-market piece, material swaps wait in a 72-hour CDN queue, AR is &quot;on the roadmap&quot;, and the CPQ answer is a CSV export. That&apos;s not a lack of ambition — it&apos;s the architectural ceiling of turnkey SaaS.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={briefImg}
                  alt="Touch-free showroom 3D configurator kiosk built by Elipse Studio"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Live in days on SaaS · Six ceilings within a year
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Technical &amp; Commercial Analysis</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ══════ ENTRY 01: THE SIX CEILINGS ══════ */}
            <article className="py-10 sm:py-16 border-b border-zinc-200">
              <div className="max-w-3xl mb-8">
                <EntryNumber n="01" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-900 border border-zinc-300 mb-2">
                  The Six Ceilings at a Glance
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-3">
                  Where the SaaS Promise Breaks Down
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Cylindo, Threekit and Zakeke are excellent for mid-market retailers with standard geometry. For enterprise brands with bespoke finishes and complex products, six limits show up fast.
                </p>
              </div>

              <div className="w-full border border-zinc-300 bg-white shadow-sm">
                <div className="hidden md:grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800">
                  <div className="col-span-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <FiSliders className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Constraint</span>
                  </div>
                  <div className="col-span-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <FiLayers className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Turnkey SaaS</span>
                  </div>
                  <div className="col-span-4 text-xs font-mono font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                    <FiServer className="w-4 h-4 text-white shrink-0" />
                    <span>Custom Development</span>
                  </div>
                </div>
                <div className="md:hidden bg-black text-white px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                  <FiSliders className="w-4 h-4 shrink-0" />
                  <span>SaaS vs Custom Development</span>
                </div>

                <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">
                  {ceilingRows.map((row) => (
                    <div key={row.dim} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0 p-4 sm:p-5 items-start md:items-center hover:bg-zinc-50/70 transition-colors">
                      <div className="md:col-span-4 md:pr-3">
                        <div className="font-bold text-zinc-900 text-sm">{row.dim}</div>
                        <div className="text-[11px] sm:text-xs text-zinc-500">{row.sub}</div>
                      </div>
                      <div className="md:col-span-4 md:pr-3 text-zinc-600 flex items-start gap-2">
                        <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                        <span><span className="md:hidden font-semibold text-zinc-500">SaaS: </span>{row.saas}</span>
                      </div>
                      <div className="md:col-span-4 font-semibold text-black flex items-start gap-2">
                        <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                        <span><span className="md:hidden font-bold">Custom: </span>{row.custom}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 02: RENDER QUALITY ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="02" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[26ch] leading-tight mb-3">
                  Ceiling #1 — Render Quality
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  SaaS platforms serve pre-shot 2K/4K JPGs. Static frames can&apos;t react to light or show the detail of hand-stitched leather, burl walnut or brushed brass — and for an £8,000 dining table sold on its timber grain, that undersells the product.
                </p>
                <Delivers>
                  Every material is a real-time PBR shader in WebGL or Unreal Engine 5 Pixel Streaming. Velvet catches the light as the piece rotates. <strong className="text-white font-bold">The finish behaves like the material, not a photo of it.</strong>
                </Delivers>
              </div>
              <div className="md:order-1">
                <Frame
                  src={renderImg}
                  cap="Real-time PBR: materials that respond to light"
                  alt="Car seat 3D configurator with real-time leather materials"
                />
              </div>
            </article>

            {/* ══════ ENTRY 03: GEOMETRY ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <EntryNumber n="03" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[26ch] leading-tight mb-3">
                  Ceiling #2 — Geometric Configurability
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  SaaS swaps finishes on fixed models. A bespoke kitchen-island buyer wants exact dimensions — and to see doors and drawers recalculate:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ['1,840mm', 'Length'],
                    ['940mm', 'Depth'],
                    ['380mm', 'Overhang'],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-neutral-50 border border-neutral-300 p-3 sm:p-4 text-center sm:text-left shadow-sm">
                      <div className="text-lg sm:text-2xl font-extrabold text-black">{v}</div>
                      <p className="text-[10px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    </div>
                  ))}
                </div>
                <Delivers>
                  Our parametric engine lets dimensions drive the 3D model in real time, accurate to 10mm, with no extra pre-rendered assets. <strong className="text-white font-bold">A spatial planning tool, not a swatch picker.</strong>
                </Delivers>
              </div>
              <div className="md:order-2">
                <Frame
                  src={parametricImg}
                  cap="Dimensions drive the model in real time"
                  alt="Golf cart 3D configurator with custom accessories and finishes"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: COMMERCE ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="04" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[26ch] leading-tight mb-3">
                  Ceiling #3 — Commerce Integration
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  &quot;Connect to Shopify&quot; just picks a pre-defined variant. A £45,000 bespoke wardrobe isn&apos;t a variant — its price comes from a rules engine and must trigger an ERP order and a quote. <strong>SaaS does variant selection, not CPQ.</strong>
                </p>
                <div className="bg-zinc-50 border border-zinc-200 p-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <FiShoppingCart className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Custom CPQ Output → Salesforce, SAP or your ERP</span>
                  </div>
                  <div className="space-y-2">
                    <Check>Configuration hash</Check>
                    <Check>Bill of materials</Check>
                    <Check>Price calculation</Check>
                    <Check>Production specification</Check>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={commerceImg}
                  cap="A configured order that flows straight into ERP and quoting"
                  alt="BYD Shark 6 3D configurator with packs, accessories and estimated price"
                />
              </div>
            </article>

            {/* ══════ ENTRY 05: MOBILE ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-6">
                <div>
                  <EntryNumber n="05" />
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Ceiling #4 — Mobile Performance
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                    SaaS stays mobile-friendly by lowering quality on every device. A custom build uses Draco compression, KTX2 textures and device-aware LOD so each device gets the best quality it can handle.
                  </p>
                </div>
                <Frame
                  src={mobileImg}
                  cap="The best version each device can render"
                  alt="Browser-based cap configurator interface"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: FiMonitor, tag: 'Desktop', body: 'Full fidelity — Pixel Streaming or WebGL' },
                  { icon: FiTablet, tag: 'Mid-Range Mobile', body: 'Compressed WebGL' },
                  { icon: FiSmartphone, tag: 'Entry-Level', body: 'WebGL thumbnail + AR Quick Look' },
                ].map(({ icon: Icon, tag, body }) => (
                  <div key={tag} className="p-5 border border-zinc-200 bg-white">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-5 h-5 text-black shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">{tag}</span>
                    </div>
                    <p className="text-sm text-zinc-800 font-semibold font-sans">{body}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* ══════ ENTRY 06: OWNERSHIP & PRICING ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  Ceilings #5 &amp; #6 — Asset Lock-In and Per-Session Pricing
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <FiLock className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Asset Ownership</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-3">
                    SaaS keeps your optimised assets in its CDN, often in proprietary formats that don&apos;t migrate cleanly.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                    <strong>Custom:</strong> open GLB/glTF, FBX and PBR libraries, owned outright by the brand.
                  </p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <FiDollarSign className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Pricing at Scale</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-3">
                    Per-session billing grows with your success — 50,000 sessions in a launch week means a 50,000-session bill.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                    <strong>Custom:</strong> a fixed infrastructure cost. After payback (typically 18–36 months), extra sessions are effectively free.
                  </p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 07: MIGRATION SIGNALS ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  When Is the Right Time to Move?
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  SaaS still makes sense while you validate 3D commerce. Consider custom when <strong>two or more</strong> of these apply:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {migrationSignals.map(({ n, title, body }) => (
                  <div key={n} className="p-5 border border-zinc-200 bg-white">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">{n}</span>
                    <h4 className="font-serif font-bold text-base text-zinc-900 mb-1.5">{title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{body}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* ══════ ENTRY 08: COST & TIMELINE ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="08" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Cost and Timeline
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Custom doesn&apos;t always mean a multi-year, seven-figure project:
                </p>
              </div>

              <div className="w-full border border-zinc-300 bg-white shadow-sm">
                <div className="hidden md:grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider">
                  <div className="col-span-3 text-zinc-400">Configuration</div>
                  <div className="col-span-5 text-zinc-300">Scope</div>
                  <div className="col-span-2 text-zinc-300">Timeline</div>
                  <div className="col-span-2 text-white">Investment</div>
                </div>
                <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">
                  {costRows.map((row) => (
                    <div key={row.tier} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-0 p-4 sm:p-5 items-start md:items-center hover:bg-zinc-50/70 transition-colors">
                      <div className="md:col-span-3 md:pr-3 font-bold text-zinc-900 text-sm">{row.tier}</div>
                      <div className="md:col-span-5 md:pr-3 text-zinc-600">{row.scope}</div>
                      <div className="md:col-span-2 text-zinc-700">
                        <span className="md:hidden font-semibold text-zinc-500">Timeline: </span>{row.timeline}
                      </div>
                      <div className="md:col-span-2 font-extrabold text-black">
                        <span className="md:hidden font-semibold text-zinc-500">Investment: </span>{row.investment}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4">
                Includes asset development for an average product range. Existing high-quality 3D assets can cut timelines by 30–40%.
              </p>
            </article>

            {/* ══════ ENTRY 09: ROI ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="09" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  Where the Return Comes From
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {[
                  ['23–38%', 'Conversion Uplift', 'Furniture & architectural hardware clients'],
                  ['30–40%', 'Shorter Sales Cycle', 'Real estate & architectural clients'],
                  ['18–36 mo', 'Cost Crossover', 'Custom becomes cheaper than SaaS'],
                ].map(([v, l, s]) => (
                  <div key={l} className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-black">{v}</div>
                    <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">{l}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">{s}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  { icon: FiTrendingUp, title: 'Higher conversion', body: 'Photo-real accuracy builds the trust buyers need to transact.' },
                  { icon: FiBox, title: 'Fewer returns', body: 'Accurate materials and dimensions mean fewer mismatched expectations.' },
                  { icon: FiZap, title: 'Faster sales cycles', body: 'Shareable, accurate configurations cut revision rounds.' },
                  { icon: FiServer, title: 'Fixed infrastructure cost', body: 'Variable SaaS fees become a predictable, fixed cost.' },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-3 bg-zinc-50 p-4 border border-zinc-200">
                    <Icon className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <span className="text-zinc-700"><strong>{title}:</strong> {body}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* ══════ ENTRY 10: THE ELIPSE APPROACH ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="10" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  The Elipse Studio Approach
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  We&apos;re not a configurator platform — we&apos;re a studio that builds bespoke configurators, virtual tours, AR and digital showrooms. We start with a technical audit, then scope the smallest solution that removes your constraint:
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check>A WebGL upgrade with real-time PBR on existing geometry</Check>
                  <Check>A full Pixel Streaming deployment with AR and CPQ</Check>
                  <Check>A spatial platform that replaces a physical sales suite</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={processImg}
                  cap="Audit first, then the minimum viable solution"
                  alt="Pursuit 288 boat configurator built by Elipse Studio"
                />
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
              Is Your Ceiling Costing More Than Moving Past It?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Our discovery process starts with a technical review: we assess your current platform, pinpoint what&apos;s limiting you, and show what custom development would cost and deliver.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Your Technical Review</span>
                <FiArrowRight className="text-sm" />
              </a>
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
                Bespoke 3D configurators, virtual tours, and interactive spatial experiences for luxury brands, automotive clients, and architectural developers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomConfiguratorVsSaasArticle;
