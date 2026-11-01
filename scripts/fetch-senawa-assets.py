#!/usr/bin/env python3
"""Download Senawa Studio's real imagery, fonts and video posters from the source site."""
import json
import os
import re
import subprocess
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
BASE = "https://senawastudio.com/_next/image?url="
SRC = "/tmp/senawa"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECTS = [
    "aa-house", "am-house", "louver-house", "hy-house",
    "tv-house", "nsb-ps", "fr-house", "k-villa",
]


def ids_from(path):
    s = open(path, encoding="utf-8").read()
    found = re.findall(r"https://notable-peccary-154\.convex\.cloud/api/storage/([0-9a-f\-]{36})", s)
    enc = re.findall(r"api%2Fstorage%2F([0-9a-f\-]{36})", s)
    order = []
    for u in found + enc:
        if u not in order:
            order.append(u)
    return order


def download(job):
    sid, out = job
    if os.path.exists(out) and os.path.getsize(out) > 20000:
        return out
    src = "https://notable-peccary-154.convex.cloud/api/storage/" + sid
    url = BASE + urllib.parse.quote(src, safe="") + "&w=1920&q=85"
    subprocess.run(["curl", "-s", "-A", UA, url, "-o", out], check=False)
    return out


def main():
    jobs = []
    manifest = {}
    for p in PROJECTS:
        order = ids_from(os.path.join(SRC, "proj-%s.html" % p))
        manifest[p] = order
        d = os.path.join(ROOT, "public/sites/senawa/work", p)
        os.makedirs(d, exist_ok=True)
        for i, sid in enumerate(order):
            jobs.append((sid, os.path.join(d, "%02d.jpg" % i)))
    with ThreadPoolExecutor(max_workers=8) as ex:
        list(ex.map(download, jobs))
    json.dump(manifest, open(os.path.join(ROOT, "docs/research/senawa/image-map.json"), "w"), indent=1)
    print("downloaded", len(jobs), "images for", len(PROJECTS), "projects")


if __name__ == "__main__":
    main()
