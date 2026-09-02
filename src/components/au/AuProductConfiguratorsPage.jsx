'use client';

import AuPage from './AuPage';
import AuConfigurator from './AuConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, GALLERY, CAR_COLORS, YACHT_COLORS, GOLFCART_COLORS } from './AuPageData';
import { WHY_US_ITEMS } from './AuServicesPage';

const AuProductConfiguratorsPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '94%', label: 'Higher conversion for shoppers who use a 3D configurator vs standard product pages' },
      { number: '+40%', label: 'Average order value uplift — buyers upgrade when they see the premium option in 3D' },
      { number: '−35%', label: 'Return rate reduction — no expectation gap between configured product and delivery' },
      { number: 'KD 17', label: 'Keyword difficulty — achievable ranking for the Australian market' },
    ],
    gallery: GALLERY,
    hero: {
      eyebrow: 'Home › Australia › Services › 3D Product Configurators AU',
      title: 'The 3D product configurator Australian brands use on Shopify and WooCommerce — to sell more and return less.',
      lead: 'Real-time WebGL. No app download for your customers. CAD-accurate PBR renders. Native Shopify, WooCommerce & Magento integration. AUD + GST in checkout. Free sample render from our Sydney studio.',
      actions: true,
      stats: [
        { number: '94%', label: 'Higher conversion with a 3D configurator' },
        { number: '+40%', label: 'Average order value uplift from 3D' },
        { number: '−35%', label: 'Return rate reduction' },
      ],
    },
    heroVisual: (
      <AuConfigurator
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
        title: 'One 3D model. Every Australian sales channel.',
        sub: 'Buyers pick colours, materials, and components — every choice renders in under 100ms. SKU, AUD price, and GST flow straight into your checkout.',
      },
      items: [
        { title: 'Real-Time 3D Configurator Australia', desc: 'Buyers select colours, materials, sizes, and components — every choice renders in under 100ms as a photorealistic 3D preview. No download. Runs in Chrome, Safari, and Firefox on any Australian device.' },
        { title: 'Photoreal Variant Renders Australia', desc: 'Every colour, material, and finish rendered at brochure quality from the same 3D model — for Australian product pages, trade catalogues, and social content.' },
        { title: 'Shareable Configuration URLs', desc: 'Every configuration generates a unique URL recreating the exact build for anyone who receives the link — each arriving in your funnel at maximum purchase intent.' },
        { title: 'Shopify & WooCommerce Native', desc: 'SKU, AUD pricing, and GST flow directly into your checkout. No manual re-entry, no export step.' },
        { title: 'Compatibility Rules Engine', desc: 'Invalid option combinations blocked before they reach your OMS — preventing costly misconfigured orders.' },
        { title: 'Sydney & Melbourne — AEST Account Management', desc: 'Direct Australian contact, AEST hours, +61 2 8880 7954. No timezone lag, no overseas hand-off.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio Australia', title: 'Built for Australian brands. Delivered in AUD.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// AU PROJECT OUTCOMES',
      outcomes: [
        { number: '94%', label: 'Higher conversion for Australian brands using interactive 3D vs static product pages' },
        { number: '+40%', label: 'Average order value uplift from visible upgrade selection in 3D configurators' },
        { number: '−35%', label: 'Return rate reduction when buyers configure and visualise before purchase' },
        { number: 'KD 17', label: 'Achievable Australian keyword — low-DA competitors ranking on page one' },
      ],
    },
    showcase: [
      {
        eyebrow: 'One 3D model. Every Australian sales channel.',
        title: 'Watch it run in your browser. No download.',
        body: 'A real-time WebGL configurator — select a colour and see it render instantly. Buyers pick colours, materials, and components; every choice renders in under 100ms.',
        checklist: [
          'SKU, AUD price, and GST flow straight into your checkout',
          'Runs in Chrome, Safari, and Firefox on any device',
          'Compatible with Shopify, WooCommerce, Magento, and headless stacks',
        ],
        media: (
          <AuConfigurator
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
        title: 'With your Australian ecommerce stack',
        body: 'Built for the platforms Australian brands actually run on — config data passes to your checkout and OMS automatically, with real-time PBR visuals rendered from the same 3D source.',
        checklist: [
          'Shopify AU & Shopify Plus, WooCommerce, Magento / Adobe Commerce, BigCommerce',
          'Salesforce CRM, custom ERP / OMS, and headless / Next.js',
          'Zero app friction for Australian shoppers — opens instantly in the browser',
        ],
        reverse: true,
        media: (
          <AuConfigurator
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
          'Deployed for OEMs, dealer showrooms, and Australian marketing sites',
          'No native app — runs inside any modern browser',
        ],
        media: (
          <AuConfigurator
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
        { title: 'Free Brief & Estimate', desc: 'Tell us your product, platform, and variant logic. Free estimate and sample render within 24 AEST business hours.' },
        { title: '3D Model & Materials', desc: 'Production 3D model from your CAD files. PBR materials matched to physical samples — exact to your Australian manufacturing spec.' },
        { title: 'Configurator Logic', desc: 'Options, compatibility rules, and AUD pricing wired in Unreal Engine or WebGL. Every combination reviewed before launch.' },
        { title: 'Shopify Integration', desc: 'Config data — SKU, AUD, GST — connected to your Shopify, WooCommerce, or Magento checkout. Spec passes to OMS automatically.' },
        { title: 'Launch & AU Support', desc: 'Live on your product pages. Post-launch revisions included. AEST support available on retainer.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions Australian brands ask before signing.' },
      items: [
        { q: 'Do Australian customers need to download an app to use a 3D product configurator?', a: 'No. Elipse Studio 3D product configurators run directly in Chrome, Safari, Firefox, and Edge on Australian mobile and desktop devices — via WebGL. No App Store, no Google Play, no download, no account required.' },
        { q: 'Does the 3D configurator integrate with Shopify Australia?', a: 'Yes. Shopify AU and Shopify Plus are our primary Australian e-commerce integrations. Every selected option — AUD price with GST, product SKU, and Australian shipping class — passes directly into your Shopify AU cart as a standard order line item. WooCommerce, Magento, and BigCommerce AU are also natively supported.' },
        { q: 'How long does a 3D configurator project take for an Australian brand?', a: 'A focused 3D product configurator with Shopify AU integration delivers in 8–12 weeks from brief sign-off. Multi-product platforms with complex compatibility logic span 14–20 weeks.' },
        { q: 'How much does a 3D configurator cost in Australia?', a: 'A single-product Shopify AU configurator with standard option matrix: AUD $12,000–$25,000. A multi-product platform with compatibility rules engine and WooCommerce integration: AUD $25,000–$65,000. Enterprise CPQ platform with ERP integration: AUD $65,000–$150,000+. Free itemised AUD estimate within 24 AEST business hours.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render or a ballpark estimate for your configurator — no commitment required.',
      interests: ['Real-Time 3D Configurator', 'Photoreal Variant Renders', 'Shareable Config URLs', '360 Product View', 'Something Else'],
    },
    cta: { title: 'Get a free AUD estimate for your Australian configurator project.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <AuPage config={config} />;
};

export default AuProductConfiguratorsPage;
