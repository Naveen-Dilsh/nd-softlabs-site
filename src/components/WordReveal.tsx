"use client";

import { motion } from "motion/react";

/**
 * Framer's "appear by word", as on the live project pages: every word starts
 * invisible, blurred 8px and 10px low, then clears in 0.45s, each one 0.05s
 * after the last. It plays once on mount, so a long paragraph keeps writing
 * itself in for a few seconds.
 */
export default function WordReveal({
  text,
  className,
  delay = 0.1,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <h3 className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            className="no-blur-touch inline-block"
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.45, delay: delay + i * stagger, ease: [0.44, 0, 0.56, 1] }}
          >
            {word}
          </motion.span>{" "}
        </span>
      ))}
    </h3>
  );
}
