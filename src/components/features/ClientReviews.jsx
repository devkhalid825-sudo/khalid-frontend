'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { apiCall } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { useIsMobile } from '@/hooks/useIsMobile';
import beanLogo from '@/assets/About-page/bean-logo.png';
import khojLogo from '@/assets/images/brandslogo04.png';
import omoreLogo from '@/assets/ElipseImages/logos/logo6_clean.webp';
import aryLogo from '@/assets/ElipseImages/logos/logo7.webp';
import searleLogo from '@/assets/images/brandslogo03.png';
import tapalLogo from '@/assets/images/brandslogo01.png';
import roohLogo from '@/assets/images/brandslogo02.webp';

const VOICE_LOGOS = [
  { img: beanLogo, name: 'Bean Trailer', white: true },
  { img: khojLogo, name: 'Khoj Resorts', white: true },
  { img: omoreLogo, name: 'Omoré' },
  { img: aryLogo, name: 'ARY Laguna' },
  { img: searleLogo, name: 'Searle Pharmaceuticals' },
  { img: tapalLogo, name: 'Tapal Tea' },
  { img: roohLogo, name: 'Rooh Afza' },
];
import MediaFacade from '../ui/MediaFacade';

const getYouTubeEmbedUrl = (url, muted = true) => {
  if (!url) return null;
  const muteParam = muted ? '1' : '0';
  if (url.includes('youtube.com/embed/'))
    return url.includes('?')
      ? `${url}&autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1`
      : `${url}?autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1`;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1&rel=0&modestbranding=1`;
  return null;
};

const getYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

const SoundIcon = ({ muted }) =>
  muted ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );

/**
 * StageSlide: one card in the centered "voices" carousel.
 * Only the active card mounts a real player (autoplay, muted); neighbours show a
 * still poster that the carousel blurs and scales down via CSS.
 */
const StageSlide = ({ review, isActive, isMuted, onToggleMute }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const ytId = getYouTubeId(review.video);
  const poster = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null;

  const command = useCallback((func) => {
    const el = videoRef.current;
    if (!el) return;
    if (el.tagName === 'IFRAME') {
      el.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    } else if (func === 'mute' || func === 'unMute') {
      el.muted = func === 'mute';
    } else if (func === 'pauseVideo') {
      el.pause();
    } else if (func === 'playVideo') {
      el.play()?.catch?.(() => {});
    }
  }, []);

  useEffect(() => {
    if (isActive) command(isMuted ? 'mute' : 'unMute');
  }, [isMuted, isActive, command]);

  // Reset paused state when the card stops being the active one
  const [prevActive, setPrevActive] = useState(isActive);
  if (prevActive !== isActive) {
    setPrevActive(isActive);
    if (!isActive) setPaused(false);
  }

  const togglePlay = () => {
    command(paused ? 'playVideo' : 'pauseVideo');
    setPaused((p) => !p);
  };

  return (
    <div className="voice-card relative w-full aspect-[9/16] rounded-[22px] overflow-hidden bg-[#0f0f11]">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {isActive && review.video && (
        <div className="absolute inset-0">
          <MediaFacade
            videoUrl={review.video}
            title={`${review.clientName} review`}
            isActive={true}
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
            chromeless={true}
            setRef={(el) => { videoRef.current = el; }}
            className="w-full h-full"
          />
        </div>
      )}

      {isActive && review.video && (
        <>
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
            aria-label={paused ? 'Play video' : 'Pause video'}
          >
            {paused && (
              <span className="w-16 h-16 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
            className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            <SoundIcon muted={isMuted} />
          </button>
        </>
      )}

    </div>
  );
};

const VOICES_CSS = `
.voices-section{--v-bg:#000;--v-fg:#fff;--v-head-mute:#85858b;--v-sub:#b0b0b5;--v-line:rgba(255,255,255,.14);--v-chip:rgba(255,255,255,.05);--v-glow:rgba(53,88,212,.2);background:var(--v-bg) !important}
html.light .voices-section{--v-bg:#fff;--v-fg:#0b0d14;--v-head-mute:#85858b;--v-sub:#55555c;--v-line:rgba(11,13,20,.14);--v-chip:rgba(11,13,20,.04);--v-glow:rgba(53,88,212,.12)}
.voices-fg{color:var(--v-fg) !important}
.voices-mute{color:var(--v-head-mute) !important}
.voices-sub{color:var(--v-sub) !important}
.voices-chip{border:1px solid var(--v-line);background:var(--v-chip);color:var(--v-sub) !important}
.voices-btn{border:1px solid var(--v-line);background:var(--v-chip);color:var(--v-fg) !important;transition:transform .2s ease,border-color .2s ease,background .2s ease}
.voices-btn:hover{border-color:rgba(65,105,225,.7);background:rgba(65,105,225,.12)}
.voices-btn:active{transform:scale(.94)}
.voices-pill{border:1px solid var(--v-line);background:var(--v-chip)}
.voices-arrow{color:var(--v-fg) !important;background:transparent;transition:background .2s ease,transform .2s ease}
.voices-nav{color:var(--v-fg) !important;border:1px solid var(--v-line);background:var(--v-chip);backdrop-filter:blur(8px);transition:background .2s ease,transform .2s ease}
.voices-nav:hover{background:rgba(65,105,225,.25)}
.voices-nav:active{transform:translateY(-50%) scale(.92)}
.voices-arrow:hover{background:rgba(65,105,225,.18)}
.voices-arrow:active{transform:scale(.92)}
.voices-dot{background:var(--v-line)}
.voices-dot:hover{background:rgba(65,105,225,.5)}
.voices-section .brands-marquee-section{padding-top:40px;padding-bottom:0;background:transparent !important}
.voices-stage-mask{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 20%,#000 80%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 20%,#000 80%,transparent 100%)}
.voices-swiper{overflow:visible !important;padding:24px 0 28px}
.voices-swiper .voice-slide{transition:transform .8s cubic-bezier(.22,1,.36,1),filter .8s ease,opacity .8s ease;transform:scale(.72);filter:blur(14px);opacity:.3;cursor:pointer}
.voices-swiper .voice-slide.swiper-slide-prev,.voices-swiper .voice-slide.swiper-slide-next{transform:scale(.86);filter:blur(9px);opacity:.5}
.voices-swiper .voice-slide.swiper-slide-active{transform:scale(1);filter:none;opacity:1;cursor:default;z-index:2}
@keyframes voicesCaptionIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.voices-caption{animation:voicesCaptionIn .7s cubic-bezier(.22,1,.36,1) both}
@media (prefers-reduced-motion:reduce){.voices-swiper .voice-slide{transition:none}.voices-caption{animation:none}}
`;

const REVIEW_ONE_LINERS = {
  'tim barth': 'What I was looking for was a professional 3D partner — Elipse delivered an exceptional, smooth interactive virtual tour.',
  'barth': 'What I was looking for was a professional 3D partner — Elipse delivered an exceptional, smooth interactive virtual tour.',
  'virtual immo': 'What I was looking for was a professional 3D partner — Elipse delivered an exceptional, smooth interactive virtual tour.',
  'filippo': 'The VR application allows our clients to experience and explore real estate in full 3D before construction.',
  'medina': 'The VR application allows our clients to experience and explore real estate in full 3D before construction.',
  'hyperreal': 'The VR application allows our clients to experience and explore real estate in full 3D before construction.',
  'abel': 'The 3D configurator completely transformed how our customers customize and purchase products online.',
  'alasso': 'The 3D configurator completely transformed how our customers customize and purchase products online.',
  'cm marketing': 'The 3D configurator completely transformed how our customers customize and purchase products online.',
  'cap configurator': 'The 3D configurator completely transformed how our customers customize and purchase products online.',
  'ahmad': 'The VR visualization quality was outstanding, bringing our complex design concepts to life on schedule.',
  'ahmed': 'The VR visualization quality was outstanding, bringing our complex design concepts to life on schedule.',
  'tnt': 'The VR visualization quality was outstanding, bringing our complex design concepts to life on schedule.',
  'aviv': 'Our buyers can now explore spaces interactively in real-time, accelerating our sales cycle significantly.',
  'hyper': 'An incredible leap in our digital presence and interactive customer experience.',
};

// Static designations (placeholders - confirm each title with the client).
const REVIEW_DESIGNATIONS = {
  'maha chishty': 'Founder',
  'tim barth': 'Founder',
  'filippo medina': 'CEO',
  'abel': 'Marketing Director',
  'ahmad': 'Founder',
  'aviv': 'Co-Founder',
};

const getDesignation = (r) => {
  if (r.designation) return r.designation;
  const name = (r.clientName || '').trim().toLowerCase();
  return REVIEW_DESIGNATIONS[name] || '';
};

const getReviewQuote = (review) => {
  if (review.quote && typeof review.quote === 'string' && review.quote.trim().length > 0) {
    return review.quote.trim();
  }
  const client = (review.clientName || '').toLowerCase();
  const comp = (review.company || '').toLowerCase();
  const proj = (review.projectName || '').toLowerCase();

  for (const [key, quote] of Object.entries(REVIEW_ONE_LINERS)) {
    if (client.includes(key) || comp.includes(key) || proj.includes(key)) {
      return quote;
    }
  }

  return 'Working with Elipse was an exceptional experience that elevated our visual brand presence.';
};

const mapReviews = (data) =>
  data.map((r) => ({
    id: r.id,
    video: r.video,
    clientName: r.clientName,
    company: r.company || '',
    projectName: r.projectName || '',
    projectLink: r.projectLink || '',
    quote: r.quote || getReviewQuote(r),
    designation: getDesignation(r),
  }));

const ClientReviews = ({ initialReviews = null }) => {
  const [reviews, setReviews] = useState(initialReviews ? mapReviews(initialReviews) : []);
  const [mutedStates, setMutedStates] = useState({});
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [stageMuted, setStageMuted] = useState(true);
  const isMobile = useIsMobile();
  const mobileSwiperRef = useRef(null);
  const marqueeSwiperRef = useRef(null);
  const playerRefs = useRef({});
  const sectionRef = useRef(null);

  const setPlayerRef = useCallback(
    (id) => (el) => {
      playerRefs.current[id] = el;
    },
    []
  );

  const getIsMuted = useCallback(
    (id) => {
      return mutedStates[id] !== false;
    },
    [mutedStates]
  );

  const toggleMute = useCallback((id, isYouTube) => {
    setMutedStates((prev) => {
      const currentMuted = prev[id] !== false;
      const newMuted = !currentMuted;
      if (isYouTube) {
        const el = document.querySelector(`[data-review-id="${id}"]`);
        if (el && el.contentWindow) {
          el.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: newMuted ? 'mute' : 'unMute',
              args: [],
            }),
            '*'
          );
        }
      } else {
        const el = playerRefs.current[id];
        if (el) {
          el.muted = newMuted;
        }
      }
      return { ...prev, [id]: newMuted };
    });
  }, []);

  const handleVideoEnded = () => {
    if (mobileSwiperRef.current) {
      mobileSwiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data && e.data.event === 'onStateChange' && e.data.info === 0) {
        handleVideoEnded();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          const iframes = section.querySelectorAll('iframe[data-review-id]');
          iframes.forEach((el) => {
            if (el.contentWindow) {
              el.contentWindow.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'mute',
                  args: [],
                }),
                '*'
              );
            }
          });
          const videos = section.querySelectorAll('video');
          videos.forEach((v) => {
            v.muted = true;
          });
          setMutedStates({});
        } else {
          const videos = section.querySelectorAll('video');
          videos.forEach((v) => {
            v.muted = true;
            const p = v.play();
            if (p !== undefined) p.catch(() => { });
          });
        }
      },
      { threshold: [0, 0.2] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialReviews) return;
    let cancelled = false;
    const fetchReviews = async () => {
      try {
        const { data, status } = await apiCall('/reviews', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data) && data.length > 0) {
          setReviews(mapReviews(data));
        }
      } catch {
        // Network error → keep reviews empty → section stays hidden
      }
    };
    fetchReviews();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loopedReviews = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    let list = [...reviews];
    while (list.length < 12) {
      list = [...list, ...reviews];
    }
    return list.map((r, i) => ({
      ...r,
      _uniqueKey: `${r.id}-${i}`,
    }));
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="voices-section w-full pt-10 sm:pt-12 md:pt-20 pb-10 md:pb-20 overflow-hidden flex flex-col justify-center relative"
    >
      <div className="w-full relative">
        <style dangerouslySetInnerHTML={{ __html: VOICES_CSS }} />
        <div className="home-container relative flex flex-col items-center text-center mb-6 md:mb-10">
          <h2 className="voices-fg text-[30px] sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] leading-[1.1] [text-wrap:balance]">
            Proof<span className="text-[#4169E1]">.</span>{' '}
            <span className="voices-sub">From teams shipping in 3D.</span>
          </h2>
          {(() => {
            const logo = VOICE_LOGOS[activeIdx % VOICE_LOGOS.length];
            return (
              <img
                key={logo.name}
                src={typeof logo.img === 'string' ? logo.img : logo.img?.src}
                alt={`${logo.name} logo`}
                className={`voices-caption mt-8 h-12 md:h-16 w-auto max-w-[200px] object-contain ${logo.white ? 'brand-logo-white' : ''}`}
              />
            );
          })()}
        </div>

        {/* Mobile Swiper: ONLY rendered on mobile viewports (<768px). Prevents desktop duplicate nodes */}
        {isMobile !== false && (
          <div className="relative md:hidden">
            <Swiper
              ref={mobileSwiperRef}
              onSwiper={(swiper) => {
                mobileSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveMobileIndex(swiper.realIndex);
              }}
              modules={[Pagination]}
              loop={reviews.length > 1}
              speed={600}
              slidesPerView={1}
              spaceBetween={12}
              grabCursor={true}
              allowTouchMove={true}
              pagination={{ clickable: true, el: '.mobile-review-pagination' }}
              className="!px-[15px]"
            >
              {reviews.map((review, idx) => {
                const isMuted = getIsMuted(review.id);
                const isActive = activeMobileIndex === idx;

                return (
                  <SwiperSlide key={review.id} className="!w-full py-3 sm:py-4">
                    <div
                      className="w-full flex flex-col relative"
                    >
                      <div className="w-full h-[280px] xs:h-[320px] sm:h-[360px] rounded-[20px] overflow-hidden relative bg-[#0f0f11]">
                        {review.video ? (
                          <MediaFacade
                            videoUrl={review.video}
                            title={`${review.clientName} review`}
                            isActive={isActive}
                            autoPlay={isActive}
                            muted={isMuted}
                            loop={false}
                            controls={true}
                            onEnded={handleVideoEnded}
                            setRef={setPlayerRef(review.id)}
                            className="w-full h-full"
                          />
                        ) : null}

                        {review.video && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute(review.id, false);
                            }}
                            className="absolute bottom-3 right-3 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center hover:bg-black/90 transition-colors shadow-lg text-white"
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          >
                            {isMuted ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <line x1="23" y1="9" x2="17" y2="15"></line>
                                <line x1="17" y1="9" x2="23" y2="15"></line>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              </svg>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Client Info & 1-Liner Quote on Mobile */}
                      <div className="flex flex-col px-1 pt-4 pb-1">
                        <div className="flex items-center gap-2 voices-sub text-xs mb-1">
                          <span className="font-medium voices-fg">{review.clientName}</span>
                          {review.designation && (
                            <>
                              <span className="w-1 h-1 bg-[#3558D4] rounded-full"></span>
                              <span className="text-[#6f8fff]">{review.designation}</span>
                            </>
                          )}
                          {review.company && (
                            <>
                              <span className="w-1 h-1 bg-[#3558D4] rounded-full"></span>
                              <span>{review.company}</span>
                            </>
                          )}
                        </div>
                        <h3 className="voices-fg text-sm sm:text-base font-semibold tracking-[-0.02em] leading-tight font-heading">
                          {review.projectName || review.clientName}
                        </h3>
                        {review.quote && (
                          <p className="voices-sub text-xs sm:text-sm mt-1.5 leading-[1.75] line-clamp-2 italic font-serif">
                            &ldquo;{review.quote}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Bottom Controls with Left/Right Arrows and Pointer Dots */}
            <div className="flex items-center justify-between mt-4 px-2 sm:px-4">
              <button
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Previous review"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="mobile-review-pagination flex justify-center gap-2"></div>

              <button
                onClick={() => mobileSwiperRef.current?.slideNext()}
                className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Next review"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Desktop: centered autoplay video, blurred neighbours either side */}
        {isMobile !== true && (
          <div className="max-md:!hidden relative">
            <div className="relative">
            <button
              onClick={() => marqueeSwiperRef.current?.slidePrev()}
              className="voices-nav absolute left-[3%] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center"
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={() => marqueeSwiperRef.current?.slideNext()}
              className="voices-nav absolute right-[3%] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center"
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <div className="voices-stage-mask">
            <Swiper
              onSwiper={(swiper) => {
                marqueeSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIdx(swiper.realIndex);
                setStageMuted(true);
              }}
              modules={[]}
              loop={true}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={28}
              speed={800}
              slideToClickedSlide={true}
              grabCursor={true}
              allowTouchMove={true}
              className="voices-swiper"
            >
              {loopedReviews.map((review) => (
                <SwiperSlide key={review._uniqueKey} className="voice-slide !w-[250px] lg:!w-[290px] xl:!w-[310px]">
                  {({ isActive }) => (
                    <StageSlide
                      review={review}
                      isActive={isActive}
                      isMuted={stageMuted}
                      onToggleMute={() => setStageMuted((m) => !m)}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
            </div>

            {/* Active review details */}
            {(() => {
              const current = loopedReviews[activeIdx] || loopedReviews[0];
              if (!current) return null;
              return (
                <div key={current._uniqueKey} className="voices-caption home-container relative z-20 flex flex-col items-center text-center gap-7 max-w-[860px] mx-auto">
                  {current.quote && (
                    <p className="voices-fg text-base lg:text-[19px] leading-[1.6] font-serif italic max-w-[620px] [text-wrap:balance]">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="voices-fg text-[16px] leading-none font-semibold tracking-[-0.01em]">{current.clientName}</span>
                    {current.designation && (
                      <span className="text-[13px] leading-none font-medium text-[#4169E1]">{current.designation}</span>
                    )}
                    <span className="voices-sub text-[11px] leading-none uppercase tracking-[0.16em] opacity-80">
                      {current.company}{current.company && current.projectName ? '  ·  ' : ''}{current.projectName}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientReviews;
