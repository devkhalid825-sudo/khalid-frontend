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
  FiChevronDown,
  FiExternalLink,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Placeholder images (swap for GC Mods / Eco Battery project shots when ready).
import _heroImg from '../../assets/About-page/golf-cart.webp';
import _imgTwo from '../../assets/About-page/golf-1.png';
import _imgThree from '../../assets/About-page/golf-2.png';
import _imgFour from '../../assets/About-page/golf-3.png';

const heroImg = getImgSrc(_heroImg);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Golf cart 3D configurator by Elipse Studio'}
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

const swapRows = [
  { cat: 'Wheels (14 options)', method: 'GLB mesh swap', load: '180–320ms', fps: '55–60 fps' },
  { cat: 'Off-road tyres (8 options)', method: 'GLB mesh swap', load: '220–380ms', fps: '54–60 fps' },
  { cat: 'Lithium battery pack (4 options)', method: 'GLB mesh swap', load: '160–280ms', fps: '56–60 fps' },
  { cat: 'Custom enclosure (6 options)', method: 'GLB mesh + material', load: '340–520ms', fps: '50–58 fps' },
  { cat: 'Vinyl wrap (12 options)', method: 'UV texture swap', load: '60–140ms', fps: '58–60 fps' },
  { cat: 'Sound bar (5 options)', method: 'GLB mesh swap', load: '140–240ms', fps: '56–60 fps' },
];

const channelRows = [
  { feature: 'Pricing', d2c: 'MSRP / retail', dealer: 'Dealer-tier (3 tiers)' },
  { feature: 'Build persistence', d2c: 'Shareable URL (30-day TTL)', dealer: 'Saved to dealer account (permanent)' },
  { feature: 'PDF output', d2c: 'Customer summary', dealer: 'Full build sheet with part numbers and margin' },
  { feature: 'Order path', d2c: 'Shopify checkout', dealer: 'Direct PO to OMS' },
  { feature: 'Customer-facing share', d2c: 'Full 3D link', dealer: 'Retail-priced view (cost hidden)' },
  { feature: 'Lead capture', d2c: 'Email / quote request form', dealer: 'Auto-logged to dealer CRM record' },
];

const migrationRows = [
  { phase: 'Phase 1 (M1–3)', commerce: 'WooCommerce', config: 'Overlay + line-item meta', erp: 'Unchanged', risk: 'Zero' },
  { phase: 'Phase 2 (M4–8)', commerce: 'Shopify', config: 'Cart API + metafields', erp: 'Shopify webhooks', risk: 'Low' },
  { phase: 'Phase 3 (M9+)', commerce: 'Shopify headless', config: 'Direct Storefront API', erp: 'Automated WMS handoff', risk: 'Medium' },
];

const fitRows = [
  { biz: 'Custom Cart Builder (GC Mods model)', signal: 'High: 10+ configurable options, $15k+ avg build', scope: 'Full 5-platform + dealer portal' },
  { biz: 'Aftermarket Accessory Distributor', signal: 'High: wheel/tyre/lift kit catalogue with compatibility matrix', scope: 'Single-platform accessory builder' },
  { biz: 'EV Conversion Specialist (Eco Battery model)', signal: 'High: battery chemistry options + chassis fit guide', scope: 'Battery configurator + compatibility checker' },
  { biz: 'Powersports Dealership Network', signal: 'Medium: 5+ OEM brands, wholesale pricing complexity', scope: 'Multi-brand CPQ portal' },
  { biz: 'Resort / Fleet Procurement', signal: 'Medium: volume pricing, spec standardisation', scope: 'Fleet spec builder + bulk quote export' },
];

const faqs = [
  {
    q: 'How long does it take to build a golf cart 3D configurator from scratch?',
    a: 'A production-ready configurator covering a single chassis platform with 8–12 component categories takes 10–14 weeks from signed brief to live deployment. A multi-platform build (3–5 chassis families) with dealer portal and CPQ integration typically runs 18–24 weeks. The largest time variable is the CAD-to-WebGL pipeline — sourcing, cleaning and validating 3D geometry for every configurable component. Brands with existing 3D CAD libraries compress this by 30–40%.',
  },
  {
    q: 'What is the typical investment range for a powersports 3D CPQ configurator?',
    a: 'Single-platform configurators (D2C retail only, no dealer portal) typically range from $28,000–$55,000. Multi-platform builds with full CPQ, dealer portal and ERP integration run $65,000–$120,000+. An ongoing retainer for catalogue updates adds $2,500–$6,000 per month depending on volume. Off-the-shelf configurator SaaS tools exist at lower entry points but offer limited 3D quality and no dealer portal customisation.',
  },
  {
    q: 'Can the configurator work on mobile devices without a dedicated app?',
    a: 'Yes — this is the core value of a WebGL web configurator over a native app. PlayCanvas-based configurators run in mobile Safari and Chrome without installation. Smooth 60fps on mid-range Android devices requires aggressive LOD management and compressed texture delivery, but it is achievable: the GC Mods configurator maintains 50–60fps on devices from 2021 onwards.',
  },
  {
    q: 'How does the configurator handle new accessory launches after deployment?',
    a: 'New components are added through a structured asset pipeline: 3D geometry processed to WebGL standards, compatibility rules defined in the JSON matrix, pricing entered in the CPQ engine, and the component published without a full application rebuild. In Elipse Studio\'s ongoing engagement model, standard component additions are completed within 3–4 business days of asset delivery.',
  },
  {
    q: 'Does a 3D configurator replace the need for a product catalogue or dealer training?',
    a: 'No — it complements both. The configurator handles the visual and pricing layer of the buying journey. It does not replace technical spec sheets (torque specs, fitment tables, warranty documentation) or dealer training on installation. The highest-performing deployments make the configurator the entry point of the buying journey, with links to detailed spec documentation for buyers who need engineering-level validation.',
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

const GolfCart3dConfiguratorArticle = () => {
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
    'GOLF CART 3D CONFIGURATOR',
    '✦',
    'LSV CUSTOMIZER',
    '✦',
    'PLAYCANVAS · WEBGL',
    '✦',
    'DEALER PORTAL CPQ',
    '✦',
    '5 CHASSIS PLATFORMS',
    '✦',
    '+40% QUOTING VOLUME',
    '✦',
    'WOOCOMMERCE TO SHOPIFY',
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
              <span className="text-[#4169E1]">Golf Cart &amp; LSV 3D Web Configurators:</span>{' '}
              How Interactive Accessory Builders Drive 40% Higher Dealership Quoting Volume
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Industry Architecture
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="GC Mods golf cart 3D web configurator with real-time wheel, battery and enclosure swapping"
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
                Book an architecture review ↗
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
              Book an architecture review <FiArrowRight />
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
                Executive Briefing · A $38,000 Build Does Not Sell From a PDF
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Why Static Option Sheets Break High-Ticket Golf Cart Sales
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A fully-loaded Club Car Onward with lifted suspension, 14-inch alloy wheels, a Bluetooth sound system and a carbon-fibre vinyl wrap has to be seen, priced and locked in before second-guessing sets in.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                The global golf cart market exceeded <strong>$1.9 billion in 2024</strong> and is projected to reach <strong>$3.1 billion by 2030</strong>, with a $600M+ aftermarket accessories segment layered on top — lift kits, lithium retrofits, enclosures and premium wheel packages.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This is the architecture Elipse Studio built for the <strong>GC Mods / Eco Battery</strong> configurator: a PlayCanvas/WebGL application with five chassis platforms, real-time component swapping and dual D2C and wholesale pricing. Below is the blueprint, ready to replicate for powersports, utility and specialty vehicle brands.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="+40%" l="Dealer Quoting Volume" s="Within the first 90 days of launch" />
                <Stat v="5" l="Chassis Platforms" s="One codebase, one component catalogue" />
                <Stat v="< 3 min" l="To Generate a Build Sheet" s="Down from 24–48 hours by phone or email" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Golf Cart &amp; LSV 3D Configurator Architecture</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="01" />
                <Pill>The High-Ticket Aftermarket Dilemma</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Why Selling $12k–$35k Custom Builds Through PDF Option Sheets Breaks
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  A standard aftermarket sale spans 12–18 configurable dimensions: chassis, battery chemistry, wheel diameter and offset, tyre profile, enclosure, upholstery, lighting, audio and accessory bundles. Across five platform families and three price tiers (D2C, dealer-wholesale, fleet) that is several thousand valid configurations — impossible to communicate through a static PDF or a dropdown form.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Configuration errors at order entry">A dealer picks 14-inch wheels for a chassis with a 10-inch wheel well. The error surfaces at fulfilment, not quote time — a 3% error rate costs a mid-size distributor $60,000–$120,000 a year in rework and return freight.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Quote latency kills momentum">A buyer waits 48 hours for a dealer quote. Powersports decision windows have compressed from 7–10 days to 48–72 hours, so the sale is often gone before the quote lands.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Wholesale margin leakage">Without tier pricing enforced at configuration time, dealers quote retail when they should quote wholesale, or the reverse — eroding distribution economics and D2C channel integrity.</Cross>
                </div>
              </div>
              <Delivers label="GC Mods Result">
                After deploying the Elipse Studio PlayCanvas configurator, GC Mods and Eco Battery measured a{' '}
                <strong className="text-white font-bold">40% increase in dealer quoting volume within 90 days</strong>{' '}
                — driven by same-session quote generation replacing multi-day email cycles.
              </Delivers>
              <div className="mt-8 max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">What buyers in this segment actually need</h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <Check title="Spatial confirmation">See that the 14-inch Fuel Maverick wheel fits the EZGO TXT proportionally before committing $2,400 to a wheel package.</Check>
                  <Check title="Configuration persistence">Save, share and revisit a build — critical for fleet procurement cycles that involve committee approval.</Check>
                  <Check title="Instant pricing, no sales interaction">Buyers conditioned by Tesla, Rivian and BMW configurators read any human in the pricing step as opacity.</Check>
                </div>
              </div>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="02" />
                  <Pill>The 3D Component Swapping Engine</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Real-Time Geometry Swapping Under 400ms
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    The core challenge is not render quality — it is loading speed under swap. With 15–20 component categories and 4–12 options each, pre-loading everything means 200–800 MB before the first interaction. The answer is a four-layer streaming bundle hierarchy on PlayCanvas.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Layer 0 · Core chassis">Frame, body panels, dashboard, seats. Loaded at session start, 4.2–6.8 MB compressed GLB.</Check>
                    <Check title="Layer 1 · Wheels and tyres">Swapped nearly every session; top 3 options pre-cached after chassis load, 1.2–2.4 MB per set.</Check>
                    <Check title="Layer 2 · Batteries, enclosures, audio">Loaded on first hover or touch of the category, 0.8–1.6 MB per asset.</Check>
                    <Check title="Layer 3 · Wraps, lighting, bundles">Loaded on selection. Vinyl wraps are a 2K UV texture swap, under 400 KB per option.</Check>
                  </div>
                </div>
                <Frame
                  src={imgTwo}
                  cap="Real-time component swapping in the browser — no install, no app"
                  alt="Real-time WebGL component swapping in a 3D configurator"
                />
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">Swap performance by component category</h4>
              <DataTable
                icon={FiLayers}
                title="Component Swap Performance"
                cols={[
                  { key: 'cat', label: 'Component Category', span: 4 },
                  { key: 'method', label: 'Swap Method', span: 3 },
                  { key: 'load', label: 'Avg Load (4G)', span: 3, strong: true },
                  { key: 'fps', label: 'Mobile FPS', span: 2 },
                ]}
                rows={swapRows}
              />

              <div className="mt-8 max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">Real-time compatibility enforcement</h4>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Compatibility in this market is structural, not cosmetic. A 4-inch lift kit changes wheel-well clearance, enabling larger tyres but demanding specific wheel offsets. The configurator filters wheel and tyre options dynamically when a lift kit is chosen. Incompatible options are greyed out with a tooltip explaining the constraint rather than silently removed — reducing buyer confusion and support tickets. The matrix lives in a JSON configuration file, not in the render engine, so the product team can add components without a code deployment as the catalogue turns over 20–30% a year.
                </p>
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="03" />
                <Pill>Multi-Model Platform Families</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Five Chassis Platforms, One Codebase
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The range spans Club Car Onward, Club Car Precedent, EZGO TXT, EZGO RXV and a generic LSV platform. Each chassis has distinct geometry but shares 60–70% of its accessory catalogue — so we built a parent-child asset model instead of five codebases.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="Parent node">Platform chassis GLB, camera rig (3 presets plus free-rotate), lighting rig and environment map.</Check>
                  <Check title="Child nodes">Shared component GLBs with a platform-override transform table: default_transform, platform_overrides and compatibility_rules.</Check>
                  <Check title="Vinyl layer">A UV map per platform. Onward and Precedent share 80% of their layout; EZGO platforms need separate sets.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={imgThree}
                  cap="One wheel set, five chassis — same GLB, different transform matrices"
                  alt="Multi-platform vehicle configurator sharing one component catalogue"
                />
              </div>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>Mobile Performance &amp; CAD-to-WebGL</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Sub-2 Second Loads and a Three-Stage Asset Pipeline
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Aftermarket accessories rarely arrive with clean CAD. Wheel makers send STEP or IGES files; some enclosure suppliers send only physical samples.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Mobile</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">How we hit sub-2s on 4G</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check>Chassis GLB under 7 MB via Draco mesh compression</Check>
                    <Check>1K textures on first render, 4K on idle</Check>
                    <Check>PlayCanvas LOD switching based on camera distance</Check>
                    <Check>Wheel and tyre bundles pre-cached during the 500ms platform-selection animation</Check>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Pipeline</span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 mb-3">Three stages per new component</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <Check title="1 · Geometry cleanup">STEP/IGES to Blender, reduce to 15,000–35,000 triangles, UV unwrap for PBR.</Check>
                    <Check title="2 · Material authoring">PBR setup, baked to texture atlases, exported as GLB.</Check>
                    <Check title="3 · Fit validation">Check against each chassis, calibrate offsets, add the compatibility entry.</Check>
                  </div>
                </div>
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4">
                Average time for a new wheel set across all five platforms: <strong>3–4 days</strong>. A texture-only vinyl wrap: <strong>4–6 hours</strong>. This is the benchmark we use for new accessory additions in retainer agreements.
              </p>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="05" />
                  <Pill>Wholesale Dealer Portal vs D2C Commerce</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Dual-Channel CPQ in One Application
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    GC Mods serves D2C buyers and a network of 80–120 independent dealers from a single 3D engine and component catalogue — with different pricing logic, outputs and authentication.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="D2C layer">Unauthenticated, retail pricing, shareable build URLs via a Redis-backed shortlink service, Shopify checkout from a structured build JSON, and a dealer-quote request.</Check>
                    <Check title="Dealer layer">JWT login, Tier 1–3 pricing by annual volume, PDF build sheets with part numbers and margin, customer preview links with cost hidden, and direct PO submission via API.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="One configurator, two audiences — retail and dealer views"
                  alt="Dealer and retail views of a 3D configurator"
                />
              </div>

              <DataTable
                icon={FiDollarSign}
                title="D2C Retail vs Wholesale Dealer"
                cols={[
                  { key: 'feature', label: 'Feature', span: 3 },
                  { key: 'd2c', label: 'D2C Retail (Unauthenticated)', span: 4 },
                  { key: 'dealer', label: 'Wholesale Dealer (Authenticated)', span: 5, strong: true },
                ]}
                rows={channelRows}
              />

              <Delivers label="What Drove the 40% Quoting Increase">
                One architectural decision: letting dealers generate a fully-priced build sheet without calling GC Mods. Response time fell from 24–48 hours to{' '}
                <strong className="text-white font-bold">under 3 minutes.</strong>{' '}
                Not persuasion — friction removal. Dealers also report that showing the 3D build on a tablet in-store shortens objection cycles and lifts accessory attach rates.
              </Delivers>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Migration Architecture</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  From WooCommerce to Headless 3D Without Breaking Fulfilment
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Most accessory brands start from a 5–8 year old WordPress/WooCommerce site with 400–1,200 SKUs and fulfilment tied to order metadata. Our phased model kept WooCommerce as the commerce layer for the first 12 months so the configurator could be validated commercially first.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Three-Phase Migration"
                cols={[
                  { key: 'phase', label: 'Phase', span: 2 },
                  { key: 'commerce', label: 'Commerce Layer', span: 3 },
                  { key: 'config', label: 'Configurator Integration', span: 3 },
                  { key: 'erp', label: 'ERP / Fulfilment', span: 2 },
                  { key: 'risk', label: 'Risk', span: 2, strong: true },
                ]}
                rows={migrationRows}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 1 · Months 1–3</span>
                  <p className="text-zinc-600 leading-relaxed">Configurator as a WooCommerce overlay. Completed builds are written to the cart as variable products plus line-item meta. Existing fulfilment is unchanged — the configurator is purely additive.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 2 · Months 4–8</span>
                  <p className="text-zinc-600 leading-relaxed">Shopify replaces WooCommerce. Checkout output is re-mapped to the Cart API, compatibility data moves to metafields, ERP sync runs on webhooks, and the dealer portal ships as a Shopify custom app.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Phase 3 · Month 9+</span>
                  <p className="text-zinc-600 leading-relaxed">WordPress decommissioned. A Next.js frontend consumes the Shopify Storefront API plus a headless CMS, and completed orders trigger fulfilment webhooks with structured pick lists.</p>
                </div>
              </div>
              <div className="mt-8 max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">ERP and fulfilment automation</h4>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  A configuration JSON is human-readable; a warehouse needs physical SKUs. A fulfilment translation table (FTT) maps each option to one or more warehouse SKUs — a wheel set may be one SKU, or four wheels plus a hardware kit. GC Mods&apos; FTT has 340 entries across all five platforms. On submission the backend expands the build into a flat SKU list, generates the pick list and creates the ERP purchase order with dealer attribution in <strong>under 800ms</strong>.
                </p>
              </div>
              <Delivers label="Technical Stack">
                PlayCanvas (WebGL) · Node.js (configuration API, CPQ engine, FTT lookup) · Redis (sessions, build persistence) · Shopify · Next.js (headless frontend) · Sanity CMS · Custom JWT dealer auth · Webhook-based ERP integration.
              </Delivers>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <Pill>Who Should Build One</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Is a 3D Web Configurator the Right Investment for Your Business?
                </h3>
              </div>
              <DataTable
                icon={FiLayers}
                title="Configurator ROI by Business Type"
                cols={[
                  { key: 'biz', label: 'Business Type', span: 4 },
                  { key: 'signal', label: 'ROI Signal', span: 4 },
                  { key: 'scope', label: 'Recommended Scope', span: 4, strong: true },
                ]}
                rows={fitRows}
              />
            </article>

            {/* ENTRY 08: FAQ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="08" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  FAQ — Golf Cart 3D Configurator: Technical &amp; Commercial
                </h3>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-6">
                Weighing build options? Read{' '}
                <Link href="/blog/custom-3d-configurator-vs-saas-platform-enterprise-2026" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">why enterprise brands outgrow turnkey SaaS configurators</Link>{' '}
                or see our{' '}
                <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">3D product configurator services</Link>.
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
              Ready to Build Your Golf Cart or Powersports 3D Configurator?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Elipse Studio has deployed production 3D configurators for the golf cart and LSV aftermarket. We know the CAD pipeline, the dealer portal architecture and the WooCommerce migration path. Start with a 45-minute architecture review — no sales deck, just your use case and our engineering answers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book an Architecture Review</span>
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
                3D product configurators, CPQ portals and WebGL experiences for golf cart, LSV, powersports and specialty vehicle brands worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GolfCart3dConfiguratorArticle;
