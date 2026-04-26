import { Easing, easeOut } from "framer-motion";

export const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80 },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut as Easing,
    },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const shimmerAnimate = {
  opacity: [0.5, 1, 0.5] as number[],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as Easing,
  },
};
