import { SITE_URL } from '@/utils/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const pages = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/capabilities', changefreq: 'monthly', priority: '0.8' },
    { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
    { path: '/industries', changefreq: 'monthly', priority: '0.9' },
    { path: '/industries/real-estate', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/architecture', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/interior-design', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/manufacturing', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/ecommerce', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/automotive', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/furniture', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/healthcare', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/education-training', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/construction', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/energy-utilities', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/hospitality', changefreq: 'monthly', priority: '0.8' },
    { path: '/industries/retail', changefreq: 'monthly', priority: '0.8' },
    { path: '/case-studies', changefreq: 'weekly', priority: '0.8' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  ];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
