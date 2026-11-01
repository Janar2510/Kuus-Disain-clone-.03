"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type WorkGalleryProps = {
  images: string[];
  alt: string;
  video?: string;
};

/**
 * The project film gallery: a stage of frames with a thumbnail filmstrip and
 * an optional film as the first item.
 */
export function WorkGallery({ images, alt, video }: WorkGalleryProps) {
  const [index, setIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const total = images.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => {
        const next = current + delta;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.querySelector<HTMLElement>("[data-active]");
    if (strip && active) {
      strip.scrollTo({
        left: active.offsetLeft - strip.clientWidth / 2 + active.offsetWidth / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [index, reduce]);

  return (
    <section
      className="wgal-gallery"
      aria-roledescription="carousel"
      aria-label={`${alt} film`}
    >
      <div className="wgal-stage">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            className="wgal-frame"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {index === 0 && video ? (
              <div className="pv-wrap">
                <Image
                  className="pv-poster"
                  src={images[index]}
                  alt={`${alt} film`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
                <video
                  className="pv-video"
                  data-shown=""
                  src={video}
                  poster={images[index]}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
              </div>
            ) : (
              <Image
                className="wgal-frameImg"
                src={images[index]}
                alt={`${alt} — image ${index + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="wgal-srStatus" role="status" aria-live="polite">
        Frame {index + 1} of {total}
      </div>

      <div className="wgal-filmstrip">
        <button
          type="button"
          className="wgal-arrow"
          onClick={() => go(-1)}
          aria-label="Previous frame"
        >
          ‹
        </button>
        <div className="wgal-thumbs" ref={thumbsRef}>
          {images.map((src, thumbIndex) => (
            <button
              key={`${src}-${thumbIndex}`}
              type="button"
              className="wgal-thumb"
              data-active={thumbIndex === index ? "" : undefined}
              aria-label={`Show frame ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
              onClick={() => setIndex(thumbIndex)}
            >
              <Image
                className="wgal-thumbImg"
                src={src}
                alt=""
                fill
                sizes="120px"
                style={{ objectFit: "cover" }}
              />
              {thumbIndex === 0 && video ? (
                <span className="wgal-thumbFilmMark" aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="wgal-arrow"
          onClick={() => go(1)}
          aria-label="Next frame"
        >
          ›
        </button>
      </div>
    </section>
  );
}
