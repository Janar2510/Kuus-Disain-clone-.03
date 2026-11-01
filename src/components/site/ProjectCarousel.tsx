"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/senawa/projects";

const COPIES = 3;
const MIDDLE = 1;

const strip = Array.from({ length: COPIES }).flatMap((_, copy) =>
  projects.map((project, projectIndex) => ({
    projectIndex,
    copy,
    key: `${copy}-${project.slug}`,
  })),
);

export function ProjectCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef<(HTMLAnchorElement | null)[]>([]);
  const wheelLock = useRef(0);
  const x = useMotionValue(0);

  const measure = useCallback(
    (animateTo: boolean) => {
      const viewport = viewportRef.current;
      const index = MIDDLE * projects.length + active;
      const item = itemEls.current[index];
      if (!viewport || !item) return;
      const target =
        viewport.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
      if (animateTo && !reduce) {
        animate(x, target, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
      } else {
        x.set(target);
      }
      setReady(true);
    },
    [active, reduce, x],
  );

  useLayoutEffect(() => {
    measure(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    measure(true);
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure(false);
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measure(false)).catch(() => undefined);
    }
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const step = useCallback((direction: number) => {
    setActive((current) => {
      const next = current + direction;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const onWheel = (event: React.WheelEvent) => {
    const now = Date.now();
    if (now - wheelLock.current < 420) return;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 8) return;
    wheelLock.current = now;
    step(delta > 0 ? 1 : -1);
  };

  const snapToNearest = () => {
    const center = window.innerWidth / 2;
    let closest = active;
    let best = Number.POSITIVE_INFINITY;
    itemEls.current.forEach((item, index) => {
      if (!item || Math.floor(index / projects.length) !== MIDDLE) return;
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < best) {
        best = distance;
        closest = index % projects.length;
      }
    });
    if (closest === active) {
      measure(true);
    } else {
      setActive(closest);
    }
  };

  useEffect(() => {
    // The backgrounds are opacity 0 until `data-loaded`; reveal them a frame
    // after mount so the first paint keeps its fade instead of flashing.
    const raf = window.requestAnimationFrame(() => setLoadedAll(true));
    const failsafe = window.setTimeout(() => setReady(true), 800);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, []);

  const current = projects[active];
  const progress = (active + 1) / projects.length;

  return (
    <main className="pc-page">
      <h1 className="visually-hidden">
        Senawa, Architecture &amp; Interior Design Studio in Jakarta
      </h1>

      <div className="pc-bg">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="pc-bgImg"
            data-active={index === active ? "" : undefined}
            data-loaded={loadedAll || index === 0 ? "" : undefined}
            aria-hidden="true"
          >
            <Image
              className="pc-bgImgInner"
              src={project.cover}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className="pc-scrim" aria-hidden="true" />
      <div className="pc-scrimTop" aria-hidden="true" />

      <div className={`pc-surface${dragging ? " pc-dragging" : ""}`} onWheel={onWheel}>
        <section
          className="pc-carousel"
          aria-roledescription="carousel"
          aria-label="Projects"
        >
          <div
            ref={viewportRef}
            className="pc-viewport"
            role="group"
            aria-label="Projects, drag or use arrow keys to browse"
            tabIndex={0}
          >
            <motion.div
              className={`pc-track${dragging ? " pc-dragging" : ""}`}
              data-ready={ready ? "" : undefined}
              drag="x"
              dragConstraints={{ left: -100000, right: 100000 }}
              dragElastic={0.06}
              dragMomentum={false}
              style={{ x }}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => {
                setDragging(false);
                snapToNearest();
              }}
            >
              {strip.map((entry, index) => {
                const project = projects[entry.projectIndex];
                const isActive = entry.projectIndex === active && entry.copy === MIDDLE;
                return (
                  <Link
                    key={entry.key}
                    ref={(node) => {
                      itemEls.current[index] = node;
                    }}
                    href={`/work/${project.slug}`}
                    className="pc-item"
                    aria-roledescription="slide"
                    aria-label={`${isActive ? "Open" : "Show"} ${project.title}, ${project.sub}, ${project.meta.Year}`}
                    aria-hidden={entry.copy === MIDDLE ? undefined : true}
                    tabIndex={entry.copy === MIDDLE ? 0 : -1}
                    data-active={isActive ? "" : undefined}
                    draggable={false}
                    onClick={(event) => {
                      if (!isActive) {
                        event.preventDefault();
                        setActive(entry.projectIndex);
                      }
                    }}
                  >
                    <span className="pc-itemTitle">{project.title}</span>
                    <span className="pc-itemMeta">
                      {project.meta.Year}
                      <span className="pc-metaRule" aria-hidden="true" />
                      {project.sub}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>

          <p className="visually-hidden" role="status" aria-live="polite">
            {current.title}, {current.sub}, {current.meta.Year} ({active + 1} of{" "}
            {projects.length})
          </p>

          <div className="pc-baseline" aria-hidden="true">
            <motion.div
              className="pc-progress"
              animate={{ scaleX: progress }}
              initial={false}
              transition={
                reduce ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
