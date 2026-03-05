import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAchievement } from '@/context/AchievementContext';
import { trackNavigationClick } from '@/lib/navigationTracking';

const sections = [
  { id: 'landing', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState('landing');
  const { showAchievementPopup } = useAchievement();

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportMidpoint = window.scrollY + window.innerHeight * 0.35;

      let closestSection = sections[0].id;
      let smallestDistance = Number.POSITIVE_INFINITY;

      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (!element) continue;

        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (viewportMidpoint >= sectionTop && viewportMidpoint <= sectionBottom) {
          closestSection = id;
          smallestDistance = 0;
          break;
        }

        const distance = Math.min(
          Math.abs(viewportMidpoint - sectionTop),
          Math.abs(viewportMidpoint - sectionBottom)
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSection = id;
        }
      }

      setActiveSection(closestSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      // Track navigation click (exclude 'landing')
      if (id !== 'landing') {
        trackNavigationClick(id, showAchievementPopup);
      }
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === id
                  ? 'bg-palette-blue border-palette-blue scale-125'
                  : 'bg-transparent border-white/30 hover:border-white/60'
              }`}
            />
            
            {/* Label tooltip */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/90 px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                <span className="text-xs text-white font-medium">{label}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}
