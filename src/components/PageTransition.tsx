"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useLenis } from "lenis/react";
import { caseStudies, site } from "@/lib/content";

// The template swaps pages with no transition, so this one is our own: a
// light panel in the page's own grey (a soft white glow from the top-left,
// plus the grain) rises over the page. Its leading edge is a curve that
// flattens as it lands; the name of the page you're heading to rises in
// letter by letter under a small logo pill. The route changes underneath,
// then the panel carries on up and off the screen, its trailing edge curving
// away behind it.
const ease = [0.76, 0, 0.24, 1] as const;
const expoOut = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.75;
/** How long the covered screen holds, so the page name can be read. */
const HOLD = 0.35;
const BG = "#d9d9d9";

/** The heading shown on the panel for a destination path. */
function labelFor(path: string) {
  if (path === "/") return "Home";
  if (path === "/work") return "Projects";
  if (path === "/contact") return "Contact";
  const slug = path.match(/^\/work\/([^/]+)/)?.[1];
  const project = slug && caseStudies.items.find((p) => p.slug === slug);
  if (project) return project.title;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Catches clicks on internal links anywhere in the page, so no Link needs to
 * know about it. It listens in the capture phase, ahead of next/link: calling
 * preventDefault there stops Link's own navigation while Link still runs its
 * onClick (so the menu still closes). New-tab clicks, external links and
 * same-page hash links are left alone. Browser back/forward is not animated.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const y = useMotionValue("100%");
  /** Height of the curved bulge on the leading (top) and trailing (bottom) edges. */
  const top = useMotionValue(0);
  const bottom = useMotionValue(0);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  /** Bumped per transition so the letters replay even for the same label. */
  const [run, setRun] = useState(0);
  const pending = useRef<{ from: string; hash: string } | null>(null);

  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;

      e.preventDefault();
      if (pending.current) return;
      pending.current = { from: location.pathname, hash: url.hash };
      setLabel(labelFor(url.pathname));
      setRun((r) => r + 1);
      setActive(true);
      lenis?.stop();
      y.set("100%");
      top.set(1);
      bottom.set(0);
      animate(top, 0, { duration: DURATION, ease });
      animate(y, "0%", { duration: DURATION, ease }).then(() =>
        router.push(url.pathname + url.search + url.hash, { scroll: false }),
      );
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [reduce, router, lenis, y, top, bottom]);

  // New page is in: jump to its top (or its #section) while covered, then
  // lift the panel away.
  useEffect(() => {
    const p = pending.current;
    if (!p || p.from === pathname) return;
    pending.current = null;
    requestAnimationFrame(() => {
      const target = p.hash && document.querySelector(p.hash) ? p.hash : 0;
      if (lenis) {
        lenis.start();
        // Lenis still holds the old page's height as its scroll limit, which
        // would clamp a jump to a section further down the new page.
        lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true });
      } else if (target === 0) window.scrollTo(0, 0);
      else document.querySelector(p.hash)?.scrollIntoView();
      animate(bottom, [0, 1, 0], {
        duration: DURATION,
        ease: "easeInOut",
        times: [0, 0.45, 1],
        delay: HOLD,
      });
      animate(y, "-100%", { duration: DURATION, ease, delay: HOLD }).then(
        () => setActive(false),
      );
    });
  }, [pathname, lenis, y, bottom]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1000]"
      style={{ y, visibility: active ? "visible" : "hidden" }}
    >
      {/* Curved edges: half-ellipses hanging off the panel, scaled flat */}
      <motion.div
        className="absolute inset-x-[-15%] bottom-full h-[18vh] origin-bottom rounded-[50%_50%_0_0/100%_100%_0_0]"
        style={{ background: BG, scaleY: top }}
      />
      <motion.div
        className="absolute inset-x-[-15%] top-full h-[18vh] origin-top rounded-[0_0_50%_50%/0_0_100%_100%]"
        style={{ background: BG, scaleY: bottom }}
      />

      <div
        className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 overflow-hidden px-6"
        style={{ background: BG }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 90% at 0% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('/img/6mcf62RlDfRfU61Yg5vb2pefpi.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "150px auto",
          }}
        />

        {active && (
          <div key={run} className="relative flex flex-col items-center gap-5">
            <motion.span
              className="font-display inline-flex items-baseline rounded-full bg-white px-4 py-2 text-[15px] leading-none font-medium tracking-[-0.035em] text-black shadow-[0_0_0_6px_rgba(255,255,255,0.35),8px_12px_18px_0_rgba(0,0,0,0.08)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: expoOut }}
            >
              {site.name}
              <span className="ml-[0.07em] inline-block size-[0.2em] shrink-0 rounded-full bg-[var(--accent)]" />
            </motion.span>

            <h2 className="font-display flex flex-wrap justify-center text-center text-[44px] leading-[1.05] tracking-[-0.05em] text-black min-[810px]:text-[80px] min-[1440px]:text-[110px]">
              {label.split(" ").map((word, w, words) => (
                <span key={w} className="inline-flex overflow-hidden pb-[0.08em]">
                  {[...word].map((ch, c) => {
                    const i = words.slice(0, w).join("").length + c;
                    return (
                      <motion.span
                        key={c}
                        className="inline-block"
                        initial={{ y: "110%", rotate: 8 }}
                        animate={{ y: "0%", rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.03, ease: expoOut }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                  {w < words.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
              <motion.span
                className="ml-[0.04em] inline-block size-[0.16em] self-end rounded-full bg-[var(--accent)] mb-[0.2em]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.3 + label.length * 0.03 }}
              />
            </h2>
          </div>
        )}
      </div>
    </motion.div>
  );
}
