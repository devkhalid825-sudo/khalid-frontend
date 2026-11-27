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

// VR/MR-relevant images from the asset library — swap paths as needed.
import _heroImg from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223251.jpg'; // hero: VR hand-tracking menu
import _imgOne from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223315.jpg';
import _imgTwo from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223419.jpg';
import _imgThree from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223333.jpg';
import _imgFour from '../../assets/blogs-image/elipsestudio.com.hyperrealestate-20260522-223517.jpg';

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
        alt={alt || cap || 'Mixed reality VR training simulation by Elipse Studio'}
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

// External source link (only URLs supplied by the editorial review are linked).
const SrcLink = ({ href, children }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
      {children}
    </a>
  ) : (
    <span className="font-semibold text-zinc-800">{children}</span>
  );

const roleRows = [
  { role: 'Trainee', capability: 'Full interaction: operates equipment, triggers consequences, completes steps', user: 'Apprentice, field technician' },
  { role: 'Ghost Observer', capability: 'Invisible presence: sees trainee view, cannot interact; ideal for peer review', user: 'Trainee colleague, assessor' },
  { role: 'Instructor / God View', capability: 'Elevated overhead view, freeze/branch/reset controls, alert injection, debrief overlay', user: 'Trainer, supervisor' },
];

const xapiRows = [
  { stmt: 'attempted', value: 'Feeder-7 LOTO Sequence', use: 'Enrollment tracking' },
  { stmt: 'completed', value: 'Feeder-7 LOTO Sequence', use: 'Completion certificate trigger' },
  { stmt: 'passed / failed', value: 'Score 91/100', use: 'Competency record' },
  { stmt: 'experienced', value: 'Incorrect isolation: high-severity deviation', use: 'Error pattern analysis' },
  { stmt: 'interacted', value: 'Permit signed with wrong feeder selected', use: 'Root-cause reporting' },
];

const modeDecisionRows = [
  { scenario: 'LOTO practice on real switchboard panel', mode: 'MR Passthrough', why: 'Builds muscle memory on actual hardware geometry' },
  { scenario: 'Energized equipment isolation (no live panel available)', mode: 'Full VR', why: 'Full simulation of panel needed; no physical anchor' },
  { scenario: 'Gas turbine internal inspection sequence', mode: 'Full VR', why: 'No physical prop possible; photorealistic 3D model required' },
  { scenario: 'Electrical test instrument familiarization', mode: 'MR Passthrough', why: 'Real meter + digital overlay teaches actual device workflow' },
  { scenario: 'Emergency evacuation drill', mode: 'Full VR', why: 'Scenario requires spatial scale impossible in a training room' },
  { scenario: 'Confined space entry permit procedure', mode: 'MR Passthrough', why: 'Real confined-entry props with virtual hazard overlays' },
  { scenario: 'Substation switching order verification', mode: 'MR Passthrough', why: 'Real one-line diagram + AR annotation layer' },
  { scenario: 'Wind turbine nacelle fault diagnosis', mode: 'Full VR', why: '1:1 scale model only feasible in full virtual environment' },
];

const tcoRows = [
  { cat: 'Initial build / development', rig: '$180,000–$280,000', vr: '$90,000–$160,000', note: 'VR: custom UE5 scenario development' },
  { cat: 'Hardware & maintenance', rig: '$60,000–$120,000', vr: '$25,000–$50,000', note: 'VR: Quest 3 fleet + replacement cycle' },
  { cat: 'Instructor time (facilitation)', rig: '$120,000–$200,000', vr: '$40,000–$80,000', note: 'VR reduces ratio; God View scales sessions' },
  { cat: 'Scenario updates / refreshes', rig: '$80,000–$150,000', vr: '$20,000–$50,000', note: 'VR: asset update vs. rig rebuild' },
  { cat: 'Compliance logging & admin', rig: '$30,000–$60,000', vr: '$5,000–$15,000', note: 'VR: automated xAPI records' },
  { cat: 'Estimated 5-year total', rig: '$470,000–$810,000', vr: '$180,000–$355,000', note: 'Illustrative benchmark only' },
];

const roadmapRows = [
  { phase: 'Phase 0', time: 'Weeks 1–2', deliverables: 'Training needs analysis, scenario prioritization workshop, technical environment survey', sign: 'Approved scenario list' },
  { phase: 'Phase 1', time: 'Weeks 3–8', deliverables: 'Pilot scenario (1 procedure, single-user, Quest 3 standalone): concept art, UE5 grey-box, 3D model integration, interaction logic', sign: 'Pilot demo approved' },
  { phase: 'Phase 2', time: 'Weeks 9–14', deliverables: 'Multi-user session layer, instructor God View dashboard, session logging, xAPI/SCORM LMS integration', sign: '10-trainee live test' },
  { phase: 'Phase 3', time: 'Weeks 15–20', deliverables: 'MR passthrough mode, scenario branching expansion, error-recovery sub-procedures, localization', sign: 'Full pilot sign-off' },
  { phase: 'Phase 4', time: 'Weeks 21–28', deliverables: '2–3 additional scenarios, air-gapped deployment package, offline sync utility', sign: 'Curriculum v1 delivered' },
  { phase: 'Phase 5', time: 'Weeks 29–36', deliverables: 'Instructor certification content, train-the-trainer program, year-1 support & update SLA', sign: 'Program live' },
];

const MrVrTrainingEnergyArticle = () => {
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
    'MR PASSTHROUGH TRAINING',
    '✦',
    'META QUEST 3',
    '✦',
    'MULTI-USER UE5 LABS',
    '✦',
    'AIR-GAPPED DEPLOYMENT',
    '✦',
    'LOTO & SWITCHGEAR SIMULATION',
    '✦',
    'XAPI & SCORM',
    '✦',
    'TRAINING ROI',
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
              <span className="text-[#4169E1]">Mixed Reality Passthrough &amp; Multi-User VR Training</span>{' '}
              for Trade &amp; Energy Workforce Upskilling
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | November 2026 · 2026 Enterprise Guide · US | UK | AU
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Trainee using Meta Quest 3 mixed reality passthrough for energy and trade safety training"
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
                href="/services/vr-development"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                VR Development Services ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a href="#journal" className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer">
                Read the Enterprise Guide ↓
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
                Executive Briefing · Trade &amp; Energy Workforce Training
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Practice Energized Panel Isolation Without Risk to People or Hardware
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                Arc-flash incidents represent a severe and costly risk for US utilities and trade contractors. According to Eaton and The Fire Protection Research Foundation, 5 to 10 arc-flash explosions occur in the United States every day, resulting in more than 2,000 burn-center admissions annually. The cost of a single arc-flash burn injury ranges from $10,000 to $15,000,000 USD depending on voltage and severity. In one documented utility, electrical injuries represented more than 2% of accidents but 28% to 52% of total injury costs.
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans mb-3">
                Sources: <SrcLink>Eaton arc-flash statistics</SrcLink> · <SrcLink href="https://www.osha.gov/electrical/flash-hazards">OSHA electrical flash hazards</SrcLink>
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-3">
                Yet most trade and energy training still relies on video modules and static diagrams. Meta Quest 3 Mixed Reality passthrough and multi-user Unreal Engine 5 labs let workers repeat dangerous procedures (LOTO sequences, switchgear isolation, arc-flash boundary identification) in a photorealistic environment that mirrors real equipment, without risk to people, hardware or continuity of supply.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide is written for technical college directors, utility training managers and industrial safety leads in the US, UK and Australia.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">Verified Training Outcomes · PwC VR Training Study</p>
              <div className="grid grid-cols-1 gap-3">
                <Stat v="Up to 4×" l="Faster to Train" s="than classroom learning" />
                <Stat v="Up to 275%" l="More Confident" s="applying learned skills vs. classroom" />
                <Stat v="3.75×" l="More Emotionally Connected" s="to content than classroom learners" />
                <Stat v="52%" l="More Cost-Effective" s="than classroom at 3,000 learners" />
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed mt-3">
                Cost parity between VR and classroom training is reached at 375 learners. Beyond that threshold, VR training becomes progressively more cost-effective at scale. Source: <SrcLink>PwC Emerging Technology: Virtual Reality Study</SrcLink>
              </p>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">MR Passthrough &amp; Multi-User VR Training Architecture</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · November 2026</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <EntryNumber n="01" />
                  <Pill>The Transfer Gap</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Why Passive Video Fails High-Risk Hands-On Training
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-5">
                    Trainees can recall a procedure in the context they learned it, but performance drops sharply when the panel manufacturer changes, the floor is noisy or time is short. Cognitive science calls this encoding specificity; practitioners call it the &lsquo;textbook effect&rsquo;.
                  </p>

                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">1.1 The Three Transfer-Gap Drivers</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Context mismatch">Video shows one camera angle; real switchboards need 3D orientation, panel identification from multiple approaches and coordination with colleagues.</Check>
                    <Check title="Missing consequence feedback">Video cannot register that a trainee would have de-energized the wrong feeder. Simulation makes the consequence immediate.</Check>
                    <Check title="No procedural interleaving">Real LOTO sequences branch when conditions change; video plays linearly regardless of operator action.</Check>
                  </div>
                </div>
                <Frame
                  src={imgOne}
                  cap="Immersive simulation encodes decisions and muscle memory in the context the work will happen"
                  alt="Trainee practicing procedures in an immersive VR training simulation"
                />
              </div>

              <Delivers label="1.2 Verified Industry Evidence: EPRI VR Initiatives">
                EPRI&apos;s Virtual Reality Substation initiative enables digital twin training without the safety or logistical burden of live station access. EPRI&apos;s Nuclear Plant Modernization brief (MTA-TR-002) documents that VR eliminates physical mock-up costs, reduces trainee travel, and typically reaches payback within 1 year.
              </Delivers>
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans mt-3">
                Sources: <SrcLink href="https://transmission.epri.com/mts">EPRI Virtual Reality Substation initiative</SrcLink> · <SrcLink href="https://nuclearplantmod.epri.com/MTA-TR-002">EPRI Nuclear MTA-TR-002</SrcLink>
              </p>
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="02" />
                <Pill>Architecture Decision</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Full VR Immersion vs Meta Quest 3 Mixed Reality Passthrough
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The earliest architecture decision is whether trainees work in a fully virtual environment or in an MR overlay on their real workspace. Neither is universally superior; it depends on the training objective, the physical space and the trainee population.
                </p>
              </div>

              <div className="mt-8">
                <DataTable
                  icon={FiLayers}
                  title="Decision Framework: Which Mode to Choose"
                  cols={[
                    { key: 'scenario', label: 'Scenario', span: 5 },
                    { key: 'mode', label: 'Recommended Mode', span: 3, strong: true },
                    { key: 'why', label: 'Rationale', span: 4 },
                  ]}
                  rows={modeDecisionRows}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start md:items-center">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">UE5 MR Passthrough Pipeline on Quest 3:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Scene Understanding API">Reconstructs a mesh of the real room so virtual objects anchor to real surfaces and occlude correctly.</Check>
                    <Check title="Passthrough Projection Layer">Camera feed composited as background with virtual geometry at correct depth.</Check>
                    <Check title="Hand Tracking + Passthrough Hands">Trainees see their real hands working alongside virtual elements.</Check>
                    <Check title="Spatial Anchors API">A holographic switchboard overlay locks to the same physical spot across sessions.</Check>
                    <Check title="Dynamic Resolution Scaling">TSR holds 90 fps in the 2064×2208 per-eye framebuffer during complex scenes.</Check>
                  </div>
                  <Delivers label="Design Principle: The Physical Anchor">
                    The best MR simulations are built around a simplified real object, such as a correctly dimensioned panel mockup, a real tool set or a physical lockout board, that the trainee can touch. A virtual overlay then adds information layers, hazard indicators and consequence feedback the prop cannot provide alone.
                  </Delivers>
                </div>
                <Frame
                  src={imgTwo}
                  cap="MR passthrough overlays digital hazard layers onto real, touchable equipment"
                  alt="Mixed reality passthrough overlay on a physical panel mockup"
                />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="03" />
                <Pill>Multi-User Sync</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Instructor God View, Ghost Observer Mode &amp; Shared Scenario State
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Single-trainee simulation is useful for initial skill building; it cannot replicate the communication, coordination and decision-making demands of a multi-person switching order or a permit-to-work handover. Elipse builds multi-user sessions with three participant roles.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="Participant Roles"
                cols={[
                  { key: 'role', label: 'Role', span: 3 },
                  { key: 'capability', label: 'Capability', span: 6, strong: true },
                  { key: 'user', label: 'Typical User', span: 3 },
                ]}
                rows={roleRows}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start md:items-center">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">3.1 Instructor Dashboard Controls</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Freeze frame">Pauses scenario mid-action for group discussion without resetting progress.</Check>
                    <Check title="Branch injection">Triggers unexpected fault conditions (e.g., breaker fails to open) to test response.</Check>
                    <Check title="Alert overlay">Highlights the step a trainee is about to perform incorrectly before consequences occur.</Check>
                    <Check title="Session replay">Full 3D playback of any session for debrief; camera follows any participant.</Check>
                    <Check title="Automated scoring">Procedural step completion logged against an approved procedure checklist; deviations flagged with severity rating.</Check>
                  </div>
                </div>
                <Frame
                  src={imgThree}
                  cap="Instructor dashboard tracks every trainee's progress, errors and time-on-task"
                  alt="Instructor dashboard monitoring multi-user VR training session"
                />
              </div>

              <div className="mt-10">
                <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-2">3.2 xAPI / SCORM LMS Integration</h4>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  Every session generates structured xAPI statements: actor, verb, object, result, context. These pipe directly into any LRS (Learning Record Store) or SCORM-compliant LMS.
                </p>
                <DataTable
                  icon={FiLayers}
                  title="xAPI Statements"
                  cols={[
                    { key: 'stmt', label: 'xAPI Statement', span: 3 },
                    { key: 'value', label: 'Example Value', span: 5, strong: true },
                    { key: 'use', label: 'LMS Use', span: 4 },
                  ]}
                  rows={xapiRows}
                />
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mt-4">
                  The instructor dashboard flags automatically when a trainee proceeds to high-severity deviations, such as operating equipment with the permit unsigned.
                </p>
              </div>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="04" />
                <Pill>Offline &amp; Air-Gapped</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Offline &amp; Air-Gapped Facility Deployment
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Facilities under NERC CIP (North America), NIS2 (European critical infrastructure) and ISM (Australian government-adjacent sites) cannot connect training hardware to the public internet in operation. Elipse designs every enterprise training application to run fully offline from the first deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-8 items-start">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">Packaging a Standalone UE5 Build:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Build target">Android APK for Quest 3 (ARM64, Vulkan, OpenXR) with cooked asset bundles embedded, so nothing downloads at runtime.</Check>
                    <Check title="Sideloading">Signed APK plus SideQuest or MDM bundle; one-time USB-C/ADB install per headset, no Meta account in Quest for Business mode.</Check>
                    <Check title="Local data">Event logs write to headset storage as JSON; a sync utility pulls them over USB-C to a local PC for HR/LMS import.</Check>
                    <Check title="Updates">New APK versions are distributed on USB drive; no OTA infrastructure required.</Check>
                    <Check title="Licensing">Hardware-locked license keys; no call-home required for validation.</Check>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-3">SCORM / xAPI for Air-Gapped LMS:</h4>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="xAPI with local LRS">An on-premise Learning Record Store receives session statements over a LAN-only endpoint.</Check>
                    <Check title="Batch SCORM export">Where no real-time LRS exists, session JSON converts to SCORM 1.2 completion packages for manual import.</Check>
                    <Check title="LDAP/AD binding">Kiosk mode ties sessions to employee IDs from on-premise Active Directory, with no cloud SSO.</Check>
                  </div>
                  <Delivers label="4.1 Regulatory Context: NERC CIP Compliance">
                    Personnel and training requirements for critical infrastructure are governed by NERC CIP-004-6 and its active successor CIP-004-7. These standards mandate documented training programs, personnel risk assessments and access management for anyone with access to BES Cyber Systems. VR training logs and xAPI records serve as audit-ready evidence of CIP-compliant training completion.
                  </Delivers>
                  <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans mt-3">
                    Sources: <SrcLink>NERC CIP-004-6</SrcLink> · <SrcLink>NERC CIP-004-7</SrcLink>
                  </p>
                </div>
              </div>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start mb-8">
                <div>
                  <EntryNumber n="05" />
                  <Pill>ROI &amp; Business Case</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Illustrative 5-Year TCO Scenario (Based on Typical Utility Pilot Scope)
                  </h3>
                  <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    <strong>Important:</strong> the figures below represent an illustrative 5-year TCO scenario based on typical utility pilot scopes. They are a scoping benchmark, not a cited third-party study. Actual costs vary by scenario count, headset fleet size, LMS integration complexity and site-specific requirements. Request a detailed scoping estimate for your project.
                  </p>
                  <Delivers label="5.1 The Cost of Physical Incidents">
                    To contextualize VR training investment, consider the cost of the arc-flash incidents it aims to prevent. Per Eaton and OSHA data, a single arc-flash burn injury costs between $10,000 and $15,000,000 USD depending on voltage and severity. In one documented utility, electrical injuries represented more than 2% of accidents but 28% to 52% of total injury costs, making even a partial reduction in incident frequency a significant financial and human benefit.
                  </Delivers>
                  <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans mt-3">
                    Sources: <SrcLink>Eaton arc-flash statistics</SrcLink> · <SrcLink href="https://www.osha.gov/electrical/flash-hazards">OSHA electrical flash hazards</SrcLink>
                  </p>
                </div>
                <Frame
                  src={imgFour}
                  cap="Simulation is a capital investment amortized across every cohort"
                  alt="Enterprise VR training program return on investment"
                />
              </div>

              <DataTable
                icon={FiDollarSign}
                title="5.2 Illustrative 5-Year Cost: Physical Rig vs. VR Simulation"
                cols={[
                  { key: 'cat', label: 'Cost Category', span: 3 },
                  { key: 'rig', label: 'Physical Rig (5 Yr)', span: 3 },
                  { key: 'vr', label: 'VR Simulation (5 Yr)', span: 3, strong: true },
                  { key: 'note', label: 'Notes', span: 3 },
                ]}
                rows={tcoRows}
              />
              <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans mt-3">
                These figures are illustrative estimates based on typical utility pilot scopes, not third-party benchmarks. Engage Elipse Studio for a project-specific scoping estimate.
              </p>
            </article>

            {/* ENTRY 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="06" />
                <Pill>Implementation Blueprint</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Phased Engagement Roadmap
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Our standard commercial structure for utility and industrial clients moves from needs analysis to a single pilot, then multi-user, MR and the wider curriculum, each with a clear sign-off gate.
                </p>
              </div>

              <DataTable
                icon={FiLayers}
                title="Phased Engagement Roadmap"
                cols={[
                  { key: 'phase', label: 'Phase', span: 2 },
                  { key: 'time', label: 'Timeline', span: 2 },
                  { key: 'deliverables', label: 'Deliverables', span: 5, strong: true },
                  { key: 'sign', label: 'Milestone', span: 3 },
                ]}
                rows={roadmapRows}
              />

              <Delivers label="Quick Win">
                The fastest way to convince a skeptical budget committee: run one VR pilot cohort and one comparable classroom cohort on the same procedure, then compare their physical equipment checks 30 days later. The delta is usually large enough to make the financial case without advanced statistics.
              </Delivers>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <EntryNumber n="07" />
                <Pill>Partner With Elipse</Pill>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                  Partner With Elipse Studio
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                  Elipse Studio builds enterprise VR and MR training for energy utilities, heavy industry and trade education across the US, UK and Australia. Our team combines Unreal Engine 5 development with instructional design to deliver simulations that change behavior, not just tick compliance boxes. All applications are built for air-gapped deployment from the outset: security is a design constraint, not a retrofit.
                </p>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Explore our{' '}
                  <Link href="/services/vr-development" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    VR Development Services
                  </Link>{' '}
                  or view our{' '}
                  <Link href="/portfolio" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                    recent immersive deployments
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
              Ready to Scope Your VR Training Program?
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Book a Complimentary Training Needs Workshop
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Tell us your priority procedures, headset fleet and LMS setup, and we will return a scenario list, hardware topology recommendation and ROI model.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-mr-training"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Training Needs Workshop</span>
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
                3D interactive experience agency delivering Unreal Engine 5 simulations, VR/MR training, WebGL configurators and engineering visualizations for industrial clients in the US, UK, and Australia.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MrVrTrainingEnergyArticle;
