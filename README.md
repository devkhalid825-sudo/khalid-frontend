# Elipse Studio — Frontend (Next.js)

The public website **elipsestudio.com** and the **admin dashboard** (`/admin`).
All content (blogs, projects, case studies, reviews) is loaded from the backend API in `../elipse-backend`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Optional `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | Backend origin. Defaults to `https://api.elipsestudio.com` (see `src/utils/api.js`). |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 site key for the contact forms. |

## Folder structure

```
src/
  app/          Routes (Next.js App Router). One folder = one URL.
                  admin/      admin dashboard pages
                  au/ uk/ us/ country landing pages
                  services/ industries/ blog/ project/ ...
                  *_sitemap.xml/  generated sitemaps
  components/   React components
                  admin/      admin dashboard screens
                  articles/   hard-coded blog articles
                  services/   service pages
                  au/ uk/ us/ country-specific page sections
                  features/   home-page sections
                  layouts/    Header, Footer
                  ui/ common/ seo/ analytics/ ...  shared building blocks
  services/     Fetch functions that talk to the backend API
  seo/ lib/     Metadata, JSON-LD schemas, FAQs, SEO helpers
  data/ constants/  Static content and asset paths
  hooks/ utils/ Small reusable helpers
  assets/       Images/videos imported in code (bundled by Next.js)
public/         Files served as-is at /<path> (e.g. /assets/..., robots.txt, llms.txt)
docs/           Non-code reference material (SEO audit)
```

**Where do images go?**
- Imported in a component (`import img from '@/assets/...'`) → put in `src/assets/`.
- Referenced by URL string (`"/assets/..."`), or used by the CMS/database → put in `public/assets/`.

## Production (Windows server, PM2)

Production runs as two PM2 apps (`ecosystem.config.js`):

1. **`elipsestudio`**: `start-next.js` runs `next start` on `127.0.0.1:3005`.
2. **`express-proxy`**: `server.js` listens on port 3000 and forwards routes to Next.js.

`Caddyfile` is the reverse-proxy config in front of them.

> Do not change `server.js`, `ecosystem.config.js`, `start-next.js` or the sitemap routes without checking the live deployment first. Legacy URLs depend on them.

Redirects for old URLs live in `next.config.ts`. Read `AGENTS.md` before pushing to git.
