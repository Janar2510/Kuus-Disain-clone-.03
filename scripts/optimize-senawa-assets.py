#!/usr/bin/env python3
"""Re-fetch the project photography at deploy-friendly sizes.

The first pass pulled 1920px JPEGs (~51 MB, over the 32 MiB bundle limit).
Covers are re-fetched at 1200px and gallery frames at 1080px, which keeps the
real source photographs while fitting a hosted deploy.
"""
import json
import os
import subprocess
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
BASE = "https://senawastudio.com/_next/image?url="
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "docs/research/senawa/image-map.json")


def fetch(job):
    sid, out, width = job
    src = "https://notable-peccary-154.convex.cloud/api/storage/" + sid
    url = BASE + urllib.parse.quote(src, safe="") + "&w=%d&q=85" % width
    subprocess.run(["curl", "-s", "-A", UA, url, "-o", out], check=False)
    return out


def main():
    mapping = json.load(open(MANIFEST))
    jobs = []
    for slug, ids in mapping.items():
        directory = os.path.join(ROOT, "public/sites/senawa/work", slug)
        for index, sid in enumerate(ids):
            out = os.path.join(directory, "%02d.jpg" % index)
            jobs.append((sid, out, 1200 if index == 0 else 1080))
    with ThreadPoolExecutor(max_workers=8) as ex:
        list(ex.map(fetch, jobs))

    total = 0
    counts = 0
    for slug in mapping:
        directory = os.path.join(ROOT, "public/sites/senawa/work", slug)
        for name in os.listdir(directory):
            if name.endswith(".jpg"):
                total += os.path.getsize(os.path.join(directory, name))
                counts += 1
    print("re-fetched %d images, %.1f MB" % (counts, total / 1048576))


if __name__ == "__main__":
    main()
