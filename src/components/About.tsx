import { motion } from 'framer-motion';
import { Code2, Globe, Terminal, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function About() {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative z-10" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1.5 w-32 mb-6 bg-gradient-to-r from-palette-blue via-palette-green to-palette-yellow rounded-full"
          />

          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display text-white leading-tight">
            <motion.span
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                color: "#0689e4",
                transition: { duration: 0.3 }
              }}
            >
              Building Elegant
            </motion.span>
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-palette-blue to-palette-green mt-2"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px rgba(6, 137, 228, 0.6)",
                transition: { duration: 0.3 }
              }}
            >
              Digital Solutions
            </motion.span>
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            I am a Computer Science student with a strong foundation in full-stack development. 
            I love building tools that solve real-world problems, from financial analysis apps 
            to interactive web experiences.
          </p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-4"
          >
            <motion.a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variants={itemVariants}
              className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-3 rounded-xl bg-palette-blue/10 text-palette-blue group-hover:scale-110 group-hover:bg-palette-blue/20 transition-all duration-300">
                <Terminal size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-palette-blue transition-colors">Clean Architecture</h3>
                <p className="text-gray-400 text-sm">Scalable, maintainable code following industry best practices.</p>
              </div>
            </motion.a>
            
            <motion.div 
              variants={itemVariants}
              className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-3 rounded-xl bg-palette-green/10 text-palette-green group-hover:scale-110 group-hover:bg-palette-green/20 transition-all duration-300">
                <Code2 size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-palette-green transition-colors">Full-Stack Expertise</h3>
                <p className="text-gray-400 text-sm">From database design to pixel-perfect frontend implementations.</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-3 rounded-xl bg-palette-yellow/10 text-palette-yellow group-hover:scale-110 group-hover:bg-palette-yellow/20 transition-all duration-300">
                <Zap size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-palette-yellow transition-colors">Performance First</h3>
                <p className="text-gray-400 text-sm">Optimized for lightning-fast load times and smooth interactions.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual / Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-palette-blue/20 via-palette-green/10 to-palette-yellow/20 blur-3xl rounded-full opacity-50" />
          <motion.div 
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-white/20 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-palette-blue/0 via-palette-green/0 to-palette-blue/0 group-hover:from-palette-blue/5 group-hover:via-palette-green/5 group-hover:to-palette-yellow/5 transition-all duration-700" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <motion.div 
                className="flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-palette-blue/30 group/stat h-full"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover/stat:text-palette-blue transition-colors"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  B.S. CS
                </motion.div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Education</div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-palette-green/30 group/stat h-full"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-palette-green mb-2 group-hover/stat:scale-110 transition-transform"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  Full Stack
                </motion.div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Developer</div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-palette-yellow/30 group/stat h-full"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-palette-yellow mb-2 group-hover/stat:scale-110 transition-transform"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  Py & React
                </motion.div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Core Tech</div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-palette-orange/30 group/stat h-full"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-palette-orange mb-2 group-hover/stat:scale-110 transition-transform"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  Web & AI
                </motion.div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Focus</div>
              </motion.div>
            </div>

            <div className="relative pt-8 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-gray-300 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-palette-blue group-hover/item:scale-110 transition-transform" />
                    <span className="font-medium">Remote Worldwide</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-gray-300 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center gap-2">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-palette-green"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-medium">Open to Work</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
