"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/senawa/projects";
import { commercialCount, residentialCount } from "@/lib/senawa/projects";
import { FadeImage } from "./FadeImage";
import { Reveal } from "./Reveal";

type Filter = "All" | "Commercial" | "Residential";
type View = "Grid" | "Index";

const grow: Record<string, string> = {
  "aa-house": "2.19",
  "am-house": "0.8",
  "hy-house": "2.2",
  "tv-house": "0.75",
  "louver-house": "1.2",
  "nsb-ps": "1.6",
  "fr-house": "2",
  "k-villa": "0.85",
};

const strips = [
  ["aa-house", "am-house"],
  ["hy-house", "tv-house", "louver-house"],
  ["nsb-ps", "fr-house", "k-villa"],
];

const filters: { label: Filter; count: number }[] = [
  { label: "All", count: projects.length },
  { label: "Commercial", count: commercialCount },
  { label: "Residential", count: residentialCount },
];

export function WorkGrid() {
  const [view, setView] = useState<View>("Grid");
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<Project | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.sub === filter),
    [filter],
  );

  const visibleStrips = strips
    .map((strip) =>
      strip
        .map((slug) => visible.find((project) => project.slug === slug))
        .filter((project): project is Project => Boolean(project)),
    )
    .filter((strip) => strip.length > 0);

  return (
    <section className="wg-section">
      <div className="container">
        <h1 className="visually-hidden">
          Work: Selected Architecture &amp; Interior Projects in Jakarta
        </h1>

        <Reveal>
          <div className="wg-header">
            <span className="section-label">All Work</span>
            <div className="wg-viewToggle">
              {(["Grid", "Index"] as View[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`wg-viewBtn${view === option ? " wg-viewActive" : ""}`}
                  onClick={() => setView(option)}
                  aria-pressed={view === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="wg-filters">
            {filters.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`wg-filterBtn${
                  filter === option.label ? " wg-filterActive" : ""
                }`}
                onClick={() => setFilter(option.label)}
                aria-pressed={filter === option.label}
              >
                {option.label}
                <span className="wg-filterCount">{option.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <p className="visually-hidden" role="status" aria-live="polite">
          Showing {visible.length} projects.
        </p>

        {view === "Grid" ? (
          <div className="wg-gridContainer">
            {visibleStrips.map((stripList, stripIndex) => (
              <div className="wg-strip" key={`strip-${stripIndex}`}>
                {stripList.map((project, index) => {
                  const tall = project.slug === "am-house";
                  return (
                    <Reveal
                      key={project.slug}
                      className={`wg-stripItem${tall ? " wg-stripItemTall" : ""}`}
                      style={
                        { "--grow": grow[project.slug] ?? "1" } as React.CSSProperties
                      }
                      delay={index * 80}
                    >
                      <Link className="wg-card" href={`/work/${project.slug}`}>
                        <div
                          className={`wg-imageWrap${
                            tall ? " wg-imageWrapTall" : ""
                          }`}
                        >
                          <FadeImage
                            src={project.cover}
                            alt={`${project.title}, ${project.sub}, ${project.meta.Year}`}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
                          />
                        </div>
                        <div className="wg-cardInfo">
                          <span className="wg-cardTitle">{project.title}</span>
                          <div className="wg-cardMeta">
                            <span className="wg-cardTag">{project.sub}</span>
                            <span className="wg-cardDot" aria-hidden="true">
                              ·
                            </span>
                            <span className="wg-cardTag">{project.meta.Year}</span>
                            <span className="wg-cardLocation">
                              {project.meta.Location}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="wi-indexWrap"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setPointer({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <table className="wi-table">
              <thead>
                <tr className="wi-headerRow">
                  <th scope="col" className="wi-colYear">
                    Year
                  </th>
                  <th scope="col">Project</th>
                  <th scope="col">Location</th>
                  <th scope="col">Typology</th>
                  <th scope="col" className="wi-colArea">
                    Area
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((project) => (
                  <tr
                    key={project.slug}
                    className="wi-row"
                    onMouseEnter={() => setHovered(project)}
                  >
                    <td className="wi-colYear">{project.meta.Year}</td>
                    <th scope="row" className="wi-colTitle">
                      <Link className="wi-rowLink" href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </th>
                    <td className="wi-colLocation">{project.meta.Location}</td>
                    <td className="wi-colTypology">{project.sub}</td>
                    <td className="wi-colArea">{project.meta.Area}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <AnimatePresence>
              {hovered ? (
                <motion.div
                  className={`wi-preview${
                    hovered.slug === "am-house" ? " wi-previewTall" : ""
                  }`}
                  style={{
                    left: pointer.x + 24,
                    top: pointer.y - 90,
                    visibility: "visible",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                >
                  <FadeImage
                    src={hovered.cover}
                    alt=""
                    fill
                    sizes="280px"
                    instant
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
