'use client';

import UkPage from './UkPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UkPageData';

const ANIMATION_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: '3D animation from recent brand projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/137', caption: 'Malka Foods', sub: 'Product animation · Biryani Masala' },
    { src: 'https://elipsestudio.com/media/53', caption: 'Gluco Kahani', sub: 'Character animation · Brand story' },
    { src: 'https://elipsestudio.com/media/54', caption: 'Tapal Family Mixture', sub: 'Product animation · Campaign' },
    { src: 'https://elipsestudio.com/media/32', caption: 'Ahmed Food', sub: 'Product animation · Jams & Jellies' },
    { src: 'https://elipsestudio.com/media/35', caption: 'Lahore Zoo', sub: 'Character animation · Wildlife' },
  ],
};

const AnimImage = ({ src, caption, sub, priority = false }) => (
  <div className="uk-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UkAnimationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '94%', label: 'Higher engagement for 3D animated product content vs static imagery on UK digital channels' },
      { number: '3×', label: 'More social shares for animated brand content vs static posts on UK platforms' },
      { number: '+40%', label: 'Average conversion uplift for UK ecommerce brands using 3D product animation' },
      { number: '9+', label: 'Years producing 3D animation for brands worldwide including British manufacturers' },
    ],
    gallery: ANIMATION_GALLERY,
    hero: {
      eyebrow: 'Home › UK › Services › 3D Animation Services UK',
      title: '3D animation services for UK brands — product stories that sell.',
      lead: 'Cinematic product animation, motion graphics, brand films, and character animation for British brands — produced at broadcast quality from our London studio.',
      actions: true,
      stats: [
        { number: '3×', label: 'More social shares for animated brand content' },
        { number: '+40%', label: 'Conversion uplift for UK ecommerce brands' },
        { number: '94%', label: 'Higher engagement rate for animated product content' },
      ],
    },
    heroVisual: <AnimImage src="https://elipsestudio.com/media/53" caption="Gluco Kahani" sub="Character animation · Brand story" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'Four animation formats. One production pipeline.',
        sub: 'Every format produced from a shared 3D asset — so your product animation, brand film, and social content never require separate 3D builds.',
      },
      items: [
        { title: '3D Product Animation UK', desc: 'Cinematic close-up animations showing every feature, material detail, and mechanical function. CAD-accurate to your manufacturing spec.' },
        { title: 'Motion Graphics UK', desc: 'Type-driven, data-driven, or design-led motion graphics for UK brand campaigns, explainer content, social media, and broadcast.' },
        { title: 'Brand Films & Commercials UK', desc: 'Narrative 3D brand films for UK TV, digital, and social — product launches and campaigns that blend CGI with live footage.' },
        { title: 'Character Animation UK', desc: 'Custom character design and animation for UK brand mascots, explainer videos, gaming assets, and immersive experiences. 2D and 3D rigs.' },
        { title: 'Broadcast Quality', desc: 'Unreal Engine 5 and Cinema 4D pipeline. Deliverables are broadcast-specification — not web-compressed previews.' },
        { title: 'Fast Revision Cycles', desc: 'Revisions run on GMT business hours. Client feedback received in the morning is incorporated the same day.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why UK Brands Choose Elipse Studio',
        title: '3D animation that converts, not just impresses.',
        body: 'CAD-accurate to your product. One model produces your product animation, hero renders, configurator, and WebAR experience. London studio on GMT hours with UK manufacturing understanding built into every technical animation.',
        checklist: [
          'Every animation built from your actual CAD files — not approximations',
          'One 3D model produces animation, renders, configurator, and WebAR',
          'Delivered in social square, YouTube 16:9, portrait 9:16, broadcast 4K, and print stills',
        ],
        reverse: true,
        media: <AnimImage src="https://elipsestudio.com/media/137" caption="Malka Foods" sub="Product animation · Biryani Masala" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From brief to broadcast-ready.' },
      steps: [
        { title: 'Brief & Scope', desc: 'We review your product, format requirements, and usage rights. Free estimate within 24 UK business hours.' },
        { title: '3D Model & Materials', desc: 'CAD-accurate 3D model from your files. PBR materials matched to your physical product samples.' },
        { title: 'Storyboard & Animatic', desc: 'Scene-by-scene storyboard reviewed and approved before any animation production begins. Changes cost nothing at this stage.' },
        { title: 'Animation & Post', desc: 'Full animation production, lighting, rendering, and post-production. Progress reviews at agreed milestones.' },
        { title: 'Final Delivery', desc: '4K master, social cuts, web-optimised, and print stills — all formats delivered. Minor revisions included.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions about 3D animation services UK.' },
      items: [
        { q: 'How long does 3D animation take?', a: 'Product animation typically 4–8 weeks; motion graphics 3–5 weeks; character animation 8–14 weeks. Milestones are shared before production begins.' },
        { q: 'Do you work with UK agencies?', a: 'Yes — many UK marketing agencies use Elipse Studio as their white-label 3D animation production partner.' },
        { q: 'Is the animation CAD-accurate?', a: 'Yes. We build from your actual CAD files so what you see matches exactly what your factory produces.' },
        { q: 'What formats do you deliver?', a: '4K broadcast master, social square (1:1), YouTube (16:9), portrait (9:16), web-optimised, and print stills from one production.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render or a ballpark estimate for your animation project — no commitment required.',
      interests: ['3D Product Animation', 'Motion Graphics', 'Brand Film / Commercial', 'Character Animation', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your UK 3D Animation project.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UkPage config={config} />;
};

export default UkAnimationPage;
