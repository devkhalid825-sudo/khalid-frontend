'use client';

import AuPage from './AuPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './AuPageData';
import { WHY_US_ITEMS } from './AuServicesPage';

const ARCH_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Architectural visualisation from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/59', caption: 'Zenith By Amber', sub: 'Exterior CGI · Residential tower' },
    { src: 'https://elipsestudio.com/media/63', caption: 'The Academy', sub: 'Exterior CGI · Institutional' },
    { src: 'https://elipsestudio.com/media/65', caption: 'Khoj Villas', sub: 'Aerial CGI · Villa development' },
    { src: 'https://elipsestudio.com/media/68', caption: 'Amalie Arena', sub: 'Interior CGI · Arena visualisation' },
    { src: 'https://elipsestudio.com/media/78', caption: 'Modern Villas', sub: 'Exterior CGI · Luxury villa' },
    { src: 'https://elipsestudio.com/media/37', caption: 'Tim-Barth Residence', sub: 'Interior CGI · Dining room' },
  ],
};

const ArchImage = ({ src, caption, sub, priority = false }) => (
  <div className="au-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const ArchVideo = ({ youtubeId, title }) => (
  <div className="au-gallery-item" style={{ aspectRatio: '16 / 9', padding: 0 }}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 1 }}
    />
  </div>
);

const AuArchitecturalVisualisationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '$6.13', label: 'AUD equivalent CPC — the highest commercial intent keyword in our entire Australian dataset' },
      { number: 'KD 25', label: 'Keyword difficulty — strong opportunity with low-DA competitors on page one' },
      { number: '45%', label: 'Faster Australian council planning approval timelines with high-quality visualisation submitted' },
      { number: '3×', label: 'Higher off-plan sales conversion for Australian developers using VR walkthroughs vs renders alone' },
    ],
    gallery: ARCH_GALLERY,
    hero: {
      eyebrow: 'Home › Australia › Services › Architectural Visualisation AU',
      title: 'Architectural visualisation services for Australian property developers and architects.',
      lead: 'Photoreal renders, animated walkthroughs, VR client presentations, and planning approval packs for property developers in Sydney, Melbourne, and Brisbane. AUD pricing, AEST hours.',
      actions: true,
      stats: [
        { number: '$6.13', label: 'Highest commercial-intent AUD CPC in our dataset' },
        { number: 'KD 25', label: 'Achievable keyword difficulty' },
        { number: '45%', label: 'Faster council planning approval' },
      ],
    },
    heroVisual: <ArchImage src="https://elipsestudio.com/media/59" caption="Zenith By Amber" sub="Exterior CGI · Residential tower" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'Every visualisation format Australian property needs.',
        sub: 'One accurate 3D model of your development produces every visual you need — from council submission to the sales suite.',
      },
      items: [
        { title: 'Exterior Renders Australia', desc: 'Photoreal exterior renders for Australian residential, commercial, and mixed-use developments. Day and dusk lighting, street-level perspectives, aerial views, and council planning submission formats for NSW, VIC, and QLD.' },
        { title: 'Interior Renders Australia', desc: 'Photoreal interior visualisation for Australian residential, hospitality, retail, and commercial projects. Every material accurately rendered — Australian timber finishes, stone benchtops, and textile specifications.' },
        { title: 'Walkthrough Animation Australia', desc: 'Cinematic animated walkthroughs through Australian residential apartment buildings, commercial developments, and masterplanned communities.' },
        { title: 'VR Property Walkthroughs Australia', desc: 'Immersive VR walkthroughs placing Australian off-plan buyers inside a development at human scale before construction. Pre-sale apartment walkthroughs for Sydney, Melbourne, and Brisbane projects.' },
        { title: 'Masterplan Visualisation Australia', desc: 'Aerial and ground-level masterplan visualisation for Australian mixed-use developments, housing estates, and urban regeneration projects.' },
        { title: 'AU Council Planning Packs', desc: 'Full planning application visual packs produced to NSW, VIC, and QLD local council DA and planning permit standards — renders, streetscape views, elevations, and shadow studies at specified resolutions.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Australian Developers Choose Elipse Studio', title: 'Built for Australian developers. Priced in AUD.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// AU PROJECT OUTCOMES',
      outcomes: [
        { number: '$6.13', label: 'AUD equivalent CPC — highest commercial intent in the Australian 3D market dataset' },
        { number: '45%', label: 'Faster Australian council planning approval timelines with high-quality visualisation' },
        { number: '3×', label: 'Higher off-plan sales conversion using VR walkthroughs vs renders alone' },
        { number: '9+', label: 'Years of arch vis production for Australian and international property developments' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why Australian Developers Choose Elipse Studio',
        title: 'One model. Every stage of approval and sale.',
        body: 'We build a single accurate 3D model of your development, then produce planning visuals, marketing renders, and walkthrough animation from it — so nothing is remodelled between design stages.',
        checklist: [
          'CGI verified views produced to NSW, VIC, and QLD council DA standards',
          'Same 3D asset reused for planning, marketing, and sales suite screens',
          'Delivered for residential, commercial, and mixed-use Australian developments',
        ],
        media: <ArchVideo youtubeId="ugd5UTGFQ8U" title="Architectural Visualisation Showcase" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From architectural drawings to DA-ready renders.' },
      steps: [
        { title: 'Free AUD Estimate', desc: 'Send us your plans and render requirements. Free transparent AUD estimate within 24 AEST business hours.' },
        { title: '3D Model Build', desc: '3D model built from your Revit BIM, AutoCAD, or ArchiCAD files — or from 2D floor plans and elevations. Accurate to DA drawings.' },
        { title: 'Materials & Finishes', desc: 'PBR materials applied from your specification sheet or physical samples. Australian stone, timber, brick, and facade systems rendered accurately.' },
        { title: 'Render & Review', desc: 'Draft renders delivered for client review — camera angles, materials, and lighting approved before final production.' },
        { title: 'AU Delivery', desc: 'Final renders in all specified formats — print-ready TIFF, web JPEG, and council DA format. Revisions on materials and lighting included.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions about architectural visualisation Australia.' },
      items: [
        { q: 'How much does architectural visualisation cost in Australia?', a: 'A single exterior render for an Australian residential development: AUD $1,200–$3,500. A full DA planning submission pack (6–10 renders): AUD $5,000–$13,000. An animated walkthrough: AUD $6,000–$22,000 depending on duration and complexity.' },
        { q: 'Can you produce architectural visualisation for Australian council DA submissions?', a: 'Yes. We produce visualisation packages formatted to NSW, VIC, and QLD local council Development Application requirements — including specified camera positions, streetscape views, shadow study images, and renders at the resolution and format specified by the relevant Australian planning authority.' },
        { q: 'What source files do you need from Australian architects?', a: 'We work from Revit BIM models, AutoCAD DWG files, ArchiCAD, SketchUp, or Rhino — plus a material and finish specification. If a full BIM model is not yet complete, we work from 2D DA floor plans, elevations, sections, and a material schedule.' },
        { q: 'Do you produce VR apartment walkthroughs for Australian off-plan sales?', a: 'Yes — and this is one of our most common Australian project types. VR off-plan apartment walkthroughs place Sydney, Melbourne, or Brisbane buyers inside their specific apartment at human scale before construction begins.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your development — no commitment required.',
      interests: ['Exterior CGI Renders', 'Interior Visualisation', 'Walkthrough Animation', 'VR Property Walkthrough', 'Something Else'],
    },
    cta: { title: 'Get a free AUD estimate for your Australian Architectural Visualisation project.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <AuPage config={config} />;
};

export default AuArchitecturalVisualisationPage;
