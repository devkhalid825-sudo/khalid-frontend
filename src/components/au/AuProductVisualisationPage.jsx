'use client';

import AuPage from './AuPage';
import AuConfigurator from './AuConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, YACHT_COLORS } from './AuPageData';
import { WHY_US_ITEMS } from './AuServicesPage';

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
  <div className="au-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const AuProductVisualisationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: 'KD 19', label: 'Keyword difficulty with transactional intent — buyers in Australia actively looking to hire' },
      { number: '60%', label: 'Average reduction in product photography costs for Australian brands switching to 3D rendering' },
      { number: '+28%', label: 'Average conversion uplift on Australian e-commerce product pages using photoreal 3D renders' },
      { number: '9+', label: 'Years producing 3D visualisation for global brands' },
    ],
    gallery: VIZ_GALLERY,
    hero: {
      eyebrow: 'Home › Australia › Services › 3D Rendering Studio AU',
      title: '3D rendering studio for Australian brands — photoreal, every variant, no photoshoot.',
      lead: 'Photoreal 3D product renders for Australian e-commerce and retail brands — every colour, material, and finish from a single CAD-accurate 3D model. AUD pricing. No overseas conversion fees.',
      actions: true,
      stats: [
        { number: 'Unlimited', label: 'SKU & colour variants from one model' },
        { number: '60%', label: 'Photography cost reduction' },
        { number: '+28%', label: 'Conversion uplift on product pages' },
      ],
    },
    heroVisual: (
      <AuConfigurator
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
        eyebrow: 'What We Render',
        title: 'Four product render formats. One 3D production.',
        sub: 'From a single CAD-accurate model we produce hero stills, 360° spins, lifestyle composites, and print-ready assets for Australian product pages, catalogues, and campaigns.',
      },
      items: [
        { title: 'Hero Product Renders Australia', desc: 'Brochure-quality product images from any angle, in any environment, with any material specification. Replaces studio photography for Australian e-commerce product pages, Amazon AU listings, and print catalogues.' },
        { title: '360° Product Views Australia', desc: 'Interactive 360-degree product spins embedded directly on your Shopify AU or WooCommerce product pages. Every colour and material variant rendered — Australian buyers rotate freely.' },
        { title: 'Lifestyle Scene Renders Australia', desc: 'Your product placed in photoreal lifestyle environments — Australian living rooms, outdoor settings, commercial spaces, and native Australian landscape contexts.' },
        { title: 'Detail & Close-Up Renders', desc: 'Macro renders showing material quality, texture detail, stitching, joints, weave structure, and finish quality.' },
        { title: 'Print & Social Formats AU', desc: 'Every render delivered pre-formatted for print (CMYK, high-res) and social (1:1, 9:16, 16:9) — one shoot, every channel.' },
        { title: 'AU Focus — AEST Turnaround', desc: 'Sydney and Melbourne contact, AEST working hours. Revisions reviewed and returned within the same working day.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Australian Brands Switch From Photography', title: 'Built for Australian brands. Delivered in AUD.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// AU PROJECT OUTCOMES',
      outcomes: [
        { number: 'KD 19', label: 'Transactional intent — buyers in Australia actively looking to hire right now' },
        { number: '60%', label: 'Cost reduction vs traditional product photography for AU brands with multiple variants' },
        { number: '+28%', label: 'Conversion uplift on Australian e-commerce pages using photoreal 3D renders' },
        { number: '9+', label: 'Years producing 3D visualisation for global brands' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why Australian Brands Switch From Photography',
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
          'Delivered ready for Shopify AU, Amazon AU, and marketplace listings',
        ],
        reverse: true,
        media: <VizImage src="https://elipsestudio.com/media/58" caption="T-Shirt Configurator" sub="Photoreal product renders" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From CAD file to finished catalogue.' },
      steps: [
        { title: 'Free Brief & Estimate', desc: 'Share your CAD files or reference product and the shot list you need. Free AUD estimate within 24 AEST business hours.' },
        { title: 'Model & Materials', desc: 'CAD-accurate 3D model built with PBR materials matched to your physical samples.' },
        { title: 'Look Development', desc: 'Lighting, staging, and camera angles tuned until stills read as photographs.' },
        { title: 'Render & Delivery', desc: 'Hero stills, 360° views, and lifestyle composites delivered in every format your Australian channels need.' },
        { title: 'Ongoing Variants', desc: 'New colourways or SKUs render from the existing model — no reshoot, fast turnaround.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions about 3D rendering studio services Australia.' },
      items: [
        { q: 'How much does 3D product rendering cost in Australia?', a: 'A single product hero render: AUD $500–$1,200. A full product launch pack (360° spin, hero still, lifestyle render, and detail render for one SKU): AUD $1,800–$4,200. Multi-SKU variant programmes are priced per-model with a reducing per-variant cost as the model library grows.' },
        { q: 'Can 3D renders replace product photography for Australian e-commerce brands?', a: 'Yes — for Australian brands with variant-heavy product lines, 3D product rendering is significantly more cost-efficient than per-variant photography. New products added to the catalogue require only 3D model production — no additional photography per variant.' },
        { q: 'What files do you need from an Australian brand?', a: 'Ideally your CAD files (STEP, OBJ, FBX, SolidWorks, Rhino format) plus physical material samples or a material specification sheet. If CAD files are not available, we work from technical drawings, dimension sheets, and high-quality reference photography.' },
        { q: 'How long does a 3D product rendering project take?', a: 'A single product hero render set (4 angles, 2 environments) delivers in 1–2 weeks. A full product launch pack for one SKU delivers in 2–3 weeks. A multi-SKU variant programme (20+ products) spans 4–10 weeks.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your product catalogue — no commitment required.',
      interests: ['Hero Product Renders', '360° Product Views', 'Lifestyle Scene Renders', 'Detail / Close-Up Renders', 'Something Else'],
    },
    cta: { title: 'Get a free sample render for your Australian product catalogue.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <AuPage config={config} />;
};

export default AuProductVisualisationPage;
