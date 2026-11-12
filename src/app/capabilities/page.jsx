import CapabilitiesPage from '@/components/CapabilitiesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { buildFaqSchema } from '@/lib/seo';
import { CAPABILITIES_FAQS } from '@/seo/pageFaqs';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/capabilities#webpage`,
  url: `${SITE_URL}/capabilities`,
  name: '3D Engineering, CAD-to-WebGL & Real-Time Tech Capabilities | Elipse Studio',
  description:
    'Technical capabilities and engineering pipelines at Elipse Studio covering CAD optimization, WebGL, PlayCanvas, Unreal Engine 5 Pixel Streaming, VR, Shopify Plus/HubSpot integrations, and CGI production.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  breadcrumb: { '@id': `${SITE_URL}/capabilities#breadcrumb` },
  inLanguage: 'en-US',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/capabilities#service`,
  name: '3D Engineering, CAD-to-WebGL & Real-Time Tech Capabilities',
  serviceType: [
    'Interactive 3D Configurators',
    'Real-Time ArchViz & Interactive Virtual Tours',
    'CGI Production Studio',
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
    'Technical capabilities and engineering pipelines at Elipse Studio covering CAD optimization, WebGL, PlayCanvas, Unreal Engine 5 Pixel Streaming, VR, Shopify Plus/HubSpot integrations, and CGI production.',
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
          name: 'Real-Time ArchViz & Interactive Virtual Tours',
          url: `${SITE_URL}/services/architectural-visualization`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CGI Production Studio',
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
    title: '3D Engineering, CAD-to-WebGL & Real-Time Tech Capabilities | Elipse Studio',
    description:
      "Explore Elipse Studio's real-time 3D engineering capabilities: CAD optimization, WebGL and Unreal Engine 5 Pixel Streaming, Shopify Plus and HubSpot CPQ integrations, VR, and commercial CGI.",
    canonical: `${SITE_URL}/capabilities`,
    ogImage: `${SITE_URL}/assets/actuallogo.webp`,
    ogImageAlt: 'Elipse Studio — 3D Engineering, CAD-to-WebGL & Real-Time Tech Capabilities',
  });
}

const faqSchema = buildFaqSchema(CAPABILITIES_FAQS);

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, serviceSchema, breadcrumb, faqSchema].filter(Boolean)} />
      <CapabilitiesPage />
    </>
  );
}
