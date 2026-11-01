"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { elements } from "@/lib/senawa/content";

/** Mosaic cells for the desktop stage, one per element. */
const cells = [
  { left: "6%", top: "9%", width: "29%", height: "35%" },
  { left: "38%", top: "7%", width: "23%", height: "29%" },
  { left: "64%", top: "13%", width: "29%", height: "34%" },
  { left: "9%", top: "49%", width: "26%", height: "37%" },
  { left: "39%", top: "41%", width: "30%", height: "45%" },
];

/**
 * The elements page: a mosaic of crops with numbered markers. Markers preview
 * their tag on hover; clicking one locks it and opens the reading panel.
 */
export function ElementsExplorer() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const current = elements[active];

  useEffect(() => {
    if (!locked) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLocked(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked]);

  return (
    <div className="ee-root">
      <div
        className={`ee-stage${locked ? " ee-isEngaged ee-isLocked" : " ee-isEngaged"}`}
      >
        <div className="ee-grid" aria-hidden="true">
          <div className="ee-gridLine ee-gridH" />
          <div className="ee-gridLine ee-gridH" />
          <div className="ee-gridLine ee-gridV" />
          <div className="ee-gridLine ee-gridV" />
        </div>

        <div className="ee-crops">
          {elements.map((element, index) => (
            <button
              key={element.name}
              type="button"
              className={`ee-crop ee-isIn${
                index === active ? " ee-isActive ee-isLocked" : ""
              }`}
              onClick={() => {
                setActive(index);
                setLocked(true);
              }}
              aria-label={`Show ${element.name}`}
              style={{
                ...cells[index],
                position: "absolute",
                opacity: 1,
                transform: "none",
                backgroundImage: `url(${element.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <div className="ee-markers">
          {elements.map((element, index) => (
            <button
              key={element.name}
              type="button"
              className={`ee-marker${
                index === active ? " ee-isActive ee-isLocked" : ""
              }`}
              style={{ left: element.markers.left, top: element.markers.top }}
              onClick={() => {
                setActive(index);
                setLocked(true);
              }}
              aria-label={`Read about ${element.name}`}
            >
              <span className="ee-dot" />
            </button>
          ))}
        </div>

        <div className="ee-labels" aria-hidden="true">
          {elements.map((element, index) => (
            <span
              key={element.name}
              className={`ee-tag${
                index === active ? " ee-isActive ee-isLocked" : ""
              }`}
              style={{ left: element.crop.left, top: element.crop.top }}
            >
              ( {element.name} )
            </span>
          ))}
        </div>

        <aside className="ee-panel" aria-live="polite">
          <button
            type="button"
            className="ee-panelClose"
            onClick={() => setLocked(false)}
            aria-label="Close detail panel"
          >
            Close
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              className="ee-panelStagger"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="ee-panelTitle">( {current.name} )</h2>
              <p className="ee-panelDesc">{current.description}</p>
              <div className="ee-panelRule" />
              <div className="ee-panelRefsLabel">Seen in</div>
              <div className="ee-panelRefs">
                {current.refs.map((ref, index) => (
                  <Link key={ref.slug} className="ee-ref" href={`/work/${ref.slug}`}>
                    <span className="ee-refI">{String(index + 1).padStart(2, "0")}</span>
                    <span>{ref.title}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <div className="ee-mobile">
        <ul className="ee-mList">
          {elements.map((element, index) => {
            const open = openMobile === index;
            return (
              <li className="ee-mItem" key={element.name}>
                <h2 className="ee-mHeading">
                  <button
                    type="button"
                    className="ee-mRow"
                    aria-expanded={open}
                    onClick={() => setOpenMobile(open ? null : index)}
                  >
                    <span className="ee-mName">( {element.name} )</span>
                    <span className="ee-mSign" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      className="ee-mPanel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="ee-mPanelInner">
                        <div className="ee-mStrip">
                          {element.images.slice(0, 4).map((src) => (
                            <figure className="ee-mCrop" key={src}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={src} alt={`${element.name} detail`} />
                            </figure>
                          ))}
                        </div>
                        <p className="ee-mDesc">{element.description}</p>
                        <div className="ee-mRefsLabel">Seen in</div>
                        <div className="ee-mRefs">
                          {element.refs.map((ref, refIndex) => (
                            <Link
                              key={ref.slug}
                              className="ee-mRef"
                              href={`/work/${ref.slug}`}
                            >
                              <span className="ee-mRefI">
                                {String(refIndex + 1).padStart(2, "0")}
                              </span>
                              <span>{ref.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
