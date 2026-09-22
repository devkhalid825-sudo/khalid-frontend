'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { FiArrowRight, FiZap, FiCpu, FiBox } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import steeringImg from '@/assets/ElipseImages/projects/Streeing-1.webp';
import zenithImg from '@/assets/About-page/zenith.webp';
import cgiJellyImg from '@/assets/Ahmed-food/jelly/01.webp';

const solutionsCards = [
  {
    id: 'configurators',
    type: 'dark',
    category: '3D CONFIGURATORS',
    title: 'HIGH-CONVERTING 3D COMMERCE',
    description:
      'Interactive WebGL & Unreal Engine 5 product configurators engineered to eliminate pre-purchase friction and increase conversion rates.',
    image: steeringImg,
    alt: 'Volvo 3D Configurator Cockpit & Steering Wheel',
    metaLabel: 'DELIVERABLE',
    pills: ['From WebGL engines', '...to photorealistic Unreal Engine 5'],
    linkText: 'Explore 3D Configurators',
    linkHref: '/services/3d-product-configurators',
  },
  {
    id: 'archviz',
    type: 'light',
    category: 'ARCHVIZ & SPATIAL',
    title: 'PRE-SALES BEFORE GROUNDBREAKING',
    description:
      'Unreal Engine 5 virtual walkthroughs, dynamic daylight cycles, and luxury architectural visualization.',
    image: zenithImg,
    alt: 'Zenith Luxury Architectural Building Visualization',
    metaLabel: 'PILLAR 02',
    pills: ['Unreal Engine 5 virtual walkthroughs', 'Unreal Engine 5 virtual penthouse'],
    linkText: 'Explore Spatial ArchViz',
    linkHref: '/services/architectural-visualization',
  },
  {
    id: 'commercials',
    type: 'dark',
    category: 'BRAND STORYTELLING & CGI PRODUCTION',
    title: 'CINEMATIC 3D PRODUCT & COMMERCIAL VISUALS',
    description:
      'We craft cinema-caliber CGI that commands audience attention and elevates brand value. High-end photoreal 3D animation, complex fluid dynamics, and broadcast-ready commercials.',
    image: cgiJellyImg,
    alt: 'Ahmed Foods Jelly Commercial 3D Product CGI & Fluid Simulation',
    metaLabel: 'DELIVERABLE',
    pills: [
      'Commercial CGI',
      'Liquid & Particle FX',
      'Engineering CAD Renders',
      'Broadcast Color Grading',
    ],
    linkText: 'Explore 3D Commercials',
    linkHref: '/services/3d-product-visualization',
  },
  {
    id: 'tech-stack',
    type: 'techStack',
    category: 'INFRASTRUCTURE',
    title: 'AND OUR TECH STACK',
    description:
      'Production-grade infrastructure engineered for zero-latency 60FPS spatial experiences.',
    linkText: 'Explore Technology Stack',
    linkHref: '/portfolio',
    capabilities: [
      {
        icon: FiZap,
        title: '3D Configurator Engine',
        desc: 'WebGL, Three.js & Unreal Pixel Streaming with real-time CPQ and variant sync.',
      },
      {
        icon: FiBox,
        title: 'Real-Time Spatial & ArchViz',
        desc: 'Unreal Engine 5 Lumen lighting, Nanite geometry, and multi-user WebXR walkthroughs.',
      },
      {
        icon: FiCpu,
        title: 'Cinematic CGI & Fluid VFX',
        desc: 'Hollywood-caliber fluid dynamics, particle simulations, and broadcast color grading.',
      },
    ],
  },
];

const SolutionsSection = () => {
  const swiperRef = useRef(null);

  return (
    <section
      id="solutions"
      className="w-full bg-gradient-to-b from-[#f8f9fb] via-[#eef1f5] to-[#f8f9fb] text-neutral-900 overflow-hidden font-sans border-t border-neutral-200/80 py-12 md:py-20 relative"
    >
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full relative z-10 px-[15px] md:px-[40px]">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-neutral-900 leading-[1.1]">
            What We Do
          </h2>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-11 h-11 rounded-full border border-neutral-300 hover:border-neutral-500 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-all active:scale-95 shadow-sm"
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-11 h-11 rounded-full border border-neutral-300 hover:border-neutral-500 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-all active:scale-95 shadow-sm"
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-6 md:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] cursor-pointer"
            >
              <span>Start Your Project</span>
              <FiArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative group w-full">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[FreeMode, Pagination]}
            slidesPerView="auto"
            spaceBetween={20}
            grabCursor={true}
            freeMode={{
              enabled: true,
              momentum: true,
            }}
            className="!overflow-visible py-2 md:py-4"
          >
            {solutionsCards.map((card) => {
              // ─── CARD TYPE: TECH STACK ───
              if (card.type === 'techStack') {
                return (
                  <SwiperSlide
                    key={card.id}
                    className="!w-[88vw] xs:!w-[360px] sm:!w-[400px] md:!w-[420px] lg:!w-[520px] py-2 md:py-4 !h-auto flex"
                  >
                    <div
                      className="w-full h-[550px] sm:h-[570px] md:h-[580px] lg:h-[600px] rounded-[16px] md:rounded-[24px] p-6 md:p-7 lg:p-8 flex flex-col justify-between select-none relative overflow-hidden shadow-2xl bg-[#090b10] text-white border border-white/10 ring-[1px] ring-white/10 group hover:border-[#4169E1]/50 transition-all duration-300"
                      style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                    >
                      {/* Rich Dark Gradient & Glow Background */}
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#0f1422] via-[#090b10] to-[#040507]">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(65,105,225,0.25)_0%,transparent_65%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.12)_0%,transparent_55%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />
                      </div>

                      {/* Header Content */}
                      <div className="relative z-10 flex flex-col justify-start shrink-0">
                        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#60A5FA] font-semibold mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          {card.category}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-[24px] font-bold tracking-tight text-white leading-tight mb-2 uppercase">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans line-clamp-3">
                          {card.description}
                        </p>
                      </div>

                      {/* Capabilities List */}
                      <div className="space-y-3 my-auto relative z-10 py-2">
                        {card.capabilities.map((cap, cIdx) => {
                          const IconComponent = cap.icon;
                          return (
                            <div
                              key={cIdx}
                              className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-[#4169E1]/40 transition-all duration-200 flex items-center gap-3.5 shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-xl bg-[#4169E1]/20 border border-[#4169E1]/30 flex items-center justify-center text-[#60A5FA] shrink-0">
                                <IconComponent className="text-base" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs sm:text-sm font-semibold text-white leading-snug truncate">
                                  {cap.title}
                                </div>
                                <div className="text-[11px] sm:text-xs text-zinc-400 leading-tight mt-0.5 line-clamp-1">
                                  {cap.desc}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer Link */}
                      <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
                        <Link
                          href={card.linkHref}
                          className="text-xs sm:text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors flex items-center gap-1.5 group/link"
                        >
                          <span>{card.linkText}</span>
                          <span className="inline-block transition-transform group-hover/link:translate-x-1 text-[#60A5FA]">→</span>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }

              // ─── CARD TYPE: FULL BACKGROUND IMAGE WITH FILL & GRADIENT OVERLAY ───
              return (
                <SwiperSlide
                  key={card.id}
                  className="!w-[88vw] xs:!w-[360px] sm:!w-[400px] md:!w-[420px] lg:!w-[520px] py-2 md:py-4 !h-auto flex"
                >
                  <div
                    className="w-full h-[550px] sm:h-[570px] md:h-[580px] lg:h-[600px] rounded-[16px] md:rounded-[24px] p-6 md:p-7 lg:p-8 flex flex-col justify-between select-none relative overflow-hidden shadow-2xl bg-[#090b10] text-white border border-white/10 ring-[1px] ring-white/10 group hover:border-[#4169E1]/50 transition-all duration-300"
                    style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                  >
                    {/* Full Card Background Image with Fill and Gradient Overlays */}
                    {card.image && (
                      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <Image
                          src={card.image}
                          alt={card.alt || card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                        />
                        {/* Top dark gradient for heading legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/60 to-transparent h-[50%]" />
                        {/* Bottom dark gradient for pills & actions legibility */}
                        <div className="absolute inset-0 top-auto bg-gradient-to-t from-[#090b10] via-[#090b10]/90 to-transparent h-[60%]" />
                        {/* Overall ambient darkening and brand glow */}
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(65,105,225,0.18)_0%,transparent_60%)]" />
                      </div>
                    )}

                    {/* Header Content */}
                    <div className="relative z-10 flex flex-col justify-start shrink-0">
                      <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#60A5FA] font-semibold mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        {card.category}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-[24px] font-bold tracking-tight text-white leading-tight mb-2 uppercase">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-zinc-200/90 leading-relaxed font-sans line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    {/* Open Breathing Middle Area to Showcase 3D Render */}
                    <div className="flex-1" />

                    {/* Bottom Section: Deliverable / Pills / CTA */}
                    <div className="relative z-10 flex flex-col justify-end shrink-0 pt-4">
                      {/* Meta Label & Pills */}
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-semibold mb-2 flex items-center gap-2">
                        <span>{card.metaLabel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                        {card.pills.map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-black/60 backdrop-blur-md border border-white/20 text-white/95 shadow-sm"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>

                      {/* Footer Link */}
                      <div className="pt-3.5 border-t border-white/15 flex items-center justify-between gap-3">
                        <Link
                          href={card.linkHref}
                          className="text-xs sm:text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors flex items-center gap-1.5 group/link"
                        >
                          <span>{card.linkText}</span>
                          <span className="inline-block transition-transform group-hover/link:translate-x-1 text-[#60A5FA]">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
