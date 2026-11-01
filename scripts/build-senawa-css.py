#!/usr/bin/env python3
"""Merge every captured Senawa stylesheet with brace-aware parsing.

The source ships hashed CSS-module class names (e.g. Nav-module__bLoQaq__nav).
We rewrite each module hash to a short readable prefix so components can use
plain class names while keeping the original rules byte-for-byte.
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESEARCH = os.path.join(ROOT, "docs/research/senawa")
OUT = os.path.join(ROOT, "src/app/senawa.css")

MODULES = {
    "ProjectCarousel-module__LUcQ_q": "pc",
    "PortraitCarousel-module__2ZasNG": "pcar",
    "WorkGallery-module___2mu1W": "wgal",
    "ElementsExplorer-module__ubDeDW": "ee",
    "AwwwardsBadge-module___6FJsW": "aw",
    "PageTransition-module__kKDxmW": "pt",
    "SimplePreloader-module__hRAuAW": "sp",
    "ScrollReveal-module__ViwyzG": "sr",
    "ProjectVideo-module__NwGGCa": "pv",
    "CustomSelect-module__38KbJW": "cs",
    "WorkIndex-module__YlJzTW": "wi",
    "WorkGrid-module__eu5Cwq": "wg",
    "FadeImage-module__MlDS8a": "fi",
    "Logo-module__FeqWJG": "logo",
    "Footer-module__Grjkva": "ft",
    "Nav-module__bLoQaq": "nav",
    # page-level modules, one hash per route family
    "page-module__Ro7qTW": "pd",   # project detail
    "page-module__OSLHOG": "ct",   # contact
    "page-module__AB6CKq": "pr",   # process
    "page-module__VKYseq": "sv",   # services / press
    "page-module__ylPtNa": "st",   # studio
}
PREFIX_FALLBACK = {
    "Preloader": "pre",
    "SimplePreloader": "sp",
    "ProjectCarousel": "pc",
    "PortraitCarousel": "pcar",
    "WorkGallery": "wgal",
    "PageTransition": "pt",
}

FONT_FACES = """/* Real webfonts pulled from the source site (Inter + Sora, latin subsets). */
@font-face{font-family:Inter;font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/inter-latin.woff2) format("woff2")}
@font-face{font-family:Sora;font-style:normal;font-weight:100 800;font-display:swap;src:url(/fonts/sora-latin.woff2) format("woff2")}
"""


def split_rules(css: str):
    """Yield complete top-level rules, keeping nested at-rule bodies intact."""
    index = 0
    length = len(css)
    while index < length:
        brace = css.find("{", index)
        if brace == -1:
            break
        depth = 1
        cursor = brace + 1
        while cursor < length and depth:
            if css[cursor] == "{":
                depth += 1
            elif css[cursor] == "}":
                depth -= 1
            cursor += 1
        rule = css[index:cursor].strip()
        if rule:
            yield rule
        index = cursor


def rewrite(css: str) -> str:
    def repl(match: re.Match) -> str:
        prefix, hsh, name = match.group(1), match.group(2), match.group(3)
        short = MODULES.get("%s-module__%s" % (prefix, hsh))
        if short is None:
            short = PREFIX_FALLBACK.get(prefix, prefix.lower())
        return "%s-%s" % (short, name)

    pattern = re.compile(r"([A-Za-z0-9]+)-module__([A-Za-z0-9_]+)__([A-Za-z0-9_-]+)")
    css = pattern.sub(repl, css)
    # Any module token we could not map (e.g. dynamic) still needs stripping.
    css = re.sub(
        r"[A-Za-z0-9]+-module__[A-Za-z0-9_]+",
        lambda m: PREFIX_FALLBACK.get(m.group(0).split("-module__")[0], "pd"),
        css,
    )
    return css


def main():
    chunks = []
    for path in sorted(glob.glob("/tmp/senawa/css/*.css")):
        chunks.append(open(path, encoding="utf-8").read())
    combined = "\n".join(chunks)
    combined = re.sub(r"@font-face\{[^}]*\}", "", combined)

    seen = set()
    rules = []
    for rule in split_rules(combined):
        if rule in seen:
            continue
        seen.add(rule)
        rules.append(rule)

    modules_css = "\n".join(rules)
    with open(os.path.join(RESEARCH, "styles.css"), "w", encoding="utf-8") as fh:
        fh.write(modules_css)

    globals_css = open(os.path.join(RESEARCH, "source-globals.css"), encoding="utf-8").read()
    out = FONT_FACES + "\n" + rewrite(globals_css + "\n" + modules_css)
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(out)
    print("wrote", OUT, len(out), "bytes,", len(rules), "rules")


if __name__ == "__main__":
    main()
