"use client";

import { motion, type Variants } from "motion/react";
import type { CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  /**
   * "mount" plays immediately (above-the-fold copy); "view" waits for the
   * element to scroll into view.
   */
  trigger?: "mount" | "view";
  /** Starting blur in px: 4 for display headlines, 1 for body-size copy. */
  blur?: number;
};

/**
 * Framer's "appear by character": every glyph starts invisible, blurred 4px
 * and 10px low, and they settle on a stagger.
 *
 * Glyphs are NOT wrapped in clipping boxes. At the headline's -0.06em
 * tracking neighbouring letters overhang each other's boxes, so a per-glyph
 * overflow:hidden slices the edges off letters and they look overlapped.
 *
 * Glyphs are grouped per word so lines still break between words: a flat run
 * of inline-blocks lets the browser break anywhere, which splits words down
 * the middle at narrow widths.
 */
type Custom = { delay: number; stagger: number; blur: number };

const container: Variants = {
  hidden: {},
  show: (custom: Custom) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const glyph: Variants = {
  hidden: (custom: Custom) => ({ opacity: 0, filter: `blur(${custom.blur}px)`, y: 10 }),
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SplitChars({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.03,
  trigger = "view",
  blur = 4,
}: Props) {
  const playback =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.01 },
        };

  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      style={style}
      initial="hidden"
      {...playback}
      variants={container}
      custom={{ delay, stagger, blur }}
      aria-label={text}
    >
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              variants={glyph}
              custom={{ delay, stagger, blur }}
            >
              {ch}
            </motion.span>
          ))}
          {w < words.length - 1 && (
            // A real space glyph, so its width follows the font and the
            // heading's letter-spacing instead of a guessed em value.
            <span className="inline-block whitespace-pre"> </span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
