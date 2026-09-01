import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UkArchitecturalVisualisationPage from '@/components/uk/UkArchitecturalVisualisationPage';

const meta = {
  title: 'Architectural Visualisation Services in the UK',
  description: 'Photorealistic architectural visualisation for UK property developers, architects, and construction firms. Exterior renders, interior CGI, walkthrough animation, and planning application visuals from Elipse Studio.',
  keywords: 'architectural visualisation uk, cgi renders uk, 3d architectural rendering uk, planning application visuals uk, property visualisation london, arch viz uk',
  ogImage: `${SITE_URL}/assets/services/og-architectural-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Can you work directly from our BIM model?', a: 'Yes — we work from Revit, SketchUp, ArchiCAD, and AutoCAD files, importing the model directly to avoid re-modelling.' },
  { q: 'Do you produce verified views for planning applications?', a: 'Yes — we produce CGI verified views (AVR) to the standard UK local planning authorities require for consent packs.' },
  { q: 'How long does an exterior render take?', a: 'A single exterior CGI typically takes 2-4 weeks; full planning packs and walkthrough animation take longer depending on scope.' },
  { q: 'Can renders be used before a project has planning consent?', a: 'Yes — pre-application visuals are common for community consultation and investor decks.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/uk/services/architectural-visualisation`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
    },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/uk/services' },
    { name: 'Architectural Visualisation', url: '/uk/services/architectural-visualisation' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/uk/services/architectural-visualisation`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UkArchitecturalVisualisationPage />
    </>
  );
}
