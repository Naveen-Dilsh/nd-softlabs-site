"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { showcase } from "@/lib/content";

/**
 * One endlessly rising column of work. Framer's ticker moves at a fixed speed
 * in px/s, so the loop duration is derived from the measured height of one
 * copy rather than hard-coded — otherwise it would speed up as cards grow.
 *
 * Each copy carries its gap as bottom padding, so translating by exactly -50%
 * lands on an identical frame and the seam never jumps.
 */
function Column({ images, speed }: { images: string[]; speed: number }) {
  const copy = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = copy.current;
    if (!el) return;
    // Measure once up front: ResizeObserver only reports on a rendered frame,
    // which a backgrounded tab may never produce.
    const measure = () => setDuration(el.offsetHeight / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  const list = (ref?: React.Ref<HTMLUListElement>) => (
    <ul
      ref={ref}
      aria-hidden={!ref}
      className="flex flex-col gap-4 pb-4 min-[810px]:gap-6 min-[810px]:pb-6 min-[1440px]:gap-12 min-[1440px]:pb-12"
    >
      {images.map((src) => (
        <li key={src}>
          <img
            src={src}
            alt=""
            className="block aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className="will-change-transform"
        style={{
          animation: duration ? `marquee-y ${duration}s linear infinite` : undefined,
        }}
      >
        {list(copy)}
        {list()}
      </div>
    </div>
  );
}

/**
 * "See Recent Work": a dark rounded panel with two columns of work rising
 * behind a frosted circular link. Measured off the live site:
 *
 *   panel     #262626, 24px radius, 8px white/25 ring, contents clipped
 *   height    fixed 844px on phones, 1080px from 810px up (not vh)
 *   gutters   24 / 48 / 120px (same steps as the nav)
 *   columns   one on phones; two from 810px, 24px apart (48px from 1440px)
 *   cards     16 / 24 / 48px apart down each column
 *   tickers   start 400px above the panel, so cards are already mid-flight
 *   fade      #262626 -> transparent over the top 75%, ABOVE the cards —
 *             this is what makes the upper work look dimmed
 *   button    128px circle, white/75 + 2px blur, 1px white inner border;
 *             solid white on hover. The bold label swings from -18deg to
 *             19deg on hover. The template only fades it in on hover; here it
 *             always shows, so phones (no hover) see it too.
 *   link      the project section on the home page (#work), as on the template
 */
export default function Showcase() {
  const lenis = useLenis();

  // Already on the home page: glide down through Lenis rather than jump.
  const toWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!lenis || window.location.pathname !== "/") return;
    e.preventDefault();
    lenis.scrollTo("#work");
    history.replaceState(null, "", "#work");
  };

  return (
    <section className="relative px-6 min-[810px]:px-12 min-[1440px]:px-[120px]">
      <div className="relative isolate mx-auto h-[844px] max-w-[1440px] rounded-3xl bg-[#262626] shadow-[0_0_0_8px_rgba(255,255,255,0.25)] min-[810px]:h-[1080px]">
        {/* The rounded clip lives on this inner layer as a clip-path rather
            than overflow-hidden + border-radius on the panel: the tickers are
            GPU layers, and browsers intermittently drop a radius clip over
            those, flashing square corners. The ring stays on the panel. */}
        <div className="absolute inset-0 [clip-path:inset(0_round_1.5rem)]">
          {/* Tickers */}
          <div className="absolute inset-x-0 top-[-400px] bottom-0 flex items-start gap-6 px-6 min-[810px]:px-12 min-[1440px]:gap-12">
            <Column images={showcase.columnA} speed={73} />
            <div className="hidden min-w-0 flex-1 min-[810px]:flex">
              <Column images={showcase.columnB} speed={55} />
            </div>
          </div>

          {/* Top fade, painted over the cards */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 bottom-[25%] z-[1]"
            style={{ background: "linear-gradient(#262626 0%, rgba(43,43,43,0) 100%)" }}
          />
        </div>

        {/* Frosted link with a tilted label that swings over on hover */}
        <Link
          href="/#work"
          onClick={toWork}
          aria-label={showcase.cta}
          className="group absolute top-1/2 left-1/2 z-[2] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75 backdrop-blur-[2px] max-[809px]:bg-white/85 max-[809px]:backdrop-blur-none transition-colors duration-[400ms] hover:bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white after:content-['']"
        >
          <svg
            viewBox="0 0 256 256"
            className="absolute top-[46px] left-[46px] h-9 w-9 fill-black"
            aria-hidden
          >
            <path d="M216,72H131.31L104,44.69A15.88,15.88,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.41,15.41,0,0,0,39.39,216h177.5A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40Z" />
          </svg>
          <span className="font-display pointer-events-none absolute top-[-65px] left-[-42px] flex -rotate-[18deg] items-center rounded-full bg-black px-6 py-3 text-base leading-[1.7] font-bold whitespace-nowrap text-white transition-[rotate,top,left] duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:top-[-70px] group-hover:left-[6px] group-hover:rotate-[19deg]">
            {showcase.cta}
            <span className="absolute top-[42px] left-[87px] -z-10 h-4 w-4 -translate-x-2 rotate-45 bg-black" />
          </span>
        </Link>
      </div>
    </section>
  );
}
