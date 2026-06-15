import { FileText, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data/projects';
import GeometricIcon from '@/components/GeometricIcon';

const contactLinks = [
  { label: 'Resume', href: profile.links.resume, icon: FileText },
  { label: 'GitHub', href: profile.links.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin, external: true },
];

export default function EditorialSidebar() {
  return (
    <aside className="border-b border-zinc-800 bg-[#050505] p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-6">
      <div className="grid h-full content-start gap-8">
        <section className="border-b border-zinc-800 pb-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <GeometricIcon tone="green" title="Profile mark" />
            <p className="text-right text-xs text-zinc-500">2026 edition</p>
          </div>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-end lg:grid-cols-1">
            <div>
              <p className="font-serif text-4xl leading-none text-white sm:text-5xl lg:text-4xl">
                Ian
                <br />
                Combe
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{profile.summary}</p>
            </div>

            <div className="relative aspect-[4/5] w-36 overflow-hidden border border-[#7CFE2D]/50 bg-black shadow-[0_0_32px_rgba(124,254,45,0.14)] sm:w-40 md:ml-auto md:w-full lg:ml-0 lg:w-36">
              <img
                src={profile.image}
                alt={`${profile.name} profile`}
                className="h-full w-full object-cover grayscale-[0.18] contrast-110"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 border border-white/10" />
            </div>
          </div>
        </section>

        <section className="grid gap-3 border-b border-zinc-800 pb-6">
          <h2 className="text-sm font-semibold text-[#7CFE2D]">Target roles</h2>
          <div className="grid gap-2">
            {profile.roles.map((role) => (
              <span
                key={role}
                className="border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200"
              >
                {role}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-3">
          <h2 className="text-sm font-semibold text-[#FF2F92]">Contact</h2>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-3 border border-zinc-800 bg-black px-3 py-3 text-sm text-zinc-300 transition-colors hover:border-[#7CFE2D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
                >
                  <span>{link.label}</span>
                  <Icon size={16} className="text-[#7CFE2D] transition-transform group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
