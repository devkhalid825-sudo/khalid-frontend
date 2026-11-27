'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiArrowRight, FiZap, FiLayers } from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Hyper Real Estate project imagery. Each image is used exactly once in this article.
import _heroImg from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223251.jpg'; // hero: VR hand-tracking menu
import _imgOne from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223315.jpg';
import _imgTwo from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223333.jpg';
import _imgThree from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223419.jpg';
import _imgFour from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223517.jpg';

const heroImg = getImgSrc(_heroImg);
const imgOne = getImgSrc(_imgOne);
const imgTwo = getImgSrc(_imgTwo);
const imgThree = getImgSrc(_imgThree);
const imgFour = getImgSrc(_imgFour);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

// External source links (real URLs, from the finalized SEO/AEO draft).
const LINKS = {
  meta: 'https://developers.meta.com/vr/documentation/unreal/unreal-isdk-overview/',
  agora: 'https://docs.agora.io/en/realtime-media/rtc/build/enhance-the-audio-experience/spatial-audio',
};

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
    {children}
  </a>
);
const Int = ({ href, children }) => (
  <Link href={href} className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
    {children}
  </Link>
);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Hyper Real Estate cross-platform VR by Elipse Studio'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {cap && <p className="font-serif italic text-xs sm:text-sm text-zinc-500 text-center sm:text-left">{cap}</p>}
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

const H4 = ({ children }) => <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">{children}</h4>;
const P = ({ children, className = '' }) => (
  <p className={`text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed ${className}`}>{children}</p>
);

const EntryHead = ({ n, pill, title, children }) => (
  <div className="mb-6">
    <EntryNumber n={n} />
    <Pill>{pill}</Pill>
    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">{title}</h3>
    {children}
  </div>
);

const spanClass = { 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7' };
const mdSpanClass = { 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7' };

/** cols: [{ key, label, span, strong? }]: spans must sum to 12. */
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

const benchmarkRows = [
  { metric: 'Initial App Download', ours: '~480 MB base shell', vs: '6.5 GB to 12.0 GB monolithic builds (93% footprint reduction)' },
  { metric: 'New Property Deployment', ours: 'Under 5 minutes via CloudFront PAK upload', vs: '24 to 48 hours of full re-cooking' },
  { metric: 'VR Frame Rate', ours: '72 to 90 FPS native 6DOF', vs: 'Meta Quest 3 target met' },
  { metric: 'Multiplayer Bandwidth', ours: 'Under 5 KB/s at 20Hz', vs: 'Delta sync per client' },
  { metric: 'Voice Latency', ours: 'Under 150 ms globally', vs: 'Agora Edge RTC' },
];

const FAQS = [
  {
    q: 'How does Elipse Studio stream large Unreal Engine 5 properties onto Meta Quest 3?',
    a: 'We ship a lightweight ~480 MB base application shell and stream individual property environments on demand from AWS S3 and CloudFront using a custom runtime PAK streaming system (UDLCManager and FPakPlatformFile).',
  },
  {
    q: 'Can an architect join a Quest 3 VR walkthrough from a regular Windows PC?',
    a: 'Yes. Using Photon Cloud Realtime at 20Hz delta sync (under 5 KB/s), buyers explore in full 6DOF VR on Meta Quest 2, Pro, or 3 while architects join the same session from a Windows 64-bit PC with live viewport visibility and Agora spatial voice.',
  },
  {
    q: 'How do you keep Unreal Engine 5 running at 72 to 90 FPS on standalone Quest 3?',
    a: 'Rather than pushing heavy desktop ray tracing onto mobile hardware, we use GPULightmass baked lighting and Mobile Forward Shading, maintaining steady 72 to 90 FPS native 6DOF performance on Meta Quest 3.',
  },
  {
    q: 'How fast can a new unit or property be added to the VR platform?',
    a: 'New property environments go live in under 5 minutes by uploading platform-targeted PAK chunks and updating the CloudFront JSON manifest, avoiding 24 to 48 hour full re-cooks and app reinstalls.',
  },
];

const CrossPlatformVrPakStreamingArticle = () => {
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
    'UNREAL ENGINE 5.6', '✦', 'META QUEST 3', '✦', 'RUNTIME PAK STREAMING', '✦',
    'AWS CLOUDFRONT', '✦', 'PHOTON MULTIPLAYER', '✦', 'AGORA SPATIAL VOICE', '✦',
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
              <span className="text-[#4169E1]">Cross-Platform VR Architecture &amp; Remote Client Walkthroughs:</span>{' '}
              How Runtime PAK Streaming Solves Standalone Quest 3 Limits (2026 Guide)
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-3xl mb-4 px-3 leading-relaxed">
              How we ship a ~480 MB base app to Meta Quest 3, stream new properties from AWS CloudFront in under 5 minutes, and let architects on Windows PCs guide remote buyers in 6DOF VR at 72 to 90 FPS.
            </p>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | 2026 Guide
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Meta Quest 3 hand-tracking menu in the Hyper Real Estate VR platform"
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
              <Link href="/project/hyper-real-estate" className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors">
                Hyper Real Estate Case Study ↗
              </Link>
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

        {/* ══════ INTRO ══════ */}
        <section className="py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-center">
            <div className="md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">Introduction</div>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                Most real estate developers ask for the same thing when they first reach out to us. They want a buyer in another country to put on a Meta Quest 3 headset, walk through an unbuilt property at full quality, and talk live with an architect sitting at a regular Windows PC.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-3">
                Sounds simple on a call, but when you actually build it in Unreal Engine 5.6, you hit a wall fast. A high-detail architectural scene easily grows to 6.5 GB to 12 GB once you pack in geometry, high-resolution textures, and lighting. Trying to push a 10 GB APK onto a standalone Quest 3 headset is painful for buyers, hits store and sideloading limits, and forces a 24 to 48 hour full re-cook every time an interior designer swaps a kitchen tile.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                On our <Int href="/project/hyper-real-estate">Hyper Real Estate platform</Int>, we solved this by splitting the app into two parts: a ~480 MB base shell installed once on the headset, and cloud-hosted property PAK modules that stream on demand from AWS CloudFront in under 5 minutes.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">Verified Results · Hyper Real Estate Build</p>
              <div className="grid grid-cols-1 gap-3">
                <Stat v="~480 MB" l="Base Shell" s="vs 6.5 to 12 GB monolithic builds" />
                <Stat v="< 5 min" l="New Property Deployment" s="vs 24 to 48 hours of re-cooking" />
                <Stat v="72 to 90" l="FPS on Quest 3" s="native 6DOF" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">

            {/* 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="01" pill="The Problem" title="Why Monolithic VR Builds Break for Multi-Property Teams">
                    <P>
                      If you are only showing one single villa at a local event, a single monolithic build works fine. The moment you have multiple unit types, international buyers, or weekly finish updates, monolithic builds create four headaches:
                    </P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Huge Downloads for Buyers">Shipping a 6.5 GB to 12 GB build means someone on the client side has to manage heavy sideloading and wait through massive downloads before seeing a single room.</Check>
                    <Check title="Slow Turnaround on Small Changes">Changing one stone texture or cabinet finish traditionally triggers a full shader compile and content cook that can tie up a workstation for 24 to 48 hours.</Check>
                    <Check title="Outdated Sales Copies">When sales teams operate across multiple cities, half the agents end up showing last month&apos;s floorplan or finish palette because nobody re-installed the latest 10 GB file.</Check>
                    <Check title="Two Separate Pipelines">Maintaining separate monolithic builds for Meta Quest 3 (Android) and Windows PC (x64) doubles QA and deployment work.</Check>
                  </div>
                </div>
                <Frame src={imgOne} cap="A buyer explores an unbuilt property in full quality on a standalone headset" alt="Hyper Real Estate VR walkthrough on Meta Quest 3" />
              </div>
            </article>

            {/* 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="02" pill="Architecture" title="The 480 MB Shell & Runtime PAK Streaming Architecture">
                    <P>
                      Instead of bundling every property inside one giant app, we separate the core engine shell from the property content.
                    </P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Layer 1: The Lightweight Base Shell (~480 MB)">Buyers install this once on their Meta Quest 3 (or Windows PC). It holds the Unreal Engine 5.6 runtime, our custom DLC streaming manager (UDLCManager), the in-world menu UI, Photon multiplayer sync, and Agora spatial voice. It only needs an update when we change core app features.</Check>
                    <Check title="Layer 2: On-Demand Property PAK Modules">Each property or unit type lives on AWS S3 and CloudFront as platform-targeted PAK chunks, organized through a Supabase property directory.</Check>
                  </div>
                </div>
                <Frame src={imgTwo} cap="The base shell opens into a lightweight virtual studio in seconds" alt="Hyper Real Estate in-headset menu and property selection" />
              </div>

              <div className="mt-8 max-w-3xl">
                <H4>Here is what happens when a buyer puts on the headset:</H4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <Check title="1">The base shell opens into a lightweight virtual studio in seconds.</Check>
                  <Check title="2">The buyer picks a region and property. Our DLC manager pulls the JSON manifest from CloudFront and checks which chunks are already cached locally.</Check>
                  <Check title="3">Only the missing PAK chunks download over encrypted HTTPS/TLS.</Check>
                  <Check title="4">Unreal mounts the PAK files dynamically via FPakPlatformFile and scans the Asset Registry so the property loads in under 5 minutes.</Check>
                </div>
                <Delivers label="Why It Matters">
                  Because only the changed PAK chunks need re-uploading, adding a brand-new property or pushing a material update takes minutes instead of days.
                </Delivers>
              </div>
            </article>

            {/* 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="03" pill="Multiplayer" title="Connecting Quest 3 Buyers with Windows PC Architects">
                    <P className="mb-4">
                      A buyer walking around an empty 3D apartment alone loses interest quickly. The real value comes when an architect or sales lead joins them inside the space from a standard Windows 64-bit PC, without needing a VR headset at their desk.
                    </P>
                    <P>Using Photon Cloud Realtime, we sync both clients in the same session:</P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Buyer on Meta Quest 3">Moves naturally in full 6DOF VR with <Ext href={LINKS.meta}>Meta OpenXR headset, controller, and hand tracking</Ext>.</Check>
                    <Check title="Architect on Windows PC">Joins in first-person with mouse and keyboard, sees the buyer&apos;s exact viewport in real time, guides them from room to room, and triggers finish or lighting updates live.</Check>
                    <Check title="Lightweight Sync">Unreliable delta transforms broadcast at 20Hz with Hermite interpolation, keeping multiplayer network overhead below 5 KB/s per client.</Check>
                  </div>
                </div>
                <Frame src={imgThree} cap="Buyer and architect share one session, one in VR and one on a Windows PC" alt="Shared VR session between a Quest 3 buyer and a Windows PC architect" />
              </div>
            </article>

            {/* 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="04" pill="Voice & UI" title="Solving Spatial Voice & In-World UI on Android VR">
                    <P>Two things make or break a live remote walkthrough: clear voice and menus that never crash.</P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Sub-150ms Spatial Voice with Agora RTC">On Quest 3, running third-party echo cancellation on top of Meta&apos;s built-in microphone AEC makes voices sound robotic and distorted. Using Agora&apos;s UE5 SDK configured with <Ext href={LINKS.agora}>AUDIO_SCENARIO_GAME_STREAMING</Ext> hands echo cancellation back to Quest 3 hardware while keeping full-duplex spatial voice under 150 ms globally.</Check>
                    <Check title="Crash-Free 3D Menus">Standard UE5 Widget Components can crash on Android VR when render targets resize or get destroyed during heavy PAK loading. On our platform, we avoid runtime widget destruction and use a two-stage safe web UI plus a raycast interaction fixer after every level transition so 3D menus stay responsive across room switches.</Check>
                  </div>
                </div>
                <Frame src={imgFour} cap="In-world menus stay responsive across room switches" alt="Hyper Real Estate in-world 3D menu on Android VR" />
              </div>
            </article>

            {/* 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead n="05" pill="Performance" title="Hitting 72 to 90 FPS on Quest 3 Without Sacrificing Realism">
                <P className="mb-4 max-w-3xl">
                  You cannot brute-force desktop ray tracing onto a standalone mobile headset. To hold a steady 72 to 90 FPS on Meta Quest 3 without reprojection jitter, we rely on GPULightmass baked lighting and Mobile Forward Shading instead of heavy dynamic desktop lighting.
                </P>
                <P className="max-w-3xl">
                  That combination gives buyers natural sunlight, soft indirect bounce, and crisp material reflections while staying safely inside Quest 3&apos;s mobile GPU and thermal limits.
                </P>
              </EntryHead>
              <H4>
                Verified Benchmarks from Our <Int href="/project/hyper-real-estate">Hyper Real Estate Build</Int>
              </H4>
              <DataTable
                icon={FiLayers}
                title="Verified Benchmarks"
                cols={[
                  { key: 'metric', label: 'Metric', span: 3 },
                  { key: 'ours', label: 'Our Build', span: 4, strong: true },
                  { key: 'vs', label: 'Comparison', span: 5 },
                ]}
                rows={benchmarkRows}
              />
            </article>

            {/* 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead n="06" pill="Decision Guide" title="When PAK Streaming Makes Sense (and When It Does Not)">
                <P className="max-w-3xl">We always tell developers not to over-engineer this if they do not need it.</P>
              </EntryHead>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                <div className="bg-zinc-50 border border-zinc-200 p-5">
                  <H4>Skip PAK streaming if you have</H4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check>One single property and one fixed finish palette.</Check>
                    <Check>Everyone viewing it on a local PC or headset at a single launch event.</Check>
                  </div>
                  <P className="mt-3">A standard build is faster and cheaper.</P>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 p-5">
                  <H4>Use PAK streaming when you have</H4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check>Multiple unit types, or frequent interior updates.</Check>
                    <Check>A sales team spread across different cities.</Check>
                    <Check>International buyers who need to tour properties remotely from home.</Check>
                  </div>
                </div>
              </div>
              <P className="mt-6 max-w-3xl">
                If you are planning a multi-unit VR sales platform and want to see how this architecture fits your project, explore our <Int href="/project/hyper-real-estate">Hyper Real Estate case study</Int> or book a quick scoping call with <Int href="/contact">our team</Int>.
              </P>
            </article>

            {/* FAQ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead n="07" pill="FAQ" title="Frequently Asked Questions" />
              <div className="space-y-6 max-w-3xl">
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">{f.q}</h4>
                    <P>{f.a}</P>
                  </div>
                ))}
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Planning a Multi-Unit VR Sales Platform?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Book a quick scoping call and we will show how this architecture fits your project.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-pak-streaming"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Scoping Call</span>
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
                3D interactive experience agency delivering Unreal Engine 5 simulations, VR/MR training, WebGL configurators and engineering visualizations for clients in the US, UK, and Australia.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CrossPlatformVrPakStreamingArticle;
