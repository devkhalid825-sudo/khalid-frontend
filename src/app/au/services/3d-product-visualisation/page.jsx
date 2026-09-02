import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AUProductVisualisationPage from '@/components/au/AuProductVisualisationPage';

const meta = {
  title: '3D Rendering Studio Australia | Product Visualisation',
  description: 'Photoreal 3D product renders for Australian brands — every colour, material & finish from one CAD model. Transactional buyers. No photoshoot. Free sample render. AUD pricing.',
  keywords: '3d product visualisation australia, 3d product rendering australia, product visualisation services australia, e-commerce 3d rendering australia, photorealistic product rendering, 3d rendering studio sydney',
  ogImage: `${SITE_URL}/assets/services/og-3d-product-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'How much does a 3D product render cost in Australia?', a: 'Single hero product render: AUD $500–$1,200. Full product launch pack (360°, hero, lifestyle, detail): AUD $1,800–$4,200. Free sample render for qualifying AU projects.' },
  { q: 'Can 3D renders replace product photography for Australian brands?', a: 'Yes — 3D product rendering is more cost-efficient for multi-variant products and eliminates reshoots when designs change.' },
  { q: 'Do you need physical samples to start?', a: 'No — we can work from CAD files, reference products, or spec sheets. Physical samples help match materials exactly but are not required.' },
  { q: 'How long does a 3D product rendering project take?', a: 'A single product hero render set delivers in 1–2 weeks. A full product launch pack delivers in 2–3 weeks.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/3d-product-visualisation`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: '3D Product Visualisation', url: '/au/services/3d-product-visualisation' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/3d-product-visualisation`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AUProductVisualisationPage />
    </>
  );
}
