"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { team } from "@/lib/senawa/content";

/** The team roster: a large feature block plus a selectable grid of figures. */
export function TeamRoster() {
  const [active, setActive] = useState(0);
  const current = team[active];

  return (
    <div className="st-team">
      <div className="st-feature">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="st-featureInner"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="st-featureFigureWrap">
              <span
                className="st-featureFigure"
                style={{
                  aspectRatio: current.ratio,
                  backgroundColor: "currentColor",
                  maskImage: `url(${current.mask})`,
                  WebkitMaskImage: `url(${current.mask})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "bottom left",
                  WebkitMaskPosition: "bottom left",
                }}
                aria-hidden="true"
              />
              <p className="st-featureName">{current.name}</p>
              <p className="st-featureRole">
                {current.role.map((line) => (
                  <span className="st-featureRoleLine" key={line}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="st-featureBody">
              {current.bio ? (
                <div className="st-featureBio">
                  {current.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="st-featureBio">
                  <p>
                    {current.name} works with the studio across {current.role.join(" and ").toLowerCase()},
                    keeping each project moving from first sketch to handover.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="st-roster">
        {team.map((member, index) => (
          <button
            key={member.name}
            type="button"
            className={`st-figureBtn${index === active ? " st-figureBtnActive" : ""}`}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <span className="st-figureCell">
              <span
                className="st-figure"
                style={{
                  aspectRatio: member.ratio,
                  backgroundColor: "currentColor",
                  maskImage: `url(${member.mask})`,
                  WebkitMaskImage: `url(${member.mask})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "bottom left",
                  WebkitMaskPosition: "bottom left",
                }}
                aria-hidden="true"
              />
            </span>
            <span className="st-figureName">{member.name}</span>
            <span className="st-figureRole">
              {member.role.map((line) => (
                <span className="st-figureRoleLine" key={line}>
                  {line}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
