const UkStats = ({ stats = [] }) => (
  <div className="uk-stats-band">
    <div className="uk-container uk-stats-container">
      <div className="uk-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="uk-stat">
            <b>{s.number}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UkStats;
