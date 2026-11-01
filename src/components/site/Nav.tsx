"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, studio } from "@/lib/senawa/content";
import {
  commercialCount,
  projects,
  residentialCount,
  featuredSlugs,
  shortLocation,
} from "@/lib/senawa/projects";
import { SenawaWordmark } from "./BrandMark";

const featured = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const open = menuOpen || searchOpen;
    document.documentElement.classList.toggle("no-scroll", open);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? projects.filter((p) =>
          `${p.title} ${p.sub} ${p.meta.Location} ${p.meta.Year}`
            .toLowerCase()
            .includes(q),
        )
      : projects;
    return list;
  }, [query]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((c) => Math.min(c + 1, results.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (event.key === "Enter" && results[cursor]) {
        router.push(`/work/${results[cursor].slug}`);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, results, cursor, router]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMenuOpen(false);
  }, []);

  const drawerTransition = reduce
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <nav
      className={`nav-nav${isHome ? " nav-navHome" : ""}${
        scrolled ? " nav-scrolled" : ""
      }${menuOpen ? " nav-navMenuOpen" : ""}`}
      aria-label="Primary"
    >
      <div className="nav-inner">
        <button
          type="button"
          className={`nav-menuTrigger${menuOpen ? " nav-menuTriggerOpen" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-burger" aria-hidden="true">
            <span className="nav-burgerLine" />
            <span className="nav-burgerLine" />
            <span className="nav-burgerLine" />
          </span>
        </button>

        <Link className="nav-wordmark" href="/" aria-label="Senawa home">
          <SenawaWordmark width={116} height={16} />
        </Link>

        <button
          type="button"
          className="nav-searchTrigger"
          aria-label="Search projects"
          onClick={openSearch}
        >
          <svg
            className="nav-searchIcon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
            <line
              x1="12.5"
              y1="12.5"
              x2="16.5"
              y2="16.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={`nav-backdrop${menuOpen ? " nav-open" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <motion.aside
        id="site-menu"
        className="nav-drawer"
        aria-hidden={!menuOpen}
        aria-label="Menu"
        initial={false}
        animate={{ x: menuOpen ? 0 : "-100%" }}
        transition={drawerTransition}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <button
          type="button"
          className="nav-drawerClose"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        >
          <span />
        </button>
        <span className="nav-drawerLabel" id="site-menu-label">
          Menu
        </span>
        <nav className="nav-drawerNav" aria-labelledby="site-menu-label">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-drawerLink${
                pathname === link.href ? " nav-drawerLinkActive" : ""
              }`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="nav-drawerSearch"
            onClick={openSearch}
            tabIndex={menuOpen ? 0 : -1}
          >
            Search
          </button>
        </nav>
        <div className="nav-drawerFoot">
          <a
            href={`mailto:${studio.email}`}
            className="nav-drawerEmail"
            tabIndex={menuOpen ? 0 : -1}
          >
            {studio.email}
          </a>
          <span className="nav-drawerMeta">BSD, Tangerang Selatan</span>
        </div>
      </motion.aside>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            className="nav-searchOverlay"
            role="dialog"
            aria-modal="true"
            aria-label="Search projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          >
            <div className="nav-searchBar">
              <span className="nav-searchBrand" aria-hidden="true">
                <SenawaWordmark width={98} height={16} />
              </span>
              <span className="nav-searchBarRight">
                <span className="nav-searchEsc">Esc to close</span>
                <button
                  type="button"
                  className="nav-searchClose"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                >
                  <span />
                </button>
              </span>
            </div>

            <div className="nav-searchWrap">
              <div className="nav-searchField">
                <svg
                  className="nav-searchFieldIcon"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="9.778" cy="9.778" r="7.333" stroke="currentColor" strokeWidth="1.222" />
                  <line
                    x1="15.278"
                    y1="15.278"
                    x2="20.167"
                    y2="20.167"
                    stroke="currentColor"
                    strokeWidth="1.222"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  className="nav-searchInput"
                  placeholder="Search projects…"
                  autoComplete="off"
                  spellCheck={false}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="search-results"
                  aria-autocomplete="list"
                  aria-label="Search projects"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setCursor(0);
                  }}
                />
              </div>

              <div className="nav-searchContent">
                <div id="search-results" className="nav-searchListbox" role="listbox" aria-label="Projects">
                  <div className="nav-searchGroup" role="group" aria-labelledby="search-label">
                    <div className="nav-searchSectLabel" role="presentation">
                      <span id="search-label" className="nav-searchLbl">
                        {query.trim() ? "Results" : "Featured"}
                      </span>
                    </div>
                    {(query.trim() ? results : featured).map((project, index) => (
                      <Link
                        key={project.slug}
                        className={`nav-searchItem${
                          cursor === index ? " nav-searchItemActive" : ""
                        }`}
                        id={`search-opt-${index}`}
                        role="option"
                        aria-selected={cursor === index}
                        href={`/work/${project.slug}`}
                        onMouseEnter={() => setCursor(index)}
                        onClick={() => setSearchOpen(false)}
                      >
                        <span className="nav-searchArrow" aria-hidden="true">
                          →
                        </span>
                        <span className="nav-searchItemTitle">
                          {project.title}
                          <span className="nav-searchItemLoc">
                            {shortLocation(project)}
                          </span>
                        </span>
                        <span className="nav-searchItemMeta">
                          {project.sub} · {project.meta.Year}
                        </span>
                      </Link>
                    ))}
                    {query.trim() && results.length === 0 ? (
                      <p className="nav-searchEmpty">No projects match “{query}”.</p>
                    ) : null}
                  </div>

                  <div className="nav-searchGroup">
                    <div className="nav-searchSectLabel">
                      <span className="nav-searchLbl">Browse by type</span>
                    </div>
                    <div className="nav-searchTypeWrap">
                      <button
                        type="button"
                        className="nav-searchTypeCell"
                        onClick={() => setQuery("Residential")}
                      >
                        <span className="nav-searchTypeName">Residential</span>
                        <span className="nav-searchTypeCount">
                          {String(residentialCount).padStart(2, "0")}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="nav-searchTypeCell"
                        onClick={() => setQuery("Commercial")}
                      >
                        <span className="nav-searchTypeName">Commercial</span>
                        <span className="nav-searchTypeCount">
                          {String(commercialCount).padStart(2, "0")}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-searchLegend">
              <span className="nav-searchLegendItem">
                <kbd className="nav-kbd">↑</kbd>
                <kbd className="nav-kbd">↓</kbd>
                <b>Navigate</b>
              </span>
              <span className="nav-searchLegendItem">
                <kbd className="nav-kbd">↵</kbd>
                <b>Open</b>
              </span>
              <span className="nav-searchLegendItem">
                <kbd className="nav-kbd">esc</kbd>
                <b>Close</b>
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
