'use client';

import React, { useState, useEffect } from 'react';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiZap,
  FiCpu,
  FiMonitor,
  FiTablet,
  FiGlobe,
  FiVideo,
  FiBox,
  FiTrendingUp,
  FiSliders,
  FiServer,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Placeholder images — swap later with final article visuals
import _heroImg from '../../assets/About-page/volvo-thumbnail.webp';
import _kiaImg from '../../assets/About-page/volvo (2).png';
import _bydImg from '../../assets/About-page/volvo (3).png';
import _steeringImg from '../../assets/About-page/volvo (4).png';
import _volvoUiImg from '../../assets/About-page/volvo (5).png';
import _volvoImg from '../../assets/About-page/volvo (6).png';

const heroImg = getImgSrc(_heroImg);
const kiaImg = getImgSrc(_kiaImg);
const bydImg = getImgSrc(_bydImg);
const steeringImg = getImgSrc(_steeringImg);
const volvoUiImg = getImgSrc(_volvoUiImg);
const volvoImg = getImgSrc(_volvoImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'UE5 Pixel Streaming Automotive Configurator'}
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

const comparisonRows = [
  {
    dim: 'Render Location',
    sub: 'Where the frame is produced',
    webgl: "Buyer's own device GPU — quality capped by their laptop or phone",
    ps: 'Datacenter GPU (NVIDIA A10 / A100) — same render on every screen',
  },
  {
    dim: 'Reflections',
    sub: 'Paint & glossy surfaces',
    webgl: 'Pre-computed static environment maps that approximate reflections',
    ps: 'Hardware ray-traced reflections of studio floor, backdrop & adjacent bodywork',
  },
  {
    dim: 'Lighting',
    sub: 'Global illumination',
    webgl: "Baked textures that don't respond to real-time changes",
    ps: 'Lumen real-time global illumination with neural-inferred ray tracing',
  },
  {
    dim: 'Surface Detail',
    sub: 'Leather, carbon, knurled metal',
    webgl: 'Normal-map approximations that flatten at grazing angles',
    ps: 'Nanite tessellation generating true displacement geometry at render time',
  },
  {
    dim: 'Device Dependence',
    sub: 'Visual consistency',
    webgl: 'Degrades on integrated graphics, older MacBooks & entry-level tablets',
    ps: 'Device only decodes a WebRTC video stream — quality is device-independent',
  },
];

const UE5CloudPixelStreamingAutomotiveArticle = () => {
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
    'UNREAL ENGINE 5.5',
    '✦',
    'CLOUD PIXEL STREAMING',
    '✦',
    'AUTOMOTIVE CONFIGURATORS',
    '✦',
    'HARDWARE RAY TRACING',
    '✦',
    'NANITE TESSELLATION',
    '✦',
    'LUMEN GI',
    '✦',
    'SUB-100MS LATENCY',
    '✦',
    'SHOWROOM IPAD',
    '✦',
    'WEBRTC DELIVERY',
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
              What Is{' '}
              <span className="text-[#2563EB]">Unreal Engine 5 Cloud Pixel Streaming</span>{' '}
              for Automotive Configurators?
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · OEM & Dealership Guide · USA
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Unreal Engine 5 pixel-streamed automotive configurator"
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
                Book a 15-min technical consultation ↗
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
              Book a 15-min technical consultation <FiArrowRight />
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
                Executive Briefing · The Configurator Quality Gap
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Most Configurators Aren’t Convincing Enough to Replace the Showroom.
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                The automotive configurator has become one of the most commercially significant touchpoints in the car-buying journey. Research from McKinsey consistently shows that buyers who interact with an online configurator before visiting a dealership arrive with higher purchase intent, clearer specification preferences, and shorter time-to-close.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-4">
                The problem: most manufacturers deliver WebGL configurators with baked lighting, approximated reflections, and material rendering that falls short of photography. <strong>Unreal Engine 5 Cloud Pixel Streaming</strong> solves this — not by improving the WebGL renderer, but by moving rendering entirely off the buyer’s device onto a server-side GPU that delivers photorealistic, hardware ray-traced output to any screen.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide explains how it works, what it delivers for OEMs and dealership networks, and what production and deployment actually require for teams evaluating it in 2026.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={kiaImg}
                  alt="Photorealistic automotive configurator render"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Showroom iPad · Corporate laptop · Home browser — one server-side render, identical quality
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Technical & Commercial Analysis</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ══════ ENTRY 01: WHAT IS IT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="01" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  What Is UE5 Cloud Pixel Streaming?
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  A delivery architecture in which the Unreal Engine render runs on a remote datacenter GPU — typically an NVIDIA A10 or A100 — and rendered frames stream to the buyer’s browser as live compressed video over WebRTC.
                </p>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The device receives video and sends back input events. The server processes them, updates the scene, and streams the next frames. To the user it is a fully interactive 3D configurator; technically, their device is doing almost nothing.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Inbound Input:</strong> Mouse movements, touch gestures, button clicks, and configurator selections.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Outbound Video:</strong> Ray-traced frames encoded and streamed in real time via WebRTC.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Device-Independent:</strong> A three-year-old MacBook sees the same render as a high-end gaming PC.</span>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={bydImg}
                  cap="Server-side GPU render streamed to any browser as a live WebRTC video feed"
                  alt="Cloud pixel streaming architecture for automotive configurators"
                />
              </div>
            </article>

            {/* ══════ ENTRY 02: COMPARISON MATRIX ══════ */}
            <article className="py-10 sm:py-16 border-b border-zinc-200">
              <div className="max-w-3xl mb-8">
                <EntryNumber n="02" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-900 border border-zinc-300 mb-2">
                  Head-to-Head Comparative Matrix
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-2">
                  Standard WebGL Configurator vs UE5 Pixel Streaming
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  WebGL handles simpler products reasonably — but for automotive paint with multi-layer clearcoat, metallic flake, and view-dependent colour shift, it produces output that looks like a video game from 2018.
                </p>
              </div>

              <div className="w-full border border-zinc-300 bg-white shadow-sm mb-8">
                {/* Header bar (desktop) */}
                <div className="hidden md:grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800">
                  <div className="col-span-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <FiSliders className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Technical Dimension</span>
                  </div>
                  <div className="col-span-4 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <FiMonitor className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Standard WebGL</span>
                  </div>
                  <div className="col-span-4 text-xs font-mono font-extrabold uppercase tracking-wider text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiServer className="w-4 h-4 text-white shrink-0" />
                      <span>UE5 Pixel Streaming</span>
                    </div>
                    <span className="hidden lg:inline-block text-[9px] bg-white text-black px-2.5 py-0.5 font-extrabold uppercase tracking-widest">
                      Ray-Traced
                    </span>
                  </div>
                </div>
                {/* Header bar (mobile) */}
                <div className="md:hidden bg-black text-white px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                  <FiSliders className="w-4 h-4 shrink-0" />
                  <span>WebGL vs UE5 Pixel Streaming</span>
                </div>

                <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">
                  {comparisonRows.map((row) => (
                    <div key={row.dim} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0 p-4 sm:p-5 items-start md:items-center hover:bg-zinc-50/70 transition-colors">
                      <div className="md:col-span-4 md:pr-3">
                        <div className="font-bold text-zinc-900 text-sm">{row.dim}</div>
                        <div className="text-[11px] sm:text-xs text-zinc-500">{row.sub}</div>
                      </div>
                      <div className="md:col-span-4 md:pr-3 text-zinc-600 flex items-start gap-2">
                        <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                        <span><span className="md:hidden font-semibold text-zinc-500">WebGL: </span>{row.webgl}</span>
                      </div>
                      <div className="md:col-span-4 font-semibold text-black flex items-start gap-2">
                        <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                        <span><span className="md:hidden font-bold">UE5 PS: </span>{row.ps}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FiZap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans text-left">
                      <strong className="text-white">The Bottom Line:</strong> Render quality is constrained only by the server hardware — not the buyer’s device.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shrink-0 shadow-sm">
                    <FiTrendingUp className="w-4 h-4 text-black" />
                    <span>Photography-Grade on Any Screen</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiMonitor className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">How WebGL Works</span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">Quality Ceiling = Buyer’s Hardware</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    WebGL renders the 3D model on the user’s local device. Its ceiling is set by the laptop or phone GPU, available GPU memory, and the browser’s WebGL implementation — reflections from environment maps, lighting from baked textures, detail from normal maps.
                  </p>
                </div>
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiCpu className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">How Pixel Streaming Works</span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">The Full Unreal Engine Pipeline</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Hardware ray tracing for physically accurate reflections, Nanite tessellation for micro-surface detail on leather stitching and carbon fibre, and Lumen for real-time global illumination — streamed as video to the buyer.
                  </p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 03: WHAT UE5.5 DELIVERS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <EntryNumber n="03" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[26ch] leading-tight mb-3">
                  What Unreal Engine 5.5 Specifically Delivers for Automotive
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Three capabilities close the gap between real-time configurator output and marketing photography:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">1. Nanite Tessellation</h4>
                    <p className="text-zinc-600 leading-snug">
                      Displacement maps generate real geometry at render time — stitched leather, carbon weave, and knurled aluminium that hold up at grazing angles where normal maps read as “CGI”.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">2. Neural Rendering</h4>
                    <p className="text-zinc-600 leading-snug">
                      Shoots roughly 4–8% of the ray samples a full trace needs and infers the complete lighting result — hardware ray tracing at 60fps on a server GPU.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">3. Accurate Paint Reflections</h4>
                    <p className="text-zinc-600 leading-snug">
                      Metallic paint reflects the studio floor, backdrop, and adjacent bodywork — not the approximated environment maps that give WebGL away.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">4. Pixel Streaming 2</h4>
                    <p className="text-zinc-600 leading-snug">
                      Production-grade web delivery: adaptive bitrate, concurrent sessions, and standard iFrame embedding.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={volvoUiImg}
                  cap="Nanite tessellation: Volvo S90 body panels, wheels and brake calipers rendered as true geometry"
                  alt="Volvo S90 real-time 3D configurator with Nanite tessellation detail"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: PIXEL STREAMING 2 + METRICS ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Cloud Pixel Streaming 2: Production-Grade Web Delivery
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  UE5.5 ships with Pixel Streaming 2 — a significant improvement over earlier versions for automotive deployment.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">&lt;100ms</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Input-to-Render</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Same cloud region as user</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">60fps</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Ray-Traced Output</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Neural-inferred lighting</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">4–8%</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Ray Samples Shot</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Rest inferred by neural net</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">0</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">App Installs</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Standard iFrame embed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 text-xs sm:text-sm">
                {[
                  ['WebRTC Adaptive Bitrate', 'Maintains visual quality under variable network conditions.'],
                  ['Sub-100ms Latency', 'Input-to-render on a well-configured deployment within the same cloud region as the user.'],
                  ['Simultaneous Sessions', 'Multiple showroom iPads or remote prospect sessions run concurrently on a server fleet.'],
                  ['Web Embed Support', 'Standard iFrame deployment on existing automotive brand websites — no app installation required.'],
                ].map(([title, body]) => (
                  <div key={title} className="flex items-start gap-2.5 bg-zinc-50 p-4 border border-zinc-200">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>{title}:</strong> {body}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black text-white rounded-none p-5 sm:p-7 border border-black shadow-sm">
                <div className="flex items-center gap-2.5 text-white font-bold font-sans text-xs sm:text-sm uppercase tracking-wider mb-2.5">
                  <FiZap className="text-sm sm:text-base text-white shrink-0" />
                  <span>Why Grazing Angles Matter</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-100 leading-relaxed font-sans">
                  Normal maps look visually flat when lighting approaches grazing angles — an effect experienced buyers perceive as “CGI” even if they can’t articulate why. Nanite tessellation produces geometry that is <strong className="text-white font-bold">indistinguishable from a physical surface under the same conditions</strong>.
                </p>
              </div>
            </article>

            {/* ══════ ENTRY 05: DEPLOYMENT CONTEXTS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <EntryNumber n="05" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Where Pixel Streaming Fits in Automotive Sales
                </h3>

                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 px-2 py-0.5 rounded-none">
                    <FiTablet /> Showroom iPad
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">The Clearest ROI Case</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Salespeople walk prospects through paint, interior, wheels, and packages with renders matching the brand’s marketing photography. Even Apple Silicon can’t run real-time hardware ray tracing on a high-polygon vehicle at showroom detail — the cloud render can.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 px-2 py-0.5 rounded-none">
                    <FiGlobe /> Web-Embedded Configurator
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">Highest Session Volume</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    An iFrame on the brand site delivers the same quality at home. Brands with an existing WebGL configurator can run a “Premium Visualiser” in parallel and A/B test conversion impact before full migration.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 px-2 py-0.5 rounded-none">
                    <FiVideo /> Remote Sales Presentation
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">Showroom Quality Over Video Call</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Prospects view the live render via screenshare or open their own session URL. Quality matches a showroom session because neither participant’s device renders anything.
                  </p>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={steeringImg}
                  cap="One render pipeline serving showroom iPads, brand websites, and remote consultations"
                  alt="Automotive configurator deployment contexts"
                />
              </div>
            </article>

            {/* ══════ ENTRY 06: PRODUCTION PROJECT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-start">
              <div className="md:order-1">
                <EntryNumber n="06" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[26ch] leading-tight mb-3">
                  What a UE5 Pixel Streaming Production Project Looks Like
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  <strong>Asset pipeline.</strong> Automotive assets at pixel-streaming quality require:
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm mb-5">
                  {[
                    ['High-Res Geometry', '5–15 million polygon equivalents per vehicle, managed automatically by Nanite at render time.'],
                    ['Displacement Maps', 'For all micro-surface materials: leather stitching, carpet pile, fabric weave, knurled metal, carbon fibre.'],
                    ['Calibrated PBR', 'Base colour, metallic, roughness, specular, clearcoat intensity and roughness — matched to physical samples.'],
                    ['Paint System', 'Multi-layer clearcoat and metallic flake for every available exterior colour.'],
                    ['Modular Interiors', 'Real-time swap between trim packages.'],
                  ].map(([t, b]) => (
                    <div key={t} className="flex items-start gap-2.5">
                      <span className="text-zinc-900 font-bold">✓</span>
                      <span className="text-zinc-700"><strong>{t}:</strong> {b}</span>
                    </div>
                  ))}
                </div>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Existing offline-render assets (V-Ray, Arnold) can typically be adapted for UE5.5 with material re-parameterisation — the geometry is usually usable. Assets built only for WebGL may need geometry upgrades to support Nanite tessellation.
                </p>
              </div>
              <div className="md:order-2 flex flex-col gap-4">
                <Frame
                  src={volvoImg}
                  cap="Paint material system: multi-layer clearcoat and metallic flake per exterior colour"
                  alt="Automotive paint material system in Unreal Engine 5"
                />
                <div className="p-5 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <FiServer className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Infrastructure</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-2">
                    Epic provides a reference implementation — matchmaker, signalling server, and TURN server. For production, managed services such as Arcturus, PureWeb, or Thundercloud remove the infrastructure burden.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Pricing is typically per concurrent session-minute. Fixed showroom fleets are predictable; public sites need auto-scaling for launches and campaigns, which introduces variable cost and capacity planning.
                  </p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 07: LATENCY ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Latency Requirements for a US Deployment
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Sub-100ms input-to-render is the threshold where users begin perceiving lag. Hitting it means placing render servers geographically close to the buyer base.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-neutral-50 border border-neutral-300 p-4 shadow-sm">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block mb-1">East Coast Server → East Coast Users</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">30–60ms</div>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 p-4 shadow-sm">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block mb-1">East Coast Server → West Coast Users</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">80–120ms</div>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 p-4 shadow-sm">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block mb-1">Showroom, Same Datacenter Region</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">&lt;50ms</div>
                </div>
              </div>
              <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4">
                For a national US rollout, a multi-region configuration (East and West Coast instances) keeps the full addressable audience under 100ms.
              </p>
            </article>

            {/* ══════ ENTRY 08: IS IT RIGHT FOR YOU ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="08" />
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Is UE5 Pixel Streaming Right for Your Automotive Project?
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">Three questions determine fit:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: FiBox,
                    tag: 'Material Detail',
                    q: 'Does material detail drive purchase decisions?',
                    a: 'If buyers choose between $4,000 interior trim packages based on leather grain and stitching, the WebGL-vs-UE5 delta directly affects conversion. If the configurator mostly communicates structural options, the gap matters less.',
                  },
                  {
                    icon: FiTablet,
                    tag: 'Device Landscape',
                    q: 'What devices do your buyers use?',
                    a: 'If your audience skews toward mobile devices with limited GPU performance — where WebGL already degrades — pixel streaming’s device-independence improves quality for your highest-traffic segment.',
                  },
                  {
                    icon: FiGlobe,
                    tag: 'Deployment Context',
                    q: 'Showroom, website, or both?',
                    a: 'Controlled showroom deployments are the most straightforward case. Public-facing websites need more sophisticated infrastructure planning. Both are achievable; the production scope differs.',
                  },
                ].map(({ icon: Icon, tag, q, a }) => (
                  <div key={tag} className="p-5 sm:p-6 border border-zinc-200 bg-white">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <Icon className="w-5 h-5 text-black shrink-0" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">{tag}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">{q}</h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">{a}</p>
                  </div>
                ))}
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Working With Elipse Studio
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Evaluate Pixel Streaming With a Scoped Single-Vehicle Pilot
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Elipse Studio builds UE5.5 automotive configurator experiences with full pixel streaming deployment for OEMs, dealership networks, and automotive accessory brands. For first-time evaluators, we offer a pilot — one vehicle model at a selected trim, configured and deployed on a pixel streaming test instance — so you can judge visual quality and interaction before committing to full production.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-none p-5 sm:p-7 text-left max-w-2xl mx-auto mb-8 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 text-center sm:text-left">
                Our Production Scope Covers:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">1.</span>
                  <span><strong>Asset Pipeline:</strong> New build, or adaptation from your existing CGI assets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">2.</span>
                  <span><strong>UE5.5 Scene Build:</strong> Hardware ray tracing and Nanite tessellation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">3.</span>
                  <span><strong>Pixel Streaming Infrastructure:</strong> Configuration for showroom fleets or auto-scaling web traffic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">4.</span>
                  <span><strong>Web Embed Delivery:</strong> iFrame deployment on your existing brand website.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <a
                data-track-id="article-calendly-2"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss Asset Scope & Architecture</span>
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
                Elipse Studio builds Unreal Engine 5 automotive configurators, pixel streaming deployments, and real-time 3D experiences for OEMs, dealership networks, and global brands.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UE5CloudPixelStreamingAutomotiveArticle;
