import { Inter, Syne } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '@/utils/api';
import { SITE_SCHEMA } from '@/seo/schemas';
import SiteShell from '@/components/SiteShell';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A4FA0',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    template: `%s | Elipse Studio`,
  },
  description:
    'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive configurators, and AR/VR experiences for global developers and brands.',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Elipse Studio',
    title: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    description:
      'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive configurators, and AR/VR experiences for global developers and brands.',
    images: [
      {
        url: `${SITE_URL}/assets/actuallogo.webp`,
        width: 1200,
        height: 630,
        alt: 'Elipse Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ElipseStudio',
    creator: '@ElipseStudio',
    title: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    description:
      'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive configurators, and AR/VR experiences for global developers and brands.',
    images: [`${SITE_URL}/assets/actuallogo.webp`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/Web_White_Icon.ico',
  },
};

const GTM_ID = 'GTM-THD6T883';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 defaults — must run before gtag.js and GTM.
            Denied by default in EEA/UK/CH, granted elsewhere; a saved banner choice overrides both. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              var denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
              gtag('consent', 'default', Object.assign({}, denied, { wait_for_update: 500, region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'] }));
              gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
              try {
                var c = localStorage.getItem('elipse_cookie_consent');
                if (c === 'granted' || c === 'denied') {
                  gtag('consent', 'update', { ad_storage: c, ad_user_data: c, ad_personalization: c, analytics_storage: c });
                } else if (navigator.globalPrivacyControl === true) {
                  gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
                }
              } catch (e) {}
            `,
          }}
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4VLP3K6ZJS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Calendly's /thank-you redirect can carry invitee name/email/phone: remove them from the
              // address bar BEFORE GA4 reads the URL (page_location must not be pinned, or SPA page_views stop).
              try {
                var gaUrl = new URL(location.href), gaPii = false;
                Array.from(gaUrl.searchParams.keys()).forEach(function (k) {
                  if (/^(invitee_(full_name|first_name|last_name|email)|text_reminder_number|guest_?emails?|answer_\\d+|salesforce_uuid)$/i.test(k)) { gaUrl.searchParams.delete(k); gaPii = true; }
                });
                if (gaPii) history.replaceState(history.state, '', gaUrl.toString());
              } catch (e) {}
              gtag('config', 'G-4VLP3K6ZJS');
            `,
          }}
        />
        <Script id="gtm-idle-delayed" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            (function () {
              let loaded = false;
              function loadGTM() {
                if (loaded) return;
                loaded = true;
                window.removeEventListener('scroll', loadGTM);
                window.removeEventListener('mousemove', loadGTM);
                window.removeEventListener('touchstart', loadGTM);
                window.removeEventListener('keydown', loadGTM);
                (function (w, d, s, l, i) {
                  w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', '${GTM_ID}');
              }
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadGTM, { timeout: 8000 });
              } else {
                setTimeout(loadGTM, 4000);
              }
              window.addEventListener('scroll', loadGTM, { passive: true });
              window.addEventListener('mousemove', loadGTM, { passive: true });
              window.addEventListener('touchstart', loadGTM, { passive: true });
              window.addEventListener('keydown', loadGTM, { passive: true });
            })();
          `}
        </Script>
        {/* Instantly.ai / Leadsy visitor pixel is loaded by CookieConsent (respects the visitor's choice). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
        />
      </head>
      <body className="font-sans antialiased bg-black text-white transition-colors duration-300" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
