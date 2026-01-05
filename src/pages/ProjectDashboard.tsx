import { motion } from 'framer-motion';
import { ArrowLeft, Database, Server, Layout, Users, Clock, CheckCircle, ArrowRight, GitBranch, MessageSquare, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Footer from '@/components/Footer';

export default function ProjectDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stack = [
    "FastAPI", "Python", "MySQL", "React", "TypeScript",
    "Vite", "Ant Design", "GitHub", "Jira"
  ];

  const contributions = [
    { title: "Backend Architecture", text: "Designed data models and REST endpoints with Pydantic, authored SQL schemas, and enforced clear API contracts." },
    { title: "Cross-Stack Integration", text: "Solved pagination and data‑shape mismatches so large datasets rendered correctly and quickly in the UI." },
    { title: "Scrum Leadership", text: "Facilitated stand‑ups, sprint planning, and retros; managed Jira board; kept scope and velocity aligned with client priorities." },
    { title: "Scope Negotiation", text: "De‑scoped historical charts in favor of high‑value operational metrics to meet the 5-week deadline." },
    { title: "Stakeholder Communication", text: "Translated technical progress into business outcomes during frequent demos and status updates." },
    { title: "Team Enablement", text: "Unblocked teammates via environment setup help, code reviews, and pair‑debugging." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      <CircuitBackground opacity={0.1} density={30} speed={1} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-palette-green transition-colors mb-8 group"
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
            <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-palette-green to-palette-blue bg-clip-text text-transparent">
              Testing Equipment Repair Pipeline Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
            <span className="flex items-center gap-2"><Users size={16} className="text-palette-blue" /> Qualcomm Field Session</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2"><Clock size={16} className="text-palette-yellow" /> 5 Weeks</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="flex items-center gap-2"><Users size={16} className="text-palette-orange" /> 3 Developers</span>
          </div>
        </motion.div>

        {/* Hero Section: Image + Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm h-full">
              <img 
                src="/assets/images/dashboard-thumbnail.jpg" 
                alt="Dashboard Interface" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Target className="text-palette-orange" size={20} />
                The Challenge
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Qualcomm manages thousands of Internal Test Equipment (ITE) units globally. Downtime impacts modem feature development. They needed a way to track repair components across 7 pipeline stages (Ordered → Deployed) to establish SLAs and estimate repair times.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Layout className="text-palette-green" size={20} />
                The Solution
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                A full‑stack dashboard aggregating data from multiple disparate databases. It visualizes component counts and estimated times for each stage, providing a unified view for stakeholders to monitor pipeline health.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Col: Key Contributions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="text-palette-blue" />
              Key Contributions
            </h2>
            <ul className="space-y-4">
              {contributions.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-palette-green flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{item.title}:</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Col: Tech Stack & Process */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Server className="text-palette-green" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-palette-green/50 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MessageSquare className="text-palette-yellow" />
                Process & Leadership
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                This project was a crash course in <strong>Agile development</strong>. As the Scrum Lead, I managed the iterative cycle:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-center">
                  <span className="block text-palette-blue font-bold mb-1">MVP Focus</span>
                  <span className="text-xs text-gray-400">Negotiated scope to hit deadlines</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-center">
                  <span className="block text-palette-orange font-bold mb-1">Communication</span>
                  <span className="text-xs text-gray-400">Weekly client demos & feedback</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom: Data Aggregation Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/10 backdrop-blur-sm text-center"
        >
          <h2 className="text-2xl font-bold mb-8">Data Aggregation Architecture</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Sources */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                <Database size={20} className="text-gray-400" />
                <span className="text-sm text-gray-300">Ordering DB</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                <Database size={20} className="text-gray-400" />
                <span className="text-sm text-gray-300">Inventory DB</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                <Database size={20} className="text-gray-400" />
                <span className="text-sm text-gray-300">Repair DB</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <ArrowRight size={32} className="text-palette-blue animate-pulse" />
            </div>
            <div className="md:hidden">
              <ArrowRight size={32} className="text-palette-blue animate-pulse rotate-90" />
            </div>

            {/* Processing */}
            <div className="flex flex-col items-center bg-black/40 p-6 rounded-xl border border-palette-blue/30 shadow-[0_0_30px_rgba(6,137,228,0.1)]">
              <Server size={40} className="text-palette-blue mb-3" />
              <span className="font-bold text-white">FastAPI Service</span>
              <span className="text-xs text-gray-400 mt-1">Normalization & Logic</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <ArrowRight size={32} className="text-palette-green animate-pulse" />
            </div>
            <div className="md:hidden">
              <ArrowRight size={32} className="text-palette-green animate-pulse rotate-90" />
            </div>

            {/* Output */}
            <div className="flex flex-col items-center bg-black/40 p-6 rounded-xl border border-palette-green/30 shadow-[0_0_30px_rgba(113,171,35,0.1)]">
              <Layout size={40} className="text-palette-green mb-3" />
              <span className="font-bold text-white">React Dashboard</span>
              <span className="text-xs text-gray-400 mt-1">Unified View</span>
            </div>
          </div>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
