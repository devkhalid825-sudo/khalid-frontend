'use client';

const AuGallery = ({ items = [] }) => (
  <div className="au-gallery-grid">
    {items.map((g, i) => (
      <div key={i} className="au-gallery-item" style={{ aspectRatio: '16 / 9' }}>
        <img src={g.src} alt={g.caption || ''} loading="lazy" />
        <span>{g.caption}</span>
        {g.sub && <small>{g.sub}</small>}
      </div>
    ))}
  </div>
);

export default AuGallery;
