import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Page Not Found — Elipse Studio',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between bg-[#050608] text-white font-sans selection:bg-[#2563EB]/30 selection:text-white overflow-x-hidden">
      {/* ── AMBIENT STUDIO GLOW & SUBTLE GRID ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[380px] bg-gradient-to-b from-[#2563EB]/20 via-indigo-600/10 to-transparent rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      <Header darkHero={true} />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-36 sm:pt-44 md:pt-48 pb-20 text-center relative z-10 my-auto !bg-transparent text-white">
        {/* Subtle Clean Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
          <span>Error 404 · Page Not Found</span>
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.14] text-white">
          Looking for One of Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
            3D Experiences?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-zinc-400 max-w-lg mx-auto">
          The page or project you requested may have moved, but our interactive work and commercial production pipelines are live.
        </p>

        {/* Highly Visible Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Primary Highly Visible Homepage Button */}
          <Link
            href="/"
            data-track-id="not-found-return-home"
            data-track-name="Return to Homepage"
            data-track-location="404-hero"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(37,99,235,0.35)] dark:shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] transition-all active:scale-95 group"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Return to Homepage</span>
          </Link>

          {/* Secondary Portfolio Archive Button */}
          <Link
            href="/portfolio"
            data-track-id="not-found-explore-portfolio"
            data-track-name="Explore Portfolio"
            data-track-location="404-hero"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/40 text-white text-xs sm:text-sm font-medium transition-all active:scale-95 group"
          >
            <span>Explore Portfolio</span>
            <FiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
