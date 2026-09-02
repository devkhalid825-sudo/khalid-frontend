'use client';

import Link from 'next/link';

const AuCapabilities = ({ items = [] }) => (
  <section id="capabilities">
    <div className="au-container">
      <div className="au-grid-3">
        {items.map((it, i) => (
          <div key={i} className="au-card">
            <div className="au-card-icon">{String(i + 1).padStart(2, '0')}</div>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
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

export default AuCapabilities;
