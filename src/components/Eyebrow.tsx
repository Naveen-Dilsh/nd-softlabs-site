/**
 * Section eyebrow, as on the live site: a 24px serif label between two 69px
 * hairlines that fade outward. It never wraps — on narrow screens the
 * hairlines get clipped instead.
 */
export default function Eyebrow({
  children,
  italic = false,
  light = false,
}: {
  children: string;
  italic?: boolean;
  /** White label and hairlines, for dark backgrounds. */
  light?: boolean;
}) {
  const line = light ? "#fff" : "rgba(0,0,0,0.5)";
  return (
    <div className="flex max-w-full items-center justify-center gap-6 overflow-hidden px-6">
      <span
        className="h-px w-[69px] shrink-0 opacity-50"
        style={{ background: `linear-gradient(90deg, rgba(84,84,84,0) 0%, ${line} 100%)` }}
      />
      <h4
        className={`font-serif text-2xl leading-[1.2] whitespace-nowrap ${
          light ? "text-white/50" : "text-black/50"
        } ${italic ? "italic" : ""}`}
      >
        {children}
      </h4>
      <span
        className="h-px w-[69px] shrink-0 opacity-50"
        style={{ background: `linear-gradient(270deg, rgba(84,84,84,0) 0%, ${line} 100%)` }}
      />
    </div>
  );
}
