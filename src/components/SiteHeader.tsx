import { Link, NavLink } from 'react-router-dom';
import { profile } from '@/data/projects';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-2.5 py-1.5 text-base font-medium transition-colors',
    isActive
      ? 'bg-[#7CFE2D] text-gray-950'
      : 'text-gray-600 hover:bg-[#7CFE2D]/20 hover:text-gray-950',
  ].join(' ');

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="text-base font-semibold text-gray-950 transition-colors hover:text-[#3f8f10]">
          {profile.name}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Primary navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
