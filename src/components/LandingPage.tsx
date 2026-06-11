import { ArrowRight, FileText, Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '@/data/projects';

type HomeAction =
  | {
      label: string;
      href: string;
      icon: LucideIcon;
      primary?: boolean;
      external?: boolean;
    }
  | {
      label: string;
      to: string;
      icon: LucideIcon;
      primary?: boolean;
    };

const homeActions: HomeAction[] = [
  { label: 'Resume', href: profile.links.resume, icon: FileText, primary: true },
  { label: 'Projects', to: '/projects', icon: ArrowRight, primary: true },
  { label: 'GitHub', href: profile.links.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin, external: true },
];

export default function LandingPage() {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <section className="mx-auto grid min-h-[calc(100vh-141px)] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
          Portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-6xl">
          {profile.name}
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.roles.map((role) => (
            <span
              key={role}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-700">
          {profile.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {homeActions.map((action) => {
            const Icon = action.icon;
              const className = [
                'inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
                action.primary
                  ? 'bg-[#7CFE2D] text-gray-950 shadow-sm hover:bg-[#68df24]'
                  : 'border border-gray-300 bg-white text-gray-800 hover:border-[#7CFE2D] hover:bg-[#7CFE2D]/10 hover:text-gray-950',
            ].join(' ');

            if ('to' in action) {
              return (
                <Link key={action.label} to={action.to} className={className}>
                  <Icon size={17} />
                  {action.label}
                </Link>
              );
            }

            return (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={className}
              >
                <Icon size={17} />
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="justify-self-start lg:justify-self-end">
        <figure className="w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ring-4 ring-[#7CFE2D]/20 sm:w-72">
          {hasPhoto ? (
            <img
              src="/assets/images/ian-combe-headshot.png"
              alt="Ian Combe"
              className="aspect-[4/5] w-full object-cover"
              onError={() => setHasPhoto(false)}
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 text-5xl font-semibold text-gray-400">
              IC
            </div>
          )}
        </figure>
      </div>
    </section>
  );
}
