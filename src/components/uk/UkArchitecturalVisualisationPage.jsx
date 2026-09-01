'use client';

import UkPage from './UkPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UkPageData';
import { WHY_US_ITEMS } from './UkServicesPage';

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
  <div className="uk-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const ArchVideo = ({ youtubeId, title }) => (
  <div className="uk-gallery-item" style={{ aspectRatio: '16 / 9', padding: 0 }}>
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

const UkArchitecturalVisualisationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '250+', label: 'UK & global developments visualised' },
      { number: '9+', label: 'Years producing architectural CGI' },
      { number: '98%', label: 'Planning visual approval rate' },
      { number: '3', label: 'Global delivery hubs' },
    ],
    gallery: ARCH_GALLERY,
    hero: {
      eyebrow: 'Home › UK › Services › Architectural Visualisation UK',
      title: 'Architectural visualisation UK developers use to sell before the first brick is laid.',
      lead: 'Photoreal exterior and interior CGI, cinematic walkthroughs, and planning application visuals for UK property developers, architects, and construction firms — produced from your plans or BIM model.',
      actions: true,
      stats: [
        { number: '2-4 wks', label: 'Typical render turnaround' },
        { number: '250+', label: 'Developments visualised' },
        { number: '98%', label: 'Planning approval rate' },
      ],
    },
    heroVisual: <ArchImage src="https://elipsestudio.com/media/59" caption="Zenith By Amber" sub="Exterior CGI · Residential tower" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'From planning drawing to sold-out development.',
        sub: 'One accurate 3D model of your development produces every visual you need — from the planning committee to the sales suite.',
      },
      items: [
        { title: 'Exterior CGI Renders UK', desc: 'Photoreal exterior stills for planning applications, marketing brochures, and investor decks — lit and staged to match the target season and time of day.' },
        { title: 'Interior Visualisation UK', desc: 'Furnished interior renders showing finishes, lighting, and materials exactly as specified — for show apartments, sales suites, and fit-out proposals.' },
        { title: 'Cinematic Walkthrough Animation', desc: 'A full flythrough of the development — site context, approach, and interior — for planning committees, sales galleries, and social launch films.' },
        { title: 'Planning Application Visuals UK', desc: 'CGI verified views (AVR) and photomontages produced to the standard UK local planning authorities require for consent packs.' },
        { title: 'Real-Time 3D Models', desc: 'The same architectural model rebuilt for real-time exploration — walkthrough on a tablet at a sales event, no render wait.' },
        { title: 'BIM & CAD Integration UK', desc: 'Built directly from Revit, SketchUp, or AutoCAD files, so the visualisation matches the approved design exactly, revision for revision.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio UK', title: 'Built for UK developers. Delivered from London.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// UK PROJECT OUTCOMES',
      outcomes: [
        { number: '98%', label: 'CGI verified views approved on first submission to UK planning authorities' },
        { number: '250+', label: 'UK & international developments visualised for planning and sales' },
        { number: '2-4wks', label: 'Typical turnaround from brief to finished exterior render' },
        { number: '9+', label: 'Years producing architectural CGI for UK developers' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why UK Developers Choose Elipse Studio',
        title: 'One model. Every stage of approval and sale.',
        body: 'We build a single accurate 3D model of your development, then produce planning visuals, marketing renders, and walkthrough animation from it — so nothing is remodelled between RIBA stages.',
        checklist: [
          'CGI verified views produced to UK local authority AVR standards',
          'Same 3D asset reused for planning, marketing, and sales suite screens',
          'Delivered for residential, commercial, and mixed-use UK developments',
        ],
        media: <ArchVideo youtubeId="ugd5UTGFQ8U" title="Architectural Visualisation Showcase" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From plans to planning-ready visuals.' },
      steps: [
        { title: 'Brief & Drawings', desc: 'Share your plans, BIM model, or CAD files along with the visual brief. Free estimate within 24 UK business hours.' },
        { title: 'Model & Site Context', desc: 'We build the architectural model and surrounding site context, referencing planning drawings and site photography.' },
        { title: 'Look Development', desc: 'Materials, lighting, and landscaping tuned until stills read as photographs, calibrated to the target season and time of day.' },
        { title: 'Render & Animation', desc: 'Final stills, verified views, and walkthrough animation produced to your required resolution and format.' },
        { title: 'Delivery & Revisions', desc: 'Assets delivered for planning submission, marketing, or sales use, with revision rounds covered post-delivery.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions UK developers ask before commissioning CGI.' },
      items: [
        { q: 'Can you work directly from our BIM model?', a: 'Yes — we work from Revit, SketchUp, ArchiCAD, and AutoCAD files, importing the model directly to avoid re-modelling.' },
        { q: 'Do you produce verified views for planning applications?', a: 'Yes — we produce CGI verified views (AVR) to the standard UK local planning authorities require for consent packs.' },
        { q: 'How long does an exterior render take?', a: 'A single exterior CGI typically takes 2-4 weeks; full planning packs and walkthrough animation take longer depending on scope.' },
        { q: 'Can renders be used before a project has planning consent?', a: 'Yes — pre-application visuals are common for community consultation and investor decks.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your development — no commitment required.',
      interests: ['Exterior CGI Renders', 'Interior Visualisation', 'Walkthrough Animation', 'Planning Application Visuals', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your UK development visualisation.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UkPage config={config} />;
};

export default UkArchitecturalVisualisationPage;
