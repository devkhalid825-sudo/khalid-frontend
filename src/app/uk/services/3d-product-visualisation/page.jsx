import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UKProductVisualisationPage from '@/components/uk/UkProductVisualisationPage';

const meta = {
  title: '3D Product Visualisation Services in the UK',
  description: 'Photorealistic 3D product visualisation services for UK e-commerce brands, manufacturers, and DTC companies. Hero renders, 360-degree views, lifestyle shots, and exploded assemblies from Elipse Studio.',
  keywords: '3d product visualisation uk, 3d product rendering uk, product visualisation services uk, e-commerce 3d rendering uk, photorealistic product rendering, 3d product viz london',
  ogImage: `${SITE_URL}/assets/services/og-3d-product-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Do you need physical samples to start?', a: 'No — we can work from CAD files, reference products, or spec sheets. Physical samples help match materials exactly but are not required.' },
  { q: 'Is 3D visualisation cheaper than photography for a full catalogue?', a: "For catalogues with many colour or material variants, yes — the 3D model is built once and every variant renders at a fraction of a reshoot's cost." },
  { q: 'Can you match our exact colours and finishes?', a: 'Yes — PBR materials are calibrated against your physical samples or Pantone/RAL references before final renders are produced.' },
  { q: 'Do renders work for both web and print?', a: 'Yes — every render is delivered in web-optimised and print-ready (CMYK, high-resolution) formats from the same render pass.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/3d-product-visualisation`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: '3D Product Visualisation', url: '/uk/services/3d-product-visualisation' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/3d-product-visualisation`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UKProductVisualisationPage />
    </>
  );
}
