import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#050505]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(6,137,228,0.22),transparent_46%),radial-gradient(circle_at_80%_20%,rgba(113,171,35,0.16),transparent_44%),radial-gradient(circle_at_50%_78%,rgba(251,185,5,0.14),transparent_50%)]" />
        <motion.div
          className="absolute -top-20 -left-24 w-[460px] h-[460px] rounded-full bg-palette-blue/15 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-palette-green/12 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] rounded-full bg-palette-yellow/10 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Gradient overlay for smooth transition to next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505] pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-[10rem] font-bold tracking-tighter mb-6 font-display leading-tight flex justify-center items-baseline">
            <motion.span 
              className="text-palette-blue inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {"Ian Combe".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                times: [0, 0.5, 0.5, 1],
                ease: "linear" 
              }}
              className="inline-block w-4 h-16 md:h-32 bg-palette-blue ml-2 md:ml-4 align-middle"
            />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4"
        >
          <span className="inline-block text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-palette-green via-palette-yellow to-palette-orange animate-gradient-x">
            Computer Science Student
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-100 mb-12 font-light tracking-wide max-w-2xl mx-auto cursor-default"
        >
          Crafting digital experiences with elegant code and design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-10 py-4 bg-palette-blue text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,137,228,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-palette-deep to-palette-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="group px-10 py-4 border-2 border-white/20 text-white rounded-full font-semibold hover:bg-white/5 hover:border-white/40 transition-all hover:scale-105 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-palette-blue/10 to-palette-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get in Touch</span>
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        aria-label="Scroll to About section"
        className="absolute bottom-5 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/90 transition-colors cursor-pointer p-2 rounded-full bg-black/20 backdrop-blur-sm"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </motion.button>
    </div>
  );
}
