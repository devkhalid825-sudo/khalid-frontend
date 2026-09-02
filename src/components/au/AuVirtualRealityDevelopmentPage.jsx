'use client';

import AuPage from './AuPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './AuPageData';

const VR_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'VR experiences from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/38', caption: 'Contact VR Training Simulation', sub: 'VR training · Meta Quest' },
    { src: 'https://elipsestudio.com/media/66', caption: 'Jewellery Shop', sub: 'VR retail experience' },
    { src: 'https://elipsestudio.com/media/73', caption: 'Virtual Reality Experience', sub: 'VR interior · Day/night control' },
    { src: 'https://elipsestudio.com/media/74', caption: 'Roamstead Web VR', sub: 'Browser-based VR' },
  ],
};

const VrImage = ({ src, caption, sub, priority = false }) => (
  <div className="au-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const AuVirtualRealityDevelopmentPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '40%', label: 'Average reduction in training time for Australian organisations using VR vs classroom-based methods' },
      { number: '70%', label: 'Higher knowledge retention in VR training vs video-based learning for Australian corporate programmes' },
      { number: '3×', label: 'Higher off-plan property sales conversion for Australian developers using VR walkthroughs vs renders alone' },
      { number: 'KD 33', label: 'Keyword difficulty — achievable with strong on-page optimisation and Australian geo signals' },
    ],
    gallery: VR_GALLERY,
    hero: {
      eyebrow: 'Home › Australia › Services › VR Development AU',
      title: 'VR development for Australian brands — training, property, and immersive experiences.',
      lead: 'Custom virtual reality for Australian brands — corporate and mining training simulations, off-plan property walkthroughs for Sydney and Melbourne, and product demonstrations at full scale. Meta Quest and WebVR. AUD pricing.',
      actions: true,
      stats: [
        { number: '40%', label: 'Reduction in training time vs classroom methods' },
        { number: '70%', label: 'Higher knowledge retention vs video learning' },
        { number: 'KD 33', label: 'Achievable Australian keyword' },
      ],
    },
    heroVisual: <VrImage src="https://elipsestudio.com/media/38" caption="Contact VR Training Simulation" sub="VR training · Meta Quest" priority />,
    capabilities: {
      head: {
        eyebrow: 'Australian VR Use Cases',
        title: 'Five VR applications for Australian industries.',
        sub: 'One Unreal Engine 5 build, optimised and deployed to standalone Quest, tethered PC VR, and browser-based WebVR.',
      },
      items: [
        { title: 'Mining & Resources VR Training', desc: 'VR safety training for Australian mining, oil, and gas organisations — simulating underground environments, equipment operation, emergency response, and site induction. Mapped to Australian Mining Safety and Health Act requirements.' },
        { title: 'Construction & Trade VR Australia', desc: 'VR construction site safety induction, height safety training, and work-at-heights simulation — producing SafeWork AU and state WHS compliant simulation environments.' },
        { title: 'Property VR Walkthroughs Australia', desc: 'VR off-plan property walkthroughs for Australian apartment developers in Sydney, Melbourne, and Brisbane — placing buyers inside their specific apartment at human scale before construction begins.' },
        { title: 'Product VR Demonstrations Australia', desc: 'Let Australian B2B buyers and consumers experience products at full scale in VR — industrial machinery, large furniture, commercial kitchen equipment, and automotive products.' },
        { title: 'Corporate & Compliance VR Training', desc: 'Immersive VR compliance training for Australian financial services, healthcare, and government organisations — AML/CTF, WHS, privacy, and workplace conduct scenarios.' },
        { title: 'AEST Hours — Australian Regulatory Understanding', desc: 'Direct AEST contact. Australian WHS, SafeWork, and industry-specific regulatory requirements built into every VR training environment.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why Australian Enterprises Choose VR',
        title: 'Training and sales scenarios you cannot safely or affordably run in reality.',
        body: 'A VR simulation is repeatable, measurable, and safe — every trainee gets the same scenario, and every buyer gets the same premium demo, wherever they are in Australia.',
        checklist: [
          'Deployed to Meta Quest 2/3, PC VR, and WebVR from one build',
          'Built with Australian WHS, SafeWork, and DMIRS compliance requirements in mind',
          'Delivered for mining, property, manufacturing, and healthcare clients',
        ],
        media: <VrImage src="https://elipsestudio.com/media/73" caption="Virtual Reality Experience" sub="VR interior · Day/night control" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From brief to headset-ready build.' },
      steps: [
        { title: 'Scope & Use Case', desc: 'We define the training scenario or demo flow and target headset. Free AUD estimate within 24 AEST business hours.' },
        { title: '3D Environment Build', desc: 'The environment, product, or facility is modelled to the fidelity the use case requires.' },
        { title: 'Interaction Design', desc: 'VR-native interaction — hand tracking, controllers, or gaze — is designed and wired in Unreal Engine.' },
        { title: 'Device Optimisation', desc: 'Performance-tuned for standalone Quest hardware, then validated on PC VR and WebVR targets.' },
        { title: 'Deployment & AU Support', desc: 'Delivered via Quest App Lab, direct install, or browser link, with AEST support post-launch.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions about VR development Australia.' },
      items: [
        { q: 'What VR hardware do you develop for in Australia?', a: 'Meta Quest standalone (no PC required — recommended for most Australian training deployments), PC VR (Meta Quest + Link, HTC Vive, Valve Index), and WebVR (browser-based — for Australian remote sites where headset logistics are impractical).' },
        { q: 'How much does VR development cost in Australia?', a: 'A focused VR training module (single scenario, Meta Quest deployment): AUD $12,000–$35,000. Multi-scenario VR training suite: AUD $35,000–$110,000. VR property walkthrough for an Australian residential development: AUD $8,000–$24,000.' },
        { q: 'Can VR training meet Australian WHS and SafeWork requirements?', a: 'Yes. Elipse Studio builds VR training content with Australian workplace health and safety legislation in mind — SafeWork NSW, WorkSafe VIC, Workplace Health and Safety QLD, DMIRS (WA), and NTWS for Territory clients.' },
        { q: 'How long does a VR development project take?', a: 'A single-scenario VR training module: 8–12 weeks. Multi-scenario VR training suite: 16–26 weeks. VR property walkthrough from receipt of architectural files: 6–10 weeks.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept scope for your VR project — no commitment required.',
      interests: ['VR Training Simulation', 'Property VR Walkthrough', 'Product VR Demonstration', 'Corporate Compliance VR', 'Something Else'],
    },
    cta: { title: 'Get a free AUD estimate for your Australian VR project.', body: 'No commitment. Free concept scope for qualifying projects.' },
  };

  return <AuPage config={config} />;
};

export default AuVirtualRealityDevelopmentPage;
