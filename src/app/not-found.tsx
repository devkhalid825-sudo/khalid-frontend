import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { FiArrowRight, FiCalendar, FiGrid } from 'react-icons/fi';
import { CALENDLY_DEFAULT_URL } from '@/components/analytics/tracking';

export const metadata: Metadata = {
  title: 'Page Not Found — Elipse Studio',
  robots: { index: false, follow: true },
};

const FEATURED_PROJECTS = [
  {
    href: '/project/volvo-configurator',
    title: 'Volvo S90 Configurator',
    label: 'Configurator',
    summary: 'Unreal Engine 5 pixel streaming in the browser',
    image: 'https://api.elipsestudio.com/media/473',
  },
  {
    href: '/project/virtual-reality-experience',
    title: 'Interactive Virtual Home',
    label: 'WebVR',
    summary: 'Real-time architectural exploration in the browser',
    image: 'https://api.elipsestudio.com/media/309',
  },
  {
    href: '/project/contact-vr-training-simulation',
    title: 'Contact VR Training Simulation',
    label: 'VR',
    summary: 'Immersive training in virtual reality',
    image: 'https://api.elipsestudio.com/media/399',
  },
];

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-[#050608] text-slate-900 dark:text-white font-sans selection:bg-[#2563EB]/30 overflow-x-hidden transition-colors duration-300">
      <Header />

      {/* A <section>, because SiteShell already provides the page's <main>. */}
      <section className="relative flex-1 w-full overflow-hidden px-4 sm:px-6 pt-32 sm:pt-40 pb-20 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[380px] rounded-full blur-[130px] bg-gradient-to-b from-[#2563EB]/15 via-indigo-500/5 to-transparent dark:from-[#2563EB]/25 dark:via-indigo-600/10" />
          <div className="absolute inset-0 opacity-70 [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,#000_60%,transparent_100%)] bg-[radial-gradient(rgba(15,23,42,0.09)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)]" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-wide text-[#2563EB] dark:text-blue-300">
              404 · Page not found
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
              Looking for One of Our 3D Experiences?
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-lg mx-auto text-slate-600 dark:text-slate-400">
              This page may have moved or no longer exists. Explore a few of our projects below, or book a quick call and tell us what you&apos;re building.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
              <a
                href={CALENDLY_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-id="not-found-book-call"
                data-track-name="Book a Call"
                data-track-location="404-hero"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] !text-white text-sm font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] transition-all active:scale-95"
              >
                <FiCalendar aria-hidden="true" />
                <span>Book a Call</span>
              </a>

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
            </div>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_PROJECTS.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                data-track-id="not-found-project-card"
                data-track-name={project.title}
                data-track-location="404-projects"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#2563EB]/50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-400/50 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 text-left">
                  <p className="text-xs font-semibold tracking-wide text-[#2563EB] dark:text-blue-300">
                    {project.label}
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
                    View project
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
