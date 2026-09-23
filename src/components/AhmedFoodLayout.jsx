'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaThLarge, FaPaperPlane, FiX } from '@/components/ui/Icons';
import Header from './layouts/Header';
import LatestWork from './features/LatestWork';
import ClientReviews from './features/ClientReviews';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import { BACKEND_ORIGIN, toCdnUrl } from '../utils/api';

export const resolveImageUrl = (src) => {
  if (!src || typeof src !== 'string') return src || '';
  if (src.includes('elipsestudio.com/photo-') || src.includes('elipsestudio.com/premium_photo-')) {
    return src.replace(/https?:\/\/elipsestudio\.com\//, 'https://images.unsplash.com/');
  }
  return toCdnUrl(src);
};

const RenderCard = ({ src, title }) => (
  <div className="group relative overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl aspect-[16/9] w-[360px] sm:w-[480px] md:w-[560px] shrink-0 snap-start rounded-lg">
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <img
        src={src}
        alt={title || "Render showcase"}
        width="560"
        height="315"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  </div>
);

const AutoScrollRow = ({ children }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animFrame;
    const step = () => {
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      animFrame = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => { animFrame = requestAnimationFrame(step); }, 2000);
    return () => { clearTimeout(timer); cancelAnimationFrame(animFrame); };
  }, []);
  return (
    <div className="relative mt-[2rem]">
      <div ref={scrollRef} className="flex overflow-x-hidden no-scrollbar gap-[15px] pb-4">
        {children}
        {React.Children.map(children, (child) => React.cloneElement(child, { key: `dup-${child.key}` }))}
      </div>
    </div>
  );
};

const AhmedFoodLayout = ({
  title,
  subtitle,
  meta = [],
  heroVideo,
  heroImage,
  overview = '',
  challenge = '',
  overviewHeading = '',
  challengeHeading = 'Key insights',
  storyBlocks = [],
  galleryThumbnails = [],
  galleryStills = [],
  sectionOrder = ['storyBlocks', 'gallery', 'results', 'process', 'content'],
  content = '',
  sections = [],
  results = [],
  process = [],
  gallery = [],
  galleryCategories = [],
  videoTabs = [],
  smallBanner,
  children,
  nextProject,
  ctaUrl,
  ctaText,
}) => {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);

  const handleStartProject = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const hasVideoTabs = videoTabs.length > 0;
  const currentVideoUrl = hasVideoTabs ? videoTabs[activeVideo]?.url : heroVideo;

  const cleanContent = React.useMemo(() => {
    if (!content || typeof content !== 'string') return '';
    return content
      .replaceAll('max-w-3xl', 'w-full')
      .replaceAll('max-w-4xl', 'w-full')
      .replaceAll('max-w-2xl', 'w-full')
      .replaceAll('max-w-xl', 'w-full')
      .replaceAll('max-w-lg', 'w-full')
      .replaceAll('max-w-5xl', 'w-full')
      .replaceAll('max-w-6xl', 'w-full')
      .replaceAll('max-w-7xl', 'w-full')
      .replaceAll('max-w-[700px]', 'w-full')
      .replaceAll('max-w-[800px]', 'w-full')
      .replaceAll('max-w-[900px]', 'w-full')
      .replaceAll('max-w-[1000px]', 'w-full')
      .replaceAll('max-w-[1200px]', 'w-full')
      .replace(/max-width\s*:\s*\d+px/gi, 'max-width: 100%');
  }, [content]);

  // Merge storyBlocks or fallback to overview + challenge
  const effectiveStoryBlocks = React.useMemo(() => {
    if (storyBlocks && storyBlocks.length > 0) return storyBlocks;
    const blocks = [];
    if (overview) {
      blocks.push({
        tag: 'Overview',
        heading: overviewHeading || 'Enterprise VR Training & Simulation',
        text: overview,
        image: null,
        position: 'left',
      });
    }
    if (challenge) {
      blocks.push({
        tag: 'The challenge',
        heading: challengeHeading || 'Training Realism',
        text: challenge,
        image: null,
        position: 'right',
      });
    }
    return blocks;
  }, [storyBlocks, overview, challenge, overviewHeading, challengeHeading]);

  // Render Story Blocks (Overview & Challenge)
  const renderStoryBlocks = () => {
    if (!effectiveStoryBlocks || effectiveStoryBlocks.length === 0) return null;
    return (
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-20 bg-[#0D0D0D] space-y-16 md:space-y-24">
        {effectiveStoryBlocks.map((block, i) => {
          const isLeft = (block.position || (i % 2 === 0 ? 'left' : 'right')) === 'left';
          const hasImage = Boolean(block.image);
          return (
            <div
              key={i}
              className={`w-full ${
                hasImage
                  ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center'
                  : 'max-w-4xl mx-auto p-6 md:p-10 bg-[#111] rounded-2xl border border-[#222]'
              }`}
            >
              {hasImage && (
                <div
                  className={`w-full rounded-2xl overflow-hidden border border-white/10 bg-[#1A1A1A] shadow-2xl aspect-[16/10] sm:aspect-video relative group ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={resolveImageUrl(block.image)}
                    alt={block.heading || `Story block ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div
                className={`space-y-4 ${
                  hasImage
                    ? isLeft
                      ? 'lg:order-2'
                      : 'lg:order-1'
                    : ''
                }`}
              >
                {block.tag && (
                  <span className="inline-block text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#4169E1]">
                    {block.tag}
                  </span>
                )}
                {block.heading && (
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#F2F0EB] tracking-tight leading-[1.18]">
                    {block.heading}
                  </h2>
                )}
                {block.text && (
                  <div className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-zinc-300 whitespace-pre-line">
                    {block.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    );
  };

  // Render Gallery (16:9 Thumbnails & Stills)
  // Render Thumbnails (16:9 - 3 per row)
  const renderThumbnails = () => {
    const hasThumbnails = galleryThumbnails && galleryThumbnails.length > 0;
    if (!hasThumbnails) return null;

    return (
      <section className="bg-[#111] px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b border-white/5 overflow-hidden">
        <div className="w-full">
          <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Visual output</p>
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight text-[#F2F0EB]">
            Thumbnails (16:9)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryThumbnails.map((rawSrc, i) => {
              const src = resolveImageUrl(rawSrc);
              return (
                <div
                  key={i}
                  onClick={() => setLightboxImg(src)}
                  className="group relative aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 hover:border-[#4169E1]/60 transition-all duration-300 cursor-pointer shadow-lg bg-[#0D0D0D]"
                >
                  <img
                    src={src}
                    alt={`Thumbnail render ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Render Still Images (4 per row)
  const renderStills = () => {
    const hasStills = galleryStills && galleryStills.length > 0;
    if (!hasStills) return null;

    return (
      <section className="bg-[#111] px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b border-white/5 overflow-hidden">
        <div className="w-full">
          <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Visual output</p>
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight text-[#F2F0EB]">
            Still Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {galleryStills.map((rawSrc, i) => {
              const src = resolveImageUrl(rawSrc);
              return (
                <div
                  key={i}
                  onClick={() => setLightboxImg(src)}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 hover:border-[#4169E1]/60 transition-all duration-300 cursor-pointer shadow-lg bg-[#111]"
                >
                  <img
                    src={src}
                    alt={`Still render ${i + 1}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Combined / Legacy Gallery (fallback when sectionOrder contains 'gallery')
  const renderGallery = () => {
    const hasOtherCats = galleryCategories && galleryCategories.length > 0;
    const hasLegacyGallery = gallery && gallery.length > 0;
    const currentOrder = sectionOrder || [];
    const rendersIndependently = currentOrder.includes('thumbnails') || currentOrder.includes('stills');

    return (
      <>
        {!rendersIndependently && (
          <>
            {renderThumbnails()}
            {renderStills()}
          </>
        )}
        {hasOtherCats && (
          <section className="bg-[#111] px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b border-white/5 overflow-hidden">
            <div className="w-full flex flex-col gap-6">
              {galleryCategories.map((cat, ci) => (
                <div key={ci}>
                  <h3 className="text-base sm:text-lg font-semibold text-[#F2F0EB] tracking-tight mb-3">{cat.name}</h3>
                  {cat.images.length > 0 && (
                    <AutoScrollRow>
                      {cat.images.map((src, ii) => (
                        <RenderCard key={ii} src={src} title={cat.name} />
                      ))}
                    </AutoScrollRow>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {!rendersIndependently && !hasOtherCats && hasLegacyGallery && (
          <div className="w-full rounded-xl overflow-hidden border border-[#222] bg-[#0D0D0D] flex items-center justify-center">
            <img src={gallery[0]} alt={`${title} showcase`} width="1920" height="1080" className="w-full h-auto max-h-[85vh] object-contain" loading="lazy" />
          </div>
        )}
      </>
    );
  };

  // Render Results (Measurable Impact)
  const renderResults = () => {
    if (!results || results.length === 0) return null;
    return (
      <section className="bg-[#111] px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-white/5">
        <div className="w-full">
          <div className="mb-8 md:mb-12">
            <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Measurable impact</p>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium tracking-tight leading-tight text-[#F2F0EB]">
              Results that moved the business
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {results.map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4169E1] leading-none mb-2">{item.stat}</div>
                <div className="font-semibold text-[#F2F0EB] text-sm sm:text-base mb-2">{item.label}</div>
                <div className="text-xs sm:text-sm font-light leading-relaxed text-zinc-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render Process Steps (How We Did It)
  const renderProcess = () => {
    if (!process || process.length === 0) return null;
    return (
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-20 bg-[#0D0D0D] border-t border-white/5">
        <div className="w-full">
          <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">How we did it</p>
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight text-[#F2F0EB]">
            Our process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {process.map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#4169E1]">{item.step}</span>
                  {item.phase && (
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2.5 py-0.5 rounded-full uppercase tracking-[0.08em]">{item.phase}</span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#F2F0EB] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-zinc-400 flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render HTML Editor Content
  const renderCleanContent = () => {
    if (!cleanContent) return null;
    return (
      <section className="px-4 sm:px-6 md:px-8 py-8 md:py-14 bg-[#0D0D0D]">
        <div
          className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-left w-full text-zinc-300 [&_*]:!max-w-none [&_div]:!max-w-none [&_section]:!max-w-none [&_p]:!max-w-none [&_div]:!w-full [&_section]:!w-full [&_h1]:text-[#F2F0EB] [&_h2]:text-[#F2F0EB] [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-[#F2F0EB] [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-[#F2F0EB] [&_p]:mb-4 [&_strong]:text-[#F2F0EB] [&_a]:text-[#4169E1] [&_a:hover]:text-[#3158D4] [&_img]:rounded-xl [&_img]:border [&_img]:border-[#1E1E1E] [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#4169E1] [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
      </section>
    );
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">

      {/* HERO */}
      <section className="bg-[#0D0D0D] px-4 sm:px-6 md:px-8 pt-[85px] sm:pt-[110px] md:pt-[125px] pb-6 md:pb-10 relative">
        <Header />

        {/* Heading */}
        <div className="pt-2 sm:pt-4 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F0EB] leading-[1.1] tracking-tight">
            {title}<span className="text-[#4169E1]">.</span>
          </h1>
          {subtitle && (
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light w-full mt-2 sm:mt-3 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {meta.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-4 sm:pt-6 mb-6 w-full">
            {meta.map((item, i) => (
              <div key={i} className="cs-hero-meta-item">
                <label className="block text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-500 mb-1">{item.label}</label>
                <p className="text-xs sm:text-sm font-medium text-[#F2F0EB] leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {hasVideoTabs && (
          <div className="flex flex-wrap gap-2 mb-4">
            {videoTabs.map((tab) => (
              <button
                key={tab.id ?? tab.label}
                onClick={() => setActiveVideo(tab.id ?? videoTabs.indexOf(tab))}
                className={`text-xs sm:text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${activeVideo === (tab.id ?? videoTabs.indexOf(tab))
                  ? 'bg-[#4169E1] text-white border-[#4169E1]'
                  : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="w-full relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center">
          {currentVideoUrl ? (
            <div className="w-full aspect-video">
              <iframe
                src={currentVideoUrl}
                title={title}
                frameBorder="0"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : heroImage ? (
            <img
              src={heroImage}
              alt={title}
              width="1920"
              height="1080"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          ) : null}
        </div>
      </section>

      {/* DISPATCH SECTIONS ACCORDING TO USER-DEFINED SECTION ORDER */}
      {(sectionOrder || ['storyBlocks', 'thumbnails', 'stills', 'results', 'process', 'content']).map((secKey) => (
        <React.Fragment key={secKey}>
          {secKey === 'storyBlocks' && renderStoryBlocks()}
          {secKey === 'thumbnails' && renderThumbnails()}
          {secKey === 'stills' && renderStills()}
          {secKey === 'gallery' && renderGallery()}
          {secKey === 'results' && renderResults()}
          {secKey === 'process' && renderProcess()}
          {secKey === 'content' && renderCleanContent()}
        </React.Fragment>
      ))}

      {/* LIGHTBOX MODAL FOR GALLERY */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all"
            title="Close image"
          >
            <FiX size={20} />
          </button>
          <img
            src={lightboxImg}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* EXTRA CONTENT (children) */}
      {children && (
        <section className="px-4 sm:px-6 md:px-8 py-6 md:py-12 bg-[#0D0D0D]">
          <div className="w-full">
            {children}
          </div>
        </section>
      )}

      {/* SMALL BANNER */}
      {smallBanner && (
        <section className="px-4 sm:px-6 md:px-8 py-6 md:py-10 bg-[#0D0D0D]">
          <div className="w-full rounded-xl overflow-hidden border border-[#222] shadow-2xl">
            <img src={smallBanner} alt={title || "Project banner"} width="1200" height="600" className="w-full h-auto object-contain" />
          </div>
        </section>
      )}

      {/* CTA / BOTTOM NAVIGATION */}
      <footer className="px-4 sm:px-6 md:px-8 py-6 md:py-10 bg-[#0D0D0D] border-t border-[#1A1A1A]">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] font-medium px-3 sm:px-5 py-2 sm:py-2.5 border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-zinc-400 bg-transparent cursor-pointer whitespace-nowrap"
              onClick={() => router.push('/')}
            >
              <FaThLarge aria-hidden="true" /> All work
            </button>
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target={ctaUrl.startsWith('http') ? '_blank' : undefined}
                rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] font-semibold px-3 sm:px-5 py-2 sm:py-2.5 bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 no-underline whitespace-nowrap"
              >
                <FaPaperPlane aria-hidden="true" /> {ctaText || 'View Project'}
              </a>
            ) : (
              <button
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] font-semibold px-3 sm:px-5 py-2 sm:py-2.5 bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer whitespace-nowrap"
                onClick={handleStartProject}
              >
                <FaPaperPlane aria-hidden="true" /> Start a project
              </button>
            )}
          </div>

          {/* Right side: 1 button (Next Project) */}
          {nextProject && (
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[13px] font-semibold px-3 sm:px-6 py-2 sm:py-2.5 bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer whitespace-nowrap"
                onClick={() => router.push(nextProject.path)}
              >
                Next Project →
              </button>
            </div>
          )}
        </div>
      </footer>

      <LatestWork />
      <ClientReviews />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default AhmedFoodLayout;
