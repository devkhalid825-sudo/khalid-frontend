'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiArrowRight, FiZap, FiLayers } from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Apparel / headwear imagery. Each image is used exactly once in this article.
import _heroImg from '../../assets/article-img/A (5) .webp'; // hero: hoodie configurator on phone
import _tshirtImg from '../../assets/About-page/t-shirt.webp'; // 01: t-shirt styles
import _capImg from '../../assets/web-app-ui/cap.webp'; // 02: cap configurator
import _blazerImg from '../../assets/article-img/A (3) .webp'; // 03: blazer configurator
import _tailorImg from '../../assets/article-img/A (6) .webp'; // 04: in-store kiosk
import _clothImg from '../../assets/web-app-ui/cloth.webp'; // 05: Student Life apparel configurator

const heroImg = getImgSrc(_heroImg);
const tshirtImg = getImgSrc(_tshirtImg);
const capImg = getImgSrc(_capImg);
const blazerImg = getImgSrc(_blazerImg);
const tailorImg = getImgSrc(_tailorImg);
const clothImg = getImgSrc(_clothImg);

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || '3D apparel and headwear configurator by Elipse Studio'}
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
const EntryHead = ({ n, pill, title, intro }) => (
  <div className="max-w-3xl mb-6">
    <EntryNumber n={n} />
    <Pill>{pill}</Pill>
    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">{title}</h3>
    {intro && <P>{intro}</P>}
  </div>
);

// Static class maps so Tailwind picks up every span used.
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

// ── Tables Data ──

const mockupRows = [
  { attr: 'Fabric texture & sheen', fail: 'Flat fill, no specular response', cap: 'PBR shader tuned per fabric type' },
  { attr: 'Embroidery depth', fail: 'Flat logo, no raised relief', cap: 'Normal + displacement maps simulate raised thread' },
  { attr: 'Metallic thread / glitter', fail: 'Gold fill that looks flat or fake', cap: 'Metalness 1.0 + studio environment lighting' },
  { attr: 'Panel construction', fail: 'No visible seaming', cap: 'Per-panel materials, visible in 360°' },
];

const tierRows = [
  { tier: 'High', device: 'Desktop, dedicated GPU', poly: '80,000 polys', tex: '2K per panel' },
  { tier: 'Medium', device: 'Desktop/tablet, integrated GPU', poly: '40,000 polys', tex: '1K per panel' },
  { tier: 'Mobile', device: 'Phone on 4G', poly: '15,000 polys', tex: '512px panels' },
];

const specRows = [
  { field: 'Base SKU', value: 'SNP-6P-WOOL-BLK-M', use: 'Factory picks the blank hat style and color' },
  { field: 'Zone: Front', value: 'EMBR-GOLD-THREAD-5C-12K', use: 'Embroidery type, thread colors, stitch count' },
  { field: 'Zone: Underbrim', value: 'SATIN-RED-PMS-186C', use: 'Material and Pantone reference' },
  { field: 'Artwork Files', value: '[UUID].ai, [UUID].png', use: 'Vector and raster files linked by UUID' },
  { field: 'Order Value', value: 'USD 2,847.60', use: 'Pre-tax total at confirmed quantity' },
];

const resultRows = [
  { metric: 'Design revision cycles per order', before: '3.2 average', after: '0.4 average', change: '−87.5%' },
  { metric: 'Sample request rate', before: '68% of orders', after: '11% of orders', change: '−84%' },
  { metric: 'Average order value', before: 'GBP 1,240', after: 'GBP 1,580', change: '+27.4%' },
  { metric: 'Conversion rate (enquiry→order)', before: '34%', after: '61%', change: '+79.4%' },
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
              <span className="text-[#4169E1]">3D Configurators for Custom Apparel,</span>{' '}
              Headwear &amp; Teamwear
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8 px-2">
              By Elipse Studio | 2026 Guide · 10 min read · US | UK | AU
            </p>

            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black z-10">
                <img
                  src={heroImg}
                  alt="Customer customizing a hoodie in a mobile 3D apparel configurator"
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
              <Link href="/services/3d-product-configurators" className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors">
                3D Product Configurators ↗
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
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">
                Introduction · Custom Apparel, Headwear &amp; Teamwear
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Embroidery Shaders, Glitter Finishes &amp; Live Pricing
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-3">
                Bespoke caps, embroidered crests and satin varsity jackets lose high-margin orders every day, not because the product is weaker, but because a flat 2D mockup cannot show matte cotton versus satin sheen, or a sewn logo versus a raised gold-thread emblem.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This guide covers how Elipse Studio builds PlayCanvas WebGL configurators for headwear, teamwear and apparel brands in the US, UK and Australia: real-time fabric and embroidery shaders, separate desktop and mobile builds, and live pricing that feeds checkout.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">Outcomes Reported by Headwear Brands Moving to 3D</p>
              <div className="grid grid-cols-1 gap-3">
                <Stat v="60–80%" l="Fewer Sample Requests" s="when fabric and embroidery are accurate" />
                <Stat v="15–25%" l="Higher Average Order Value" s="buyers pick premium material upgrades" />
                <Stat v="3–6×" l="Conversion on Configurator Sessions" s="vs static product pages" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════ JOURNAL ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">3D Configurators for Custom Apparel, Headwear &amp; Teamwear</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026 Guide</span>
            </div>

            {/* ENTRY 01 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center mb-8">
                <div>
                  <EntryNumber n="01" />
                  <Pill>The Sales Problem</Pill>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-3">
                    Why Flat 2D Mockups Hurt Custom Apparel Sales
                  </h3>
                  <P className="mb-4">
                    A buyer who wants an embroidered cap with a metallic crest and satin underbrim usually has to request a physical sample. That costs AUD 80–200, takes 10–21 days and is often repeated 2–3 times, a 6–10 week cycle that pushes 48–200 unit buyers toward local printers who can show samples on demand.
                  </P>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Fewer samples">60–80% fewer physical samples when the 3D preview is accurate.</Check>
                    <Check title="Higher order value">15–25% uplift as buyers choose satin and metallic thread upgrades.</Check>
                    <Check title="Stronger conversion">3–6× higher than static product pages.</Check>
                  </div>
                </div>
                <Frame src={tshirtImg} cap="A flat mockup cannot show the difference between fabrics, finishes and construction" alt="Custom t-shirt styles in different fabrics and colors" />
              </div>

              <DataTable
                icon={FiLayers}
                title="2D Mockup vs 3D Configurator"
                cols={[
                  { key: 'attr', label: 'Attribute', span: 3 },
                  { key: 'fail', label: '2D Mockup Failure', span: 4 },
                  { key: 'cap', label: '3D Configurator', span: 5, strong: true },
                ]}
                rows={mockupRows}
              />
            </article>

            {/* ENTRY 02 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead
                    n="02"
                    pill="Material System"
                    title="Fabric, Glitter & Embroidery Shaders"
                    intro="PlayCanvas runs full PBR (the same metalness/roughness model as Unreal Engine) at 60fps in a browser tab, with an independent material on every panel of the cap."
                  />
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Cotton">High roughness (0.85–0.95) with a woven normal map reads as fabric, not plastic.</Check>
                    <Check title="Satin">Low roughness (0.1–0.2) with anisotropic specular gives the stretched highlight that moves as the model rotates.</Check>
                    <Check title="Velour">A sheen layer gives the &ldquo;light catches the pile&rdquo; look.</Check>
                    <Check title="Embroidery">Stitch-direction normal map, optional displacement and slightly lower thread roughness read as raised thread. Gold and silver use metalness 1.0.</Check>
                    <Check title="Glitter">An animated sparkle texture at 6–12 fps, driven by camera rotation, twinkles as the buyer drags.</Check>
                  </div>
                </div>
                <Frame src={capImg} cap="Cap configurator: emblem, rosette color and flag selection with live 3D preview" alt="3D cap configurator with emblem and color options" />
              </div>
            </article>

            {/* ENTRY 03 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead
                    n="03"
                    pill="Lighting"
                    title="Baked Studio Lighting in 3ds Max + PlayCanvas"
                    intro="Lighting is what separates a configurator that looks like a CAD viewer from one that reads as a product photograph."
                  />
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Three-point HDRI">Key, fill and rim lights rendered in 3ds Max/VRay at 8K, downsampled to 2K for the browser.</Check>
                    <Check title="Baked AO">Contact shadows under the brim and in panel seams are baked to a lightmap, so shadows cost nothing at runtime.</Check>
                    <Check title="Lean export">glTF/.glb with Basis Universal textures cuts texture size by 60–75%.</Check>
                    <Check title="Mobile budget">512px cubemap, no real-time shadow maps and a 6fps sparkle keep phones under their thermal limit.</Check>
                  </div>
                </div>
                <Frame src={blazerImg} cap="Fabric, finish and detail options switch live under baked studio lighting" alt="Desktop 3D blazer configurator with fabric options" />
              </div>
            </article>

            {/* ENTRY 04 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead
                    n="04"
                    pill="Performance"
                    title="Dual Desktop & Mobile Builds"
                    intro="One PlayCanvas scene loads the right asset tier automatically, based on GPU, screen and connection."
                  />
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Three LODs">The same cap ships at 80K, 40K and 15K triangles. Draco and Basis compression keep the mobile payload under 3MB, loading in under 4 seconds on 4G.</Check>
                    <Check title="Mobile-first controls">Bottom-sheet swatches, pinch-to-zoom with preset stops and no auto-rotate to save battery.</Check>
                    <Check title="Flat cost at any traffic">Everything renders in the buyer&apos;s browser and only a CDN serves files, so graduation-season spikes cost the same as a quiet week. Pixel streaming needs a GPU per user.</Check>
                  </div>
                </div>
                <Frame src={tailorImg} cap="The same configurator scene runs on in-store kiosks, desktops and phones" alt="In-store 3D tailoring configurator kiosk" />
              </div>

              <div className="mt-8">
                <DataTable
                  icon={FiLayers}
                  title="Asset Tiers"
                  cols={[
                    { key: 'tier', label: 'Tier', span: 2 },
                    { key: 'device', label: 'Device Profile', span: 4 },
                    { key: 'poly', label: 'Polygon Budget', span: 3 },
                    { key: 'tex', label: 'Texture Res.', span: 3, strong: true },
                  ]}
                  rows={tierRows}
                />
              </div>
            </article>

            {/* ENTRY 05 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start md:items-center">
                <div>
                  <EntryHead
                    n="05"
                    pill="Commerce"
                    title="Live Zone Pricing & Production-Ready Orders"
                    intro="A configurator that cannot pass structured data into checkout forces manual order entry. Ours calculates price per zone and exports a spec the factory can use directly."
                  />
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <Check title="Zone pricing">Base style price with quantity breaks, plus per-zone cost by decoration type (embroidery, woven patch, sublimation, 3D puff) and stitch count.</Check>
                    <Check title="Material upgrades">Satin underbrim, metallic thread or velour panels add their own line cost.</Check>
                    <Check title="Artwork upload">Logos are vectorized inline, checked against the zone&apos;s thread-color limit and shown on the 3D model with an updated price.</Check>
                    <Check title="Checkout">Shopify Plus line-item properties, headless Next.js via API, or a B2B PDF quote with four-angle renders sent to your CRM.</Check>
                  </div>
                </div>
                <Frame src={clothImg} cap="Apparel configurator with color, size, design upload and a one-click request" alt="3D t-shirt configurator with size, color and design upload" />
              </div>

              <div className="mt-8">
                <DataTable
                  icon={FiLayers}
                  title="Order Specification"
                  cols={[
                    { key: 'field', label: 'Spec Field', span: 3 },
                    { key: 'value', label: 'Example Value', span: 4, strong: true },
                    { key: 'use', label: 'Production Use', span: 5 },
                  ]}
                  rows={specRows}
                />
              </div>
            </article>

            {/* ENTRY 06: CASE STUDY */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead
                n="06"
                pill="Case Study"
                title="Student Life 3D Cap Configurator"
                intro="Student Life, a graduation and teamwear brand serving UK and Australian universities, replaced a PDF mockup and email workflow that averaged 3.2 revision cycles per order. Buyers are student union officers and team captains ordering 48–200 units for a committee, so the visual had to pass approval without a physical sample."
              />
              <div className="space-y-2.5 text-xs sm:text-sm max-w-3xl mb-8">
                <Check>6-panel cap at three LODs, with 24 fabric colors, 3 satin underbrims and 8 metallic threads.</Check>
                <Check>Front-panel embroidery with logo upload, live stitch count and price.</Check>
                <Check>120 pre-approved UK university crests, searchable inside the configurator.</Check>
                <Check>A committee share link for the exact configuration, and a Shopify Plus draft order on confirmation.</Check>
              </div>

              <DataTable
                icon={FiLayers}
                title="Student Life Results"
                cols={[
                  { key: 'metric', label: 'Metric', span: 4 },
                  { key: 'before', label: 'Before (PDF mockup)', span: 3 },
                  { key: 'after', label: 'After (3D)', span: 3, strong: true },
                  { key: 'change', label: 'Change', span: 2, strong: true },
                ]}
                rows={resultRows}
              />
              <Delivers label="What Drove the Order Value Lift">
                Buyers who could see the difference between cotton and satin, and between polyester fill and metallic gold thread, chose premium options far more often than under the mockup workflow.
              </Delivers>
            </article>

            {/* ENTRY 07 */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <EntryHead
                n="07"
                pill="Conclusion"
                title="The 3D Configurator as a Sales Asset"
                intro="Buyers who can see their product, in their fabric, with their logo, convert at higher rates and ask for far fewer samples. PlayCanvas WebGL delivers that in a browser tab and scales to any traffic at flat infrastructure cost."
              />
              <H4>What Elipse Studio Builds</H4>
              <div className="space-y-2.5 text-xs sm:text-sm max-w-3xl">
                <Check>Headwear, teamwear and apparel configurators: caps, bucket hats, beanies, jackets and bundles.</Check>
                <Check>Fabric, embroidery, glitter and print shader libraries matched to your range.</Check>
                <Check>Baked lighting, desktop/mobile LOD pipelines and checkout integration (Shopify Plus, headless, WooCommerce, B2B quotes).</Check>
              </div>
              <P className="mt-5 max-w-3xl">
                Explore our{' '}
                <Link href="/services/3d-product-configurators" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                  3D product configurators
                </Link>{' '}
                or view our{' '}
                <Link href="/portfolio" className="underline font-semibold text-zinc-900 hover:text-[#2563EB]">
                  recent projects
                </Link>.
              </P>
            </article>

          </div>
        </section>

        {/* ══════ CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Ready to replace your 2D mockup workflow?
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Book a Free 30-Minute Consultation
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              We&apos;ll review your product range and show you a live headwear configurator demo built for your fabrics and decoration types.
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
