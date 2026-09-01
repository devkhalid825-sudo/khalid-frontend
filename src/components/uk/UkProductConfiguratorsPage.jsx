'use client';

import UkPage from './UkPage';
import UkConfigurator from './UkConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, GALLERY, CAR_COLORS, YACHT_COLORS, GOLFCART_COLORS } from './UkPageData';
import { WHY_US_ITEMS } from './UkServicesPage';

const UkProductConfiguratorsPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '94%', label: 'Higher conversion for shoppers who use a 3D configurator vs standard product pages' },
      { number: '+40%', label: 'Average order value uplift — buyers upgrade when they see the premium option in 3D' },
      { number: '−35%', label: 'Return rate reduction — no expectation gap between configured product and delivery' },
      { number: '6×', label: 'Longer session time on product pages with a live 3D configurator vs standard gallery' },
    ],
    gallery: GALLERY,
    hero: {
      eyebrow: 'Home › UK › Services › 3D Product Configurators UK',
      title: 'The 3D product configurator UK brands use on Shopify and WooCommerce — to sell more and return less.',
      lead: 'Real-time WebGL. No app download for your customers. CAD-accurate PBR renders. Native Shopify, WooCommerce & Magento integration. Free sample render from our London office.',
      actions: true,
      stats: [
        { number: '94%', label: 'Higher conversion with a 3D configurator' },
        { number: '+40%', label: 'Average order value uplift from 3D' },
        { number: '−35%', label: 'Return rate reduction' },
      ],
    },
    heroVisual: (
      <UkConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Live 3D Configurator Demo"
        label="Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live Configurator"
      />
    ),
    capabilities: {
      head: {
        eyebrow: 'What We Build',
        title: 'One 3D model. Every UK sales channel.',
        sub: 'Buyers pick colours, materials, and components — every choice renders in under 100ms. SKU, GBP price, and VAT flow straight into your checkout.',
      },
      items: [
        { title: 'Real-Time 3D Configurator UK', desc: 'Buyers select colours, materials, sizes, and components — every choice renders in under 100ms as a photorealistic 3D preview. No download. Runs in Chrome, Safari, and Firefox.' },
        { title: 'Photoreal Variant Renders UK', desc: 'Every colour, material, and finish rendered at brochure quality from the same 3D model — for UK product pages, trade catalogues, and social content.' },
        { title: 'Shareable Configuration URLs', desc: 'Every configuration generates a unique URL recreating the exact build for anyone who receives the link — each arriving in your funnel at maximum purchase intent.' },
        { title: 'Shopify & WooCommerce Native', desc: 'SKU, GBP pricing, and UK VAT flow directly into your checkout. No manual re-entry, no export step.' },
        { title: 'Compatibility Rules Engine', desc: 'Invalid option combinations blocked before they reach your OMS — preventing costly misconfigured orders.' },
        { title: 'UK Office — GMT Account Management', desc: 'London contact, GMT hours, +44 20 4634 3117. No timezone lag, no overseas hand-off.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio UK', title: 'Built for UK brands. Delivered from London.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// UK PROJECT OUTCOMES',
      outcomes: [
        { number: '94%', label: 'Higher conversion for UK brands using interactive 3D vs static product pages' },
        { number: '+40%', label: 'Average order value uplift from visible upgrade selection in 3D configurators' },
        { number: '−35%', label: 'Return rate reduction when buyers configure and visualise before purchase' },
        { number: '6×', label: 'Longer session time with a live 3D configurator vs a standard gallery' },
      ],
    },
    showcase: [
      {
        eyebrow: 'One 3D model. Every UK sales channel.',
        title: 'Watch it run in your browser. No download.',
        body: 'A real-time WebGL configurator — select a colour and see it render instantly. Buyers pick colours, materials, and components; every choice renders in under 100ms.',
        checklist: [
          'SKU, GBP price, and VAT flow straight into your checkout',
          'Runs in Chrome, Safari, and Firefox on any device',
          'Compatible with Shopify, WooCommerce, Magento, and headless stacks',
        ],
        media: (
          <UkConfigurator
            src="https://playcanv.as/e/p/B6sx93V1/"
            title="Live 3D Configurator Demo"
            label="Finish"
            messageMode="raw"
            colors={YACHT_COLORS}
            badge="Live Configurator"
          />
        ),
      },
      {
        eyebrow: 'Integrates natively',
        title: 'With your UK ecommerce stack',
        body: 'Built for the platforms UK brands actually run on — config data passes to your checkout and OMS automatically, with real-time PBR visuals rendered from the same 3D source.',
        checklist: [
          'Shopify & Shopify Plus, WooCommerce, Magento / Adobe Commerce, BigCommerce',
          'HubSpot CRM, Salesforce, custom ERP / OMS, and headless / Next.js',
          'Zero app friction for UK shoppers — opens instantly in the browser',
        ],
        reverse: true,
        media: (
          <UkConfigurator
            src="https://playcanv.as/e/p/77f02e22/"
            title="Car 3D Configurator"
            label="Paint Finish"
            messageMode="object"
            colors={CAR_COLORS}
            badge="Native integration"
          />
        ),
      },
      {
        eyebrow: 'Beyond automotive',
        title: 'Same engine, every product line — golf carts included.',
        body: 'The identical real-time pipeline that powers our car and yacht configurators drops straight into specialty vehicles and low-volume product lines. Buyers swap paint and trim live, right in the browser.',
        checklist: [
          'Same Unreal-grade real-time core across every product line',
          'Deployed for OEMs, dealer showrooms, and UK marketing sites',
          'No native app — runs inside any modern browser',
        ],
        media: (
          <UkConfigurator
            src="https://playcanv.as/e/p/JOJu0DAt/"
            title="Golf Cart 3D Configurator"
            label="Paint Finish"
            messageMode="raw"
            colors={GOLFCART_COLORS}
            badge="Live Configurator"
          />
        ),
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From CAD file to live on Shopify.' },
      steps: [
        { title: 'Free Brief & Estimate', desc: 'Tell us your product, platform, and variant logic. Free estimate and sample render within 24 UK business hours.' },
        { title: '3D Model & Materials', desc: 'Production 3D model from your CAD files. PBR materials matched to physical samples — exact to your UK manufacturing spec.' },
        { title: 'Configurator Logic', desc: 'Options, compatibility rules, and GBP pricing wired in Unreal Engine or WebGL. Every combination reviewed before launch.' },
        { title: 'Shopify Integration', desc: 'Config data — SKU, GBP, VAT — connected to your Shopify, WooCommerce, or Magento checkout. Spec passes to OMS automatically.' },
        { title: 'Launch & UK Support', desc: 'Live on your product pages. Post-launch revisions included. GMT UK support available on retainer.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions UK brands ask before signing.' },
      items: [
        { q: 'Do customers need to download anything?', a: 'No. The configurator runs natively in the browser via WebGL — no app, no download, no account required.' },
        { q: 'Does it integrate with our Shopify store?', a: 'Yes. SKU, GBP price, and UK VAT flow directly from the configurator into Shopify, WooCommerce, or Magento checkout.' },
        { q: 'How long does a configurator take to build?', a: 'Typically live within 10 weeks from CAD handover, with milestones at model, logic, and integration stages.' },
        { q: 'Can it handle my compatibility rules?', a: 'Yes — our rules engine blocks invalid option combinations before they reach your OMS, preventing misconfigured orders.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render or a ballpark estimate for your configurator — no commitment required.',
      interests: ['Real-Time 3D Configurator', 'Photoreal Variant Renders', 'Shareable Config URLs', '360 Product View', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your UK configurator project.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UkPage config={config} />;
};

export default UkProductConfiguratorsPage;
