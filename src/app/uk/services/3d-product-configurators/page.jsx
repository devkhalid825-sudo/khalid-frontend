import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UkProductConfiguratorsPage from '@/components/uk/UkProductConfiguratorsPage';

const meta = {
  title: '3D Product Configurator Services in the UK',
  description: 'Real-time WebGL 3D product configurators for UK ecommerce brands on Shopify, WooCommerce, and Magento. CAD-accurate PBR renders, no app download, GBP + VAT integration — from Elipse Studio.',
  keywords: '3d product configurator uk, web configurator uk, shopify 3d configurator, real-time product configurator uk, interactive 3d configurator london, woocommerce 3d configurator',
  ogImage: `${SITE_URL}/assets/services/og-3d-product-configurators.jpg`,
  schemaType: 'Product',
};

const faqs = [
  { q: 'Do customers need to download anything?', a: 'No. The configurator runs natively in the browser via WebGL — no app, no download, no account required.' },
  { q: 'Does it integrate with our Shopify store?', a: 'Yes. SKU, GBP price, and UK VAT flow directly from the configurator into Shopify, WooCommerce, or Magento checkout.' },
  { q: 'How long does a configurator take to build?', a: 'Typically live within 10 weeks from CAD handover, with milestones at model, logic, and integration stages.' },
  { q: 'Can it handle my compatibility rules?', a: 'Yes — our rules engine blocks invalid option combinations before they reach your OMS, preventing misconfigured orders.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/3d-product-configurators`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: '3D Product Configurators', url: '/uk/services/3d-product-configurators' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/3d-product-configurators`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UkProductConfiguratorsPage />
    </>
  );
}
