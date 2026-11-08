"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/content";

/**
 * A case-study card, shared by the home page's "Recent Case Studies" and the
 * "More Projects" strip on each project page: a 4:3 image with a 1px white/50
 * inner border, then the title and tag pills underneath.
 *
 * Hover zooms the image to 1.05 and lifts the title from 50% to full black;
 * the title row drops in from 47px above when it scrolls into view.
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-4 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f5f5f5] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white/50 after:content-['']">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>

      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -47 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", bounce: 0.2, duration: 1 }}
      >
        <h4 className="font-display min-w-0 flex-1 text-lg leading-[1.5] tracking-[-0.02em] text-black opacity-50 transition-opacity duration-300 group-hover:opacity-100 min-[810px]:text-xl">
          {project.title}
        </h4>
        <ul className="flex shrink-0 flex-wrap items-center justify-end gap-1">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-display rounded-full bg-white px-3 py-1 text-xs leading-[18px] text-black opacity-50"
            >
              {tag}
            </li>
          ))}
        </ul>
      </motion.div>
    </Link>
  );
}
