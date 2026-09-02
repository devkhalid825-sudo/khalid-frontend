import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AuVirtualRealityDevelopmentPage from '@/components/au/AuVirtualRealityDevelopmentPage';

const meta = {
  title: 'VR Development Australia | Virtual Reality Studio',
  description: 'Custom VR development for Australian brands — training simulations, property walkthroughs & product demos. Meta Quest & WebVR. Sydney & Melbourne. AUD pricing. Free estimate.',
  keywords: 'vr development australia, virtual reality development sydney, vr training australia, meta quest development australia, vr app development australia',
  ogImage: `${SITE_URL}/assets/services/og-vr-development.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'What VR hardware do you develop for in Australia?', a: 'Meta Quest standalone, PC VR, and WebVR. Meta Quest recommended for most Australian corporate deployments — no PC required at training sites.' },
  { q: 'How much does VR development cost in Australia?', a: 'VR training module: AUD $12,000–$35,000. Property VR walkthrough: AUD $8,000–$24,000. Free estimate in 24hrs.' },
  { q: 'Can VR training meet Australian WHS and SafeWork requirements?', a: 'Yes. We build VR training content with Australian workplace health and safety legislation in mind — SafeWork NSW, WorkSafe VIC, WHSQ, and DMIRS (WA).' },
  { q: 'How long does a VR development project take?', a: 'A single-scenario VR training module delivers in 8-12 weeks. VR property walkthrough delivers in 6-10 weeks.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/virtual-reality-development`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: 'Virtual Reality Development', url: '/au/services/virtual-reality-development' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/virtual-reality-development`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AuVirtualRealityDevelopmentPage />
    </>
  );
}
