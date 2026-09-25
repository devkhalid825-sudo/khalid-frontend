import CapabilitiesPage from '@/components/CapabilitiesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/capabilities#webpage`,
  url: `${SITE_URL}/capabilities`,
  name: 'Enterprise 3D Configurator, WebGL & AR/VR Services | Elipse Studio',
  description:
    'Custom 3D web configurators, architectural VR walkthroughs, and enterprise WebGL development. Discover how Elipse Studio powers real-time 3D experiences.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  breadcrumb: { '@id': `${SITE_URL}/capabilities#breadcrumb` },
  inLanguage: 'en-US',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/capabilities#service`,
  name: 'Enterprise 3D Configurator, WebGL & AR/VR Capabilities',
  serviceType: [
    'Interactive 3D Configurators',
    'Real-Time ArchViz & Spatial VR/AR',
    'Cinematic 3D Product & Commercial Visuals',
    'WebGL & Three.js Development',
    'Virtual Showrooms & Digital Twins',
  ],
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Elipse Studio',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/actuallogo.webp`,
  },
  url: `${SITE_URL}/capabilities`,
  description:
    'Custom 3D web configurators, architectural VR walkthroughs, and enterprise WebGL development. Discover how Elipse Studio powers real-time 3D experiences.',
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Core Enterprise Capabilities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Interactive 3D Product Configurators',
          url: `${SITE_URL}/services/3d-product-configurators`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Architectural Visualization & Spatial VR/AR',
          url: `${SITE_URL}/services/architectural-visualization`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cinematic 3D Product & Commercial Visuals',
          url: `${SITE_URL}/services/3d-product-visualization`,
        },
      },
    ],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/capabilities#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Capabilities', item: `${SITE_URL}/capabilities` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Enterprise 3D Configurator, WebGL & AR/VR Services | Elipse Studio',
    description:
      'Custom 3D web configurators, architectural VR walkthroughs, and enterprise WebGL development. Discover how Elipse Studio powers real-time 3D experiences.',
    canonical: `${SITE_URL}/capabilities`,
    ogImage: `${SITE_URL}/assets/actuallogo.webp`,
    ogImageAlt: 'Elipse Studio — Enterprise 3D Configurator, WebGL & AR/VR Services',
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, serviceSchema, breadcrumb]} />
      <CapabilitiesPage />
    </>
  );
}
