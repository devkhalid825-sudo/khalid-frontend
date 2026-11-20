'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { apiCall } from '@/utils/api';


import mahaLogo from '@/assets/clientlogo/Maha Chishty Designs.png';
import virtualImmoLogo from '@/assets/clientlogo/Virtual immo_White.png';
import hyperLogo from '@/assets/clientlogo/Hyper realestate_White.png';
import abelLogo from '@/assets/clientlogo/Abel.png';
import tntLogo from '@/assets/clientlogo/TNT.png';
import innovisionLogo from '@/assets/clientlogo/Innovision_White.png';
import MediaFacade from '../ui/MediaFacade';

// Client logo shown above each review card. `white: true` = white artwork that the
// site turns black in light mode (brand-logo-white); coloured logos are left as-is.
const CLIENT_LOGOS = [
  { test: /maha|chishty/, img: mahaLogo, name: 'Maha Chishty Designs', white: true, scale: 1.32 },
  { test: /barth|virtual immo/, img: virtualImmoLogo, name: 'Virtual Immo', white: true, scale: 1 },
  { test: /filippo|medina|hyper/, img: hyperLogo, name: 'Hyper Realestate', white: true, scale: 1 },
  { test: /abel|alasso|cm marketing|cap configurator/, img: abelLogo, name: 'Abel', white: true, scale: 1 },
  { test: /\btnt\b|ahmad|ahmed/, img: tntLogo, name: 'TNT Design', white: true, scale: 1 },
  { test: /innovision|aviv/, img: innovisionLogo, name: 'Innovision', white: true, scale: 0.96 },
];

const getClientLogo = (r) => {
  const text = `${r.clientName || ''} ${r.company || ''} ${r.projectName || ''}`.toLowerCase();
  return CLIENT_LOGOS.find((l) => l.test.test(text)) || null;
};

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
      el.play()?.catch?.(() => { });
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
    <div className="voice-card relative w-full aspect-[9/16] rounded-[18px] md:rounded-[22px] overflow-hidden bg-[#0f0f11]">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {/* 9:16 short fills the 9:16 card exactly */}
      {isActive && review.video && (
        <div className="absolute inset-0 w-full h-full">
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
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <svg className="w-7 h-7 md:w-8 md:h-8 fill-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
            className="absolute bottom-4 right-4 md:bottom-5 md:right-5 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
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
.voices-section{--v-bg:#000;--v-fg:#fff;--v-sub:#a9a9ae;--v-line:rgba(255,255,255,.22);--v-chip:#000;background:var(--v-bg) !important;font-family:'Inter','DM Sans','Helvetica Neue',Arial,sans-serif !important}
html.light .voices-section{--v-bg:#fff;--v-fg:#0b0d14;--v-sub:#55555c;--v-line:rgba(11,13,20,.22);--v-chip:#fff}
.voices-fg{color:var(--v-fg) !important}
.voices-sub{color:var(--v-sub) !important}
.voices-rule{border-color:var(--v-line)}
.voices-circle{position:relative;border:1.5px solid rgba(255,255,255,.22);background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.14) 0%,rgba(255,255,255,.03) 65%),#111216;box-shadow:0 8px 24px -4px rgba(0,0,0,.7),inset 0 1px 1px rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;overflow:hidden;transition:border-color .3s ease,box-shadow .3s ease,transform .3s ease}
.voices-circle:hover{border-color:rgba(65,105,225,.55);box-shadow:0 10px 28px -4px rgba(65,105,225,.3),inset 0 1px 1px rgba(255,255,255,.35);transform:translateY(-1px)}
html.light .voices-circle{border:1.5px solid rgba(15,23,42,.12);background:radial-gradient(circle at 35% 30%,#ffffff 0%,#f1f5f9 100%),#ffffff;box-shadow:0 6px 18px -4px rgba(0,0,0,.08),inset 0 1px 1px rgba(255,255,255,.9)}
.voices-btn{border:1px solid var(--v-fg);background:transparent;color:var(--v-fg) !important;transition:transform .2s ease,background .2s ease}
.voices-btn:hover{background:rgba(65,105,225,.18)}
.voices-btn:active{transform:scale(.92)}
.voices-btn-primary{background:linear-gradient(180deg,#3b72ff 0%,#1f4fe0 100%);border:0;color:#fff !important;transition:transform .2s ease,filter .2s ease}
.voices-btn-primary:hover{filter:brightness(1.12)}
.voices-btn-primary:active{transform:scale(.92)}
.voices-highlight{display:inline-block;background:#0a58d6;color:#fff;padding:0 .38em;transform:skewX(-10deg)}
.voices-highlight>span{display:inline-block;transform:skewX(10deg)}
.voices-thumbs{display:flex;gap:12px;overflow-x:auto;scrollbar-width:none}
@media (min-width:1024px){.voices-thumbs{gap:14px}}
.voices-thumbs::-webkit-scrollbar{display:none}
.voices-thumb{position:relative;flex:0 0 calc((100% - 48px) / 5);aspect-ratio:77/83;border-radius:12px;overflow:hidden;border:1.5px solid rgba(255,255,255,.55);cursor:pointer;padding:0;background:#111;transition:filter .45s ease,opacity .45s ease,border-color .3s ease}
@media (min-width:1024px){.voices-thumb{flex:0 0 calc((100% - 56px) / 5);border-radius:14px}}
html.light .voices-thumb{border-color:rgba(11,13,20,.4)}
.voices-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.voices-thumb[data-on="0"]{border-color:transparent;filter:blur(2px) brightness(.9)}
.voices-thumb[data-on="0"]:hover{filter:blur(0.5px) brightness(1)}
.voices-stage{--w:230px;--step:240px;position:relative;width:100%;height:calc(var(--w)*16/9 + 80px)}
@media (min-width:768px){.voices-stage{--w:310px;--step:335px}}
.voices-slide{position:absolute;left:50%;top:0;width:var(--w);margin-left:calc(var(--w)/-2);display:flex;flex-direction:column;align-items:center;transform-origin:center center;transform:translateX(calc(var(--o)*var(--step))) scale(calc(1 - var(--abs)*.13));transition:transform .6s cubic-bezier(.22,1,.36,1),filter .6s ease,opacity .6s ease;z-index:calc(10 - var(--abs))}
.voices-slide[data-on="0"]{filter:blur(6px) brightness(.75);cursor:pointer}
.voices-slide[data-hide="1"]{opacity:0;pointer-events:none}
.voices-slide-logo{height:43px;width:79px;margin-bottom:14px;display:flex;align-items:center;justify-content:center}
@media (min-width:768px){.voices-slide-logo{height:54px;width:99px;margin-bottom:18px}}
.voices-arrow{position:absolute;top:50%;z-index:30;width:44px;height:44px;border-radius:9999px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);border:1px solid rgba(255,255,255,.25);color:#fff;cursor:pointer;transform:translateY(-50%);transition:background .2s ease}
.voices-arrow:hover{background:rgba(65,105,225,.85)}
@keyframes voicesCardIn{from{opacity:0;transform:translateY(22px) scale(.93)}to{opacity:1;transform:none}}
@keyframes voicesTextIn{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:none}}
.voices-card-in{animation:voicesCardIn .65s cubic-bezier(.22,1,.36,1) both}
.voices-text-in{animation:voicesTextIn .6s cubic-bezier(.22,1,.36,1) both}
@media (prefers-reduced-motion:reduce){.voices-card-in,.voices-text-in{animation:none}.voices-thumb{transition:none}}
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const sectionRef = useRef(null);
  const count = reviews.length;

  const goTo = useCallback(
    (i) => {
      if (!count) return;
      setActiveIdx(((i % count) + count) % count);
      setMuted(true);
    },
    [count]
  );

  // Mute playback whenever the section scrolls out of view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          setMuted(true);
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

  if (count === 0) return null;

  const current = reviews[activeIdx] || reviews[0];
  const half = Math.floor(count / 2);

  return (
    <section
      ref={sectionRef}
      className="voices-section w-full pt-14 sm:pt-18 md:pt-24 lg:pt-28 pb-16 md:pb-24 lg:pb-28 overflow-hidden relative"
    >
      <style dangerouslySetInnerHTML={{ __html: VOICES_CSS }} />
      <div className="home-container relative flex flex-col items-center">
        <h2 className="voices-fg text-center text-[32px] sm:text-4xl md:text-[46px] lg:text-[54px] xl:text-[58px] font-semibold tracking-[-0.025em] leading-[1.12] [text-wrap:balance] mb-10 md:mb-14">
          Proof<span className="text-[#4169E1]">.</span>{' '}
          <span className="voices-sub">From teams shipping in 3D.</span>
        </h2>
      </div>

      {/* Centered carousel: active card in the middle, neighbours blurred and scaled down */}
      <div className="voices-stage">
        {reviews.map((r, i) => {
          let o = (((i - activeIdx) % count) + count) % count;
          if (o > half) o -= count;
          const abs = Math.abs(o);
          const active = o === 0;
          const logo = getClientLogo(r);
          return (
            <div
              key={r.id ?? i}
              className="voices-slide"
              data-on={active ? '1' : '0'}
              data-hide={abs > 2 ? '1' : '0'}
              style={{ '--o': o, '--abs': abs }}
              onClick={() => { if (!active) goTo(i); }}
              aria-hidden={!active}
            >
              <div className="voices-slide-logo">
                {logo && (
                  <img
                    src={typeof logo.img === 'string' ? logo.img : logo.img?.src}
                    alt={`${logo.name} logo`}
                    style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                    className={`w-full h-full object-contain ${logo.white ? 'brand-logo-white' : ''}`}
                  />
                )}
              </div>
              <div className={`w-full rounded-[18px] md:rounded-[22px] overflow-hidden ${active ? 'shadow-[0_24px_60px_rgba(0,0,0,0.6)]' : 'pointer-events-none'}`}>
                <StageSlide review={r} isActive={active} isMuted={muted} onToggleMute={() => setMuted((m) => !m)} />
              </div>
            </div>
          );
        })}

        <button type="button" onClick={() => goTo(activeIdx - 1)} className="voices-arrow left-2 md:left-4" aria-label="Previous review">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button type="button" onClick={() => goTo(activeIdx + 1)} className="voices-arrow right-2 md:right-4" aria-label="Next review">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Quote */}
      <div key={`quote-${current.id ?? activeIdx}`} className="voices-text-in home-container flex flex-col items-center text-center mt-8 md:mt-10">
        {current.quote && (
          <p className="voices-fg italic text-[20px] sm:text-[22px] md:text-[26px] leading-[1.4] max-w-[760px]" style={{ fontFamily: "'Lora',Georgia,'Times New Roman',serif" }}>
            &ldquo;{current.quote}&rdquo;
          </p>
        )}
        <div className="voices-fg text-[15px] md:text-[16px] font-semibold mt-5">{current.clientName}</div>
        <div className="voices-sub text-[12px] md:text-[13px] uppercase tracking-[0.08em] mt-1">{current.company || current.designation}</div>
      </div>
    </section>
  );
};

export default ClientReviews;
