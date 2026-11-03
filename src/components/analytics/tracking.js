/**
 * Shared dataLayer helpers for GTM.
 *
 * Every click event pushes the 4 standard keys used by the GTM variables
 * plus a stable identifier:
 *   button_name      -> DLV - Button Name
 *   page_name        -> DLV - Page Name
 *   button_location  -> DLV - Button Location
 *   destination_url  -> DLV - Destination URL
 *   cta_id           -> DLV - CTA ID   (data-track-id > data-el-track > data-track-demo > "<location>:<name>"),
 *                       unique per page ("-2", "-3"… suffix for repeats)
 * Calendly events add calendly_name (real Calendly meeting name); forms push form_name, form_type, form_location.
 *
 * Optional HTML attributes (no visual effect):
 *   data-track-id="stable-id"            stable CTA identifier
 *   data-track-name="Label"              override button_name
 *   data-track-location="section-name"   override button_location (on the element or any ancestor)
 *   data-track-destination="/contact"    destination for <button>s that navigate in JS
 *   data-track-cta                       force cta_click tracking
 *   data-track-ignore                    never track
 */

const TITLE_SUFFIX = /\s*[|\-–—]\s*Elipse Studio\s*$/i;

export const CALENDLY_DEFAULT_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';
const CALENDLY_EVENT_SLUG = '15-mins-meeting';
const CALENDLY_USER_PATH = '/bilal-lania-elipsestudio/';

// Real Calendly event-type names (from Calendly's public booking API for this profile, verified 2026-11-03).
const CALENDLY_EVENT_NAMES = { '15-mins-meeting': '15 mins meeting' };

const LAST_CLICK_KEY = 'el_last_calendly_click';
const BOOKINGS_KEY = 'el_bookings';
const ATTRIBUTION_WINDOW_MS = 24 * 60 * 60 * 1000; // a booking within 24 h is credited to the last Calendly CTA
const PAIR_WINDOW_MS = 10 * 60 * 1000; // an id-less redirect this soon after a recorded booking (and no new CTA click) is the same booking

const CLICKABLE_SELECTOR = 'a[href], button, [role="button"]';

/** Readable form names, keyed by form_type. */
export const FORM_NAMES = {
  main_contact: 'Main Contact Form',
  contact_page: 'Contact Page Form',
  us_contact: 'US Contact Form',
  uk_contact: 'UK Contact Form',
  au_contact: 'AU Contact Form',
  footer_newsletter: 'Footer Newsletter Signup',
};

// URL parameters Calendly adds on redirect that identify the invitee — never sent to GA4.
const PII_PARAMS = /^(invitee_(full_name|first_name|last_name|email)|text_reminder_number|guest_?emails?|answer_\d+|salesforce_uuid)$/i;

/** URL with Calendly's personal-data parameters removed. */
export function stripPiiParams(href) {
  try {
    const u = new URL(href);
    [...u.searchParams.keys()].forEach((k) => { if (PII_PARAMS.test(k)) u.searchParams.delete(k); });
    return u.toString();
  } catch {
    return href;
  }
}

export function push(payload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim().slice(0, 100);
const slug = (s) => clean(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

/* ---------------------------------------------------------------- storage */

const memory = {};
function readJSON(key) {
  try {
    const v = window.localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return memory[key] || null;
  }
}
function writeJSON(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    memory[key] = value;
  }
}

/* ---------------------------------------------------------------- page / element info */

/** Human-readable page name: document.title without the "| Elipse Studio" suffix. */
export function getPageName() {
  if (typeof document === 'undefined') return '';
  const path = window.location.pathname;
  if (path === '/') return 'Home';
  const title = clean(document.title.replace(TITLE_SUFFIX, ''));
  if (title) return title;
  const last = path.split('/').filter(Boolean).pop() || 'Home';
  return last.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Visible label of the clicked element (explicit attribute > text > aria-label > title > img alt). */
export function getButtonName(el) {
  const explicit = el.getAttribute('data-track-name');
  if (explicit) return clean(explicit);
  const text = clean(el.innerText || el.textContent);
  if (text) return text;
  const aria = el.getAttribute('aria-label') || el.getAttribute('title');
  if (aria) return clean(aria);
  const img = el.querySelector('img[alt]');
  if (img) return clean(img.getAttribute('alt'));
  return clean(el.getAttribute('data-track-id') || el.getAttribute('data-el-track') || el.getAttribute('data-track-demo')) || 'unknown';
}

function isFixed(el) {
  for (let node = el, i = 0; node && node !== document.body && i < 4; node = node.parentElement, i++) {
    if (window.getComputedStyle(node).position === 'fixed') return true;
  }
  return false;
}

/** Short slug of a section's own label: aria-label > aria-labelledby > first heading. */
function sectionLabel(section) {
  let label = section.getAttribute('aria-label');
  if (!label) {
    const by = section.getAttribute('aria-labelledby');
    const ref = by && document.getElementById(by.split(' ')[0]);
    if (ref) label = ref.textContent;
  }
  if (!label) {
    const h = section.querySelector('h1, h2, h3');
    if (h) label = h.textContent;
  }
  return labelSlug(label);
}

/** Section name from a heading/label text: slug, max 40 chars, cut at a word boundary. */
function labelSlug(label) {
  const s = slug(label);
  if (!s) return '';
  if (s.length <= 40) return s;
  const cut = s.slice(0, 40);
  return cut.slice(0, cut.lastIndexOf('-') > 15 ? cut.lastIndexOf('-') : 40);
}

/**
 * Where on the page the element lives:
 * data-track-location > header | footer | modal | floating | hero > section id > section heading slug
 * > (articles / plain main) the heading the element sits under > section | body.
 */
export function getButtonLocation(el) {
  const explicit = el.closest('[data-track-location]');
  if (explicit) return explicit.getAttribute('data-track-location');

  if (el.closest('header, nav, [role="banner"], [role="navigation"]')) return 'header';
  if (el.closest('footer, [role="contentinfo"]')) return 'footer';
  if (el.closest('[role="dialog"], dialog, [aria-modal="true"]')) return 'modal';
  if (isFixed(el)) return 'floating';

  const section = el.closest('section');
  // nearest meaningful id (page wrappers such as <main id="main-content"> are not sections)
  let idNode = el.closest('[id]');
  while (idNode && (idNode.tagName === 'MAIN' || idNode === document.body || WRAPPER_IDS.test(idNode.id) || idNode.id.includes(':'))) {
    idNode = idNode.parentElement ? idNode.parentElement.closest('[id]') : null;
  }
  if (idNode && section && idNode !== section && idNode.contains(section)) idNode = section.id ? section : null; // the section is closer
  const marker = `${idNode ? idNode.id : ''} ${section ? section.id + ' ' + section.className : ''}`.toLowerCase();
  if (marker.includes('hero') || el.closest('[class*="-hero"], [class^="hero"], [class*=" hero"]')) return 'hero';
  const main = document.querySelector('main');
  const firstSection = main && main.querySelector('section');
  if (section && firstSection === section) return 'hero';
  if (idNode && idNode.id) return idNode.id;
  const label = section ? sectionLabel(section) : '';
  if (label) return label;
  // long-form content (blog <article>, plain <main>, div-based layouts): the heading the button sits under
  const under = precedingHeading(el.closest('article') || main || document.body, el);
  if (under) return under;
  return section ? 'section' : 'body';
}

const WRAPPER_IDS = /^(main-content|main|content|root|app|page|__next|__layout)$/i;

/** Slug of the last h2/h3 inside container that comes before el in the document. */
function precedingHeading(container, el) {
  let found = null;
  for (const h of container.querySelectorAll('h2, h3')) {
    if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) found = h;
    else break;
  }
  return found ? labelSlug(found.textContent) : '';
}

/** Rendered and not visibility:hidden (hidden responsive twins / off-screen menus / preserved routes are skipped). */
function isRendered(el) {
  if (typeof el.checkVisibility === 'function') return el.checkVisibility({ visibilityProperty: true });
  return el.getClientRects().length > 0 && window.getComputedStyle(el).visibility !== 'hidden';
}

export function getDestinationUrl(el) {
  const link = el.closest('a[href]');
  if (link) return link.href;
  const declared = el.closest('[data-track-destination]');
  if (declared) {
    try {
      return new URL(declared.getAttribute('data-track-destination'), window.location.href).href;
    } catch {
      return declared.getAttribute('data-track-destination');
    }
  }
  return '';
}

const explicitId = (el) => el.getAttribute('data-track-id') || el.getAttribute('data-el-track') || el.getAttribute('data-track-demo');

/**
 * Stable CTA id: explicit attribute, else "<location>:<button-name-slug>".
 * If an earlier rendered element on the same page resolves to the same id, a "-2", "-3"… suffix
 * (DOM order) keeps every CTA unique on its page — same button in two sections never shares an id.
 * Hidden twins (desktop vs mobile copy of the same section) are skipped, so a CTA keeps one id on every device.
 */
export function getCtaId(el, name, location) {
  const own = explicitId(el);
  const nameSlug = slug(name) || 'unnamed';
  const base = own || `${location}:${nameSlug}`;
  let n = 0;
  for (const other of document.querySelectorAll(CLICKABLE_SELECTOR)) {
    if (other === el) break;
    // only rendered elements count: hidden responsive twins / preserved routes must not shift ids
    if (!isRendered(other) || other.closest('[data-track-ignore]')) continue;
    const oid = explicitId(other);
    if (own) {
      if (oid === own) n++;
    } else if (!oid && (slug(getButtonName(other)) || 'unnamed') === nameSlug && getButtonLocation(other) === location) {
      n++;
    }
  }
  return n ? `${base}-${n + 1}` : base;
}

/** Standard payload for any clicked element. */
export function buildClickPayload(el) {
  const button_name = getButtonName(el);
  const button_location = getButtonLocation(el);
  return {
    button_name,
    page_name: getPageName(),
    button_location,
    destination_url: getDestinationUrl(el),
    cta_id: getCtaId(el, button_name, button_location),
  };
}

/* ---------------------------------------------------------------- Calendly helpers */

export function isCalendlyUrl(url) {
  return /(^|\/\/)([a-z0-9-]+\.)*calendly\.com\//i.test(url || '');
}

/** Real Calendly meeting (event type) name for a Calendly URL. */
export function getCalendlyName(url) {
  try {
    const parts = new URL(fixCalendlyUrl(url)).pathname.split('/').filter(Boolean);
    const eventSlug = parts[1] || '';
    if (!eventSlug) return '';
    return CALENDLY_EVENT_NAMES[eventSlug] || eventSlug.replace(/[-_]+/g, ' ');
  } catch {
    return '';
  }
}

/**
 * Repairs known-bad Calendly URLs coming from CMS content:
 *  - truncated event slug ("/15-mins-m" → "/15-mins-meeting")
 *  - stale "month=YYYY-MM" parameter (Calendly opens the current month by default)
 */
export function fixCalendlyUrl(url) {
  if (!isCalendlyUrl(url)) return url;
  try {
    const u = new URL(url);
    if (u.pathname.startsWith(CALENDLY_USER_PATH)) {
      const eventSlug = u.pathname.slice(CALENDLY_USER_PATH.length).replace(/\/+$/, '');
      if (eventSlug && eventSlug !== CALENDLY_EVENT_SLUG && CALENDLY_EVENT_SLUG.startsWith(eventSlug)) {
        u.pathname = CALENDLY_USER_PATH + CALENDLY_EVENT_SLUG;
      }
    }
    u.searchParams.delete('month');
    return u.toString();
  } catch {
    return url;
  }
}

/** Calendly URL without our own attribution parameters (what we report as destination_url). */
function baseCalendlyUrl(url) {
  try {
    const u = new URL(fixCalendlyUrl(url));
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => u.searchParams.delete(k));
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Adds UTM parameters so Calendly stores the originating page/CTA on the booking and
 * passes them back to the /thank-you redirect (works across tabs and devices).
 */
export function decorateCalendlyUrl(url, payload) {
  try {
    const u = new URL(fixCalendlyUrl(url));
    u.searchParams.set('utm_source', 'elipsestudio.com');
    u.searchParams.set('utm_medium', 'website_cta');
    u.searchParams.set('utm_campaign', window.location.pathname);
    u.searchParams.set('utm_content', payload.button_location || '');
    u.searchParams.set('utm_term', payload.cta_id || '');
    return u.toString();
  } catch {
    return url;
  }
}

/** Remembers the last Calendly CTA so a later booking can be attributed to it. */
export function rememberCalendlyClick(payload) {
  writeJSON(LAST_CLICK_KEY, {
    button_name: payload.button_name,
    page_name: payload.page_name,
    page_path: window.location.pathname,
    button_location: payload.button_location,
    cta_id: payload.cta_id,
    calendly_url: payload.destination_url,
    calendly_name: payload.calendly_name,
    ts: Date.now(),
  });
}

/** Builds the calendly_click payload for an element; destination is the repaired, un-decorated Calendly URL. */
export function buildCalendlyClickPayload(el, rawUrl) {
  const payload = buildClickPayload(el);
  payload.destination_url = baseCalendlyUrl(rawUrl || payload.destination_url);
  payload.calendly_name = getCalendlyName(payload.destination_url);
  return payload;
}

/**
 * For buttons that open Calendly with window.open(): returns the URL to open
 * (repaired + UTM-decorated). The click itself is tracked by TrackingEvents
 * through the element's data-track-destination attribute.
 */
export function withCalendlyAttribution(url, el) {
  if (typeof window === 'undefined' || !el) return fixCalendlyUrl(url);
  return decorateCalendlyUrl(url, buildCalendlyClickPayload(el, url));
}

/* ---------------------------------------------------------------- booking confirmation */

function freshLastClick() {
  const last = readJSON(LAST_CLICK_KEY);
  return last && Date.now() - last.ts < ATTRIBUTION_WINDOW_MS ? last : null;
}

/**
 * Decides whether a booking signal is a NEW booking (shared across tabs via localStorage).
 *  - With Calendly's invitee id: counted once per id. Different ids always count.
 *  - Without an id (redirect without "Pass event details"):
 *      · a Calendly CTA click since the last booking (cleared on every booking) → new booking;
 *      · otherwise it is NOT counted if: the same /thank-you URL was already counted (reload / back),
 *        a booking was recorded in the last 10 min (embed postMessage + redirect = one booking),
 *        or there is no evidence of a Calendly visit at all (no utm params → /thank-you opened directly).
 * A genuine second booking always comes with a new Calendly click or a new invitee id, so it is never dropped.
 */
export function claimBookingConfirmed({ bookingId = '', claimKey = '', hasUtm = false } = {}) {
  const now = Date.now();
  const state = readJSON(BOOKINGS_KEY) || {};
  const ids = Array.isArray(state.ids) ? state.ids : [];
  const keys = Array.isArray(state.keys) ? state.keys : [];
  const lastTs = state.last_ts || 0;

  if (bookingId) {
    if (ids.includes(bookingId)) return false;
  } else {
    if (!freshLastClick()) {
      if (claimKey && keys.includes(claimKey)) return false;
      if (lastTs && now - lastTs < PAIR_WINDOW_MS) return false;
      if (!hasUtm) return false;
    }
  }
  writeJSON(BOOKINGS_KEY, {
    ids: bookingId ? [...ids, bookingId].slice(-50) : ids,
    keys: claimKey ? [...keys, claimKey].slice(-50) : keys,
    last_ts: now,
  });
  return true;
}

function resolveOrigin(source, utm) {
  const fresh = freshLastClick();
  const here = window.location.pathname;

  if (source === 'calendly_embed') {
    if (fresh && fresh.page_path === here) return { ...fresh, method: 'last_click' };
    return {
      button_name: 'Embedded Calendly widget', page_name: getPageName(), page_path: here,
      button_location: 'calendly_embed', cta_id: 'calendly-embed', calendly_url: CALENDLY_DEFAULT_URL, method: 'embed',
    };
  }
  if (utm && utm.utm_campaign) {
    if (fresh && fresh.page_path === utm.utm_campaign) return { ...fresh, method: 'last_click+utm' };
    return {
      button_name: '', page_name: '', page_path: utm.utm_campaign, button_location: utm.utm_content || '',
      cta_id: utm.utm_term || '', calendly_url: '', method: 'utm',
    };
  }
  if (fresh) return { ...fresh, method: 'last_click' };
  return { button_name: '', page_name: '', page_path: '', button_location: '', cta_id: '', calendly_url: '', method: 'none' };
}

/**
 * Pushes calendly_booking_confirmed once per booking, with the originating page and CTA.
 * source: 'calendly_embed' | 'thank_you_redirect'
 * calendlyName: event_type_name from Calendly's redirect, when available.
 * Never reads or pushes invitee name/email (PII).
 */
export function trackBookingConfirmed({ source, bookingId = '', utm = null, calendlyName = '', claimKey = '' }) {
  if (typeof window === 'undefined') return false;
  if (!claimBookingConfirmed({ bookingId, claimKey, hasUtm: !!(utm && utm.utm_campaign) })) return false;
  const o = resolveOrigin(source, utm);
  push({
    event: 'calendly_booking_confirmed',
    page_name: getPageName(),
    page_path: window.location.pathname,
    booking_source: source,
    booking_verified: bookingId ? 'yes' : 'no',
    attribution_method: o.method,
    calendly_name: clean(calendlyName) || o.calendly_name || getCalendlyName(o.calendly_url || CALENDLY_DEFAULT_URL),
    // the 4 standard keys carry the ORIGINATING CTA so the same GTM variables work
    button_name: o.button_name,
    button_location: o.button_location,
    destination_url: o.calendly_url,
    cta_id: o.cta_id,
    origin_page_name: o.page_name,
    origin_page_path: o.page_path,
    origin_button_name: o.button_name,
    origin_button_location: o.button_location,
    origin_cta_id: o.cta_id,
    origin_calendly_url: o.calendly_url,
  });
  writeJSON(LAST_CLICK_KEY, null);
  return true;
}

/** Calendly postMessage payload → invitee id (last segment of payload.invitee.uri). */
export function bookingIdFromMessage(data) {
  const uri = data && data.payload && data.payload.invitee && data.payload.invitee.uri;
  return typeof uri === 'string' ? uri.split('/').filter(Boolean).pop() || '' : '';
}

/* ---------------------------------------------------------------- forms */

/** One standard event for every successful lead form. */
export function trackFormSubmission(formType, formEl) {
  if (typeof window === 'undefined') return;
  push({
    event: 'form_submission',
    form_name: FORM_NAMES[formType] || formType,
    form_type: formType,
    form_location: formEl ? getButtonLocation(formEl) : 'body',
    page_name: getPageName(),
    page_path: window.location.pathname,
  });
}

/** Footer / newsletter email capture. */
export function trackEmailSignup(formType, el) {
  if (typeof window === 'undefined') return;
  push({
    event: 'email_signup',
    form_name: FORM_NAMES[formType] || formType,
    form_type: formType,
    form_location: el ? getButtonLocation(el) : 'footer',
    page_name: getPageName(),
    page_path: window.location.pathname,
  });
}
