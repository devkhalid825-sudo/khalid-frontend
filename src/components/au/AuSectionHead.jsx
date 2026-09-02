const AuSectionHead = ({ eyebrow, title, sub, align = 'center' }) => {
  if (align === 'left') {
    return (
      <div className="au-section-head">
        <div className="au-section-head-text">
          {eyebrow && <span className="au-section-eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {sub && <p>{sub}</p>}
        </div>
      </div>
    );
  }
  return (
    <div className="au-section-head-center">
      <div className="au-section-head-text">
        <span className="au-section-eyebrow">{eyebrow}</span>
        {title && <h2>{title}</h2>}
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
};

export default AuSectionHead;
