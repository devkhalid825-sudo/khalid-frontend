'use client';

import UkThemeProvider from './UkThemeProvider';
import UkNav from './UkNav';
import UkAnnouncementBar from './UkAnnouncementBar';
import UkHero from './UkHero';
import UkWaveDivider from './UkWaveDivider';
import UkMarquee from './UkMarquee';
import UkTrustBand from './UkTrustBand';
import UkSectionHead from './UkSectionHead';
import UkCapabilities from './UkCapabilities';
import UkServiceGrid from './UkServiceGrid';
import UkFeatures from './UkFeatures';
import UkWhySplit from './UkWhySplit';
import UkStatsBand from './UkStatsBand';
import UkShowcase from './UkShowcase';
import UkGallery from './UkGallery';
import UkProcess from './UkProcess';
import UkTestimonials from './UkTestimonials';
import UkFaq from './UkFaq';
import UkContact from './UkContact';
import UkCta from './UkCta';
import UkFooter from './UkFooter';
import UkWhatsApp from './UkWhatsApp';

const UkPage = ({ config }) => {
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
    <UkThemeProvider>
      <UkNav links={navLinks} cta={navCta} ctaHref={navCtaHref} phoneBadge={navPhoneBadge} />

      {announcement && <UkAnnouncementBar>{announcement}</UkAnnouncementBar>}

      <UkHero {...hero} visual={heroVisual} />
      <UkWaveDivider />

      {marquee && marquee.length > 0 && <UkMarquee items={marquee} />}

      {statsBand && statsBand.length > 0 && <UkStatsBand stats={statsBand} />}

      {trustBand && trustBand.length > 0 && <UkTrustBand items={trustBand} />}

      {capabilities && (
        <section id="capabilities">
          <div className="uk-container">
            {capabilities.head && (
              <UkSectionHead {...capabilities.head} align="center" />
            )}
            <UkCapabilities items={capabilities.items} />
          </div>
        </section>
      )}

      {serviceGrid && (
        <section id="services" className="uk-reveal">
          <div className="uk-container">
            {serviceGrid.head && <UkSectionHead {...serviceGrid.head} align="center" />}
            <UkServiceGrid items={serviceGrid.items} />
          </div>
        </section>
      )}

      {midCta && <UkCta {...midCta} />}

      {whyUs && (
        <section id="why" className="uk-reveal">
          <div className="uk-container">
            {whyUs.head && <UkSectionHead {...whyUs.head} align="center" />}
            <UkWhySplit items={whyUs.items} outcomesLabel={whyUs.outcomesLabel} outcomes={whyUs.outcomes} />
          </div>
        </section>
      )}

      {stats && stats.length > 0 && <UkStatsBand stats={stats} />}

      {industries && (
        <section id="industries" className="uk-reveal">
          <div className="uk-container">
            {industries.head && <UkSectionHead {...industries.head} align="center" />}
            <UkFeatures items={industries.items} />
          </div>
        </section>
      )}

      {showcase && showcase.length > 0 && (
        <section className="uk-reveal">
          <div className="uk-container">
            {showcase.map((s, i) => <UkShowcase key={i} {...s} />)}
          </div>
        </section>
      )}

      {gallery && (
        <section className="uk-reveal">
          <div className="uk-container">
            {gallery.head && <UkSectionHead {...gallery.head} align="center" />}
            <UkGallery items={gallery.items} />
          </div>
        </section>
      )}

      {process && (
        <section className="uk-reveal">
          <div className="uk-container">
            {process.head && <UkSectionHead {...process.head} align="center" />}
            <UkProcess steps={process.steps} />
          </div>
        </section>
      )}

      {testimonials && <UkTestimonials />}

      {faq && (
        <section id="faq" className="uk-reveal">
          <div className="uk-container uk-faq-container">
            {faq.head && <UkSectionHead {...faq.head} align="center" />}
            <UkFaq items={faq.items} />
          </div>
        </section>
      )}

      <UkContact {...contact} />

      {cta && <UkCta {...cta} />}

      <UkFooter />
      <UkWhatsApp />
    </UkThemeProvider>
  );
};

export default UkPage;
