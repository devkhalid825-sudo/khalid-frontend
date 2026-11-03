import Link from 'next/link';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import BookingConfirmedEvent from './BookingConfirmedEvent';

export function generateMetadata() {
  return buildMetadata({
    title: 'Your Call Is Booked',
    description: 'Thank you for booking a scoping call with Elipse Studio.',
    canonical: `${SITE_URL}/thank-you`,
    noIndex: true,
  });
}

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <BookingConfirmedEvent />
      <Header />
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-40 md:pt-52 pb-24 md:pb-32 text-center">
        <div className="mx-auto mb-8 w-14 h-14 rounded-full border border-[#4169E1]/40 bg-[#4169E1]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#8aa4f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Your call is booked</h1>
        <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-white/70">
          Thank you for scheduling a technical scoping call with Elipse Studio. A calendar invite is on its way to your
          inbox. If you have CAD files, references or a brief, reply to that email and we&apos;ll review them before we speak.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/portfolio" className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
            Explore our portfolio
          </Link>
          <Link href="/case-studies" className="px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors">
            Read case studies
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
