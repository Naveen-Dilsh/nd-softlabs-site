"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/lib/content";
import { PILL_SHADOW } from "@/lib/shadows";
import Eyebrow from "./Eyebrow";

/**
 * "What clients say": one card per client, side by side, each tied to the
 * project it's about.
 *
 *   header   eyebrow + h2, rising out of a mask
 *   card     the project's screenshot fading into white, the client's logo
 *            sitting on its edge, the one-line result, the quote (with the
 *            orange quote marks the project pages use), then the client and a
 *            round arrow. The whole card links to the case study
 *
 * Drafts (`approved: false`) only render in dev, with a badge, so a review
 * never goes live before the client has signed off on it.
 */

const expoOut = [0.16, 1, 0.3, 1] as const;
const RING = "shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)]";

const items = testimonials.items.filter((t) => t.approved || process.env.NODE_ENV !== "production");
type Item = (typeof items)[number];

function MaskLine({ children, delay = 0, muted = false }: { children: string; delay?: number; muted?: boolean }) {
  const reduce = useReducedMotion();
  return (
    // The mask watches the viewport, not the line: the line starts fully
    // clipped, so it would never count as visible itself.
    <motion.span
      className={`block overflow-hidden ${muted ? "text-black/50" : ""}`}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
        transition={{ duration: 1, delay, ease: expoOut }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

function Card({ t, index }: { t: Item; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className={`list-none rounded-3xl bg-white/50 p-2.5 ${RING}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: expoOut }}
    >
      <Link
        href={`/work/${t.project}`}
        className="group font-display flex h-full flex-col overflow-hidden rounded-2xl bg-white text-black"
      >
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={t.image}
            alt=""
            className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-white" />
          {!t.approved && (
            <span className="absolute top-3 right-3 rounded-full bg-amber-300 px-3 py-1 text-[12px] font-medium">
              Draft · awaiting client approval
            </span>
          )}
        </div>

        <figure className="m-0 flex flex-1 flex-col gap-5 px-6 pb-6 min-[810px]:px-8 min-[810px]:pb-8">
          <img
            src={t.logo}
            alt=""
            className="relative -mt-10 size-16 rounded-full bg-white object-cover ring-[6px] ring-white"
          />
          <p className="flex items-start gap-2 text-[13px] text-black/60">
            <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            {t.highlight}
          </p>
          <blockquote className="m-0 flex-1 text-[17px] leading-[1.6] tracking-[-0.015em] min-[810px]:text-[19px]">
            <span className="text-[var(--accent)]">“</span>
            {t.quote}
            <span className="text-[var(--accent)]">”</span>
          </blockquote>
          <figcaption className="flex items-center justify-between gap-4 border-t border-black/5 pt-5">
            <span className="grid min-w-0 leading-tight">
              <span className="text-[15px] font-medium">{t.name}</span>
              <span className="text-[13px] text-black/50">{t.role}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3 text-[14px]">
              <span className="hidden min-[480px]:inline">Case study</span>
              <span
                className="grid size-10 place-items-center rounded-full bg-black text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45"
                style={{ boxShadow: PILL_SHADOW }}
              >
                <svg viewBox="0 0 256 256" className="size-4 fill-current" aria-hidden>
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                </svg>
              </span>
            </span>
          </figcaption>
        </figure>
      </Link>
    </motion.li>
  );
}

export default function Testimonials() {
  if (items.length === 0) return null;
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative overflow-x-clip px-6 min-[810px]:px-12 min-[1440px]:px-[120px]"
    >
      <div className="mx-auto max-w-[1200px] py-10 min-[810px]:py-14 min-[1440px]:py-[100px]">
        <div className="mb-8 flex flex-col items-center gap-2.5 min-[810px]:mb-12">
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <h2
            id="testimonials-title"
            className="font-display text-center text-[28px] leading-[1.4] tracking-[-0.04em] min-[810px]:text-[40px]"
          >
            <MaskLine>{testimonials.heading[0]}</MaskLine>
            <MaskLine delay={0.08} muted>
              {testimonials.heading[1]}
            </MaskLine>
          </h2>
        </div>

        <ul className="m-0 grid gap-8 p-0 min-[900px]:grid-cols-2">
          {items.map((t, i) => (
            <Card key={t.name} t={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
