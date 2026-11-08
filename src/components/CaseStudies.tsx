"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useLenis } from "lenis/react";
import { caseStudies, type Project } from "@/lib/content";
import { PILL_SHADOW } from "@/lib/shadows";
import Eyebrow from "./Eyebrow";

/** Phosphor "arrow-right" (regular), as on the site's pill buttons. */
const ARROW =
  "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z";

/**
 * "All projects": a filterable bento grid. The layout and motion follow the
 * projects section on bihanganimhan.me (rebuilt with motion in place of its
 * GSAP + Alpine); the look is this site's own: frosted white/50 panels with
 * the soft 8px ring, white/75 inner cards, black pills with the layered pill
 * shadow, serif eyebrow and a centred heading.
 *
 *   header    eyebrow + h2 ("Every" black, "Project" 50%) rising out of a
 *             mask; filter pills below with a black indicator that slides to
 *             the active one, and a live "Showing x of y"
 *   grid      1 col, 2 from md, 12 from lg; rows repeat 7+5, 4+4+4, 5+7
 *   collapse  two rows show at first; "Show all n projects" expands
 *   filter    leaving cards shrink to 0.92 and fade, the rest glide to their
 *             new spots (0.8s expo in-out), arrivals rise 40px
 *   card      tilts up to 6deg toward the pointer with a soft spotlight;
 *             the screenshot zooms to 1.05, the info card lifts 4px, the
 *             arrow turns -45deg and the stack chips open underneath
 *   cursor    with a mouse, a "View project" pill trails the pointer
 */

const expoOut = [0.16, 1, 0.3, 1] as const;
const expoInOut = [0.87, 0, 0.13, 1] as const;
const power3Out = [0.215, 0.61, 0.355, 1] as const;
const TILT = 6;

/** Row patterns, cycled. A short last row falls back to 7+5, or one full. */
const ROWS = [[7, 5], [4, 4, 4], [5, 7]];
const COLLAPSED_ROWS = 2;

function spans(n: number) {
  const out: number[] = [];
  for (let r = 0; n > 0; r++) {
    let row = ROWS[r % ROWS.length];
    if (n < row.length) row = n === 1 ? [12] : [7, 5];
    out.push(...row);
    n -= row.length;
  }
  return out;
}

/** How many cards fill the first `rows` full rows. */
function collapsedLimit(n: number, rows = COLLAPSED_ROWS) {
  let filled = 0;
  let width = 0;
  const s = spans(n);
  for (let i = 0; i < s.length; i++) {
    width += s[i];
    if (width === 12) {
      width = 0;
      if (++filled === rows) return i + 1;
    }
  }
  return n;
}

const COL: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  12: "lg:col-span-12",
};

const stackChips = (stack: string) =>
  stack
    .split(/\s*[·,]\s*/)
    .filter(Boolean)
    .slice(0, 3);

export default function CaseStudies() {
  const items = caseStudies.items;
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const root = useRef<HTMLElement>(null);

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of items) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [{ id: "all", label: "All", count: items.length }].concat(
      [...counts].map(([label, count]) => ({ id: label, label, count })),
    );
  }, [items]);

  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const matching = items.filter((p) => active === "all" || p.category === active);
  const limit = collapsedLimit(matching.length);
  const visible = expanded ? matching : matching.slice(0, limit);
  const layout = spans(matching.length);

  const pick = (id: string) => {
    if (id === active) return;
    setActive(id);
    setExpanded(false);
  };

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    // Collapsing from far down the list: bring the section's top back.
    if (!next && root.current && root.current.getBoundingClientRect().top < 0) {
      if (lenis) lenis.scrollTo(root.current, { offset: -90 });
      else root.current.scrollIntoView();
    }
  };

  // "View project" pill that trails the mouse over a card.
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40, mass: 0.5 });
  const [cursorOn, setCursorOn] = useState(false);
  const trackCursor = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cx.set(e.clientX);
    cy.set(e.clientY);
  };

  return (
    <section
      ref={root}
      id="work"
      aria-labelledby="projects-title"
      className="relative px-6 min-[810px]:px-12 min-[1440px]:px-[120px]"
    >
      <div className="mx-auto max-w-[1200px] py-10 min-[810px]:py-14 min-[1440px]:py-[120px]">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-6 min-[810px]:mb-10">
          <div className="flex flex-col items-center gap-2.5">
            <Eyebrow>{caseStudies.eyebrow}</Eyebrow>
            {/* The eyebrow is the only visible title; this names the section
                for screen readers. */}
            <h2 id="projects-title" className="sr-only">
              {caseStudies.eyebrow}
            </h2>
          </div>

          <div className="flex max-w-full flex-col items-center gap-2.5">
            <div
              role="group"
              aria-label="Filter projects"
              className="relative inline-flex max-w-full flex-wrap justify-center rounded-[24px] bg-white/50 p-1.5 min-[810px]:flex-nowrap min-[810px]:rounded-full shadow-[0_0_0_6px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.08)]"
            >
              {filters.map((f) => {
                const on = f.id === active;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(f.id)}
                    className={`font-display relative rounded-full px-3.5 py-1.5 text-sm leading-[1.6] whitespace-nowrap min-[810px]:px-5 min-[810px]:py-2 min-[810px]:text-base transition-colors duration-300 ${
                      on ? "text-white" : "text-black/50 hover:text-black"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="project-filter"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-black"
                        style={{ boxShadow: PILL_SHADOW }}
                        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: expoOut }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <sup className="font-mono text-[10px] opacity-60">{f.count}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="font-display text-xs leading-[18px] text-black/50" aria-live="polite">
              Showing {visible.length} of {matching.length} projects
            </p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout={!reduce}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 min-[1440px]:gap-10"
          onPointerMove={trackCursor}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                className={COL[layout[i]]}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.92, transition: { duration: 0.35 } }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{
                  duration: 0.8,
                  ease: power3Out,
                  delay: (i % 3) * 0.07,
                  layout: { duration: 0.8, ease: expoInOut },
                }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setCursorOn(true)}
                onPointerLeave={() => setCursorOn(false)}
              >
                <Card project={p} index={items.indexOf(p)} reduce={!!reduce} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {matching.length > limit && (
          <div className="mt-10 flex justify-center">
            <MagneticButton onClick={toggle} expanded={expanded}>
              {expanded ? "Show fewer projects" : `Show all ${matching.length} projects`}
            </MagneticButton>
          </div>
        )}
      </div>

      {/* Trailing cursor label */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="font-display pointer-events-none fixed top-0 left-0 z-[900] rounded-full bg-black px-4 py-2 text-sm whitespace-nowrap text-white"
          style={{ x: sx, y: sy, translateX: 16, translateY: 16, boxShadow: PILL_SHADOW }}
          initial={false}
          animate={{ opacity: cursorOn ? 1 : 0, scale: cursorOn ? 1 : 0.6 }}
          transition={{ duration: 0.25, ease: power3Out }}
        >
          View project
        </motion.div>
      )}
    </section>
  );
}

function Card({ project, index, reduce }: { project: Project; index: number; reduce: boolean }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 170, damping: 26 });
  const rotateY = useSpring(ry, { stiffness: 170, damping: 26 });
  const stage = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent) => {
    const el = stage.current;
    if (!el || reduce || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * TILT * 2);
    rx.set((0.5 - py) * TILT * 2);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group block [perspective:1200px]"
    >
      {/* The site's frosted panel: white/50, 24px corners, a soft 8px white
          ring and a long drop shadow (as on Pricing and Process). */}
      <motion.div
        ref={stage}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative flex h-[400px] flex-col gap-3 rounded-3xl bg-white/50 p-3 shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)] will-change-transform lg:h-[480px]"
      >
        {/* Screenshot */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-white/60">
          <img
            src={project.image}
            alt={`${project.title} cover`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[900ms] ${ease} group-hover:scale-[1.05]`}
          />

          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3">
            <span className="font-display rounded-full bg-white/75 px-3 py-1 text-xs leading-[18px] text-black backdrop-blur-md max-[809px]:bg-white/90 max-[809px]:backdrop-blur-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display rounded-full bg-white/75 px-3 py-1 text-xs leading-[18px] text-black backdrop-blur-md max-[809px]:bg-white/90 max-[809px]:backdrop-blur-none">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className={`flex flex-col gap-2.5 rounded-2xl bg-white/75 p-4 transition-transform duration-500 ${ease} group-hover:-translate-y-1 min-[810px]:p-5`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display truncate text-lg leading-[1.5] tracking-[-0.02em] text-black min-[810px]:text-xl">
                {project.title}
              </h3>
              <p className="font-display truncate text-sm leading-[1.6] text-black/50">
                {project.tags[0]} · {project.year}
              </p>
            </div>
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-black text-white"
              style={{ boxShadow: PILL_SHADOW }}
            >
              <svg viewBox="0 0 256 256" className={`h-5 w-5 fill-white opacity-60 transition duration-500 ${ease} group-hover:-rotate-45 group-hover:opacity-100`}>
                <path d={ARROW} />
              </svg>
            </span>
          </div>
          <ul
            aria-label="Built with"
            className="hidden max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100 lg:flex"
          >
            {stackChips(project.stack).map((s) => (
              <li
                key={s}
                className="font-display rounded-full bg-black/5 px-2.5 py-1 text-xs leading-[18px] whitespace-nowrap text-black/60"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Spotlight under the pointer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,40%),rgb(255_255_255/0.28),transparent_62%)]"
        />
      </motion.div>
    </Link>
  );
}

/** The expand/collapse pill; it leans toward the pointer and springs back. */
function MagneticButton({
  children,
  onClick,
  expanded,
}: {
  children: string;
  onClick: () => void;
  expanded: boolean;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 9, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 9, mass: 0.6 });

  return (
    <motion.button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      style={{ x, y, boxShadow: PILL_SHADOW }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.3);
        my.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="font-display inline-flex items-center gap-3 rounded-full bg-black py-2 pr-2 pl-6 text-base leading-[1.7] text-white"
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={`grid size-9 place-items-center rounded-full bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "rotate-180" : ""
        }`}
      >
        ↓
      </span>
    </motion.button>
  );
}
