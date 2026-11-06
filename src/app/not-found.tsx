import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { FiCalendar, FiGrid, FiHome } from 'react-icons/fi';
import { CALENDLY_DEFAULT_URL } from '@/components/analytics/tracking';

export const metadata: Metadata = {
  title: 'Page Not Found — Elipse Studio',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-[#2563EB]/30 overflow-x-hidden transition-colors duration-300">
      <Header />

      {/* A <section>, because SiteShell already provides the page's <main>. */}
      <section className="relative flex-1 w-full overflow-hidden px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-24 flex items-center justify-center">
        <div className="relative w-full max-w-5xl mx-auto my-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-wide text-[#2563EB] dark:text-blue-300">
              404 · Page not found
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
              Looking for One of Our 3D Experiences?
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-lg mx-auto text-slate-600 dark:text-slate-400">
              The page you are looking for may have moved or no longer exists. Feel free to return home, explore our portfolio, or book a quick scoping call with our team.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] !text-white text-sm font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] transition-all active:scale-95"
              >
                <FiHome aria-hidden="true" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/portfolio"
                data-track-id="not-found-portfolio"
                data-track-name="View Portfolio"
                data-track-location="404-hero"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm font-semibold transition-all active:scale-95 border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 !text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:hover:border-slate-400 dark:!text-white"
              >
                <FiGrid aria-hidden="true" />
                <span>View Portfolio</span>
              </Link>

              <a
                href={CALENDLY_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-id="not-found-book-call"
                data-track-name="Book a Call"
                data-track-location="404-hero"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm font-semibold transition-all active:scale-95 border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 !text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:hover:border-slate-400 dark:!text-white"
              >
                <FiCalendar aria-hidden="true" />
                <span>Book a Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
