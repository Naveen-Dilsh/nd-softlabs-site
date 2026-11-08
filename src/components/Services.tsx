"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { services, site } from "@/lib/content";
import Eyebrow from "./Eyebrow";
import ArrowPill from "./ArrowPill";

/**
 * "What We Build": the services list. The layout and motion follow the
 * services section on bihanganimhan.me (rebuilt with motion in place of its
 * GSAP). It sits on a rounded black panel inset from the page edges, to
 * break up the run of light sections, wearing the footer's background (the
 * dark radial glow with the page's five light rays at 5%, and a 10% grain):
 * white type, hairline rows, a serif eyebrow and white pills.
 *
 *   header   eyebrow + h2, rising out of a mask
 *   rows     number, title, blurb, arrow; they rise 40px and fade in, 70ms
 *            apart. On hover a faint white wash fades in under the row, the
 *            title slides 14px right and the arrow turns white and -45deg
 *   preview  with a mouse, a card trails 40px right of the pointer: it pops
 *            from 0.6 to full size, leans up to 10deg with the pointer's
 *            speed and crossfades to the hovered row's example. While it is
 *            open, scrolling re-checks which row is under the pointer
 *   cta      the hero's arrow pill in white, centred under the list
 */

const expoOut = [0.16, 1, 0.3, 1] as const;
const power3Out = [0.215, 0.61, 0.355, 1] as const;
/** The footer's glow fade: strongest top-left, gone by the far corner. */
const FADE =
  "radial-gradient(125% 100% at 0% 0%, #000 0%, rgba(0,0,0,0.224) 88.29%, rgba(0,0,0,0) 100%)";
const SPRING = { stiffness: 170, damping: 24, mass: 0.6 };

/** Phosphor "arrow-up-right" (regular). */
const ARROW =
  "M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z";

export default function Services() {
  const reduce = useReducedMotion();
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const last = useRef({ x: -1, y: -1 });

  const px = useMotionValue(-400);
  const py = useMotionValue(-400);
  const tilt = useMotionValue(0);
  const x = useSpring(px, SPRING);
  const y = useSpring(py, SPRING);
  const rotate = useSpring(tilt, { stiffness: 120, damping: 20 });

  const rowAt = (cx: number, cy: number) => {
    const el = document.elementFromPoint(cx, cy)?.closest<HTMLElement>("[data-service]");
    return el && list.current?.contains(el) ? Number(el.dataset.service) : -1;
  };

  const show = (i: number) => {
    if (i < 0) return setShown(false);
    setActive(i);
    setShown(true);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    px.set(e.clientX + 40);
    py.set(e.clientY);
    tilt.set(Math.max(-10, Math.min(10, (e.clientX - last.current.x) * 0.6)));
    last.current = { x: e.clientX, y: e.clientY };
    const row = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
    show(row ? Number(row.dataset.service) : -1);
  };

  // Settle the lean once the pointer stops.
  useEffect(() => {
    const id = setInterval(() => tilt.set(tilt.get() * 0.5), 120);
    return () => clearInterval(id);
  }, [tilt]);

  // The list scrolls under a still pointer: follow whichever row is now there.
  useEffect(() => {
    if (!shown) return;
    const onScroll = () => show(rowAt(last.current.x, last.current.y));
    const hide = () => setShown(false);
    const onVis = () => document.hidden && hide();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [shown]);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative mx-4 overflow-hidden rounded-[32px] bg-black px-4 md:mx-6 min-[810px]:px-12 min-[1440px]:px-[120px]"
    >
      {/* Background, as on the footer: glow + rays, then grain */}
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

      <div className="relative mx-auto max-w-[1200px] py-16 min-[810px]:py-[110px]">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-2.5 min-[810px]:mb-12">
          <Eyebrow light>{services.eyebrow}</Eyebrow>
          <h2
            id="services-title"
            className="font-display text-center text-[28px] leading-[1.4] tracking-[-0.04em] text-white min-[810px]:text-[48px]"
          >
            {/* The mask watches the viewport, not the line: the line starts
                fully clipped, so it would never count as visible itself. */}
            <motion.span
              className="block overflow-hidden"
              initial={reduce ? false : "hidden"}
              whileInView="shown"
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            >
              <motion.span
                className="block"
                variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
                transition={{ duration: 1, ease: expoOut }}
              >
                {services.heading[0]}
              </motion.span>
            </motion.span>
          </h2>
        </div>

        {/* Rows */}
        <div className="rounded-3xl bg-white/[0.03] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] min-[810px]:p-3">
          <motion.ul
            ref={list}
            className="divide-y divide-white/10"
            onPointerMove={onMove}
            onPointerLeave={() => setShown(false)}
            initial={reduce ? false : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.07 }}
          >
            {services.items.map((s, i) => (
              <motion.li
                key={s.title}
                variants={{ hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: power3Out }}
              >
                <Link
                  href={s.href}
                  data-service={i}
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-1.5 rounded-2xl px-4 py-6 min-[810px]:grid-cols-[3rem_1.1fr_1fr_auto] min-[810px]:gap-x-8 min-[810px]:px-6 min-[810px]:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative hidden font-serif text-xl text-white/40 italic min-[810px]:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display relative text-[24px] leading-[1.2] tracking-[-0.045em] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3.5 min-[810px]:text-[32px] min-[1440px]:text-[38px]">
                    {s.title}
                  </h3>
                  <p className="relative col-start-1 text-[15px] leading-[1.6] text-white/50 transition-colors duration-500 group-hover:text-white/75 min-[810px]:col-start-auto">
                    {s.blurb}
                  </p>
                  <span
                    aria-hidden
                    className="relative row-span-2 grid size-12 place-items-center rounded-full bg-white/10 text-white transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:text-black min-[810px]:row-span-1"
                  >
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <svg viewBox="0 0 256 256" className="relative size-5 rotate-45 fill-current">
                      <path d={ARROW} />
                    </svg>
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-10 flex justify-center min-[810px]:mt-12">
          <ArrowPill href={site.booking} light>
            {services.cta}
          </ArrowPill>
        </div>
      </div>

      {/* Floating preview */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden w-[340px] min-[1024px]:block min-[1440px]:w-[380px]"
        style={{ x, y, rotate, translateY: "-50%" }}
        initial={false}
        animate={
          shown
            ? { opacity: 1, scale: 1, transition: { duration: 0.45, ease: expoOut } }
            : { opacity: 0, scale: 0.6, transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] } }
        }
      >
        <div className="rounded-[22px] bg-white/50 p-3 shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_32px_0_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="overflow-hidden rounded-2xl bg-white/75">
            <div className="flex items-center gap-3 border-b border-black/5 px-3 py-2">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-black/15" />
                <span className="size-2 rounded-full bg-black/15" />
                <span className="size-2 rounded-full bg-black/15" />
              </span>
              <span className="mx-auto truncate rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] text-black/50">
                {services.items[active]?.host || site.name}
              </span>
              <span className="w-[34px]" />
            </div>
            <div className="relative aspect-[16/10] bg-[#ececec]">
              {services.items.map((s, i) => (
                <div
                  key={s.title}
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  {s.image ? (
                    <img src={s.image} alt="" className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="font-display grid h-full place-items-center bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.95),transparent_60%),linear-gradient(135deg,#e6e6e6,#cfcfcf)] p-6 text-center text-2xl font-medium tracking-[-0.03em] text-black">
                      {s.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
