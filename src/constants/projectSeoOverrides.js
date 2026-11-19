// SEO overrides for specific project pages whose copy lives in the CMS.
// Shared by the server page (JSON-LD) and the client page (visible FAQ), so the
// FAQPage schema always matches the Q&A shown to users (a Google requirement).
// CMS values win: these only apply when the project has no faqItems of its own.

export const PROJECT_SEO_OVERRIDES = {
  'kia-configurator': {
    faqHeading: 'KIA Sportage 3D Configurator: FAQ',
    faqItems: [
      {
        q: 'What is the KIA Sportage 3D Configurator?',
        a: 'The KIA Sportage 3D Configurator is an interactive WebGL tool built by Elipse Studio that lets you visualize and customize the KIA Sportage in real-time — including exterior colors, trim options, and wheel styles — directly in your browser.',
      },
      {
        q: 'What technology powers this configurator?',
        a: 'The configurator is built using PlayCanvas, a WebGL-based real-time 3D engine, with PBR (Physically Based Rendering) materials for photorealistic visualization.',
      },
      {
        q: 'Can Elipse Studio build a similar configurator for my brand?',
        a: 'Yes. Elipse Studio specializes in custom 3D product configurators for automotive, furniture, industrial, and consumer brands. Contact us to discuss your project requirements.',
      },
      {
        q: 'Does this configurator work on mobile devices?',
        a: 'Yes. The KIA Sportage configurator is optimized for both desktop and mobile browsers, delivering smooth real-time 3D performance across devices.',
      },
    ],
    // Merged into the CreativeWork JSON-LD.
    creativeWork: {
      name: 'KIA Sportage 3D Car Configurator',
      description:
        'Interactive 3D configurator for KIA Sportage — customize colors, trims, and exterior options in real-time using WebGL and PlayCanvas.',
      keywords: '3D car configurator, KIA Sportage, WebGL, PlayCanvas, interactive 3D',
      dateModified: '2026-11-19',
      inLanguage: 'en',
      about: {
        '@type': 'Product',
        name: 'KIA Sportage',
        brand: { '@type': 'Brand', name: 'KIA' },
      },
      creatorUrl: 'https://elipsestudio.com',
    },
    // Descriptive alt text for the 3D render images on the page.
    imageAltBase: 'KIA Sportage 3D configurator',
  },
};

export const getProjectSeoOverride = (slug) => {
  const key = String(slug || '').split('/').pop();
  return PROJECT_SEO_OVERRIDES[key] || null;
};
