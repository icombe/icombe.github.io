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
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#3f8f10]"
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
