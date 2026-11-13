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
