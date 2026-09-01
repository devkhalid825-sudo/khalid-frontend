'use client';

import UkPage from './UkPage';
import UkConfigurator from './UkConfigurator';
import { YACHT_COLORS } from './UkPageData';
import {
  FaCog, FaCogs, FaVrCardboard, FaLandmark, FaCamera, FaFilm, FaMagic, FaStore, FaGlobe,
  FaMapMarkerAlt, FaPoundSign, FaLink, FaRulerCombined, FaBolt, FaGift,
  FaHome, FaCouch, FaCar, FaShoppingCart, FaHospital, FaGraduationCap, FaTshirt, FaHotel, FaHardHat, FaShoppingBag,
  FaPhoneAlt, FaClock, FaArrowRight, FaStar,
} from 'react-icons/fa';

const NAV_LINKS_UK = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
];

const SERVICE_ITEMS = [
  {
    badge: 'MOST POPULAR',
    icon: <FaCog />,
    title: '3D Product Configurators UK',
    desc: 'Real-time WebGL configurators for UK retail and ecommerce brands. Buyers select colours, materials, and options — every choice renders in 3D instantly. No app download. Shopify and WooCommerce native. GBP + VAT integration.',
    tags: ['WebGL', 'Unreal Engine 5', 'Shopify UK', 'WooCommerce', 'Real-time PBR'],
    href: '/uk/services/3d-product-configurators',
    linkLabel: 'Explore 3D Configurators UK →',
  },
  {
    icon: <FaVrCardboard />,
    title: 'VR Development UK',
    desc: 'Immersive VR experiences for UK brands — product demos, property walkthroughs, corporate training simulations, and virtual showrooms. Meta Quest, PC VR, and WebVR deployment from a single Unreal Engine build.',
    tags: ['Unreal Engine 5', 'Meta Quest', 'Unity', 'WebVR', 'Multi-user'],
    href: '/uk/services/virtual-reality-development',
    linkLabel: 'Explore VR Development UK →',
  },
  {
    icon: <FaLandmark />,
    title: 'Architectural Visualisation UK',
    desc: 'Photoreal renders, walkthroughs, and real-time 3D models for UK property developers, architecture firms, and construction companies. Planning approval packs, investor decks, and pre-sale marketing assets.',
    tags: ['Corona Renderer', 'V-Ray', 'Unreal Engine', '3ds Max', 'Cesium'],
    href: '/uk/services/architectural-visualisation',
    linkLabel: 'Explore Arch Vis UK →',
  },
  {
    icon: <FaCamera />,
    title: '3D Product Visualisation UK',
    desc: 'Photoreal 3D product images and 360° views that replace traditional photography. Every SKU, every colour, every finish — rendered from a single CAD-accurate 3D model. No reshoots, no studio costs per variant.',
    tags: ['Photoreal PBR', '360° views', 'Unlimited SKUs', 'Print-ready', 'Social formats'],
    href: '/uk/services/3d-product-visualisation',
    linkLabel: 'Explore 3D Visualisation UK →',
  },
  {
    icon: <FaFilm />,
    title: '3D Animation UK',
    desc: 'Cinematic 3D animation, product storytelling, and motion graphics for UK brands. Product launches, explainer films, brand campaigns, and technical demonstrations — produced to broadcast quality.',
    tags: ['Cinema 4D', 'Maya', 'After Effects', 'Product animation', 'Character animation'],
    href: '/uk/services/3d-animation-services',
    linkLabel: 'Explore 3D Animation UK →',
  },
  {
    icon: <FaMagic />,
    title: 'VFX & Virtual Production UK',
    desc: 'Visual effects and virtual production for UK brand campaigns, TV commercials, and digital content. CGI integration, environment replacement, product placement, and real-time LED volume production support.',
    tags: ['CGI integration', 'Nuke', 'Unreal Engine', 'LED volume', 'Broadcast-grade'],
    href: '/uk/services/vfx-virtual-production',
    linkLabel: 'Explore VFX UK →',
  },
  {
    icon: <FaStore />,
    title: 'Virtual Showrooms & Digital Twins UK',
    desc: 'Interactive 3D showrooms and digital twins for UK manufacturers, property developers, and retail brands. Replace physical showrooms with browser-accessible immersive environments that operate 24/7.',
    tags: ['WebGL', 'Unreal Engine', 'Digital twin', 'BIM integration', '24/7 access'],
    href: '/uk/services/virtual-showrooms',
    linkLabel: 'Explore Virtual Showrooms UK →',
  },
  {
    icon: <FaGlobe />,
    title: 'Interactive Web Experiences UK',
    desc: 'WebGL-powered interactive experiences, 3D landing pages, and immersive brand microsites for UK digital campaigns. GSAP animation, Three.js environments, and Unreal Pixel Streaming for browser-native 3D.',
    tags: ['WebGL', 'Three.js', 'GSAP', 'Pixel Streaming', 'PlayCanvas'],
    href: '/uk/services/interactive-web-experiences',
    linkLabel: 'Explore Interactive Web UK →',
  },
];

export const WHY_US_ITEMS = [
  { icon: <FaMapMarkerAlt />, title: 'London Office — GMT Account Management', desc: 'Direct UK contact, GMT hours, +44 20 4634 3117. No timezone lag, no overseas delays. Every project managed in your working day.' },
  { icon: <FaPoundSign />, title: 'VAT-Inclusive UK Quoting', desc: 'All estimates include UK VAT at the applicable rate. GBP pricing throughout. No currency conversion surprises on your invoice.' },
  { icon: <FaLink />, title: 'One Studio — Every Capability', desc: '3D configurator, AR, VR, animation, website, and app — all from one team. No coordination between agencies. Your 3D assets reused across every deliverable.' },
  { icon: <FaRulerCombined />, title: 'CAD-Accurate Production', desc: 'Every 3D model built from your actual CAD files or technical drawings. What we produce matches exactly what your UK factory manufactures.' },
  { icon: <FaBolt />, title: 'Unreal Engine 5 + WebGL Production', desc: 'Cinema-grade real-time rendering — not template SaaS tools. The visual quality difference is the commercial outcome difference for UK brands.' },
  { icon: <FaGift />, title: 'Free Sample Render — No Commitment', desc: 'We offer a free photoreal sample render for qualifying UK projects so you can evaluate quality before any production commitment.' },
];

const INDUSTRY_ITEMS = [
  { icon: <FaHome />, title: 'Real Estate', desc: 'Property visualisation, virtual tours' },
  { icon: <FaLandmark />, title: 'Architecture', desc: 'Arch vis, planning packs' },
  { icon: <FaCouch />, title: 'Furniture', desc: 'Configurators, product renders' },
  { icon: <FaCar />, title: 'Automotive', desc: '3D configurators, VR demos' },
  { icon: <FaShoppingCart />, title: 'Ecommerce', desc: 'AR try-on, product visualisation' },
  { icon: <FaCogs />, title: 'Manufacturing', desc: 'B2B configurators, digital twins' },
  { icon: <FaHospital />, title: 'Healthcare', desc: 'VR training, medical animation' },
  { icon: <FaGraduationCap />, title: 'Education', desc: 'VR simulations, immersive learning' },
  { icon: <FaTshirt />, title: 'Fashion', desc: 'AR try-on, fabric configurators' },
  { icon: <FaHotel />, title: 'Hospitality', desc: 'Virtual tours, room configurators' },
  { icon: <FaBolt />, title: 'Energy', desc: 'Digital twins, training VR' },
  { icon: <FaHardHat />, title: 'Construction', desc: 'BIM visualisation, site AR' },
  { icon: <FaShoppingBag />, title: 'Retail', desc: 'Interactive displays, WebAR' },
];

const UkServicesPage = () => {
  const config = {
    navLinks: NAV_LINKS_UK,
    navCta: 'Get My Free UK Estimate →',
    navCtaHref: '#contact',
    navPhoneBadge: <><FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> London · +44 20 4634 3117</>,
    announcement: (
      <>
        <FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> <strong>UK office · GMT hours · VAT-inclusive</strong> · <a href="tel:+442046343117">+44 20 4634 3117</a> · <a href="#contact"><strong>Free estimate in 24hrs</strong> <FaArrowRight className="inline -mt-0.5" /></a>
      </>
    ),
    hero: {
      title: <>The UK&apos;s immersive studio for <em>3D, AR, VR</em> and everything in between.</>,
      lead: 'From real-time 3D configurators to AR product experiences, VR training simulations, and architectural visualisation — Elipse Studio delivers every immersive capability your UK brand needs, from one London-based team.',
      actions: true,
      primaryLabel: <><FaArrowRight className="inline -mt-0.5 mr-1" /> Get My Free UK Estimate</>,
      primaryHref: '#contact',
      secondaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> See a Live Demo First</>,
      trust: ['London office', 'GMT hours', 'VAT-inclusive', 'Free estimate 24hrs', <>4.9<FaStar className="inline -mt-1 mx-0.5" /> from 43 projects</>],
    },
    heroVisual: (
      <UkConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Yacht 3D Configurator"
        label="Hull Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live Configurator"
      />
    ),
    statsBand: [
      { number: '10+', label: 'Immersive service capabilities delivered from one UK team' },
      { number: '9+', label: 'Years building 3D, AR/VR, and immersive experiences for global brands' },
      { number: '94%', label: 'Higher conversion for brands using interactive 3D vs static assets' },
      { number: <>4.9<FaStar className="inline -mt-1 mx-0.5" /></>, label: 'Average rating across 43 UK and international brand projects' },
    ],
    trustBand: [
      { label: 'London office', desc: '— GMT account management' },
      { label: 'VAT-inclusive', desc: 'quoting for UK brands' },
      { label: 'One studio', desc: '— every immersive capability' },
      { label: 'Free estimate', desc: 'within 24 UK business hours' },
      { label: 'Unreal Engine 5', desc: '+ WebGL + Unity production' },
    ],
    serviceGrid: {
      head: {
        eyebrow: 'UK Services — All Capabilities',
        title: 'Every immersive capability. One London studio.',
        sub: 'All Elipse Studio services available to UK brands — with London-based account management, GMT hours, and VAT-inclusive pricing.',
      },
      items: SERVICE_ITEMS,
    },
    midCta: {
      title: 'Not sure which service fits your project?',
      body: "Book a 12-minute call — we'll tell you exactly which capabilities apply to your brief and give you a free ballpark in 24 hours.",
      primaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> Is My Project a Fit? Book a Free Call</>,
      primaryHref: 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting',
      external: true,
      hideSecondary: true,
    },
    whyUs: {
      head: {
        eyebrow: 'Why Elipse Studio UK',
        title: 'Built for UK brands. Delivered from London.',
      },
      items: WHY_US_ITEMS,
      outcomesLabel: '// UK PROJECT OUTCOMES',
      outcomes: [
        { number: '94%', label: 'Higher conversion for UK brands using interactive 3D vs static product pages' },
        { number: '+40%', label: 'Average order value uplift from visible upgrade selection in 3D configurators' },
        { number: '−35%', label: 'Return rate reduction when buyers configure and visualise before purchase' },
        { number: '9+', label: 'Years producing immersive experiences for brands worldwide including UK' },
      ],
    },
    industries: {
      head: {
        eyebrow: 'UK Industries Served',
        title: 'Every UK sector we work in.',
        sub: 'From London retail to British manufacturing — Elipse Studio delivers immersive experiences across every industry vertical in the UK market.',
      },
      items: INDUSTRY_ITEMS,
    },
    testimonials: false,
    faq: {
      head: { eyebrow: 'Questions from UK Brands', title: 'What UK brands ask us before starting.' },
      items: [
        {
          q: 'What services does Elipse Studio offer UK brands?',
          a: (
            <>
              Elipse Studio UK delivers every immersive capability from one London-based team: <strong>3D product configurators</strong>, <strong>VR development</strong>, <strong>architectural visualisation</strong>, <strong>3D product visualisation</strong>, <strong>3D animation</strong>, <strong>VFX and virtual production</strong>, <strong>virtual showrooms and digital twins</strong>, and <strong>interactive web experiences</strong>. All services are available with UK VAT-inclusive quoting and GMT account management from our London office.
            </>
          ),
        },
        {
          q: 'How is working with a UK-based Elipse Studio team different?',
          a: (
            <>
              The difference is operational, not just geographic. GMT hours mean your project is never waiting overnight for a decision or revision. UK VAT-inclusive quoting means no invoice surprises. A London-based account manager means direct phone access at <a href="tel:+442046343117">+44 20 4634 3117</a> during your working day. And because we understand UK ecommerce platforms (Shopify, WooCommerce), UK manufacturing supply chains, and UK buyer behaviour specifically, the strategic advice we give is calibrated to your actual market — not a global average.
            </>
          ),
        },
        {
          q: 'Can Elipse Studio handle multiple services for our UK brand at once?',
          a: (
            <>
              <strong>Yes — and this is one of our strongest advantages.</strong> Because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your <strong>product configurator</strong> also generates your product renders, powers your <strong>WebAR experience</strong>, and populates your <strong>virtual showroom</strong> — without any additional 3D production cost for each channel. For UK brands running multi-channel campaigns, this asset efficiency is a significant commercial advantage over coordinating multiple specialist agencies.
            </>
          ),
        },
        {
          q: 'How do I get a quote for a UK project?',
          a: (
            <>
              Fill in the form at the bottom of this page or call our UK direct line at <a href="tel:+442046343117"><strong>+44 20 4634 3117</strong></a>. We respond within one UK business day with a free ballpark estimate. For qualifying projects we also offer a <strong>free sample render</strong> so you can assess visual quality before any commitment. If you&apos;d prefer a call first, book 12 minutes via <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" target="_blank" rel="noopener">Calendly</a> — no obligation, no proposal unless you ask for one.
            </>
          ),
        },
        {
          q: 'Do you work with UK startups as well as established brands?',
          a: (
            <>
              Yes. Our UK client base spans early-stage DTC brands launching their first product to established British manufacturers replacing physical showrooms. The scope of the project scales to your stage — a startup might begin with a focused <strong>3D product configurator</strong> for Shopify, while an established brand might commission a full suite of configurator, WebAR, virtual showroom, and animation. We give you an honest assessment of what your budget achieves and where to start for maximum commercial return.
            </>
          ),
        },
      ],
    },
    contact: {
      badge: <><FaClock className="inline -mt-0.5 mr-1" /> Free estimate · 1 UK business day response</>,
      eyebrow: 'Get Started',
      title: 'Tell us about your UK project.',
      sub: 'No commitment required. Free sample render for qualifying projects. One UK business day response.',
    },
  };

  return <UkPage config={config} />;
};

export default UkServicesPage;
