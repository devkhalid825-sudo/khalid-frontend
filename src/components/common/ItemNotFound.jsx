import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { FiArrowLeft } from 'react-icons/fi';

// Simple message for a missing /project/ or /case-study/ slug. Keep these routes
// answering HTTP 200: server.js sends anything Next answers 404 to the legacy site.
export default function ItemNotFound({ title, listHref, listLabel }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-[#050608] text-slate-900 dark:text-white font-sans transition-colors duration-300">
      <Header />

      <section className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
            {title}
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/"
              data-track-id="item-not-found-return-home"
              data-track-name="Back to Home"
              data-track-location="item-not-found"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] !text-white text-sm font-semibold transition-all active:scale-95"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>

            <Link
              href={listHref}
              data-track-id="item-not-found-view-list"
              data-track-name={listLabel}
              data-track-location="item-not-found"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border text-sm font-semibold transition-all active:scale-95 border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 !text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:hover:bg-slate-800 dark:hover:border-slate-400 dark:!text-white"
            >
              {listLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
