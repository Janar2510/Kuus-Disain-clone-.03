"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Vertical offset in px, mirrors the source's --sr-y. */
  y?: number;
  /** Delay in ms, mirrors the source's --sr-delay. */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span" | "li" | "section";
};

export function Reveal({
  children,
  y = 40,
  delay = 0,
  className,
  style,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Static = as;
    return (
      <Static className={className} style={style}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 1.2, delay: delay / 1000, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </Component>
  );
}
