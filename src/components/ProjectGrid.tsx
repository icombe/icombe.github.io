import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '@/data/projects';
import GeometricIcon from '@/components/GeometricIcon';

const tones: Array<'green' | 'pink' | 'yellow' | 'cyan'> = ['green', 'pink', 'yellow', 'cyan'];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const preview = project.screenshots.find((item) => item.poster)?.poster ?? project.screenshots[0]?.src;
  const tone = tones[index % tones.length];

  return (
    <article className="group grid overflow-hidden border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#7CFE2D]/70 hover:bg-white/[0.08]">
      {preview ? (
        <Link to={`/projects/${project.slug}`} className="block border-b border-white/10 bg-black/35 p-2">
          <div className="overflow-hidden border border-[#7CFE2D]/55 shadow-[0_0_18px_rgba(124,254,45,0.16),inset_0_0_0_1px_rgba(255,47,146,0.18)]">
            <img
              src={preview}
              alt={`${project.title} interface preview`}
              loading="lazy"
              className="aspect-video w-full object-cover opacity-[0.88] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
            />
          </div>
        </Link>
      ) : null}

      <div className="grid gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs text-zinc-500">Case study 0{index + 1}</p>
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7CFE2D]">
              {project.dateRange}
            </p>
          </div>
          <GeometricIcon tone={tone} title={`${project.title} icon`} />
        </div>

        <p className="text-sm leading-6 text-zinc-300">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="border border-white/10 bg-black/35 px-2.5 py-1 text-xs text-zinc-300">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 bg-[#7CFE2D] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#F4FF3A] focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
          >
            Read case study
            <ArrowUpRight size={16} />
          </Link>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:border-[#FF2F92] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF2F92]"
            >
              <Github size={16} />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid({ limit }: { limit?: number }) {
  const visibleProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleProjects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
