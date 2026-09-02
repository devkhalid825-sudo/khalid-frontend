'use client';

import Link from 'next/link';

const AuServiceGrid = ({ items = [] }) => (
  <div className="au-service-grid">
    {items.map((it, i) => (
      <div key={i} className="au-service-card">
        <div className="au-service-top">
          <span className="au-service-num">{String(i + 1).padStart(2, '0')}</span>
          {it.badge && <span className="au-service-badge">{it.badge}</span>}
        </div>
        {it.icon && <div className="au-service-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        <p>{it.desc}</p>
        {it.tags?.length > 0 && (
          <div className="au-service-tags">
            {it.tags.map((t, ti) => <span key={ti} className="au-tag">{t}</span>)}
          </div>
        )}
        {it.href && (
          <Link href={it.href} className="au-service-link">
            {it.linkLabel || `Explore ${it.title} →`}
          </Link>
        )}
      </div>
    ))}
  </div>
);

export default AuServiceGrid;
