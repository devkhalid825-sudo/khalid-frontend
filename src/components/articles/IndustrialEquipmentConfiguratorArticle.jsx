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
  FiCpu,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Configurator & Industrial Equipment showcase images.
import _heroImg from '../../assets/About-page/configurator-blogs.png';
import _imgOne from '../../assets/ElipseImages/projects/Streeing-1.webp';
import _imgTwo from '../../assets/About-page/technology.webp';
import _imgThree from '../../assets/About-page/volvo-ui.png';
import _imgFour from '../../assets/About-page/shark.webp';

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
        alt={alt || cap || 'Industrial 3D Equipment Configurator by Elipse Studio'}
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

const shippingCostRows = [
  { item: 'Freight (road + air)', us: '$3,200–$8,500', intl: '$9,800–$28,000', annual: '$32,000–$120,000' },
  { item: 'Crating and packaging', us: '$800–$2,400', intl: '$1,200–$3,600', annual: '$8,000–$24,000' },
  { item: 'Insurance (transit + show)', us: '$600–$1,800', intl: '$1,400–$4,200', annual: '$8,000–$24,000' },
  { item: 'Setup & breakdown labour', us: '$1,200–$3,500', intl: '$1,800–$5,000', annual: '$12,000–$34,000' },
  { item: 'Demo unit depreciation', us: '$4,000–$12,000', intl: '$4,000–$12,000', annual: '$32,000–$96,000' },
  { item: 'Total per show', us: '$9,800–$28,200', intl: '$18,200–$52,800', annual: '$92,000–$298,000' },
];

const cadOptimizationRows = [
  { type: 'Single machined part (100mm)', step: '8–45 MB', retopo: '0.8–3 MB', lod: '120–280 KB', glb: '15–40 KB' },
  { type: 'Small subassembly (5–10 parts)', step: '30–120 MB', retopo: '4–15 MB', lod: '600 KB–2 MB', glb: '80–250 KB' },
  { type: 'Medium assembly (20–50 parts)', step: '150–400 MB', retopo: '20–60 MB', lod: '3–8 MB', glb: '400 KB–1.2 MB' },
  { type: 'Full equipment (50–200 parts)', step: '400 MB–1.2 GB', retopo: '60–180 MB', lod: '8–25 MB', glb: '1–5 MB' },
];

const deliveryComparisonRows = [
  { cap: 'Interactive 3D configurator', online: 'Yes', offline: 'Yes (Device cache)', ue5: 'Yes (Server connection)' },
  { cap: 'Exploded view animation', online: 'Yes', offline: 'Yes (Device cache)', ue5: 'Yes (Server connection)' },
  { cap: 'Cutaway cross-section', online: 'Yes', offline: 'Yes (Device cache)', ue5: 'Yes (Server connection)' },
  { cap: 'Component switching', online: 'Yes', offline: 'Yes (Device cache)', ue5: 'Yes (Server connection)' },
  { cap: 'Spec sheet PDF export', online: 'Yes (Server)', offline: 'Yes (jsPDF client-side)', ue5: 'Yes (Server)' },
  { cap: 'CRM lead submission', online: 'Real-time API', offline: 'Queued (Auto-sync)', ue5: 'Real-time API' },
  { cap: 'Rendering quality', online: 'WebGL (PlayCanvas)', offline: 'WebGL (PlayCanvas)', ue5: 'Lumen Ray-Tracing' },
  { cap: 'Hardware requirement', online: 'Any modern browser', offline: 'iPad / Laptop PWA', ue5: 'Local RTX GPU or Cloud' },
  { cap: 'Trade show kiosk use', online: 'Venue Wi-Fi risk', offline: 'Optimal (Zero Wi-Fi risk)', ue5: 'Local Workstation HDMI' },
];

const rolloutBlueprintRows = [
  { phase: 'Phase 0', time: 'Week 1', deliverables: 'CAD audit (STEP/IGES), polygon estimation, option matrix & offline PWA spec', sign: 'Scope & CAD sign-off' },
  { phase: 'Phase 1', time: 'Weeks 1–3', deliverables: 'Retopology, LODs, PBR machined metal shaders, 0.1mm dimensional verification', sign: '3D asset approval' },
  { phase: 'Phase 2', time: 'Weeks 3–4', deliverables: 'PlayCanvas scene, 3-level exploded view, cutaway geometry, live callouts', sign: 'Exploded view UX' },
  { phase: 'Phase 3', time: 'Weeks 4–5', deliverables: 'Offline PWA Service Worker, client-side PDF spec sheet, queued CRM sync', sign: 'Offline field UAT' },
  { phase: 'Phase 4', time: 'Weeks 5–6', deliverables: 'HubSpot / Salesforce CPQ integration, BOM export & ERP lead-time API', sign: 'CRM & spec approval' },
  { phase: 'Phase 5', time: 'Weeks 6–7', deliverables: 'Branded UI shell, tablet/laptop layout, cross-device QA & sales training', sign: 'UAT acceptance' },
  { phase: 'Phase 6', time: 'Week 8', deliverables: 'Production deployment, CDN distribution, MDM rollout & asset handoff', sign: 'Go-live approval' },
];

const IndustrialEquipmentConfiguratorArticle = () => {
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
    'INDUSTRIAL 3D CONFIGURATORS',
    '✦',
    'EXPLODED CAD VIEWS',
    '✦',
    'TECHNICAL SPEC EXPORT',
    '✦',
    'SOLIDWORKS STEP OPTIMISATION',
    '✦',
    'OFFLINE TRADE SHOW PWA',
    '✦',
    'HUBSPOT & SALESFORCE CPQ',
    '✦',
    'FIELD SALES ROI',
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
              <span className="text-[#4169E1]">Industrial Equipment &amp; Hardware 3D Configurators:</span>{' '}
              Exploded CAD Views, Technical Specs &amp; Field Sales ROI
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · B2B Machinery &amp; Hardware Guide · US | UK | AU
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Industrial machinery 3D configurator with technical CAD model and exploded assembly view"
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
                href="/services/3d-product-configurators"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                3D Configurator Services ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a href="#journal" className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer">
                Read the Architecture Guide ↓
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
                Executive Briefing · B2B Machinery &amp; Technical Hardware
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Replacing Costly Demo Shipping with Interactive Exploded CAD Views
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                Industrial manufacturers spend tens of millions shipping heavy demo units that cannot show internal mechanics, cannot run in convention halls, and add massive freight costs.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                Interactive 3D configurators with real-time exploded views, cutaway cross-sections, and offline PWA capability allow sales engineers to demonstrate complex assemblies, verify 0.1mm tolerances, and generate CRM quotes on an iPad.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="68%" l="Shipping Cost Reduction" s="Demo unit freight and drayage (2025 Manufacturer Study)" />
                <Stat v="4.2x" l="Longer Prospect Engagement" s="Engineering session length vs static PDF brochures" />
                <Stat v="2.8x" l="Faster Capex Sign-Off" s="Procurement committee review speed with 3D links" />
                <Stat v="51%" l="Fewer Post-Sale Disputes" s="Technical specification disputes resolved prior to build" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Industrial 3D Configurator Architecture &amp; Field Sales ROI</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="01" />
                  <Pill>Field Sales &amp; Trade Show Logistics</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    The Trade Show &amp; Field Sales Shipping Problem
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-5">
                    Shipping 400kg–2,000kg physical demo units across trade shows and regional client visits is the most expensive, least scalable bottleneck in industrial sales.
                  </p>

                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">1.1 The True Cost of Physical Demo Units</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-3">
                    Direct freight is only a fraction of the total drain. Across 8 annual expos, expenses compound rapidly:
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Crating & Packaging">$800–$3,600 per show in shock-mounted flight cases.</Check>
                    <Check title="Rigging & Drayage">Convention hall union handling often exceeds overland transport.</Check>
                    <Check title="Fleet Depreciation">15–25% annual value write-down on units that cannot be sold as new.</Check>
                  </div>
                </div>
                <Frame
                  src={imgOne}
                  cap="Interactive 3D configurator showing internal subassemblies and real-time component swaps"
                  alt="3D mechanical component configurator with parts selection sidebar"
                />
              </div>

              <DataTable
                icon={FiDollarSign}
                title="Industrial Equipment Demo Cost Model"
                cols={[
                  { key: 'item', label: 'Cost Component', span: 3 },
                  { key: 'us', label: 'Per Show (US Domestic)', span: 3 },
                  { key: 'intl', label: 'Per Show (International)', span: 3 },
                  { key: 'annual', label: 'Annual (8 Shows)', span: 3, strong: true },
                ]}
                rows={shippingCostRows}
              />

              <Delivers label="Hidden Opportunity Cost">
                Demo units in transit or on exhibition floors cannot be quoted to in-stock buyers, locking up hundreds of thousands of dollars in revenue.
              </Delivers>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 pt-6 border-t border-zinc-100">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">1.2 Field Sales Logistics Barrier</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                    Sales reps cannot transport full-scale equipment. Static brochures and PDFs fail to show internal fluid dynamics, stretching deals by 4 to 12 weeks.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">1.3 Capex Visualisation Gap</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                    Capital purchases require approval from non-technical executives. Shareable 3D links let committee members explore machinery at their own pace.
                  </p>
                </div>
              </div>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
                <div>
                  <EntryNumber n="02" />
                  <Pill>Interactive 3D Mechanics</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Interactive Exploded Views &amp; Internal Cutaways
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Exploded views and internal cutaways allow procurement engineers to inspect mechanisms physically inaccessible on assembled units.
                  </p>

                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Three-Level Exploded Hierarchy (WebGL):</h4>
                  <div className="space-y-2 text-xs sm:text-sm mb-5">
                    <Check title="Level 1 — Major Assemblies">Motor, gearbox, and manifold separate to show external interfaces.</Check>
                    <Check title="Level 2 — Subassembly Detail">Internal valves, rotor shafts, and seal stacks animate to exploded vectors.</Check>
                    <Check title="Level 3 — Component Isolation">Single parts orbit in isolation with part numbers and 0.1mm callouts.</Check>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Internal Cutaway Engineering:</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check title="Clipping Plane Shaders">Interactive sliders slice through housings in real time without reloading meshes.</Check>
                    <Check title="Section Geometry">Internal fluid channels and volutes render with millimetre-accurate wall thickness.</Check>
                  </div>
                </div>

                <div className="space-y-4">
                  <Frame
                    src={imgTwo}
                    cap="High-precision engineering 3D asset with real-time materials and cross-section analysis"
                    alt="Precision engineering hardware assembly rendered in WebGL"
                  />
                  <Delivers label="Unreal Engine 5 for Capital Machinery">
                    For multi-million-dollar automated lines and heavy turbines, UE5 with Lumen ray tracing delivers photographic fidelity for boardroom capex presentations.
                  </Delivers>
                </div>
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>SolidWorks &amp; STEP Pipeline</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  SolidWorks &amp; STEP Optimisation: 500MB to Sub-5MB
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Raw CAD files from SolidWorks, Inventor, or Siemens NX contain millions of mathematical surfaces that crash web browsers. Our pipeline reduces payloads by 98% while maintaining engineering accuracy.
                </p>
              </div>

              <DataTable
                icon={FiCpu}
                title="CAD to Real-Time Optimization Benchmarks"
                cols={[
                  { key: 'type', label: 'Component Type', span: 4 },
                  { key: 'step', label: 'Typical STEP Export', span: 3 },
                  { key: 'retopo', label: 'After Retopology', span: 2 },
                  { key: 'lod', label: 'After LOD', span: 2 },
                  { key: 'glb', label: 'Final GLB', span: 1, strong: true },
                ]}
                rows={cadOptimizationRows}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">5-Stage Optimisation Pipeline:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="1. Geometry Audit">Removes hidden internal faces and instances duplicate fasteners.</Check>
                    <Check title="2. Retopology">Converts heavy NURBS into lightweight, clean quad/tri meshes.</Check>
                    <Check title="3. Normal Baking">Bakes micro-bevels and thread textures into normal maps.</Check>
                    <Check title="4. 3-Tier LODs">Smoothly shifts polygon density based on camera distance.</Check>
                    <Check title="5. Draco Compression">Shrinks final GLB payloads for sub-3-second mobile loading.</Check>
                  </div>
                  <Delivers label="0.1mm Dimensional Accuracy Guarantee">
                    Automated bounding checks ensure all mounting centres, shaft diameters, and envelope dimensions match source STEP files within 0.1mm.
                  </Delivers>
                </div>

                <div>
                  <Frame
                    src={imgThree}
                    cap="Interactive UI overlay demonstrating real-time part swaps, dimensional tolerances, and spec checks"
                    alt="Configurator UI showing interactive technical specifications and component switching"
                  />
                </div>
              </div>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>Field Sales Reliability</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Offline Trade Show Mode vs Cloud Pixel Streaming
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Convention centre Wi-Fi is congested and unpredictable. Field configurators must operate flawlessly offline without relying on external cloud video feeds.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="Delivery Architecture Comparison"
                cols={[
                  { key: 'cap', label: 'Capability', span: 3 },
                  { key: 'online', label: 'Online WebGL', span: 2 },
                  { key: 'offline', label: 'Offline PWA (Recommended)', span: 4, strong: true },
                  { key: 'ue5', label: 'UE5 Pixel Streaming', span: 3 },
                ]}
                rows={deliveryComparisonRows}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Offline PWA (Recommended for Field Sales):</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-3">
                    Installs onto iPads or laptops via Service Workers, running locally from device SSD memory with instant response even in remote mine sites.
                  </p>
                  <Check title="Client-Side Spec PDFs">jsPDF generates technical data sheets locally in under 2 seconds.</Check>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Local Workstation Pixel Streaming:</h4>
                  <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-3">
                    For booth kiosks, an under-counter RTX workstation drives 4K displays directly over HDMI with ray tracing and zero internet dependency.
                  </p>
                  <Check title="Zero Latency">Direct hardware output guarantees smooth 60fps interaction on touchscreens.</Check>
                </div>
              </div>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
                <div>
                  <EntryNumber n="05" />
                  <Pill>CRM &amp; CPQ Workflows</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    CRM &amp; Technical Spec Export: Configuration to Quote
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Every configuration outputs a verified Bill of Materials (BOM), eliminating manual quote estimation and specification errors.
                  </p>

                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">Automated 5-Page Spec Sheet:</h4>
                  <div className="space-y-1.5 text-xs sm:text-sm text-zinc-600 mb-5">
                    <p><strong>1. Isometric Render:</strong> Visual configuration snapshot with model SKU.</p>
                    <p><strong>2. Operational Envelope:</strong> Flow rates, pressures, RPM, voltage, and footprint.</p>
                    <p><strong>3. Component BOM:</strong> Line-item part numbers, options, and lead times.</p>
                    <p><strong>4. Certifications:</strong> ISO 9001, ATEX Zone 1/2, CE, UL/CSA standards.</p>
                    <p><strong>5. Hookup Schematics:</strong> Flange specs, porting dimensions, and wiring data.</p>
                  </div>
                </div>

                <div>
                  <Frame
                    src={imgFour}
                    cap="High-fidelity 3D industrial machinery asset with accurate material definition and assembly structure"
                    alt="Industrial hardware machine model rendered in real-time"
                  />
                  <div className="space-y-2.5 mt-5 bg-zinc-50 p-4 border border-zinc-200 text-xs sm:text-sm">
                    <Check title="HubSpot CRM">Auto-creates enriched deals with configured BOM arrays and triggers sales alerts.</Check>
                    <Check title="Salesforce CPQ">Maps option IDs directly into Product2 line items with zero manual entry.</Check>
                    <Check title="ERP Systems">REST APIs sync customer selections directly into SAP or Microsoft Dynamics MRP.</Check>
                  </div>
                </div>
              </div>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Implementation Blueprint</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  8-Week Phased Rollout: Raw CAD to Field Deployment
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  A disciplined stage-gate process ensures dimensional accuracy, CRM synchronization, and field team readiness before public launch.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="8-Week Industrial Rollout Blueprint"
                cols={[
                  { key: 'phase', label: 'Phase', span: 2 },
                  { key: 'time', label: 'Timeline', span: 2 },
                  { key: 'deliverables', label: 'Key Deliverables', span: 5, strong: true },
                  { key: 'sign', label: 'Sign-Off Stage-Gate', span: 3 },
                ]}
                rows={rolloutBlueprintRows}
              />

              <div className="mt-8 bg-zinc-50 border border-zinc-200 p-5 rounded-none max-w-4xl">
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 uppercase tracking-wider mb-3">
                  Scope Risks Handled in Phase 0:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600">
                  <p><strong>Non-Manifold Geometry:</strong> Zero-thickness walls and inverted normals are identified and repaired early.</p>
                  <p><strong>Export-Controlled CAD:</strong> Visual-equivalent meshes protect proprietary internal secrets.</p>
                  <p><strong>Change Orders (ECO):</strong> Modular component architecture allows updates without full assembly rebuilds.</p>
                  <p><strong>Hazardous (ATEX) Devices:</strong> PWA tested on certified intrinsically safe tablets for field environments.</p>
                </div>
              </div>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl">
                <EntryNumber n="07" />
                <Pill>Strategic Summary</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Conclusion: Retiring the Demo Unit, Equipping the Field
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                  Equipping field sales with offline 3D configurators eliminates $92,000–$298,000 in annual demo shipping, shortens sales cycles by 3 to 5 weeks, and proves internal engineering value on the spot.
                </p>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Explore our{' '}
                  <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    3D Product Configurator Services
                  </Link>{' '}
                  or view our{' '}
                  <Link href="/portfolio" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    recent interactive 3D deployments
                  </Link>.
                </p>
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Ready to Modernise Your Sales Fleet?
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Scope an Exploded-View 3D Configurator for Your Equipment Range
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Send us your STEP/IGES assembly or option matrix to receive a fixed-price proposal, CAD audit, and 8-week implementation timeline within 5 business days.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-industrial"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Technical Discovery Call</span>
                <FiArrowRight className="text-sm" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap px-4 sm:px-6 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Contact Our Engineers
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
                3D interactive experience agency delivering WebGL configurators, Unreal Engine 5 Pixel Streaming, AR/VR applications and engineering visualisations for industrial clients in the US, UK, and Australia.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IndustrialEquipmentConfiguratorArticle;
