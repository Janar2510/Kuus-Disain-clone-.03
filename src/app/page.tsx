import { ProjectCarousel } from "@/components/site/ProjectCarousel";
import { Preloader } from "@/components/site/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <ProjectCarousel />
    </>
  );
}
