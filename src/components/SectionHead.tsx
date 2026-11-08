import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  heading,
  size = "lg",
}: {
  eyebrow: string;
  heading: string;
  size?: "lg" | "md";
}) {
  return (
    <div className="text-center">
      <Reveal>
        <p className="font-serif text-2xl text-black/50">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-2 tracking-[-0.04em] ${
            size === "lg"
              ? "text-[clamp(32px,5vw,48px)]"
              : "text-[clamp(30px,4.5vw,44px)]"
          } leading-[1.4]`}
        >
          {heading}
        </h2>
      </Reveal>
    </div>
  );
}
