'use client';

import { useState } from 'react';

const UkFaq = ({ items = [] }) => {
  const [open, setOpen] = useState(-1);
  return (
    <div className="uk-faq-list">
      {items.map((f, i) => (
        <div key={i} className={`uk-faq-item${open === i ? ' uk-open' : ''}`}>
          <button type="button" className="uk-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <span className="uk-plus">+</span>
          </button>
          <div className="uk-faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
};

export default UkFaq;
