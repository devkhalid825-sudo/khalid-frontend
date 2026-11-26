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

// Placeholder images from the asset library: swap paths as needed.
import _heroImg from '../../assets/About-page/nevegan-hd.webp';
import _imgOne from '../../assets/About-page/kumar-hd.webp';
import _imgTwo from '../../assets/ElipseImages/blogs/Ar-two.webp';
import _imgThree from '../../assets/ElipseImages/blogs/quest.3.webp';
import _imgFour from '../../assets/ElipseImages/blogs/Ar-one.webp';

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
        alt={alt || cap || 'Real-time 3D sales environment by Elipse Studio'}
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
  <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center shadow-sm flex flex-col items-center justify-center">
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

// ── Tables Data ──

const capabilityRows = [
  { cap: 'Works before construction', mp: 'Requires physical space', ue: 'Built from architectural drawings' },
  { cap: 'Navigation mode', mp: 'Camera-node hopping', ue: 'True 6DOF, walk freely' },
  { cap: 'Daylighting', mp: 'Fixed at scan time', ue: 'Dynamic time-of-day slider' },
  { cap: 'Material swapping', mp: 'Physical refurb + re-scan', ue: 'Real-time, in seconds' },
  { cap: 'Furniture configuration', mp: 'Fixed to scan date', ue: 'Swap, add, remove in-session' },
  { cap: 'VR headset (Meta Quest)', mp: 'Limited, low-resolution port', ue: 'Native Quest 3, 6DOF spatial' },
  { cap: 'Multi-unit showcase', mp: 'One scan per unit', ue: 'All units in one application' },
  { cap: 'Update after deployment', mp: 'Full re-scan for any change', ue: 'PAK streaming in minutes' },
  { cap: 'Future views (floor 42, garden)', mp: 'Only existing views', ue: 'Accurate views from any floor' },
  { cap: 'International remote access', mp: 'Web browser, no VR', ue: 'Quest shipped to buyer’s home' },
];

const journeyRows = [
  { stage: 'Discovery', static: 'Strong: renders are aspirational', ue: 'Strong: shareable interactive preview' },
  { stage: 'Interest', static: 'Strong: brochure + video assets', ue: 'Strong + social proof from interactivity' },
  { stage: 'Evaluation', static: 'Weak: buyer comparing PDFs', ue: 'Strong: buyer in the space' },
  { stage: 'Conviction', static: 'Slow: needs show flat or leap of faith', ue: 'Fast: VR session resolves spatial doubt' },
  { stage: 'Commitment', static: 'Delayed by doubt and geography', ue: 'Accelerated: informed spatial choice' },
];

const toolChoiceRows = [
  { situation: 'Completed building, documenting for resale', tool: 'Matterport' },
  { situation: 'Completed show flat, local buyers only', tool: 'Matterport is adequate' },
  { situation: 'Off-plan, pre-construction, any market', tool: 'UE5 real-time walkthrough' },
  { situation: 'International buyers, remote sales team', tool: 'UE5 + Meta Quest Home Delivery' },
  { situation: 'Multiple unit types, evolving specification', tool: 'UE5 + PAK streaming' },
  { situation: 'Large masterplan, tranche releases over 24+ months', tool: 'UE5 + PAK streaming + browser gallery' },
];

const MatterportVsUe5OffPlanArticle = () => {
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
    'UNREAL ENGINE 5 VS MATTERPORT',
    '✦',
    'OFF-PLAN PRE-SALES',
    '✦',
    'REAL-TIME WALKTHROUGHS',
    '✦',
    'META QUEST HOME DELIVERY',
    '✦',
    'PAK STREAMING',
    '✦',
    'LUXURY REAL ESTATE',
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
              <span className="text-[#4169E1]">Interactive 3D Virtual Tours vs Matterport</span>{' '}
              for Luxury Real Estate &amp; Off-Plan Pre-Sales
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Comparison Guide · US | UK | AU
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Unreal Engine 5 real-time luxury apartment walkthrough for off-plan real estate sales"
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
              <Link
                href="/services/architectural-visualization"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                ArchViz Services ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a href="#journal" className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer">
                Read the Comparison ↓
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
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-center">
            <div className="md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">
                Executive Briefing · Luxury Developers &amp; Off-Plan Marketers
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Which Technology Sells a Penthouse Before Groundbreaking?
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                Imagine selling a £4 million penthouse on the 42nd floor of a building that hasn&apos;t broken ground. The buyer is overseas and is expected to commit seven figures from a static image.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide compares Unreal Engine 5 real-time walkthroughs with Matterport 360 scans as sales tools, not as a spec sheet, for developers, architects and off-plan marketers who need to close deals.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="35–45%" l="Off-Plan Share of London New-Build" s="Higher among international buyers above £2M" />
                <Stat v="18–24 mo" l="Sydney & Melbourne Pre-Sale Lead" s="Launch to completion" />
                <Stat v="< 500 MB" l="Typical PAK Update" s="vs a full 8–15 GB reinstall" />
                <Stat v="25 min" l="Shared VR Session" s="Agent and buyer in the same space" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Real-Time Walkthroughs vs Matterport for Off-Plan Sales</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="01" />
                  <Pill>The Pre-Construction Bottleneck</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Why Matterport Cannot Sell What Doesn&apos;t Exist Yet
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-5">
                    Matterport scans a completed, furnished physical space into a camera-node tour. That physical dependency is an absolute constraint for off-plan sales.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="No building, no scan">You cannot Matterport a floor plan.</Check>
                    <Check title="Show flat delay">A show flat covers one unit type, not the penthouse or the corner unit.</Check>
                    <Check title="Locked materials">The scanned marble is the marble; swapping finishes needs a refurbishment.</Check>
                    <Check title="Desk experience">Clicking floor circles is not spatial for an international buyer.</Check>
                    <Check title="Obsolete scans">Finish or furniture changes require a full re-scan.</Check>
                  </div>
                  <Delivers label="The Core Insight">
                    Matterport is a documentation tool retrofitted into a sales tool. UE5 real-time walkthroughs are purpose-built sales environments. The difference is not visual quality; it is whether the building needs to exist first.
                  </Delivers>
                </div>
                <Frame
                  src={imgOne}
                  cap="A real-time environment is built from architectural drawings, before construction"
                  alt="Luxury apartment interior rendered in Unreal Engine 5 from architectural drawings"
                />
              </div>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="02" />
                <Pill>Capability Comparison</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Dynamic Freedom vs Node-Hopping
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The difference between the two is the difference between inhabiting a space and touring it.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="Matterport 360 Scan vs UE5 Real-Time Walkthrough"
                cols={[
                  { key: 'cap', label: 'Capability', span: 4 },
                  { key: 'mp', label: 'Matterport 360 Scan', span: 4 },
                  { key: 'ue', label: 'UE5 Real-Time Walkthrough', span: 4, strong: true },
                ]}
                rows={capabilityRows}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">What Luxury Buyers Actually Experience:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Dynamic daylighting">Drag a slider to see the unit at 7am, golden hour or night, live in the session. A scan freezes one overcast Tuesday afternoon.</Check>
                    <Check title="Material swapping">Switch light oak to herringbone parquet, or Calacatta to Nero Marquina, in real light, view and scale.</Check>
                    <Check title="True 6DOF">Walk to the window, check the view, see whether the second bedroom fits a child&apos;s bed.</Check>
                  </div>
                  <Delivers label="Client Outcome">
                    Developers using real-time material selection report fewer post-sale specification change requests and higher buyer satisfaction at handover, because buyers chose in context rather than from samples.
                  </Delivers>
                </div>
                <Frame
                  src={imgTwo}
                  cap="Finishes, light and scale judged together in one real-time environment"
                  alt="Real-time luxury living room with swappable materials and dynamic lighting"
                />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
                <div>
                  <EntryNumber n="03" />
                  <Pill>Remote &amp; International Sales</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Browser Sales Gallery &amp; Remote &ldquo;Home Delivery&rdquo; VR
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Buyers for a Knightsbridge development are as likely to be in Dubai or Singapore as Belgravia. Elipse combines two deployment modes from a single environment.
                  </p>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Browser Sales Gallery (discovery and shortlisting):</h4>
                  <div className="space-y-2 text-xs sm:text-sm mb-5">
                    <Check>WebGL real-time environment on any device, with no download.</Check>
                    <Check>Pick floor and unit type from an interactive building facade.</Check>
                    <Check>Toggle finishes, open terrace doors and see the accurate view from that floor.</Check>
                    <Check>Share a saved configuration link with a partner or family.</Check>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Meta Quest 3 Home Delivery (committed buyers):</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                    A standalone headset, pre-loaded with the buyer&apos;s unit, floor and specification, is shipped to their home. The agent joins the same session remotely from a Windows PC.
                  </p>
                </div>
                <div className="space-y-4">
                  <Frame
                    src={imgThree}
                    cap="Meta Quest 3 shipped to the buyer's home for a shared spatial viewing"
                    alt="Buyer using a Meta Quest 3 headset for a remote property viewing"
                  />
                  <Delivers label="Agent-Led Shared Sessions">
                    The agent controls time of day, visible finishes, spotlit areas and voiceover annotations, so every buyer gets a guided, personalised viewing wherever they are.
                  </Delivers>
                </div>
              </div>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>PAK Streaming</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Dynamic Runtime Updates Without Re-Cooking
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Over an 18-month pre-sales programme, finishes change, unit types release in tranches and plans are amended. The virtual environment has to keep pace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">The traditional deployment problem:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check>A complete rebuild by the development team for any change.</Check>
                    <Check>Re-packaging and redistributing an 8–15 GB application.</Check>
                    <Check>Buyers and agents downloading 10+ GB again.</Check>
                    <Check>Days or weeks between the decision and the buyer-visible update.</Check>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">PAK streaming: modular updates in minutes</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="New finish">Pushed as a PAK file, live for all buyers within minutes.</Check>
                    <Check title="New unit type">Added as a module and browsable immediately.</Check>
                    <Check title="Plan amendment">Geometry updated so every session shows the correct layout.</Check>
                    <Check title="Seasonal campaign">Special lighting added, then removed after the campaign.</Check>
                  </div>
                </div>
              </div>

              <Delivers label="Developer Operations Advantage">
                12 updates in an 18-month programme are 12 full reinstalls the traditional way. With PAK streaming they are incremental downloads, typically under 500 MB each. The app checks for updates on launch, so agents in London, Dubai, Singapore and Sydney always show the current specification and pricing.
              </Delivers>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start mb-8">
                <div>
                  <EntryNumber n="05" />
                  <Pill>ROI &amp; Pre-Sale Velocity</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    How Interactive Tours Shorten Buyer Decision Cycles
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Static renders and scans work at Discovery and Interest. They are weak at Evaluation and Conviction, where buyers spend the most time and the developer gains most by accelerating.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="International investors">A 30-minute spatial tour from their living room removes the geography premium from the transaction.</Check>
                    <Check title="Agent productivity">One agent can run guided tours for buyers in three time zones in a day. Capacity scales with the deployment, not headcount.</Check>
                    <Check title="Specification changes">One update replaces reprinting brochures, re-rendering heroes and re-briefing every market.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="Buyers reach conviction faster when they have stood in the space"
                  alt="Luxury bedroom interior from an interactive real-time sales environment"
                />
              </div>

              <DataTable
                icon={FiDollarSign}
                title="Where Real-Time Walkthroughs Compress the Timeline"
                cols={[
                  { key: 'stage', label: 'Sales Stage', span: 3 },
                  { key: 'static', label: 'Static Renders / Matterport', span: 4 },
                  { key: 'ue', label: 'UE5 Interactive Walkthrough', span: 5, strong: true },
                ]}
                rows={journeyRows}
              />

              <Delivers label="Market Signal">
                In Dubai, Singapore and Hong Kong, where international off-plan purchases are a primary channel, developers without a credible remote spatial experience compete at a disadvantage. The technology gap is now a sales gap.
              </Delivers>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Conclusion</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Which Technology Is Right for Your Development?
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                  Matterport is an excellent scan-to-tour pipeline for completed properties, resale listings and documentation. For luxury off-plan sales in a global market with remote buyers and dynamic specifications, the answer is unambiguous.
                </p>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Explore our{' '}
                  <Link href="/services/architectural-visualization" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    architectural visualisation services
                  </Link>{' '}
                  or{' '}
                  <Link href="/portfolio" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    recent real-time deployments
                  </Link>.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="Choosing the Right Tool"
                cols={[
                  { key: 'situation', label: 'Your Situation', span: 7 },
                  { key: 'tool', label: 'Right Tool', span: 5, strong: true },
                ]}
                rows={toolChoiceRows}
              />
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Planning an Off-Plan Launch?
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              See What an Interactive 3D Sales Environment Does for Your Pre-Sale Velocity
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              We build Unreal Engine 5 sales environments for luxury developers in the UK, US, Australia and UAE, and will walk you through examples from our current portfolio.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-matterport"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <FiArrowRight className="text-sm" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap px-4 sm:px-6 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Contact Our Team
              </Link>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto whitespace-nowrap px-4 sm:px-6 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
                3D interactive experience agency delivering Unreal Engine 5 real-time environments, VR/AR, WebGL configurators and architectural visualisation for clients in the US, UK, and Australia.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MatterportVsUe5OffPlanArticle;
