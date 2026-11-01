"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type PortraitCarouselProps = {
  images: string[];
  alt: string;
};

/** Portrait frame carousel used in a project's overview column. */
export function PortraitCarousel({ images, alt }: PortraitCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((current) => {
        const next = current + delta;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const counter = String(index + 1).padStart(2, "0");

  return (
    <section className="pcar-carousel" aria-roledescription="carousel" aria-label={`${alt} images`}>
      <div className="pcar-stage">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={images[index]}
            className="pcar-frame"
            custom={direction}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              className="pcar-frameImg"
              src={images[index]}
              alt={`${alt} — image ${index + 1}`}
              fill
              sizes="(max-width: 1023px) 100vw, 34vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pcar-srStatus" role="status" aria-live="polite">
        Image {index + 1} of {images.length}
      </div>

      <div className="pcar-controls">
        <button
          type="button"
          className="pcar-arrow"
          onClick={() => go(-1)}
          aria-label="Previous image"
        >
          ‹
        </button>
        <span className="pcar-counter">
          {counter} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          className="pcar-arrow"
          onClick={() => go(1)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </section>
  );
}
