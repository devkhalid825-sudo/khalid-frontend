'use client';

import Link from 'next/link';

const items = [
  { video: 'https://www.youtube.com/embed/ozZJOOLcD5s', name: 'Abel CM', role: 'Creative Director', quote: 'Bilal was instrumental to the success of our 3D platform. The process was completely transparent.' },
  { video: 'https://www.youtube.com/embed/M1_HPIbSsLc', name: 'Ahmed', role: 'Founder', quote: 'They deliver renders almost identical to reality and are remarkably cooperative with revisions.' },
  { video: 'https://www.youtube.com/embed/s-ZyXQ1xJGU', name: 'Aviv', role: 'Co-Founder', quote: 'A great company with extreme performance that delivers exceptional, high-quality VR and renders.' },
  { video: 'https://www.youtube.com/embed/AbTynqlzI_Y', name: 'Hyper', role: 'Shareholder', quote: 'Thanks to the Meta Quest 3 application developed by Elipse, users can tour architectural projects from home.' },
  { video: 'https://www.youtube.com/embed/dkL3Ouz-0Vo', name: 'Tim Barth', role: 'Founder', quote: 'The professionalism, implementation speed, and visual appeal Elipse delivers in Unreal Engine is rarely matched.' },
];

const UkTestimonials = () => (
  <section id="testimonials" className="uk-testimonials-section" aria-label="Client Reviews">
    <div className="uk-container">
      <div className="uk-section-head-center">
        <span className="uk-section-eyebrow">Testimonials</span>
        <h2>Client Reviews</h2>
        <p className="uk-testimonials-sub">Trusted by builders, brokers, and brands worldwide.</p>
      </div>

      <div className="uk-testimonials-grid">
        {items.map((t, i) => (
          <div key={i} className="uk-testimonial-card">
            <div className="uk-testimonial-video">
              <iframe src={t.video} title={`${t.name} Review`} loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen />
            </div>
            <div className="uk-testimonial-details">
              <p className="uk-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="uk-testimonial-name">{t.name}</div>
              <div className="uk-testimonial-role">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="uk-section-ctas">
        <Link href="/contact" className="uk-btn uk-btn-primary">Get a Free Estimate</Link>
        <a data-track-id="uk-testimonials-calendly" href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
      </div>
    </div>
  </section>
);

export default UkTestimonials;
