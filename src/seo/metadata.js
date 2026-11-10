import { SITE_URL } from '@/utils/api';

export const SITE_NAME = 'Elipse Studio';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/actuallogo.webp`;
export const TWITTER_SITE = '@ElipseStudio';
export const TWITTER_CREATOR = '@ElipseStudio';

/**
 * Points an og:image at the /og-image route (src/app/og-image/[...path]/route.js), which
 * serves a 1200x630 JPEG under 300 KB. Only our own backend media and public /assets
 * images are converted; any other URL is returned unchanged.
 */
export function toSocialPreview(imageUrl) {
  const site = SITE_URL.replace(/\/+$/, '');
  if (typeof imageUrl !== 'string' || !imageUrl.startsWith(`${site}/`)) {
    return { url: imageUrl, converted: false };
  }
  const pathOnly = imageUrl.slice(site.length).split(/[?#]/)[0];
  const media = pathOnly.match(/^\/media\/(\d{1,9})$/);
  if (media) return { url: `${site}/og-image/media/${media[1]}.jpg`, converted: true };
  if (/^\/assets\/[^?#]+\.(webp|png|jpe?g|avif|gif)$/i.test(pathOnly)) {
    return { url: `${site}/og-image${pathOnly}.jpg`, converted: true };
  }
  return { url: imageUrl, converted: false };
}

/**
 * Builds standard metadata object compliant with Next.js 15 Metadata API:
 * canonical URLs, Open Graph, and Twitter cards. Schema.org JSON-LD is NOT
 * handled here — generateMetadata() can't render JSX, so render
 * <JsonLd>/<MultiJsonLd> (src/components/seo/JsonLd.jsx) directly in the
 * page component instead.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noIndex = false,
  type = 'website',
  keywords,
}) {
  let cleanTitle = title || '';
  if (cleanTitle) {
    cleanTitle = cleanTitle.replace(/(\s*([|—–]|-)\s*(Elipse\s*Studio|Elipse))+$/i, '').trim();
  }
  const fullTitle = cleanTitle ? `${cleanTitle} | ${SITE_NAME}` : SITE_NAME;
  const fullDescription =
    description ||
    'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive configurators, and AR/VR experiences for global developers and brands.';
  const url = canonical || SITE_URL;

  let sanitizedOgImage = ogImage;
  if (sanitizedOgImage) {
    // Normalize old Hostinger backend URL
    if (sanitizedOgImage.includes('mediumseagreen-crocodile-699024.hostingersite.com')) {
      sanitizedOgImage = sanitizedOgImage.replace('https://mediumseagreen-crocodile-699024.hostingersite.com', SITE_URL);
    }
    // Normalize new api.elipsestudio.com backend URL
    if (sanitizedOgImage.includes('api.elipsestudio.com')) {
      sanitizedOgImage = sanitizedOgImage.replace('https://api.elipsestudio.com', SITE_URL);
    }
    if (sanitizedOgImage.startsWith('/')) {
      sanitizedOgImage = `${SITE_URL}${sanitizedOgImage}`;
    }
  } else {
    sanitizedOgImage = DEFAULT_OG_IMAGE;
  }
  const previewImage = toSocialPreview(sanitizedOgImage);

  const metadata = {
    title: { absolute: fullTitle },
    description: fullDescription,
    ...(keywords ? { keywords } : {}),
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
        }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: previewImage.url,
          secureUrl: previewImage.url,
          // Only claim type and size when the /og-image route guarantees them.
          ...(previewImage.converted ? { type: 'image/jpeg', width: 1200, height: 630 } : {}),
          ...(ogImageAlt ? { alt: ogImageAlt } : {}),
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      creator: TWITTER_CREATOR,
      title: fullTitle,
      description: fullDescription,
      images: [previewImage.url],
    },
    publisher: SITE_NAME,
    authors: [{ name: SITE_NAME }],
  };

  return metadata;
}

export default buildMetadata;
