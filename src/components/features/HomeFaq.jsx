'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { HOMEPAGE_FAQ_TABS } from '@/seo/serviceFaqs';

const HomeFaq = () => {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState(HOMEPAGE_FAQ_TABS[0].id);
  const [openQuestion, setOpenQuestion] = useState(`${HOMEPAGE_FAQ_TABS[0].id}-0`);

  const selectTab = (id) => {
    setActiveTab(id);
    setOpenQuestion(`${id}-0`);
  };

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className={`w-full px-[15px] md:px-[40px] py-14 md:py-20 border-t transition-colors duration-300 ${isLight ? 'bg-white border-zinc-200' : 'bg-black border-zinc-800'}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="home-faq-heading"
          className={`text-center text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] mb-6 md:mb-10 ${isLight ? 'text-zinc-900' : 'text-white'}`}
        >
          Frequently Asked Questions
        </h2>

        <div role="tablist" aria-label="FAQ topics" className="flex flex-col md:flex-row md:justify-center gap-2 mb-6 md:mb-8">
          {HOMEPAGE_FAQ_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`home-faq-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`home-faq-panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`px-4 py-2.5 rounded-full border text-xs sm:text-sm font-semibold leading-snug transition-colors cursor-pointer ${isActive
                  ? 'bg-[#4169E1] border-[#4169E1] text-white'
                  : isLight
                    ? 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-black'
                    : 'bg-transparent border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Every answer stays in the HTML (hidden until opened) so the page text matches the FAQPage schema. */}
        {HOMEPAGE_FAQ_TABS.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`home-faq-panel-${tab.id}`}
            aria-labelledby={`home-faq-tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className={`divide-y border-y ${isLight ? 'divide-zinc-200 border-zinc-200' : 'divide-white/10 border-white/10'}`}
          >
            {tab.faqs.map((faq, index) => {
              const questionId = `${tab.id}-${index}`;
              const isOpen = openQuestion === questionId;
              return (
                <div key={faq.q} className="py-4 sm:py-5">
                  <h3>
                    <button
                      type="button"
                      id={`home-faq-question-${questionId}`}
                      aria-expanded={isOpen}
                      aria-controls={`home-faq-answer-${questionId}`}
                      onClick={() => setOpenQuestion(isOpen ? null : questionId)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className={`text-sm sm:text-lg font-medium ${isOpen ? 'text-[#4169E1]' : isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
                        {faq.q}
                      </span>
                      <span aria-hidden="true" className={`text-xl text-[#4169E1] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`home-faq-answer-${questionId}`}
                    role="region"
                    aria-labelledby={`home-faq-question-${questionId}`}
                    hidden={!isOpen}
                    className={`mt-3 pr-6 text-sm sm:text-base leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFaq;
