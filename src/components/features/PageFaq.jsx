'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Single-list FAQ accordion (same look as the homepage FAQ, without tabs).
 * Every answer stays in the HTML (hidden until opened) so the page text matches the FAQPage schema.
 */
const PageFaq = ({ faqs, title = 'Frequently Asked Questions', eyebrow, id = 'faq' }) => {
  const { isLight } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`w-full py-14 md:py-24 px-5 md:px-16 border-t transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200' : 'bg-black border-zinc-800'}`}
    >
      <div className="max-w-4xl mx-auto">
        {eyebrow && (
          <p className="text-center text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-4">{eyebrow}</p>
        )}
        <h2
          id={`${id}-heading`}
          className={`text-center text-2xl md:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1] mb-8 md:mb-12 ${isLight ? 'text-zinc-900' : 'text-white'}`}
        >
          {title}
        </h2>

        <div className={`divide-y border-y ${isLight ? 'divide-zinc-200 border-zinc-200' : 'divide-white/10 border-white/10'}`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="py-4 sm:py-5">
                <h3>
                  <button
                    type="button"
                    id={`${id}-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className={`text-sm sm:text-lg font-semibold tracking-[-0.02em] ${isOpen ? 'text-[#4169E1]' : isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                      {faq.q}
                    </span>
                    <span aria-hidden="true" className={`text-xl text-[#4169E1] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-answer-${index}`}
                  role="region"
                  aria-labelledby={`${id}-question-${index}`}
                  hidden={!isOpen}
                  className={`mt-3 pr-6 text-sm sm:text-base font-serif leading-[1.75] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PageFaq;
