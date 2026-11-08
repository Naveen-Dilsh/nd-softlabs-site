"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { faq, site } from "@/lib/content";
import { PILL_SHADOW } from "@/lib/shadows";
import Eyebrow from "./Eyebrow";
import { WHATSAPP_ICON } from "./WhatsAppButton";

/** Phosphor "plus" (regular); rotates 45deg into an "x" when open. */
const PLUS =
  "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One question. As live: every item starts closed and toggles on its own
 * (several can be open). Opening adds a 20px gap and the answer, which fades
 * in; the orange plus brightens from 75% and turns 45deg into an "x". A 1px
 * hairline (black/25) sits under every item.
 */
function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col py-9 after:absolute after:inset-x-0 after:bottom-0 after:border-b after:border-black/25 after:content-['']">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-4 text-left"
      >
        <h3 className="font-display min-w-0 flex-1 text-lg leading-[1.6] tracking-[-0.02em] text-balance text-black min-[810px]:text-2xl">
          {q}
        </h3>
        <span className="relative h-9 w-9 shrink-0">
          <motion.svg
            viewBox="0 0 256 256"
            className="absolute top-[7px] left-[7px] h-[22px] w-[22px] fill-[#ff3700]"
            initial={false}
            animate={{ rotate: open ? 45 : 0, opacity: open ? 1 : 0.75 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-hidden
          >
            <path d={PLUS} />
          </motion.svg>
        </span>
      </button>

      {open ? (
        <motion.p
          className="font-display mt-5 text-base leading-[1.7] text-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {a}
        </motion.p>
      ) : (
        // The live site keeps a collapsed 1px answer box under each question.
        <span aria-hidden className="block h-px" />
      )}
    </div>
  );
}

/**
 * "Your Questions, Answered", measured off the live site.
 *
 *            card       list     gap   card pad  question
 *   phone    stacked    full     80    24        18px
 *   810+     2 : 3      2 : 3    48    24        24px  (photo above text)
 *   1440+    2 : 3      2 : 3    80    40        24px
 *
 * The frosted card sits top-aligned beside the questions and tilts to -2deg
 * once when it first scrolls into view. It sends any other question to
 * WhatsApp: the green icon, a line of copy, a black pill and the email. Card and list share the row 2:3 by
 * content width (the card's padding is added on top), as live.
 */
export default function Faq() {
  return (
    <section
      id="faq"
      className="relative flex flex-col items-center px-6 min-[810px]:px-12 min-[1440px]:px-[120px]"
    >
      <div className="flex w-full max-w-[1440px] flex-col items-center gap-6 py-10 min-[810px]:gap-10 min-[810px]:py-14 min-[1440px]:gap-[60px] min-[1440px]:pt-[120px] min-[1440px]:pb-[71px]">
        <div className="flex w-full flex-col items-center gap-2.5">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 className="font-display w-full text-center text-[28px] leading-[1.4] tracking-[-0.04em] min-[810px]:text-[48px]">
            {faq.heading}
          </h2>
        </div>

        <div className="flex w-full flex-col items-start gap-20 min-[810px]:flex-row min-[810px]:gap-12 min-[1440px]:gap-20">
          {/* Card */}
          <motion.div
            className="flex w-full flex-col justify-center gap-20 overflow-hidden rounded-2xl bg-white/50 p-6 shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)] min-[810px]:box-content min-[810px]:w-auto min-[810px]:flex-[2_0_0px] min-[1440px]:p-10"
            initial={{ rotate: 0 }}
            whileInView={{ rotate: -2 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", bounce: 0.3, duration: 1 }}
          >
            <div className="flex items-center justify-center gap-6 min-[810px]:max-[1439px]:flex-col min-[810px]:max-[1439px]:items-start">
              <span
                aria-hidden
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
                  <path d={WHATSAPP_ICON} />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg leading-[1.6] tracking-[-0.02em] text-balance text-black min-[810px]:text-2xl">
                  {faq.asideTitle}
                </h3>
                <p className="font-display mt-1 text-base leading-[1.6] text-balance text-black/50">
                  {faq.asideBody}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-full rounded-[33px] bg-white p-2">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-black py-2.5 pr-2.5 pl-6"
                  style={{ boxShadow: PILL_SHADOW }}
                >
                  <span className="font-display flex-1 text-center text-base leading-[1.7] font-medium whitespace-nowrap text-white">
                    {faq.asideCta}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-12">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                      <path d={WHATSAPP_ICON} />
                    </svg>
                  </span>
                </a>
              </div>
              <p className="font-display text-center text-base leading-[1.7] text-balance text-black/50">
                Or write to us at{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-[#ff2200]">
                  {site.email}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Questions */}
          <div className="flex w-full flex-col min-[810px]:w-auto min-[810px]:flex-[3_0_0px]">
            {faq.items.map((item) => (
              <Item key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
