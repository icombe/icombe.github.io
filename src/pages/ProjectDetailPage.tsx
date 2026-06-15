import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import ProjectWriteup from '@/components/ProjectWriteup';
import SiteHeader from '@/components/SiteHeader';
import { getProjectBySlug } from '@/data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams();

  if (slug === 'student-loan-tracker') {
    return <Navigate to="/projects/student-loan-analyzer" replace />;
  }

  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-[#7CFE2D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7CFE2D]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
        <ProjectWriteup project={project} />
      </main>
      <Footer />
    </div>
  );
}
