import AboutPage from '@/components/AboutPage';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { ABOUT_FAQS } from '@/seo/pageFaqs';

const PAGE_TITLE = 'About Elipse Studio | Creative Tech, Real-Time 3D & Spatial Studio';
const PAGE_DESCRIPTION =
  'Meet Elipse Studio, a 30+ specialist creative technology studio headquartered in Karachi with US sales presence, engineering 3D product configurators, Unreal Engine 5 virtual tours, and commercial CGI.';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: PAGE_TITLE,
      description:
        'Elipse Studio is a 30+ specialist creative technology studio headquartered in Karachi with US sales presence, engineering real-time 3D configurators, virtual property tours, and commercial CGI.',
      mainEntity: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Elipse Studio',
      url: SITE_URL,
      email: 'info@elipsestudio.com',
      telephone: '+1-630-297-0428',
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 30 },
      founders: [
        { '@type': 'Person', name: 'Bilal Lania', jobTitle: 'CEO & Co-Founder' },
        { '@type': 'Person', name: 'Syed Maaz Ali', jobTitle: 'Co-Founder & Technical Director' },
        { '@type': 'Person', name: 'Asad Khan', jobTitle: 'Co-Founder & Head of CG' },
      ],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'House no A-08, near Wasim Bagh, Block 13D-3, Gulshan-e-Iqbal',
          addressLocality: 'Karachi',
          postalCode: '75300',
          addressCountry: 'PK',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '1812 McCormick Ln',
          addressLocality: 'Hanover Park',
          addressRegion: 'IL',
          postalCode: '60133',
          addressCountry: 'US',
        },
      ],
    },
  ],
};

const faqSchema = buildFaqSchema(ABOUT_FAQS);

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
};

export function generateMetadata() {
  const metadata = buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    canonical: `${SITE_URL}/about`,
  });
  // The approved title already contains the brand, so skip buildMetadata's " | Elipse Studio" suffix.
  metadata.title = { absolute: PAGE_TITLE };
  if (metadata.openGraph) metadata.openGraph.title = PAGE_TITLE;
  if (metadata.twitter) metadata.twitter.title = PAGE_TITLE;
  return metadata;
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, faqSchema, breadcrumb].filter(Boolean)} />
      <AboutPage />
    </>
  );
}
