'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export const CONSENT_KEY = 'elipse_cookie_consent'; // 'granted' | 'denied'
export const OPEN_COOKIE_SETTINGS_EVENT = 'elipse:open-cookie-settings';

const LEADSY_SRC = 'https://r2.leadsy.ai/tag.js';

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function isLikelyEurope() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith('Europe/');
  } catch {
    return false;
  }
}

function loadLeadsy() {
  if (document.getElementById('vtag-ai-js')) return;
  const s = document.createElement('script');
  s.id = 'vtag-ai-js';
  s.src = LEADSY_SRC;
  s.async = true;
  s.setAttribute('data-pid', '1Esz3xQn945NMkX0S');
  s.setAttribute('data-version', '062024');
  document.head.appendChild(s);
}

function applyConsent(value) {
  const state = value === 'granted' ? 'granted' : 'denied';
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }
  window.dataLayer.push({ event: 'cookie_consent_update', cookie_consent: state });
}

/**
 * Cookie consent banner wired to Google Consent Mode v2.
 * Defaults are set in app/layout.jsx (denied for EEA/UK/CH, granted elsewhere);
 * this banner records the visitor's choice and updates consent for GTM tags.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    // Show the banner shortly after load so it never competes with the page's first paint.
    const showTimer = stored ? null : setTimeout(() => setOpen(true), 800);

    // Leadsy visitor pixel: never after a "Reject"; in Europe only after an explicit "Accept".
    // Global Privacy Control (browser opt-out signal) is treated like "Reject" for advertising until the visitor accepts.
    const gpc = typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
    if (stored === 'granted' || (!stored && !gpc && !isLikelyEurope())) loadLeadsy();

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => {
      if (showTimer) clearTimeout(showTimer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    };
  }, []);

  const choose = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    applyConsent(value);
    if (value === 'granted') loadLeadsy();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md z-[60] rounded-2xl border border-white/15 bg-[#0d0d0f]/95 backdrop-blur-md text-white shadow-2xl p-5 md:p-6"
    >
      <p className="text-sm font-semibold mb-2">We value your privacy</p>
      <p className="text-[13px] leading-relaxed font-light text-white/70">
        We use cookies for analytics and to show you relevant Elipse Studio ads on other platforms such as LinkedIn,
        Meta and Google. Essential cookies are always on. Read our{' '}
        <Link href="/privacy-policy" className="text-[#8aa4f0] underline underline-offset-4 hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 px-4 py-2.5 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors cursor-pointer"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 px-4 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
