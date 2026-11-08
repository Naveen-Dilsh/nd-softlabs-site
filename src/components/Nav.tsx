"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site } from "@/lib/content";

/**
 * A floating pill bar centred at the top, after the nav on bihanganimhan.me:
 *
 *   bar       white pill 12px from the top: brand, links, CTA; drops in
 *             from -48px after 1s
 *   links     muted grey; a soft grey pill glides under whichever one the
 *             pointer is on and fades out when it leaves the row
 *   services  hover (or click) opens a card under it: four services with
 *             icon tiles that darken on hover, plus a strip of quick links
 *   phones    links and CTA fold into a menu button; it opens a card under
 *             the bar with every link and the services indented
 */
const expoOut = [0.22, 1, 0.36, 1] as const;
const SHADOW_FLOAT = "0 10px 30px -18px rgba(11,11,18,0.35)";
const SHADOW_LIFT = "0 30px 60px -30px rgba(11,11,18,0.35)";

export default function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, shown: false });
  const bar = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  // Close on route change, Escape, or a click outside the bar.
  useEffect(closeAll, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    const onDown = (e: PointerEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) closeAll();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  // On the home page, glide to the section through Lenis instead of jumping.
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    closeAll();
    if (pathname !== "/" || !href.startsWith("/#") || !lenis) return;
    e.preventDefault();
    const hash = href.slice(1);
    lenis.scrollTo(hash, { offset: -20 });
    history.replaceState(null, "", hash);
  };

  const hoverTo = (el: HTMLElement) =>
    setPill({ x: el.offsetLeft, w: el.offsetWidth, shown: true });

  return (
    <motion.div
      ref={bar}
      className="pointer-events-none fixed inset-x-0 top-3 z-[900] flex justify-center px-4"
      initial={{ opacity: 0, y: -48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease: [0.44, 0, 0.56, 1] }}
    >
      <nav
        aria-label="Main"
        className="pointer-events-auto flex max-w-full items-center gap-2.5 rounded-full bg-white py-[7px] pr-[7px] pl-3.5 sm:gap-4"
        style={{ boxShadow: SHADOW_FLOAT }}
      >
        <Link
          href="/"
          onClick={(e) => go(e, "/#hero")}
          aria-label={`${site.name} home`}
          className="font-display inline-flex items-baseline px-1 text-[20px] leading-none font-medium tracking-[-0.035em] whitespace-nowrap text-black"
        >
          {site.name}
          <span aria-hidden className="ml-[0.07em] inline-block size-[0.2em] shrink-0 rounded-full bg-[var(--accent)]" />
        </Link>

        {/* Desktop links */}
        <ul
          className="font-display relative hidden list-none items-center text-[14.5px] text-black/55 md:flex"
          onMouseLeave={() => setPill((p) => ({ ...p, shown: false }))}
        >
          <motion.li
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-[#f2f2f2]"
            initial={false}
            animate={{ x: pill.x, width: pill.w, opacity: pill.shown ? 1 : 0 }}
            transition={{ duration: 0.3, ease: expoOut }}
          />
          {nav.links.map((l) =>
            l.href ? (
              <li key={l.label} className="relative" onMouseEnter={(e) => hoverTo(e.currentTarget)}>
                <Link
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="relative block rounded-full px-3.5 py-2 transition-colors hover:text-black"
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li
                key={l.label}
                className="relative"
                onMouseEnter={(e) => {
                  hoverTo(e.currentTarget);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  // With a mouse, hover has already opened it; a click there
                  // shouldn't shut it again. Keyboard and touch toggle.
                  onClick={(e) =>
                    setServicesOpen((v) =>
                      e.detail > 0 && matchMedia("(hover: hover)").matches ? true : !v,
                    )
                  }
                  aria-expanded={servicesOpen}
                  aria-controls="nav-services"
                  className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 transition-colors hover:text-black ${
                    servicesOpen ? "text-black" : ""
                  }`}
                >
                  {l.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      id="nav-services"
                      className="absolute top-full left-1/2 w-[min(560px,90vw)] -translate-x-1/2 pt-3"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <ServicesCard onPick={go} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ),
          )}
        </ul>

        {/* Phone menu button: two bars that cross into an X */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative grid size-10 shrink-0 place-items-center rounded-full border border-black/10 bg-white md:hidden"
        >
          <motion.span
            className="absolute h-[1.6px] w-3 rounded-full bg-black"
            initial={false}
            animate={mobileOpen ? { y: 0, rotate: 45 } : { y: -3, rotate: 0 }}
            transition={{ duration: 0.3, ease: expoOut }}
          />
          <motion.span
            className="absolute h-[1.6px] w-3 rounded-full bg-black"
            initial={false}
            animate={mobileOpen ? { y: 0, rotate: -45 } : { y: 3, rotate: 0 }}
            transition={{ duration: 0.3, ease: expoOut }}
          />
        </button>

        <Link
          href={nav.cta.href}
          className="font-display hidden rounded-full bg-black px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-black/80 sm:inline-flex"
        >
          {nav.cta.label}
        </Link>
      </nav>

      {/* Phone menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="font-display pointer-events-auto absolute top-[64px] right-4 left-4 grid max-h-[calc(100dvh-120px)] gap-0.5 overflow-y-auto rounded-[18px] bg-white p-2.5 md:hidden"
            style={{ boxShadow: SHADOW_FLOAT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {nav.links.map((l) =>
              l.href ? (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="rounded-xl px-3.5 py-3 font-medium text-black hover:bg-[#f2f2f2]"
                >
                  {l.label}
                </Link>
              ) : (
                <div key={l.label}>
                  <p className="px-3.5 py-3 font-medium text-black">{l.label}</p>
                  <div className="mb-1 ml-3.5 grid border-l border-black/10 pl-2">
                    {nav.services.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={(e) => go(e, s.href)}
                        className="rounded-lg px-3 py-2 text-[14.5px] text-black/55 hover:bg-[#f2f2f2] hover:text-black"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ),
            )}
            <div className="mt-1 flex flex-wrap gap-1 border-t border-black/10 pt-2">
              {nav.extras.map((x) => (
                <Link
                  key={x.label}
                  href={x.href}
                  onClick={(e) => go(e, x.href)}
                  className="rounded-full px-3.5 py-2 text-[14px] text-black/55 hover:bg-[#f2f2f2] hover:text-black"
                >
                  {x.label}
                </Link>
              ))}
            </div>
            <Link
              href={nav.cta.href}
              onClick={closeAll}
              className="mt-2 rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white"
            >
              {nav.cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ServicesCard({
  onPick,
}: {
  onPick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div
      className="font-display grid gap-3 rounded-[28px] bg-white p-3 text-black"
      style={{ boxShadow: `${SHADOW_LIFT}, 0 0 0 1px rgba(0,0,0,0.06)` }}
    >
      <ul className="grid gap-1 sm:grid-cols-2">
        {nav.services.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              onClick={(e) => onPick(e, s.href)}
              className="group flex items-start gap-3 rounded-[18px] p-3 transition-colors hover:bg-[#f2f2f2]"
            >
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-black/10 bg-[#f5f5f5] transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </span>
              <span className="grid gap-0.5">
                <span className="text-[14.5px] font-medium">{s.label}</span>
                <span className="text-[12.5px] leading-snug text-black/55">{s.blurb}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-1 rounded-[18px] bg-[#f2f2f2] p-1.5">
        {nav.extras.map((x) => (
          <Link
            key={x.label}
            href={x.href}
            onClick={(e) => onPick(e, x.href)}
            className="inline-flex items-center rounded-full px-3 py-2 text-[13.5px] text-black/55 transition-colors hover:bg-white hover:text-black"
          >
            {x.label}
          </Link>
        ))}
        <Link
          href={nav.cta.href}
          onClick={(e) => onPick(e, nav.cta.href)}
          className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-medium hover:text-black/60"
        >
          {nav.cta.label} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
