import Home from '@/components/features/Home';
import { buildMetadata } from '@/seo/metadata';
import { SITE_URL } from '@/utils/api';
import { getFeaturedCaseStudies, getProjects } from '@/services/projectService';
import { getReviews } from '@/services/reviewService';
import { getBlogs } from '@/services/blogService';
import { getSocialMedia } from '@/services/socialMediaService';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { buildFaqSchema } from '@/lib/seo';
import { HOMEPAGE_FAQS } from '@/seo/serviceFaqs';

export const revalidate = 0; // No cache — always fetch fresh data from backend

const homepageFaqSchema = buildFaqSchema(HOMEPAGE_FAQS);

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '3D Configurators & AR/VR Studio | Elipse Studio',
  description:
    'Elipse Studio builds custom WebGL 3D product configurators, Unreal Engine AR/VR experiences, and cinematic CGI for global brands. Book a free consultation.',
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Elipse Studio',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/assets/actuallogo.webp`,
    },
  },
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Elipse Studio', url: SITE_URL },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }],
};

const HOME_TITLE = '3D Configurators & AR/VR Studio | Elipse Studio';

export function generateMetadata() {
  const base = buildMetadata({
    title: '3D Configurators & AR/VR Studio',
    description:
      'Elipse Studio builds custom WebGL 3D product configurators, Unreal Engine AR/VR experiences, and cinematic CGI for global brands. Book a free consultation.',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/assets/actuallogo.webp`,
    ogImageAlt: 'Elipse Studio — 3D Configurators & AR/VR Studio',
  });
  return {
    ...base,
    title: { absolute: HOME_TITLE },
    openGraph: {
      ...base.openGraph,
      title: HOME_TITLE,
    },
    twitter: {
      ...base.twitter,
      title: HOME_TITLE,
    },
    verification: {
      google: 'bst4UQzqUCEMHZxGlv85mbsWv9EfHKGFPdhJpmZiXCU',
    },
  };
}

export default async function Page() {
  const [featured, projects, reviews, blogs, socialMedia] = await Promise.all([
    getFeaturedCaseStudies(),
    getProjects(),
    getReviews(),
    getBlogs(),
    getSocialMedia(),
  ]);

  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb, homepageFaqSchema].filter(Boolean)} />
      <Home
        initialFeatured={featured}
        initialProjects={projects}
        initialReviews={reviews}
        initialBlogs={blogs}
        initialSocialMedia={socialMedia}
      />
    </>
  );
}
