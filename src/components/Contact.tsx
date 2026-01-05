import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative z-10" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: Header & Info */}
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
            className="h-1.5 w-32 mb-6 bg-gradient-to-r from-palette-green via-palette-blue to-palette-yellow rounded-full"
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
              Let's Build
            </motion.span>
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-palette-blue to-palette-green mt-2"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px rgba(6, 137, 228, 0.6)",
                transition: { duration: 0.3 }
              }}
            >
              Something Amazing
            </motion.span>
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            I'm currently open to new opportunities and exciting projects. 
            Whether you have a question, an idea, or just want to connect, 
            I'd love to hear from you!
          </p>

          {/* Resume CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 group/resume"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-palette-yellow/10">
                <FileText size={24} className="text-palette-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover/resume:text-palette-yellow transition-colors">
                  Resume Available
                </h3>
                <p className="text-sm text-gray-400">
                  Interested in my experience and background? Send me a message and I'll share my resume with you.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.a
              href="https://github.com/icombe"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                <Github size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-white transition-colors">GitHub</h3>
                <p className="text-gray-400 text-sm">@icombe</p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/iancombe/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-3 rounded-xl bg-palette-green/10 text-palette-green group-hover:scale-110 group-hover:bg-palette-green/20 transition-all duration-300">
                <Linkedin size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-palette-green transition-colors">LinkedIn</h3>
                <p className="text-gray-400 text-sm">Ian Combe</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Send a Message
          </h3>

          <motion.form
            action="https://formspree.io/f/mzzwdjwq"
            method="POST"
            className="relative"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus('submitting');
              
              const form = e.currentTarget;
              const formData = new FormData(form);
              
              try {
                const response = await fetch(form.action, {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'Accept': 'application/json'
                  }
                });
                
                if (response.ok) {
                  setStatus('success');
                  setFormState({ name: '', email: '', message: '' });
                  setTimeout(() => setStatus('idle'), 5000);
                } else {
                  setStatus('error');
                  setTimeout(() => setStatus('idle'), 5000);
                }
              } catch (error) {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
              }
            }}
          >
            <div className="grid gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-palette-blue focus:outline-none focus:ring-2 focus:ring-palette-blue/50 transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-palette-blue focus:outline-none focus:ring-2 focus:ring-palette-blue/50 transition-all"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={8}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-palette-blue focus:outline-none focus:ring-2 focus:ring-palette-blue/50 transition-all resize-none"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="group/btn relative px-10 py-5 rounded-full bg-palette-blue text-white font-bold text-lg overflow-hidden flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_40px_rgba(6,137,228,0.4)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-palette-green via-palette-yellow to-palette-blue translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-in-out" />
                <Mail size={22} className="relative z-10" />
                <span className="relative z-10">
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed to Send' : 'Send Message'}
                </span>
                {status === 'idle' && (
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Send size={18} />
                  </motion.div>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-palette-green text-center"
                >
                  Thank you! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-palette-orange text-center"
                >
                  Oops! Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
