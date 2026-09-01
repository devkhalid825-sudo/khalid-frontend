'use client';

import UkPage from './UkPage';
import UkConfigurator from './UkConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, YACHT_COLORS } from './UkPageData';
import { WHY_US_ITEMS } from './UkServicesPage';

const WEB_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Interactive web builds from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/81', caption: 'Qistmarket', sub: 'Interactive web experience' },
    { src: 'https://elipsestudio.com/media/77', caption: 'Housing Society', sub: 'Interactive web experience' },
    { src: 'https://elipsestudio.com/media/72', caption: 'Christmas Market Tour', sub: '360° browser tour' },
    { src: 'https://elipsestudio.com/media/80', caption: 'Scott 360 Virtual Tour', sub: '360° browser tour' },
    { src: 'https://elipsestudio.com/media/82', caption: 'Office Tour', sub: '360° browser tour' },
  ],
};

const WebImage = ({ src, caption, sub, priority = false }) => (
  <div className="uk-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UkInteractiveWebExperiencesPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '60fps', label: 'Real-time performance target for every build' },
      { number: '0', label: 'Downloads or app installs required' },
      { number: '9+', label: 'Years building real-time 3D for the web' },
      { number: 'GMT', label: 'London studio, GMT hours' },
    ],
    gallery: WEB_GALLERY,
    hero: {
      eyebrow: 'Home › UK › Services › Interactive Web Experiences UK',
      title: 'Interactive web experiences UK brands use to make a campaign impossible to scroll past.',
      lead: 'WebGL-powered 3D landing pages, scroll-driven storytelling, and immersive brand microsites — built to run in any modern browser, no app or plugin required.',
      actions: true,
      stats: [
        { number: '60fps', label: 'Real-time interaction in-browser' },
        { number: '0', label: 'Downloads or plugins required' },
        { number: 'GMT', label: 'London-based build & support' },
      ],
    },
    heroVisual: (
      <UkConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Interactive 3D Web Experience"
        label="Interactive Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live WebGL Demo"
      />
    ),
    capabilities: {
      head: {
        eyebrow: 'What We Build',
        title: 'Browser-native 3D. No compromise on impact.',
        sub: 'Every experience is built to load fast, run smoothly on mobile, and hold up next to a native app — without asking your visitor to install anything.',
      },
      items: [
        { title: '3D Landing Pages UK', desc: 'Scroll-driven WebGL landing pages that turn a product launch or campaign into an interactive story, not a static scroll.' },
        { title: 'Three.js & WebGL Development', desc: 'Custom Three.js and WebGL builds for brand microsites, product showcases, and interactive data visualisation.' },
        { title: 'GSAP Scroll Animation', desc: 'Cinematic scroll-triggered animation sequences synced to your page content, tuned for both desktop and mobile.' },
        { title: 'Unreal Pixel Streaming UK', desc: 'Full Unreal Engine visual fidelity streamed straight into the browser — no download, no dedicated app, just a link.' },
        { title: 'Interactive Data & Configurator UI', desc: 'Interactive dashboards, calculators, and lightweight configurator interfaces layered on top of your 3D experience.' },
        { title: 'UK Office — GMT Delivery', desc: 'London-managed builds, GMT hours, performance-tested on UK mobile networks before launch.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio UK', title: 'Built for UK brands. Delivered from London.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// UK PROJECT OUTCOMES',
      outcomes: [
        { number: '60fps', label: 'Real-time performance target for every build' },
        { number: '0', label: 'Downloads or app installs required' },
        { number: '9+', label: 'Years building real-time 3D for the web' },
        { number: 'GMT', label: 'London studio, GMT hours' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why UK Brands Build Interactive',
        title: 'Engagement your static site cannot match.',
        body: 'A scroll-driven 3D experience keeps visitors on the page longer and makes the product itself the headline — not a photo of it.',
        checklist: [
          'Runs in Chrome, Safari, and Firefox — desktop and mobile',
          'Built on the same 3D pipeline as our configurators and AR tools',
          'Optimised for Core Web Vitals — interactive does not mean slow',
        ],
        media: <WebImage src="https://elipsestudio.com/media/72" caption="Christmas Market Tour" sub="360° browser tour" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From concept to a link you can share.' },
      steps: [
        { title: 'Concept & Storyboard', desc: 'We map the scroll journey and interaction points against your campaign goals. Free estimate within 24 UK business hours.' },
        { title: '3D Asset & Scene Build', desc: 'The 3D scene, models, and materials are built or optimised for real-time browser performance.' },
        { title: 'Interaction & Animation', desc: 'Scroll triggers, camera moves, and interaction logic wired in Three.js, WebGL, or Unreal Pixel Streaming.' },
        { title: 'Performance Pass', desc: 'Tested across UK mobile networks and devices, optimised until it holds 60fps on target hardware.' },
        { title: 'Launch & Support', desc: 'Deployed to your domain or ours, with GMT support for the length of the campaign.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions UK brands ask before building interactive.' },
      items: [
        { q: 'Does it work on mobile?', a: 'Yes — every build is tested and optimised for mobile browsers and UK mobile network conditions before launch.' },
        { q: 'Do visitors need to download anything?', a: 'No — everything runs natively in the browser, including Unreal Pixel Streaming builds.' },
        { q: 'How long does an interactive campaign build take?', a: 'Typically 4-8 weeks depending on scene complexity and interaction depth.' },
        { q: 'Can it integrate with our existing website?', a: 'Yes — delivered as an embeddable build or a standalone microsite linked from your main site.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept sketch for your interactive campaign — no commitment required.',
      interests: ['3D Landing Page', 'Three.js / WebGL Build', 'Unreal Pixel Streaming', 'Interactive Data Visual', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your UK interactive web project.', body: 'No commitment. Free concept sketch for qualifying projects.' },
  };

  return <UkPage config={config} />;
};

export default UkInteractiveWebExperiencesPage;
