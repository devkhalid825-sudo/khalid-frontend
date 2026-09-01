const UkSection = ({
  id,
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
  children,
}) => {
  const center = align === 'center';
  return (
    <section id={id} className={`uk-section ${className}`}>
      <div className="uk-container">
        <div className={center ? 'uk-section-head-center' : 'uk-section-head'}>
          <div className="uk-section-head-text">
            {eyebrow && <span className="uk-section-eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {sub && <p>{sub}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default UkSection;
