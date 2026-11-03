'use client';

import { useEffect } from 'react';
import { trackBookingConfirmed, stripPiiParams } from '@/components/analytics/tracking';

/**
 * Fires once per booking when a visitor lands on /thank-you after booking via Calendly.
 *
 * Calendly's redirect (with "Pass event details" enabled) adds invitee_uuid, event_type_name
 * and the utm_* parameters we put on the Calendly link → used for dedup, meeting name and attribution.
 * Name/email/phone/answer parameters are removed from the address bar first so they never reach
 * GA4 (page_location) or the dataLayer.
 */
export default function BookingConfirmedEvent() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const clean = stripPiiParams(window.location.href);
    if (clean !== window.location.href) window.history.replaceState(window.history.state, '', clean);

    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      if (q.get(k)) utm[k] = q.get(k);
    });
    trackBookingConfirmed({
      source: 'thank_you_redirect',
      bookingId: q.get('invitee_uuid') || '',
      calendlyName: q.get('event_type_name') || '',
      claimKey: clean,
      utm: Object.keys(utm).length ? utm : null,
    });
  }, []);
  return null;
}
