'use client';

import React, { useState, useEffect, useRef, Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { apiCall, BACKEND_ORIGIN } from '@/utils/api';
import { getProjectValueProposition } from '@/constants/projectValueProps';
import { useTheme } from '@/components/providers/ThemeProvider';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';


import { isProjectHidden } from '@/utils/projectVisibility';
import { renderCardTitle, stripHtml } from '@/utils/formatTitle';

const PILLAR_TABS = [
  { key: 'all', label: 'All Projects' },
  { key: 'configurator', label: '3D Configurators' },
  { key: 'archviz', label: 'Real-Time ArchViz & VR' },
  { key: 'cgi', label: 'Commercial CGI & Animation' },
];

const categoryToPillars = (category = '') => {
  const cats = category.split(',').map((c) => c.trim().toLowerCase());
  const pillars = new Set();

  for (const c of cats) {
    if (c === 'configurator') pillars.add('configurator');
    if (['vr', 'architecture', 'tour 360'].includes(c)) pillars.add('archviz');
    if (c === 'animation') pillars.add('cgi');
  }

  return pillars;
};

// ── Category filter dropdown (replaces the search box + 4 pill tabs) ──
const FilterDropdown = ({ value, onChange, counts, isLightMode }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = PILLAR_TABS.find((t) => t.key === value) || PILLAR_TABS[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Filter projects: ${current.label}`}
        suppressHydrationWarning
        className={`group inline-flex items-center gap-2.5 h-10 md:h-11 pl-3.5 pr-3 md:pl-4 md:pr-3.5 rounded-full border text-xs md:text-sm font-medium transition-all duration-300 ${open
          ? 'border-[#4169E1] shadow-[0_0_0_4px_rgba(65,105,225,0.15)]'
          : isLightMode ? 'border-zinc-200 hover:border-zinc-300' : 'border-white/10 hover:border-white/25'
          } ${isLightMode ? 'bg-white text-zinc-900' : 'bg-[#0E0E10] text-white'}`}
      >
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="text-[#4169E1]">
          <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="max-w-[120px] sm:max-w-none truncate">{current.label}</span>
        <svg
          viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"
          className={`opacity-60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Project categories"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute right-0 top-full mt-2 z-30 w-[240px] p-2 rounded-2xl border origin-top-right shadow-2xl backdrop-blur-md ${isLightMode
              ? 'bg-white/95 border-zinc-200/80 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.18)]'
              : 'bg-[#121214]/95 border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]'
              }`}
          >
            {PILLAR_TABS.map((t) => {
              const active = t.key === value;
              return (
                <li key={t.key} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => { onChange(t.key); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 ${active
                      ? 'bg-[#3558D4] text-white shadow-md shadow-[#4169E1]/30 font-semibold'
                      : isLightMode ? 'text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950' : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span>{t.label}</span>
                    {active && (
                      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white shrink-0">
                        <polyline points="3.5 8.5 6.5 11.5 12.5 5" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const CARD_EASE = [0.22, 1, 0.36, 1];

// Card rises in; its image starts blurred & zoomed and settles sharp.
// Desktop: strong blur, replays on re-entry. Mobile: lighter blur, plays once
// (large animated blur filters are expensive on phones and cause scroll jank).
const cardVariants = {
  hidden: ({ m }) => ({ opacity: 0, y: m ? 36 : 70, scale: m ? 0.98 : 0.96 }),
  visible: ({ i, m }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: m ? 0.8 : 1, ease: CARD_EASE, delay: m ? 0 : (i % 2) * 0.12 },
  }),
};
const mediaVariants = {
  hidden: ({ m }) => ({ filter: m ? 'blur(10px)' : 'blur(28px)', scale: m ? 1.08 : 1.22 }),
  visible: ({ i, m }) => ({
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      filter: { duration: m ? 1.2 : 2.2, ease: [0.33, 1, 0.68, 1], delay: (m ? 0 : (i % 2) * 0.12) + 0.2 },
      scale: { duration: m ? 1.2 : 2, ease: CARD_EASE, delay: (m ? 0 : (i % 2) * 0.12) + 0.1 },
    },
  }),
};

const MOBILE_QUERY = '(max-width: 767px)';
const subscribeMobile = (cb) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useIsMobile = () =>
  useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );

// "Card Video" uploaded in the admin dashboard; the card image is its poster.
// Use a static image (not a GIF) as the card image — next/image can't resize GIFs.
const getCardVideo = (project, imageSrc) => {
  const v = project.video;
  if (!v) return undefined;
  return { video: v.startsWith('http') ? v : `${BACKEND_ORIGIN}${v}`, poster: imageSrc };
};

// Fades in once it is actually playing. Its state resets on every remount.
const LoopingVideo = ({ src }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onPlaying={() => setPlaying(true)}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

// The lightweight poster always shows. The video mounts only when the card is
// near the viewport and unmounts again once it scrolls away, so off-screen
// cards don't keep downloading, decoding or holding memory.
const CardVideo = ({ video, poster, alt }) => {
  const ref = useRef(null);
  const near = useInView(ref, { margin: '300px 0px' });
  return (
    <div ref={ref} className="absolute inset-0">
      {poster && <Image src={poster} alt={alt} fill sizes="(max-width: 767px) 100vw, 700px" className="object-cover" />}
      {near && <LoopingVideo src={video} />}
    </div>
  );
};

const VideoHoverCard = ({ project, isLight, index = 0 }) => {
  const themeContext = useTheme();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const anim = { i: index, m: isMobile };
  // If the optimizer can't process a file (e.g. huge animated GIF), fall back to the original.
  const [imgFailed, setImgFailed] = useState(false);
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const imageSrc = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${BACKEND_ORIGIN}${project.image}`
    : '';
  const cardVideo = getCardVideo(project, imageSrc);

  const is360Tour = (project.category || '').toLowerCase().includes('360');
  const isVolvo = (project.title || '').toLowerCase().includes('volvo') ||
    (project.slug || '').toLowerCase().includes('volvo') ||
    (project.path || '').toLowerCase().includes('volvo');

  return (
    <motion.div
      className="h-full"
      custom={anim}
      variants={cardVariants}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: isMobile, amount: 0.2 }}
    >
    <Link
      href={project.path || `/case-study/${project.id}`}
      target={project.path?.startsWith('http') ? '_blank' : '_self'}
      rel={
        project.path?.startsWith('http')
          ? `noopener noreferrer${project.category === 'Tour 360' ? ' nofollow' : ''}`
          : ''
      }
      aria-label={`View project: ${isVolvo ? 'Volvo S90 Interactive Configurator (Concept Demo)' : stripHtml(project.title)}`}
      className={`group flex flex-col w-full h-full border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl ${isLightMode
        ? 'bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 hover:shadow-zinc-200/50'
        : 'bg-[#0E0E10] border-zinc-800/90 hover:border-zinc-700 hover:shadow-black/60'
        }`}
    >
      {/* 1. 16:9 HD Media Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 shrink-0">
        {/* A card video plays even when no card image (poster) was uploaded. */}
        {imageSrc || cardVideo ? (
          <motion.div className="relative w-full h-full" custom={anim} variants={mediaVariants}>
            {/* next/image serves a ~640–830px resized file instead of the 1920px
                original — far cheaper to decode and to animate the blur over. */}
            {cardVideo ? (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <CardVideo video={cardVideo.video} poster={cardVideo.poster} alt={stripHtml(project.title)} />
              </div>
            ) : (
            <Image
              src={imageSrc}
              alt={isVolvo ? 'Volvo S90 Interactive Configurator (Concept Demo)' : stripHtml(project.title)}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1535px) 50vw, 700px"
              loading="lazy"
              unoptimized={imgFailed}
              onError={() => setImgFailed(true)}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            )}
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
      </div>

      {/* 2. Content Details Below Image with Proper Alignment */}
      <div className="flex flex-col flex-1 p-5 md:p-6 2xl:p-8 justify-between gap-4">
        <div className="space-y-2">
          <h3
            className={`text-lg md:text-xl 2xl:text-2xl font-bold tracking-[-0.02em] leading-snug transition-colors duration-200 ${isLightMode ? 'text-zinc-900 group-hover:text-[#2563EB]' : 'text-white group-hover:text-[#4169E1]'
              }`}
          >
            {isVolvo ? 'Volvo S90 Interactive Configurator' : renderCardTitle(project.title)}
          </h3>
          <p
            className={`text-xs md:text-sm 2xl:text-base line-clamp-2 font-serif leading-[1.75] ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'
              }`}
          >
            {isVolvo
              ? 'Internal studio capability benchmark testing Unreal Engine 5 cloud pixel streaming for luxury automotive customization, achieving sub-50ms WebRTC latency and photorealistic real-time ray-traced lighting.'
              : getProjectValueProposition(project)}
          </p>
        </div>

        {/* 3. Bottom Row: Category on Left, Case Study Button on the RIGHT */}
        <div className={`flex items-center justify-between gap-3 pt-3 mt-auto border-t ${isLightMode ? 'border-zinc-200' : 'border-zinc-800/80'
          }`}>
          {project.category ? (
            <span className="text-[11px] md:text-xs 2xl:text-sm font-semibold uppercase tracking-wider text-zinc-500 truncate max-w-[50%]">
              {project.category}
            </span>
          ) : (
            <span />
          )}

          <span
            className={`latest-work-cta group-hover/btn inline-flex items-center gap-2 px-3.5 sm:px-4 2xl:px-5 py-1.5 sm:py-2 2xl:py-2.5 rounded-full text-xs 2xl:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ml-auto shrink-0 ${isLightMode
              ? 'bg-zinc-100 text-zinc-900 border border-zinc-300 group-hover:bg-[#2563EB] group-hover:!text-white group-hover:border-[#2563EB]'
              : 'bg-zinc-900 text-zinc-200 border border-zinc-700/80 group-hover:bg-[#2563EB] group-hover:!text-white group-hover:border-[#2563EB]'
              }`}
          >
            {is360Tour ? 'View 360 Tour' : 'View Case Study'}
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
};

const mapProjects = (data) =>
  data
    .filter((p) => p.title !== 'Costa Cart' && p.title !== 'Costa Cart Config' && p.path !== '/project/costa-cart' && !isProjectHidden(p))
    .map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      path: p.path,
      description: p.description,
      metaDescription: p.metaDescription,
      video: p.video || '',
      heroVideo: p.heroVideo || '',
      previewVideo: p.previewVideo || p.video || p.heroVideo || '',
    }));

// Portfolio-page `?category=` value that opens the same tab there (see categoryParam below).
const PORTFOLIO_CATEGORY = { configurator: 'configurator', archviz: 'architecture', cgi: 'animation' };
const PREVIEW_COUNT = 6;

/** Maps a `?category=` value to a pillar tab key. */
function tabFromCategory(category) {
  const lower = String(category || '').toLowerCase();
  if (lower === 'configurator') return 'configurator';
  if (['vr', 'architecture', 'tour 360'].includes(lower)) return 'archviz';
  if (lower === 'animation') return 'cgi';
  return 'all';
}

/**
 * portfolioPreview: show at most 6 cards per tab and a "View Portfolio" link instead of
 * View More / Show Less. Used on the homepage; pages without it keep the full list.
 */
const LatestWorkContent = ({ isLight = undefined, initialProjects = null, portfolioPreview = false }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const themeContext = useTheme();
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const [apiProjects, setApiProjects] = useState(initialProjects ? mapProjects(initialProjects) : []);
  // Open on the tab named in ?category= (e.g. from the homepage "View Portfolio" link).
  const [activeTab, setActiveTab] = useState(() => tabFromCategory(searchParams ? searchParams.get('category') : null));
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialProjects) return;
    let cancelled = false;
    const fetchProjects = async () => {
      try {
        const { data, status } = await apiCall('/projects', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data)) {
          setApiProjects(mapProjects(data));
        }
      } catch {
        /* keep initialProjects as fallback */
      }
    };
    fetchProjects();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projects = apiProjects;

  const categoryParam = searchParams ? searchParams.get('category') : null;
  const [prevCategoryParam, setPrevCategoryParam] = useState(categoryParam);
  if (categoryParam !== prevCategoryParam) {
    setPrevCategoryParam(categoryParam);
    if (categoryParam) setActiveTab(tabFromCategory(categoryParam));
  }

  const handleTabChange = (key) => {
    setActiveTab(key);
    setVisibleCount(6);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleProjects = projects.filter((project) => pathname !== project.path);
  const filteredProjects = visibleProjects.filter(
    (project) => activeTab === 'all' || categoryToPillars(project.category).has(activeTab)
  );
  const tabCounts = PILLAR_TABS.reduce((acc, t) => {
    acc[t.key] = t.key === 'all'
      ? visibleProjects.length
      : visibleProjects.filter((p) => categoryToPillars(p.category).has(t.key)).length;
    return acc;
  }, {});

  const displayedProjects = filteredProjects.slice(0, portfolioPreview ? PREVIEW_COUNT : visibleCount);
  const portfolioHref =
    PORTFOLIO_CATEGORY[activeTab] ? `/portfolio?category=${PORTFOLIO_CATEGORY[activeTab]}` : '/portfolio';
  const buttonClass = `group relative flex items-center gap-3 border rounded-full px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase hover:scale-105 transition-all duration-300 ${isLightMode
    ? 'bg-black/5 border-black/20 hover:bg-black hover:text-white'
    : 'bg-white/5 border-white/20 hover:bg-white hover:text-black'
    }`;

  return (
    <section
      id="latest-work"
      className={`relative transition-colors duration-300 ${isLightMode ? 'bg-white text-zinc-900' : 'bg-black text-white'
        } pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-3 sm:pb-6 md:pb-16`}
    >
      {isLightMode && (
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      )}

      <div className="home-container pt-1 md:pt-4">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1]">
            Latest Work
          </h2>
          <FilterDropdown
            value={activeTab}
            onChange={handleTabChange}
            counts={tabCounts}
            isLightMode={isLightMode}
          />
        </div>
      </div>

      <div className="home-container">
        <div key={activeTab} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 2xl:gap-10">
          {displayedProjects.map((project, i) => (
            <VideoHoverCard key={project.id} project={project} isLight={isLightMode} index={i} />
          ))}
        </div>

        {portfolioPreview ? (
          <div className="flex justify-center mt-6 md:mt-8 pb-0 md:pb-2">
            <Link href={portfolioHref} data-track-cta="latest-work-view-portfolio" className="latest-work-portfolio-btn flex px-8 sm:px-10 h-11 sm:h-12 items-center justify-center bg-[#3558D4] hover:bg-[#2A48B8] text-white rounded-full text-[13px] sm:text-sm font-semibold tracking-wider transition-all duration-300 shadow-[0_2px_15px_rgba(65,105,225,0.35)] hover:shadow-[0_4px_22px_rgba(65,105,225,0.55)] hover:scale-105">
              View Work
            </Link>
          </div>
        ) : (
          filteredProjects.length > 6 && (
            <div className="flex justify-center mt-6 md:mt-8 pb-0 md:pb-2">
              <button
                onClick={filteredProjects.length > visibleCount ? loadMore : () => setVisibleCount(6)}
                suppressHydrationWarning
                className={buttonClass}
              >
                {filteredProjects.length > visibleCount ? 'View More' : 'Show Less'}
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
};

const LatestWorkFallback = ({ isLight = false }) => (
  <section
    id="latest-work"
    className={`relative transition-colors duration-300 ${isLight ? 'bg-white pt-8 md:pt-16 pb-10 md:pb-16' : 'bg-black pt-8 md:pt-12 pb-10'
      }`}
  >
    <div className="home-container">
      <h2 className="text-2xl md:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1]">
        Latest Work
      </h2>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 2xl:gap-10">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`flex flex-col border rounded-xl overflow-hidden ${isLight ? 'bg-white border-zinc-200' : 'bg-[#0E0E10] border-zinc-800'
              }`}
          >
            <div className={`aspect-[16/9] w-full ${isLight ? 'bg-zinc-100' : 'bg-zinc-900'} animate-pulse`} />
            <div className="p-5 md:p-6 space-y-3">
              <div className="h-5 w-2/3 bg-zinc-800/80 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse" />
              <div className="flex justify-between items-center pt-3 border-t border-zinc-800/60 mt-3">
                <div className="h-3 w-16 bg-zinc-800/60 rounded animate-pulse" />
                <div className="h-7 w-28 bg-zinc-800/80 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LatestWork = (props) => {
  return (
    <Suspense fallback={<LatestWorkFallback isLight={props.isLight} />}>
      <LatestWorkContent {...props} />
    </Suspense>
  );
};

export default LatestWork;
