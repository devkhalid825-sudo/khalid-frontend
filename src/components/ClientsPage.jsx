'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ClientReviews from './features/ClientReviews';
import { useTheme } from './providers/ThemeProvider';
import { getImgSrc } from '../utils/api';

import heroShowcaseRaw from '../assets/About-page/spatial-commerce.webp';

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';
const FALLBACK_BLURB = 'Immersive 3D, VR and interactive work delivered by Elipse Studio.';
const HERO_IMAGE = getImgSrc(heroShowcaseRaw);
const LOGO_TEXT_PREFIX = 'logo-text:';

const parseTextLogo = (val = '') => {
  const str = String(val || '').trim();
  if (!str) return null;
  const idx = str.indexOf(LOGO_TEXT_PREFIX);
  if (idx === -1) return null;
  const raw = str.slice(idx + LOGO_TEXT_PREFIX.length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const caseStudyHref = (slug) => {
  const clean = typeof slug === 'string' ? slug.trim() : '';
  if (!clean) return '/';
  if (/^https?:\/\/\S+$/i.test(clean)) return clean;
  if (/^www\.\S+$/i.test(clean)) return `https://${clean}`;
  if (/^\/(?!\/)[\w\-./?=&%#]*$/.test(clean)) return clean;
  return `/case-study/${encodeURIComponent(clean)}`;
};

const ClientsPage = ({ clients: clientList = [], reviews = [] }) => {
  const { isLight } = useTheme();
  const [industry, setIndustry] = useState('All industries');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clients = useMemo(
    () => (Array.isArray(clientList) ? clientList : []).map((c) => {
      const href = caseStudyHref(c.caseStudySlug);
      return {
        ...c,
        blurb: c.blurb || FALLBACK_BLURB,
        href,
        isExternal: /^https?:\/\//i.test(href),
        logoText: parseTextLogo(c.logo),
      };
    }),
    [clientList]
  );

  const industries = useMemo(
    () => ['All industries', ...Array.from(new Set(clients.map((c) => c.industry).filter(Boolean))).sort()],
    [clients]
  );

  const visible = industry === 'All industries' ? clients : clients.filter((c) => c.industry === industry);

  return (
    <div
      data-nav={isLight ? 'light' : 'dark'}
      className={`w-full min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-[#3558D4]/30 selection:text-white ${isLight ? 'bg-white text-zinc-900' : 'bg-black text-white'
        }`}
    >
      <Header darkHero={!isLight} lightHero={isLight} />

      {/* ══════ HERO ══════ */}
      <section
        className={`relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 border-b transition-colors duration-300 ${
          isLight ? 'bg-white border-zinc-200/80' : 'bg-black border-white/10'
        }`}
      >
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Headline, copy & CTAs */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono bg-[#3558D4]/10 border border-[#4169E1]/25 text-[#4169E1] mb-6">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Our Clients</span>
            </div>

            <h1
              className={`text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.04] mb-6 sm:mb-7 ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}
            >
              <span className="block">5+ Years of</span>
              <span
                className={`block ${
                  isLight
                    ? 'text-[#3558D4]'
                    : 'bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent'
                }`}
              >
                Over Delivering.
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg md:text-[1.2rem] leading-[1.7] font-normal max-w-[34rem] mb-8 sm:mb-10 ${
                isLight ? 'text-zinc-600' : 'text-zinc-300'
              }`}
            >
              100+ active clients and a 92% retention rate, earned through AI-augmented delivery that compounds value across every engagement.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                data-track-id="clients-calendly-hero"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#3558D4] hover:bg-[#2A48B8] active:scale-95 text-white font-semibold text-sm shadow-lg shadow-[#3558D4]/30 transition-all"
              >
                <span>Schedule a Call</span>
                <FiArrowRight />
              </a>
              <Link
                href="/portfolio"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border active:scale-95 font-semibold text-sm transition-all ${
                  isLight
                    ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800'
                    : 'border-white/20 bg-white/[0.03] hover:bg-white/10 text-white'
                }`}
              >
                Explore Work
              </Link>
            </div>
          </div>

          {/* Right: Clean studio spatial commerce showcase */}
          <div className="lg:col-span-5 relative">
            <div
              className={`group relative w-full max-w-[440px] mx-auto lg:ml-auto aspect-[3/4] rounded-3xl overflow-hidden border transition-all duration-300 ${
                isLight
                  ? 'bg-zinc-100 border-zinc-200 shadow-[0_24px_56px_-18px_rgba(15,23,42,0.22)]'
                  : 'bg-[#0E0E10] border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]'
              }`}
            >
              <img
                src={HERO_IMAGE}
                alt="Elipse Studio interactive 3D configurator showroom presentation"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CLIENT REVIEWS ══════ */}
      <ClientReviews initialReviews={Array.isArray(reviews) && reviews.length > 0 ? reviews : null} />

      <div
        className={`px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-2 sm:pt-4 pb-12 sm:pb-20 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-black'
          }`}
      >
        {/* ══════ FILTER + GRID ══════ */}
        <section className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-6 mb-10 sm:mb-12">
            <div className="relative w-full md:w-64 flex-shrink-0">
              <label htmlFor="client-industry" className="sr-only">Filter clients by industry</label>
              <select
                id="client-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={`w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#3558D4] focus:ring-2 focus:ring-[#3558D4]/20 transition-colors ${isLight
                  ? 'border-zinc-300 bg-white text-zinc-900'
                  : 'border-white/15 bg-[#111114] text-white'
                  }`}
              >
                {industries.map((i) => (
                  <option
                    key={i}
                    value={i}
                    className={isLight ? 'bg-white text-zinc-900' : 'bg-[#111114] text-white'}
                  >
                    {i}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visible.map((c) => {
              const cardClass = `group flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${isLight
                ? 'border-[#3558D4]/35 bg-white hover:border-[#3558D4] hover:shadow-[0_12px_32px_-12px_rgba(53,88,212,0.35)]'
                : 'border-white/10 bg-[#111114] hover:border-[#4169E1]/60 hover:shadow-[0_16px_36px_-14px_rgba(65,105,225,0.28)]'
                }`;
              const cardContent = (
                <>
                  <div className="h-14 flex items-center mb-5">
                    {c.logoText || !c.logo ? (
                      <span className={`font-bold text-xl sm:text-2xl tracking-tight leading-none ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {c.logoText || c.name}
                      </span>
                    ) : (
                      <img
                        src={c.logo}
                        alt={`${c.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className={`max-h-12 max-w-[180px] w-auto object-contain object-left ${c.logoWhite ? (isLight ? 'brightness-0' : 'brightness-0 invert') : ''
                          }`}
                      />
                    )}
                  </div>
                  {c.industry && (
                    <span
                      className={`inline-block self-start text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3 ${isLight
                        ? 'text-[#3558D4] bg-[#3558D4]/10'
                        : 'text-[#7b9cff] bg-[#3558D4]/15'
                        }`}
                    >
                      {c.industry}
                    </span>
                  )}
                  <p
                    className={`text-sm sm:text-base leading-relaxed flex-1 mb-6 ${isLight ? 'text-zinc-700' : 'text-zinc-300'
                      }`}
                  >
                    {c.blurb}
                  </p>
                  <div
                    className={`flex items-center justify-between border-t pt-4 ${isLight ? 'border-zinc-200' : 'border-white/10'
                      }`}
                  >
                    <span className={`text-sm font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      Case study
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors group-hover:bg-[#3558D4] group-hover:border-[#3558D4] group-hover:text-white ${isLight ? 'border-zinc-300 text-zinc-700' : 'border-white/20 text-zinc-300'
                        }`}
                    >
                      <FiArrowRight />
                    </span>
                  </div>
                </>
              );

              return c.isExternal ? (
                <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  {cardContent}
                </a>
              ) : (
                <Link key={c.id} href={c.href} className={cardClass}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default ClientsPage;
