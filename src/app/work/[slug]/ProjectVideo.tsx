"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const RING =
  "shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)]";

/** Phosphor "speaker-simple-slash" and "speaker-simple-high" (fill). */
const MUTED =
  "M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V184.32l42.08,46.29a8,8,0,1,0,11.84-10.76ZM232,128a39.74,39.74,0,0,1-5.4,20,8,8,0,1,1-13.86-8,24,24,0,0,0,0-24,8,8,0,1,1,13.86-8A39.74,39.74,0,0,1,232,128ZM155.2,93.31,108.7,42.15l38.39-29.86A8,8,0,0,1,160,18.6V88A8,8,0,0,1,155.2,93.31Z";
const SOUND =
  "M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.25A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.84a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z";

/**
 * A project film: plays muted and looping while it is on screen (pausing
 * when scrolled away), in a frosted frame. The button bottom-right turns the
 * sound on and off.
 */
export default function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(frame, { amount: 0.3 });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div ref={frame} className={`relative rounded-3xl bg-white/50 p-2 min-[810px]:p-3 ${RING}`}>
      <video
        ref={video}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block aspect-video w-full rounded-2xl bg-black object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="font-display absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white/90 py-2 pr-4 pl-3 text-sm text-black backdrop-blur transition-transform active:scale-95 min-[810px]:right-7 min-[810px]:bottom-7"
      >
        <svg viewBox="0 0 256 256" className="size-4 fill-current" aria-hidden>
          <path d={muted ? MUTED : SOUND} />
        </svg>
        {muted ? "Sound on" : "Mute"}
      </button>
    </div>
  );
}
