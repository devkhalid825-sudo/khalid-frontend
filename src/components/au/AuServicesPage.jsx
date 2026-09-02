'use client';

import AuPage from './AuPage';
import AuConfigurator from './AuConfigurator';
import { YACHT_COLORS } from './AuPageData';
import {
  FaCog, FaCogs, FaVrCardboard, FaLandmark, FaCamera, FaFilm, FaMagic, FaStore, FaGlobe,
  FaMapMarkerAlt, FaDollarSign, FaLink, FaRulerCombined, FaBolt, FaGift,
  FaHome, FaCouch, FaCar, FaShoppingCart, FaHospital, FaGraduationCap, FaTshirt, FaHotel, FaHardHat, FaShoppingBag,
  FaPhoneAlt, FaClock, FaArrowRight, FaStar,
} from 'react-icons/fa';

const NAV_LINKS_AU = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
];

const SERVICE_ITEMS = [
  {
    badge: 'MOST POPULAR',
    icon: <FaCog />,
    title: '3D Product Configurators AU',
    desc: 'Real-time WebGL configurators for Australian retail and ecommerce brands. Buyers select colours, materials, and options — every choice renders in 3D instantly. No app download. Shopify and WooCommerce native. AUD + GST integration.',
    tags: ['WebGL', 'Unreal Engine 5', 'Shopify AU', 'WooCommerce', 'Real-time PBR'],
    href: '/au/services/3d-product-configurators',
    linkLabel: 'Explore 3D Configurators AU →',
  },
  {
    icon: <FaVrCardboard />,
    title: 'VR Development AU',
    desc: 'Immersive VR experiences for Australian brands — product demos, property walkthroughs, corporate and mining training simulations, and virtual showrooms. Meta Quest, PC VR, and WebVR deployment from a single Unreal Engine build.',
    tags: ['Unreal Engine 5', 'Meta Quest', 'WebVR', 'Multi-user', 'Training sims'],
    href: '/au/services/virtual-reality-development',
    linkLabel: 'Explore VR Development AU →',
  },
  {
    icon: <FaLandmark />,
    title: 'Architectural Visualisation AU',
    desc: 'Photoreal renders, walkthroughs, and real-time 3D models for Australian property developers, architecture firms, and construction companies. Planning approval packs, investor decks, and pre-sale marketing assets for NSW, VIC, and QLD.',
    tags: ['Corona Renderer', 'V-Ray', 'Unreal Engine', '3ds Max', 'Planning packs'],
    href: '/au/services/architectural-visualisation',
    linkLabel: 'Explore Arch Vis AU →',
  },
  {
    icon: <FaCamera />,
    title: '3D Product Visualisation AU',
    desc: 'Photoreal 3D product images and 360° views that replace traditional photography. Every SKU, every colour, every finish — rendered from a single CAD-accurate 3D model. No reshoots, no studio costs per variant.',
    tags: ['Photoreal PBR', '360° views', 'Unlimited SKUs', 'Print-ready', 'Social formats'],
    href: '/au/services/3d-product-visualisation',
    linkLabel: 'Explore 3D Visualisation AU →',
  },
  {
    icon: <FaFilm />,
    title: '3D Animation AU',
    desc: 'Cinematic 3D animation, product storytelling, and motion graphics for Australian brands. Product launches, explainer films, brand campaigns, and architectural walkthroughs — produced to broadcast quality.',
    tags: ['Cinema 4D', 'Maya', 'After Effects', 'Product animation', 'Broadcast AU'],
    href: '/au/services/3d-animation-services',
    linkLabel: 'Explore 3D Animation AU →',
  },
  {
    icon: <FaMagic />,
    title: 'VFX & Virtual Production AU',
    desc: 'Visual effects and virtual production for Australian brand campaigns, TV commercials, and digital content. CGI integration, environment replacement, product placement, and real-time LED volume production support.',
    tags: ['CGI integration', 'Unreal Engine', 'LED volume', 'Broadcast-grade', 'Free TV AU'],
    href: '/au/services/vfx-virtual-production',
    linkLabel: 'Explore VFX AU →',
  },
  {
    icon: <FaStore />,
    title: 'Virtual Showrooms & Digital Twins AU',
    desc: 'Interactive 3D showrooms and digital twins for Australian manufacturers, property developers, and retail brands. Replace physical showrooms with browser-accessible immersive environments that operate 24/7.',
    tags: ['WebGL', 'Unreal Engine', 'Digital twin', 'BIM integration', '24/7 access'],
    href: '/au/services/virtual-showrooms',
    linkLabel: 'Explore Virtual Showrooms AU →',
  },
  {
    icon: <FaGlobe />,
    title: 'Interactive Web Experiences AU',
    desc: 'WebGL-powered interactive experiences, 3D landing pages, and immersive brand microsites for Australian digital campaigns. GSAP animation, Three.js environments, and Unreal Pixel Streaming for browser-native 3D.',
    tags: ['WebGL', 'Three.js', 'GSAP', 'Pixel Streaming', 'PlayCanvas'],
    href: '/au/services/interactive-web-experiences',
    linkLabel: 'Explore Interactive Web AU →',
  },
];

export const WHY_US_ITEMS = [
  { icon: <FaMapMarkerAlt />, title: 'Sydney & Melbourne — AEST Account Management', desc: 'Direct Australian contact, AEST hours, +61 2 8880 7954. No timezone lag, no overseas delays. Every project managed in your working day.' },
  { icon: <FaDollarSign />, title: 'AUD Pricing — GST Included', desc: 'All estimates include GST at the current rate. AUD pricing throughout. No currency conversion surprises on your invoice.' },
  { icon: <FaLink />, title: 'One Studio — Every Capability', desc: '3D configurator, AR, VR, animation, and architectural visualisation — all from one team. No coordination between agencies. Your 3D assets reused across every deliverable.' },
  { icon: <FaRulerCombined />, title: 'CAD-Accurate Production', desc: 'Every 3D model built from your actual CAD files or technical drawings. What we produce matches exactly what your Australian factory or supplier manufactures.' },
  { icon: <FaBolt />, title: 'Unreal Engine 5 + WebGL Production', desc: 'Cinema-grade real-time rendering — not template SaaS tools. The visual quality difference is the commercial outcome difference for Australian brands.' },
  { icon: <FaGift />, title: 'Free Sample Render — No Commitment', desc: 'We offer a free photoreal sample render for qualifying Australian projects so you can evaluate quality before any production commitment.' },
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
  { icon: <FaBolt />, title: 'Mining & Energy', desc: 'Digital twins, safety training VR' },
  { icon: <FaHardHat />, title: 'Construction', desc: 'BIM visualisation, site AR' },
  { icon: <FaShoppingBag />, title: 'Retail', desc: 'Interactive displays, WebAR' },
];

const AuServicesPage = () => {
  const config = {
    navLinks: NAV_LINKS_AU,
    navCta: 'Get My Free AUD Estimate →',
    navCtaHref: '#contact',
    navPhoneBadge: <><FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> Australia · +61 2 8880 7954</>,
    announcement: (
      <>
        <FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> <strong>Australian studio · AEST hours · AUD pricing</strong> · <a href="tel:+61288807954">+61 2 8880 7954</a> · <a href="#contact"><strong>Free estimate in 24hrs</strong> <FaArrowRight className="inline -mt-0.5" /></a>
      </>
    ),
    hero: {
      title: <>Australia&apos;s immersive studio for <em>3D animation</em>, <em>AR, VR</em> — and everything in between.</>,
      lead: 'From cinematic 3D animation to photoreal architectural visualisation, WebAR product demos, and VR training simulations — every immersive capability Australian brands need, priced in AUD.',
      actions: true,
      primaryLabel: <><FaArrowRight className="inline -mt-0.5 mr-1" /> Get My Free AUD Estimate</>,
      primaryHref: '#contact',
      secondaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> See a Live Demo First</>,
      trust: ['Sydney & Melbourne', 'AEST hours', 'AUD pricing', 'Free estimate 24hrs', <>4.9<FaStar className="inline -mt-1 mx-0.5" /> from 43 projects</>],
    },
    heroVisual: (
      <AuConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Yacht 3D Configurator"
        label="Hull Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live Configurator"
      />
    ),
    statsBand: [
      { number: 'KD 7', label: '3D Animation Services Australia — the easiest-ranking service keyword across all 14 markets in our dataset' },
      { number: '9+', label: 'Years building 3D, AR/VR, and immersive experiences for global brands, serving Australian clients since 2014' },
      { number: '94%', label: 'Higher conversion for brands using interactive 3D vs static assets' },
      { number: <>4.9<FaStar className="inline -mt-1 mx-0.5" /></>, label: 'Average rating across 43 Australian and international brand projects' },
    ],
    trustBand: [
      { label: 'Sydney & Melbourne', desc: '— AEST account management' },
      { label: 'AUD pricing', desc: 'GST included, no conversion surprises' },
      { label: 'One studio', desc: '— every immersive capability' },
      { label: 'Free estimate', desc: 'within 24 AEST business hours' },
      { label: 'Unreal Engine 5', desc: '+ WebGL production' },
    ],
    serviceGrid: {
      head: {
        eyebrow: 'AU Services — All Capabilities',
        title: 'Every immersive capability. One Australian studio.',
        sub: 'All Elipse Studio services available to Australian brands — with Sydney and Melbourne account management, AEST hours, and AUD pricing.',
      },
      items: SERVICE_ITEMS,
    },
    midCta: {
      title: 'Not sure which service fits your project?',
      body: "Book a 12-minute call — we'll tell you exactly which capabilities apply to your brief and give you a free AUD ballpark in 24 hours.",
      primaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> Is My Project a Fit? Book a Free Call</>,
      primaryHref: 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting',
      external: true,
      hideSecondary: true,
    },
    whyUs: {
      head: {
        eyebrow: 'Why Elipse Studio Australia',
        title: 'Built for Australian brands. Priced in AUD.',
      },
      items: WHY_US_ITEMS,
      outcomesLabel: '// AU PROJECT OUTCOMES',
      outcomes: [
        { number: 'KD 7', label: '3D Animation Services Australia — easiest keyword in 14-market dataset, fast ranking' },
        { number: '$6.13', label: 'AUD CPC for architectural visualisation services Australia — high-intent buyers' },
        { number: '94%', label: 'Higher conversion using interactive 3D vs static on Australian brand deployments' },
        { number: '9+', label: 'Years producing immersive experiences for brands worldwide, serving AU clients since 2014' },
      ],
    },
    industries: {
      head: {
        eyebrow: 'Australian Industries Served',
        title: 'Every Australian sector we work in.',
        sub: 'From Sydney retail to Melbourne manufacturing — Elipse Studio delivers immersive experiences across every industry vertical in the Australian market.',
      },
      items: INDUSTRY_ITEMS,
    },
    testimonials: false,
    faq: {
      head: { eyebrow: 'Questions from Australian Brands', title: 'What AU brands ask us before starting.' },
      items: [
        {
          q: 'What services does Elipse Studio offer Australian brands?',
          a: (
            <>
              Elipse Studio Australia delivers every immersive capability from one Sydney and Melbourne-based team: <strong>3D product configurators</strong>, <strong>VR development</strong>, <strong>architectural visualisation</strong>, <strong>3D product visualisation</strong>, <strong>3D animation</strong>, <strong>VFX and virtual production</strong>, <strong>virtual showrooms and digital twins</strong>, and <strong>interactive web experiences</strong>. All services are available with AUD pricing (GST included) and AEST account management.
            </>
          ),
        },
        {
          q: 'How is working with an Australian-based Elipse Studio team different?',
          a: (
            <>
              The difference is operational, not just geographic. AEST hours mean your project is never waiting overnight for a decision or revision. AUD pricing means no invoice surprises. A Sydney and Melbourne-based account manager means direct phone access at <a href="tel:+61288807954">+61 2 8880 7954</a> during your working day. And because we understand Australian ecommerce platforms (Shopify AU, WooCommerce), Australian manufacturing supply chains, and Australian buyer behaviour specifically, the strategic advice we give is calibrated to your actual market — not a global average.
            </>
          ),
        },
        {
          q: 'Can Elipse Studio handle multiple services for our Australian brand at once?',
          a: (
            <>
              <strong>Yes — and this is one of our strongest advantages.</strong> Because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your <strong>product configurator</strong> also generates your product renders, powers your <strong>WebAR experience</strong>, and populates your <strong>virtual showroom</strong> — without any additional 3D production cost for each channel. For Australian brands running multi-channel campaigns, this asset efficiency is a significant commercial advantage over coordinating multiple specialist agencies.
            </>
          ),
        },
        {
          q: 'How do I get a quote for an Australian project?',
          a: (
            <>
              Fill in the form at the bottom of this page or call our Australian direct line at <a href="tel:+61288807954"><strong>+61 2 8880 7954</strong></a>. We respond within one AEST business day with a free AUD ballpark estimate. For qualifying projects we also offer a <strong>free sample render</strong> so you can assess visual quality before any commitment. If you&apos;d prefer a call first, book 12 minutes via <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" target="_blank" rel="noopener">Calendly</a> — no obligation, no proposal unless you ask for one.
            </>
          ),
        },
        {
          q: 'Do you work with Australian startups as well as established brands?',
          a: (
            <>
              Yes. Our Australian client base spans early-stage DTC brands launching their first product to established manufacturers and property developers replacing physical showrooms. The scope of the project scales to your stage — a startup might begin with a focused <strong>3D product configurator</strong> for Shopify AU, while an established brand might commission a full suite of configurator, WebAR, virtual showroom, and animation. We give you an honest assessment of what your budget achieves and where to start for maximum commercial return.
            </>
          ),
        },
      ],
    },
    contact: {
      badge: <><FaClock className="inline -mt-0.5 mr-1" /> Free estimate · 1 AEST business day response</>,
      eyebrow: 'Get Started',
      title: 'Tell us about your Australian project.',
      sub: 'No commitment required. Free sample render for qualifying projects. One AEST business day response.',
    },
  };

  return <AuPage config={config} />;
};

export default AuServicesPage;
