import { Link, NavLink } from 'react-router-dom';
import { profile } from '@/data/projects';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'border border-[#7CFE2D] bg-[#7CFE2D] px-3 py-2 text-sm font-black text-black transition-colors hover:bg-[#F4FF3A] focus:outline-none focus:ring-2 focus:ring-[#FF2F92]'
    : 'border border-white/10 bg-black/40 px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-[#7CFE2D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="border border-[#7CFE2D] bg-[#7CFE2D] px-3 py-2 text-sm font-black text-black transition hover:bg-[#F4FF3A] focus:outline-none focus:ring-2 focus:ring-[#FF2F92]"
        >
          {profile.name}
        </Link>
        <nav className="flex items-center gap-2" aria-label="Primary navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Work
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
