import { SITE_URL } from '@/utils/api';

const site = SITE_URL.replace(/\/+$/, '');

export const REGION_OG_LOCALES = {
  global: 'en_US',
  us: 'en_US',
  uk: 'en_GB',
  au: 'en_AU',
};

/**
 * Reciprocal hreflang path clusters for genuinely equivalent service hubs
 * and service pages across Global (x-default), US (en-US), UK (en-GB), and AU (en-AU).
 * Regional-only pages without a true cross-region match are intentionally omitted
 * rather than pointed to non-equivalent URLs.
 */
const CLUSTER_ROUTES = {
  'services-hub': {
    'x-default': '/services',
    'en-US': '/us/services',
    'en-GB': '/uk/services',
    'en-AU': '/au/services',
  },
  'architectural-visualization': {
    'x-default': '/services/architectural-visualization',
    'en-US': '/us/services/architectural-visualization',
    'en-GB': '/uk/services/architectural-visualisation',
    'en-AU': '/au/services/architectural-visualisation',
  },
  '3d-product-visualization': {
    'x-default': '/services/3d-product-visualization',
    'en-US': '/us/services/3d-product-visualization',
    'en-GB': '/uk/services/3d-product-visualisation',
    'en-AU': '/au/services/3d-product-visualisation',
  },
  '3d-product-configurators': {
    'x-default': '/services/3d-product-configurators',
    'en-US': '/us/services/3d-product-configurators',
    'en-GB': '/uk/services/3d-product-configurators',
    'en-AU': '/au/services/3d-product-configurators',
  },
  'interactive-web-experiences': {
    'x-default': '/services/interactive-web-experiences',
    'en-US': '/us/services/interactive-web-experiences',
    'en-GB': '/uk/services/interactive-web-experiences',
    'en-AU': '/au/services/interactive-web-experiences',
  },
  'vr-development': {
    'x-default': '/services/vr-development',
    'en-US': '/us/services/virtual-reality-development',
    'en-GB': '/uk/services/virtual-reality-development',
    'en-AU': '/au/services/virtual-reality-development',
  },
  'ar-development': {
    'x-default': '/services/ar-development',
    'en-US': '/us/services/ar-development',
  },
  '3d-animation': {
    'x-default': '/services/3d-animation',
    'en-US': '/us/services/3d-animation-services',
    'en-GB': '/uk/services/3d-animation-services',
    'en-AU': '/au/services/3d-animation-services',
  },
  'vfx-virtual-production': {
    'x-default': '/services/vfx-virtual-production',
    'en-US': '/us/services/vfx-virtual-production',
    'en-GB': '/uk/services/vfx-virtual-production',
    'en-AU': '/au/services/vfx-virtual-production',
  },
  'virtual-showrooms-digital-twins': {
    'x-default': '/services/virtual-showrooms-digital-twins',
    'en-US': '/us/services/virtual-showrooms',
    'en-GB': '/uk/services/virtual-showrooms',
    'en-AU': '/au/services/virtual-showrooms',
  },
};

export function getServiceHreflang(clusterKey) {
  const routes = CLUSTER_ROUTES[clusterKey];
  if (!routes) return undefined;
  return Object.fromEntries(
    Object.entries(routes).map(([lang, route]) => [lang, `${site}${route}`])
  );
}

export function getRegionalSeoOptions(region, clusterKey) {
  return {
    ogLocale: REGION_OG_LOCALES[region] || REGION_OG_LOCALES.global,
    ...(clusterKey ? { languages: getServiceHreflang(clusterKey) } : {}),
  };
}
