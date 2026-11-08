"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import Reveal from "./Reveal";

const field =
  "w-full rounded-2xl border border-black/10 bg-white/70 px-5 py-4 text-base text-black outline-none transition-colors duration-300 placeholder:text-black/35 focus:border-black/30";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  /** No backend in this rebuild — hand off to the studio's inbox. */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New project enquiry — ${data.get("name")}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="relative py-[90px] max-md:py-14">
      <div className="mx-auto max-w-[1248px] px-6 max-md:px-4">
        <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-10">
          <Reveal>
            <div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.25] tracking-[-0.04em]">
                Tell us what you&rsquo;re building
              </h2>
              <p className="mt-5 max-w-[420px] text-base leading-[1.7] text-black/50">
                Share your requirements and we&rsquo;ll come back with a plan,
                a timeline and a fixed price.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block text-base font-medium text-[#ff2200] underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input name="name" required placeholder="Your name" className={field} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className={field}
              />
              <textarea
                name="message"
                rows={5}
                required
                placeholder="What do you need?"
                className={`${field} resize-none`}
              />
              <button
                type="submit"
                className="mt-2 self-start rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                {sent ? "Opening your mail app…" : "Send enquiry"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
