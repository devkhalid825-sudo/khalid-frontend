// Social preview images (og:image / twitter:image).
//
// WhatsApp, LinkedIn and Facebook are unreliable with WebP previews, large files and
// images whose real size differs from the declared 1200x630. This route turns any
// backend media image or public /assets image into a 1200x630 JPEG under ~300 KB.
//
//   /og-image/media/16.jpg                    -> {BACKEND}/media/16
//   /og-image/assets/blog/volvo-hero.webp.jpg -> public/assets/blog/volvo-hero.webp
//
// seo/metadata.js builds these URLs; nothing else should need to.
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { BACKEND_ORIGIN, SITE_URL } from '@/utils/api';

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_BYTES = 300 * 1024;
const QUALITIES = [82, 72, 62, 52];
const PUBLIC_ASSETS = path.join(process.cwd(), 'public', 'assets');
const ASSET_EXT = /\.(webp|png|jpe?g|avif|gif)$/i;

const CACHE_HEADER = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800';

// Small in-memory cache so repeated scrapes don't re-encode the same image.
const memo = new Map();
const MEMO_LIMIT = 60;

/** Maps the request path to the original image. Returns null for anything not allowed. */
function resolveSource(segments) {
  if (!Array.isArray(segments) || segments.length < 2) return null;
  const [kind, ...rest] = segments;

  if (kind === 'media' && rest.length === 1) {
    const id = rest[0].replace(/\.jpe?g$/i, '');
    if (!/^\d{1,9}$/.test(id)) return null;
    return { type: 'remote', url: `${BACKEND_ORIGIN}/media/${id}`, fallback: `${SITE_URL}/media/${id}` };
  }

  if (kind === 'assets') {
    const rel = rest.join('/').replace(/\.jpe?g$/i, '');
    if (!ASSET_EXT.test(rel)) return null;
    const file = path.normalize(path.join(PUBLIC_ASSETS, rel));
    // Block path traversal: the file must stay inside public/assets.
    if (!file.startsWith(PUBLIC_ASSETS + path.sep)) return null;
    return { type: 'file', file, fallback: `${SITE_URL}/assets/${rel}` };
  }

  return null;
}

async function loadSource(src) {
  if (src.type === 'file') return readFile(src.file);
  const res = await fetch(src.url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`source ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function toPreviewJpeg(input) {
  const base = sharp(input, { failOn: 'none' })
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .flatten({ background: '#ffffff' });
  let out;
  for (const quality of QUALITIES) {
    out = await base.clone().jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
    if (out.length <= MAX_BYTES) break;
  }
  return out;
}

async function getParams(context) {
  const params = await context.params;
  return params?.path;
}

export async function GET(request, context) {
  const src = resolveSource(await getParams(context));
  if (!src) return new Response('Not found', { status: 404 });

  const key = src.type === 'file' ? src.file : src.url;
  try {
    let jpeg = memo.get(key);
    if (!jpeg) {
      jpeg = await toPreviewJpeg(await loadSource(src));
      if (memo.size >= MEMO_LIMIT) memo.delete(memo.keys().next().value);
      memo.set(key, jpeg);
    }
    return new Response(jpeg, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(jpeg.length),
        'Cache-Control': CACHE_HEADER,
      },
    });
  } catch (err) {
    console.error('[og-image] conversion failed:', key, err?.message);
    // Still give scrapers an image: the original file.
    return Response.redirect(src.fallback, 302);
  }
}

// server.js sends HEAD requests to decide whether Next.js owns a path; answer
// cheaply without fetching or encoding anything.
export async function HEAD(request, context) {
  const src = resolveSource(await getParams(context));
  if (!src) return new Response(null, { status: 404 });
  return new Response(null, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': CACHE_HEADER } });
}
