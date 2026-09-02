'use client';

import { useState } from 'react';

const AuFaq = ({ items = [] }) => {
  const [open, setOpen] = useState(-1);
  return (
    <div className="au-faq-list">
      {items.map((f, i) => (
        <div key={i} className={`au-faq-item${open === i ? ' au-open' : ''}`}>
          <button type="button" className="au-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <span className="au-plus">+</span>
          </button>
          <div className="au-faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
};

export default AuFaq;
