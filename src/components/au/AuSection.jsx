const AuSection = ({
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
    <section id={id} className={`au-section ${className}`}>
      <div className="au-container">
        <div className={center ? 'au-section-head-center' : 'au-section-head'}>
          <div className="au-section-head-text">
            {eyebrow && <span className="au-section-eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {sub && <p>{sub}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default AuSection;
