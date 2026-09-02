'use client';

import Link from 'next/link';

const items = [
  { video: 'https://www.youtube.com/embed/ozZJOOLcD5s', name: 'Abel CM', role: 'Marketing Director', quote: 'Working with Elipse was a game-changer for our marketing.' },
  { video: 'https://www.youtube.com/embed/M1_HPIbSsLc', name: 'Ahmed', role: 'Product Manager', quote: 'The configurator completely streamlined our sales.' },
  { video: 'https://www.youtube.com/embed/s-ZyXQ1xJGU', name: 'Aviv', role: 'Sales Lead', quote: 'Our buyers can now visualize everything in real-time.' },
  { video: 'https://www.youtube.com/embed/AbTynqlzI_Y', name: 'Hyper', role: 'Creative Director', quote: 'An incredible leap in our digital presence.' },
  { video: 'https://www.youtube.com/embed/dkL3Ouz-0Vo', name: 'Tim Barth', role: 'Marketing Lead', quote: 'The 3D realism is simply unmatched.' },
];

const AuTestimonials = () => (
  <section id="testimonials" className="au-testimonials-section" aria-label="Client Reviews">
    <div className="au-container">
      <div className="au-section-head-center">
        <span className="au-section-eyebrow">Testimonials</span>
        <h2>Client Reviews</h2>
        <p className="au-testimonials-sub">Trusted by builders, brokers, and brands worldwide.</p>
      </div>

      <div className="au-testimonials-grid">
        {items.map((t, i) => (
          <div key={i} className="au-testimonial-card">
            <div className="au-testimonial-video">
              <iframe src={t.video} title={`${t.name} Review`} loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen />
            </div>
            <div className="au-testimonial-details">
              <p className="au-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="au-testimonial-name">{t.name}</div>
              <div className="au-testimonial-role">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="au-section-ctas">
        <Link href="/contact" className="au-btn au-btn-primary">Get a Free Estimate</Link>
        <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="au-btn au-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
      </div>
    </div>
  </section>
);

export default AuTestimonials;
