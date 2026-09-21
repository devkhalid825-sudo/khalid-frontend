'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCalendar,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiFilm,
  FiPhone,
  FiMail,
  FiVolume2,
  FiVolumeX,
  FiTv,
  FiLayers,
  FiBox,
  FiClock,
  FiExternalLink
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _heroImg from '../../assets/About-page/QORDEN.webp';
import _mainPng from '../../assets/ElipseImages/projects/0.webp';
import _autoImg from '../../assets/About-page/QORDEN.webp';
import _jetourImg from '../../assets/About-page/roohafza.webp';
import _arcImg from '../../assets/About-page/unirealanmorphic.webp';
import _techImg from '../../assets/About-page/technology.webp';

const heroImg = getImgSrc(_heroImg);
const mainPng = getImgSrc(_mainPng);
const autoImg = getImgSrc(_autoImg);
const jetourImg = getImgSrc(_jetourImg);
const arcImg = getImgSrc(_arcImg);
const techImg = getImgSrc(_techImg);

const marqueeItems = [
  'COMMERCIAL VFX USA',
  '✦',
  'CGI PRODUCT INTEGRATION',
  '✦',
  'VIRTUAL ENVIRONMENTS',
  '✦',
  'UNREAL ENGINE 5',
  '✦',
  'NEW YORK · EST',
  '✦',
  'BROADCAST COMPLIANT',
  '✦',
];

const Frame = ({ src, cap, behanceUrl, behanceLabel }) => (
  <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col gap-3">
    <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200 shadow-md group">
      <img alt={cap || 'VFX visual'} src={src} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </figure>
    {(cap || behanceUrl) && (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {cap && (
          <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
            {cap}
          </span>
        )}
        {behanceUrl && (
          <a
            href={behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold font-sans transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>{behanceLabel || 'View on Behance'}</span>
            <FiExternalLink className="text-sm" />
          </a>
        )}
      </div>
    )}
  </div>
);

export default function UsVfxServicesArticle() {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSound = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: action, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToJournal = () => {
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div data-nav="light" className="w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <Header />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">

        {/* ══════ HERO SECTION (LEAP STYLE 3-COLUMN) ══════ */}
        <section className="relative bg-white text-neutral-900 pt-2 pb-6 sm:py-6 lg:py-8 overflow-hidden mb-6 sm:mb-8 min-h-[calc(100vh-7.5rem)] min-h-[calc(100svh-7.5rem)] md:min-h-0 flex flex-col justify-center md:block">
          {/* Decorative ✦ top-left */}
          <div className="hidden lg:block absolute top-8 left-10 text-[#2563EB] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          {/* Decorative arrow top-right */}
          <div className="hidden lg:block absolute top-8 right-12 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* ── Main Center Headline ── */}
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug mb-5 sm:mb-7 px-2">
              Commercial VFX & CGI in the USA:{' '}
              <span className="text-[#2563EB]">Visualizing What Physical Cameras</span>{' '}
              Cannot Capture
            </h1>

            {/* ── 3-Column Content Grid ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.25fr_1fr] gap-5 sm:gap-6 md:gap-6 items-center relative">

              {/* Left Column: Intro / Description (Hidden on mobile) */}
              <div className="hidden md:flex order-2 md:order-1 text-center md:text-left space-y-3 md:pr-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full flex-col items-center md:items-start">
                <FaRegLightbulb className="text-[#2563EB] text-xl" />
                <p className="text-neutral-600 text-xs sm:text-[13px] md:text-sm leading-relaxed font-sans">
                  For US brand directors and commercial agencies, visual effects in 2026 are about solving costly production bottlenecks: CGI environment replacement and digital product integration.
                </p>
                <button
                  onClick={handleScrollToJournal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore VFX Pipelines ↓
                </button>
              </div>

              {/* Center Column: Hero Visual with Exact WebGL vs UE5 Video Sizing */}
              <div className="order-1 md:order-2 relative flex justify-center items-center px-2 sm:px-0 w-full">
                <div className="absolute w-64 h-64 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 text-neutral-400 text-xl select-none">✦</span>
                </div>

                <div className="relative w-full max-w-[16rem] sm:max-w-[19rem] md:max-w-[21rem] lg:max-w-[23rem] h-[21rem] sm:h-[24rem] md:h-[26rem] lg:h-[28rem] xl:h-[29.5rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10">
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/L8LtmNhavc8?autoplay=1&mute=1&loop=1&playlist=L8LtmNhavc8&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="Commercial VFX USA - CGI & Virtual Production Reel"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-[155%] h-[155%] max-w-none border-0 object-cover scale-[1.18]"
                    />
                  </div>

                  {/* Sound Toggle Button */}
                  <button
                    onClick={toggleSound}
                    type="button"
                    className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                    title={isMuted ? 'Unmute Video' : 'Mute Video'}
                    aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                  >
                    {isMuted ? (
                      <FiVolumeX className="text-base text-white/90" />
                    ) : (
                      <FiVolume2 className="text-base text-emerald-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Stars + Stats (Hidden on mobile) */}
              <div className="hidden md:flex order-3 md:order-3 text-center md:text-left flex-col items-center md:items-start justify-center space-y-1.5 md:pl-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  USA 2026
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  COMMERCIAL VFX & ENVIRONMENTS
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Create cinematic commercial campaigns without physical set construction, multi-city travel, or prototype delays.&rdquo;
                  </p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-10 sm:mt-16 hidden sm:inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-neutral-900 text-white px-5 sm:px-7 py-3.5 sm:py-3 rounded-2xl sm:rounded-full shadow-xl text-xs sm:text-sm font-medium border border-neutral-800">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-09"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors text-center"
              >
                Book a technical scoping call ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-center">
                <span className="text-neutral-300">By Elipse Studio Editorial Team</span>
                <span className="h-3.5 w-px bg-neutral-700" />
                <button
                  onClick={handleCopyLink}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ══════ BLACK MARQUEE BAR ══════ */}
        <section className="mt-6 sm:mt-16 mb-16 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ INTRO SECTION: A DISPATCH FROM NEW YORK ══════ */}
        <section className="py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-8">
              <div className="italic text-[#2563EB] text-base mb-4 font-serif">
                A dispatch on US commercial production, 2026
              </div>
              <p className="font-serif font-normal text-xl sm:text-2xl md:text-[28px] leading-snug text-zinc-900 max-w-[38ch]">
                Securing shoot permits in Manhattan or transporting fragile prototype hardware is expensive and unpredictable. High-end CGI environment replacement gives directors total environmental control.
              </p>
              <a
                href="#journal"
                className="mt-7 inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the three core VFX formats below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col gap-3">
              <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200 shadow-md group">
                <img
                  src={mainPng}
                  alt="Lahore Zoo Anamorphic 3D Animation by Elipse Studio"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </figure>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
                  Lahore Zoo — Anamorphic 3D Billboard & CGI Production
                </span>
                <a
                  href="https://www.behance.net/gallery/239269921/Lahore-Zoo-Anamorphic-Animation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold font-sans transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <span>View on Behance</span>
                  <FiExternalLink className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ PRODUCTION & BROADCAST STANDARDS CARDS ══════ */}
        <section className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-4 mb-6 sm:mb-8">
            <span className="font-serif italic text-[#2563EB] text-base sm:text-lg font-medium">Production & Broadcast Standards</span>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200 w-fit">US Compliance 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-6">
            {/* Card 1 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiTv className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Compliance
                  </span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                  US Broadcast
                </h3>
                <p className="text-[10px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-500 mt-1 mb-1.5 sm:mb-3">
                  Network & OTT Standards
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Color graded and mastered to strict technical specs for NBC, CBS, ESPN, Netflix, and 4K HDR.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiLayers className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Ray-Traced
                  </span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                  100% Studio
                </h3>
                <p className="text-[10px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-500 mt-1 mb-1.5 sm:mb-3">
                  Physical Light Matching
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Ray-traced lighting and dynamic reflections matching live-action plates with accuracy.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiBox className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    CAD Pipeline
                  </span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                  CAD-to-Camera
                </h3>
                <p className="text-[10px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-500 mt-1 mb-1.5 sm:mb-3">
                  Direct Ingestion
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Direct ingestion of Maya, 3ds Max, Blender, and SolidWorks data without remodeling.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiClock className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Timezones
                  </span>
                </div>
                <h3 className="text-lg xs:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                  US EST & PST
                </h3>
                <p className="text-[10px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-500 mt-1 mb-1.5 sm:mb-3">
                  Dedicated Overlap
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Daily production standups and live review milestones synchronized during US business hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ THE THREE FORMATS (NUMBERED JOURNAL ENTRIES) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Three Core Commercial VFX Formats</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Driving US Campaigns</span>
            </div>

            {/* ── Entry 01 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  Photoreal CGI Product Integration
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  A physically accurate 3D model of your product is composited into filmed real-world plates. We replicate camera lens distortion, chromatic aberration, sensor grain, and dynamic light bounces so the digital model is indistinguishable from physical reality.
                </p>
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 font-medium">
                  ✦ Widely deployed across US automotive, beverage packaging, consumer tech, and luxury cosmetics.
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={autoImg}
                  badge="CGI Compositing"
                  cap="Qorden — Anamorphic 3D LED Billboard & VFX Production"
                  behanceUrl="https://www.behance.net/gallery/199204861/Qorden-Anamorphic-Animation"
                  behanceLabel="View on Behance"
                />
              </div>
            </article>

            {/* ── Entry 02 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  Virtual Environment Replacement
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Talent or products filmed on clean studio soundstages have their backgrounds replaced with photorealistic 3D environments. From luxury penthouse interiors to sprawling futuristic landscapes, the entire world is rendered in post-production with complete depth-of-field control.
                </p>
                <div className="p-3 bg-zinc-100 border border-zinc-200 rounded-xl text-xs text-zinc-800 font-medium">
                  ✦ Eliminates the logistical costs and delays of flying production crews to overseas or extreme locations.
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={arcImg}
                  badge="Virtual Environment"
                  cap="Unireal — Anamorphic 3D LED Display Animation"
                  behanceUrl="https://www.behance.net/gallery/209406081/Unireal-Anamorphic-Animation"
                  behanceLabel="View on Behance"
                />
              </div>
            </article>

            {/* ── Entry 03 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  Real-Time Virtual Production Asset Prep
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Creating production-ready 3D environments and photoreal props specifically optimized for Unreal Engine 5. Assets are pre-configured with Nanite geometry and Lumen lighting, ready to drop into virtual production pipelines, real-time previz, or interactive brand worlds.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={jetourImg}
                  badge="Unreal Engine 5 Asset"
                  cap="Rooh Afza — Anamorphic 3D Billboard Animation"
                  behanceUrl="https://www.behance.net/gallery/221757889/Rooh-Afza-Bill-Board-Animation"
                  behanceLabel="View on Behance"
                />
              </div>
            </article>
          </div>
        </section>

        {/* ══════ BENCHMARK PRICING TABLE (USA) ══════ */}
        <section className="py-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-4 mb-6 sm:mb-8">
            <span className="font-serif italic text-[#2563EB] text-base">Commercial VFX Cost & Timeline Benchmarks</span>
            <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">USA 2026</span>
          </div>

          {/* Mobile Card View (No Cut-Off / No Horizontal Scroll Required) */}
          <div className="grid grid-cols-1 gap-3.5 sm:hidden">
            {[
              {
                scope: 'CGI Product Integration (30s TVC)',
                price: '$8,000 – $28,000',
                time: '4–8 Weeks',
                deliverables: 'Full 3D product tracking, lighting integration & grade',
              },
              {
                scope: 'Complete Virtual Environment TVC',
                price: '$22,000 – $75,000',
                time: '8–14 Weeks',
                deliverables: 'Full 3D environment build, camera moves & final composite',
              },
              {
                scope: 'Asset Prep for Unreal Engine Real-Time',
                price: '$5,000 – $18,000',
                time: '3–6 Weeks',
                deliverables: 'Real-time optimized PBR assets, LODs & material setup',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-zinc-900 text-sm">{item.scope}</h4>
                  <span className="font-mono text-[#2563EB] font-bold text-xs whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{item.price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span>⏱ {item.time}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.deliverables}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead className="bg-zinc-50 text-xs font-mono uppercase tracking-wider text-zinc-600 border-b border-zinc-200">
                <tr>
                  <th className="py-4 px-6 font-semibold">Production Scope</th>
                  <th className="py-4 px-6 font-semibold">Benchmark Investment (USD)</th>
                  <th className="py-4 px-6 font-semibold">Standard Timeline</th>
                  <th className="py-4 px-6 font-semibold">Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">CGI Product Integration (30s TVC)</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">$8,000 – $28,000</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">4–8 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">Full 3D product tracking, lighting integration & grade</td>
                </tr>
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">Complete Virtual Environment TVC</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">$22,000 – $75,000</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">8–14 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">Full 3D environment build, camera moves & final composite</td>
                </tr>
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">Asset Prep for Unreal Engine Real-Time</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">$5,000 – $18,000</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">3–6 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">Real-time optimized PBR assets, LODs & material setup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════ BOTTOM CALLOUT CTA (WHITE EDITORIAL) ══════ */}
        <section className="mt-16 sm:mt-20 p-8 sm:p-14 rounded-3xl bg-zinc-50 text-zinc-900 text-center shadow-xl border border-zinc-200">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight text-zinc-900 mb-4 max-w-2xl leading-snug">
              Plan Your Next Commercial Campaign
            </h2>

            <p className="text-zinc-600 font-sans text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Have an upcoming broadcast spot, product launch, or CGI integration brief? Share your treatment or storyboard with our team. Within 24 US business hours, we’ll provide a technical feasibility breakdown and sprint estimate.
            </p>

            <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-lg sm:max-w-none mx-auto sm:w-auto">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FiCalendar className="text-sm" />
                <span>Book Consultation</span>
              </a>
              <Link
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-3 sm:py-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 font-medium text-[11px] xs:text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm"
              >
                <FiMail className="text-xs sm:text-sm" />
                <span>Submit Treatment</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
