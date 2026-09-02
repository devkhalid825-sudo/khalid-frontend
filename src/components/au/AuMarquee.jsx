const AuMarquee = ({ items = [] }) => {
  const track = [...items, ...items];
  return (
    <div className="au-trust">
      <div className="au-trust-viewport">
        <div className="au-trust-track">
          {track.map((t, i) => <span key={i} aria-hidden={i >= items.length}>{t}</span>)}
        </div>
      </div>
    </div>
  );
};

export default AuMarquee;
