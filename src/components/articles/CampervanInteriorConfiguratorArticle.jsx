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
import _heroImg from '../../assets/About-page/marine.webp';
import _imgTwo from '../../assets/About-page/newkia.webp';
import _imgThree from '../../assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp';
import _imgFour from '../../assets/About-page/golf-1.webp';

const heroImg = getImgSrc(_heroImg);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || '3D vehicle configurator by Elipse Studio'}
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

const bundleRows = [
  { tier: 'Base Camp', pkg: '200Ah LiFePO4 / 200W solar', parts: 'Battery bank, 1× 100W panel, 30A MPPT, 1000W inverter', cost: '$3,800' },
  { tier: 'Off-Grid Explorer', pkg: '400Ah LiFePO4 / 400W solar', parts: 'Dual 200Ah banks, 4× 100W panels, 40A MPPT, 2000W inv/chgr', cost: '$7,200' },
  { tier: 'Expedition', pkg: '600Ah LiFePO4 / 600W solar + shore', parts: 'Triple banks, 6× panels, 60A MPPT, 3000W inv/chgr, shore hook-up', cost: '$11,500' },
  { tier: 'Full-Time Living', pkg: '800Ah LiFePO4 / 800W + alternator', parts: 'Quad banks, 8× panels, 80A MPPT, 3500W inv/chgr, DC-DC charger', cost: '$16,900' },
];

const pipelineRows = [
  { stage: '1 · CAD export', input: 'SolidWorks / Fusion 360 assembly', out: 'Raw high-poly mesh', target: '200K–500K tris/module' },
  { stage: '2 · Decimation', input: 'High-poly OBJ', out: 'Decimated mesh', target: '5K–15K tris/module' },
  { stage: '3 · Bake', input: 'High-poly + decimated', out: 'PBR texture set', target: '4× 512px maps/module' },
  { stage: '4 · LOD generation', input: 'Decimated mesh', out: 'LOD0/1/2 meshes', target: 'Large modules only' },
  { stage: '5 · glTF export', input: 'Blender scene', out: 'Draco-compressed .glb', target: '100–300KB/module' },
  { stage: '6 · Scene assembly', input: 'All .glb modules', out: 'Final PlayCanvas scene', target: '< 3MB total' },
];

const handoffRows = [
  { field: 'Module selection', crm: 'Line items on deal', prod: 'BOM line items on job card' },
  { field: 'Placement positions', crm: 'Attached to deal notes', prod: 'Floor plan diagram attachment' },
  { field: 'Electrical bundle', crm: 'Product line on deal', prod: 'Electrical subcontractor brief' },
  { field: 'Fabric / finish codes', crm: 'Attached to deal', prod: 'Procurement order trigger' },
  { field: 'Base price', crm: 'Deal value', prod: 'Job card budget' },
  { field: 'Configuration render', crm: 'Deal attachment', prod: 'Client approval reference' },
];

const phaseOneRows = [
  { week: 'Weeks 1–2', milestone: 'Discovery & schema design', deliverable: 'Interior zone map, module catalogue, pricing schema draft' },
  { week: 'Weeks 2–3', milestone: 'Asset preparation begins', deliverable: 'CAD exports, clean-up, baking pipeline established' },
  { week: 'Weeks 3–5', milestone: 'Core 3D scene build', deliverable: 'Van shell, snap zones, 5 priority modules placed' },
  { week: 'Weeks 5–6', milestone: 'Bundle & pricing logic', deliverable: 'Electrical bundles, real-time price engine, build sheet' },
  { week: 'Weeks 6–7', milestone: 'UI layer & CRM integration', deliverable: 'Selection panel, fabric swatches, CRM webhook' },
  { week: 'Weeks 7–8', milestone: 'QA & mobile optimisation', deliverable: 'GPU profiling, Lighthouse audit, UAT with upfitter team' },
];

const CampervanInteriorConfiguratorArticle = () => {
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
    'CAMPERVAN 3D CONFIGURATOR',
    '✦',
    'SPRINTER VAN INTERIOR BUILDER',
    '✦',
    'PARAMETRIC LAYOUT LOGIC',
    '✦',
    'MODULAR POWER BUNDLES',
    '✦',
    'CRM BUILD-SHEET HANDOFF',
    '✦',
    '8-WEEK PHASE 1 LAUNCH',
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
              <span className="text-[#4169E1]">Campervan &amp; Overland 3D Configurators:</span>{' '}
              Layout Builders, Bundles &amp; Asset Scoping
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Bean Trailer 3D configurator with live total cost and exterior kitchen options"
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
                Executive Briefing · $80,000–$150,000 Approved From a PDF
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                The Buyer Never Sees Their Own Floorplan in 3D
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A custom Sprinter build takes three to five months from deposit to delivery. The buyer approves a PDF drawing, picks swatches from a sample board, and hopes the finished interior matches the picture in their head. It rarely does.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                A 3D interior configurator is not a marketing render. It is a live WebGL tool where the buyer drags a galley into place, swaps a bed for a dinette and picks a 400Ah lithium bundle — before a single piece of aluminum is cut. This guide covers the full architecture, from layout logic to CRM handoff.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="30–45%" l="Shorter Sales Cycle" s="Typical effect of interactive 3D on high-ticket sales" />
                <Stat v="< 3 MB" l="Full Interior Scene Weight" s="60 FPS on a 2022-era mobile device" />
                <Stat v="6–8 wks" l="Phase 1 Launch" s="One wheelbase, five priority modules" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Campervan &amp; Overland Configurator Architecture</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="01" />
                  <Pill>Why Static PDFs Stall Van Sales</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    The Commitment Gap at $60,000+
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Buyers cannot mentally composite a floorplan with module choices, fabrics and accessory placement. A 2D drawing does not say whether the mountain bikes fit under the bed platform beside the compressor fridge.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="8–12 hours of sales time">Spent per deal before a deposit — on a deal that may not close.</Check>
                    <Check title="One-of-a-kind builds">No showroom floor; a 3D walkthrough becomes the showroom.</Check>
                    <Check title="Constrained, not free-form">Show only combinations the upfitter can build, at prices they can quote.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="Bean Trailer — model selection with live pricing before the 3D build starts"
                  alt="Bean Trailer model selection screen with prices from $19,999 to $74,995"
                />
              </div>
              <Delivers label="Bean Trailer in Context">
                A Pixel Streaming 3D builder lets buyers configure exterior finish, interior package and accessory layout before submitting a build request — compressing multi-email back-and-forth into <strong className="text-white font-bold">a single qualified submission</strong>.
              </Delivers>
            </article>

            {/* ENTRY 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="02" />
                <Pill>Parametric Layout Logic</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Zone-Based Spatial Partitioning
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The challenge is constraint, not rendering. A Sprinter 170 EXT offers roughly 282 cubic feet with wheel arches, D-pillars, floor channels and a sliding-door clearance zone. Every module must respect all of them.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="Named zones">Cab transition, driver-side galley run, passenger storage, mid-cargo, rear living, roof.</Check>
                  <Check title="Snap rules">A galley snaps within 150mm of a valid position — and refuses if it blocks a D-pillar or door arc.</Check>
                  <Check title="Rules in JSON">Layout rules live in a schema, not the render engine. A new wheelbase means a schema update, not new render code.</Check>
                  <Check title="AABB collision">Modules carry +50mm tolerance boxes tested against 15–25 convex hulls. Red = collision, green = snap, at 60 FPS.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={imgTwo}
                  cap="Live configuration in a studio scene — finish options and running total"
                  alt="Bean Trailer 3D configurator in studio view with colour options and total cost"
                />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Modular Bundle Architecture</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Electrical Bundles That Cut Decision Fatigue
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Specifying a fridge, a 400Ah bank, an inverter, a solar controller and four roof panels as separate line items makes buyers stall. Pre-grouped tiers fix that.
                </p>
              </div>
              <DataTable
                icon={FiDollarSign}
                title="Electrical Bundle Tiers"
                cols={[
                  { key: 'tier', label: 'Bundle Tier', span: 2 },
                  { key: 'pkg', label: 'Electrical Package', span: 3 },
                  { key: 'parts', label: 'Included Components', span: 5 },
                  { key: 'cost', label: 'Add-Cost', span: 2, strong: true },
                ]}
                rows={bundleRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                Pick the Off-Grid Explorer and the configurator surfaces only galley and sleeping modules with enough under-floor volume for that battery box. The constraint engine and bundle logic work together.
              </p>
              <Delivers label="Engineering Note">
                For roof racks and exterior accessories on a high-roof, run a separate collision pass against vehicle-height limits — <strong className="text-white font-bold">7&apos;0&quot; (2,134mm)</strong> for US standard garages, 7&apos;6&quot; (2,286mm) for suburban. Flagging clearance in the tool prevents post-sale engineering surprises.
              </Delivers>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="04" />
                  <Pill>CAD &amp; Photogrammetry Asset Scoping</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    From 200K-Triangle CAD to a Sub-3MB Scene
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    The biggest technical risk is asset preparation. Upfitter CAD assemblies carry bolts, fasteners and internal members with no visual purpose. A systematic pipeline gets them to a performant WebGL scene.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Fabrics">Photograph samples at 2048px, build tileable PBR sets. 8–12 colourways across 3–4 families is roughly 15–20MB — load only the active one.</Check>
                    <Check title="Van shell">Licensed OEM CAD is faster; a photogrammetry scan gives full IP ownership and model-year details. Allow 4–6 extra days.</Check>
                  </div>
                </div>
                <Frame
                  src={imgThree}
                  cap="Studio-lit trailer with solar roof and exterior storage — baked PBR assets"
                  alt="Bean Trailer 3D model with solar roof panels and pull-out exterior kitchen"
                />
              </div>
              <DataTable
                icon={FiLayers}
                title="CAD-to-WebGL Pipeline"
                cols={[
                  { key: 'stage', label: 'Stage', span: 3 },
                  { key: 'input', label: 'Input', span: 3 },
                  { key: 'out', label: 'Output', span: 3 },
                  { key: 'target', label: 'Target', span: 3, strong: true },
                ]}
                rows={pipelineRows}
              />
              <Delivers label="Scope Reality Check">
                A typical Sprinter 170 EXT configurator — 12–18 furniture modules, 4 electrical bundles, 6 fabric families, 3 flooring options, 4 window treatments plus roof options — takes <strong className="text-white font-bold">6–10 weeks</strong> of asset preparation with a dedicated 3D artist.
              </Delivers>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="05" />
                <Pill>Real-Time Pricing &amp; Build-Sheet Handoff</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Every Configuration Becomes a Priced, Producible Order
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm mt-4">
                  <Check title="Instant price updates">A stateless client-side function prices the configuration; no server round-trip per selection.</Check>
                  <Check title="Controlled pricing authority">The schema refreshes daily from the backend, so price changes need no code deployment.</Check>
                  <Check title="Discounts stay server-side">Volume, dealer and promo pricing apply at quote time, never exposed to the client.</Check>
                </div>
              </div>
              <DataTable
                icon={FiLayers}
                title="Configurator to CRM to Production"
                cols={[
                  { key: 'field', label: 'Data Field', span: 4 },
                  { key: 'crm', label: 'CRM Record', span: 4 },
                  { key: 'prod', label: 'Production System', span: 4, strong: true },
                ]}
                rows={handoffRows}
              />
              <Delivers label="The Result">
                Every lead is a documented configuration. The first sales call is not &quot;what are you looking for?&quot; — it is delivery timing. Across 50 builds a year, automated handoff typically saves <strong className="text-white font-bold">200+ hours</strong> of sales and production admin.
              </Delivers>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Phased Launch Roadmap</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Launch the Base Model in 8 Weeks, Not the Whole Catalogue in 12 Months
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Anchor Phase 1 on one wheelbase, one roof height, one base bundle and the five most popular modules. Measure conversion, then extend.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Phase 1: Flagship Base Configurator"
                cols={[
                  { key: 'week', label: 'Week', span: 2 },
                  { key: 'milestone', label: 'Milestone', span: 4, strong: true },
                  { key: 'deliverable', label: 'Deliverable', span: 6 },
                ]}
                rows={phaseOneRows}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 1 · Weeks 1–8 · $28K–$45K</span>
                  <p className="text-zinc-600 leading-relaxed">Base configurator embedded on the landing page with GA4 events and CRM webhook live.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 2 · Months 3–5 · $12K–$20K</span>
                  <p className="text-zinc-600 leading-relaxed">Second wheelbase (2–3 weeks), remaining modules (1–3 days each) and a roof-system companion panel.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 3 · Months 6–9 · Scoped later</span>
                  <p className="text-zinc-600 leading-relaxed">Dealer portal, offline trade show kiosk mode, and an optional WebAR companion (4–6 weeks).</p>
                </div>
              </div>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl">
                <EntryNumber n="07" />
                <Pill>What to Expect at Launch</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  It Qualifies the Pipeline — It Doesn&apos;t Replace the Sales Team
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Watch lead quality, not just volume. Forty submissions a month at an average configuration value of $95,000 is commercial value an enquiry form cannot match. Track submission-to-deposit conversion against your pre-configurator baseline — that number justifies Phase 2.
                </p>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Asset libraries, pricing schemas and CRM integrations take months to build. First movers in 2026 will own the benchmark buyers use to judge everyone else. See the{' '}
                  <Link href="/project/bean-trailer-3d-builder" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">Bean Trailer 3D builder case study</Link>{' '}
                  or our{' '}
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
              Ready to Scope Your Van Interior Configurator?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Elipse Studio has built production 3D configurators for specialty vehicle manufacturers, trailer builders and custom equipment upfitters. Whether it is a WebGL tool, a Pixel Streaming build or a WebAR companion, we scope from asset inventory through to CRM integration.
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
                3D configurators, Pixel Streaming and WebAR for van upfitters, overland manufacturers, trailer builders and RV dealers worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampervanInteriorConfiguratorArticle;
