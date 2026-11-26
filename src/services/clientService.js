import { cachedFetch } from './api';

export async function getClients(options = {}) {
  const data = await cachedFetch('/clients', { tags: ['clients'], ...options });
  return Array.isArray(data) ? data : [];
}

export async function getClientHeroCards(options = {}) {
  const data = await cachedFetch('/clients/hero-cards', { tags: ['clients'], ...options });
  return Array.isArray(data) ? data : [];
}
