import CapabilitiesPage from '@/components/CapabilitiesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/capabilities#webpage`,
  url: `${SITE_URL}/capabilities`,
  name: 'Enterprise 3D Configurator, WebGL & AR/VR Services | Elipse Studio',
  description:
    'Custom 3D web configurators, architectural VR walkthroughs, and enterprise WebGL development. Discover how Elipse Studio powers real-time 3D experiences.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  breadcrumb: { '@id': `${SITE_URL}/capabilities#breadcrumb` },
  inLanguage: 'en-US',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/capabilities#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Capabilities', item: `${SITE_URL}/capabilities` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Enterprise 3D Configurator, WebGL & AR/VR Services | Elipse Studio',
    description:
      'Custom 3D web configurators, architectural VR walkthroughs, and enterprise WebGL development. Discover how Elipse Studio powers real-time 3D experiences.',
    canonical: `${SITE_URL}/capabilities`,
    ogImage: `${SITE_URL}/assets/actuallogo.webp`,
    ogImageAlt: 'Elipse Studio — Enterprise 3D Configurator, WebGL & AR/VR Services',
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <CapabilitiesPage />
    </>
  );
}
