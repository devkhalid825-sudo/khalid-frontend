'use client';

import Link from 'next/link';

const AuCta = ({ title = 'Ready to get started?', body = '', primaryLabel = 'Get a Free Estimate', primaryHref = '/contact', external = false, hideSecondary = false }) => (
  <section className="au-cta-band">
    <div className="au-container">
      <h2>{title}</h2>
      {body && <p>{body}</p>}
      <div className="au-cta-actions">
        {external ? (
          <a href={primaryHref} className="au-btn au-btn-primary" target="_blank" rel="noopener">{primaryLabel}</a>
        ) : (
          <Link href={primaryHref} className="au-btn au-btn-primary">{primaryLabel}</Link>
        )}
        {!hideSecondary && (
          <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="au-btn au-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
        )}
      </div>
    </div>
  </section>
);

export default AuCta;
