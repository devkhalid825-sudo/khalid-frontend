'use client';

import Link from 'next/link';
import Hero from './Hero';
import HeroCTA from './HeroCTA';
import LatestWork from './LatestWork';
import ClientReviews from './ClientReviews';
import Solutions from './Solutions';
import BrandsMarquee from './BrandsMarquee';
import SocialMediaSection from './SocialMediaSection';
import News from './News';
import HomeFaq from './HomeFaq';
import Contact from './Contact';
import Footer from '../layouts/Footer';
import StudioIntro from './StudioIntro';

// Temporarily hidden on the home page — flip to true to bring them back
const SHOW_STUDIO_INTRO = false;
const SHOW_CORE_CAPABILITIES = false;
import SmoothScroll from './SmoothScroll';
import Reveal, { RevealGroup, RevealItem } from './Reveal';

// ── Bilal Lania Directive: 3 Core Editorial Service Pillars ──
const PILLARS = [
  {
    num: '01',
    title: 'Real-Time 3D Configurators',
    desc: 'WebGL, PlayCanvas & Unreal Engine product configurators that let buyers build, customise, and purchase — all inside the browser.',
    href: '/services/3d-product-configurators',
  },
  {
    num: '02',
    title: 'Architectural & Spatial Visualisation',
    desc: 'Photorealistic renders, real-time walkthroughs, and VR sales galleries purpose-built for property developers and luxury real estate pre-sales.',
    href: '/services/architectural-visualization',
  },
  {
    num: '03',
    title: 'Cinematic CGI & Commercial Production',
    desc: 'Broadcast-ready 3D product animation, VFX compositing, and commercial CGI — from concept to delivery in weeks, not months.',
    href: '/services/3d-animation',
  },
];

// ── Bilal Lania Directive: 4-Step Method ──
const METHOD = [
  { step: '01', phase: 'Scope', title: 'Discovery & Brief', desc: 'We align on objectives, deliverables, and timelines in a focused scoping call — no bloated proposals, no wasted rounds.' },
  { step: '02', phase: 'Build', title: 'Production Sprint', desc: 'Our 3D, dev, and motion teams execute in parallel sprints with live preview links at every milestone.' },
  { step: '03', phase: 'Review', title: 'Iterate Fast', desc: "Real-time feedback loops and version-controlled revisions — your team is in the driver's seat throughout." },
  { step: '04', phase: 'Ship', title: 'Deploy & Measure', desc: 'We hand off production-ready assets or deploy directly — with performance benchmarks and integration support.' },
];

// Shared layout for "Core Capabilities" and "How We Work" so both match:
// same container, header, card style, spacing and reveal animation.
const CardSection = ({ eyebrow, title, intro, items, cols }) => (
  <section className="home-cards-section bg-black py-14 md:py-20">
    <div className="home-container">
      <Reveal className="home-cards-head">
        <div>
          <p className="home-eyebrow">
            <span className="home-eyebrow-dot" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1] text-white max-w-2xl">
            {title}
          </h2>
        </div>
        {intro && <p className="home-cards-intro text-gray-400 font-serif leading-[1.75]">{intro}</p>}
      </Reveal>

      <RevealGroup className={`grid grid-cols-1 ${cols} gap-5 md:gap-6`}>
        {items.map((it) => {
          const inner = (
            <>
              <div className="home-card-top">
                <span className="home-card-num">{it.num}</span>
                {it.tag && <span className="home-card-tag">{it.tag}</span>}
              </div>
              <h3 className="home-card-title text-white">{it.title}</h3>
              <p className="home-card-desc text-gray-400 font-serif leading-[1.75]">{it.desc}</p>
              {it.href && (
                <span className="home-card-more">
                  Explore
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </>
          );
          return (
            <RevealItem key={it.key} className="h-full">
              {it.href ? (
                <Link href={it.href} className="home-card group">{inner}</Link>
              ) : (
                <div className="home-card">{inner}</div>
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  </section>
);

const Home = ({ initialProjects, initialReviews, initialBlogs, initialSocialMedia }) => {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <HeroCTA />

      {/* ── Bilal Directive: Hero Tagline + AEO Block + Metric Ticker ── */}
      {SHOW_STUDIO_INTRO && <StudioIntro />}

      {/* ── Latest Work (cards animate individually) ── */}
      <LatestWork initialProjects={initialProjects} portfolioPreview />

      {/* ── Bilal Directive: 3 Core Editorial Service Pillars ── */}
      {SHOW_CORE_CAPABILITIES && <CardSection
        eyebrow="Core Capabilities"
        title="Three disciplines. One integrated studio."
        intro="Every engagement draws on configurator engineering, spatial visualisation, and cinematic CGI — under one roof."
        cols="md:grid-cols-3"
        items={PILLARS.map((p) => ({ key: p.num, num: p.num, title: p.title, desc: p.desc, href: p.href }))}
      />}

      {/* Slider + video sections stay unwrapped: animating their transforms
          while videos/iframes mount caused visible scroll jank. */}
      <ClientReviews initialReviews={initialReviews} />

      {/* "What We Do": mobile shows the Core Capabilities square tiles, desktop keeps the image slider */}
      <div className="md:hidden">
        <CardSection
          eyebrow="What We Do"
          title="Three disciplines. One integrated studio."
          intro="Every engagement draws on configurator engineering, spatial visualisation, and cinematic CGI — under one roof."
          cols="md:grid-cols-3"
          items={PILLARS.map((p) => ({ key: p.num, num: p.num, title: p.title, desc: p.desc, href: p.href }))}
        />
      </div>
      <div className="hidden md:block">
        <Solutions />
      </div>
      <Reveal y={30}><BrandsMarquee /></Reveal>

      {/* ── Bilal Directive: 4-Step Method ── */}
      <CardSection
        eyebrow="How We Work"
        title="A process built for speed without shortcuts."
        intro="Four focused phases, live preview links at every milestone, and a team that ships on schedule."
        cols="sm:grid-cols-2 lg:grid-cols-4"
        items={METHOD.map((m) => ({ key: m.step, num: m.step, tag: m.phase, title: m.title, desc: m.desc }))}
      />

      <SocialMediaSection initialSocialMedia={initialSocialMedia} />
      <Reveal><HomeFaq /></Reveal>
      <News initialBlogs={initialBlogs} />

      {/* Original CTA section */}
      <section className="bg-black py-14 md:py-20 border-t border-zinc-800">
        <Reveal className="home-container text-center">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-semibold text-white mb-3 md:mb-4 tracking-[-0.02em] leading-[1.1]">
            Not Ready for a Full Proposal?
          </h2>
          <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mb-5 md:mb-8 font-serif leading-[1.75]">
            Get a free sample render or ballpark estimate &mdash; no commitment required
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/contact"
              className="w-auto inline-flex items-center justify-center text-center whitespace-nowrap bg-[#3558D4] hover:bg-[#2A48B8] text-white h-10 sm:h-auto px-6 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full text-[13px] sm:text-sm md:text-base font-semibold transition-all shadow-md sm:shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
            >
              Book Project Consultation
            </Link>
            <a
              data-track-id="home-hero-calendly"
              data-track-cta="home-hero-calendly"
              data-track-name="Schedule a Quick Call"
              data-track-location="home_hero"
              href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto inline-flex items-center justify-center text-center whitespace-nowrap h-10 sm:h-auto px-6 sm:px-8 sm:py-3.5 md:px-10 md:py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white rounded-full text-[13px] sm:text-sm md:text-base font-semibold transition-all backdrop-blur-sm"
            >
              Schedule a Quick Call
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact has a fixed-position modal — kept unwrapped so transforms can't shift it */}
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
