import AUServicesPage from '@/components/au/AuServicesPage';
import { buildMetadata, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const faqs = [
  { q: 'What services does Elipse Studio offer Australian brands?', a: 'Elipse Studio Australia delivers every immersive capability from one Sydney and Melbourne-based team: 3D product configurators, VR development, architectural visualisation, 3D product visualisation, 3D animation, VFX and virtual production, virtual showrooms and digital twins, and interactive web experiences. All services are available with AUD pricing (GST included) and AEST account management.' },
  { q: 'How is working with an Australian-based Elipse Studio team different?', a: 'The difference is operational, not just geographic. AEST hours mean your project is never waiting overnight for a decision or revision. AUD pricing means no invoice surprises. A Sydney and Melbourne-based account manager means direct phone access at +61 2 8880 7954 during your working day.' },
  { q: 'Can Elipse Studio handle multiple services for our Australian brand at once?', a: 'Yes — because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your product configurator also generates your product renders, powers your WebAR experience, and populates your virtual showroom — without any additional 3D production cost for each channel.' },
  { q: 'How do I get a quote for an Australian project?', a: 'Fill in the form at the bottom of this page or call our Australian direct line at +61 2 8880 7954. We respond within one AEST business day with a free AUD ballpark estimate. For qualifying projects we also offer a free sample render so you can assess visual quality before any commitment.' },
  { q: 'Do you work with Australian startups as well as established brands?', a: 'Yes. Our Australian client base spans early-stage DTC brands launching their first product to established manufacturers and property developers replacing physical showrooms. The scope of the project scales to your stage.' },
];

const auServices = [
  { position: 1, name: '3D Product Configurators AU', url: `${SITE_URL}/au/services/3d-product-configurators` },
  { position: 2, name: 'VR Development AU', url: `${SITE_URL}/au/services/virtual-reality-development` },
  { position: 3, name: 'Architectural Visualisation AU', url: `${SITE_URL}/au/services/architectural-visualisation` },
  { position: 4, name: '3D Product Visualisation AU', url: `${SITE_URL}/au/services/3d-product-visualisation` },
  { position: 5, name: '3D Animation AU', url: `${SITE_URL}/au/services/3d-animation-services` },
  { position: 6, name: 'VFX & Virtual Production AU', url: `${SITE_URL}/au/services/vfx-virtual-production` },
  { position: 7, name: 'Virtual Showrooms & Digital Twins AU', url: `${SITE_URL}/au/services/virtual-showrooms` },
  { position: 8, name: 'Interactive Web Experiences AU', url: `${SITE_URL}/au/services/interactive-web-experiences` },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio Australia Services',
  description:
    'Elipse Studio Australia delivers 3D product configurators, AR, VR, architectural visualisation, 3D animation, VFX, virtual showrooms, and interactive web experiences for Australian brands.',
  url: `${SITE_URL}/au/services`,
  mainEntity: {
    '@type': 'ItemList',
    name: 'Our Australian Services',
    itemListElement: auServices.map((s) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/au/services` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Immersive 3D, AR & VR Services Australia | Elipse Studio Sydney',
    description:
      "Elipse Studio is Australia's immersive studio for 3D product configurators, AR, VR, architectural visualisation, 3D animation, VFX, virtual showrooms, and interactive web experiences — from one Sydney and Melbourne team.",
    canonical: `${SITE_URL}/au/services`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb, buildFaqSchema(faqs)]} />
      <AUServicesPage />
    </>
  );
}
