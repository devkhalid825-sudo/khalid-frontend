'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import kiaConfiguratorImg from '@/assets/ElipseImages/projects/configurator-preview.png';
import zenithImg from '@/assets/About-page/zenith-square.webp';
import cgiJellyImg from '@/assets/About-page/jelly.webp';

const solutionsCards = [
  {
    id: 'configurators',
    category: '3D CONFIGURATORS',
    title: 'High-Converting 3D Commerce.',
    description:
      'We build the real-time 3D, spatial, and cinematic experiences that turn complex products and unbuilt spaces into revenue.',
    image: kiaConfiguratorImg,
    alt: 'Kia Vehicle 3D Product Configurator',
    metaLabel: 'DELIVERABLES',
    pills: ['Interactive WebGL', 'Photorealistic UE5', 'Configurator Engine'],
    linkText: 'Explore 3D Configurators',
    linkHref: '/services/3d-product-configurators',
  },
  {
    id: 'archviz',
    category: 'ARCHVIZ',
    title: 'Pre-Sales Before Groundbreaking.',
    description:
      'Unreal Engine 5 virtual walkthroughs, dynamic daylight cycles, and luxury architectural visualization.',
    image: zenithImg,
    alt: 'Luxury Architectural Penthouse & Building Visualization',
    videoUrl: 'https://www.youtube.com/watch?v=Vf6C8e-hLXE',
    metaLabel: 'DELIVERABLES',
    pills: ['UE5 Walkthroughs', 'Dynamic Daylight Cycles', 'Spatial Digital Twins'],
    linkText: 'Explore Spatial ArchViz',
    linkHref: '/services/architectural-visualization',
  },
  {
    id: 'commercials',
    category: 'CGI PRODUCTION',
    title: 'Cinematic 3D Product & Commercial Visuals.',
    titleSmall: true,
    description:
      'We craft cinema-caliber CGI that commands audience attention and elevates brand value.',
    image: cgiJellyImg,
    alt: 'Ahmed Foods Commercial 3D Product CGI & Fluid Simulation',
    videoUrl: 'https://youtu.be/BsKw4i6riRw?si=mS2PuOxRmvKKElpR',
    metaLabel: 'DELIVERABLES',
    pills: [
      'Commercial CGI',
      'Complex Liquid & Particle FX',
      'Exploded Engineering CAD Renders',
      'Broadcast Color Grading',
    ],
    linkText: 'Explore 3D Commercials',
    linkHref: '/services/3d-product-visualization',
  },
];

const SolutionsSection = () => {
  const swiperRef = useRef(null);

  return (
    <section
      id="solutions"
      className="solutions-section w-full bg-black text-white overflow-hidden font-sans border-t border-zinc-800/80 py-14 md:py-24 relative"
    >
      {/* Top corner soft blur gradients — dark mode only, desktop+. Cards keep their own clean bg */}
      <div
        className="solutions-corner-glow hidden md:block absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />
      <div
        className="solutions-corner-glow hidden md:block absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Section Header - Full Width, No Left/Right Gap */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 mb-8 md:mb-12 px-[15px] md:px-[40px]">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white whitespace-nowrap">
              What We Do
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex xl:hidden items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <Link
              href="/contact"
              className="solutions-cta-btn inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 md:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span className="sm:hidden">Book Now</span>
              <span className="hidden sm:inline">Book Project Consultation</span>
              <FiArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Carousel / 3 Centered Cards */}
        <div className="relative max-w-[1680px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-12">
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
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 'auto',
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 'auto',
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 'auto',
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28,
                allowTouchMove: false,
              },
            }}
            className="!overflow-visible py-2 md:py-4 [&>.swiper-wrapper]:xl:justify-center"
          >
            {solutionsCards.map((card) => {
              return (
                <SwiperSlide
                  key={card.id}
                  className="!w-[88vw] xs:!w-[380px] sm:!w-[420px] md:!w-[460px] xl:!w-[calc((100%-56px)/3)] py-2 md:py-4 !h-auto flex"
                >
                  <div className="solution-card w-full h-[600px] sm:h-[630px] md:h-[660px] lg:h-[690px] xl:h-[710px] rounded-[32px] px-7 sm:px-8 md:px-9 pt-6 sm:pt-7 pb-6 sm:pb-7 md:pb-8 flex flex-col justify-between select-none relative overflow-hidden bg-gradient-to-b from-[#18181c] via-[#101115] to-[#08080a] text-white border border-zinc-800/80 transition-all duration-300 hover:border-zinc-700">
                    {/* Header Text (Shifted up) */}
                    <div className="relative z-20 flex flex-col justify-start shrink-0">
                      <div className="solution-card-category text-[11px] sm:text-xs font-sans tracking-[0.14em] uppercase font-semibold mb-1.5 text-zinc-400">
                        {card.category}
                      </div>
                      <h3
                        className={`solution-card-title font-semibold tracking-tight text-white leading-tight mb-2.5 ${card.titleSmall
                          ? 'text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px]'
                          : 'text-xl sm:text-[23px] md:text-[26px]'
                          }`}
                      >
                        {card.title}
                      </h3>
                      <p className="solution-card-desc text-xs sm:text-[13.5px] text-zinc-400 leading-relaxed font-sans line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    {/* Showcase Image: Framed with rounded corners and subtle border */}
                    {card.image && (
                      <div className="solution-card-img-box relative w-full flex-1 my-3.5 sm:my-4 rounded-2xl sm:rounded-[22px] overflow-hidden border border-white/10 pointer-events-none">
                        <Image
                          src={card.image}
                          alt={card.alt || card.title}
                          fill
                          quality={100}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-bottom sm:object-center"
                        />
                        {card.id === 'configurators' && (
                          <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                            <a
                              href="https://legacy.elipsestudio.com/Kia/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full bg-[#4169E1] hover:bg-[#3158D4] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_20px_rgba(65,105,225,0.45)] transition-all hover:scale-[1.02] pointer-events-auto cursor-pointer"
                            >
                              View Configurator
                              <span>→</span>
                            </a>
                          </div>
                        )}
                        {card.videoUrl && card.id !== 'configurators' && (
                          <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                            <a
                              href={card.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-full bg-[#4169E1] hover:bg-[#3158D4] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_20px_rgba(65,105,225,0.45)] transition-all hover:scale-[1.02] pointer-events-auto cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              <span>Watch</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Section */}
                    <div className="relative z-20 flex flex-col justify-end shrink-0 mt-auto">
                      {/* Footer Row: Explore Link Only */}
                      <div className="solution-card-footer pt-3 flex items-center justify-end border-t border-white/10 gap-3">
                        <Link
                          href={card.linkHref}
                          className="solution-card-link shrink-0 text-xs sm:text-[13px] font-semibold text-white/90 hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2 group/link pl-1"
                        >
                          <span className="whitespace-nowrap">{card.linkText}</span>
                          <span className="w-5 h-5 rounded-full bg-white/10 group-hover/link:bg-[#4169E1] group-hover/link:text-white flex items-center justify-center text-[11px] transition-all transform group-hover/link:translate-x-1 shrink-0">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Mobile Prev/Next Arrows */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;