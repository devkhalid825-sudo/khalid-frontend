'use client';

import { useEffect, useState } from 'react';

export default function LegalToc({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-32">
      <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">On this page</p>
      <ol className="relative border-l border-white/10 space-y-1">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block -ml-px pl-4 py-1.5 text-[13px] leading-snug border-l-2 transition-colors ${
                  isActive ? 'border-[#4169E1] text-white' : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <span className="tabular-nums text-white/30 mr-2">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
