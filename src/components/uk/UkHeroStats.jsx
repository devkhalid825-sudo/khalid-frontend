const UkHeroStats = ({ stats = [] }) => (
  <div className="uk-hero-stats">
    {stats.map((s, i) => (
      <div key={i} className="uk-hero-stat">
        <b>{s.number}</b>
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

export default UkHeroStats;
