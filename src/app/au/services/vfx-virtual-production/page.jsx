import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AuVfxVirtualProductionPage from '@/components/au/AuVfxVirtualProductionPage';

const meta = {
  title: 'VFX & Virtual Production Services in Australia',
  description: 'Visual effects and virtual production for Australian brand campaigns, TV commercials, and digital content. CGI integration, LED volume production, and broadcast-grade compositing from Elipse Studio.',
  keywords: 'vfx services australia, virtual production australia, led volume australia, cgi integration sydney, broadcast vfx australia, virtual production studio australia',
  ogImage: `${SITE_URL}/assets/services/og-vfx-virtual-production.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Can you support an LED volume shoot?', a: 'Yes — we build and operate real-time Unreal Engine environments for LED wall virtual production.' },
  { q: 'Do you work with Australian production companies and agencies?', a: 'Yes — we regularly work as the 3D/VFX execution partner for Australian production companies and agencies.' },
  { q: 'What formats do you deliver?', a: 'Free TV Australia and BVOD-spec masters, along with social and digital cutdowns as required.' },
  { q: 'How far in advance do you need to be briefed for a shoot?', a: 'Ideally 3-4 weeks ahead for asset and environment prep, though shorter timelines can be discussed.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/vfx-virtual-production`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: 'VFX & Virtual Production', url: '/au/services/vfx-virtual-production' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/vfx-virtual-production`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AuVfxVirtualProductionPage />
    </>
  );
}
