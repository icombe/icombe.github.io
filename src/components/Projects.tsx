import ProjectWriteup from '@/components/ProjectWriteup';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectWriteup key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
