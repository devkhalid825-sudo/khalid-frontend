'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

// ── Bilal Lania Directive: 5-Metric Impact Ticker ──
const METRICS = [
  { prefix: '<', num: 50, suffix: '', unit: 'ms', label: 'WebGL render latency' },
  { prefix: '', num: 40, suffix: '', unit: '%', label: 'Faster sales cycle' },
  { prefix: '', num: 60, suffix: '', unit: 'FPS', label: 'Mobile performance' },
  { prefix: '$', num: 75, suffix: 'k', unit: '+', label: 'CPQ automation saved' },
  { text: 'Weeks', unit: '', label: 'Not months — delivery' },
];

// Heading distributed over 4 calm lines. The full sentence stays real text
// inside one <h2>: "Build the unbuilt. Real-time 3D configurators,
// virtual tours, and commercial CGI." — animation is visual only.
const LINES = [
  { t: 'Build the unbuilt.' },
  { t: 'Real-time 3D configurators,', accent: true },
  { t: 'virtual tours, and' },
  { t: 'commercial CGI.' },
];

const COPY =
  'Elipse Studio is a specialist 3D technology studio — we design, build, and deploy real-time web configurators, immersive VR environments, and cinematic CGI for brands that compete at the highest level.';

const EASE = [0.22, 1, 0.36, 1];

const headingVariants = {
  hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};
const lineVariants = {
  hidden: { y: '105%', opacity: 0, transition: { duration: 0.5, ease: EASE } },
  visible: { y: '0%', opacity: 1, transition: { duration: 1.1, ease: EASE } },
};
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: EASE } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } },
});
const metricsVariants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const metricVariants = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.4, ease: EASE } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const barVariants = {
  hidden: { scaleX: 0, transition: { duration: 0.4, ease: EASE } },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
};

// One paragraph word that "fills in" (muted → full ink) as you scroll.
const FillWord = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <>
      <motion.span className="si-fill-word" style={{ opacity }}>
        {word}
      </motion.span>{' '}
    </>
  );
};

// Number counts up when it enters view. Server HTML holds the final value.
const CountUp = ({ m, reduced, once }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const count = useMotionValue(m.num ?? 0);
  const display = useTransform(count, (v) => `${m.prefix ?? ''}${Math.round(v)}${m.suffix ?? ''}`);

  useEffect(() => {
    if (reduced || m.num == null) return undefined;
    if (!inView) {
      if (!once) count.set(0); // phones: count once, don't reset to 0
      return undefined;
    }
    const controls = animate(count, m.num, { duration: 1.6, ease: EASE });
    return () => controls.stop();
  }, [inView, m.num, reduced, count, once]);

  if (m.text) return <span ref={ref}>{m.text}</span>;
  return <motion.span ref={ref}>{display}</motion.span>;
};

// Touch/phone detection that is hydration-safe (server snapshot = false).
const TOUCH_QUERY = '(pointer: coarse)';
const subscribeTouch = (cb) => {
  const mq = window.matchMedia(TOUCH_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useIsTouch = () =>
  useSyncExternalStore(subscribeTouch, () => window.matchMedia(TOUCH_QUERY).matches, () => false);

const StudioIntro = () => {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const reduced = useReducedMotion();
  // Phones: play once (re-hiding a tall block while it's still half on screen
  // feels broken). Desktop: replay on re-entry.
  const isTouch = useIsTouch();
  const viewport = { amount: 0.2, once: isTouch };
  const init = reduced ? 'visible' : 'hidden';

  // Section exit: drift up & fade as it leaves the top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });
  const blockOpacity = useTransform(progress, [0.74, 0.97], [1, 0]);
  const blockY = useTransform(progress, [0.74, 0.97], [0, -50]);

  // Paragraph fill: scrubbed while the paragraph travels up the viewport.
  const { scrollYProgress: copyScroll } = useScroll({
    target: copyRef,
    offset: ['start 0.95', 'end 0.65'],
  });
  const copyProgress = useSpring(copyScroll, { stiffness: 100, damping: 26, mass: 0.3 });
  const words = COPY.split(' ');

  return (
    <section ref={sectionRef} className="si-section bg-black">
      <motion.div
        className="home-container"
        style={reduced || isTouch ? undefined : { opacity: blockOpacity, y: blockY }}
      >
        <div className="si-grid">
          {/* Left: eyebrow + heading */}
          <div className="si-left">
            <motion.p
              className="si-eyebrow"
              initial={init}
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp(0)}
            >
              <span className="si-eyebrow-dot" aria-hidden="true" />
              What we build
            </motion.p>

            <motion.h2
              className="si-heading"
              initial={init}
              whileInView="visible"
              viewport={viewport}
              variants={headingVariants}
            >
              {LINES.map((l, i) => (
                <React.Fragment key={i}>
                  {/* Line = block on ≥640px (fixed 4-line layout), inline on
                      phones so words flow naturally. Each word has its own mask. */}
                  <span className={`si-line-row${l.accent ? ' si-accent-row' : ''}`}>
                    {l.t.split(' ').map((w, wi, arr) => (
                      <React.Fragment key={wi}>
                        <span className="si-line-mask">
                          <motion.span variants={lineVariants} className="si-line">
                            {w}
                          </motion.span>
                        </span>
                        {wi < arr.length - 1 ? ' ' : null}
                      </React.Fragment>
                    ))}
                  </span>
                  {i < LINES.length - 1 ? ' ' : null}
                </React.Fragment>
              ))}
            </motion.h2>
          </div>

          {/* Right: scroll-fill paragraph + link */}
          <div className="si-right">
            <p ref={copyRef} className={`si-copy${reduced || isTouch ? ' si-copy--static' : ''}`}>
              {reduced || isTouch
                ? COPY
                : words.map((w, i) => (
                    <FillWord
                      key={i}
                      word={w}
                      progress={copyProgress}
                      range={[i / words.length, (i + 1) / words.length]}
                    />
                  ))}
            </p>
            <motion.div
              initial={init}
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp(0.3)}
            >
              <Link href="/services" className="si-link">
                <span>Explore our services</span>
                <span className="si-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 5-Metric Impact Strip */}
        <motion.dl
          className="si-metrics"
          initial={init}
          whileInView="visible"
          viewport={{ amount: 0.3, once: isTouch }}
          variants={metricsVariants}
        >
          {METRICS.map((m) => (
            <motion.div key={m.label} className="si-metric" variants={metricVariants}>
              <motion.span aria-hidden="true" className="si-metric-bar" variants={barVariants} />
              <dt className="si-metric-label">{m.label}</dt>
              <dd className="si-metric-value">
                <CountUp m={m} reduced={reduced} once={isTouch} />
                {m.unit && <span className="si-metric-unit">{m.unit}</span>}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
};

export default StudioIntro;
