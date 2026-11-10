'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FiSearch } from '@/components/ui/Icons';
import { apiCall, BACKEND_ORIGIN } from '@/utils/api';
import { getProjectValueProposition } from '@/constants/projectValueProps';
import { useTheme } from '@/components/providers/ThemeProvider';


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

const VideoHoverCard = ({ project, isLight }) => {
  const themeContext = useTheme();
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const imageSrc = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${BACKEND_ORIGIN}${project.image}`
    : '';

  const is360Tour = (project.category || '').toLowerCase().includes('360');
  const isVolvo = (project.title || '').toLowerCase().includes('volvo') ||
    (project.slug || '').toLowerCase().includes('volvo') ||
    (project.path || '').toLowerCase().includes('volvo');

  return (
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
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={isVolvo ? 'Volvo S90 Interactive Configurator (Concept Demo)' : stripHtml(project.title)}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
      </div>

      {/* 2. Content Details Below Image with Proper Alignment */}
      <div className="flex flex-col flex-1 p-5 md:p-6 2xl:p-8 justify-between gap-4">
        <div className="space-y-2">
          <h3
            className={`text-lg md:text-xl 2xl:text-2xl font-bold leading-snug transition-colors duration-200 ${isLightMode ? 'text-zinc-900 group-hover:text-[#2563EB]' : 'text-white group-hover:text-[#4169E1]'
              }`}
          >
            {isVolvo ? 'Volvo S90 Interactive Configurator' : renderCardTitle(project.title)}
          </h3>
          <p
            className={`text-xs md:text-sm 2xl:text-base line-clamp-2 leading-relaxed ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'
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
  const [searchTerm, setSearchTerm] = useState('');
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
    setSearchTerm('');
    setVisibleCount(6);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const filteredProjects = projects.filter((project) => {
    if (pathname === project.path) return false;
    const matchesSearch =
      stripHtml(project.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm) return matchesSearch;
    if (activeTab === 'all') return true;
    return categoryToPillars(project.category).has(activeTab);
  });

  const displayedProjects = filteredProjects.slice(0, portfolioPreview ? PREVIEW_COUNT : visibleCount);
  const portfolioHref =
    !searchTerm && PORTFOLIO_CATEGORY[activeTab] ? `/portfolio?category=${PORTFOLIO_CATEGORY[activeTab]}` : '/portfolio';
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

      <div className="latest-work-grid w-full mx-auto px-[15px] md:px-[40px] pt-1 md:pt-4">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-6">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
            Latest Work
          </h2>
          <div className="relative flex items-center w-full max-w-[180px] md:max-w-xs">
            <div
              className={`flex items-center border rounded-full pl-4 pr-1.5 py-1.5 w-full hover:border-[#4169E1]/50 transition-all duration-300 focus-within:border-[#4169E1] ${isLightMode
                ? 'bg-zinc-100/50 border-zinc-200 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.06)]'
                : 'bg-zinc-900/50 border-zinc-800 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.1)]'
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className={`bg-transparent border-none outline-none text-[10px] md:text-sm w-full placeholder:text-zinc-500 min-h-[32px] ${isLightMode ? 'text-black' : 'text-white'
                  }`}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search projects"
                suppressHydrationWarning
              />
              <button
                className="bg-[#4169E1] text-black p-2 md:p-2.5 rounded-full hover:bg-[#4169E1] transition-colors shrink-0 flex items-center justify-center min-w-[32px] min-h-[32px]"
                aria-label="Submit Search"
                suppressHydrationWarning
              >
                <FiSearch className="w-3.5 h-3.5 md:w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 4 Pillar Tabs (Centered) ── */}
        <div className="relative mb-6 md:mb-10 w-full">
          <div className="overflow-x-auto no-scrollbar flex justify-start sm:justify-center">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 md:gap-3 pb-2 pt-1 min-w-max sm:min-w-0 flex-nowrap sm:flex-wrap">
              {PILLAR_TABS.map((tab) => {
                const isActive = activeTab === tab.key && !searchTerm;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    suppressHydrationWarning
                    className={`h-9 md:h-10 px-4 md:px-5.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 inline-flex items-center justify-center active:scale-95 ${isActive
                      ? isLightMode
                        ? 'bg-[#2563EB] text-white shadow-[0_2px_10px_rgba(37,99,235,0.35)] border border-blue-600/30 font-bold'
                        : 'bg-gradient-to-r from-[#2563EB] to-[#4169E1] text-white shadow-[0_0_15px_rgba(65,105,225,0.45)] border border-blue-400/30 font-bold'
                      : isLightMode
                        ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200/80'
                        : 'bg-[#121212] text-zinc-400 hover:bg-[#1C1C1C] hover:text-white border border-white/10'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Subtle Right Edge Fade Indicator on Mobile (ultra-slim feather) */}
          <div
            className={`absolute right-0 top-0 bottom-2 w-3.5 sm:hidden pointer-events-none z-10 ${isLightMode
              ? 'bg-gradient-to-l from-white/80 to-transparent'
              : 'bg-gradient-to-l from-black/80 to-transparent'
              }`}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="w-full px-[15px] md:px-[40px]">
        <div key={activeTab} className="latest-work-grid w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 2xl:gap-10">
          {displayedProjects.map((project) => (
            <VideoHoverCard key={project.id} project={project} isLight={isLightMode} />
          ))}
        </div>

        {portfolioPreview ? (
          <div className="flex justify-center mt-6 md:mt-8 pb-0 md:pb-2">
            <Link href={portfolioHref} data-track-cta="latest-work-view-portfolio" className={buttonClass}>
              View Portfolio
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
    <div className="w-full mx-auto px-[15px] md:px-[40px]">
      <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
        Latest Work
      </h2>
      <div className="mt-8 latest-work-grid w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 2xl:gap-10">
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
