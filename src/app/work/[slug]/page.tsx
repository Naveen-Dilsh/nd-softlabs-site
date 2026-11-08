import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, site } from "@/lib/content";
import { PILL_SHADOW } from "@/lib/shadows";
import ContactCta from "@/components/ContactCta";
import Eyebrow from "@/components/Eyebrow";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import MaskTitle from "./MaskTitle";
import ProjectVideo from "./ProjectVideo";

/**
 * Project page, laid out as a short case study that leads with what the
 * client asked for, so a visitor sees their own kind of request answered:
 *
 *   hero      category · year, the title rising word by word, a summary and
 *             the tags; on wide screens the client's request sits to the
 *             right as a message card, their words in quote marks
 *   needs     each requirement as a numbered card stamped "Delivered", under
 *             an "8 / 8 delivered" chip
 *   cover     the project film if there is one, then the main screen in a
 *             frosted browser frame, uncropped, with the
 *             facts (client, services, stack, timeline) in a strip below
 *   solution  what we built: heading left, paragraphs right
 *   gallery   any further screens, framed like the cover
 *
 * An in-house project (brief.kind "goal") reads "In-house" and "The goal"
 * instead. Projects without a brief or requirements skip those parts. The Back pill
 * sits in a fixed 80px bar 82px from the top, under the nav.
 */

type Params = { slug: string };

const projects = caseStudies.items;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary ?? project.description.split(".")[0] + ".",
  };
}

const GUTTER = "px-6 min-[810px]:px-12 min-[1440px]:px-[120px]";
const RING =
  "shadow-[0_0_0_8px_rgba(255,255,255,0.25),12px_16px_16px_0_rgba(0,0,0,0.1)]";

/** Phosphor "link" (regular). */
const LINK_ICON =
  "M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z";
/** Phosphor "check" (bold). */
const CHECK =
  "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z";

/** A screen in a frosted browser frame, at its own aspect ratio. */
function Screen({ src, alt, host }: { src: string; alt: string; host: string }) {
  return (
    <div className={`rounded-3xl bg-white/50 p-2 min-[810px]:p-3 ${RING}`}>
      <div className="overflow-hidden rounded-2xl bg-white">
        <div className="flex items-center gap-3 border-b border-black/5 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-black/10" />
            <span className="size-2.5 rounded-full bg-black/10" />
            <span className="size-2.5 rounded-full bg-black/10" />
          </span>
          <span className="font-display mx-auto truncate rounded-full bg-black/5 px-3 py-0.5 text-xs text-black/50">
            {host}
          </span>
          <span className="w-[42px]" />
        </div>
        <img src={src} alt={alt} className="block h-auto w-full" />
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 min-[810px]:px-6 min-[810px]:py-5">
      <dt className="font-serif text-lg leading-tight text-black/50 italic">
        {label}
      </dt>
      <dd className="font-display text-[17px] leading-[1.45] tracking-[-0.02em] text-black">
        {value}
      </dd>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-black text-white ${className}`}
    >
      <svg viewBox="0 0 256 256" className="size-[45%] fill-current" aria-hidden>
        <path d={CHECK} />
      </svg>
    </span>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const more = projects.filter((p) => p.slug !== slug).slice(0, 2);
  const host = project.liveUrl
    ? new URL(project.liveUrl).host
    : project.title;
  const summary = project.summary ?? project.description.split(".")[0] + ".";
  const paragraphs = project.description.split(/\s{2,}/).filter(Boolean);
  const { brief, requirements = [] } = project;
  const goal = brief?.kind === "goal";
  const initials = brief?.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <main className="relative">
      {/* Back pill, pinned under the nav */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-[82px] z-[800] flex h-20 items-center ${GUTTER}`}
      >
        <Link
          href="/#work"
          className="font-display pointer-events-auto inline-flex h-11 items-center rounded-[22px] bg-white px-6 text-base leading-[1.7] font-bold text-black"
        >
          ← Back
        </Link>
      </div>

      {/* Hero: the project, and what the client asked for */}
      <section
        className={`relative pt-[170px] min-[810px]:pt-[210px] ${GUTTER}`}
      >
        <div
          className={`mx-auto grid max-w-[1200px] gap-12 ${
            brief
              ? "min-[1024px]:grid-cols-[1fr_minmax(0,500px)] min-[1024px]:items-center min-[1024px]:gap-16"
              : ""
          }`}
        >
          <div className="flex flex-col gap-6">
            <Reveal y={16} className="flex flex-wrap items-center gap-3">
              <span className="font-display rounded-full bg-black px-3.5 py-1 text-xs leading-[18px] text-white">
                {goal ? "In-house" : "Case study"}
              </span>
              <span className="font-serif text-lg text-black/50 italic">
                {project.category} · {project.year}
              </span>
            </Reveal>
            <MaskTitle
              text={project.title}
              className="font-display text-[44px] leading-[1.05] tracking-[-0.05em] text-black min-[810px]:text-[72px] min-[1440px]:text-[84px]"
            />
            <Reveal delay={0.3}>
              <p className="font-display max-w-[560px] text-lg leading-[1.6] tracking-[-0.02em] text-black/60 min-[810px]:text-xl">
                {summary}
              </p>
            </Reveal>
            <Reveal delay={0.4} className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display inline-flex items-center gap-2 rounded-full bg-black py-2.5 pr-5 pl-6 text-base font-medium text-white"
                  style={{ boxShadow: PILL_SHADOW }}
                >
                  Live Link
                  <svg
                    viewBox="0 0 256 256"
                    className="h-5 w-5 fill-white opacity-50"
                    aria-hidden
                  >
                    <path d={LINK_ICON} />
                  </svg>
                </a>
              )}
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-display rounded-full bg-white px-3.5 py-1.5 text-sm leading-[18px] text-black"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The client's request, as a message */}
          {brief && (
            <Reveal delay={0.35} y={40}>
              <figure
                className={`m-0 rotate-[1.5deg] rounded-3xl bg-white/50 p-2.5 ${RING}`}
              >
                <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 min-[810px]:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-display grid size-11 shrink-0 place-items-center rounded-full bg-black text-sm font-medium text-white">
                      {initials}
                    </span>
                    <figcaption className="grid min-w-0 flex-1 leading-tight">
                      <span className="font-display text-[15px] font-medium text-black">
                        {brief.name}
                      </span>
                      <span className="font-display text-[13px] text-black/50">
                        {brief.role}
                      </span>
                    </figcaption>
                    <span className="font-serif shrink-0 text-base text-black/40 italic">
                      {goal ? "The goal" : "The request"}
                    </span>
                  </div>
                  <blockquote className="font-display text-[17px] leading-[1.65] tracking-[-0.015em] text-black min-[810px]:text-[18px]">
                    <span className="text-[1.4em] leading-none text-[var(--accent)]">
                      “
                    </span>
                    {brief.quote}
                    <span className="text-[1.4em] leading-none text-[var(--accent)]">
                      ”
                    </span>
                  </blockquote>
                </div>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* Requirements, each one delivered */}
      {requirements.length > 0 && (
        <section
          aria-labelledby="needs-title"
          className={`pt-20 min-[810px]:pt-28 ${GUTTER}`}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex flex-col items-center gap-3 min-[810px]:mb-14">
              <Eyebrow>{goal ? "What we set out to do" : "What they asked for"}</Eyebrow>
              <h2
                id="needs-title"
                className="font-display text-center text-[28px] leading-[1.3] tracking-[-0.04em] text-balance min-[810px]:text-[48px]"
              >
                {goal ? "Every goal." : "Every requirement."}{" "}
                <span className="text-black/50">Delivered.</span>
              </h2>
              <span className="font-display mt-1 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-sm text-black/60 shadow-[0_0_0_4px_rgba(255,255,255,0.25)]">
                <span className="size-2 rounded-full bg-[#22c55e]" />
                <span>
                  <span className="font-medium text-black">
                    {requirements.length} / {requirements.length}
                  </span>{" "}
                  delivered
                </span>
              </span>
            </div>
            <div
              className={`rounded-3xl bg-white/50 p-2.5 min-[810px]:p-3 ${RING}`}
            >
              <ol className={`grid gap-2.5 min-[640px]:grid-cols-2 min-[810px]:gap-3 ${
                  requirements.length % 3 === 0 && requirements.length % 4 !== 0
                    ? "min-[1024px]:grid-cols-3"
                    : "min-[1200px]:grid-cols-4"
                }`}>
                {requirements.map((r, i) => (
                  <li key={r.title}>
                    <Reveal
                      delay={(i % 4) * 0.06}
                      className="flex h-full flex-col rounded-2xl bg-white/75 p-6"
                    >
                      <span className="font-serif text-2xl text-black/35 italic">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display mt-4 text-xl leading-[1.25] tracking-[-0.03em] text-black">
                        {r.title}
                      </h3>
                      <p className="font-display mt-2 flex-1 text-[15px] leading-[1.6] text-black/50">
                        {r.body}
                      </p>
                      <span className="font-display mt-6 flex items-center gap-2 border-t border-black/5 pt-4 text-sm font-medium text-black">
                        <Check className="size-6" />
                        Delivered
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Cover and facts */}
      <section className={`pt-20 min-[810px]:pt-28 ${GUTTER}`}>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 min-[810px]:gap-10">
          {/* The film stands in for the cover screenshot when there is one */}
          <Reveal y={64}>
            {project.video ? (
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster}
                label={`${project.title} film`}
              />
            ) : (
              <Screen src={project.image} alt={project.title} host={host} />
            )}
          </Reveal>
          <Reveal>
            <div className={`rounded-3xl bg-white/50 p-2.5 ${RING}`}>
              <dl className="grid divide-y divide-black/5 rounded-2xl bg-white/75 min-[810px]:grid-cols-4 min-[810px]:divide-x min-[810px]:divide-y-0">
                <Fact label="Client" value={project.client} />
                <Fact label="Services" value={project.services} />
                <Fact label="Stack" value={project.stack} />
                <Fact label="Timeline" value={project.timeline} />
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The solution */}
      <section
        aria-labelledby="solution-title"
        className={`pt-20 min-[810px]:pt-28 ${GUTTER}`}
      >
        <div className="mx-auto grid max-w-[1200px] gap-8 min-[1024px]:grid-cols-[1fr_1.4fr] min-[1024px]:gap-16">
          <Reveal className="flex flex-col gap-3">
            <span className="font-serif text-2xl text-black/50 italic">
              The solution
            </span>
            <h2
              id="solution-title"
              className="font-display text-[28px] leading-[1.3] tracking-[-0.04em] min-[810px]:text-[48px]"
            >
              What we built.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="font-display text-lg leading-[1.65] tracking-[-0.02em] text-black/70 min-[810px]:text-xl">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {project.gallery.length > 0 && (
          <div className="mx-auto mt-14 flex max-w-[1200px] flex-col gap-10 min-[810px]:mt-20 min-[810px]:gap-14">
            {project.gallery.map((src) => (
              <Reveal key={src} y={64}>
                <Screen src={src} alt="" host={host} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* More projects */}
      <section
        className={`pt-[98px] pb-12 min-[810px]:pt-[115px] min-[810px]:pb-16 min-[1440px]:pt-[138px] min-[1440px]:pb-20 ${GUTTER}`}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 min-[810px]:gap-7 min-[1440px]:gap-12">
          <div className="flex flex-col items-center gap-2.5">
            <Eyebrow italic>See also</Eyebrow>
            <h2 className="font-display text-center text-[28px] leading-[1.4] tracking-[-0.04em] text-black/50 min-[810px]:text-[32px] min-[1440px]:text-[48px]">
              <span className="text-black">More </span>Projects
            </h2>
          </div>
          <div className="grid gap-8 min-[810px]:grid-cols-2 min-[810px]:gap-10 min-[1440px]:gap-[60px]">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
