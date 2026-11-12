'use client';

import React, { useEffect, useState, useRef } from 'react';
import { m as motion } from 'framer-motion';
import Link from 'next/link';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ScopingFunnel from './features/ScopingFunnel';
import PageFaq from './features/PageFaq';
import { CAPABILITIES_FAQS } from '@/seo/pageFaqs';
import { getImgSrc } from '../utils/api';

import capabilitiesHeroImgRaw from '../assets/About-page/capabilities.webp';

const capabilitiesHeroImg = getImgSrc(capabilitiesHeroImgRaw);

const statsData = [
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Global Clients', value: '80+' },
  { label: 'Years in Production', value: '5+' },
  { label: 'Industries Served', value: '12+' },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const num = parseInt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasAnimated(true);
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setCount(num);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, hasAnimated]);

  return <span ref={ref}>{hasAnimated ? count : 0}{suffix || (value.includes('+') ? '+' : '')}</span>;
};

// Three enterprise pillars
const capabilitiesData = [
  {
    pillarNumber: '01',
    link: '/services/3d-product-configurators',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Interactive 3D Configurators',
    description: 'Real-time product builders engineered with PlayCanvas, Three.js / WebGL, WebGPU, and Unreal Engine 5 Pixel Streaming, wired directly to Shopify Plus, HubSpot, and ERP quoting pipelines.',
    features: [
      'Automotive & Transport Configurators',
      'Modular CPQ & BOM Builders',
      'E-Commerce Customizers',
      'Virtual Showrooms & Digital Twins',
    ],
  },
  {
    pillarNumber: '02',
    link: '/services/architectural-visualization',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time ArchViz & Interactive Virtual Tours',
    description: 'Interactive virtual tours and VR sales galleries backed by a complete property launch suite: 3D CGI visualizations, 360 web tours, and 4K cinematic property films.',
    features: [
      'Interactive Virtual Tours & Meta Quest VR',
      'Browser-Streamed Property Walkthroughs',
      'Photorealistic 3D CGI Stills',
      '360 Panoramic Tours & Drone Matchmoving',
    ],
  },
  {
    pillarNumber: '03',
    link: '/services/3d-product-visualization',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="10 8 16 12 10 16 10 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'CGI Production Studio',
    description: 'Cinema-grade commercial animation, photorealistic CPG renders, AI-accelerated production, and giant naked-eye 3D anamorphic LED billboard campaigns.',
    features: [
      '3D Product Animation & Fluid Dynamics',
      'Forced-Perspective 3D Anamorphic Billboards',
      'AI Commercials & Hybrid CGI',
      'Character Animation & Motion Graphics',
    ],
  },
];

const processData = [
  {
    number: '01',
    title: 'CAD Ingestion & Retopology',
    description: 'Ingest raw engineering schematics and architectural BIM models, optimizing polygon budgets without losing sub-millimeter silhouette accuracy.',
  },
  {
    number: '02',
    title: 'Shaders & Parametric Rules',
    description: 'Author physically accurate PBR materials, multi-environment lighting (Day, Night, Studio), and CPQ constraint logic that prevents invalid builds.',
  },
  {
    number: '03',
    title: 'Checkout & CRM API Bridges',
    description: 'Connect 3D selections directly to Shopify cart line items, dynamic pricing engines, and automated HubSpot or Salesforce deal records.',
  },
  {
    number: '04',
    title: 'Edge Streaming & QA',
    description: 'Validate 60 FPS frame rates, Google Lighthouse scores, and cross-device responsiveness across iOS Safari, Android Chrome, VR headsets, and desktop.',
  },
];

// 4-layer engineering & technology stack
const stackLayers = [
  {
    number: '01',
    title: 'CAD & Asset Optimization',
    tools: ['SolidWorks', 'STEP', 'IGES', 'Rhino', 'Revit', 'AutoCAD', 'Draco geometry compression', 'KTX2 / Basis Universal textures'],
    note: 'Targeting sub-2MB mobile WebGL payloads.',
  },
  {
    number: '02',
    title: 'Real-Time & Cloud Rendering Engines',
    tools: ['Unreal Engine 5 (Nanite & Lumen)', 'WebRTC Cloud Pixel Streaming', 'PlayCanvas', 'Three.js / WebGL', 'WebGPU'],
    note: 'Sub-50ms streaming latency and 60 FPS mobile performance.',
  },
  {
    number: '03',
    title: 'Commerce, CPQ & CRM Integrations',
    tools: ['Shopify Storefront API', 'WooCommerce', 'HubSpot CRM Deals', 'Salesforce CPQ', 'Automated BOM JSON payloads', 'Headless checkout bridges'],
  },
  {
    number: '04',
    title: 'CGI, VFX & Spatial Hardware',
    tools: ['Maya', '3ds Max', 'Blender', 'Redshift', 'V-Ray', 'Nuke', 'After Effects', 'Meta Quest 3', 'PCVR', 'Offline desktop executables (Windows .exe & macOS)'],
  },
];

const CapabilitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#0a0a0a] text-white min-h-screen font-sans"
      >
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen overflow-hidden bg-black">
          <Header />

          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-32 right-[15%] w-20 h-20 border border-white/5 rounded-lg hidden md:block"
          />
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-40 left-[10%] w-16 h-16 border border-white/5 rounded-full hidden md:block"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 right-[8%] w-40 h-40 bg-[#3558D4]/5 rounded-full blur-sm hidden md:block"
          />

          <div className="relative z-10 min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center px-5 md:px-16 lg:px-24 pt-28 pb-16 md:pt-32 md:pb-16">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[#4169E1] text-[11px] md:text-sm tracking-[0.25em] uppercase font-semibold"
                >
                  Technical Capabilities &amp; Pipelines
                </motion.p>
                <div className="overflow-hidden mt-4">
                  <motion.h1
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(2rem,4.2vw,4.25rem)] font-semibold tracking-tighter leading-[1.05] text-white"
                  >
                    Real-time 3D engineering, spatial pipelines, and{' '}
                    <span className="text-[#4169E1]">CGI capabilities.</span>
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 text-white/60 text-sm md:text-lg font-light max-w-xl leading-relaxed"
                >
                  How we turn raw CAD models and architectural blueprints into sub-2MB WebGL experiences, cloud-streamed Unreal Engine 5 worlds, and cinema-grade commercials.
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="mt-8 sm:mt-10 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5"
                >
                  <Link
                    href="#start-project"
                    data-el-track="get-in-touch-capabilities-hero"
                    className="relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-[#3558D4] text-white text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#3a5ecc] transition-all duration-300 text-center shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40 whitespace-nowrap w-auto"
                  >
                    Start Your Project ↗
                  </Link>
                  <a
                    href="#capabilities"
                    className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-white/20 text-white/70 hover:text-white text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 text-center whitespace-nowrap w-auto"
                  >
                    Explore Services ↘
                  </a>
                </motion.div>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.04] w-full"
                >
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 md:gap-x-14 md:gap-y-5">
                    {statsData.map((stat) => (
                      <div key={stat.label} className="min-w-[90px]">
                        <span className="text-xl md:text-[2rem] font-bold text-white tabular-nums tracking-tight leading-normal inline-block">
                          <AnimatedCounter value={stat.value} />
                        </span>
                        <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/35 font-medium">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-6 hidden lg:block relative">
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[680px]">
                    <img
                      src={capabilitiesHeroImg}
                      alt="Elipse Studio capabilities"
                      width="800"
                      height="680"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4 text-white/15"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </section>


        {/* ===== CORE CAPABILITIES ===== */}
        <section id="capabilities" className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">What We Do</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Our Three Core Pillars</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                Three engineering disciplines, one pipeline: interactive configurators, real-time ArchViz, and commercial CGI.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {capabilitiesData.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#4169E1]/40 text-xs font-bold tracking-[0.25em] uppercase">Pillar {cap.pillarNumber}</span>
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#3558D4]/10 flex items-center justify-center group-hover:bg-[#3558D4]/20 transition-colors">
                      <span className="text-[#4169E1]">{cap.icon}</span>
                    </div>
                    <Link href={cap.link}>
                      <h3 className="mt-5 md:mt-6 text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">{cap.title}</h3>
                    </Link>
                    <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed">{cap.description}</p>
                    <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/60 text-sm font-light border-t border-white/5 pt-4 md:pt-6">
                      {cap.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3558D4] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 md:mt-8 pt-5 border-t border-white/5">
                    <Link
                      href={cap.link}
                      className="capabilities-explore-btn w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#3558D4]/10 hover:bg-[#3558D4] text-[#4169E1] hover:!text-white border border-[#4169E1]/30 hover:border-[#4169E1] text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 group/btn shadow-sm hover:shadow-[0_0_20px_rgba(65,105,225,0.35)]"
                    >
                      <span className="transition-colors group-hover/btn:!text-white">Explore</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform group-hover/btn:!text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUR PROCESS ===== */}
        <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">CAD-to-Production Pipeline</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">How We Ship.</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                From raw engineering files to a validated, streamed, and commerce-connected build.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {processData.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative h-full"
                >
                  <div className="relative bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 min-h-[200px] md:min-h-[220px] h-full flex flex-col overflow-hidden group">
                    <span className="text-[#4169E1] text-xs font-bold tracking-[0.25em]">{step.number}</span>
                    <h3 className="mt-3 text-lg md:text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed flex-1">{step.description}</p>
                  </div>
                  {index < processData.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                      <svg className="w-6 h-6 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 4-LAYER ENGINEERING & TECHNOLOGY STACK ===== */}
        <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Technology</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Our Production &amp; Engineering Stack.</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                Four layers, from raw CAD to the screen, the checkout, and the headset.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {stackLayers.map((layer, index) => (
                <motion.div
                  key={layer.number}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500"
                >
                  <span className="text-[#4169E1] text-xs font-bold tracking-[0.25em] uppercase">Layer {layer.number}</span>
                  <h3 className="mt-3 text-lg md:text-2xl font-semibold text-white">{layer.title}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {layer.tools.map((tool) => (
                      <li key={tool} className="stack-chip px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/80 text-xs md:text-sm">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {layer.note && <p className="mt-4 text-white/50 text-sm font-light">{layer.note}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PageFaq faqs={CAPABILITIES_FAQS} title="Technical Pipeline FAQ" eyebrow="FAQ" id="capabilities-faq" />
        <ScopingFunnel formId="capabilities_scoping_funnel" />
        <Footer />
      </motion.div>

    </>

  );
};

export default CapabilitiesPage;
