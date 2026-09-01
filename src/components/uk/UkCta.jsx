'use client';

import Link from 'next/link';

const UkCta = ({ title = 'Ready to get started?', body = '', primaryLabel = 'Get a Free Estimate', primaryHref = '/contact', external = false, hideSecondary = false }) => (
  <section className="uk-cta-band">
    <div className="uk-container">
      <h2>{title}</h2>
      {body && <p>{body}</p>}
      <div className="uk-cta-actions">
        {external ? (
          <a href={primaryHref} className="uk-btn uk-btn-primary" target="_blank" rel="noopener">{primaryLabel}</a>
        ) : (
          <Link href={primaryHref} className="uk-btn uk-btn-primary">{primaryLabel}</Link>
        )}
        {!hideSecondary && (
          <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
        )}
      </div>
    </div>
  </section>
);

export default UkCta;
