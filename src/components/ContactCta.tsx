"use client";

import { motion } from "motion/react";
import { contactCta } from "@/lib/content";
import Eyebrow from "./Eyebrow";
import PillLink from "./PillLink";

/** Inverse rounded corners (24px) that round off the dark panel's frame. */
const CORNERS = [
  { d: "M0 48V0h48C21.49 0 0 21.49 0 48", pos: "top-2 left-2" },
  { d: "M48 48V0H0c26.51 0 48 21.49 48 48", pos: "top-2 right-2" },
  { d: "M48 0v48H0c26.51 0 48-21.49 48-48", pos: "right-2 bottom-2" },
  { d: "M48 48H0V0c0 26.51 21.49 48 48 48", pos: "bottom-2 left-2" },
];

const FADE =
  "radial-gradient(125% 100% at 0% 0%, #000 0%, rgba(0,0,0,0.224) 88.29%, rgba(0,0,0,0) 100%)";

/**
 * The footer, measured off the live site: a full-viewport black panel framed
 * by an 8px #d9d9d9 border with rounded inner corners. Inside, a dark radial
 * glow carrying the same five light rays as the page (at 5%), a 10% grain,
 * the "Let's Connect" call to action and a copyright line.
 *
 *             side pad  v pad  gap  heading
 *   phone     24        40*    36   28px    (*plus 36 outer; content sits low)
 *   810+      40        56     28   80px
 *   1440+     112       80     36   108px   (content capped at 1366px)
 *
 * Motion: the call-to-action block drops in once from 600px above, fading
 * up from transparent, the first time the footer scrolls into view.
 * The footer is the viewport's full height (svh, so it doesn't jump as a
 * phone's address bar shows and hides).
 */
export default function ContactCta() {
  return (
    <motion.footer
      id="cta"
      // The footer watches the viewport, not the block: the block starts
      // 600px up, clipped by the footer, so on phones it never counted as
      // visible itself and stayed hidden.
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.1 }}
      className="relative flex h-[100svh] flex-col items-center justify-end overflow-hidden bg-black px-6 py-9 min-[810px]:px-10 min-[810px]:py-0 min-[1440px]:px-28"
    >
      {/* Glow + rays, faded out from the top-left like the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden [&_.ray]:opacity-5"
        style={{
          background: "radial-gradient(100% 100% at 0% 0%, #2e2e2e 0%, #000 100%)",
          mask: FADE,
          WebkitMask: FADE,
        }}
      >
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
        <div className="ray ray-4" />
        <div className="ray ray-5" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/img/6mcf62RlDfRfU61Yg5vb2pefpi.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "150px auto",
        }}
      />

      <div className="relative flex w-full max-w-[1366px] flex-col justify-end gap-9 py-10 min-[810px]:flex-1 min-[810px]:gap-7 min-[810px]:py-14 min-[1440px]:gap-9 min-[1440px]:py-20">
        <motion.div
          className="flex flex-col items-center justify-center gap-9 rounded-2xl px-9 py-[60px] min-[810px]:flex-1"
          variants={{ hidden: { opacity: 0, y: -600 }, shown: { opacity: 1, y: 0 } }}
          transition={{ type: "spring", bounce: 0.15, duration: 1.6 }}
        >
          <Eyebrow light italic>
            {contactCta.eyebrow}
          </Eyebrow>

          <div className="flex w-full max-w-[620px] flex-col items-center gap-[34px] text-center min-[810px]:gap-2.5">
            <h2 className="font-display text-[28px] leading-[1.4] tracking-[-0.04em] text-white/50 min-[810px]:text-[80px] min-[810px]:leading-[1.15] min-[810px]:tracking-[-0.06em] min-[1440px]:text-[108px]">
              <span className="text-white">{contactCta.headingLight} </span>
              {contactCta.headingMuted}
            </h2>
            <p className="font-display text-lg leading-[1.5] tracking-[-0.02em] text-balance text-white min-[810px]:text-xl">
              {contactCta.body}
            </p>
          </div>

          <PillLink href="/contact" frame="bg-white/30">
            {contactCta.cta}
          </PillLink>
        </motion.div>

        {/* Copyright between two hairlines; two centred lines on phones */}
        <div className="flex justify-center min-[810px]:justify-between">
          <div className="relative flex min-h-11 items-center px-4 py-[7.5px] min-[810px]:py-2 after:pointer-events-none after:absolute after:inset-0 after:border-y after:border-white/50 after:content-['']">
            <p className="font-display flex flex-col gap-4 text-center text-base leading-[1.7] text-white min-[810px]:block min-[810px]:text-left">
              <span>{contactCta.copyright}</span>
              <span className="hidden min-[810px]:inline"> | </span>
              <span>{contactCta.byline}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Frame: 8px border plus rounded inner corners, drawn on top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 border-8 border-[#d9d9d9]"
      />
      {CORNERS.map((c) => (
        <svg
          key={c.pos}
          aria-hidden
          viewBox="0 0 48 48"
          className={`pointer-events-none absolute z-10 h-6 w-6 fill-[#d9d9d9] ${c.pos}`}
        >
          <path d={c.d} />
        </svg>
      ))}
    </motion.footer>
  );
}
