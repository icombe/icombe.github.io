import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import CircuitBackground from './CircuitBackground';

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#050505]">
      <CircuitBackground opacity={0.15} density={40} speed={2} />
      
      {/* Gradient overlay for smooth transition to next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-6 font-display leading-none flex justify-center items-baseline">
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-palette-blue via-palette-green to-palette-orange block pb-2"
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
              className="inline-block w-4 h-16 md:h-32 bg-gradient-to-b from-palette-blue via-palette-green to-palette-orange ml-2 md:ml-4 align-middle"
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
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
