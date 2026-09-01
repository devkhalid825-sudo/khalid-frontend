'use client';

import UkPage from './UkPage';
import UkConfigurator from './UkConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, YACHT_COLORS } from './UkPageData';
import { WHY_US_ITEMS } from './UkServicesPage';

const VIZ_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Photoreal product visualisation from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/33', caption: 'Volvo Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/57', caption: 'Cap Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/58', caption: 'T-Shirt Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/62', caption: 'Deck Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/87', caption: 'Roof Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/79', caption: 'Towel Configurator', sub: 'Photoreal product renders' },
  ],
};

const VizImage = ({ src, caption, sub, priority = false }) => (
  <div className="uk-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UkProductVisualisationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: 'Unlimited', label: 'SKU & colour variants rendered from one 3D model' },
      { number: '0', label: 'Reshoots needed when a new colourway launches' },
      { number: '1-3 wks', label: 'Typical turnaround for a full render set' },
      { number: '9+', label: 'Years producing 3D visualisation for global brands' },
    ],
    gallery: VIZ_GALLERY,
    hero: {
      eyebrow: 'Home › UK › Services › 3D Product Visualisation UK',
      title: 'Photoreal 3D product visualisation UK brands use instead of a studio photoshoot.',
      lead: 'Every SKU, every colourway, every finish — rendered from a single CAD-accurate 3D model. No reshoots, no per-variant studio cost, no waiting for stock to arrive.',
      actions: true,
      stats: [
        { number: 'Unlimited', label: 'SKU & colour variants from one model' },
        { number: '1-3 wks', label: 'Typical render turnaround' },
        { number: '0', label: 'Reshoots needed per variant' },
      ],
    },
    heroVisual: (
      <UkConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Live 3D Product Visualisation"
        label="Material / Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live 3D Model"
      />
    ),
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'One 3D model. Every image you need.',
        sub: 'From a single CAD-accurate model we produce hero stills, 360° spins, lifestyle composites, and print-ready assets for UK product pages, catalogues, and campaigns.',
      },
      items: [
        { title: 'Hero Product Stills UK', desc: 'Photoreal exterior and detail shots at brochure quality, lit and staged for your UK product pages and marketplace listings.' },
        { title: '360° Product Views', desc: 'Full 360-degree spin views for every colourway and finish, dropped straight into your Shopify or WooCommerce product page.' },
        { title: 'Lifestyle & Context Renders', desc: 'Your product composited into real or CG environments — no location shoot, no props budget, no weather risk.' },
        { title: 'Exploded & Technical Views', desc: 'Assembly and exploded-view renders for instruction manuals, spec sheets, and B2B sales materials.' },
        { title: 'Print & Social Formats UK', desc: 'Every render delivered pre-formatted for print (CMYK, high-res) and social (square, story, banner) — one shoot, every channel.' },
        { title: 'UK Office — GMT Turnaround', desc: 'London contact, GMT hours, +44 20 4634 3117. Revisions reviewed and returned within the same UK working day.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio UK', title: 'Built for UK brands. Delivered from London.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// UK PROJECT OUTCOMES',
      outcomes: [
        { number: 'Unlimited', label: 'SKU & colour variants rendered from one 3D model' },
        { number: '0', label: 'Reshoots needed when a new colourway launches' },
        { number: '1-3wks', label: 'Typical turnaround for a full render set' },
        { number: '9+', label: 'Years producing 3D visualisation for global brands' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why UK Brands Switch From Photography',
        title: 'One 3D model replaces the entire photoshoot.',
        body: 'Build the model once, then render every colour, finish, and angle without booking a studio, shipping samples, or reshooting for a new season.',
        checklist: [
          'No reshoots when a new colourway or SKU launches',
          'Consistent lighting and quality across the entire catalogue',
          'CAD-accurate to your actual manufacturing specification',
        ],
        media: <VizImage src="https://elipsestudio.com/media/57" caption="Cap Configurator" sub="Photoreal product renders" />,
      },
      {
        eyebrow: 'Beyond Static Stills',
        title: 'The same model powers 360° views and animation too.',
        body: 'Once your product exists as a 3D asset, spinning it into a 360° view, an animated hero video, or a live configurator is an extension of the same build — not a new project.',
        checklist: [
          '360° views generated from the same render pass as your stills',
          'Upgrade path to animation or a live configurator without remodelling',
          'Delivered ready for Shopify, Amazon UK, and marketplace listings',
        ],
        reverse: true,
        media: <VizImage src="https://elipsestudio.com/media/58" caption="T-Shirt Configurator" sub="Photoreal product renders" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From CAD file to finished catalogue.' },
      steps: [
        { title: 'Free Brief & Estimate', desc: 'Share your CAD files or reference product and the shot list you need. Free estimate within 24 UK business hours.' },
        { title: 'Model & Materials', desc: 'CAD-accurate 3D model built with PBR materials matched to your physical samples.' },
        { title: 'Look Development', desc: 'Lighting, staging, and camera angles tuned until stills read as photographs.' },
        { title: 'Render & Delivery', desc: 'Hero stills, 360° views, and lifestyle composites delivered in every format your UK channels need.' },
        { title: 'Ongoing Variants', desc: 'New colourways or SKUs render from the existing model — no reshoot, fast turnaround.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions UK brands ask before switching from photography.' },
      items: [
        { q: 'Do you need physical samples to start?', a: 'No — we can work from CAD files, reference products, or spec sheets. Physical samples help match materials exactly but are not required.' },
        { q: 'Is 3D visualisation cheaper than photography for a full catalogue?', a: "For catalogues with many colour or material variants, yes — the 3D model is built once and every variant renders at a fraction of a reshoot's cost." },
        { q: 'Can you match our exact colours and finishes?', a: 'Yes — PBR materials are calibrated against your physical samples or Pantone/RAL references before final renders are produced.' },
        { q: 'Do renders work for both web and print?', a: 'Yes — every render is delivered in web-optimised and print-ready (CMYK, high-resolution) formats from the same render pass.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your product catalogue — no commitment required.',
      interests: ['Hero Product Stills', '360° Product Views', 'Lifestyle & Context Renders', 'Exploded / Technical Views', 'Something Else'],
    },
    cta: { title: 'Get a free sample render for your UK product catalogue.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UkPage config={config} />;
};

export default UkProductVisualisationPage;
