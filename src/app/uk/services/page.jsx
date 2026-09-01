import UKServicesPage from '@/components/uk/UkServicesPage';
import { buildMetadata, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const faqs = [
  { q: 'What services does Elipse Studio offer UK brands?', a: 'Elipse Studio UK delivers every immersive capability from one London-based team: 3D product configurators, VR development, architectural visualisation, 3D product visualisation, 3D animation, VFX and virtual production, virtual showrooms and digital twins, and interactive web experiences. All services are available with UK VAT-inclusive quoting and GMT account management from our London office.' },
  { q: 'How is working with a UK-based Elipse Studio team different?', a: 'The difference is operational, not just geographic. GMT hours mean your project is never waiting overnight for a decision or revision. UK VAT-inclusive quoting means no invoice surprises. A London-based account manager means direct phone access at +44 20 4634 3117 during your working day.' },
  { q: 'Can Elipse Studio handle multiple services for our UK brand at once?', a: 'Yes — because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your product configurator also generates your product renders, powers your WebAR experience, and populates your virtual showroom — without any additional 3D production cost for each channel.' },
  { q: 'How do I get a quote for a UK project?', a: 'Fill in the form at the bottom of this page or call our UK direct line at +44 20 4634 3117. We respond within one UK business day with a free ballpark estimate. For qualifying projects we also offer a free sample render so you can assess visual quality before any commitment.' },
  { q: 'Do you work with UK startups as well as established brands?', a: 'Yes. Our UK client base spans early-stage DTC brands launching their first product to established British manufacturers replacing physical showrooms. The scope of the project scales to your stage.' },
];

const ukServices = [
  { position: 1, name: '3D Product Configurators UK', url: `${SITE_URL}/uk/services/3d-product-configurators` },
  { position: 2, name: 'VR Development UK', url: `${SITE_URL}/uk/services/virtual-reality-development` },
  { position: 3, name: 'Architectural Visualisation UK', url: `${SITE_URL}/uk/services/architectural-visualisation` },
  { position: 4, name: '3D Product Visualisation UK', url: `${SITE_URL}/uk/services/3d-product-visualisation` },
  { position: 5, name: '3D Animation UK', url: `${SITE_URL}/uk/services/3d-animation-services` },
  { position: 6, name: 'VFX & Virtual Production UK', url: `${SITE_URL}/uk/services/vfx-virtual-production` },
  { position: 7, name: 'Virtual Showrooms & Digital Twins UK', url: `${SITE_URL}/uk/services/virtual-showrooms` },
  { position: 8, name: 'Interactive Web Experiences UK', url: `${SITE_URL}/uk/services/interactive-web-experiences` },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio UK Services',
  description:
    'Elipse Studio UK delivers 3D product configurators, AR, VR, architectural visualisation, 3D animation, VFX, virtual showrooms, and interactive web experiences for UK brands.',
  url: `${SITE_URL}/uk/services`,
  mainEntity: {
    '@type': 'ItemList',
    name: 'Our UK Services',
    itemListElement: ukServices.map((s) => ({
      '@type': 'ListItem',
      position: s.position,
      name: s.name,
      url: s.url,
    })),
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/uk/services` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Immersive 3D, AR & VR Services UK | Elipse Studio London',
    description:
      "Elipse Studio is the UK's immersive studio for 3D product configurators, AR, VR, architectural visualisation, 3D animation, VFX, virtual showrooms, and interactive web experiences — from one London team.",
    canonical: `${SITE_URL}/uk/services`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb, buildFaqSchema(faqs)]} />
      <UKServicesPage />
    </>
  );
}
