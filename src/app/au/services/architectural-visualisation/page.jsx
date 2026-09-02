import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import AuArchitecturalVisualisationPage from '@/components/au/AuArchitecturalVisualisationPage';

const meta = {
  title: 'Architectural Visualisation Services Australia | 3D Renders & Walkthroughs',
  description: 'Photoreal architectural visualisation for Australian property developers and architects — 3D renders, walkthroughs & VR tours. Sydney, Melbourne, Brisbane. AUD pricing. Free estimate.',
  keywords: 'architectural visualisation australia, cgi renders australia, 3d architectural rendering australia, planning application visuals australia, property visualisation sydney, arch viz australia',
  ogImage: `${SITE_URL}/assets/services/og-architectural-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'How much does architectural visualisation cost in Australia?', a: 'Exterior render: AUD $1,200–$3,500. Planning submission pack (6–10 renders): AUD $5,000–$13,000. Animated walkthrough: AUD $6,000–$22,000. Free AUD estimate in 24hrs.' },
  { q: 'Can you produce visualisation for Australian planning submissions?', a: 'Yes — we produce packs formatted to NSW, VIC, and QLD local council requirements at the specified resolutions and camera positions.' },
  { q: 'What source files do you need from Australian architects?', a: 'Revit BIM models, AutoCAD DWG files, ArchiCAD, SketchUp, or Rhino — plus a material and finish specification.' },
  { q: 'Do you produce VR apartment walkthroughs for Australian off-plan sales?', a: 'Yes — VR off-plan apartment walkthroughs are one of our most common Australian project types.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/au/services/architectural-visualisation`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/au/services' },
    { name: 'Architectural Visualisation', url: '/au/services/architectural-visualisation' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/au/services/architectural-visualisation`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <AuArchitecturalVisualisationPage />
    </>
  );
}
