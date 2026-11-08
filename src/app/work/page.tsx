import { site } from "@/lib/content";
import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";
import ContactCta from "@/components/ContactCta";
import SplitChars from "@/components/SplitChars";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description: `Recent case studies from ${site.name}.`,
};

export default function WorkPage() {
  return (
    <main>
      <section className="sheen relative overflow-hidden pt-[180px] pb-10 max-md:pt-[130px]">
        <div className="relative z-10 mx-auto max-w-[1248px] px-6 text-center max-md:px-4">
          <p className="font-serif text-2xl text-black/50">Our Projects</p>
          <h1 className="font-display mt-4 text-[clamp(44px,7.5vw,108px)] leading-[1.15] tracking-[-0.06em]">
            <SplitChars text="Selected" className="font-medium text-black" trigger="mount" />
            <span className="inline-block" style={{ width: "0.26em" }} />
            <SplitChars text="Work" className="font-normal text-black/50" delay={0.14} trigger="mount" />
          </h1>
        </div>
      </section>
      <CaseStudies />
      <ContactCta />
    </main>
  );
}
