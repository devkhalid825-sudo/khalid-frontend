import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UkVirtualShowroomsPage from '@/components/uk/UkVirtualShowroomsPage';

const meta = {
  title: 'Virtual Showroom & Digital Twin Services in the UK',
  description: 'Interactive 3D virtual showrooms and digital twins for UK manufacturers, property developers, and retail brands. Browser-accessible, 24/7 immersive environments from Elipse Studio.',
  keywords: 'virtual showroom uk, digital twin uk, 3d virtual showroom london, online showroom development uk, digital twin development uk',
  ogImage: `${SITE_URL}/assets/services/og-virtual-showrooms-digital-twins.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Do visitors need to install anything?', a: 'No — the showroom runs in a standard web browser, accessible via a shared link.' },
  { q: 'Can the showroom reflect our real facility?', a: 'Yes — for digital twins we build from BIM data or site surveys for an accurate 1:1 replica.' },
  { q: 'How often can the product range be updated?', a: 'Content updates are scoped separately and can be scheduled as your catalogue changes.' },
  { q: 'How long does a virtual showroom take to build?', a: 'Typically 8-12 weeks depending on catalogue size and environment complexity.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/virtual-showrooms`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: 'Virtual Showrooms', url: '/uk/services/virtual-showrooms' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/virtual-showrooms`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UkVirtualShowroomsPage />
    </>
  );
}
