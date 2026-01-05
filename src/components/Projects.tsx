import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, Play, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "Market Signal Summarizer",
    description: "A financial analysis tool that aggregates market signals using multiple APIs. Features real-time data processing and AI-driven summaries to provide actionable insights to investors at any level.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "AI"],
    color: "from-palette-blue to-palette-deep",
    hoverColor: "hover:bg-gradient-to-r hover:from-palette-blue hover:to-palette-deep hover:bg-clip-text hover:text-transparent",
    accent: "palette-blue",
    link: "#", 
    video: "/videos/MarketSignalSummarizerVideo.mp4",
    github: "https://github.com/icombe/market-signal-summarizer"
  },
  {
    title: "Testing Equipment Repair Pipeline Dashboard",
    description: "A full‑stack dashboard aggregating multi‑DB repair data across seven stages. Delivered in five weeks, it normalizes disparate schemas, exposes a FastAPI service layer, and integrates with a React/TypeScript UI for fast, paginated filtering and lookups.",
    tags: ["FastAPI", "React", "TypeScript", "MySQL", "Ant Design"],
    color: "from-palette-green to-palette-blue",
    hoverColor: "hover:bg-gradient-to-r hover:from-palette-green hover:to-palette-blue hover:bg-clip-text hover:text-transparent",
    accent: "palette-green",
    link: "#",
    internalLink: "/projects/testing-equipment-repair-pipeline-dashboard",
    github: ""
  }
];

export default function Projects() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative z-10" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-1.5 w-32 mx-auto mb-6 bg-gradient-to-r from-palette-yellow via-palette-orange to-palette-deep rounded-full"
        />
        
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-6 font-display text-white"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <motion.span
            className="inline-block"
            whileHover={{ 
              color: "#fbb905",
              textShadow: "0 0 30px rgba(251, 185, 5, 0.6)",
              transition: { duration: 0.3 }
            }}
          >
            Selected Projects
          </motion.span>
        </motion.h2>
        <p className="text-lg text-gray-400">
          A collection of work that demonstrates my passion for building robust and scalable applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group relative"
          >
            <div className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl">
              {/* Animated gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Accent line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative flex flex-col md:flex-row gap-8 md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-3xl md:text-4xl font-bold text-white transition-all duration-700 ease-out group-hover:bg-gradient-to-r ${project.color} group-hover:bg-clip-text group-hover:text-transparent`}>
                      {project.title}
                    </h3>
                    
                    {/* Index number */}
                    <motion.span 
                      className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      0{index + 1}
                    </motion.span>
                  </div>
                  
                  <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <motion.span 
                        key={i} 
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.video ? (
                      <button 
                        onClick={() => setSelectedVideo(project.video)}
                        className="group/link flex items-center gap-2 text-white font-semibold hover:text-palette-blue transition-colors"
                      >
                        <span>Watch Demo</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Play size={20} />
                        </motion.div>
                      </button>
                    ) : (project as any).internalLink ? (
                      <Link 
                        to={(project as any).internalLink}
                        className="group/link flex items-center gap-2 text-white font-semibold hover:text-palette-blue transition-colors"
                      >
                        <span>View Details</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 text-white font-semibold hover:text-palette-blue transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>View Project</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </motion.a>
                    )}
                    
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
                        whileHover={{ scale: 1.05, x: 2 }}
                      >
                        <Github size={20} /> 
                        <span>Source</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error("Video failed to load", e);
                  // Optional: Show an error message to the user
                }}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
