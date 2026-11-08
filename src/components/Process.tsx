"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { process } from "@/lib/content";
import Eyebrow from "./Eyebrow";

/**
 * Each card flies in once from a scattered, over-rotated start and settles at
 * a slight tilt — start and rest values measured off the live site
 * ([rotate°, x, y]). Cards 1 and 3 sit lower than card 2 on tablet/desktop.
 */
const CARDS = [
  { from: [-18, 321, -20], rest: -5, restPhone: -3, offset: "min-[810px]:pt-[62px]" },
  { from: [34, 7, 161], rest: 9, restPhone: 9, offset: "" },
  { from: [-4, -274, -98], rest: -3, restPhone: -3, offset: "min-[810px]:pt-16" },
] as const;

const SPRING = { type: "spring", bounce: 0.2, duration: 1.4 } as const;

/** Hand-drawn orange connectors; they draw themselves on once the cards land. */
const CURL =
  "M 95.993 11.704 C 43.708 8.765 57.558 98.411 77.749 93.631 C 97.94 88.852 48.295 23.589 19.858 39.508 C -8.579 55.425 10.736 95.485 15.297 103.641 C 19.859 111.796 46.874 150.721 92.134 170.369 M 92.468 163.464 C 96.205 163.464 99.234 166.488 99.234 170.219 C 99.234 173.949 96.205 176.974 92.468 176.974 C 88.731 176.974 85.702 173.949 85.702 170.219 C 85.702 166.488 88.731 163.464 92.468 163.464 Z M 95.851 4.728 C 99.588 4.728 102.617 7.752 102.617 11.483 C 102.617 15.214 99.588 18.238 95.851 18.238 C 92.114 18.238 89.085 15.214 89.085 11.483 C 89.085 7.752 92.114 4.728 95.851 4.728 Z";
const ARC =
  "M 10.716 56.236 C 10.716 56.236 38.876 9.087 88.573 3.406 C 138.271 -2.276 172.885 11.384 233.016 57.669 M 10.586 50.115 C 14.483 50.115 17.643 53.285 17.643 57.197 C 17.643 61.108 14.483 64.279 10.586 64.279 C 6.688 64.279 3.529 61.108 3.529 57.197 C 3.529 53.285 6.688 50.115 10.586 50.115 Z M 232.886 50.115 C 236.783 50.115 239.943 53.285 239.943 57.197 C 239.943 61.108 236.783 64.279 232.886 64.279 C 228.988 64.279 225.829 61.108 225.829 57.197 C 225.829 53.285 228.988 50.115 232.886 50.115 Z";

function Connector({
  d,
  viewBox,
  className,
}: {
  d: string;
  viewBox: string;
  className: string;
}) {
  return (
    <div className={`pointer-events-none absolute min-[810px]:max-[1439px]:hidden ${className}`}>
      <svg viewBox={viewBox} className="h-full w-full" fill="none" aria-hidden>
        <motion.path
          d={d}
          stroke="#ff3700"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/** True from 810px up, where cards rest at their wide-layout tilt. */
function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 810px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide;
}

/**
 * "Here's how it works". On the live site this block also holds the two
 * testimonials; those render from <Testimonials /> right after, so the bottom
 * padding here is just the inter-block gap (24 / 28 / 60px).
 *
 *   phone    stacked 342x220 cards, 55px apart, connectors re-angled
 *   810+     three touching 309x350 cards, no connectors
 *   1440+    three 437x454 cards, 24px apart, connectors between them
 */
export default function Process() {
  const wide = useWide();
  return (
    // overflow-x-clip: the cards' fly-in start positions reach past the edge,
    // which on phones would otherwise widen the whole page.
    <section id="process" className="relative overflow-x-clip px-6 min-[810px]:px-12 min-[1440px]:px-[120px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 pt-10 pb-6 min-[810px]:gap-7 min-[810px]:pt-14 min-[810px]:pb-7 min-[1440px]:gap-[60px] min-[1440px]:pt-[120px] min-[1440px]:pb-[60px]">
        <div className="flex flex-col items-center gap-2.5">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <h2 className="font-display w-full text-center text-[28px] leading-[1.4] tracking-[-0.04em] text-balance min-[810px]:text-[48px]">
            {process.heading}
          </h2>
        </div>

        <div className="relative flex flex-col items-start gap-[55px] pt-4 min-[810px]:flex-row min-[810px]:gap-0 min-[810px]:pt-0 min-[1440px]:gap-6">
          {process.steps.map((step, i) => {
            const card = CARDS[i];
            return (
              // The wrapper watches the viewport, not the card: on phones cards
              // 1 and 3 start off-screen, so they would never fire themselves.
              <motion.div
                key={step.n}
                className={`w-full min-w-0 min-[810px]:flex-1 ${card.offset}`}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  variants={{
                    hidden: { rotate: card.from[0], x: card.from[1], y: card.from[2] },
                    shown: { rotate: wide ? card.rest : card.restPhone, x: 0, y: 0 },
                  }}
                  transition={SPRING}
                >
                  <div className="flex h-[220px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)] min-[810px]:h-[350px] min-[1440px]:h-[454px]">
                    <p className="font-display text-[44px] leading-[1.25] font-light tracking-[-0.06em] min-[810px]:text-[56px] min-[1440px]:text-[72px]">
                      {step.n}
                    </p>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg leading-[1.6] tracking-[-0.02em] text-balance min-[810px]:text-2xl">
                        {step.title}
                      </h3>
                      <p className="font-display text-base leading-[1.7] text-balance text-black/50">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          <Connector
            d={CURL}
            viewBox="0 0 106 179"
            className="top-[491px] left-[71.6%] z-[1] h-[187px] w-[121px] rotate-[-166deg] min-[1440px]:top-[217px] min-[1440px]:left-[62.63%] min-[1440px]:rotate-[-75deg]"
          />
          <Connector
            d={ARC}
            viewBox="0 0 247 69"
            className="top-[196px] left-[58.5%] h-[75px] w-[245px] rotate-[92deg] min-[1440px]:top-2 min-[1440px]:left-[29%] min-[1440px]:-translate-x-1/2 min-[1440px]:rotate-[-25deg]"
          />
        </div>
      </div>
    </section>
  );
}
