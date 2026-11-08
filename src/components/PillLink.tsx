import Link from "next/link";
import { PILL_SHADOW } from "@/lib/shadows";

/** Phosphor "arrow-right" (regular). */
const ARROW =
  "M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z";

/**
 * The live site's black pill button with a trailing arrow, sat in an 8px
 * frame (white in Pricing, white/30 on the dark footer).
 *
 * Hover, as live: the arrow brightens from 50% and slides out to the right
 * while a twin slides in from 40px to the left.
 */
export default function PillLink({
  href,
  children,
  frame = "bg-white",
}: {
  href: string;
  children: string;
  /** Background class of the 8px frame around the pill. */
  frame?: string;
}) {
  return (
    <div className={`w-fit rounded-[33px] p-2 ${frame}`}>
      <Link
        href={href}
        className="group flex items-center gap-2 overflow-hidden rounded-full bg-black py-3 pr-5 pl-6"
        style={{ boxShadow: PILL_SHADOW }}
      >
        <span className="font-display text-base leading-[1.7] whitespace-nowrap text-white">
          {children}
        </span>
        <span className="relative h-5 w-5 shrink-0 overflow-hidden opacity-50 transition-opacity duration-300 group-hover:opacity-100">
          <svg
            viewBox="0 0 256 256"
            className="absolute inset-0 h-5 w-5 fill-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-10"
            aria-hidden
          >
            <path d={ARROW} />
          </svg>
          <svg
            viewBox="0 0 256 256"
            className="absolute inset-0 h-5 w-5 -translate-x-10 fill-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
            aria-hidden
          >
            <path d={ARROW} />
          </svg>
        </span>
      </Link>
    </div>
  );
}
