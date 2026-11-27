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
import _imgOne from '../../assets/About-page/yacht (1).webp';
import _imgTwo from '../../assets/About-page/yacht (2).webp';
import _imgThree from '../../assets/About-page/yacht (3).webp';

const heroImg = getImgSrc(_heroImg);
const imgOne = getImgSrc(_imgOne);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);

const YACHT_CONFIGURATOR_URL = 'https://elipsestudio.com/Yacht_Configurator/';
const CALENDLY_URL ='https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

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


const comparisonRows = [
  { criterion: 'Delivery model', webgl: 'Browser-native, client-side render', ue5: 'Cloud GPU streams video to the browser' },
  { criterion: 'Hull shader quality', webgl: 'PBR metallic/roughness, flake via custom shader', ue5: 'Ray-traced reflections, subsurface scatter' },
  { criterion: 'Teak deck rendering', webgl: 'Tileable PBR texture, parallax mapping', ue5: 'Nanite geometry, millimetre plank seams' },
  { criterion: 'Cabin walkthrough', webgl: 'Camera preset switching', ue5: 'Full first-person walkthrough, Lumen GI' },
  { criterion: 'Time to first interaction', webgl: '< 3 seconds on 10 Mbps mobile', ue5: '10–25 seconds cold start' },
  { criterion: 'Concurrent user cost', webgl: 'Near zero (CDN static files)', ue5: '$0.08–$0.35 per user/hour' },
  { criterion: 'Best marine use case', webgl: 'Hull/trim spec, trailer boats, lead capture', ue5: 'Superyacht presale, cabin walkthrough, trade show' },
];

const payloadRows = [
  { field: 'Hull colour', maps: 'Manufacturer gelcoat code', example: 'BC-2347 — Deep Ocean Blue Metallic' },
  { field: 'Canvas / bimini', maps: 'Fabric supplier code', example: 'SUN-4607 — Pacific Blue' },
  { field: 'Upholstery', maps: 'Vinyl or fabric SKU + colourway', example: 'Option ID to SKU suffix' },
  { field: 'Electronics package', maps: 'Bundle ID to ERP part numbers', example: 'Chartplotter, VHF, sounder' },
  { field: 'Configuration image', maps: 'Canvas screenshot, 1920×1080', example: 'Attached to the CRM lead' },
];

const rolloutRows = [
  { phase: 'Phase 0–1', when: 'Weeks 1–3', deliver: 'Discovery, option matrix review, asset audit, retopology and UVs, hull gelcoat and metallic-flake shaders', sign: 'Option matrix, colour accuracy' },
  { phase: 'Phase 2–3', when: 'Weeks 3–5', deliver: 'Hull, canvas, upholstery and electronics switching, camera presets, HubSpot integration, PDF build sheet, saved-config short codes', sign: 'Prototype and CRM UAT' },
  { phase: 'Phase 4–5', when: 'Weeks 5–7', deliver: 'Branded UI, mobile layout, cross-browser QA, GA4 events, client UAT, dealer training materials', sign: 'Design and UAT acceptance' },
  { phase: 'Phase 6', when: 'Week 8', deliver: 'Production deployment, CDN, source code and 3D asset handoff, go-live support', sign: 'Go-live approval' },
];

const BoatYachtMarineConfiguratorArticle = () => {
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
    'BOAT & YACHT 3D CONFIGURATORS',
    '✦',
    'HULL GELCOAT SHADERS',
    '✦',
    'CABIN LAYOUTS',
    '✦',
    'DEALER QUOTING & CRM',
    '✦',
    'WEBGL VS UNREAL ENGINE 5',
    '✦',
    '6–10 WEEK ROLLOUT',
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
              <span className="text-[#4169E1]">Interactive 3D Boat, Yacht &amp; Marine Configurators:</span>{' '}
              Hull Finishes, Cabin Layouts &amp; Dealer Quoting
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Marine Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Pursuit 288 centre console boat 3D configurator landing screen with a View Configurator button"
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
              <a
                data-track-id="article-yacht-configurator-hero"
                href={YACHT_CONFIGURATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                Try the Live Configurator ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
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
                Executive Briefing · For Marine OEMs, Custom Builders &amp; Dealerships
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Six to Eighteen Months of Research, Run on Brochures
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                On a $120,000 bowrider or a $1.8 million motor yacht, the buyer works from printed brochures, PDF spec sheets and imagination for most of the cycle.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide compares PlayCanvas WebGL and Unreal Engine 5 Pixel Streaming for marine visualisation — metallic-flake hulls, teak decks, UV-resistant fabrics and the handoff from a saved configuration to a dealer build sheet.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="78%" l="Research Online First" s="Marine buyers before visiting a dealer (NMMA, 2025)" />
                <Stat v="3.1x" l="Longer on Site" s="3D vs static imagery, dealer pilots 2025" />
                <Stat v="44%" l="Fewer Spec Errors" s="On dealer orders after a configurator" />
                <Stat v="29%" l="More Package Attach" s="Electronics and upholstery upsell" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Marine 3D Configurator Architecture</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="01" />
                  <Pill>Why Marine Buyers Expect 3D</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Win the Buyer Before the Boat Show
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Above $80,000, hull colour, upholstery and electronics are primary decision criteria. One mid-range powerboat has 144 exterior combinations — impractical to photograph, easy to render in real time.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="United States">11M+ registered vessels; centre consoles and independent custom builders are the strongest growth segment.</Check>
                    <Check title="United Kingdom">Bespoke narrowboats (£50K–£150K) and superyacht presales walked in UE5 before steel is cut.</Check>
                    <Check title="Australia">Aluminium trailer boats, often specced on a smartphone at 11pm and emailed to a dealer.</Check>
                  </div>
                </div>
                <Frame
                  src={imgOne}
                  cap="Hull and stripe colours switched live, with a Get Quote button built in"
                  alt="Centre console boat 3D configurator with sea-green hull and stripe colour options"
                />
              </div>
              <Delivers label="Dealer Insight">
                A US mid-Atlantic dealer group with a WebGL hull configurator on its flagship 32-foot walkaround reported a <strong className="text-white font-bold">44% reduction in post-order specification changes</strong> within two seasons.
              </Delivers>
            </article>

            {/* ENTRY 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="02" />
                <Pill>PlayCanvas WebGL vs UE5 Pixel Streaming</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Two Architectures, Two Marine Contexts
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The right architecture depends on where marine fidelity demands meet the deployment.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="WebGL for volume">Loads in under 3 seconds on 4G, no download; hull swaps respond in under 100 ms via a Basis Universal atlas.</Check>
                  <Check title="UE5 for luxury">A ray-traced, Lumen-lit 50-metre yacht cabin cannot be matched by a browser renderer today.</Check>
                  <Check title="Boat show cost">20 simultaneous UE5 sessions cost $10–$15/hour — $320–$480 for a 4-day show.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={imgTwo}
                  cap="Hull colour library — dozens of gelcoat options on one centre console"
                  alt="Red centre console boat in a 3D configurator with a scrolling hull colour swatch bar"
                />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Decision Criteria</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Hulls, Decks and Cabins Side by Side
                </h3>
              </div>
              <DataTable
                icon={FiLayers}
                title="WebGL vs Pixel Streaming for Marine"
                cols={[
                  { key: 'criterion', label: 'Criterion', span: 3 },
                  { key: 'webgl', label: 'PlayCanvas WebGL', span: 4, strong: true },
                  { key: 'ue5', label: 'UE5 Pixel Streaming', span: 5 },
                ]}
                rows={comparisonRows}
              />
              <Delivers label="Recommended Hybrid Model">
                Run <strong className="text-white font-bold">PlayCanvas WebGL for all consumer traffic</strong> and a parallel UE5 Pixel Streaming build for trade shows, dealer principals and presales. Both share one 3D asset library and material set, so the second channel costs far less than a separate system.
              </Delivers>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div>
                  <EntryNumber n="04" />
                  <Pill>Gelcoat, Teak &amp; Marine Upholstery</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Materials Buyers Recognise on Sight
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Owners know gelcoat, teak and canvas by touch. An unconvincing render undermines confidence.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Gelcoat">Base colour, a tileable sparkle map for metallic flake and a clear-coat layer — no extra geometry, so it stays mobile-friendly.</Check>
                    <Check title="Teak">4K photogrammetry albedo in new and weathered states, with a separate matte caulking layer.</Check>
                    <Check title="Upholstery">Canvas and vinyl at physically accurate roughness, calibrated to supplied swatches.</Check>
                  </div>
                </div>
                <Frame
                  src={imgThree}
                  cap="Teak deck with black or white caulking, selectable in the floor materials panel"
                  alt="Top-down view of a centre console boat configurator with teak deck and floor material options"
                />
              </div>
              <Delivers label="Colour Accuracy Note">
                Dealers match swatches against physical samples. Supply official <strong className="text-white font-bold">RAL or Pantone references</strong> alongside samples, and plan two colour review rounds for metallic-flake hulls.
              </Delivers>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="05" />
                <Pill>Dealer Quoting &amp; CRM Integration</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  From Saved Configuration to Build Sheet
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The commercial value of a configurator is the structured specification it produces. Every selection is serialised as a JSON payload mapped to the OEM&apos;s option and part codes.
                </p>
              </div>
              <DataTable
                icon={FiDollarSign}
                title="Configuration payload to CRM"
                cols={[
                  { key: 'field', label: 'Selection', span: 3 },
                  { key: 'maps', label: 'Maps To', span: 5, strong: true },
                  { key: 'example', label: 'Example', span: 4 },
                ]}
                rows={payloadRows}
              />
              <div className="space-y-2.5 text-xs sm:text-sm max-w-3xl mt-6">
                <Check title="HubSpot">The Forms API creates a deal with the full spec, image and plain-text summary; a workflow assigns the nearest dealer by postcode and creates a follow-up task within four business hours.</Check>
                <Check title="Build sheet PDF">Generated server-side in the OEM&apos;s own order format — buyer and spec, line-item pricing, terms and signature block.</Check>
                <Check title="Return visits">A 6-character short code restores a saved configuration on any device, with no account needed.</Check>
              </div>
              <Delivers label="The Result">
                Dealers report build sheets cut enquiry-to-signed-order time by <strong className="text-white font-bold">1.8 to 2.4 weeks</strong>, because the buyer arrives with a specification they have already approved.
              </Delivers>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Phased Rollout Blueprint</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Flagship Hull to Full Fleet in 6–10 Weeks
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Arrive with STEP / OBJ / GLB hull files, a complete option matrix with manufacturer codes, physical swatches, CRM credentials and any US / UK / AU market splits, and a single flagship hull goes live in about six weeks.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Phased rollout"
                cols={[
                  { key: 'phase', label: 'Phase', span: 2 },
                  { key: 'when', label: 'Timeline', span: 2 },
                  { key: 'deliver', label: 'Deliverables', span: 5, strong: true },
                  { key: 'sign', label: 'Sign-Off', span: 3 },
                ]}
                rows={rolloutRows}
              />
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                <strong>Fleet expansion:</strong> a similar hull takes 2–3 weeks, a new model category 3–4 weeks and a new regional variant 1–2 weeks. <strong>Marine risks:</strong> raw engineering CAD (Rhino Marine, Maxsurf) needs 20–40 hours of retopology, option matrices vary by model year and region, and helm electronics need individual instrument apertures — settle all three in Phase 0.
              </p>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl">
                <EntryNumber n="07" />
                <Pill>Conclusion</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  A Configurator Is the Digital Sea Trial
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  PlayCanvas WebGL puts the boat in every buyer&apos;s pocket at no cost per session; UE5 Pixel Streaming delivers photoreal cabins where the deal value justifies it. Builders and dealers who deploy both win buyers earlier and capture data that informs production. Try our{' '}
                  <a href={YACHT_CONFIGURATOR_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">live yacht configurator</a>{' '}
                  or see our{' '}
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
              Ready to Scope a 3D Configurator for Your Hull Model or Fleet?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Share your model range, option matrix and CRM platform, and receive a fixed-price proposal and phased timeline within 5 business days.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-yacht-configurator-cta"
                href={YACHT_CONFIGURATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Try the Yacht Configurator</span>
                <FiExternalLink className="text-sm" />
              </a>
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <FiArrowRight className="text-sm" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap px-3 sm:px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Contact Us
              </Link>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto whitespace-nowrap px-3 sm:px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
                3D interactive experience agency delivering WebGL configurators, Unreal Engine 5 Pixel Streaming, AR/VR applications and architectural visualisation for clients in the US, UK, Australia and the Middle East.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BoatYachtMarineConfiguratorArticle;
