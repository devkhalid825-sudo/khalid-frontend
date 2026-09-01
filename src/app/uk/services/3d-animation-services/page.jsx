import { SITE_URL } from '@/utils/api';
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UKAnimationPage from '@/components/uk/UkAnimationPage';

const meta = {
  title: '3D Animation Services in the UK',
  description: 'Cinematic 3D animation and motion graphics services for UK brands and enterprises. Architectural walkthroughs, product animation, explainer videos, and character work from Elipse Studio.',
  keywords: '3d animation services uk, 3d animation company uk, motion graphics uk, product animation uk, architectural animation uk, explainer video uk, 3d animation london',
  ogImage: `${SITE_URL}/assets/services/og-3d-animation.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'What 3D animation services does Elipse Studio offer in the UK?', a: 'Elipse Studio produces architectural walkthroughs, product animation, character animation, motion graphics, explainer videos, cinematic marketing animation, real-time animation, and broadcast and social edits for UK brands, agencies, and enterprises.' },
  { q: 'How long does 3D animation production take?', a: 'Motion graphics: 3-5 weeks. Product animation: 4-8 weeks. Character animation and walkthroughs: 8-14 weeks. Cinematic marketing: 12-20+ weeks.' },
  { q: 'Can Elipse Studio work with UK marketing agencies?', a: 'Yes. We frequently partner with UK marketing agencies as their production execution partner for animation and motion graphics.' },
  { q: 'What software does Elipse Studio use for animation?', a: 'Unreal Engine 5, Cinema 4D, Autodesk Maya, Adobe After Effects, V-Ray, Corona, and DaVinci Resolve.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/3d-animation-services`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: '3D Animation Services', url: '/uk/services/3d-animation-services' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/3d-animation-services`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UKAnimationPage />
    </>
  );
}
