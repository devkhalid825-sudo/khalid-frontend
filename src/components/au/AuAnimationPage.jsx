'use client';

import AuPage from './AuPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './AuPageData';

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
  <div className="au-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const AuAnimationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: 'KD 7', label: 'Keyword difficulty — the easiest-ranking service keyword across all 14 markets in our dataset' },
      { number: '3×', label: 'More social shares for 3D animated brand content vs static imagery on Australian platforms' },
      { number: '+40%', label: 'Conversion uplift for Australian e-commerce brands using 3D product animation on product pages' },
      { number: '9+', label: 'Years producing 3D animation for brands worldwide including Australian clients' },
    ],
    gallery: ANIMATION_GALLERY,
    hero: {
      eyebrow: 'Home › Australia › Services › 3D Animation Services AU',
      title: '3D animation services for Australian brands — product stories that convert.',
      lead: 'Cinematic product animation, motion graphics, brand films, and architectural walkthroughs for Australian brands — produced at broadcast quality. AUD pricing. Sydney and Melbourne AEST hours.',
      actions: true,
      stats: [
        { number: '3×', label: 'More social shares for animated brand content' },
        { number: '+40%', label: 'Conversion uplift for Australian ecommerce brands' },
        { number: 'KD 7', label: 'Easiest-ranking keyword in our 14-market dataset' },
      ],
    },
    heroVisual: <AnimImage src="https://elipsestudio.com/media/53" caption="Gluco Kahani" sub="Character animation · Brand story" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'Four animation formats. One production pipeline.',
        sub: 'Every animation format produced from a shared 3D asset base — your product animation, brand film, and social content never require separate 3D builds.',
      },
      items: [
        { title: '3D Product Animation Australia', desc: 'Cinematic close-up product animations for Australian e-commerce brands — every feature, material detail, and function shown at broadcast quality. CAD-accurate to your Australian manufacturing specification.' },
        { title: 'Motion Graphics Australia', desc: 'Type-driven, data-driven, and design-led motion graphics for Australian brand campaigns, explainer content, social media, and broadcast.' },
        { title: 'Brand Films & Commercials Australia', desc: 'Narrative 3D brand films for Australian TV, digital, and social — product launches, campaign hero content, and CGI brand storytelling. Produced to Free TV Australia and BVOD platform specifications.' },
        { title: 'Architectural Animation Australia', desc: 'Animated walkthroughs and property fly-throughs for Sydney, Melbourne, and Brisbane property developers — for off-plan marketing, planning submissions, and investor presentations.' },
        { title: 'Broadcast Quality — Free TV AU Spec', desc: 'Unreal Engine 5 and Cinema 4D pipeline. Deliverables to Australian broadcast specification — Free TV Australia standards, BVOD platform requirements, and 4K social formats.' },
        { title: 'AEST Hours — Sydney & Melbourne', desc: 'Direct Australian contact. Revision rounds run in AEST business hours. Client feedback received at 9am AEST is incorporated the same day.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why Australian Brands Choose Elipse Studio',
        title: '3D animation that converts — not just impresses.',
        body: 'CAD-accurate to your product. One model produces your product animation, hero renders, configurator, and WebAR experience. Sydney and Melbourne studio on AEST hours with Australian manufacturing understanding built into every technical animation.',
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
        { title: 'Brief & AUD Estimate', desc: 'We review your product, format requirements, and Australian usage rights. Free AUD estimate within 24 AEST business hours.' },
        { title: '3D Model & Materials', desc: 'CAD-accurate 3D model from your files. PBR materials matched to your physical samples — accurate to specification.' },
        { title: 'Storyboard & Animatic', desc: 'Scene-by-scene storyboard reviewed and approved before any animation production begins. Changes cost nothing at this stage.' },
        { title: 'Animation & Post', desc: 'Full animation production, lighting, rendering, and post-production in AEST hours. Progress reviews at agreed milestones.' },
        { title: 'AU Delivery', desc: '4K master, social cuts (AU platforms), BVOD-spec, and print stills — all delivered in required formats. Minor revisions included.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions about 3D animation services Australia.' },
      items: [
        { q: 'How much do 3D animation services cost in Australia?', a: '3D animation in Australia costs AUD $5,000–$18,000 for a 30-second photoreal product animation depending on complexity. A full brand film with CGI integration spans AUD $20,000–$65,000. Architectural animation walkthroughs range from AUD $4,500–$15,000 for a 60-second flythrough.' },
        { q: 'How long does a 3D animation project take?', a: 'A 30-second product animation delivers in 4–6 weeks from brief sign-off. A 60-second brand film with CGI integration delivers in 8–12 weeks. An architectural animation walkthrough delivers in 4–8 weeks depending on building complexity.' },
        { q: 'Can you produce 3D animation from our existing CAD files?', a: 'Yes — and this is our preferred approach. Working from your actual CAD files (STEP, OBJ, SolidWorks, Rhino) means the animation is geometrically accurate to your Australian-manufactured or imported product.' },
        { q: 'Do you produce 3D animation for Australian social media platforms?', a: 'Yes. Every project includes social media cuts as standard: 1:1 square for Instagram and Facebook AU, 9:16 portrait for Instagram Reels and TikTok AU, and 16:9 landscape for YouTube AU.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render or a ballpark estimate for your animation project — no commitment required.',
      interests: ['3D Product Animation', 'Motion Graphics', 'Brand Film / Commercial', 'Architectural Animation', 'Something Else'],
    },
    cta: { title: 'Get a free AUD estimate for your Australian 3D Animation project.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <AuPage config={config} />;
};

export default AuAnimationPage;
