import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AuProductConfiguratorsPage from '@/components/au/AuProductConfiguratorsPage';

const meta = {
  title: '3D Product Configurator Australia | Shopify & WooCommerce',
  description: 'Custom 3D product configurators for Australian e-commerce brands — Shopify & WooCommerce native. Real-time WebGL. No app download. AUD + GST checkout. Free estimate.',
  keywords: '3d product configurator australia, web configurator australia, shopify 3d configurator, real-time product configurator australia, interactive 3d configurator sydney, woocommerce 3d configurator',
  ogImage: `${SITE_URL}/assets/services/og-3d-product-configurators.jpg`,
  schemaType: 'Product',
};

const faqs = [
  { q: 'Do Australian buyers need an app to use a 3D configurator?', a: 'No — runs directly in Chrome and Safari via WebGL. No app download required for Australian mobile users.' },
  { q: 'Does the configurator integrate with Shopify Australia?', a: 'Yes — selected option, AUD price, and GST flow directly into Shopify AU and WooCommerce checkout as a standard order.' },
  { q: 'How long does a configurator take to build?', a: 'Typically live within 10 weeks from CAD handover, with milestones at model, logic, and integration stages.' },
  { q: 'Can it handle my compatibility rules?', a: 'Yes — our rules engine blocks invalid option combinations before they reach your OMS, preventing misconfigured orders.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/3d-product-configurators`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: '3D Product Configurators', url: '/au/services/3d-product-configurators' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/3d-product-configurators`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AuProductConfiguratorsPage />
    </>
  );
}
