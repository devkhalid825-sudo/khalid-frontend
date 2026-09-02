'use client';

import Link from 'next/link';

const AuShowcase = ({ eyebrow, title, body, checklist = [], media, reverse = false }) => {
  return (
    <div className="au-showcase-grid">
      {reverse ? (
        <>
          <div>{media}</div>
          <div className="au-showcase-copy">
            <span className="au-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="au-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="au-section-ctas au-section-ctas--left">
              <Link href="/contact" className="au-btn au-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="au-btn au-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="au-showcase-copy">
            <span className="au-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="au-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="au-section-ctas au-section-ctas--left">
              <Link href="/contact" className="au-btn au-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="au-btn au-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
          <div>{media}</div>
        </>
      )}
    </div>
  );
};

export default AuShowcase;
