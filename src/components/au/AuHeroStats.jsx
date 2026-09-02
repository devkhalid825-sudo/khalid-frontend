const AuHeroStats = ({ stats = [] }) => (
  <div className="au-hero-stats">
    {stats.map((s, i) => (
      <div key={i} className="au-hero-stat">
        <b>{s.number}</b>
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

export default AuHeroStats;
