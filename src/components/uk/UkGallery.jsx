'use client';

const UkGallery = ({ items = [] }) => (
  <div className="uk-gallery-grid">
    {items.map((g, i) => (
      <div key={i} className="uk-gallery-item" style={{ aspectRatio: '16 / 9' }}>
        <img src={g.src} alt={g.caption || ''} loading="lazy" />
        <span>{g.caption}</span>
        {g.sub && <small>{g.sub}</small>}
      </div>
    ))}
  </div>
);

export default UkGallery;
