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
  FiWifiOff,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Only UE5 projects (Volvo S90, Bean Trailer) — both are Unreal Engine / pixel streaming builds.
import _heroImg from '../../assets/About-page/volvo-s90-ue5-hero.webp';
import _imgTwo from '../../assets/About-page/volvo-ui.webp';
import _imgThree from '../../assets/About-page/bean-4.webp';
import _imgFour from '../../assets/About-page/bean-5.webp';

const heroImg = getImgSrc(_heroImg);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Unreal Engine 5 3D configurator by Elipse Studio'}
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

const networkRows = [
  { need: 'Round-trip latency', target: '< 50ms', actual: '80–220ms (congested APs)', sees: 'Noticeable lag between click and response' },
  { need: 'Sustained bandwidth', target: '8–25 Mbps per stream', actual: '2–8 Mbps shared across floor', sees: 'Resolution drops to 720p or worse' },
  { need: 'Packet loss', target: '< 0.5%', actual: '1–8% during peak hours', sees: 'Blocky artefacts, frozen frames' },
  { need: 'Latency jitter', target: '< 20ms variance', actual: '30–150ms (RF interference)', sees: 'Inconsistent input, jerky motion' },
  { need: 'Bandwidth isolation', target: 'Dedicated per stream', actual: 'Shared with 400+ exhibitors', sees: 'Quality degrades as the floor fills up' },
];

const buildRows = [
  { param: 'Min GPU for 4K 60fps', win: 'NVIDIA RTX 3080 / AMD RX 6800 XT', mac: 'Apple M2 Pro / M3', note: 'With Lumen + Nanite enabled' },
  { param: 'Typical build size', win: '8–25 GB', mac: '10–28 GB', note: 'Varies with asset density' },
  { param: 'Lumen GI', win: 'Full hardware ray tracing', mac: 'Software Lumen only (Metal 3)', note: 'No Metal RT acceleration in UE5' },
  { param: 'Nanite', win: 'Full support', mac: 'Full support', note: 'UE 5.2+ on both platforms' },
  { param: 'VR headset support', win: 'Meta Quest 3 (Link/AirLink), Vive', mac: 'Vision Pro (limited)', note: 'Windows = broader VR ecosystem' },
  { param: 'Distribution', win: 'USB / LAN share / MDM', mac: 'DMG / Apple notarization', note: 'Notarization adds 1–3 days' },
  { param: 'Cold boot to interactive', win: '15–45 seconds (NVMe)', mac: '12–40 seconds', note: 'NVMe SSD strongly recommended' },
];

const cloudCostRows = [
  { gpu: 'NVIDIA T4 (16GB)', provider: 'AWS g4dn.xlarge', rate: '$0.526/hr', month: '~$126/month', out: '1080p 30fps (Lumen SW)' },
  { gpu: 'NVIDIA A10G (24GB)', provider: 'AWS g5.xlarge', rate: '$1.006/hr', month: '~$241/month', out: '1440p 60fps (Lumen HW)' },
  { gpu: 'NVIDIA A100 (40GB)', provider: 'AWS p4d (1 GPU)', rate: '~$3.20/hr', month: '~$768/month', out: '4K 60fps (full Lumen RT)' },
  { gpu: 'NVIDIA L4 (24GB)', provider: 'GCP g2-standard-4', rate: '$0.70/hr', month: '~$168/month', out: '1440p 60fps' },
  { gpu: 'RTX 4090 equiv.', provider: 'Lambda Cloud', rate: '$1.99/hr', month: '~$477/month', out: '4K 60fps' },
];

const hardwareRows = [
  { cfg: 'Mid-tier workstation', gpu: 'RTX 4070 Ti', cost: '$2,200–$2,800', out: '1440p 60fps', best: 'Single-screen booth demos' },
  { cfg: 'High-tier workstation', gpu: 'RTX 4090', cost: '$3,800–$4,800', out: '4K 60fps (full Lumen HW)', best: 'Large displays, dual-screen' },
  { cfg: 'VR workstation', gpu: 'RTX 4080 + Quest 3', cost: '$3,200–$4,200', out: 'VR at 90fps per eye', best: 'Immersive booth experiences' },
  { cfg: 'Sales laptop', gpu: 'RTX 4070 Mobile', cost: '$2,000–$2,600', out: '1440p 60fps', best: 'Field sales, travel-friendly' },
  { cfg: 'Compact trade show PC', gpu: 'RTX 4080 (mini ITX)', cost: '$2,800–$3,600', out: '4K 60fps', best: 'Shipping-friendly form factor' },
];

const targetRows = [
  { target: 'Windows .exe', build: 'Shipping build (x64)', deploy: 'Trade show workstation', net: 'None required', use: 'Booth demos, air-gapped facilities' },
  { target: 'macOS .app', build: 'Shipping build (Universal)', deploy: 'Sales laptop (Apple Silicon)', net: 'None required', use: 'Field sales, Apple-primary orgs' },
  { target: 'Pixel Streaming', build: 'Server build + cloud GPU', deploy: 'AWS / GCP / Azure', net: 'Required (WebRTC)', use: 'Remote demos, mobile, global launch' },
  { target: 'Meta Quest 3 (optional)', build: 'Android shipping build', deploy: 'Standalone VR headset', net: 'None required', use: 'Immersive VR booth, training' },
];

const matrixRows = [
  { scenario: 'International trade show, shared Wi-Fi', model: 'Standalone .exe', reason: 'Network unreliable; quality non-negotiable', precedent: 'Standard for all booth deployments' },
  { scenario: 'Air-gapped defense / SCIF facility', model: 'Standalone .exe only', reason: 'Internet access prohibited by policy', precedent: 'French Bee (network-restricted sites)' },
  { scenario: 'Aviation / aerospace training', model: 'Standalone (VR or desktop)', reason: 'Deterministic input latency', precedent: 'French Bee A350 cabin crew training' },
  { scenario: 'Global product launch, remote access', model: 'Cloud pixel streaming', reason: 'Geographic reach; no hardware logistics', precedent: 'Volvo S90 multi-market deployment' },
  { scenario: 'E-commerce configurator on product page', model: 'Cloud pixel streaming', reason: 'Zero-install; conversion funnel', precedent: 'Bean Trailer configurator' },
  { scenario: 'Automotive dealer network (400+ sites)', model: 'Cloud pixel streaming', reason: 'Central update; no per-site hardware', precedent: 'Configurator-as-a-service model' },
  { scenario: 'Field sales, client facility demos', model: 'Standalone (sales laptop)', reason: 'No dependency on client network', precedent: 'Standard field sales build' },
  { scenario: 'Luxury showroom, permanent install', model: 'Standalone (kiosk)', reason: 'Consistent quality; break-even < 18 months', precedent: 'Recommended for all permanent installs' },
  { scenario: 'Post-event enterprise follow-up', model: 'Cloud pixel streaming', reason: 'No second hardware deployment', precedent: 'Standard post-event workflow' },
  { scenario: 'Multi-platform launch (all scenarios)', model: 'Hybrid (one codebase)', reason: 'Maximum reach; single asset pipeline', precedent: 'Elipse Studio hybrid deployment model' },
];

const faqs = [
  {
    q: 'Can we start with a standalone build and add pixel streaming later?',
    a: 'Yes — with one important caveat. If the standalone build was developed with an input abstraction layer, adding pixel streaming is primarily a server-side infrastructure task, not a codebase rewrite. If input handling was built for native UE5 only, retrofitting the WebSocket input layer requires Blueprint or C++ work — usually 2 to 5 days depending on complexity. If there is any chance you will want multi-target deployment later, build the input abstraction from day one.',
  },
  {
    q: 'What is the minimum connection quality for a reliable pixel streaming demo?',
    a: 'For 1080p at 30fps: 8 Mbps sustained, under 80ms round-trip and under 1% packet loss. For 4K at 60fps: 20 Mbps sustained, under 50ms and under 0.3% packet loss. These numbers need to hold for the whole session, not just on average — spikes above 150ms or packet loss above 2% produce visible artefacts. Verify the connection with a WebRTC diagnostic tool before any enterprise client demo.',
  },
  {
    q: 'How large are standalone UE5 builds and how do we get them to the trade show?',
    a: 'A typical UE5 standalone build for a product configurator with high-resolution textures runs between 8GB and 25GB. For trade shows, ship a pre-configured NVMe SSD with the workstation: installation takes under 5 minutes and cold boot to interactive is 15 to 45 seconds. For multi-workstation deployments at one venue, a local LAN file server works. Cloud download of files this size is unreliable, even on a good event network.',
  },
  {
    q: 'Does UE5 pixel streaming support multiple people watching the same session?',
    a: 'Standard pixel streaming is single-user per GPU instance. Multi-viewer sessions, where additional participants watch the same stream while one person has interactive control, are supported through the Pixel Streaming Infrastructure multi-viewer mode. This is the standard pattern for enterprise procurement reviews: stakeholders join to watch while the account executive drives, and control can be handed to any participant.',
  },
  {
    q: 'What GPU do we need in a trade show workstation for 4K UE5 at 60fps?',
    a: 'The practical minimum is an NVIDIA RTX 4080. The RTX 4090 gives 25 to 40% headroom above the target framerate, which matters when the system runs 8 to 10 hours continuously under varying thermal conditions. AMD\'s RX 7900 XTX is comparable on Nanite; Lumen hardware ray tracing is better optimised for NVIDIA on UE5.2 and later. On Apple Silicon (M3 Max or M4 Pro) expect solid 1440p with software Lumen, at reduced quality compared with the RTX hardware path.',
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

const UE5PixelStreamingVsStandaloneArticle = () => {
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
    'PIXEL STREAMING VS STANDALONE',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    'TRADE SHOW 3D CONFIGURATOR',
    '✦',
    'OFFLINE .EXE · MAC .APP',
    '✦',
    'WEBRTC CLOUD GPU',
    '✦',
    'ONE CODEBASE · 3 TARGETS',
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
              <span className="text-[#4169E1]">Pixel Streaming vs Standalone Builds:</span>{' '}
              Which UE5 Delivery Model Wins?
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · Enterprise Deployment Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Unreal Engine 5 Volvo S90 3D configurator running with Lumen and Nanite"
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
                Executive Briefing · One Architecture Decision, Made Early
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                The Demo That Looked Flawless in the Studio and Stuttered on the Show Floor
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                Six months of Lumen lighting, Nanite geometry and real-time reflections — then a pixel streaming server 180ms from the convention centre, shared venue Wi-Fi across 12,000 attendees, and a 4K stream that drops to 720p by mid-afternoon on day two.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                This guide treats cloud streaming versus standalone <strong>.exe / .app</strong> builds as a practical decision, not a quality debate. Both run the <strong>same Unreal Engine 5 pipeline</strong> — same shaders, same Lumen, same Nanite. The only variable is where the GPU lives: in the cloud or in the room.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <Stat v="< 10ms" l="Standalone Input Latency" s="vs 80–220ms on congested venue Wi-Fi" />
                <Stat v="~18 mo" l="Cloud vs Hardware Break-Even" s="Single-instance trade show & field sales use" />
                <Stat v="3 targets" l="From One UE5 Codebase" s="Windows .exe · macOS .app · Pixel Streaming" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Unreal Engine 5 Deployment Models</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="01" />
                <Pill>The Trade Show Wi-Fi Trap</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Why Venue Networks Break Pixel Streaming
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  No workstation to ship, no customs paperwork, no on-site tech staff — running the booth from a laptop sounds smart. The problem is not the streaming technology; it is the network it has to run on. WebRTC needs low round-trip latency, stable sustained bandwidth and low packet loss. Trade show networks routinely fail all three at the same time.
                </p>
              </div>

              <DataTable
                icon={FiWifiOff}
                title="What Streaming Needs vs What You Get"
                cols={[
                  { key: 'need', label: 'What Streaming Needs', span: 3 },
                  { key: 'target', label: 'Target', span: 2 },
                  { key: 'actual', label: 'What You Actually Get', span: 3, strong: true },
                  { key: 'sees', label: 'What the User Sees', span: 4 },
                ]}
                rows={networkRows}
              />

              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                A dedicated wired circuit ($800–$3,500 per event day) helps, but island stands may not get fibre. And a qualified prospect costs $800–$4,500 to reach your booth — a stuttering stream sends them to the next one.
              </p>

              <Delivers label="The Engineering Answer">
                Remove the network from the equation entirely. That is what <strong className="text-white font-bold">standalone builds</strong> are for — and why we default to them for every booth deployment.
              </Delivers>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="02" />
                  <Pill>Standalone Executables</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    When Offline Builds Are the Right Call
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    A standalone UE5 build is a self-contained executable that runs the full rendering pipeline locally. No server, no stream, no network path. The GPU in the room renders the frames and input latency is single-digit milliseconds. For many enterprise use cases it is the only option that works.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Trade show booth demos">Island stands without reliable wired internet. Runs from a local NVMe SSD; network status is irrelevant.</Check>
                    <Check title="Air-gapped defense & government">SCIFs prohibit internet on active workstations. Cloud streaming is not a poor choice here — it is a policy violation.</Check>
                    <Check title="Aviation & aerospace training">Cabin-crew and systems-procedure training depends on deterministic input latency. A 180ms cloud round-trip is incompatible with muscle-memory training.</Check>
                    <Check title="Field sales & permanent kiosks">A sales laptop removes dependence on the client&apos;s Wi-Fi; a showroom kiosk looks identical on Monday morning and Saturday afternoon.</Check>
                  </div>
                </div>
                <Frame
                  src={imgTwo}
                  cap="Volvo S90 UE5 configurator — the same project runs as a local executable or a cloud stream"
                  alt="Unreal Engine 5 Volvo S90 configurator interface with exterior, interior and rims controls"
                />
              </div>

              <Delivers label="French Bee A350 Cabin Crew Training">
                Streaming was ruled out at architecture phase: input latency didn&apos;t suit spatial tasks and some sites had restricted networks. A standalone Windows .exe on RTX workstations ran full Lumen and Nanite, and scores <strong className="text-white font-bold">exceeded the KPIs</strong> set for the deployment.
              </Delivers>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Windows &amp; macOS Builds</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Building for Windows .exe and macOS .app: What to Know
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  UE5 packages standalone builds for Windows (x64), macOS (Intel and Apple Silicon) and Linux from the same project. Meshes, textures, Blueprints and audio are cooked into .pak archives the executable reads from local storage.
                </p>
              </div>
              <DataTable
                icon={FiLayers}
                title="Windows vs macOS Standalone"
                cols={[
                  { key: 'param', label: 'Build Parameter', span: 3 },
                  { key: 'win', label: 'Windows .exe', span: 3, strong: true },
                  { key: 'mac', label: 'macOS (.app)', span: 3 },
                  { key: 'note', label: 'Notes', span: 3 },
                ]}
                rows={buildRows}
              />
            </article>

            {/* ENTRY 04 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-2">
                <EntryNumber n="04" />
                <Pill>Cloud Pixel Streaming</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  When Streaming Wins: Reach Without Distribution
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Streaming gets a bad reputation at trade shows because it is used in the wrong context. For what it is suited to, it does something standalone cannot: it puts the experience in front of people who are not in the room. Any modern browser becomes a client for a full-fidelity UE5 experience — no install, no IT approval, no build download.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <Check title="Global remote sales demos">Send a URL; the prospect is interacting with a cloud-GPU configurator within 3 seconds, nothing installed.</Check>
                  <Check title="Multi-region launches">Scale horizontally in hours instead of 40 separate hardware deployments over weeks.</Check>
                  <Check title="Mobile & tablet access">An iPhone or iPad has no local GPU for UE5 — streaming delivers photoreal output to the browser.</Check>
                  <Check title="Post-event follow-up">Same experience via a URL 48 hours after the booth. No second hardware deployment.</Check>
                  <Check title="Dealer networks">400 dealerships on standard business internet, one central update when the lineup changes.</Check>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={imgThree}
                  cap="Bean Trailer UE5 configurator — pixel streamed to any browser, no download, no install"
                  alt="Bean Trailer off-road trailer Unreal Engine 5 configurator streamed to the browser"
                />
              </div>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="05" />
                  <Pill>Bean Trailer &amp; Volvo S90</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Zero-Install Conversion and Multi-Market Launches
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    Streaming and standalone are not competing quality tiers. They are competing distribution architectures: same UE5 project, same shaders, same Lumen, same Nanite. Only the GPU location changes.
                  </p>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Bean Trailer">A premium off-road trailer sold across North America. A multi-gigabyte download would have killed the e-commerce funnel; streaming let buyers enter the configurator within 3 seconds, on any device, then escalate to a guided demo on the same infrastructure.</Check>
                    <Check title="Volvo S90">Sales teams in multiple regions needed one centrally hosted environment during a launch window. Standalone rollout would have taken weeks; streaming was live across all regions within hours of provisioning.</Check>
                  </div>
                </div>
                <Frame
                  src={imgFour}
                  cap="Bean Trailer configurator — layout, finish and equipment options running on a cloud GPU"
                  alt="Bean Trailer configurator interface with layout and equipment options"
                />
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">What production pixel streaming actually requires</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">1 · GPU instance</span>
                  <p className="text-zinc-600 leading-relaxed">Runs the UE5 executable and encodes the stream. For 4K 60fps, an NVIDIA A10G or better — and one GPU instance per concurrent user.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">2 · Signalling server</span>
                  <p className="text-zinc-600 leading-relaxed">The WebSocket broker for the WebRTC handshake. We run a customised build of Epic&apos;s Node.js server with session management, authentication and load balancing.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">3 · TURN server</span>
                  <p className="text-zinc-600 leading-relaxed">Skipped constantly in proofs-of-concept, and breaks enterprise demos. When firewalls block direct UDP, WebRTC needs a relay. Not optional for client-facing production.</p>
                </div>
              </div>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Cost &amp; Hardware Trade-Offs</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Operational Spend vs Capital Spend: The 2026 Numbers
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Cloud streaming costs are operational — GPU compute by the minute, bandwidth egress, infrastructure management. Standalone builds are capital — hardware purchase, with operational cost concentrated in logistics and support.
                </p>
              </div>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">Cloud GPU costs for UE5 pixel streaming</h4>
              <DataTable
                icon={FiDollarSign}
                title="Cloud GPU Costs"
                cols={[
                  { key: 'gpu', label: 'GPU Instance', span: 3 },
                  { key: 'provider', label: 'Provider', span: 3 },
                  { key: 'rate', label: 'On-Demand', span: 2, strong: true },
                  { key: 'month', label: '30-Day (8hr/day)', span: 2 },
                  { key: 'out', label: 'UE5 Output', span: 2 },
                ]}
                rows={cloudCostRows}
              />

              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-5 max-w-3xl">
                Costs multiply: one GPU per concurrent session, 6x for US/EU/APAC with two instances each, and about $97 of egress for a 10-user, 4-hour event.
              </p>

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mt-10 mb-3">Standalone hardware costs</h4>
              <DataTable
                icon={FiDollarSign}
                title="Standalone Hardware Costs"
                cols={[
                  { key: 'cfg', label: 'Config', span: 3 },
                  { key: 'gpu', label: 'GPU', span: 2 },
                  { key: 'cost', label: 'Approx. Cost (2026)', span: 2, strong: true },
                  { key: 'out', label: 'UE5 Output', span: 2 },
                  { key: 'best', label: 'Best For', span: 3 },
                ]}
                rows={hardwareRows}
              />

              <div className="mt-8 max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mb-3">How the break-even works in practice</h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <Check title="Single stream, 8 hours a day">An AWS A10G runs about $2,900 a year. A $3,500 RTX 4080 workstation breaks even at roughly 14.5 months on pure compute cost.</Check>
                  <Check title="Trade show intensive (20 event days)">About $400 per event for 2 concurrent users at 10 hours — $8,000 a year versus a one-time $7,000 hardware investment. Hardware wins within the first year.</Check>
                  <Check title="Global always-on">50 concurrent users across 3 regions costs roughly $1,800 per day. Cloud wins decisively; hardware at that scale is a logistics nightmare.</Check>
                </div>
              </div>

              <Delivers label="The Practical Rule">
                Break-even sits around <strong className="text-white font-bold">18 months</strong> for single-instance trade show and field sales use. Under 18 months, cloud streaming costs less; beyond it, owned hardware costs less. For anything permanent — showrooms, training facilities — hardware almost always wins on total cost.
              </Delivers>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <Pill>The Hybrid Blueprint</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  One Codebase, Every Deployment Context
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  In most enterprise scenarios the best answer is not choosing between the two — it is building both from one codebase. A single UE5 project compiles to a Windows .exe, a macOS .app and a cloud pixel streaming build, with one asset pipeline to maintain.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="One Codebase, Three Targets"
                cols={[
                  { key: 'target', label: 'Target', span: 2, strong: true },
                  { key: 'build', label: 'Build Type', span: 3 },
                  { key: 'deploy', label: 'Deployment', span: 2 },
                  { key: 'net', label: 'Network', span: 2 },
                  { key: 'use', label: 'Primary Use', span: 3 },
                ]}
                rows={targetRows}
              />

              <h4 className="font-serif font-bold text-lg sm:text-xl text-zinc-900 mt-10 mb-3">What to get right for multi-target builds</h4>
              <div className="space-y-2.5 text-xs sm:text-sm max-w-3xl">
                <Check title="Input abstraction">One input layer with runtime platform detection — build it from day one.</Check>
                <Check title="Resolution scalability">The streaming encoder adapts to bandwidth; standalone uses fixed targets.</Check>
                <Check title="Device profiles">One executable targets different quality tiers by detected GPU.</Check>
                <Check title="UI overlays">Browser HTML/JS for streaming, native UMG for standalone — from one interaction spec.</Check>
              </div>
            </article>

            {/* ENTRY 08 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="08" />
                <Pill>Trade Show to Remote Follow-Up</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  The Full Workflow, From T-30 Days to Ongoing Sales
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">T-30 days · Pre-event</span>
                  <p className="text-zinc-600 leading-relaxed">Standalone .exe built and tested on the show workstation. Streaming server provisioned and load-tested in the target AWS/GCP region. Sales laptop builds distributed via MDM or USB.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">Show day</span>
                  <p className="text-zinc-600 leading-relaxed">Boots to the standalone build with no internet dependency — 15–45 seconds cold start, 4K at 60fps. Configuration choices and dwell time per option are logged locally to JSON.</p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white text-xs sm:text-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] block mb-1.5">T+2 days · Follow-up</span>
                  <p className="text-zinc-600 leading-relaxed">The account executive sends a pixel streaming URL. It can be session-keyed to restore the configuration the prospect built at the booth.</p>
                </div>
              </div>
            </article>

            {/* ENTRY 09 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="09" />
                <Pill>Deployment Decision Matrix</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Which Model for Which Scenario
                </h3>
              </div>
              <DataTable
                icon={FiLayers}
                title="Deployment Decision Matrix"
                cols={[
                  { key: 'scenario', label: 'Scenario', span: 3 },
                  { key: 'model', label: 'Recommended Model', span: 3, strong: true },
                  { key: 'reason', label: 'Key Reason', span: 3 },
                  { key: 'precedent', label: 'Elipse Precedent', span: 3 },
                ]}
                rows={matrixRows}
              />
            </article>

            {/* ENTRY 10: FAQ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="10" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight">
                  FAQ — Pixel Streaming vs Standalone Builds
                </h3>
              </div>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-6">
                Related reading:{' '}
                <Link href="/blog/unreal-engine-5-pixel-streaming-vs-webgl-2026" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">UE5 pixel streaming vs WebGL</Link>{' '}
                and{' '}
                <Link href="/blog/unreal-engine-5-cloud-pixel-streaming-automotive-configurators-2026" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">cloud pixel streaming for automotive configurators</Link>.
                Or see our{' '}
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
              Build the Right UE5 Deployment for Your Use Case
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Elipse Studio architects hybrid Unreal Engine 5 deployments — standalone .exe for trade shows and air-gapped facilities, cloud pixel streaming for global remote access — from a single codebase. One build cycle. Every delivery context covered.
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
                Unreal Engine 5 configurators, pixel streaming and standalone deployments for automotive, aviation, defense and enterprise sales teams worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UE5PixelStreamingVsStandaloneArticle;
