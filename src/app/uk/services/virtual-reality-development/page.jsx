import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UkVirtualRealityDevelopmentPage from '@/components/uk/UkVirtualRealityDevelopmentPage';

const meta = {
  title: 'Virtual Reality (VR) Development Services in the UK',
  description: 'Custom VR development for UK enterprise training, product demos, property walkthroughs, and virtual showrooms. Meta Quest, PC VR, and WebVR from Elipse Studio London.',
  keywords: 'vr development uk, virtual reality development london, vr training uk, meta quest development uk, vr app development uk',
  ogImage: `${SITE_URL}/assets/services/og-vr-development.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Which headsets do you support?', a: 'Meta Quest 2 and 3, PC VR (Valve Index, HTC Vive), and browser-based WebVR.' },
  { q: 'Can VR training track completion and performance?', a: 'Yes — we can build in analytics and scoring for compliance or training-record purposes.' },
  { q: 'How long does a VR build take?', a: 'Typically 8-14 weeks depending on environment complexity and interaction depth.' },
  { q: 'Do you support multi-user VR sessions?', a: 'Yes — for collaborative reviews or group training we build networked multi-user sessions.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/virtual-reality-development`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: 'Virtual Reality Development', url: '/uk/services/virtual-reality-development' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/virtual-reality-development`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UkVirtualRealityDevelopmentPage />
    </>
  );
}
