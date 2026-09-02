'use client';

import AuThemeProvider from './AuThemeProvider';
import AuNav from './AuNav';
import AuAnnouncementBar from './AuAnnouncementBar';
import AuHero from './AuHero';
import AuWaveDivider from './AuWaveDivider';
import AuMarquee from './AuMarquee';
import AuTrustBand from './AuTrustBand';
import AuSectionHead from './AuSectionHead';
import AuCapabilities from './AuCapabilities';
import AuServiceGrid from './AuServiceGrid';
import AuFeatures from './AuFeatures';
import AuWhySplit from './AuWhySplit';
import AuStatsBand from './AuStatsBand';
import AuShowcase from './AuShowcase';
import AuGallery from './AuGallery';
import AuProcess from './AuProcess';
import AuTestimonials from './AuTestimonials';
import AuFaq from './AuFaq';
import AuContact from './AuContact';
import AuCta from './AuCta';
import AuFooter from './AuFooter';
import AuWhatsApp from './AuWhatsApp';

const AuPage = ({ config }) => {
  const {
    navLinks,
    navCta,
    navCtaHref,
    navPhoneBadge,
    announcement,
    hero,
    heroVisual,
    marquee,
    statsBand,
    trustBand,
    capabilities,
    serviceGrid,
    midCta,
    whyUs,
    stats,
    industries,
    showcase,
    gallery,
    process,
    testimonials = true,
    faq,
    contact,
    cta,
  } = config;

  return (
    <AuThemeProvider>
      <AuNav links={navLinks} cta={navCta} ctaHref={navCtaHref} phoneBadge={navPhoneBadge} />

      {announcement && <AuAnnouncementBar>{announcement}</AuAnnouncementBar>}

      <AuHero {...hero} visual={heroVisual} />
      <AuWaveDivider />

      {marquee && marquee.length > 0 && <AuMarquee items={marquee} />}

      {statsBand && statsBand.length > 0 && <AuStatsBand stats={statsBand} />}

      {trustBand && trustBand.length > 0 && <AuTrustBand items={trustBand} />}

      {capabilities && (
        <section id="capabilities">
          <div className="au-container">
            {capabilities.head && (
              <AuSectionHead {...capabilities.head} align="center" />
            )}
            <AuCapabilities items={capabilities.items} />
          </div>
        </section>
      )}

      {serviceGrid && (
        <section id="services" className="au-reveal">
          <div className="au-container">
            {serviceGrid.head && <AuSectionHead {...serviceGrid.head} align="center" />}
            <AuServiceGrid items={serviceGrid.items} />
          </div>
        </section>
      )}

      {midCta && <AuCta {...midCta} />}

      {whyUs && (
        <section id="why" className="au-reveal">
          <div className="au-container">
            {whyUs.head && <AuSectionHead {...whyUs.head} align="center" />}
            <AuWhySplit items={whyUs.items} outcomesLabel={whyUs.outcomesLabel} outcomes={whyUs.outcomes} />
          </div>
        </section>
      )}

      {stats && stats.length > 0 && <AuStatsBand stats={stats} />}

      {industries && (
        <section id="industries" className="au-reveal">
          <div className="au-container">
            {industries.head && <AuSectionHead {...industries.head} align="center" />}
            <AuFeatures items={industries.items} />
          </div>
        </section>
      )}

      {showcase && showcase.length > 0 && (
        <section className="au-reveal">
          <div className="au-container">
            {showcase.map((s, i) => <AuShowcase key={i} {...s} />)}
          </div>
        </section>
      )}

      {gallery && (
        <section className="au-reveal">
          <div className="au-container">
            {gallery.head && <AuSectionHead {...gallery.head} align="center" />}
            <AuGallery items={gallery.items} />
          </div>
        </section>
      )}

      {process && (
        <section className="au-reveal">
          <div className="au-container">
            {process.head && <AuSectionHead {...process.head} align="center" />}
            <AuProcess steps={process.steps} />
          </div>
        </section>
      )}

      {testimonials && <AuTestimonials />}

      {faq && (
        <section id="faq" className="au-reveal">
          <div className="au-container au-faq-container">
            {faq.head && <AuSectionHead {...faq.head} align="center" />}
            <AuFaq items={faq.items} />
          </div>
        </section>
      )}

      <AuContact {...contact} />

      {cta && <AuCta {...cta} />}

      <AuFooter />
      <AuWhatsApp />
    </AuThemeProvider>
  );
};

export default AuPage;
