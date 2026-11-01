"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


type CustomSelectProps = {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
};

export function CustomSelect({
  label,
  name,
  options,
  placeholder = "Select",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((c) => Math.min(c + 1, options.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }
      if (event.key === "Enter" && cursor >= 0) {
        event.preventDefault();
        setValue(options[cursor]);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, options, cursor]);

  return (
    <div className="cs-wrapper" ref={wrapRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="cs-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        data-empty={value ? undefined : ""}
        onClick={() => {
          setOpen((current) => !current);
          setCursor(options.indexOf(value));
        }}
      >
        <span className="cs-triggerLabel">{value || placeholder}</span>
        <svg
          className={`cs-chevron${open ? " cs-chevronOpen" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            className="cs-list"
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {options.map((option, index) => (
              <li
                key={option}
                className={`cs-option${cursor === index ? " cs-optionActive" : ""}`}
                role="option"
                aria-selected={value === option}
                onMouseEnter={() => setCursor(index)}
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
