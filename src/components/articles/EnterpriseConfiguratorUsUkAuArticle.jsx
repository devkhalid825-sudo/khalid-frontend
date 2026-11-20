'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiLayers,
  FiDollarSign,
  FiExternalLink,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Configurator showcase images.
import _heroImg from '../../assets/About-page/volvo-s90-ue5-hero.webp';
import _imgOne from '../../assets/About-page/golf-2.png';
import _imgTwo from '../../assets/About-page/newkia.png';
import _imgThree from '../../assets/About-page/bean-5.png';
import _imgFour from '../../assets/About-page/marine.webp';

const heroImg = getImgSrc(_heroImg);
const imgOne = getImgSrc(_imgOne);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Enterprise 3D configurator by Elipse Studio'}
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
          <span>{actionText || 'View Project'}</span>
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

// Static class maps so Tailwind picks up every span used.
const spanClass = { 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7' };
const mdSpanClass = { 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7' };

/** cols: [{ key, label, span, strong? }] — spans must sum to 12. */
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

const architectureRows = [
  { criterion: 'Delivery model', webgl: 'Browser-native, client-side render', ue5: 'Cloud GPU streams video to the browser' },
  { criterion: 'Time to first interaction', webgl: '< 3 seconds on 10 Mbps', ue5: '8–20 seconds cold start (GPU warm-up)' },
  { criterion: 'Visual fidelity ceiling', webgl: 'PBR, 4K textures, real-time shadows', ue5: 'Ray tracing, Lumen GI, Nanite geometry' },
  { criterion: 'Concurrent user cost', webgl: 'Near zero (CDN-served files)', ue5: '$0.08–$0.35 per user/hour' },
  { criterion: 'Mobile support', webgl: 'Full (iOS Safari, Android Chrome)', ue5: 'Limited — video stream only' },
  { criterion: 'Best-fit use case', webgl: 'E-commerce, CPQ, mobile, kiosk', ue5: 'Trade show, boardroom, luxury auto' },
];

const tcoRows = [
  { item: 'Licence / build', saas: '$126,000', custom: '$45K–$75K (one-time)' },
  { item: 'Credits / hosting', saas: '$65,520', custom: '$10,800' },
  { item: 'Integration', saas: '$35,000', custom: 'Included in build' },
  { item: 'Support & asset management', saas: '$60,000', custom: '$24,000 (optional)' },
  { item: '3-year total', saas: '$286,520', custom: '$109,800–$139,800' },
];

const sprintRows = [
  { sprint: 'Sprint 0–1', when: 'Weeks 1–2', deliver: 'Discovery, variant matrix review, asset audit, 3D optimisation and PlayCanvas scene setup', sign: 'Variant matrix, optimised assets' },
  { sprint: 'Sprint 2–3', when: 'Weeks 2–4', deliver: 'Variant logic, material switching, camera presets, Shopify / HubSpot / ERP integration, CPQ validation', sign: 'Prototype and integration UAT' },
  { sprint: 'Sprint 4–5', when: 'Weeks 5–7', deliver: 'Branded UI, mobile layout, QA, performance audit, GA4 instrumentation, client UAT', sign: 'Design and UAT acceptance' },
  { sprint: 'Sprint 6', when: 'Week 8', deliver: 'Production deployment, CDN setup, source code and asset handoff, team training', sign: 'Go-live approval' },
];

const EnterpriseConfiguratorUsUkAuArticle = () => {
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
    'ENTERPRISE 3D CONFIGURATORS',
    '✦',
    'US · UK · AUSTRALIA',
    '✦',
    'WEBGL VS UNREAL ENGINE 5',
    '✦',
    'CPQ & ERP INTEGRATION',
    '✦',
    '36-MONTH TCO MODEL',
    '✦',
    '8-WEEK SPRINT PLAN',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#3558D4]/30 selection:text-white">
      <Header lightHero={true} hideThemeToggle={true} homeScroll={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20 bg-white">

        {/* ══════ HERO ══════ */}
        <section className="relative bg-white text-neutral-900 pt-0 pb-6 sm:pb-8 md:pt-1 md:pb-10 overflow-hidden mb-4 sm:mb-8">
          <div className="hidden lg:block absolute top-2 left-6 text-[#4169E1] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-4 sm:mb-6 px-3 sm:px-4">
              <span className="text-[#4169E1]">Interactive 3D Configurators for US, UK &amp; Australian Enterprise Brands:</span>{' '}
              WebGL vs Unreal Engine 5, Latency &amp; ROI
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Enterprise Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Volvo S90 Unreal Engine 5 Pixel Streaming configurator with exterior colour, rims and interior controls"
                  className="w-full h-full object-cover"
                  decoding="async"
                />
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
                Book a consultation ↗
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
              Book a consultation <FiArrowRight />
            </a>
          </div>
        </section>

        {/* ══════ MARQUEE ══════ */}
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
                Executive Briefing · 2026 Enterprise Architecture &amp; Vendor Evaluation
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                The Question Is No Longer Whether — It Is Which Architecture
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                Enterprise procurement teams in the US, UK and Australia are retiring static product photography, PDF spec sheets and 2D CAD drawings in favour of real-time, browser-native 3D configurators and cloud-streamed photorealistic product twins.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide is written for digital transformation leads, e-commerce directors and procurement managers. It compares PlayCanvas WebGL and Unreal Engine 5 Pixel Streaming across latency, infrastructure cost, integration complexity and long-term IP ownership, referencing production deployments completed by Elipse Studio in 2025 and 2026.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="40%" l="Purchase Confidence" s="3D vs static imagery (Shopify, 2025)" />
                <Stat v="32%" l="Fewer Returns" s="Post-configurator (retail study, 2024)" />
                <Stat v="2.4x" l="Faster Sales Cycle" s="B2B CPQ with 3D vs PDF quoting" />
                <Stat v="100%" l="Custom IP Ownership" s="Elipse Studio bespoke builds" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Enterprise 3D Configurator Architecture · US, UK &amp; Australia</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="01" />
                  <Pill>Why Buyers Expect Real-Time 3D</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    A Structural Shift in Three Markets
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Post-pandemic digital acceleration, maturing WebGL browser capabilities and collapsing GPU rendering costs have moved real-time 3D from a marketing novelty to core commercial infrastructure.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="United States">Automotive, manufacturing and luxury goods; Shopify Plus merchants report a 28–40% lift in order value with configurators.</Check>
                    <Check title="United Kingdom">Retail and PropTech — 3D walkthroughs replacing floor-plan PDFs in listings.</Check>
                    <Check title="Australia">Mining, construction and retail — 3D demos replace physical units at trade events.</Check>
                  </div>
                </div>
                <Frame
                  src={imgOne}
                  cap="Golf cart configurator — live paint finishes and component swapping for dealer quoting"
                  alt="Golf cart 3D configurator with exterior paint panel open"
                />
              </div>
              <Delivers label="UK Procurement Note">
                British enterprise procurement teams typically require <strong className="text-white font-bold">ISO 27001 data handling documentation and UK GDPR data processing agreements</strong> before onboarding a 3D vendor. Elipse Studio supplies both on request.
              </Delivers>
            </article>

            {/* ENTRY 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="02" />
                <Pill>PlayCanvas WebGL vs UE5 Pixel Streaming</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  The Architecture Decision Guide
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Choosing wrong is expensive to reverse — it affects infrastructure, CDN contracts, team skills and ongoing cost.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="PlayCanvas WebGL">A 2–6 MB bundle rendered on the user&apos;s own GPU — no per-session server cost.</Check>
                  <Check title="UE5 Pixel Streaming">The full Unreal renderer runs on a cloud GPU, with 40–80 ms round-trip latency on a co-located server.</Check>
                  <Check title="Cost watch-out">500 simultaneous sessions can reach $40–$175 per hour — model it first.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={imgTwo}
                  cap="KIA Sportage — PlayCanvas WebGL, zero server cost per session"
                  alt="KIA Sportage interactive 3D configurator running in the browser"
                />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Decision Criteria</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Latency, Cost and Fidelity Side by Side
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Use this table before the deeper analysis. Most enterprise teams land on a hybrid: WebGL for traffic and CPQ, UE5 Pixel Streaming for curated presales.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="WebGL vs Pixel Streaming"
                cols={[
                  { key: 'criterion', label: 'Criterion', span: 3 },
                  { key: 'webgl', label: 'PlayCanvas WebGL', span: 4, strong: true },
                  { key: 'ue5', label: 'UE5 Pixel Streaming', span: 5 },
                ]}
                rows={architectureRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                <strong>The hybrid model.</strong> One product data schema, variant rule set and 3D asset library feed both a PlayCanvas configurator and a UE5 Pixel Streaming experience, so a single asset pipeline serves both channels.
              </p>
              <Delivers label="Performance Benchmark">
                Elipse Studio&apos;s KIA Sportage PlayCanvas configurator reaches first interaction in <strong className="text-white font-bold">2.1 seconds on a 10 Mbps connection</strong>, with sub-100ms variant swaps on mid-tier 2024 mobile hardware — and no backend compute cost per session.
              </Delivers>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="04" />
                  <Pill>E-Commerce &amp; CPQ Integration</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Connecting 3D to Your Commercial Stack
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    A configurator that cannot write to your quoting or CRM system is a marketing asset, not a commercial one.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Shopify Plus">Selections become a cart line item with custom properties and a screenshot, validated before checkout.</Check>
                    <Check title="HubSpot CPQ">The spec writes to a quote line item — 2.4x faster quotes, 61% fewer errors.</Check>
                    <Check title="SAP & Oracle">Middleware maps selections to ERP item codes and validates the BOM against inventory.</Check>
                  </div>
                </div>
                <Frame
                  src={imgThree}
                  cap="Bean Squared — configuration state and live total cost, ready to write to a cart or quote"
                  alt="Bean Squared trailer 3D configurator with total cost and colour, hitch, kitchen and solar options"
                />
              </div>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="05" />
                  <Pill>3-Year Total Cost of Ownership</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Custom IP vs SaaS Licensing
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Modelled for a mid-market manufacturer: 200 SKUs, 50,000 monthly sessions, Shopify Plus or SAP integration, over 36 months.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="SaaS">The vendor owns the rendering and integration layer; a price rise means a rebuild.</Check>
                    <Check title="Custom build">One-time cost, with full source code, 3D assets and documentation delivered.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="A bespoke build is an owned software asset, not a subscription"
                  alt="Bean Trailer custom 3D builder, delivered with full source code ownership"
                />
              </div>


              <DataTable
                icon={FiDollarSign}
                title="36-month TCO: SaaS vs custom build"
                cols={[
                  { key: 'item', label: 'Cost Component', span: 4 },
                  { key: 'saas', label: 'SaaS Platform', span: 4 },
                  { key: 'custom', label: 'Elipse Custom Build', span: 4, strong: true },
                ]}
                rows={tcoRows}
              />

              <Delivers label="IP Ownership Advantage">
                At 36 months the custom configurator has cost <strong className="text-white font-bold">$109,800 to $139,800 versus $286,520 for SaaS</strong> — a saving of $146,720 to $176,720. The owned asset keeps working at near-zero marginal cost, while SaaS keeps accruing licence fees.
              </Delivers>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Scoping &amp; Sprint Milestones</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  From CAD Handoff to Live Production in 6–12 Weeks
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Teams that arrive with CAD files, a complete variant matrix, integration access and a nominated technical stakeholder reach the 6–8 week end of the range.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="8-week production schedule"
                cols={[
                  { key: 'sprint', label: 'Sprint', span: 2 },
                  { key: 'when', label: 'Duration', span: 2 },
                  { key: 'deliver', label: 'Deliverables', span: 5, strong: true },
                  { key: 'sign', label: 'Sign-Off', span: 3 },
                ]}
                rows={sprintRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                Legacy CAD, undefined variant rules, SAP / Oracle integration and multi-language or multi-currency requirements typically add 2–4 weeks — scope them in Sprint 0.
              </p>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl">
                <EntryNumber n="07" />
                <Pill>Conclusion</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Build on 3D Infrastructure You Own
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  PlayCanvas WebGL suits most enterprise deployments: fast, mobile-native and client-owned. UE5 Pixel Streaming earns its premium in presales and luxury contexts. A hybrid sharing one asset pipeline delivers both — at roughly 38–48% of the 36-month SaaS cost. See our{' '}
                  <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">3D product configurator services</Link>.
                </p>
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
              Ready to Scope a Custom 3D Configurator for Your Enterprise Product Line?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Share your variant matrix, integration requirements and target market, and receive a detailed sprint plan and fixed-price proposal within 5 business days.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <FiArrowRight className="text-sm" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Contact Us
              </Link>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto whitespace-nowrap px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
                3D interactive experience agency delivering WebGL configurators, Unreal Engine 5 Pixel Streaming, AR/VR applications and architectural visualisation for enterprise clients in the US, UK, Australia and the Middle East.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnterpriseConfiguratorUsUkAuArticle;
