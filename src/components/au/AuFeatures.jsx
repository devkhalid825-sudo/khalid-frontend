const AuFeatures = ({ items = [], centered = false }) => (
  <div className={centered ? 'au-grid-3' : 'au-grid-3'}>
    {items.map((it, i) => (
      <div key={i} className="au-card">
        {it.icon && <div className="au-card-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        {it.desc && <p>{it.desc}</p>}
      </div>
    ))}
  </div>
);

export default AuFeatures;
