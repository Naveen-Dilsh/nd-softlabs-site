"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { hero, site } from "@/lib/content";
import SplitChars from "./SplitChars";
import InlineCard from "./InlineCard";
import ArrowPill from "./ArrowPill";

export default function Hero() {
  // 180px top padding at every width; bottom padding steps 80 / 56 / 118px.
  //
  // Entrance order, as live: the headline types in letter by letter as one
  // continuous run (0.03s per letter across all four words), then the badge
  // fades in, the cards swing down, the copy fades and the CTA row rises.
  return (
    <section id="hero" className="relative overflow-hidden pt-[180px] pb-20 min-[810px]:pb-14 min-[1440px]:pb-[118px]">
      <div className="relative z-10 mx-auto max-w-[1248px] px-6">
        {/* Availability badge */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={site.booking}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base leading-[1.7] whitespace-nowrap text-black"
          >
            {/* 6px solid dot, no pulse — matching the live site */}
            <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(12,179,0)]" />
            {hero.badge.text}
            <span className="text-black/30">—</span>
            <span className="inline-flex items-center gap-1 font-semibold">
              {hero.badge.action}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.div>

        {/* Headline */}
        {/* Like the live site, the headline is one centred, wrapping flex row
            of six items (word, card, word, word, card, words), capped at
            1000 / 718px. The cap is what forces the line breaks, so phones
            get "Unlimited ▢ / Design for ▢ / Solid Startups" for free.
            The padding on each word stands in for the space character the
            live site keeps inside each text block. Sizes, gaps and caps step
            at 810 / 1440px. */}
        <h1 className="font-display mx-auto mt-9 flex max-w-[1000px] flex-wrap items-center justify-center gap-1.5 text-center text-[44px] leading-[1.25] tracking-[-0.06em] min-[810px]:max-w-[718px] min-[810px]:gap-2 min-[810px]:text-[80px] min-[810px]:leading-[1.15] min-[1440px]:max-w-[1000px] min-[1440px]:gap-3 min-[1440px]:text-[108px]">
          <SplitChars
            text={hero.headline.lead}
            className="pr-[0.194em] font-medium text-black"
            trigger="mount"
          />
          <InlineCard images={hero.cardA} delay={1.1} />
          <SplitChars
            text={hero.headline.leadMuted}
            className="pl-[0.194em] font-normal text-black/50"
            delay={0.27}
            trigger="mount"
          />
          <SplitChars
            text={hero.headline.joiner}
            className="pr-[0.194em] font-normal text-black/50"
            delay={0.45}
            trigger="mount"
          />
          <InlineCard images={hero.cardB} delay={1.2} />
          <SplitChars
            text={hero.headline.tail}
            className="pl-[0.194em] font-medium text-black"
            delay={0.54}
            trigger="mount"
          />
        </h1>

        {/* Sub-copy */}
        <motion.p
          className="mx-auto mt-9 max-w-[434px] text-center text-base leading-[1.7] text-balance text-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA + social proof */}
        <motion.div
          className="mt-7 flex items-center justify-center gap-[21px] min-[1440px]:mt-12"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowPill href={site.booking}>{hero.cta}</ArrowPill>

          <div className="flex flex-col gap-1">
            <div className="flex">
              {hero.avatars.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-[31px] w-[31px] rounded-full object-cover"
                  style={{ marginLeft: i === 0 ? 0 : -6, zIndex: 10 - i }}
                />
              ))}
            </div>
            <span className="text-xs leading-[1.5] text-black/50">
              {hero.trustLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
