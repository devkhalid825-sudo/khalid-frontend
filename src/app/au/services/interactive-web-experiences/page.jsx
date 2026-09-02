import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AuInteractiveWebExperiencesPage from '@/components/au/AuInteractiveWebExperiencesPage';

const meta = {
  title: 'Interactive Web Experiences Services in Australia',
  description: 'WebGL-powered interactive experiences, 3D landing pages, and immersive brand microsites for Australian digital campaigns. GSAP, Three.js, and Unreal Pixel Streaming — from Elipse Studio.',
  keywords: 'interactive web experiences australia, webgl development australia, 3d website australia, immersive microsite australia, three.js developer australia, pixel streaming australia',
  ogImage: `${SITE_URL}/assets/services/og-interactive-web-experiences.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Does it work on mobile?', a: 'Yes — every build is tested and optimised for mobile browsers and Australian mobile network conditions before launch.' },
  { q: 'Do visitors need to download anything?', a: 'No — everything runs natively in the browser, including Unreal Pixel Streaming builds.' },
  { q: 'How long does an interactive campaign build take?', a: 'Typically 4-8 weeks depending on scene complexity and interaction depth.' },
  { q: 'Can it integrate with our existing website?', a: 'Yes — delivered as an embeddable build or a standalone microsite linked from your main site.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/interactive-web-experiences`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: 'Interactive Web Experiences', url: '/au/services/interactive-web-experiences' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/interactive-web-experiences`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AuInteractiveWebExperiencesPage />
    </>
  );
}
