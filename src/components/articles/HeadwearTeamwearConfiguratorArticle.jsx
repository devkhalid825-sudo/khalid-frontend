'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Real Student Life configurator screenshots only (no AI-generated mockups). Each image is used once.
import _heroImg from '../../assets/About-page/cap-2.png'; // hero: cap trim, bands and stars
import _introImg from '../../assets/web-app-ui/cloth.webp'; // intro: apparel configurator
import _embroideryImg from '../../assets/About-page/cap-23.webp'; // 01: raised gold embroidery
import _shaderImg from '../../assets/About-page/cap-1.webp'; // 02: embroidery options
import _towelImg from '../../assets/About-page/towel.webp'; // 03: Al Karam towel showroom (baked studio lighting)
import _towel2Img from '../../assets/About-page/towel-2.webp'; // 04: Al Karam towel showroom (day/night light mode, sizes)
import _tshirtImg from '../../assets/About-page/t-shirt.png'; // 05: Student Life t-shirt back print
import _caseImg from '../../assets/web-app-ui/cap.webp'; // 06: cap emblem and rosette

const heroImg = getImgSrc(_heroImg);
const introImg = getImgSrc(_introImg);
const embroideryImg = getImgSrc(_embroideryImg);
const shaderImg = getImgSrc(_shaderImg);
const towelImg = getImgSrc(_towelImg);
const towel2Img = getImgSrc(_towel2Img);
const tshirtImg = getImgSrc(_tshirtImg);
const caseImg = getImgSrc(_caseImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

// External source links (real URLs, from the finalized SEO/AEO draft).
const LINKS = {
  shopify: 'https://changelog.shopify.com/posts/shop-adds-3d-and-augmented-reality-ar-previews',
  draco: 'https://developer.playcanvas.com/user-manual/graphics/meshes/compressed-meshes/',
  basis: 'https://developer.playcanvas.com/user-manual/optimization/texture-compression/',
  studentLifeLive: 'https://studenterhue.studentlife.dk/studentlife/?package=standard&program=eux',
  studentLife: 'https://studentlife.dk/',
  trustpilot: 'https://dk.trustpilot.com/review/studentlife.dk',
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
        alt={alt || cap || '3D apparel and headwear configurator by Elipse Studio'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
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

const P = ({ children, className = '' }) => (
  <p className={`text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed ${className}`}>{children}</p>
);

const EntryHead = ({ n, pill, title, children, center = false }) => (
  <div className={`mb-6 ${center ? 'flex flex-col items-center text-center' : ''}`}>
    <EntryNumber n={n} />
    <Pill>{pill}</Pill>
    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">{title}</h3>
    {children}
  </div>
);

const CONFIGURATORS = [
  { href: '/project/cap-configurator', label: 'Student Life Cap Configurator' },
  { href: '/project/t-shirt-configurator', label: 'T-Shirt Configurator' },
  { href: '/project/towel-configurator', label: 'Towel Configurator' },
  { href: '/project/deck-configurator', label: 'Deck Configurator' },
  { href: '/project/seat-configurator', label: 'Seat Configurator' },
  { href: '/project/fruit-configurator', label: 'Fruit Configurator' },
  { href: '/project/kia-configurator', label: 'KIA Sportage Configurator' },
  { href: '/project/volvo-configurator', label: 'Volvo S90 Configurator' },
  { href: '/project/byd-shark-6-configurator', label: 'BYD Shark 6 Configurator' },
  { href: '/project/inverex-configurator', label: 'EV Bike Configurator' },
  { href: '/project/Costa-cart', label: 'Golf Cart Configurator' },
  { href: '/project/yacht-configurator', label: 'Yacht Configurator' },
  { href: '/project/steering-configurator', label: 'BMW Steering Wheel Configurator' },
  { href: '/project/bean-trailer-3d-builder', label: 'Bean Trailer 3D Builder' },
];

const FAQS = [
  {
    q: 'Can a PlayCanvas 3D apparel configurator show realistic embroidery, satin, and glitter in a mobile browser?',
    a: 'Yes. By combining baked ambient occlusion from Autodesk 3ds Max with PBR normal, roughness, and metalness maps in PlayCanvas, mobile browsers can render cotton, satin, velour, metallic thread, and glitter finishes smoothly without plugins.',
  },
  {
    q: 'Why build separate desktop and mobile WebGL builds for a custom apparel configurator?',
    a: 'Mobile browsers have tighter GPU memory and cellular bandwidth limits than desktop computers. Using Draco geometry compression and Basis texture compression on a dedicated mobile tier keeps load times fast and frame rates smooth without sacrificing desktop detail.',
  },
  {
    q: 'Does a PlayCanvas WebGL configurator require cloud GPU servers per user?',
    a: 'No. PlayCanvas runs client-side in the visitor\'s browser, so you pay zero per-session cloud GPU streaming fees even during peak seasonal traffic spikes.',
  },
  {
    q: 'Can custom 3D configurator selections pass directly into Shopify or custom checkouts?',
    a: 'Yes. Selected fabrics, custom embroidery text, zone upgrades, and sizing pass directly into Shopify Plus line-item properties, WooCommerce, or custom ERP/OMS order endpoints alongside live pricing.',
  },
];

const HeadwearTeamwearConfiguratorArticle = () => {
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
    '3D APPAREL CONFIGURATOR', '✦', 'PLAYCANVAS WEBGL', '✦', 'EMBROIDERY SHADERS', '✦',
    'GLITTER FINISHES', '✦', 'LIVE ZONE PRICING', '✦', 'HEADWEAR & TEAMWEAR', '✦',
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
              <span className="text-[#4169E1]">3D Configurators for Custom Apparel, Headwear &amp; Teamwear:</span>{' '}
              Embroidery Shaders, Glitter Finishes &amp; Live Pricing (2026 Guide)
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-3xl mb-4 px-3 leading-relaxed">
              How PlayCanvas WebGL, 3ds Max baked lighting, and dual desktop/mobile builds replace slow 2D mockups with interactive 3D customization and live checkout pricing.
            </p>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | 2026 Guide | US | UK | AU
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Student Life 3D cap configurator with trim, band and star options"
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
              <Link href="/project/cap-configurator" className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors">
                Student Life Case Study ↗
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
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-10 items-center">
            <div className="md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">Introduction</div>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                When a customer buys custom headwear, teamwear, or embroidered apparel online, a flat 2D mockup rarely gives them enough confidence to place a larger order. You cannot tell the difference between matte cotton and shiny satin, or between flat printed ink and raised metallic embroidery, from a static PDF proof.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans mb-3">
                That visual gap slows down sales. Buyers ask for physical samples, go back and forth over email revisions, or hesitate at checkout because they are not sure how the finished piece will actually look. According to Shopify, merchants who add 3D content to their stores see a <Ext href={LINKS.shopify}>94% conversion lift on average</Ext>.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                At Elipse Studio, we solve this with browser-native PlayCanvas WebGL configurators paired with Autodesk 3ds Max baked lighting. Buyers inspect every fabric, stitch, and metallic crest in real time and check out with exact pricing in the browser.
              </p>
            </div>
            <div className="md:order-first"><Frame src={introImg} cap="Student Life apparel configurator: color, size, back-print library and design upload" alt="Student Life 3D t-shirt configurator with size, color and design upload" /></div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">

            {/* 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="01" pill="The Sales Problem" title="Why Flat 2D Mockups Stall Custom Apparel Orders">
                <P>
                  In traditional custom headwear and teamwear workflows, buyers pick colors from flat swatches and wait days for a designer to send back a Photoshop mockup. That creates three common bottlenecks:
                </P>
              </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                <Check title="Texture and Sheen Blindness">Flat 2D fills cannot show how light hits satin, velour, woven cotton, or shimmer glitter finishes as a buyer turns the product.</Check>
                <Check title="Embroidery and Crest Uncertainty">Metallic gold thread, raised badges, and custom name stitching look flat in 2D, which makes buyers nervous about ordering for a full team or graduating class.</Check>
                <Check title="Slow Manual Quoting">Every color tweak or zone change requires another email thread before the factory gets clean production specs.</Check>
              </div>
                </div>
                <Frame src={embroideryImg} cap="Student Life cap configurator: raised gold thread embroidery with live thread color and name options" alt="Raised gold embroidery on a custom graduation cap in the Student Life 3D configurator" />
              </div>
            </article>

            {/* 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="02" pill="Material System" title="Multi-Material Fabric, Glitter & Embroidery Shaders in WebGL">
                    <P>
                      PlayCanvas supports full Physically Based Rendering (PBR) in standard mobile and desktop browsers, which lets us separate each panel and accessory on a garment or cap into independent material zones:
                    </P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Fabric Presets (Cotton, Satin, Velour, Mesh)">Tuning roughness and normal maps per fabric lets buyers immediately tell soft cotton apart from elongated satin highlights or plush velour.</Check>
                    <Check title="Metallic Embroidery & Raised Thread">Combining directional stitch normal maps with high metalness values makes gold and silver crests catch studio light realistically as the buyer orbits the 3D model.</Check>
                    <Check title="Glitter & Shimmer Finishes">Layering a subtle sparkle noise map over a reflective metallic base gives glitter bands realistic shimmer without heavy post-processing overhead.</Check>
                  </div>
                </div>
                <div className="md:order-first"><Frame src={shaderImg} cap="Student Life cap configurator: embroidery options, name text and thread colors with live 3D preview" alt="Student Life cap configurator embroidery options" /></div>
              </div>
            </article>

            {/* 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="03" pill="Lighting" title="Baked Studio Lighting in 3ds Max + PlayCanvas">
                    <P className="mb-4">
                      Real-time dynamic shadows drain smartphone batteries quickly and hurt frame rates on mid-range mobile devices.
                    </P>
                    <P>
                      Instead of forcing the browser to calculate complex shadows every frame, our 3D team sets up a studio lighting rig inside Autodesk 3ds Max, bakes ambient occlusion and indirect lighting into lightmaps, and connects them inside PlayCanvas. Buyers still get crisp brim shadows, natural seam depth, and studio reflections at zero runtime shadow cost.
                    </P>
                    <P className="mt-4">
                      See the same approach in our <Int href="/project/towel-configurator">towel configurator</Int> for Al Karam Towel Industries.
                    </P>
                  </EntryHead>
                </div>
                <Frame src={towelImg} cap="Al Karam Towel Industries product showroom: studio-lit scene with live color selection" alt="Al Karam Towel Industries 3D product showroom configurator" />
                
              </div>
            </article>

            {/* 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="04" pill="Performance" title="Dual Desktop & Mobile Builds for Peak Seasonal Traffic">
                <P className="mb-4">
                  Custom apparel and graduation headwear brands often hit massive seasonal spikes where most buyers browse on their phones. A heavy desktop WebGL scene that feels great on a laptop can stutter on mobile Safari or Android Chrome.
                </P>
                <P>
                  To keep load times fast on both platforms, we separate desktop and mobile asset pipelines while keeping a single shared product catalog:
                </P>
              </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                <Check title="Desktop Web Build">High-resolution panel textures and crisp close-up inspection for buyers customizing on laptops and larger monitors.</Check>
                <Check title="Dedicated Mobile Build">Reduced polygon budgets, <Ext href={LINKS.draco}>Draco mesh compression</Ext>, and <Ext href={LINKS.basis}>Basis Universal GPU texture compression</Ext> so smartphone shoppers get smooth 60 FPS interaction on cellular connections.</Check>
                <Check title="Zero Cloud GPU Streaming Fees">Because PlayCanvas renders directly in the buyer&apos;s browser, 10 concurrent shoppers or 10,000 shoppers during peak season cost the exact same CDN bandwidth.</Check>
              </div>
                </div>
                <div className="md:order-first"><Frame src={towel2Img} cap="Al Karam Towel Industries configurator: day and night light modes, colors, border design and sizes" alt="Al Karam Towel Industries 3D configurator with day and night light mode" /></div>
              </div>
            </article>

            {/* 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="05" pill="Commerce" title="Live Zone Pricing & Production-Ready Order Specs">
                    <P>
                      A 3D configurator only pays off when it connects cleanly to pricing and fulfillment. In our builds, every material switch, embroidery line, and add-on accessory updates the live total immediately and passes structured SKU, sizing, and placement data straight into checkout (Shopify Plus, WooCommerce, headless Next.js, or custom ERPs).
                    </P>
                    <P className="mt-4">
                      Browse our <Int href="/project/t-shirt-configurator">t-shirt configurator</Int> and <Int href="/services/3d-product-configurators">3D product configurator services</Int>.
                    </P>
                  </EntryHead>
                </div>
                <Frame src={tshirtImg} cap="Student Life apparel configurator: color, size, back-print library and design upload" alt="Student Life 3D t-shirt configurator with back print library" />
                
              </div>
            </article>

            {/* 06 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead n="06" pill="Case Study" title="Real-World Example: Student Life Denmark 3D Cap Configurator">
                    <P className="mb-4">
                      We built a 9-module PlayCanvas WebGL configurator for <Ext href={LINKS.studentLife}>Student Life in Denmark</Ext> for traditional Danish graduation caps (studenterhue), powering their <Ext href={LINKS.studentLifeLive}>live online ordering experience</Ext>.
                    </P>
                    <P>
                      Buyers can customize virtually every detail on the cap in real time while pricing updates live in DKK:
                    </P>
                  </EntryHead>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Cockade & 20+ Emblems (Kokarde)">Rosette colors, metallic finishes, and glitter variants.</Check>
                    <Check title="Academic Program Bands (Uddannelsesband)">Official Danish program bands rendered across five finishes: Satin, Cotton, Velour, Subtle Glitter, and Max Sparkle.</Check>
                    <Check title="Custom Embroidery, Crown Cover, Visor & Inner Lining">Personalized names, graduation years, matte or glossy visors, and interior linings.</Check>
                    <Check title="Accessories & Exact Sizing">Velvet boxes, champagne glasses, pins, and exact head measurements tied directly into checkout.</Check>
                  </div>
                </div>
                <div className="md:order-first"><Frame src={caseImg} cap="Student Life cap configurator: emblem, rosette color and flag selection" alt="Student Life 3D graduation cap configurator" /></div>
              </div>
              <Delivers label="Customer Feedback">
                Today, Student Life holds a 4.5 out of 5 TrustScore on <Ext href={LINKS.trustpilot}>Trustpilot</Ext>, with customers specifically praising how intuitive the cap designer is to use.
              </Delivers>
              <P className="mt-5">
                Explore the full project breakdown on our <Int href="/project/cap-configurator">Student Life case study</Int> or <Int href="/contact">contact us to scope your build</Int>.
              </P>
            </article>

            {/* More configurators (internal links) */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <Pill>Our Work</Pill>
              <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-5">More 3D Configurators We Have Built</h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {CONFIGURATORS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="px-4 py-2 rounded-full border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 text-xs sm:text-sm font-medium text-zinc-800 transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
              <P className="mt-5">
                Want the full range? See all <Int href="/services/3d-product-configurators">3D product configurator services</Int> or <Int href="/portfolio">browse our portfolio</Int>.
              </P>
            </article>

            {/* FAQ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead n="07" pill="FAQ" title="Frequently Asked Questions" center />
              <div className="space-y-8 max-w-3xl mx-auto text-center">
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
              Ready to Replace Your 2D Mockups?
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Tell us about your product range and we will scope a 3D configurator built for your fabrics and decoration types.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-2xl mx-auto">
              <a
                data-track-id="article-calendly-headwear"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2c49b3] active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
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

export default HeadwearTeamwearConfiguratorArticle;
