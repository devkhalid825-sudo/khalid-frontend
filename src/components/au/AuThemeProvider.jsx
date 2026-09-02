'use client';

import { useEffect, createContext, useContext, useState } from 'react';

const AuThemeCtx = createContext({ theme: 'dark', toggleTheme: () => {} });
export const useAuTheme = () => useContext(AuThemeCtx);

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return saved === 'light' || (!saved && !prefersDark) ? 'light' : 'dark';
};

const AuThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const zone = document.querySelector('.au-zone');
    if (zone) zone.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll('.au-zone .au-reveal');
      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('au-in-view'));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('au-in-view');
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <AuThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</AuThemeCtx.Provider>
  );
};

export default AuThemeProvider;
