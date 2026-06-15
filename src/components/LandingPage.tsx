import { lazy, Suspense } from 'react';
import { ArrowDownRight, ArrowRight, FileText, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditorialSidebar from '@/components/EditorialSidebar';
import GeometricIcon from '@/components/GeometricIcon';
import ProjectGrid from '@/components/ProjectGrid';
import { profile } from '@/data/projects';

const ThreeHeroCanvas = lazy(() => import('@/components/ThreeHeroCanvas'));

const actions = [
  { label: 'Resume', href: profile.links.resume, icon: FileText, primary: true },
  { label: 'GitHub', href: profile.links.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin, external: true },
];

export default function LandingPage() {
  return (
    <div className="grid min-h-screen w-full overflow-x-hidden bg-[#030303] text-white lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="order-2 lg:order-1">
        <EditorialSidebar />
      </div>

      <div className="order-1 min-w-0 lg:order-2">
        <section className="relative min-h-[720px] overflow-hidden border-b border-white/10 px-4 py-10 sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:54px_54px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[#7CFE2D]" />

          <div className="relative z-10 grid min-h-[640px] items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <GeometricIcon tone="pink" title="Hero icon" />
                <span className="border border-[#FF2F92] bg-[#FF2F92]/12 px-3 py-1.5 text-sm font-semibold text-[#FFD2E8]">
                  Project portfolio
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                Passionate about solving tough problems across the whole stack.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                I build practical software with clean interfaces, responsive interactions, and
                workflows that make complex tasks feel direct.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 bg-[#7CFE2D] px-4 py-3 text-sm font-black text-black transition hover:bg-[#F4FF3A] focus:outline-none focus:ring-2 focus:ring-[#FF2F92]"
                >
                  View projects
                  <ArrowRight size={18} />
                </Link>
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 border border-white/15 bg-black/50 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-[#7CFE2D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
                    >
                      <Icon size={18} />
                      {action.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="relative h-[430px] min-w-0 sm:h-[460px] lg:h-[620px]">
              <Suspense
                fallback={
                  <div className="grid h-full place-items-center border border-white/10 bg-black/60 text-sm text-zinc-500">
                    Loading 3D signal...
                  </div>
                }
              >
                <ThreeHeroCanvas />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-4 py-10 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <GeometricIcon tone="green" title="Projects icon" />
                <p className="text-sm font-semibold text-[#7CFE2D]">Case studies</p>
              </div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Selected builds</h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex w-fit items-center gap-2 border border-[#7CFE2D] px-3 py-2 text-sm font-semibold text-[#7CFE2D] transition hover:bg-[#7CFE2D] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
            >
              All case studies
              <ArrowDownRight size={16} />
            </Link>
          </div>
          <ProjectGrid />
        </section>
      </div>
    </div>
  );
}
