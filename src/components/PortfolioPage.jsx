'use client';

import React, { useEffect } from 'react';
import { m as motion } from 'framer-motion';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LatestWork from './features/LatestWork';
import Contact from './features/Contact';
import ScopingBanner from './features/ScopingBanner';
import { useTheme } from './providers/ThemeProvider';

const PortfolioPage = () => {
  const { isLight } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`portfolio-page min-h-screen transition-colors duration-300 font-sans selection:bg-[#4169E1]/30 selection:text-white overflow-x-hidden ${isLight ? 'bg-white text-zinc-900' : 'bg-black text-white'}`}>
      <Header darkHero={false} lightHero={true} />

      {/* Minimal Clean Portfolio Hero (Exact match with uploaded screenshot) */}
      <section id="hero" data-nav={isLight ? 'light' : 'dark'} className={`relative w-full pt-32 sm:pt-40 md:pt-44 pb-10 sm:pb-14 md:pb-16 px-5 sm:px-8 md:px-12 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-black'}`}>
        <div className="home-container max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* Clean 2-Line Headline (Solid White in dark mode, Solid Dark in light mode) */}
            <h1 className={`text-center select-none tracking-[-0.035em] leading-[1.08] mb-6 sm:mb-8 text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-medium ${isLight ? 'text-[#0c101c]' : 'text-white'}`}>
              {/* Line 1: Work. Ideas turned */}
              <span className="block mb-1 sm:mb-2">
                Work<span className="text-[#4169E1]">.</span> Ideas turned
              </span>

              {/* Line 2: into impact. */}
              <span className="block">
                into impact<span className="text-[#4169E1]">.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-[1.7] font-normal ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Different businesses. Different challenges. Different measures of success. Explore the work we&apos;ve created to move each one forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid with dynamic theme awareness */}
      <LatestWork isLight={isLight} />

      <Contact />
      <ScopingBanner />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
