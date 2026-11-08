"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * The hero call-to-action. Layout is the template's: a 40x34 circular arrow
 * badge butted directly against a black text pill, inside a transparent
 * rounded wrapper.
 *
 * Motion is our own (the template only swapped the arrow from left to right):
 *   - magnetic: with a mouse, the button leans up to 8px toward the cursor
 *     and springs back on leave
 *   - letter roll: each letter rises out of view and its copy (a text-shadow
 *     one line below) rolls in, 18ms after the letter before it
 *   - arrow fly-through: the arrow leaves top-right while a second one
 *     arrives from bottom-left
 *   - light sweep: a soft white band crosses the pill
 *   - press: squeezes to 96%
 * Everything except the press is skipped for reduced motion.
 * `light` swaps black for white, for dark panels.
 */
export default function ArrowPill({
  href,
  children,
  className = "",
  light = false,
}: {
  href: string;
  children: string;
  className?: string;
  light?: boolean;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-8, Math.min(8, v));
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.15));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.3));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const roll = reduce ? "" : "group-hover:-translate-y-full";
  const ink = light ? "bg-white text-black" : "bg-black text-white";

  return (
    <motion.span style={{ x, y }} className={`inline-flex shrink-0 ${className}`}>
      <Link
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group inline-flex items-center rounded-[33px] transition-transform duration-200 active:scale-[0.96]"
      >
        {/* Arrow badge */}
        <span className={`relative flex h-[34px] w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ${ink}`}>
          <span
            className={`transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              reduce ? "" : "group-hover:translate-x-[180%] group-hover:-translate-y-[180%]"
            }`}
          >
            <Arrow />
          </span>
          <span
            aria-hidden
            className={`absolute -translate-x-[180%] translate-y-[180%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              reduce ? "hidden" : "group-hover:translate-0"
            }`}
          >
            <Arrow />
          </span>
        </span>

        {/* Label pill */}
        <span className={`font-instrument relative overflow-hidden rounded-full px-3 py-1.5 text-[21px] leading-[25.2px] font-semibold tracking-[-0.03em] ${ink}`}>
          <span className="sr-only">{children}</span>
          <span aria-hidden className="block h-[25.2px] overflow-hidden">
            {[...children].map((ch, i) => (
              <span
                key={i}
                className={`inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${roll}`}
                style={{
                  textShadow: "0 25.2px 0 currentColor",
                  transitionDelay: `${i * 18}ms`,
                }}
              >
                {ch}
              </span>
            ))}
          </span>
          {!reduce && (
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 left-0 w-10 -translate-x-full -skew-x-[20deg] bg-gradient-to-r from-transparent ${light ? "via-black/10" : "via-white/25"} to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[600%]`}
            />
          )}
        </span>
      </Link>
    </motion.span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
