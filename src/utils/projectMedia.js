'use client';

import React, { useState } from 'react';

export const VIDEO_HASH = '#video';
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB backend multer limit

export const isVideoFile = (file) => {
  if (!file) return false;
  if (typeof file.type === 'string' && file.type.startsWith('video/')) return true;
  return /\.(mp4|webm|mov|m4v|avi|mkv|ogg)$/i.test(file.name || '');
};

export const tagUploadedMediaUrl = (url, file) => {
  if (!url || typeof url !== 'string') return url || '';
  const trimmed = url.trim();
  if (!isVideoFile(file)) return trimmed;
  if (/#video\b/i.test(trimmed) || /\.(mp4|webm|mov|m4v|ogg)(?:[?#].*)?$/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}${VIDEO_HASH}`;
};

export const createLocalPreviewUrl = (file) => {
  const blobUrl = URL.createObjectURL(file);
  return isVideoFile(file) ? `${blobUrl}${VIDEO_HASH}` : blobUrl;
};

export const stripVideoHash = (url) => {
  if (!url || typeof url !== 'string') return '';
  return url.trim().replace(/#video\b/gi, '');
};

export const getYoutubeId = (url) => {
  if (!url || typeof url !== 'string') return '';
  const s = url.trim();
  if (!/youtu\.?be/i.test(s)) return '';
  const m = s.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : '';
};

export const isYoutubeShort = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /youtube\.com\/shorts\//i.test(url.trim());
};

export const getYoutubeEmbedUrl = (url, { autoplay = false, mute = false, loop = false, controls = true } = {}) => {
  const id = getYoutubeId(url);
  if (!id) return '';
  const params = new URLSearchParams({ rel: '0', playsinline: '1' });
  if (autoplay) params.set('autoplay', '1');
  if (mute) params.set('mute', '1');
  if (!controls) params.set('controls', '0');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', id);
  }
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
};

export const getYoutubeThumbUrl = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
};

export const getMediaKind = (url) => {
  if (!url || typeof url !== 'string' || !url.trim()) return 'empty';
  const s = url.trim();
  if (getYoutubeId(s)) return 'youtube';
  if (/#video\b|[?&]media=video\b|\.(mp4|webm|mov|m4v|ogg|avi|mkv)(?:[?#].*)?$/i.test(s)) {
    return 'video';
  }
  return 'image';
};

export const splitMediaList = (csv) => {
  if (!csv) return [];
  if (Array.isArray(csv)) return csv.map((s) => String(s || '').trim()).filter(Boolean);
  return String(csv)
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

/**
 * Smart dashboard preview thumbnail: renders YouTube thumbnail + badge,
 * <video> preview + badge, or <img> (with automatic fallback to <video> if a
 * legacy /media/:id URL without #video turns out to be a video stream).
 */
export const DashboardMediaThumb = ({ url, resolveUrl, className = 'w-full h-full object-cover', showBadge = true }) => {
  const [fallbackToVideo, setFallbackToVideo] = useState(false);
  const kind = fallbackToVideo ? 'video' : getMediaKind(url);

  if (kind === 'empty') return null;

  if (kind === 'youtube') {
    const thumb = getYoutubeThumbUrl(url);
    return (
      <div className="relative w-full h-full bg-black">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="YouTube preview" className={className} loading="lazy" />
        )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/25">
          <span className="w-8 h-8 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-md text-[11px] pl-0.5">
            ▶
          </span>
        </div>
        {showBadge && (
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-red-600/90 text-white text-[8px] font-bold uppercase tracking-wider pointer-events-none z-10">
            YouTube
          </span>
        )}
      </div>
    );
  }

  const resolved = stripVideoHash(resolveUrl ? resolveUrl(url) : url);

  if (kind === 'video') {
    return (
      <div className="relative w-full h-full bg-black">
        <video
          src={resolved}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={(e) => e.currentTarget.play?.().catch?.(() => {})}
          onMouseLeave={(e) => { e.currentTarget.pause?.(); }}
          className={className}
        />
        {showBadge && (
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#3558D4]/90 text-white text-[8px] font-bold uppercase tracking-wider pointer-events-none z-10">
            Video
          </span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt=""
      className={className}
      loading="lazy"
      onError={() => {
        if (!fallbackToVideo && (/\/media\/\d+/i.test(resolved) || /\/uploads\//i.test(resolved))) {
          setFallbackToVideo(true);
        }
      }}
    />
  );
};
