'use client';

import Link from 'next/link';

const UkServiceGrid = ({ items = [] }) => (
  <div className="uk-service-grid">
    {items.map((it, i) => (
      <div key={i} className="uk-service-card">
        <div className="uk-service-top">
          <span className="uk-service-num">{String(i + 1).padStart(2, '0')}</span>
          {it.badge && <span className="uk-service-badge">{it.badge}</span>}
        </div>
        {it.icon && <div className="uk-service-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        <p>{it.desc}</p>
        {it.tags?.length > 0 && (
          <div className="uk-service-tags">
            {it.tags.map((t, ti) => <span key={ti} className="uk-tag">{t}</span>)}
          </div>
        )}
        {it.href && (
          <Link href={it.href} className="uk-service-link">
            {it.linkLabel || `Explore ${it.title} →`}
          </Link>
        )}
      </div>
    ))}
  </div>
);

export default UkServiceGrid;
