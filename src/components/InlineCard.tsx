"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Layered drop shadow, measured off the live site (6 stacked layers rather
 * than one soft blur — that stacking is what gives the card its weight).
 * Kept in px: the card only ranges ~99–144px wide, so it needs no scaling.
 */
const CARD_SHADOW = [
  "0.57px 0.57px 0.8px -0.71px rgba(0,0,0,0.50)",
  "1.45px 1.45px 2.04px -1.42px rgba(0,0,0,0.48)",
  "2.9px 2.9px 4.1px -2.13px rgba(0,0,0,0.46)",
  "5.49px 5.49px 7.77px -2.83px rgba(0,0,0,0.41)",
  "10.92px 10.92px 15.44px -3.54px rgba(0,0,0,0.32)",
  "24px 24px 33.94px -4.25px rgba(0,0,0,0.09)",
].join(", ");

/**
 * The small rounded media card that sits inline inside the hero headline.
 *
 * It is a *slideshow*, configured exactly like the live site's Framer
 * Slideshow: direction "top", one image every 3s, spring transition
 * (stiffness 200, damping 40). Images always travel upward and loop like a
 * wheel — after the last image the first one slides up again from below,
 * never rewinding downward. Both hero cards run on the same 3s clock, so
 * they change together.
 *
 * Geometry is taken from the live site and steps at the same breakpoints as
 * the headline (height and radius are relative to the headline's font size):
 *
 *   phones    44px text -> 67x50,  16px radius  (1.136em / 0.364em)
 *   >=810px   80px text -> 99x74,  24px radius  (0.925em / 0.300em)
 *   >=1440px 108px text -> 144x108, 36px radius (1.000em / 0.333em)
 *
 * It rests at -2deg at every width. The live site's entrance animation
 * starts it at about -13deg, so a measurement taken before that animation
 * finishes (e.g. in a backgrounded tab) reports the wrong angle.
 *
 * It is a flex item of the headline row, which centres it vertically, so it
 * needs no margins or vertical nudges of its own.
 */
const INTERVAL = 3000;
const SLIDE = { type: "spring", stiffness: 200, damping: 40, mass: 1 } as const;

export default function InlineCard({
  images,
  delay = 0,
}: {
  images: string[];
  /** Entrance delay in seconds. */
  delay?: number;
}) {
  // `pos` is which image is showing. The strip carries a copy of the first
  // image at the end: we slide onto that copy (still moving up), then jump
  // back to the real first image with no animation — they look identical,
  // so the loop never visibly runs backwards.
  const [pos, setPos] = useState(0);
  const [instant, setInstant] = useState(false);
  const strip = [...images, images[0]];

  useEffect(() => {
    if (images.length < 2) return;
    // Aligned to wall-clock multiples of 3s so every card steps together.
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setInstant(false);
      setPos((p) => p + 1);
      id = setInterval(() => {
        setInstant(false);
        setPos((p) => p + 1);
      }, INTERVAL);
    }, INTERVAL - (Date.now() % INTERVAL));
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [images.length]);

  // Once the slide onto the copy has settled (the spring takes well under
  // 1s), swap to the real first image. A timer rather than
  // onAnimationComplete, which never fires in a backgrounded tab.
  useEffect(() => {
    if (pos !== images.length) return;
    const id = setTimeout(() => {
      setInstant(true);
      setPos(0);
    }, 1000);
    return () => clearTimeout(id);
  }, [pos, images.length]);

  return (
    // Entrance as live: from invisible, 9px left, 43px up and -13deg, it
    // swings down to rest at -2deg.
    <motion.span
      initial={{ opacity: 0, x: -9, y: -43, rotate: -13 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: -2 }}
      transition={{ type: "spring", bounce: 0.25, duration: 1, delay }}
      className="relative block aspect-[4/3] h-[1.136em] shrink-0 overflow-hidden rounded-[0.364em] bg-black tracking-normal after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-2 after:border-black after:content-[''] min-[810px]:h-[0.925em] min-[810px]:rounded-[0.3em] min-[1440px]:h-[1em] min-[1440px]:rounded-[0.333em]"
      style={{ boxShadow: CARD_SHADOW }}
      aria-hidden
    >
      <motion.span
        className="block h-full w-full"
        animate={{ y: `${-pos * 100}%` }}
        transition={instant ? { duration: 0 } : SLIDE}
      >
        {strip.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="block aspect-[4/3] w-full object-cover"
          />
        ))}
      </motion.span>
    </motion.span>
  );
}
