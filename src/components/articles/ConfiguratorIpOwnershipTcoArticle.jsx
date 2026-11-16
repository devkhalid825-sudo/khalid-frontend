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

import _heroImg from '../../assets/About-page/newkia.png';
import _imgTwo from '../../assets/About-page/golf-cart.webp';
import _imgThree from '../../assets/About-page/shark.webp';
import _imgFour from '../../assets/About-page/configurator-blogs.png';

const heroImg = getImgSrc(_heroImg);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || '3D configurator by Elipse Studio'}
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

const scenarioRows = [
  { scenario: 'Conservative (50k views/mo)', base: '$1,800', over: '$0', yr: '$21,600', total: '$64,800' },
  { scenario: 'Mid-Market (150k views/mo)', base: '$2,200', over: '~$1,020', yr: '$38,640', total: '$115,920' },
  { scenario: 'High-Growth (300k views/mo)', base: '$3,500', over: '~$1,800', yr: '$63,600', total: '$190,800' },
  { scenario: 'Enterprise (500k views/mo)', base: '$4,000', over: '~$4,200', yr: '$98,400', total: '$295,200' },
];

const breakEvenRows = [
  { month: 'Month 1', custom: '$85,250', saas: '$3,220', net: '-$82,030' },
  { month: 'Month 12', custom: '$88,000', saas: '$38,640', net: '-$49,360' },
  { month: 'Month 24', custom: '$91,000', saas: '$77,280', net: '-$13,720' },
  { month: 'Month 29 (break-even)', custom: '$92,250', saas: '$93,380', net: '+$1,130' },
  { month: 'Month 36', custom: '$94,000', saas: '$115,920', net: '+$21,920' },
  { month: 'Month 48', custom: '$97,000', saas: '$154,560', net: '+$57,560' },
  { month: 'Month 60', custom: '$100,000', saas: '$193,200', net: '+$93,200' },
];

const hostingRows = [
  { item: 'CDN (Cloudflare / AWS CloudFront)', cost: '$8 – $45', note: 'Scales with bandwidth; 1TB/mo ≈ $45' },
  { item: 'Object storage (S3 / R2)', cost: '$5 – $20', note: '50GB asset library ≈ $5–8/mo' },
  { item: 'Compute (Vercel / Netlify edge)', cost: '$0 – $20', note: 'Free tier covers most production traffic' },
  { item: 'SSL certificate', cost: '$0', note: 'Included with modern CDN providers' },
  { item: 'Monitoring (Sentry / Uptime Robot)', cost: '$10 – $25', note: 'Error tracking and uptime alerts' },
  { item: 'Total per month', cost: '$23 – $110', note: 'vs $1,500 – $4,000+ SaaS fee' },
];

const clauseRows = [
  { n: '1 · IP assignment of source code', saas: 'Never granted', custom: 'Must be explicit work-for-hire' },
  { n: '2 · 3D asset export rights', saas: 'Restricted / proprietary format', custom: 'Full export in native format (GLB/FBX/USD)' },
  { n: '3 · View / render pricing cap', saas: 'Rarely offered; overages standard', custom: 'N/A — no per-view pricing' },
  { n: '4 · Data portability on termination', saas: 'Often 30-day window, limited format', custom: 'You hold all files at all times' },
  { n: '5 · Price escalation clause', saas: 'Typically 8–12% annual increase', custom: 'Fixed one-time fee; no escalation' },
];

const decisionRows = [
  { dim: 'Monthly view volume', custom: '> 50,000 views/month', saas: '< 30,000 views/month' },
  { dim: 'Expected timeline', custom: '> 24 months', saas: '< 18 months' },
  { dim: 'SKU count', custom: '10 to 500 configurable variants', saas: '500+ variants with frequent updates' },
  { dim: 'Asset reuse need', custom: 'Multi-channel (AR, CGI, kiosk)', saas: 'Web only, single channel' },
  { dim: 'Budget structure', custom: 'Capex (one-time investment)', saas: 'Opex (recurring subscription)' },
  { dim: 'IP strategy', custom: 'Own and control all brand assets', saas: 'Speed over ownership' },
  { dim: 'Tech team', custom: 'Internal or agency partner available', saas: 'No internal WebGL capability' },
];

const faqs = [
  {
    q: 'Can a small brand justify the upfront cost of a custom WebGL configurator?',
    a: 'It depends on two variables: monthly view volume and expected product lifecycle. A brand processing fewer than 30,000 product page views per month with a 12 to 18 month product cycle will likely see a better ROI from a SaaS platform in the near term. The custom build advantage accelerates at higher traffic volumes and longer time horizons. As a rule of thumb, if your 36-month SaaS projected cost exceeds $70,000, a custom build should be in your procurement analysis.',
  },
  {
    q: 'What technology stack does Elipse Studio use for custom configurators?',
    a: 'Elipse Studio builds on Three.js and PlayCanvas for browser-based WebGL deployments, and Unreal Engine 5 for high-fidelity desktop and kiosk applications. Stack selection is driven by performance requirements, target device matrix, and integration complexity. All stacks produce client-owned, standard-format output with no proprietary runtime dependency.',
  },
  {
    q: 'How long does a custom configurator build take compared to SaaS onboarding?',
    a: 'A well-scoped custom build typically requires 8 to 16 weeks from kick-off to production launch. SaaS platform onboarding is typically advertised as 2 to 4 weeks, though enterprise integrations commonly take 6 to 10 weeks once SSO, ERP, and PIM integration requirements are factored in. The timeline difference is real but narrower than vendor marketing suggests.',
  },
  {
    q: 'Who owns the 3D models if we supply them?',
    a: 'If you supply the 3D models, you own them — the agency adds no ownership claim over client-supplied assets. If the agency creates the models as part of the engagement, ownership should be explicitly assigned in the contract. Never assume ownership; confirm it in writing at the statement-of-work stage.',
  },
  {
    q: 'What happens to our configurator if Elipse Studio stops operating?',
    a: 'Because clients receive full source code and all 3D assets at project delivery, there is no operational dependency on Elipse Studio continuing as a business. Any qualified WebGL developer can maintain, extend, or redeploy the codebase. This is the structural advantage of IP ownership over SaaS subscription: your digital asset exists independently of any single vendor.',
  },
  {
    q: 'Is SaaS ever the right choice for enterprise brands?',
    a: 'Yes, in specific contexts: for rapid proof-of-concept validation before committing to a full build; for temporary campaign-specific deployments with a defined end date; or for product categories with extremely high SKU counts and frequent model updates where the SaaS platform\'s model management tooling provides genuine workflow efficiency. The key is modelling the full 36-month cost including escalation and overages before making the comparison.',
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

const ConfiguratorIpOwnershipTcoArticle = () => {
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
    '3D CONFIGURATOR IP OWNERSHIP',
    '✦',
    'CUSTOM WEBGL VS SAAS',
    '✦',
    '36-MONTH TCO MODEL',
    '✦',
    'UNLIMITED RENDER VIEWS',
    '✦',
    'NO VENDOR LOCK-IN',
    '✦',
    'OWN YOUR 3D ASSETS',
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
              <span className="text-[#4169E1]">3D Configurator IP Ownership vs SaaS Licensing:</span>{' '}
              The 2026 CTO Guide to 3-Year Total Cost of Ownership for Custom WebGL Builds
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · Enterprise 3D Configurator Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Kia interactive 3D car configurator built by Elipse Studio"
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
                Book a TCO review ↗
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
              Book a TCO review <FiArrowRight />
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
                Executive Briefing · The Demo Looks Like a No-Brainer. The 36-Month Number Doesn&apos;t.
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Subscribe Forever, or Own the Configurator Outright?
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                Your VP of E-Commerce just demoed a gorgeous SaaS 3D configurator. The rep quoted $2,200 per month, &ldquo;unlimited SKUs&rdquo; and a 30-day onboarding. Then finance runs the 36-month number: <strong>$115,920 in platform fees once overages are counted</strong>, zero owned assets, and a termination clause that can wipe your configurator on 30 days&apos; notice.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                CTOs and CFOs evaluating enterprise 3D configurators in 2026 face a genuine fork: subscribe to a SaaS platform and pay indefinitely, or commission a custom WebGL or Unreal Engine build and own the IP outright. The numbers, the contract clauses and the strategic implications look very different depending on the road you take.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                Elipse Studio has built custom 3D configurators for automotive, luxury goods and B2B industrial clients across four continents. This guide uses that project data to give you a model-based TCO framework, so you walk into procurement with actual numbers instead of vendor talking points. <strong>For most mid-to-enterprise brands above 50,000 product views a month, the answer will surprise you.</strong>
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="$115,920" l="Mid-Market SaaS, 36 Months" s="Base fees plus view overages, before escalation" />
                <Stat v="~29 mo" l="Custom Build Break-Even" s="Against a mid-market SaaS contract" />
                <Stat v="$0" l="Assets Owned After SaaS" s="No source code, no native 3D files, no pipeline" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">3D Configurator IP Ownership &amp; TCO Framework</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="01" />
                <Pill>The SaaS Compounding Cost Trap</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  How Base Fees and View Overages Compound Over 36 Months
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Base platform fees typically sit between $1,500 and $4,000 per month depending on tier. On top of that, virtually every enterprise-tier vendor bills view-based overages once you pass a monthly render threshold. That is where the compounding begins.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Overages punish success">A furniture brand on a $2,000/month plan runs a campaign that drives 180,000 views. The contract includes 50,000; the other 130,000 bill at $0.012 each — $1,560 extra, for a $3,560 month.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Hidden line items">Annual escalation clauses (typically 8–12%), implementation and migration fees, per-SKU 3D model conversion charges and white-labelling surcharges are rarely in the headline quote.</Cross>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <Cross title="Zero equity at month 36">After $115,920 in fees a mid-market brand owns no source code, no native-format 3D files, no rendering pipeline and no configurator logic. If the vendor raises prices or retires your tier, you are back to month zero.</Cross>
                </div>
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mt-8 mb-3">36-month SaaS cost under four traffic scenarios</h4>
              <DataTable
                icon={FiDollarSign}
                title="SaaS Cost by Traffic Scenario"
                cols={[
                  { key: 'scenario', label: 'Scenario', span: 4 },
                  { key: 'base', label: 'Monthly Base', span: 2 },
                  { key: 'over', label: 'Avg Overages / mo', span: 2 },
                  { key: 'yr', label: 'Annual Cost', span: 2 },
                  { key: 'total', label: '36-Month Total', span: 2, strong: true },
                ]}
                rows={scenarioRows}
              />
              <p className="text-zinc-500 font-sans text-[11px] sm:text-xs leading-relaxed mt-3">
                Figures exclude annual escalation (8–12%), implementation and migration fees, per-SKU conversion costs and white-labelling surcharges, so real totals run higher.
              </p>

              <Delivers label="When SaaS Is Still the Right Call">
                For brands with fewer than 20 SKUs, low traffic and a product lifecycle of 12 months or less, a SaaS platform may genuinely be the better choice. This guide is for brands in, or heading toward, a sustained high-volume, multi-SKU enterprise context.
              </Delivers>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="02" />
                  <Pill>The Custom Ownership Advantage</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Four Ownership Rights SaaS Contracts Never Grant
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    A custom 3D configurator is typically a one-time investment of $45,000 to $180,000, depending on component count, rendering targets and integration complexity. A three-variant sofa line and a full-spec automotive customizer are different engineering problems, but every custom build shares a fixed cost ceiling and these four rights.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Full source code IP">Configurator logic, rendering pipeline, UI components and integration layer are yours under a work-for-hire arrangement — modify, extend or resell derivatives at your discretion.</Check>
                    <Check title="Unlimited render views">No per-view pricing. A page with ten million views costs the same in configurator fees as one with ten: zero, beyond hosting.</Check>
                    <Check title="No vendor lock-in">The code runs wherever you deploy it. A vendor pivot, acquisition or discontinued tier cannot switch it off.</Check>
                    <Check title="Native 3D asset ownership">Models, materials, lighting rigs and animation data are delivered in GLB, FBX, USD or Unreal project files.</Check>
                  </div>
                </div>
                <Frame
                  src={imgTwo}
                  cap="A client-owned WebGL configurator — source code and GLB assets delivered at handover"
                  alt="Custom-built golf cart 3D web configurator owned by the client"
                />
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">The break-even point</h4>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed max-w-3xl mb-4">
                Assume an $85,000 build (a mid-range WebGL configurator with 50–150 variants) against a mid-market SaaS contract at $3,220 per month ($38,640 a year). Custom running costs are modelled at $3,000 a year: $2,000 for maintenance and roughly $1,000 for hosting.
              </p>
              <DataTable
                icon={FiLayers}
                title="Cumulative Cost: Custom vs SaaS"
                cols={[
                  { key: 'month', label: 'Month', span: 3 },
                  { key: 'custom', label: 'Custom Build TCO', span: 3 },
                  { key: 'saas', label: 'SaaS TCO (Mid-Market)', span: 3 },
                  { key: 'net', label: 'Cumulative Savings', span: 3, strong: true },
                ]}
                rows={breakEvenRows}
              />
              <p className="text-zinc-500 font-sans text-[11px] sm:text-xs leading-relaxed mt-3">
                Sensitivity: with a full quarterly retainer at $7,200 a year (see Entry 04), break-even moves to about month 34 and the 60-month advantage is roughly $67,000. The model also ignores SaaS escalation, which would pull break-even earlier. The 60-month advantage is before the asset-portability value in Entry 03.
              </p>
            </article>

            {/* ENTRY 03 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="03" />
                <Pill>Asset Portability Across Channels</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Seven Places Your Owned 3D Assets Keep Earning
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  SaaS vendors rarely mention that the models inside their platform are hosted in a proprietary format, subject to export limits, or only extractable through paid conversion. Your brand is renting a visual representation of its own product. Own the source files in GLB, FBX or USD and they become reusable content infrastructure.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="WebGL configurator">The primary deployment, in-browser with no plugin.</Check>
                  <Check title="WebAR">The same GLB renders in-room via WebXR or Apple Quick Look — typically a 2–4 week integration.</Check>
                  <Check title="Social CGI reels">Renders from Blender or Cinema 4D for Instagram, TikTok and LinkedIn. SaaS platforms charge per exported frame.</Check>
                  <Check title="Trade show kiosk">Port an owned Unreal or Three.js project to a touch kiosk in roughly 15–25 development hours.</Check>
                  <Check title="Print and packaging">Photoreal renders for catalogues and mockups; no re-shoots for colour variants.</Check>
                  <Check title="XR training">Reuse an assembly model for VR training or AR maintenance guides.</Check>
                  <Check title="Future platforms">Apple Vision Pro, Meta Horizon Worlds or whatever follows — owned assets are portable, SaaS-locked ones are not.</Check>
                </div>
              </div>
              <div className="md:order-1 space-y-5">
                <Frame
                  src={imgThree}
                  cap="One owned model library, many channels — BYD Shark 6 3D configurator"
                  alt="BYD Shark 6 3D configurator with live pricing built with owned 3D assets"
                />
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">The render math</span>
                  <p className="text-zinc-600 leading-relaxed">
                    A professional CGI render costs $200–$800 on the open market. A brand with 12 colour variants across 3 product lines, running two campaigns a year at $400 a render, spends <strong>$28,800 per year</strong> — all of which disappears when you own the source files.
                  </p>
                </div>
              </div>
            </article>

            {/* ENTRY 03 callout */}
            <div className="py-2 border-b border-zinc-200 pb-10">
              <Delivers label="Elipse Studio Client Example">
                An automotive client reused their configurator&apos;s source GLB assets for a 90-second social CGI reel that reached{' '}
                <strong className="text-white font-bold">4.2 million views</strong>, and adapted the same assets into an iPad trade show kiosk for a Geneva launch event. Estimated production cost avoided from a single model library: <strong className="text-white font-bold">about $60,000</strong>.
              </Delivers>
            </div>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="04" />
                  <Pill>Maintenance &amp; Hosting Reality</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    What a Production WebGL Configurator Actually Costs to Run
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    The strongest SaaS argument is the hidden cost of maintenance: who manages infrastructure and browser updates when your agency moves on? Fair questions with honest answers. A production configurator is a static web app that loads 3D assets from a CDN, so server-side requirements are minimal.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Browser compatibility">Updates triggered by major Chrome and Safari releases, about twice a year.</Check>
                    <Check title="Dependency security patches">Largely automated through tools like Dependabot.</Check>
                    <Check title="Feature additions">As the product catalogue evolves.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="Architecture dictates infrastructure cost, mobile speed and maintenance"
                  alt="Browser-native WebGL vs cloud streaming 3D configurator architecture comparison"
                />
              </div>

              <DataTable
                icon={FiDollarSign}
                title="Real-World Hosting Costs"
                cols={[
                  { key: 'item', label: 'Infrastructure Component', span: 5 },
                  { key: 'cost', label: 'Monthly Cost', span: 3, strong: true },
                  { key: 'note', label: 'Notes', span: 4 },
                ]}
                rows={hostingRows}
              />

              <div className="mt-8 max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">The maintenance retainer, priced honestly</h4>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  At the top of the range, $110 a month in infrastructure compares to a minimum $1,500 SaaS base fee — a difference of $1,390 a month, or <strong>$16,680 a year</strong>. Elipse Studio clients typically budget a 12–18 hour quarterly retainer covering browser updates, patches and feature work. At $120 per hour that is $1,440–$2,160 a quarter, or <strong>$5,760–$8,640 a year</strong>. Some clients handle dependency updates in-house and bring in developers only for feature work.
                </p>
              </div>
              <Delivers label="The Key Difference">
                Maintenance is a known, bounded and optional cost that you control. SaaS base fees are mandatory, non-negotiable and subject to escalation clauses you cannot opt out of. Insist on a developer handoff package from any agency: architecture diagram, component inventory, API integration specs and a maintenance runbook. Elipse Studio delivers this as standard.
              </Delivers>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="05" />
                <Pill>CTO Procurement Checklist</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Five Contract Clauses That Decide Your Position in Year Three
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Whether you evaluate SaaS or commission a custom build, review every vendor agreement against this list before signing.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Procurement Clause Comparison"
                cols={[
                  { key: 'n', label: 'Clause / Requirement', span: 4 },
                  { key: 'saas', label: 'SaaS Contract', span: 4 },
                  { key: 'custom', label: 'Custom Build Contract', span: 4, strong: true },
                ]}
                rows={clauseRows}
              />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">1 · IP assignment</span>
                  <p className="text-zinc-600 leading-relaxed">Require an explicit clause transferring all IP to you on final payment. Generic &ldquo;work-for-hire&rdquo; wording is not enough in every jurisdiction — name source code, design assets, documentation and proprietary algorithms.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">2 · Source-format 3D assets</span>
                  <p className="text-zinc-600 leading-relaxed">Models, materials, rigs and animation data must arrive in source format — GLB or glTF for web, FBX and optionally USD for pipelines — not a baked or proprietary derivative. Disqualify any agency that will not deliver it.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">3 · Overage cap</span>
                  <p className="text-zinc-600 leading-relaxed">With SaaS, demand a hard contractual cap on overages per billing period. Uncapped overage billing can multiply spend in a traffic spike, and a vendor that refuses a cap is a risk signal. Irrelevant for custom builds by design.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">4 · Data portability</span>
                  <p className="text-zinc-600 leading-relaxed">SaaS export windows are often 30–90 days. Demand at least 180 days and export of all configuration data in a machine-readable format (JSON or CSV). With a custom build you hold every file from day one.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm md:col-span-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">5 · Price escalation</span>
                  <p className="text-zinc-600 leading-relaxed">Most multi-year SaaS agreements escalate at &ldquo;CPI + 5%&rdquo; or a flat 8–12% a year. A $2,000/month contract at 10% becomes $2,420/month in year 3. Model your 36-month total at the escalated rate, not the initial quote. A custom engagement fee is fixed at signing.</p>
                </div>
              </div>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Decision Framework</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Custom Build vs SaaS Platform: Which Fits Your Situation?
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Use this matrix before entering procurement discussions.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Decision Matrix"
                cols={[
                  { key: 'dim', label: 'Evaluation Dimension', span: 4 },
                  { key: 'custom', label: 'Choose Custom Build', span: 4, strong: true },
                  { key: 'saas', label: 'Consider SaaS Platform', span: 4 },
                ]}
                rows={decisionRows}
              />
            </article>

            {/* ENTRY 07: FAQ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  FAQ — 3D Configurator IP Ownership &amp; SaaS Licensing
                </h3>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-6">
                Related reading:{' '}
                <Link href="/blog/custom-3d-configurator-vs-saas-platform-enterprise-2026" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">why enterprise brands outgrow turnkey SaaS configurators</Link>,{' '}
                <Link href="/blog/golf-cart-3d-configurator-lsv" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">a production golf cart configurator case study</Link>{' '}
                or our{' '}
                <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">3D product configurator services</Link>.
              </p>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Get Your Custom 3D Configurator TCO Model
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Own the Configurator. Stop Renting It.
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Elipse Studio builds custom WebGL and Unreal Engine configurators with full IP assignment, unlimited views and production-ready 3D assets. Contact us for a scoped TCO analysis matched to your traffic volume and product catalogue.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Schedule a TCO Review</span>
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
                Custom WebGL and Unreal Engine 3D configurators with full IP ownership for automotive, luxury and B2B industrial brands worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ConfiguratorIpOwnershipTcoArticle;
