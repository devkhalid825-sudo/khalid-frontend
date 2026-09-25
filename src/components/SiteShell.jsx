'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { FaWhatsapp } from '@/components/ui/Icons';
import FramerProvider from '@/components/providers/FramerProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function SiteShell({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
  }, []);

  return (
    <ThemeProvider>
      <FramerProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="lazyOnload"
        />
        <div className="site-shell-container font-sans antialiased bg-black text-white min-h-screen transition-colors duration-300">
          <main id="main-content" className="flex flex-col">
            {children}
          </main>
        <a
          href="https://wa.me/923323141556?text=Hi%20Elipse%20Studio%2C%20I%27d%20like%20a%20quick%20inquiry%20about%20your%203D%20services."
          target="_blank"
          rel="noopener noreferrer"
          data-el-track="whatsapp-floating-button"
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'generate_lead', {
                event_category: 'Contact',
                event_label: 'WhatsApp Click - Floating Button',
                value: 1,
              });
            }
          }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full pl-3 pr-4 py-2.5 md:py-3 shadow-lg hover:bg-[#1ebe5b] transition-all duration-300 hover:scale-105"
          aria-label="Quick Inquiries — chat on WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">Quick Inquiries</span>
        </a>
      </div>
      </FramerProvider>
    </ThemeProvider>
  );
}
