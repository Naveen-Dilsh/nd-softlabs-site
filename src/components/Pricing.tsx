"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pricing, site, type Plan } from "@/lib/content";
import { PILL_SHADOW } from "@/lib/shadows";
import Eyebrow from "./Eyebrow";

/**
 * "Clear prices. No surprises." The layout and motion follow the pricing
 * section on bihanganimhan.me (rebuilt with motion in place of its GSAP +
 * Alpine); the look is this site's own: frosted white/50 panels with the
 * soft 8px ring, white/75 inner cards, black pills with the layered pill
 * shadow, and the showcase's #262626 for the popular plan.
 *
 *   header   eyebrow + h2, each line rising out of a mask
 *   plans    three cards (one column below lg) that rise 40px and fade in,
 *            70ms apart, and lift 6px on hover. The popular one is dark
 *            with a white "Popular" tag and a white CTA
 *   finder   a bar that opens (height + fade) into up to three questions:
 *            type, pages, extras. Each step slides in, its children 60ms
 *            apart. The answer is the lowest plan that covers everything,
 *            or a custom quote for apps, systems, AI and big sites
 *   custom   a closing bar pointing everything else to a quote
 */

const expoOut = [0.16, 1, 0.3, 1] as const;
const power3Out = [0.215, 0.61, 0.355, 1] as const;
const RING = "shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)]";

const { plans, finder } = pricing;

/** Phosphor "check" (bold). */
const CHECK =
  "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z";

function Arrow() {
  return (
    <svg viewBox="0 0 256 256" className="size-4 fill-current" aria-hidden>
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}

/** Label + round arrow badge that turns -45deg on hover. Black, or white. */
function PillCta({
  href,
  children,
  light = false,
  onClick,
}: {
  href?: string;
  children: string;
  light?: boolean;
  onClick?: () => void;
}) {
  const cls = `group font-display inline-flex items-center gap-3 justify-self-start rounded-full py-[7px] pr-[7px] pl-5 text-[15px] font-medium whitespace-nowrap transition-transform active:scale-[0.97] ${
    light ? "bg-white text-black" : "bg-black text-white"
  }`;
  const inner = (
    <>
      {children}
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 ${
          light ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <span className="rotate-45">
          <Arrow />
        </span>
      </span>
    </>
  );
  const style = light ? undefined : { boxShadow: PILL_SHADOW };
  return href ? (
    <Link href={href} className={cls} style={style}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}

function Tick({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full ${
        light ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <svg viewBox="0 0 256 256" className="size-2.5 fill-current">
        <path d={CHECK} />
      </svg>
    </span>
  );
}

/** One heading line rising out of its own mask. */
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

function PlanCard({ plan }: { plan: Plan }) {
  const dark = !!plan.popular;
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.8, ease: power3Out }}
      className="h-full"
    >
      <div
        className={`h-full rounded-3xl p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${RING} ${
          dark ? "bg-[#262626]" : "bg-white/50"
        }`}
      >
        <div
          className={`font-display grid h-full content-start gap-5 rounded-2xl p-6 ${
            dark ? "bg-white/[0.06] text-white" : "bg-white/75 text-black"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl tracking-[-0.02em]">{plan.name}</h3>
            {dark && (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">
                Popular
              </span>
            )}
          </div>
          <div>
            <small className={`block text-[13px] ${dark ? "text-white/50" : "text-black/50"}`}>
              Starting from
            </small>
            <strong className="text-[52px] leading-none font-medium tracking-[-0.06em] tabular-nums">
              {plan.price}
            </strong>
          </div>
          <p className={`text-[14.5px] leading-[1.6] ${dark ? "text-white/60" : "text-black/50"}`}>
            {plan.blurb}
          </p>
          <PillCta href={`${site.booking}?plan=${plan.slug}`} light={dark}>
            {`Choose ${plan.name}`}
          </PillCta>
          <ul
            className={`grid gap-2.5 border-t pt-5 text-[14.5px] ${
              dark ? "border-white/15" : "border-black/10"
            }`}
          >
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Tick light={dark} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

type Result = { plan: Plan | null; reasons: string[] };

/** The lowest plan covering every answer, or a custom quote. */
function recommend(type: string, pages: number, needs: string[]): Result {
  const quote = (why: string): Result => ({ plan: null, reasons: [why] });
  if (finder.customTypes.includes(type))
    return quote("Apps, platforms, AI and business systems are priced on their scope.");
  if (pages > 15) return quote("More than 15 pages is quoted on scope.");

  const order = plans.map((p) => p.slug);
  const reasons: string[] = [];
  let level = 0;
  const lift = (slug: string, why: string) => {
    level = Math.max(level, order.indexOf(slug));
    reasons.push(why);
  };

  if (type === "store") lift(finder.storePlan, "Online stores need the e-commerce tools.");
  const fit = finder.limits.find(([, max]) => pages <= max);
  if (fit) lift(fit[0], `Up to ${fit[1]} pages.`);
  for (const id of needs) {
    const need = finder.needs.find((n) => n.id === id);
    if (need) lift(need.plan, `${need.label}.`);
  }
  return { plan: plans[level], reasons: [...new Set(reasons)] };
}

const stepIn = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: expoOut, staggerChildren: 0.06 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const childIn = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: expoOut } },
};

function PlanFinder() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [pages, setPages] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);

  const isCustom = finder.customTypes.includes(type);
  const steps = isCustom ? 1 : 3;
  const result = step === 4 ? recommend(type, pages, needs) : null;

  const restart = () => {
    setStep(1);
    setType("");
    setPages(0);
    setNeeds([]);
  };
  const choose = (id: string) => {
    setType(id);
    setStep(finder.customTypes.includes(id) ? 4 : 2);
  };
  const toggleNeed = (id: string) =>
    setNeeds((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));

  const legend = "mb-3 font-display text-[22px] leading-[1.3] tracking-[-0.03em] min-[810px]:text-[26px]";

  return (
    <div className={`overflow-hidden rounded-3xl bg-white/50 p-3 ${RING}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="plan-finder"
        className="font-display flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/75 px-6 py-5 text-left"
      >
        <span className="grid gap-1">
          <strong className="text-xl font-medium tracking-[-0.02em]">{finder.title}</strong>
          <span className="text-[14.5px] text-black/50">{finder.body}</span>
        </span>
        <span
          className="inline-flex items-center gap-2.5 rounded-full bg-black py-2 pr-2 pl-4 text-[14.5px] font-medium text-white"
          style={{ boxShadow: PILL_SHADOW }}
        >
          {open ? "Close" : "Find my plan"}
          <span
            aria-hidden
            className={`grid size-7 place-items-center rounded-full bg-white text-lg leading-none text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="plan-finder"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: expoOut }}
          >
            <div className="font-display mt-3 grid gap-6 rounded-2xl bg-white/75 p-6">
              {step < 4 && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[13px] text-black/50">
                    Question <span className="text-black">{Math.min(step, steps)}</span> / {steps}
                  </span>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => (step === 3 ? setStep(2) : restart())}
                      className="text-[14px] text-black/50 hover:text-black"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {step === 1 && (
                  <motion.fieldset key="type" variants={stepIn} initial="hidden" animate="shown" exit="exit" className="grid gap-3">
                    <motion.legend variants={childIn} className={legend}>
                      What are you building?
                    </motion.legend>
                    <motion.div variants={childIn} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {finder.types.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => choose(t.id)}
                          className="group flex items-center gap-3.5 rounded-2xl bg-white p-3 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] min-[810px]:p-4"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-black/5 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-[8deg] group-hover:scale-[1.06] group-hover:bg-black group-hover:text-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d={t.icon} />
                            </svg>
                          </span>
                          <span className="text-[14.5px] leading-snug font-medium">{t.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </motion.fieldset>
                )}

                {step === 2 && (
                  <motion.fieldset key="pages" variants={stepIn} initial="hidden" animate="shown" exit="exit" className="grid gap-3">
                    <motion.legend variants={childIn} className={legend}>
                      Roughly how many pages?
                    </motion.legend>
                    <motion.p variants={childIn} className="-mt-2 text-[14.5px] text-black/50">
                      For example: Home, About, Services, Contact = 4 pages.
                    </motion.p>
                    <motion.div variants={childIn} className="flex flex-wrap gap-2">
                      {finder.pages.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => {
                            setPages(p.value);
                            setStep(3);
                          }}
                          className="rounded-full bg-white px-5 py-3 text-[15px] transition-colors hover:bg-black hover:text-white"
                        >
                          {p.label}
                        </button>
                      ))}
                    </motion.div>
                  </motion.fieldset>
                )}

                {step === 3 && (
                  <motion.fieldset key="needs" variants={stepIn} initial="hidden" animate="shown" exit="exit" className="grid gap-3">
                    <motion.legend variants={childIn} className={legend}>
                      Anything you&apos;d like? <span className="text-black/50">Pick any, or none.</span>
                    </motion.legend>
                    <motion.div variants={childIn} className="flex flex-wrap gap-2">
                      {finder.needs.map((n) => {
                        const on = needs.includes(n.id);
                        return (
                          <button
                            key={n.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleNeed(n.id)}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14.5px] transition-colors ${
                              on ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
                            }`}
                          >
                            {on && (
                              <svg viewBox="0 0 256 256" className="size-3 fill-current" aria-hidden>
                                <path d={CHECK} />
                              </svg>
                            )}
                            {n.label}
                          </button>
                        );
                      })}
                    </motion.div>
                    <motion.div variants={childIn} className="pt-2">
                      <PillCta onClick={() => setStep(4)}>See my plan</PillCta>
                    </motion.div>
                  </motion.fieldset>
                )}

                {step === 4 && result && (
                  <motion.div
                    key="result"
                    variants={stepIn}
                    initial="hidden"
                    animate="shown"
                    exit="exit"
                    className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-center"
                  >
                    <motion.div variants={childIn} className="grid gap-3">
                      <span className="font-serif text-xl text-black/50 italic">Your best fit</span>
                      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <strong className="text-[clamp(2rem,4vw,3rem)] leading-none font-medium tracking-[-0.05em]">
                          {result.plan?.name ?? "Custom quote"}
                        </strong>
                        {result.plan && (
                          <span className="text-[18px] text-black/50">
                            from <span className="font-medium text-black">{result.plan.price}</span>
                          </span>
                        )}
                      </p>
                      <ul className="grid gap-1.5 text-[15px] text-black/60">
                        {result.reasons.map((r) => (
                          <li key={r} className="flex gap-2">
                            <Tick />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-2.5 pt-2">
                        <PillCta href={`${site.booking}?plan=${result.plan?.slug ?? "custom"}`}>
                          {result.plan ? `Start with ${result.plan.name}` : "Get a custom quote"}
                        </PillCta>
                        <button
                          type="button"
                          onClick={restart}
                          className="rounded-full px-4 py-2.5 text-[15px] text-black/50 hover:text-black"
                        >
                          Start over
                        </button>
                      </div>
                    </motion.div>
                    {result.plan && (
                      <motion.div variants={childIn} className="rounded-2xl bg-white p-5">
                        <span className="mb-3 block text-[13px] text-black/50">
                          Included in {result.plan.name}
                        </span>
                        <ul className="grid gap-2 text-[14.5px]">
                          {result.plan.features.map((f) => (
                            <li key={f} className="flex gap-2.5">
                              <Tick />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  const reduce = useReducedMotion();
  const rise = {
    initial: reduce ? false : ("hidden" as const),
    whileInView: "shown",
    viewport: { once: true, amount: 0.2 },
    variants: { hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } },
    transition: { duration: 0.8, ease: power3Out },
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative px-6 min-[810px]:px-12 min-[1440px]:px-[120px]"
    >
      <div className="mx-auto max-w-[1200px] py-10 min-[810px]:py-14 min-[1440px]:py-[120px]">
        <div className="mb-8 flex flex-col items-center gap-2.5 min-[810px]:mb-12">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2
            id="pricing-title"
            className="font-display text-center text-[28px] leading-[1.4] tracking-[-0.04em] min-[810px]:text-[48px]"
          >
            <MaskLine>{pricing.heading[0]}</MaskLine>
            <MaskLine delay={0.08} muted>
              {pricing.heading[1]}
            </MaskLine>
          </h2>
        </div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3 min-[1440px]:gap-8"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.07 }}
        >
          {plans.map((p) => (
            <PlanCard key={p.slug} plan={p} />
          ))}
        </motion.div>

        <motion.div className="mt-6 min-[1440px]:mt-8" {...rise}>
          <PlanFinder />
        </motion.div>

        <motion.div className={`mt-6 rounded-3xl bg-white/50 p-3 min-[1440px]:mt-8 ${RING}`} {...rise}>
          <div className="font-display flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/75 px-6 py-5">
            <div className="grid gap-1">
              <strong className="text-xl font-medium tracking-[-0.02em]">{pricing.custom.title}</strong>
              <p className="text-[14.5px] text-black/50">{pricing.custom.body}</p>
            </div>
            <PillCta href={`${site.booking}?plan=custom`}>{pricing.custom.cta}</PillCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
