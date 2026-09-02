import { SITE_URL } from '@/utils/api';
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AUAnimationPage from '@/components/au/AuAnimationPage';

const meta = {
  title: '3D Animation Services Australia | Product & Brand Animation',
  description: 'Cinematic 3D animation services for Australian brands — product animation, motion graphics, brand films & architectural walkthroughs. Sydney & Melbourne. AUD pricing. Free estimate.',
  keywords: '3d animation services australia, 3d animation company australia, motion graphics australia, product animation australia, architectural animation australia, 3d animation sydney',
  ogImage: `${SITE_URL}/assets/services/og-3d-animation.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'How much does 3D animation cost in Australia?', a: '3D animation services in Australia range from AUD $5,000–$18,000 for a 30-second product animation to AUD $20,000–$65,000 for a full brand film with CGI integration. Free AUD estimate within 24 hours.' },
  { q: 'How long does a 3D animation project take in Australia?', a: 'A 30-second product animation delivers in 4–6 weeks. A 60-second brand film delivers in 8–12 weeks from brief sign-off.' },
  { q: 'Can you produce 3D animation from our existing CAD files?', a: 'Yes — we build all animations from your actual CAD files for geometric accuracy to your product specification.' },
  { q: 'Do you produce 3D animation for Australian social media platforms?', a: 'Yes. Every project includes social media cuts as standard: 1:1 square, 9:16 portrait for Reels and TikTok, and 16:9 landscape for YouTube.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/3d-animation-services`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: '3D Animation Services', url: '/au/services/3d-animation-services' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/3d-animation-services`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AUAnimationPage />
    </>
  );
}
