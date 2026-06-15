import Footer from '@/components/Footer';
import GeometricIcon from '@/components/GeometricIcon';
import ProjectGrid from '@/components/ProjectGrid';
import SiteHeader from '@/components/SiteHeader';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-9 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <GeometricIcon tone="cyan" title="Work archive icon" />
            <p className="text-sm font-semibold text-[#2DE2FF]">Project archive</p>
          </div>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl">Case studies</h1>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            Glass-panel snapshots of the projects I would talk through in an interview: the
            problem, the build, the interaction details, and the tradeoffs.
          </p>
        </div>
        <ProjectGrid />
      </main>
      <Footer />
    </div>
  );
}
