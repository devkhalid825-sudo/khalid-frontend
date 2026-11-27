import { SITE_URL } from '@/utils/api';

const site = SITE_URL.replace(/\/+$/, '');

export const HUB_OG_IMAGES = {
  capabilities: `${site}/assets/About-page/capabilities.webp`,
  services: `${site}/assets/About-page/service.webp`,
};

/**
 * Canonical Open Graph preview images mapped directly from each main
 * service page's hero visual (all verified existing assets).
 * Regional UK, US, and AU service pages reuse their corresponding main service image.
 */
export const SERVICE_OG_IMAGES = {
  'architectural-visualization': `${site}/media/309`,
  'real-time-archviz-spatial-vr-ar': `${site}/media/309`,
  '3d-product-visualization': `${site}/assets/ElipseImages/projects/G-2.webp`,
  'cinematic-3d-product-commercial-visuals': `${site}/assets/ElipseImages/projects/G-2.webp`,
  '3d-product-configurators': `${site}/assets/About-page/newkia.webp`,
  'interactive-3d-web-product-configurators': `${site}/assets/About-page/newkia.webp`,
  'interactive-web-experiences': `${site}/assets/ElipseImages/projects/2.webp`,
  'vr-development': `${site}/assets/tim-barth/Day/01.0000.webp`,
  'ar-development': `${site}/assets/Ar/01 (1).webp`,
  '3d-animation': `${site}/assets/Ahmed-food/jelly/01.webp`,
  'product-animation': `${site}/assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp`,
  'vfx-virtual-production': `${site}/assets/YPC/V1_15_C0674045.webp`,
  'virtual-showrooms-digital-twins': `${site}/assets/emerled/Living.webp`,
  'custom-software-development': `${site}/assets/costom-software/costom-software.webp`,
  'website-development': `${site}/assets/ElipseImages/projects/clubpro.webp`,
  'mobile-app-development': `${site}/assets/App-web-image/hero.webp`,
  'ui-ux-design-web-and-mobile-apps': `${site}/assets/web-app-ui/second-web.webp`,
  'creative-services': `${site}/assets/ElipseImages/projects/motion-graphics.webp`,
  'enterprise-solutions': `${site}/assets/enterprises/hero.webp`,
  marketing: `${site}/assets/marketing/third.webp`,
};

export function getServiceOgImage(slug) {
  return SERVICE_OG_IMAGES[slug] || `${site}/assets/logo-og.png`;
}
