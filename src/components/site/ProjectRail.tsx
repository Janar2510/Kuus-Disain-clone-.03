"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SenawaWordmark } from "./BrandMark";
import type { Project } from "@/lib/senawa/projects";

type ProjectRailProps = {
  project: Project;
};

const metaOrder = ["Year", "Area", "Location", "Status"] as const;

export function ProjectRail({ project }: ProjectRailProps) {
  return (
    <aside className="pd-rail">
      <div className="pd-railTop">
        <Link className="pd-railLogo" href="/" aria-label="Senawa home">
          <SenawaWordmark width={98} height={14} />
        </Link>
        <div className="pd-railUtility">
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/work">Work</Link>
            <span className="pd-bcSlash">/</span>
            <span>{project.sub}</span>
          </nav>
          <button
            type="button"
            className="pd-railMenu"
            onClick={() => {
              document.querySelector<HTMLButtonElement>(".nav-menuTrigger")?.click();
            }}
          >
            Menu
          </button>
        </div>
      </div>

      <div className="pd-railTitleBlock">
        <h1 className="pd-railTitle">{project.title}</h1>
        <span className="pd-railSub">
          {project.meta.Year} | {project.sub}
        </span>
      </div>

      <dl className="pd-railMeta">
        {metaOrder.map((key) => (
          <div className="pd-railMetaItem" key={key}>
            <dt className="pd-railMetaLabel">{key}</dt>
            <dd className="pd-railMetaValue">{project.meta[key]}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function ProjectMetaMobile({ project }: { project: Project }) {
  return (
    <dl className="pd-metaMobile">
      {metaOrder.map((key) => (
        <div className="pd-railMetaItem" key={key}>
          <dt className="pd-railMetaLabel">{key}</dt>
          <dd className="pd-railMetaValue">{project.meta[key]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function OverviewText({ project }: { project: Project }) {
  const thumbs = project.images.slice(1, 4);

  return (
    <div className="pd-overviewText">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="pd-overviewYear">
          <span className="pd-overviewYearLabel">Timeline</span>
          <span className="pd-overviewYearValue">{project.timeline}</span>
        </div>
      </motion.div>

      <motion.div
        className="pd-overviewBody"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
      >
        {project.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.div
        className="pd-overviewThumbs"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, delay: 0.14, ease: [0.33, 1, 0.68, 1] }}
      >
        {thumbs.map((src) => (
          <div className="pd-overviewThumb" key={src}>
            <div
              className="fi-wrapper"
              style={{ aspectRatio: "1 / 1" }}
            >
              <div className="fi-placeholder" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="fi-image fi-revealedInstant"
                src={src}
                alt={`${project.title} detail`}
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function DetailNav({
  next,
}: {
  next: { slug: string; title: string } | null;
}) {
  return (
    <nav className="pd-detailNav" aria-label="Project navigation">
      <Link className="pd-detailNavAll" href="/work">
        ← All work
      </Link>
      {next ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link className="pd-detailNavNext" href={`/work/${next.slug}`}>
              <span className="pd-detailNavLabel">Next project</span>
              <span className="pd-detailNavTitle">{next.title}</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </nav>
  );
}
