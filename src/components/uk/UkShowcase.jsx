'use client';

import Link from 'next/link';

const UkShowcase = ({ eyebrow, title, body, checklist = [], media, reverse = false }) => {
  return (
    <div className="uk-showcase-grid">
      {reverse ? (
        <>
          <div>{media}</div>
          <div className="uk-showcase-copy">
            <span className="uk-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="uk-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="uk-section-ctas uk-section-ctas--left">
              <Link href="/contact" className="uk-btn uk-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="uk-showcase-copy">
            <span className="uk-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="uk-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="uk-section-ctas uk-section-ctas--left">
              <Link href="/contact" className="uk-btn uk-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="uk-btn uk-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
          <div>{media}</div>
        </>
      )}
    </div>
  );
};

export default UkShowcase;
