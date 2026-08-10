import type { Variants } from "framer-motion";

/* shared scroll-reveal variants — apply staggerContainer to a section's
   intro wrapper (initial="hidden" whileInView="show"), and fadeUp to each
   direct child, so the tag/heading/subtext cascade in individually
   instead of the whole block arriving as one flat fade. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.15 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};
