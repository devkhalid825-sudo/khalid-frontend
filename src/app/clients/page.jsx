import { notFound } from 'next/navigation';
import ClientsPage from '@/components/ClientsPage';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { getClients } from '@/services/clientService';
import { getReviews } from '@/services/reviewService';

// Temporarily hidden — flip to true when ready to publish /clients publicly.
const CLIENTS_PAGE_ENABLED = false;

export const revalidate = 0; // always fetch fresh clients from the backend

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio Clients',
  description:
    'Brands across real estate, interiors, food, hospitality and automotive that work with Elipse Studio on 3D, VR/AR and interactive experiences.',
  url: `${SITE_URL}/clients`,
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Elipse Studio',
    url: SITE_URL,
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Our Clients', item: `${SITE_URL}/clients` },
  ],
};

export function generateMetadata() {
  if (!CLIENTS_PAGE_ENABLED) {
    return {
      title: 'Not Found',
      robots: { index: false, follow: false },
    };
  }
  return buildMetadata({
    title: 'Our Clients',
    description:
      'Meet the brands that build with Elipse Studio: 3D visualisation, VR/AR and interactive configurator work across real estate, interiors, food, hospitality and automotive.',
    keywords: 'Elipse Studio clients, 3D visualization clients, VR AR clients, interactive configurator clients',
    canonical: `${SITE_URL}/clients`,
  });
}

export default async function Page() {
  if (!CLIENTS_PAGE_ENABLED) {
    notFound();
  }
  const [clients, reviews] = await Promise.all([getClients(), getReviews()]);
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <ClientsPage clients={clients} reviews={reviews} />
    </>
  );
}
