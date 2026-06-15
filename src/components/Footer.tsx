import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '@/data/projects';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="font-semibold text-zinc-400 transition hover:text-[#7CFE2D] focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
          >
            Work
          </Link>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-zinc-400 transition hover:text-[#7CFE2D] focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
            aria-label="GitHub"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-zinc-400 transition hover:text-[#FF2F92] focus:outline-none focus:ring-2 focus:ring-[#FF2F92]"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
