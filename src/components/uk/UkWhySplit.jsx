const UkWhySplit = ({ items = [], outcomesLabel = 'Outcomes', outcomes = [] }) => (
  <div className="uk-why-split">
    <ul className="uk-why-list">
      {items.map((it, i) => (
        <li key={i} className="uk-why-item">
          {it.icon && <span className="uk-why-icon">{it.icon}</span>}
          <div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
          </div>
        </li>
      ))}
    </ul>
    {outcomes.length > 0 && (
      <div className="uk-outcomes-panel">
        <div className="uk-outcomes-label">{outcomesLabel}</div>
        <div>
          {outcomes.map((o, i) => (
            <div key={i} className="uk-outcome-item">
              <div className="uk-outcome-num">{o.number}</div>
              <div className="uk-outcome-desc">{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default UkWhySplit;
