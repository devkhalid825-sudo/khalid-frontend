
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiCalendar
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';


import _jetourImg from '../../assets/ElipseImages/blogs/jetour.webp';
import _kiaImg from '../../assets/About-page/kia.webp';
import _ahmedFoodImg from '../../assets/Ahmed-food/jam&spread/15.webp';

const jetourImg = getImgSrc(_jetourImg);
const kiaImg = getImgSrc(_kiaImg);
const ahmedFoodImg = getImgSrc(_ahmedFoodImg);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-3 w-full my-4 sm:my-6">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || 'Interactive 3D vs CGI Production Pipeline'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {cap && (
      <p className="font-serif italic text-xs sm:text-sm text-zinc-500">
        {cap}
      </p>
    )}
  </div>
);

const Interactive3dVsCgiArticle = () => {
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

  const handleScrollToJournal = () => {
    const el = document.getElementById('journal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'INTERACTIVE 3D VS CGI',
    '✦',
    'SINGLE MASTER CAD PIPELINE',
    '✦',
    'REAL-TIME 3D RENDERING',
    '✦',
    'WEBGL CONFIGURATORS',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    '70% FASTER TIMELINES',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  return (
    <div data-nav="light" className="w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ HERO SECTION ══════ */}
        <section className="relative bg-white text-neutral-900 py-10 sm:py-16 overflow-hidden mb-8 sm:mb-12">
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
            {/* Main Center Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[50px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              Interactive 3D vs. Pre-Rendered CGI: How High-Growth Brands Are Cutting Production Timelines by{' '}
              <span className="text-[#2563EB]">70% in 2026</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative text-left">
              {/* Left Column */}
              <div className="space-y-3 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-lg sm:text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Executive Strategy</span>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Paying $500–$1,500 per CGI render per angle? Discover how enterprise brands move to a single master CAD pipeline powering WebGL configurators, 4K marketing stills, and UE5 campaign visuals.
                </p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 pt-1">
                  <button
                    onClick={handleScrollToJournal}
                    className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Read Analysis ↓
                  </button>
                  <Link
                    href="/contact"
                    className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Book Audit ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Showcase YouTube Shorts Reel Frame */}
              <div className="relative flex justify-center px-4 sm:px-0 my-2 md:my-0">
                <div className="absolute w-56 h-56 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>
                <div className="relative w-52 h-[18rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <iframe
                    src="https://www.youtube.com/embed/DIsiP8sNnqU?rel=0"
                    title="Interactive 3D vs CGI YouTube Shorts Reel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Quote Callout */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  70% Faster
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Master Asset Economics
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;The most expensive thing a brand can do is pay for the same 3D geometry to be rebuilt from scratch every time they need a new angle or a new finish. A master asset changes the economics of the entire creative operation.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Bilal Lania, CEO & Creative Director — Elipse Studio</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Submit Your CAD Files for a Pipeline Audit ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Bilal Lania · CEO & Creative Director, Elipse Studio</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Article Below ↓
              </button>
            </div>
          </div>
        </section>

        {/* ══════ MARQUEE TICKER ══════ */}
        <section className="my-12 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ MAIN JOURNAL CONTENT ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Commercial 3D Strategy & Pipeline Engineering</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026</span>
            </div>

            {/* Intro Story Section with Kia Image Frame */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 border-b border-zinc-200 items-center">
              <div>
                <p className="text-lg sm:text-xl text-zinc-800 leading-relaxed font-serif italic mb-6">
                  A product marketing director at a mid-sized furniture brand recently sent me a spreadsheet. It was her CGI spend from the previous 12 months.
                </p>
                <div className="bg-zinc-50 border-l-4 border-[#2563EB] p-5 my-6 rounded-r-xl font-sans text-sm sm:text-base text-zinc-700 space-y-2">
                  <p><strong>Forty-two SKUs.</strong> Six angles each. A mix of lifestyle and white-background renders.</p>
                  <p>Three seasonal colorway refreshes per product.</p>
                  <p className="text-base font-semibold text-zinc-900 pt-2">
                    Total spend: <span className="text-[#2563EB] font-bold">$284,000</span>. Total time to produce and approve: an average of <span className="text-[#2563EB] font-bold">34 days</span> per product refresh.
                  </p>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  Her question was direct: <em>&ldquo;We&apos;re launching a configurator. Do we still need all of this?&rdquo;</em>
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  The answer changed everything about how her team now operates.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  This post is about that shift — from a model where every new angle, colorway, or finish triggers a new production order, to a model where a single optimized 3D asset becomes the permanent source for everything: marketing stills, ecommerce visuals, interactive web configurators, and campaign video. Simultaneously. Without starting over.
                </p>
              </div>
              <div>
                <Frame src={kiaImg} cap="Real-Time 3D Kia Configurator Visual engineered by Elipse Studio." alt="Kia 3D Configurator" />
              </div>
            </div>

            {/* SECTION 1 */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-10">
                <div>
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                    01
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                    The Traditional CGI Bottleneck: Why Static Renders Are Quietly Draining Your Budget
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                    The traditional commercial 3D production workflow works like this. A brand sends a product brief to a CGI studio. The studio models the product (or adapts an existing model), applies materials, lights the scene, renders the frames, sends them through an approval chain, and delivers final assets — usually JPEG or PNG files at a specified resolution.
                  </p>
                  <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                    For each new request, the process largely resets. A new colorway means re-texturing, re-lighting, re-rendering, and re-approving. A missed angle means going back to the studio for a separate order. A product update — a new handle, a revised dimension, a different fabric — can mean rebuilding from scratch depending on how the original files were structured.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-xs sm:text-sm leading-relaxed">
                    <strong>The deeper problem:</strong> CGI studios deliver files, not assets. When the shoot is done, the working files — the lighting rigs, the material setups, the scene geometry — typically stay with the studio. The brand owns the rendered images but not the production infrastructure that created them. Every refresh is a new engagement, a new brief, a new invoice.
                  </div>
                </div>

                <div>
                  <Frame src={ahmedFoodImg} cap="Photorealistic 3D Product CGI Render for Ahmed Food packaging." alt="Ahmed Food 3D Product CGI Render" />
                </div>
              </div>

              {/* Benchmark Table Full Width Sub-block */}
              <div className="mt-8 bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-4">2026 Commercial CGI Rate Benchmarks</h3>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-900 text-white font-semibold">
                      <tr>
                        <th className="p-3 sm:p-4">Render Type</th>
                        <th className="p-3 sm:p-4">Per-Image Cost Range</th>
                        <th className="p-3 sm:p-4">Turnaround</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-700 font-sans">
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Standard ecommerce white background</td>
                        <td className="p-3 sm:p-4">$150 – $450 / angle</td>
                        <td className="p-3 sm:p-4">5–10 days</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Lifestyle/environmental scene render</td>
                        <td className="p-3 sm:p-4">$500 – $1,500 / angle</td>
                        <td className="p-3 sm:p-4">10–20 days</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Photorealistic hero campaign image</td>
                        <td className="p-3 sm:p-4">$1,500 – $4,000+</td>
                        <td className="p-3 sm:p-4">15–30 days</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">New colorway (existing model)</td>
                        <td className="p-3 sm:p-4">$200 – $600 / angle</td>
                        <td className="p-3 sm:p-4">3–8 days</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Product update / model revision</td>
                        <td className="p-3 sm:p-4">$800 – $3,000+</td>
                        <td className="p-3 sm:p-4">10–25 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-500 mt-3 italic">
                  For a brand managing 50 active SKUs with three colorways each, the math becomes significant quickly.
                </p>
              </div>
            </article>

            {/* SECTION 2 */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-10">
                <div>
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                    02
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                    The Single Master CAD Asset: One Source, Unlimited Outputs
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                    The shift starts with a different approach to the 3D model itself. In the traditional CGI workflow, models are built for a specific output — a defined set of angles, a defined lighting environment, a defined resolution. They are production assets for a single campaign.
                  </p>
                  <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                    In a master asset pipeline, the 3D model is built to be permanent. It is optimized once — for geometric accuracy, material fidelity, and file efficiency — and it becomes the single source of truth for every downstream output the brand will ever need.
                  </p>
                  <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl my-4">
                    <p className="text-xs sm:text-sm font-semibold text-[#2563EB] uppercase tracking-wider mb-2">Master Pipeline Output Formats:</p>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                        <span><strong>Ecommerce product stills:</strong> Rendered from existing master model in 2–4 hours per angle.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                        <span>
                          <strong>WebGL real-time configurator:</strong> Interactive browser experience built in 3–6 weeks. Explore our{' '}
                          <Link href="/capabilities" className="text-[#2563EB] underline font-semibold hover:text-blue-800">
                            3D Interactive Configurator
                          </Link>{' '}
                          capabilities.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                        <span><strong>Unreal Engine 5 Pixel Streaming:</strong> Cinema-grade ray-traced visuals for flagship launches.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                        <span><strong>AR & Virtual Showrooms:</strong> Instant USDZ/GLTF export for spatial commerce.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <Frame src={jetourImg} cap="Jetour Real-Time WebGL Car Configurator engineered by Elipse Studio." alt="Jetour Real-Time WebGL Car Configurator" />
                </div>
              </div>

              {/* Master Model Speed Table Full Width Sub-block */}
              <div className="mt-8 bg-zinc-50 border border-zinc-200 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-4">Master Model Output Generation Speed</h3>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-900 text-white font-semibold">
                      <tr>
                        <th className="p-3 sm:p-4">Output</th>
                        <th className="p-3 sm:p-4">How It&apos;s Generated</th>
                        <th className="p-3 sm:p-4">Turnaround After Model Exists</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-700 font-sans">
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Ecommerce product stills — any angle</td>
                        <td className="p-3 sm:p-4">Render from existing model</td>
                        <td className="p-3 sm:p-4">2–4 hours / angle</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">4K lifestyle / campaign imagery</td>
                        <td className="p-3 sm:p-4">Re-light model in scene</td>
                        <td className="p-3 sm:p-4">1–3 days</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Animated product turntable</td>
                        <td className="p-3 sm:p-4">Export from existing model</td>
                        <td className="p-3 sm:p-4">4–8 hours</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">WebGL real-time configurator</td>
                        <td className="p-3 sm:p-4">Optimize model for browser</td>
                        <td className="p-3 sm:p-4">3–6 weeks (one-time build)</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">UE5 Pixel Streaming experience</td>
                        <td className="p-3 sm:p-4">Import model into UE5</td>
                        <td className="p-3 sm:p-4">4–8 weeks (one-time build)</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">AR &apos;view in space&apos; product page</td>
                        <td className="p-3 sm:p-4">Export model as USDZ/GLTF</td>
                        <td className="p-3 sm:p-4">1–2 weeks</td>
                      </tr>
                      <tr className="hover:bg-zinc-50">
                        <td className="p-3 sm:p-4 font-medium text-zinc-900">Trade show / showroom display asset</td>
                        <td className="p-3 sm:p-4">Re-render or stream model</td>
                        <td className="p-3 sm:p-4">2–4 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* SECTION 3 */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-8">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  Speed-to-Market: From Six Weeks to Four Days
                </h2>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  The headline number — <strong>70% reduction in production timelines</strong> — comes from a straightforward comparison of what happens when a brand launches a new colorway or finish under each model.
                </p>
              </div>

              {/* Step-by-Step Scenario Table */}
              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white mb-10">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-900 text-white font-semibold">
                    <tr>
                      <th className="p-3 sm:p-4">Stage</th>
                      <th className="p-3 sm:p-4 text-zinc-300">Traditional CGI Workflow</th>
                      <th className="p-3 sm:p-4 text-blue-400">Master Asset Pipeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700 font-sans">
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-bold text-zinc-900">Step 1: Briefing</td>
                      <td className="p-3 sm:p-4 text-zinc-600">Brief 3 colorways × 12 SKUs = 36 new render orders</td>
                      <td className="p-3 sm:p-4 text-zinc-900 font-medium">Update material files on existing model — 1 session</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-bold text-zinc-900">Step 2: Studio Execution</td>
                      <td className="p-3 sm:p-4 text-zinc-600">Re-texture, re-light, re-render per SKU — 5–12 days each</td>
                      <td className="p-3 sm:p-4 text-zinc-900 font-medium">Batch render all angles, all colorways — 1–2 days</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-bold text-zinc-900">Step 3: Approvals</td>
                      <td className="p-3 sm:p-4 text-zinc-600">Approval round per batch — 3–5 days</td>
                      <td className="p-3 sm:p-4 text-zinc-900 font-medium">Single approval round — all colorways simultaneously</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-bold text-zinc-900">Step 4: Publishing</td>
                      <td className="p-3 sm:p-4 text-zinc-600">Ecommerce upload, resize, format — 2–3 days</td>
                      <td className="p-3 sm:p-4 text-zinc-900 font-medium">Automated output pipeline — same day</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-bold text-zinc-900">Step 5: Configurator Sync</td>
                      <td className="p-3 sm:p-4 text-zinc-600">Separate brief, separate agency — 4–6 weeks</td>
                      <td className="p-3 sm:p-4 text-zinc-900 font-medium">Configurator material swap — same session as renders</td>
                    </tr>
                    <tr className="bg-zinc-900 text-white font-semibold">
                      <td className="p-3 sm:p-4">Total Time to Live</td>
                      <td className="p-3 sm:p-4 text-zinc-300">6–12 weeks</td>
                      <td className="p-3 sm:p-4 text-[#3B82F6] font-bold">3–5 business days (70%+ Faster)</td>
                    </tr>
                    <tr className="bg-zinc-900 text-white font-semibold">
                      <td className="p-3 sm:p-4">Total Cost (6 angles/SKU)</td>
                      <td className="p-3 sm:p-4 text-zinc-300">$54,000 – $162,000</td>
                      <td className="p-3 sm:p-4 text-emerald-400 font-bold">Included in retainer or one-time fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Clean Unified Highlight Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-center hover:border-blue-200 transition-all shadow-sm">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB]">70%</div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Average Timeline Reduction</div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-center hover:border-blue-200 transition-all shadow-sm">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB]">4 Days</div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Launch Time vs 6 Weeks</div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-center hover:border-blue-200 transition-all shadow-sm">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB]">1 Model</div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Powering Stills, WebGL & UE5</div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-center hover:border-blue-200 transition-all shadow-sm">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB]">$0</div>
                  <div className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">Extra Fee for New Output Types</div>
                </div>
              </div>
            </article>

            {/* SECTION 4 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-start">
              <div>
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  WebGL vs. Unreal Engine 5: Choosing the Right Tech Stack
                </h2>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  The master asset pipeline doesn&apos;t mean every output uses the same technology. Understanding where WebGL ends and where UE5 begins is the key to matching visual quality to commercial context without overspending.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  Use WebGL when your buyer is on your product page, shopping, and needs instant visual confirmation. Speed of load is the conversion lever — four seconds of loading costs more sales than a slight reduction in visual fidelity.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Use UE5 when your buyer is in a dedicated presentation environment — a{' '}
                  <Link href="/services/virtual-showrooms-digital-twins" className="text-[#2563EB] underline font-semibold hover:text-blue-800">
                    virtual showroom
                  </Link>
                  , a trade show, a key account pitch — where they have time and attention, and where the visual experience itself is part of the value proposition.
                </p>
              </div>

              <div className="space-y-6">
                {/* WebGL Card */}
                <div className="bg-zinc-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">WebGL Configurator</h3>
                    <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">$12k – $45k</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4 font-semibold uppercase tracking-wider">Best for: Primary website, product pages, ecommerce portals</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Loads in under 2 seconds on mobile</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>60fps on mid-range smartphones</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Zero plugin or app install required</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Native Shopify / WooCommerce integration</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Infinite simultaneous users — no GPU server cost</span></li>
                  </ul>
                </div>

                {/* UE5 Card */}
                <div className="bg-zinc-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">Unreal Engine 5 + Pixel Streaming</h3>
                    <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">$35k – $120k+</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4 font-semibold uppercase tracking-wider">Best for: High-ticket luxury sectors, flagship campaigns</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Cinema-grade Lumen global illumination</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Nanite micro-polygon geometry photorealism</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Ray-traced reflections & depth of field</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>Streams to any browser via Arcware / StreamPixel</span></li>
                    <li className="flex items-center gap-2.5"><FiCheck className="text-[#2563EB] shrink-0 text-base" /><span>VR headset compatible (Meta Quest, PCVR)</span></li>
                  </ul>
                </div>
              </div>
            </article>

            {/* SECTION 5 */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-8">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  The Economic Impact: Real-World ROI Benchmarks
                </h2>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Let&apos;s put concrete numbers on the shift. The following figures are composite benchmarks from commercial deployments across furniture, commercial equipment, and consumer goods brands:
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white mb-8">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-900 text-white font-semibold">
                    <tr>
                      <th className="p-3 sm:p-4">Metric</th>
                      <th className="p-3 sm:p-4">Traditional CGI-Only</th>
                      <th className="p-3 sm:p-4">Master Asset Pipeline</th>
                      <th className="p-3 sm:p-4 text-emerald-400">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700 font-sans">
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Cost per colorway launch (12 SKUs, 6 angles)</td>
                      <td className="p-3 sm:p-4 text-red-600 font-semibold">$54,000 – $162,000</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-semibold">$800 – $3,000</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">94% cost reduction</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Time to live for new finish</td>
                      <td className="p-3 sm:p-4">5–8 weeks</td>
                      <td className="p-3 sm:p-4">3–5 business days</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">70–85% faster</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Output formats from one cycle</td>
                      <td className="p-3 sm:p-4">1 (static renders)</td>
                      <td className="p-3 sm:p-4">5+ simultaneously</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">5× output volume</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Configurator update after product change</td>
                      <td className="p-3 sm:p-4">Separate project, weeks</td>
                      <td className="p-3 sm:p-4">Same day</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">Instant</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">File ownership</td>
                      <td className="p-3 sm:p-4">Studio retains working files</td>
                      <td className="p-3 sm:p-4">Brand owns source files</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">Full ownership</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Year 2 production cost vs Year 1</td>
                      <td className="p-3 sm:p-4">Same or higher</td>
                      <td className="p-3 sm:p-4">60–75% lower</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">Compounds annually</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="p-3 sm:p-4 font-medium text-zinc-900">Ecommerce quote conversion lift</td>
                      <td className="p-3 sm:p-4">Baseline</td>
                      <td className="p-3 sm:p-4">+34% quote conversion</td>
                      <td className="p-3 sm:p-4 font-bold text-emerald-600">Commercial lift</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* SECTION 6 */}
            <article className="py-12 sm:py-14">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  06
                </div>
                <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  Building Your Master Pipeline: Practical Implementation
                </h2>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                  How hard is the transition? The answer depends almost entirely on what 3D assets already exist in your organization.
                </p>

                <div className="space-y-6 text-sm text-zinc-700 text-left">
                  <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl">
                    <h3 className="text-base font-bold text-zinc-900 mb-2">1. If you have CAD files (SolidWorks, STEP, IGES)</h3>
                    <p className="leading-relaxed">
                      This is the fastest path. Engineering CAD files import directly into our production pipeline. We optimize polygon density, apply PBR materials, and deliver the first batch of outputs within two to four weeks.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl">
                    <h3 className="text-base font-bold text-zinc-900 mb-2">2. If you have legacy CGI renders but no working files</h3>
                    <p className="leading-relaxed">
                      The most common scenario. We reconstruct the 3D master model from your physical product or reference renders. Reconstruction adds 2–4 weeks to the initial timeline but is a one-time investment.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl">
                    <h3 className="text-base font-bold text-zinc-900 mb-2">3. If you are launching a new product line</h3>
                    <p className="leading-relaxed">
                      The ideal scenario. We build the master model while the factory is producing the first units. Marketing stills, configurators, and AR launch assets are ready before the physical product ships.
                    </p>
                  </div>
                </div>
              </div>

            </article>


          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Interactive3dVsCgiArticle;
