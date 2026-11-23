'use client';

import Link from 'next/link';

const items = [
  { video: 'https://www.youtube.com/embed/ozZJOOLcD5s', name: 'Abel CM', role: 'Creative Director', quote: 'Bilal was instrumental to the success of our 3D platform. The process was completely transparent.' },
  { video: 'https://www.youtube.com/embed/M1_HPIbSsLc', name: 'Ahmed', role: 'Founder', quote: 'They deliver renders almost identical to reality and are remarkably cooperative with revisions.' },
  { video: 'https://www.youtube.com/embed/s-ZyXQ1xJGU', name: 'Aviv', role: 'Co-Founder', quote: 'A great company with extreme performance that delivers exceptional, high-quality VR and renders.' },
  { video: 'https://www.youtube.com/embed/AbTynqlzI_Y', name: 'Hyper', role: 'Shareholder', quote: 'Thanks to the Meta Quest 3 application developed by Elipse, users can tour architectural projects from home.' },
  { video: 'https://www.youtube.com/embed/dkL3Ouz-0Vo', name: 'Tim Barth', role: 'Founder', quote: 'The professionalism, implementation speed, and visual appeal Elipse delivers in Unreal Engine is rarely matched.' },
];

const UsTestimonials = () => (
  <section id="testimonials" className="us-testimonials-section" aria-label="Client Reviews">
    <div className="us-container">
      <div className="us-section-head-center">
        <span className="us-section-eyebrow">Testimonials</span>
        <h2>Client Reviews</h2>
        <p className="us-testimonials-sub">Trusted by builders, brokers, and brands worldwide.</p>
      </div>

      <div className="us-testimonials-grid">
        {items.map((t, i) => (
          <div key={i} className="us-testimonial-card">
            <div className="us-testimonial-video">
              <iframe src={t.video} title={`${t.name} Review`} loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen />
            </div>
            <div className="us-testimonial-details">
              <p className="us-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="us-testimonial-name">{t.name}</div>
              <div className="us-testimonial-role">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="us-section-ctas">
        <Link href="/contact" className="us-btn us-btn-primary">Get a Free Estimate</Link>
        <a data-track-id="us-testimonials-calendly" href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
      </div>
    </div>
  </section>
);

export default UsTestimonials;
