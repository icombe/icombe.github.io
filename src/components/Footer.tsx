import { Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '@/data/projects';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/projects" className="font-medium text-gray-600 hover:text-[#3f8f10]">
            Projects
          </Link>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-[#3f8f10]"
            aria-label="GitHub"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-[#3f8f10]"
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
