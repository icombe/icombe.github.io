import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Monitor, ShieldCheck, Sparkles, Video, Workflow, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Footer from '@/components/Footer';

export default function StudentLoanAnalyzerProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      <CircuitBackground opacity={0.08} density={28} speed={1} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-palette-yellow transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl leading-[1.2] pb-1 font-bold font-display bg-gradient-to-r from-palette-yellow via-palette-orange to-palette-blue bg-clip-text text-transparent">
              Student Loan Tracker
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
            <span className="flex items-center gap-2"><Clock size={16} className="text-palette-blue" /> Full desktop workflow + web beta preview</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2"><Monitor size={16} className="text-palette-green" /> Multi-screen repayment management</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-palette-yellow" /> Accessibility-first UX</span>
          </div>
        </motion.div>

        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm mb-8"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-sm text-gray-300">
              <Video size={16} className="text-palette-yellow" /> Full App Walkthrough
            </div>
            <video
              src="/videos/LoanTrackerDemo.mp4"
              controls
              className="w-full h-[360px] md:h-[440px] object-contain bg-black"
            >
              Student Loan Tracker demo video will be added here.
            </video>
            <div className="px-4 py-3 border-t border-white/10 text-sm text-gray-400">
              This video showcases the full desktop Student Loan Tracker workflow: dashboard analytics, loan management, planner strategies, payment logging, tips, and settings controls.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm shadow-2xl">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                <h2 className="text-base md:text-lg font-semibold text-white">Live Web Demo (Beta Build)</h2>
                <span className="text-xs text-gray-400">Embedded browser-safe preview</span>
              </div>
              <iframe
                title="Student Loan Tracker embedded beta demo"
                src="/loan-analyzer/index.html"
                className="w-full h-[900px] lg:h-[980px] bg-black"
                loading="lazy"
              />
              <div className="px-4 py-3 border-t border-white/10 text-sm text-gray-300">
                This is a simplified web beta for live testing. The full desktop app includes persistence, full navigation, payment workflows, settings controls, and richer planning interactions.
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Sparkles className="text-palette-yellow" size={20} />
                Product Highlights
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>• Complete multi-screen flow: Dashboard, Loans, Planner, Payments, Tips, and Settings.</li>
                <li>• Loan lifecycle support: add, edit, delete, progress tracking, and payoff confirmation flow.</li>
                <li>• Strategy planning with avalanche/snowball/minimum options, extra payments, and payment frequency.</li>
                <li>• Accessible controls with readable hierarchy, keyboard-friendly interactions, and reduced-motion support.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm h-full">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Code2 className="text-palette-blue" size={20} />
                Technologies & Architecture
              </h2>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                Built with React + TypeScript + Vite and packaged as a Tauri desktop application. The project combines local-first persistence, structured repayment logic, and a polished interface tuned for quick financial decision-making.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Tauri', 'Local Persistence', 'Accessibility'].map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Workflow className="text-palette-blue" size={20} />
                Expansion Roadmap
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>• Add side-by-side scenario comparison and saved planning snapshots.</li>
                <li>• Expand historical analytics and long-term trend visualizations.</li>
                <li>• Continue accessibility hardening with deeper assistive-tech testing.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
