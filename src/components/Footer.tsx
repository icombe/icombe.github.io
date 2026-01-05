import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAchievement } from '@/context/AchievementContext';
import { trackSocialClick } from '@/lib/achievementTracking';
import { unlockAchievement } from '@/lib/easterEggs';
import { trackNavigationClick } from '@/lib/navigationTracking';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { showAchievementPopup } = useAchievement();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/icombe', label: 'GitHub', color: 'hover:text-white', platform: 'github' as const },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/iancombe/', label: 'LinkedIn', color: 'hover:text-palette-green', platform: 'linkedin' as const },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const id = href.substring(1);
      trackNavigationClick(id, showAchievementPopup);
      
      // If not on home page, navigate to home first, then scroll
      if (window.location.pathname !== '/') {
        // Navigate to home with hash
        window.location.href = '/' + href;
      } else {
        // Already on home, just scroll
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleSocialClick = (platform: 'github' | 'linkedin') => {
    trackSocialClick(platform, showAchievementPopup);
  };

  return (
    <footer className="py-16 relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3 
              onClick={() => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/';
                } else {
                  const landing = document.getElementById('landing');
                  if (landing) {
                    landing.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="text-2xl font-bold cursor-pointer relative inline-block overflow-hidden group"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-palette-blue to-palette-green">
                Ian Combe
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-palette-blue via-palette-green to-palette-yellow bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                style={{ backgroundSize: '200% 100%', animation: 'gradientSweep 2s linear infinite' }}>
                Ian Combe
              </span>
            </motion.h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Engineer crafting innovative digital experiences with modern technologies.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-palette-green animate-pulse" />
              <span className="text-gray-400">Available for opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-gray-400 hover:text-palette-blue transition-colors text-sm w-fit group"
                  whileHover={{ x: 5 }}
                >
                  <span className="group-hover:underline underline-offset-4">{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => handleSocialClick(social.platform)}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-3 rounded-xl bg-white/5 ${social.color} transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Feel free to reach out for collaborations, opportunities, or just to say hi!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} Ian Combe. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link
                to="/achievements"
                className="flex items-center gap-1 hover:text-palette-yellow transition-colors group"
              >
                <Trophy size={12} className="group-hover:scale-110 transition-transform" />
                <span>Achievements</span>
              </Link>
              <span>•</span>
              <motion.a
                href="https://github.com/icombe/icombe.github.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (unlockAchievement('code_inspector')) {
                    showAchievementPopup('code_inspector');
                  }
                }}
                className="flex items-center gap-1 hover:text-palette-blue transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Code size={12} />
                <span>View Source</span>
              </motion.a>
              <span>•</span>
              <span>Designed & Developed by Ian Combe</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
