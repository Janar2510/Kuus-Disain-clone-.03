"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SenawaMark } from "./BrandMark";

/** The brief mark preloader the source shows before the home carousel. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="sp-simple"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <SenawaMark width={52} height={52} className="sp-mark" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
