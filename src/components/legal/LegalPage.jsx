import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import LegalToc from './LegalToc';

const LEGAL_TABS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms of Service' },
];

/**
 * Shared layout for legal pages (Privacy Policy, Terms & Conditions).
 * sections:   [{ id, title, body: ReactNode }]
 * highlights: optional [{ title, text }] shown as "at a glance" cards
 */
export default function LegalPage({ title, intro, lastUpdated, sections, highlights, currentPath }) {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-48 pb-14 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            {LEGAL_TABS.map((t) => {
              const active = t.href === currentPath;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition-colors ${
                    active ? 'bg-white text-black font-medium' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white pb-2">
            {title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/60">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3558D4]" />
              Last updated {lastUpdated}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">GDPR · UK DPA · CCPA · PDPA</span>
          </div>

          {intro && (
            <p className="mt-8 max-w-3xl text-base md:text-lg font-light leading-relaxed text-white/70">{intro}</p>
          )}

          {highlights?.length > 0 && (
            <div className="mt-12 grid sm:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
                >
                  <div className="w-8 h-[2px] bg-[#3558D4] mb-4" />
                  <h3 className="text-base font-semibold mb-2">{h.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-white/60">{h.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 md:pb-28 grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
        <aside className="hidden lg:block">
          <LegalToc sections={sections.map(({ id, title: t }) => ({ id, title: t }))} />
        </aside>

        <div className="space-y-5">
          {sections.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-32 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors p-6 md:p-9"
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full border border-[#4169E1]/40 bg-[#3558D4]/10 text-[#8aa4f0] text-xs font-semibold tabular-nums flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold leading-tight pt-1">{s.title}</h2>
              </div>
              <div className="md:pl-[52px] space-y-4 text-[15px] md:text-base font-light leading-relaxed text-white/70 [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:rounded-full [&_li]:before:bg-[#3558D4] [&_strong]:text-white [&_strong]:font-medium [&_a]:text-[#8aa4f0] [&_a:hover]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-white/20">
                {s.body}
              </div>
            </article>
          ))}

          {/* ===== CONTACT CTA ===== */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-7 md:p-10 mt-10 bg-white/[0.03]">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Questions about your data?</h2>
            <p className="text-white/60 font-light mb-6 max-w-xl">
              Our team responds to privacy and legal requests by email. Reach out any time.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@elipsestudio.com"
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                info@elipsestudio.com
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors"
              >
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
