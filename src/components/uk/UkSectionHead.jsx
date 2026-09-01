const UkSectionHead = ({ eyebrow, title, sub, align = 'center' }) => {
  if (align === 'left') {
    return (
      <div className="uk-section-head">
        <div className="uk-section-head-text">
          {eyebrow && <span className="uk-section-eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {sub && <p>{sub}</p>}
        </div>
      </div>
    );
  }
  return (
    <div className="uk-section-head-center">
      <div className="uk-section-head-text">
        <span className="uk-section-eyebrow">{eyebrow}</span>
        {title && <h2>{title}</h2>}
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
};

export default UkSectionHead;
