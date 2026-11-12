'use client';

import React, { useEffect, useState, useRef } from 'react';
import { m as motion } from 'framer-motion';
import Link from 'next/link';
import { getImgSrc } from '../utils/api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ScopingFunnel from './features/ScopingFunnel';
import PageFaq from './features/PageFaq';
import { ABOUT_FAQS } from '@/seo/pageFaqs';

import leapHeroRaw from '../assets/ElipseImages/personal/leap-hero.webp';
import bilalImgRaw from '../assets/About-page/bilalbhaiimage.jpeg';
import maazImgRaw from '../assets/About-page/maazbhaiimage.jpg';
import asadImgRaw from '../assets/About-page/Asadbhai.jpeg';
import fahadImgRaw from '../assets/About-page/fahadbhaiimage.jpeg';

const heroImg = getImgSrc(leapHeroRaw);
const bilalImg = getImgSrc(bilalImgRaw);
const maazImg = getImgSrc(maazImgRaw);
const asadImg = getImgSrc(asadImgRaw);
const fahadImg = getImgSrc(fahadImgRaw);

const statsData = [
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Global Clients', value: '80+' },
  { label: 'Years in Production', value: '5+' },
  { label: '3D & Engineering Specialists', value: '30+' },
];

// The server HTML carries the real number (crawlers and no-JS visitors used to
// see "0+"). In the browser, a counter that is still below the fold is reset
// to 0 and counts up when scrolled into view; one already on screen stays put.
const AnimatedCounter = ({ value, suffix }) => {
  const num = parseInt(value);
  const [count, setCount] = useState(num);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasAnimated(true);
      return;
    }
    setCount(0);
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

  return <span ref={ref}>{count}{suffix || (value.includes('+') ? '+' : '')}</span>;
};

const footprintData = [
  {
    eyebrow: 'Karachi, Pakistan',
    title: 'Core Studio & Engineering HQ',
    description:
      'Our main 30+ specialist studio housing founding leadership, Unreal Engine developers, WebGL engineers, CAD optimizers, and CGI look-dev directors.',
  },
  {
    eyebrow: 'Hanover Park, Illinois, USA',
    title: 'US Sales Presence',
    description:
      'Dedicated North American sales representatives supporting client discovery and US time-zone coordination.',
  },
];

const marketsServed = ['USA', 'UK', 'UAE', 'Saudi Arabia', 'Singapore', 'Australia'];

// linkedin: add each leader's profile URL here once collected; the link renders only when set.
const teamData = [
  {
    name: 'Bilal Lania',
    role: 'CEO & Co-Founder',
    credential: 'Spatial Commerce Strategy & Enterprise Client Delivery',
    linkedin: '',
    img: bilalImg,
    imgClass: 'scale-[1.28] origin-[center_75%] group-hover:scale-[1.33]',
    imgStyle: { objectPosition: 'center 75%' },
  },
  {
    name: 'Syed Maaz Ali',
    role: 'Co-Founder & Technical Director',
    credential: 'Unreal Engine 5, WebRTC & Real-Time Architecture',
    linkedin: '',
    img: maazImg,
    imgStyle: { objectPosition: 'center 68%' },
    imgClass: 'scale-[1.16] origin-[center_68%] group-hover:scale-[1.22]',
  },
  {
    name: 'Asad Khan',
    role: 'Co-Founder & Head of CG',
    credential: 'Commercial Look-Dev, CGI & Anamorphic Direction',
    linkedin: '',
    img: asadImg,
  },
  {
    name: 'Fahad Nadeem',
    role: 'Development Head',
    credential: 'Full-Stack WebGL, Shopify Plus & CRM Integrations',
    linkedin: '',
    img: fahadImg,
  },
];

const techStack = [
  'Unreal Engine 5',
  'PlayCanvas',
  'Three.js / WebGL',
  'WebGPU',
  'WebRTC Pixel Streaming',
  'Meta Quest VR',
  'Shopify Plus',
  'HubSpot CRM',
  'Maya',
  '3ds Max',
  'Blender',
  'Redshift',
  'Nuke',
];

const engagementModels = [
  {
    number: '01',
    title: 'Fixed-Scope Builds',
    description:
      'End-to-end 3D configurators, virtual property suites, or CGI campaigns delivered in 4 to 10 weeks with clear milestones and 100% client-owned code.',
  },
  {
    number: '02',
    title: 'Dedicated Real-Time Pods',
    description:
      'Embedded WebGL engineers, Unreal Engine developers, and 3D technical artists working directly alongside your internal product and marketing teams.',
  },
  {
    number: '03',
    title: 'White-Label Agency Partner',
    description:
      'Confidential, high-velocity 3D and interactive engineering for global creative, digital, and automotive agencies.',
  },
];

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">{eyebrow}</span>
    <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">{title}</h2>
    {subtitle && (
      <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">{subtitle}</p>
    )}
  </motion.div>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#0a0a0a] text-white min-h-screen font-sans relative"
    >
      <Header />

      {/* ===== HERO & STUDIO THESIS ===== */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center px-5 md:px-16 lg:px-24 pt-28 pb-16 md:pt-32 md:pb-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[#4169E1] text-[11px] md:text-sm tracking-[0.25em] uppercase font-semibold"
              >
                About Elipse Studio · Karachi HQ &amp; US Sales Presence
              </motion.p>
              <div className="overflow-hidden mt-4">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2rem,4.2vw,4.25rem)] font-semibold tracking-tighter leading-[1.05] text-white"
                >
                  Most 3D studios only care about pretty renders.{' '}
                  <span className="text-[#4169E1]">We build for commercial conversion.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 text-white/60 text-sm md:text-lg font-light max-w-2xl leading-relaxed"
              >
                Most dev shops do not understand real-time graphics, and most 3D agencies do not understand e-commerce
                pipelines or enterprise sales cycles. We built Elipse Studio to bridge game-engine engineering with
                commercial design, giving global brands 100% ownership of fast, interactive 3D tools that sell products
                and properties before they exist.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-8 sm:mt-10 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5"
              >
                <Link
                  href="/portfolio"
                  data-el-track="explore-work-about-hero"
                  className="relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-[#3558D4] text-white text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#2A48B8] transition-all duration-300 text-center shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40 whitespace-nowrap w-auto"
                >
                  Explore Our Work ↘
                </Link>
                <a
                  href="#team"
                  className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 border border-white/20 text-white/70 hover:text-white text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 text-center whitespace-nowrap w-auto"
                >
                  Meet the Team ↓
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
                    <div key={stat.label}>
                      <span className="text-xl md:text-[2rem] font-bold text-white tabular-nums tracking-tight">
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/35 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 hidden lg:block relative">
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl overflow-hidden border border-white/[0.06] w-full h-[500px] lg:h-[600px] xl:h-[680px]"
              >
                <img
                  src={heroImg}
                  alt="Elipse Studio team presenting real-time 3D work"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 35%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL FOOTPRINT ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading eyebrow="Global Footprint" title="Where we work." />
          <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {footprintData.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500"
              >
                <span className="text-[#4169E1] text-xs font-bold tracking-[0.2em] uppercase">{card.eyebrow}</span>
                <h3 className="mt-3 text-lg md:text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-white/60 text-sm md:text-base font-light">
            <span className="text-white font-semibold">Markets served:</span> active deployments across the{' '}
            {marketsServed.slice(0, -1).join(', ')}, and {marketsServed[marketsServed.length - 1]}.
          </p>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section id="team" className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16 scroll-mt-24">
        <div className="max-w-[1750px] mx-auto">
          <SectionHeading eyebrow="Leadership" title="Meet the Team" />
          <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
            {teamData.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-[#4169E1]/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(65,105,225,0.15)]">
                  <img
                    src={member.img}
                    alt={`${member.name}, ${member.role} at Elipse Studio`}
                    width="500"
                    height="660"
                    style={member.imgStyle}
                    className={`w-full h-full object-cover transition-transform duration-500 ${member.imgClass || 'group-hover:scale-105'}`}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#4169E1] font-medium">{member.role}</p>
                  <p className="mt-2 text-sm text-white/60 font-light">{member.credential}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-[#4169E1] transition-colors"
                    >
                      <LinkedInIcon /> LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENGINEERING DNA (TECH STACK STRIP) ===== */}
      <section className="py-12 md:py-24 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading eyebrow="Technology" title="Our Engineering DNA." />
          <ul className="mt-8 md:mt-14 flex flex-wrap justify-center gap-2.5 md:gap-3">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="stack-chip px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-white/80 text-xs md:text-sm font-medium"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== ENGAGEMENT MODELS ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1750px] mx-auto">
          <SectionHeading eyebrow="How Clients Work With Us" title="Built for how enterprise teams buy." />
          <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.number}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-[#4169E1] text-xs font-bold tracking-[0.25em] uppercase">Model {model.number}</span>
                <h3 className="mt-3 text-lg md:text-2xl font-semibold text-white">{model.title}</h3>
                <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageFaq faqs={ABOUT_FAQS} title="Studio FAQ" eyebrow="FAQ" id="about-faq" />
      <ScopingFunnel formId="about_scoping_funnel" />
      <Footer />
    </motion.div>
  );
};

export default AboutPage;
