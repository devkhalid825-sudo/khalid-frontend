const UkMarquee = ({ items = [] }) => {
  const track = [...items, ...items];
  return (
    <div className="uk-trust">
      <div className="uk-trust-viewport">
        <div className="uk-trust-track">
          {track.map((t, i) => <span key={i} aria-hidden={i >= items.length}>{t}</span>)}
        </div>
      </div>
    </div>
  );
};

export default UkMarquee;
