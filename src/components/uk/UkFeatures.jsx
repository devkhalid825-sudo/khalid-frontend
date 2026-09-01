const UkFeatures = ({ items = [], centered = false }) => (
  <div className={centered ? 'uk-grid-3' : 'uk-grid-3'}>
    {items.map((it, i) => (
      <div key={i} className="uk-card">
        {it.icon && <div className="uk-card-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        {it.desc && <p>{it.desc}</p>}
      </div>
    ))}
  </div>
);

export default UkFeatures;
