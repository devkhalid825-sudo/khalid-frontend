const AuWhySplit = ({ items = [], outcomesLabel = 'Outcomes', outcomes = [] }) => (
  <div className="au-why-split">
    <ul className="au-why-list">
      {items.map((it, i) => (
        <li key={i} className="au-why-item">
          {it.icon && <span className="au-why-icon">{it.icon}</span>}
          <div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
          </div>
        </li>
      ))}
    </ul>
    {outcomes.length > 0 && (
      <div className="au-outcomes-panel">
        <div className="au-outcomes-label">{outcomesLabel}</div>
        <div>
          {outcomes.map((o, i) => (
            <div key={i} className="au-outcome-item">
              <div className="au-outcome-num">{o.number}</div>
              <div className="au-outcome-desc">{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default AuWhySplit;
