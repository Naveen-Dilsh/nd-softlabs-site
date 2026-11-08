"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { statement } from "@/lib/content";

/** The live site's banded 45deg sheen, feathered out by a radial mask. */
const SHEEN =
  "linear-gradient(45deg, #fff 0%, #fff 10.49%, #fff 20.85%, rgba(255,255,255,0.5) 28.9%, #d9d9d9 36.86%, #d9d9d9 46.66%, rgba(255,255,255,0.5) 54.23%, #d9d9d9 59.63%, #d9d9d9 63.43%, rgba(255,255,255,0.5) 67.32%, #fff 72.92%, #d9d9d9 76.12%, #fff 80.81%, #d9d9d9 84.72%, #d9d9d9 89.81%, #d9d9d9 100%)";
const SHEEN_MASK = "radial-gradient(50% 50%, #000 0%, rgba(0,0,0,0) 100%)";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/**
 * Word-by-word reveal tied to scroll, as on the live site: every word starts
 * at 20% opacity and the run lights up while the paragraph's top travels from
 * 75% to 35% of the viewport. It reverses when scrolling back up.
 */
function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "start 0.35"],
  });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display text-center text-[28px] leading-[1.4] tracking-[-0.04em] text-black min-[810px]:text-[32px] min-[1440px]:text-[44px]"
    >
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </Word>
      ))}
    </p>
  );
}

type Tag = (typeof statement.tags)[number];

/**
 * One capability pill. It flies in once from an offset, over-rotated start
 * and settles at a slight tilt. Positions are per breakpoint and measured
 * from the centre of the text block, so they hold at any width in a range.
 */
function FloatingTag({ tag }: { tag: Tag }) {
  const [fr, fx, fy] = tag.from;
  const [tr, tx, ty] = tag.to;
  return (
    <motion.div
      className="absolute top-[var(--tm)] left-[calc(50%+var(--xm))] z-10 min-[810px]:top-[var(--tt)] min-[810px]:left-[calc(50%+var(--xt))] min-[1440px]:top-[var(--td)] min-[1440px]:left-[calc(50%+var(--xd))]"
      style={
        {
          "--tm": `${tag.pos.m[0]}px`,
          "--xm": `${tag.pos.m[1]}px`,
          "--tt": `${tag.pos.t[0]}px`,
          "--xt": `${tag.pos.t[1]}px`,
          "--td": `${tag.pos.d[0]}px`,
          "--xd": `${tag.pos.d[1]}px`,
        } as React.CSSProperties
      }
      // Driven by the text block's "shown" (see Statement): a tag watching
      // itself would never fire on phones, where it starts off-screen.
      variants={{
        hidden: { opacity: 0, rotate: fr, x: fx, y: fy },
        shown: { opacity: 1, rotate: tr, x: tx, y: ty },
      }}
      transition={{ type: "spring", bounce: 0.2, duration: 1.2 }}
    >
      <div className="relative flex items-center gap-2 overflow-hidden rounded-full bg-white py-1 pr-5 pl-1 shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white after:content-['']">
        <span
          className="relative h-8 w-8 shrink-0 rounded-full"
          style={{ background: tag.bg }}
        >
          {"stroke" in tag ? (
            <svg
              viewBox="0 0 24 24"
              className="absolute top-1.5 left-1.5 h-5 w-5"
              fill="none"
              stroke={tag.fg}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d={tag.icon} />
            </svg>
          ) : (
            <svg
              viewBox="0 0 256 256"
              className="absolute top-1.5 left-1.5 h-5 w-5"
              style={{ fill: tag.fg }}
              aria-hidden
            >
              <path d={tag.icon} />
            </svg>
          )}
        </span>
        <span className="font-display text-base leading-[1.7] whitespace-nowrap text-black">
          {tag.label}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * "Hello!" statement: a full-viewport band with a scroll-revealed paragraph,
 * a feathered sheen behind it, and six tags that fly in around the text
 * (below it on phones). Gutters 24 / 48 / 120px, as elsewhere.
 */
export default function Statement() {
  return (
    <section className="relative flex h-[100vh] flex-col items-center justify-center overflow-hidden px-6 min-[810px]:px-12 min-[1440px]:px-[120px]">
      <div className="relative flex h-full w-full max-w-[1366px] flex-col items-center justify-center gap-6 py-10 min-[810px]:gap-7 min-[810px]:py-14 min-[1440px]:gap-0 min-[1440px]:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: SHEEN, mask: SHEEN_MASK, WebkitMask: SHEEN_MASK }}
        />

        {/* Eyebrow: italic serif between two hairlines that fade outward */}
        <div className="relative flex max-w-full items-center justify-center gap-6 px-6">
          <span
            className="h-px w-[69px] opacity-50"
            style={{ background: "linear-gradient(90deg, rgba(84,84,84,0) 0%, rgba(0,0,0,0.5) 100%)" }}
          />
          <h4 className="font-serif text-2xl leading-[1.2] text-black/50 italic">
            {statement.eyebrow}
          </h4>
          <span
            className="h-px w-[69px] opacity-50"
            style={{ background: "linear-gradient(270deg, rgba(84,84,84,0) 0%, rgba(0,0,0,0.5) 100%)" }}
          />
        </div>

        <motion.div
          className="relative w-full max-w-[940px] pb-[280px] min-[810px]:px-24 min-[810px]:py-12 min-[1440px]:px-[120px]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          <RevealText text={statement.text} />
          {statement.tags.map((tag) => (
            <FloatingTag key={tag.label} tag={tag} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
