import { ExternalLink, Github, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import GeometricIcon from '@/components/GeometricIcon';
import type { Project, ProjectMedia } from '@/data/projects';

type ProjectWriteupProps = {
  project: Project;
};

function MediaItem({ item }: { item: ProjectMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const frameClass =
    'mx-auto w-full max-w-5xl overflow-hidden border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl';

  if (item.type === 'video') {
    const startVideo = () => {
      void videoRef.current?.play();
      setHasStarted(true);
    };

    return (
      <figure className={frameClass}>
        <div className="relative bg-black p-3">
          <div className="relative aspect-video overflow-hidden border border-[#7CFE2D]/55 shadow-[0_0_18px_rgba(124,254,45,0.18),inset_0_0_0_1px_rgba(255,47,146,0.18)]">
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
              className="group absolute inset-0 flex items-center justify-center overflow-hidden bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D] focus:ring-inset"
              aria-label={`Play ${item.alt}`}
            >
              {item.poster ? (
                <img
                  src={item.poster}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.86] transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
                />
              ) : null}
              <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/12" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#7CFE2D] text-black shadow-[0_0_32px_rgba(124,254,45,0.55)] ring-4 ring-white/80 transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                <Play size={30} fill="currentColor" className="ml-1" />
              </span>
            </button>
          ) : null}
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className={frameClass}>
      <div className="bg-black p-3">
        <div className="relative overflow-hidden border border-[#7CFE2D]/55 shadow-[0_0_18px_rgba(124,254,45,0.18),inset_0_0_0_1px_rgba(255,47,146,0.18)]">
        <img src={item.src} alt={item.alt} loading="lazy" className="aspect-video w-full object-contain" />
        </div>
      </div>
    </figure>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-zinc-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 flex-none bg-[#7CFE2D]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectWriteup({ project }: ProjectWriteupProps) {
  return (
    <article className="border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7 lg:p-8">
      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <GeometricIcon tone="green" title={`${project.title} icon`} />
            <p className="text-sm font-semibold text-[#7CFE2D]">Case study</p>
          </div>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#7CFE2D]">
            {project.dateRange}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
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
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-2 bg-[#7CFE2D] px-3 py-2 text-sm font-black text-black transition hover:bg-[#F4FF3A] focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
            >
              <ExternalLink size={16} />
              Live
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
        <section className="border border-white/10 bg-black/35 p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#FF2F92]">Problem</h2>
          <p className="text-sm leading-6 text-zinc-300">{project.problem}</p>
        </section>
        <section className="border border-white/10 bg-black/35 p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#2DE2FF]">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="border border-white/10 bg-zinc-950 px-2.5 py-1 text-sm text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      {project.screenshots.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-4 text-center text-sm font-semibold text-[#7CFE2D]">Project media</h2>
          <div className="space-y-5">
            {project.screenshots.map((item) => (
              <MediaItem key={`${project.slug}-${item.src}`} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="border border-white/10 bg-black/35 p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#F4FF3A]">What I built</h2>
          <BulletList items={project.whatBuilt} />
        </section>
        <section className="border border-white/10 bg-black/35 p-5">
          <h2 className="mb-3 text-sm font-semibold text-[#FF2F92]">What was hard</h2>
          <BulletList items={project.whatWasHard} />
        </section>
      </div>

      <section className="mt-8 border-t border-white/10 pt-5">
        <h2 className="mb-3 text-sm font-semibold text-zinc-400">Links</h2>
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={`${project.slug}-${link.label}`}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:border-[#7CFE2D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
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
