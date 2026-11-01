import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, nextProject, projects } from "@/lib/senawa/projects";
import { FadeImage } from "@/components/site/FadeImage";
import { PortraitCarousel } from "@/components/site/PortraitCarousel";
import { WorkGallery } from "@/components/site/WorkGallery";
import {
  DetailNav,
  OverviewText,
  ProjectMetaMobile,
  ProjectRail,
} from "@/components/site/ProjectRail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project | Senawa" };
  return {
    title: `${project.title} | Senawa`,
    description: project.paragraphs[0]?.slice(0, 160),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);
  const carouselImages = project.images.slice(1, 15);

  return (
    <main>
      <div className="pd-detail">
        <ProjectRail project={project} />

        <div className="pd-content">
          <section className="pd-heroSection">
            <FadeImage
              src={project.cover}
              alt={`${project.title}, ${project.sub}, ${project.meta.Year}`}
              fill
              sizes="(max-width: 1023px) 100vw, 70vw"
              priority
              instant
            />
          </section>

          <ProjectMetaMobile project={project} />

          <section className="pd-overview">
            <OverviewText project={project} />
            <div className="pd-overviewImage">
              <PortraitCarousel images={carouselImages} alt={project.title} />
            </div>
          </section>
        </div>
      </div>

      <WorkGallery
        images={project.video ? project.images.slice(0) : project.images.slice(1)}
        alt={project.title}
        video={project.video}
      />

      <DetailNav next={next ? { slug: next.slug, title: next.title } : null} />
    </main>
  );
}
