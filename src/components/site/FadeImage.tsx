"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeImageProps = {
  src: string;
  alt: string;
  /** Cover the parent instead of sizing to an aspect ratio. */
  fill?: boolean;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  instant?: boolean;
};

/**
 * Mirrors the source's FadeImage: a linen placeholder, then a 1.2s fade and
 * slight scale-settle once the image scrolls into view.
 */
export function FadeImage({
  src,
  alt,
  fill = false,
  ratio,
  className,
  sizes = "100vw",
  priority = false,
  delay = 0,
  instant = false,
}: FadeImageProps) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : instant ? { opacity: 0 } : { opacity: 0, scale: 1.05 };
  const settled = instant ? { opacity: 1 } : { opacity: 1, scale: 1 };

  return (
    <div
      className={cn("fi-wrapper", fill && "fi-fill", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div className="fi-placeholder" aria-hidden="true" />
      <motion.div
        className="fi-image"
        style={{ position: "absolute", inset: 0 }}
        initial={initial || undefined}
        whileInView={settled}
        viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
        transition={{
          duration: reduce ? 0 : instant ? 0.45 : 1.2,
          delay: reduce ? 0 : delay / 1000,
          ease: instant ? [0.5, 1, 0.89, 1] : [0.33, 1, 0.68, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </div>
  );
}
