import { ExternalLink, Github, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Project, ProjectMedia } from '@/data/projects';

type ProjectWriteupProps = {
  project: Project;
};

function MediaItem({ item }: { item: ProjectMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const frameClass =
    'mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm';

  if (item.type === 'video') {
    const startVideo = () => {
      void videoRef.current?.play();
      setHasStarted(true);
    };

    return (
      <figure className={frameClass}>
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            autoPlay={hasStarted}
            controls={hasStarted}
            muted
            playsInline
            className="h-full w-full object-contain"
            aria-label={item.alt}
          >
            Your browser does not support the video tag.
          </video>
          {!hasStarted ? (
            <button
              type="button"
              onClick={startVideo}
              className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black text-white group"
              aria-label={`Play ${item.alt}`}
            >
              {item.poster ? (
                <img
                  src={item.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : null}
              <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#7CFE2D] text-gray-950 shadow-lg ring-4 ring-white/80 transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                <Play size={30} fill="currentColor" className="ml-1" />
              </span>
            </button>
          ) : null}
        </div>
      </figure>
    );
  }

  return (
    <figure className={frameClass}>
      <img src={item.src} alt={item.alt} className="aspect-video w-full object-contain" />
    </figure>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-gray-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#7CFE2D]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectWriteup({ project }: ProjectWriteupProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Project</p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-[#7CFE2D] hover:bg-[#7CFE2D]/10 hover:text-gray-950"
            >
              <Github size={16} />
              GitHub
            </a>
          ) : (
            <span className="inline-flex items-center rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500">
              GitHub: source not public yet
            </span>
          )}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-2 rounded-md bg-[#7CFE2D] px-3 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-[#68df24]"
            >
              <ExternalLink size={16} />
              Live
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Problem
          </h3>
          <p className="text-sm leading-6 text-gray-700">{project.problem}</p>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-sm text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      {project.screenshots.length > 0 ? (
        <section className="mt-8">
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
            Project Media
          </h3>
          <div className="space-y-5">
            {project.screenshots.map((item) => (
              <MediaItem key={`${project.slug}-${item.src}`} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            What I Built
          </h3>
          <BulletList items={project.whatBuilt} />
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            What Was Hard
          </h3>
          <BulletList items={project.whatWasHard} />
        </section>
      </div>

      <section className="mt-8 border-t border-gray-200 pt-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Links
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={`${project.slug}-${link.label}`}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-[#7CFE2D] hover:bg-[#7CFE2D]/10 hover:text-gray-950"
            >
              <ExternalLink size={16} />
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
