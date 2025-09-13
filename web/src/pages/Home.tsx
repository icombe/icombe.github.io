import Hero from "../components/Hero";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects title="Projects" endpoint="/api/projects" basePath="/projects" />
      <Projects title="Games" endpoint="/api/games" basePath="/games" />
    </>
  );
}