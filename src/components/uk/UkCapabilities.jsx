'use client';

import Link from 'next/link';

const UkCapabilities = ({ items = [] }) => (
  <section id="capabilities">
    <div className="uk-container">
      <div className="uk-grid-3">
        {items.map((it, i) => (
          <div key={i} className="uk-card">
            <div className="uk-card-icon">{String(i + 1).padStart(2, '0')}</div>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
      <div className="uk-section-ctas">
        <Link href="/contact" className="uk-btn uk-btn-primary">Get a Free Estimate</Link>
        <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
      </div>
    </div>
  </section>
);

export default UkCapabilities;
