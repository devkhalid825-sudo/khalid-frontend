'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Scroll reveal wrapper: content rises + fades in when it enters the
// viewport and plays once (replaying on re-entry caused flicker). Uses only opacity/transform (no filter),
// so fixed/sticky children and layout are unaffected once settled.
// Content is always in the HTML — purely visual, no SEO impact.
export const Reveal = ({ children, className, y = 60, delay = 0, amount = 0.12, as = 'div' }) => {
  const reduced = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
};

// Staggered group: direct <RevealItem> children cascade in one by one.
const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const RevealGroup = ({ children, className, amount = 0.2 }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({ children, className }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);

export default Reveal;
