import industriesJson from './industriesData.json';

export const industriesData = industriesJson;

/**
 * Server-side / async getter functions
 */
export async function getIndustries() {
  return industriesJson;
}

export async function getIndustryBySlug(slug) {
  const normalized = slug === 'ecommerce' ? 'e-commerce' : slug;
  return industriesJson.find((ind) => ind.slug === normalized || ind.slug === slug) || null;
}

export default industriesData;

/**
 * Curated "Latest Work" project paths per industry, so the carousel at the
 * bottom of each industry page only shows projects relevant to that vertical.
 * Paths must match live /project/<slug> routes.
 */
export const industryLatestWork = {
  'real-estate': ['/project/virtual-reality-experience', '/project/zenith-by-amber', '/project/ary-gujranwala-villas', '/project/khoj', '/project/penthouse-360-tour', '/project/villa', '/project/neveganapartment', '/project/love'],
  architecture: ['/project/khoj', '/project/zenith-by-amber', '/project/ary-gujranwala-villas', '/project/amalie-arena', '/project/classic-villa', '/project/the-academy', '/project/restaurant-visualization', '/project/virtual-reality-experience'],
  'interior-design': ['/project/virtual-reality-experience', '/project/khoj', '/project/penthouse-360-tour', '/project/restaurant-visualization', '/project/classic-villa', '/project/villa', '/project/love'],
  manufacturing: ['/project/bean-trailer-3d-builder', '/project/inverex-configurator', '/project/deck-configurator', '/project/parcho', '/project/gippro-animation', '/project/Costa-cart', '/project/towel-configurator'],
  'e-commerce': ['/project/bean-trailer-3d-builder', '/project/Costa-cart', '/project/t-shirt-configurator', '/project/cap-configurator', '/project/steering-configurator', '/project/seat-configurator', '/project/fruit-configurator', '/project/yacht-configurator', '/project/ahmed-foods'],
  automotive: ['/project/kia-configurator', '/project/volvo-configurator', '/project/byd-shark-6-configurator', '/project/steering-configurator', '/project/seat-configurator', '/project/Costa-cart', '/project/bean-trailer-3d-builder'],
  furniture: ['/project/virtual-reality-experience', '/project/deck-configurator', '/project/towel-configurator', '/project/penthouse-360-tour', '/project/villa'],
  'education-training': ['/project/french-bee-vr-training', '/project/roamstead-web-vr', '/project/wayfinding-ar', '/project/the-academy', '/project/meta-tour'],
  hospitality: ['/project/khoj', '/project/amalie-arena', '/project/restaurant-visualization', '/project/villa', '/project/penthouse-360-tour', '/project/ary-gujranwala-villas'],
  retail: ['/project/ahmed-foods', '/project/malka-foods', '/project/anamorphic-animation', '/project/omore', '/project/tapal-family-mixture', '/project/lahore-zoo', '/project/jewellery-shop'],
};
