export type ProjectMeta = {
  Year: string;
  Area: string;
  Location: string;
  Status: string;
};

export type Project = {
  slug: string;
  title: string;
  sub: string;
  meta: ProjectMeta;
  timeline: string;
  paragraphs: string[];
  next: string | null;
  images: string[];
  cover: string;
  video?: string;
};

type RawProject = {
  slug: string;
  title: string;
  sub: string;
  meta: Record<string, string>;
  timeline: string;
  paragraphs: string[];
  next: string | null;
  images: string[];
};

import rawData from "./projects.raw.json";

const raw = rawData as RawProject[];

const VIDEOS: Record<string, string> = {
  "aa-house": "/videos/aa-house-720.mp4",
  "am-house": "/videos/am-house-720.mp4",
};

/** Order used across the home carousel and the grid strips. */
export const projectOrder = [
  "aa-house",
  "am-house",
  "louver-house",
  "hy-house",
  "tv-house",
  "nsb-ps",
  "fr-house",
  "k-villa",
];

export const projects: Project[] = projectOrder.map((slug) => {
  const found = raw.find((p) => p.slug === slug);
  if (!found) throw new Error("Missing project data for " + slug);
  const meta = found.meta as ProjectMeta;
  return {
    ...found,
    meta,
    cover: found.images[0],
    video: VIDEOS[slug],
  };
});

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const nextProject = (slug: string): Project | undefined => {
  const current = getProject(slug);
  if (!current?.next) return undefined;
  return getProject(current.next);
};

export const residentialCount = projects.filter(
  (p) => p.sub === "Residential",
).length;
export const commercialCount = projects.filter(
  (p) => p.sub === "Commercial",
).length;

/** Short location label used by the search overlay and home strip. */
export const shortLocation = (project: Project) =>
  project.meta.Location.split(",")[0].trim();

export const featuredSlugs = ["aa-house", "louver-house", "nsb-ps"];
