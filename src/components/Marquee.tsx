"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** seconds for one full loop */
  duration?: number;
  direction?: "up" | "down";
  className?: string;
  gap?: number;
};

/** Seamless vertical marquee: the track is duplicated and translated -50%. */
export function MarqueeY({
  children,
  duration = 40,
  direction = "up",
  className = "",
  gap = 48,
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex flex-col will-change-transform"
        style={{
          gap,
          animation: `${
            direction === "up" ? "marquee-y" : "marquee-y-rev"
          } ${duration}s linear infinite`,
        }}
      >
        <div className="flex flex-col" style={{ gap }}>
          {children}
        </div>
        <div className="flex flex-col" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Seamless horizontal marquee. */
export function MarqueeX({
  children,
  duration = 30,
  className = "",
  gap = 48,
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max will-change-transform"
        style={{ gap, animation: `marquee-x ${duration}s linear infinite` }}
      >
        <div className="flex items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
