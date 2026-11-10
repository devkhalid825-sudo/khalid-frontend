'use client';

import { useEffect } from 'react';
import {
  push,
  buildClickPayload,
  buildCalendlyClickPayload,
  decorateCalendlyUrl,
  rememberCalendlyClick,
  trackBookingConfirmed,
  bookingIdFromMessage,
} from './tracking';

/**
 * Site-wide dataLayer events for GTM. This is the ONLY place click events are sent from —
 * components must not call gtag() directly (prevents duplicate GA4 events).
 * All click events carry: button_name, page_name, button_location, destination_url, cta_id.
 *
 *  - calendly_click             click on a calendly.com link or a [data-track-destination*="calendly.com"] button
 *                               (also stores the CTA for booking attribution + adds UTM params to the link)
 *  - demo_launched              click on an element with [data-track-demo]
 *  - calendly_booking_confirmed booking completed inside an embedded Calendly widget (deduped, attributed)
 *  - cta_click                  any other important CTA (contact, start/book, WhatsApp, mailto/tel,
 *                               external links, view project, [data-track-cta], ...)
 *
 * Legacy keys (link_url, page_path, demo_name) are kept so existing GTM tags keep working.
 */

const CTA_TEXT =
  /contact|connect|get in touch|get started|start|book|schedule|call|quote|estimate|hire|talk|consult|inquir|enquir|whatsapp|view project|view case|view portfolio|next project|all work|live demo|demo|let'?s/i;

// FAQ accordion questions ("How do I start a project? +") are not CTAs.
const FAQ_LABEL = /\?\s*[+−–-]?\s*$/;

const CLICKABLE = 'a[href], button, [role="button"]';
const CALENDLY_SELECTOR = 'a[href*="calendly.com"], [data-track-destination*="calendly.com"]';

function linkType(href) {
  if (!href) return 'button';
  if (href.startsWith('mailto:')) return 'email';
  if (href.startsWith('tel:')) return 'phone';
  if (/wa\.me|whatsapp\.com/i.test(href)) return 'whatsapp';
  try {
    return new URL(href, window.location.href).host === window.location.host ? 'internal' : 'external';
  } catch {
    return 'internal';
  }
}

function isCta(el, payload, type) {
  if (el.hasAttribute('data-track-cta') || el.hasAttribute('data-track-id') || el.hasAttribute('data-el-track')) return true;
  if (FAQ_LABEL.test(payload.button_name) || el.hasAttribute('aria-expanded')) return false;
  if (type === 'email' || type === 'phone' || type === 'whatsapp' || type === 'external') return true;
  if (/\/contact(\/|$|\?|#)/i.test(payload.destination_url)) return true;
  return CTA_TEXT.test(payload.button_name);
}

export default function TrackingEvents() {
  useEffect(() => {
    const onActivate = (e) => {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      if (window.location.pathname.startsWith('/admin')) return;
      if (target.closest('[data-track-ignore]')) return;

      const page_path = window.location.pathname;

      // 1) Calendly links and Calendly buttons
      if (e.type === 'click') {
        const cal = target.closest(CALENDLY_SELECTOR);
        if (cal) {
          const raw = cal.tagName === 'A' ? cal.getAttribute('href') : cal.getAttribute('data-track-destination');
          const payload = buildCalendlyClickPayload(cal, new URL(raw, window.location.href).href);
          push({ event: 'calendly_click', ...payload, link_type: 'calendly', link_url: payload.destination_url, page_path });
          rememberCalendlyClick(payload);
          // Runs before the browser follows the link, so the visitor lands on the decorated URL.
          if (cal.tagName === 'A') cal.setAttribute('href', decorateCalendlyUrl(payload.destination_url, payload));
          return;
        }
      }

      // 2) Demo launchers (click or keyboard activation)
      const demo = target.closest('[data-track-demo]');
      if (demo) {
        // Native <button>/<a> also fire 'click' on Enter/Space — only handle keydown for custom role="button" elements.
        if (e.type === 'keydown' && demo.matches('button, a[href]')) return;
        const payload = buildClickPayload(demo);
        push({
          event: 'demo_launched',
          ...payload,
          destination_url: payload.destination_url || window.location.href,
          demo_name: demo.getAttribute('data-track-demo') || 'demo',
          page_path,
        });
        return;
      }

      // 3) Generic CTAs — clicks only (native keyboard activation of links/buttons also fires 'click')
      if (e.type !== 'click') return;
      const el = target.closest(CLICKABLE);
      if (!el) return;
      if (el.matches('button[type="submit"], input[type="submit"]') && el.closest('form')) return; // form_submission covers these

      const payload = buildClickPayload(el);
      const type = linkType(payload.destination_url);
      if (!isCta(el, payload, type)) return;

      push({ event: 'cta_click', ...payload, link_type: type, page_path });
    };

    const onMessage = (e) => {
      let host = '';
      try { host = new URL(e.origin).hostname; } catch { return; }
      if (!/(^|\.)calendly\.com$/.test(host)) return;
      if (e.data?.event === 'calendly.event_scheduled') {
        trackBookingConfirmed({ source: 'calendly_embed', bookingId: bookingIdFromMessage(e.data) });
      }
    };

    document.addEventListener('click', onActivate, true);
    document.addEventListener('keydown', onActivate, true);
    window.addEventListener('message', onMessage);
    return () => {
      document.removeEventListener('click', onActivate, true);
      document.removeEventListener('keydown', onActivate, true);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}
