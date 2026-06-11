import Footer from '@/components/Footer';
import ProjectWriteup from '@/components/ProjectWriteup';
import SiteHeader from '@/components/SiteHeader';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
            Selected Projects
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Project Work</h1>
          <p className="mt-4 text-base leading-7 text-gray-700">
            Project writeups with enough detail for a quick technical read: the problem, stack,
            media, implementation notes, and the rough parts.
          </p>
        </div>
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectWriteup key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
