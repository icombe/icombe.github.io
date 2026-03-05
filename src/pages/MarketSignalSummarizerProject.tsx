import { motion } from 'framer-motion';
import { ArrowLeft, Brain, ChartNoAxesCombined, Clock, Cpu, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Footer from '@/components/Footer';

export default function MarketSignalSummarizerProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      <CircuitBackground opacity={0.08} density={30} speed={1} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-palette-blue transition-colors mb-8 group"
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
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-palette-blue to-palette-deep bg-clip-text text-transparent mb-4">
            Market Signal Summarizer
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
            <span className="flex items-center gap-2"><Clock size={16} className="text-palette-yellow" /> Real-time insight workflow</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2"><Brain size={16} className="text-palette-blue" /> AI-assisted summary engine</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A financial analysis tool that aggregates multiple market signals and returns concise, actionable summaries for investors.
              The focus was reducing cognitive overhead while preserving traceability of insights.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 border border-white/10 rounded-lg p-3 text-sm flex items-center gap-2"><Database size={16} className="text-palette-green" /> Multi-source ingest</div>
              <div className="bg-black/30 border border-white/10 rounded-lg p-3 text-sm flex items-center gap-2"><Cpu size={16} className="text-palette-blue" /> FastAPI service layer</div>
              <div className="bg-black/30 border border-white/10 rounded-lg p-3 text-sm flex items-center gap-2"><Brain size={16} className="text-palette-yellow" /> AI summarization</div>
              <div className="bg-black/30 border border-white/10 rounded-lg p-3 text-sm flex items-center gap-2"><ChartNoAxesCombined size={16} className="text-palette-orange" /> UI insight cards</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm"
          >
            <div className="px-4 py-3 border-b border-white/10 text-sm text-gray-300">Demo walkthrough</div>
            <video
              src="/videos/MarketSignalSummarizerVideo.mp4"
              controls
              className="w-full h-[360px] md:h-[420px] object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
