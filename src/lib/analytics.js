// Google Analytics 4 (GA4) Tracking Utility

/**
 * Track a lead conversion event in GA4 (Standard Key Event: generate_lead)
 * @param {string} label - E.g. 'Main Contact Form', 'US Contact Form'
 * @param {number} value - Numeric value for conversion (default 1)
 */
export const trackLeadConversion = (label = 'Contact Form Submission', value = 1) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'Engagement',
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track WhatsApp click conversions in GA4
 * @param {string} label - Location or context of the WhatsApp button
 */
export const trackWhatsAppClick = (label = 'Floating WhatsApp Button') => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: `WhatsApp Chat - ${label}`,
      value: 1,
    });
    window.gtag('event', 'click', {
      event_category: 'Outbound',
      event_label: `WhatsApp - ${label}`,
    });
  }
};

/**
 * Track Email click conversions in GA4
 * @param {string} label - Location or context of the mailto link
 */
export const trackEmailClick = (label = 'Email Link') => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: `Email Inquiry - ${label}`,
      value: 1,
    });
    window.gtag('event', 'click', {
      event_category: 'Outbound',
      event_label: `Email - ${label}`,
    });
  }
};
