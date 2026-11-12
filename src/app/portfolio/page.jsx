import PortfolioPage from '@/components/PortfolioPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { getProjects } from '@/services/projectService';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio Portfolio',
  description:
    'Explore our portfolio of 3D visualization, VR, AR, and interactive configurator projects across industries.',
  url: `${SITE_URL}/portfolio`,
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
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Portfolio — Interactive 3D, ArchViz & CGI | Elipse Studio',
    description:
      'Elipse Studio projects: UE5 automotive configurators, real-time architectural VR walkthroughs, and 4K CGI campaigns.',
    canonical: `${SITE_URL}/portfolio`,
  });
}

export default async function Page() {
  // Server-rendered projects: tab counts and cards are in the HTML (no "(0)" flash,
  // crawlers see the work). An empty result falls back to the client-side fetch.
  const projects = await getProjects();
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <PortfolioPage initialProjects={projects.length ? projects : null} />
    </>
  );
}
