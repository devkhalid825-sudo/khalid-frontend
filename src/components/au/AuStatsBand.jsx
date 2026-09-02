const AuStatsBand = ({ stats = [] }) => (
  <div className="au-stats-band">
    <div className="au-container au-stats-container">
      <div className="au-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="au-stat"><b>{s.number}</b><span>{s.label}</span></div>
        ))}
      </div>
    </div>
  </div>
);

export default AuStatsBand;
