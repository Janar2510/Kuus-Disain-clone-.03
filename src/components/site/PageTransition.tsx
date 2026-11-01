"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SenawaMark } from "./BrandMark";

/**
 * Wool shutter with the mark, played on client-side route changes the way the
 * source does with its view-transition overlay.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [covering, setCovering] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    const show = window.setTimeout(() => setCovering(true), 0);
    const hide = window.setTimeout(() => setCovering(false), 520);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [pathname, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {covering ? (
        <motion.div
          className="pt-shutter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="pt-mark"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SenawaMark width={44} height={44} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
