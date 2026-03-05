import { motion } from 'framer-motion';
import { Code2, Server, Wrench, BookOpen, Github } from 'lucide-react';
import { useEffect, useState } from 'react';

// Color mappings for each category
const categoryColors = {
  frontend: { primary: '#0689e4', secondary: '#0032db', gradient: 'from-palette-blue to-palette-deep', iconColor: 'text-palette-blue' },
  backend: { primary: '#71ab23', secondary: '#0689e4', gradient: 'from-palette-green to-palette-blue', iconColor: 'text-palette-green' },
  tools: { primary: '#d55e0f', secondary: '#fbb905', gradient: 'from-palette-orange to-palette-yellow', iconColor: 'text-palette-orange' },
  learning: { primary: '#fbb905', secondary: '#71ab23', gradient: 'from-palette-yellow to-palette-green', iconColor: 'text-palette-yellow' }
};

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: categoryColors.frontend.gradient,
    iconColor: categoryColors.frontend.iconColor,
    categoryKey: 'frontend' as const,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Figma", "Three.js", "Vite"]
  },
  {
    title: "Backend",
    icon: Server,
    color: categoryColors.backend.gradient,
    iconColor: categoryColors.backend.iconColor,
    categoryKey: 'backend' as const,
    skills: ["Python", "FastAPI", "Node.js", "PostgreSQL", "SQL", "RESTful APIs", "Pydantic"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: categoryColors.tools.gradient,
    iconColor: categoryColors.tools.iconColor,
    categoryKey: 'tools' as const,
    skills: ["Git", "Docker", "Linux", "AWS", "Bash", "Jira", "Agile"]
  },
  {
    title: "Currently Learning",
    icon: BookOpen,
    color: categoryColors.learning.gradient,
    iconColor: categoryColors.learning.iconColor,
    categoryKey: 'learning' as const,
    skills: ["Design Systems", "Accessibility Audits", "Storybook", "React Aria", "Hotjar", "Maze"]
  }
];

// Create a map of all technologies to their categories for carousel color-coding
const techColorMap: Record<string, keyof typeof categoryColors> = {};
skillCategories.forEach(category => {
  category.skills.forEach(skill => {
    techColorMap[skill] = category.categoryKey;
  });
});

// Extended list for carousel including additional tech
const allTechnologies = [
  ...skillCategories[0].skills, // Frontend
  ...skillCategories[1].skills, // Backend
  ...skillCategories[2].skills, // Tools
  "C++", "Unity", "Pandas", "Java"
];

// Assign categories to additional tech
techColorMap["C++"] = 'backend';
techColorMap["Unity"] = 'frontend';
techColorMap["Pandas"] = 'backend';
techColorMap["Java"] = 'backend';

export default function Skills() {
  const [contributions, setContributions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate simulated contribution data for the past 52 weeks (more realistic pattern)
    const generateContributions = () => {
      return Array.from({ length: 52 }, (_, weekIndex) => {
        // Create a more realistic pattern with some randomness
        const baseLevel = Math.floor(Math.random() * 15);
        const weekday = weekIndex % 7;
        // Less activity on weekends
        const weekendReduction = (weekday === 0 || weekday === 6) ? 0.3 : 1;
        return Math.floor(baseLevel * weekendReduction);
      });
    };
    
    setContributions(generateContributions());
    setLoading(false);
  }, []);

  // Duplicate for seamless loop
  const carouselTech = [...allTechnologies, ...allTechnologies];

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-1.5 w-32 mx-auto mb-6 bg-gradient-to-r from-palette-blue via-palette-green to-palette-yellow rounded-full"
        />
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 font-display text-white"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          {"Skills & Technologies".split(' ').map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-4"
              whileHover={{ 
                y: -5,
                color: "#0689e4",
                textShadow: "0 0 20px rgba(6, 137, 228, 0.6)",
                transition: { duration: 0.2 }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <p className="text-lg text-gray-400">
          A diverse toolkit for building modern applications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                    <Icon size={24} className={`${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h3>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge 
                      key={skillIndex} 
                      skill={skill} 
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                      categoryKey={category.categoryKey}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* GitHub Contribution Graph - Compact */}
      <motion.a
        href="https://github.com/icombe"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="block mb-8 cursor-pointer group"
      >
        <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-palette-green/50 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-palette-green/5 to-palette-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Github size={24} className="text-palette-green" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">
                GitHub Activity
              </h3>
            </div>
            <span className="text-xs text-gray-400 group-hover:text-palette-green transition-colors">
              Click to view profile →
            </span>
          </div>

          {loading ? (
            <div className="h-16 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/20 border-t-palette-green rounded-full animate-spin" />
            </div>
          ) : (
            <div className="relative">
              <div className="grid grid-cols-52 gap-1">
                {contributions.map((count, index) => {
                  const intensity = Math.min(count / 15, 1);
                  const opacity = 0.15 + intensity * 0.85;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.005, duration: 0.2 }}
                      className="aspect-square rounded-sm transition-all duration-200"
                      style={{
                        backgroundColor: `rgba(113, 171, 35, ${opacity})`,
                        minWidth: '8px',
                        minHeight: '8px'
                      }}
                      title={`${count} contributions`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>52 weeks ago</span>
                <span>Today</span>
              </div>
            </div>
          )}
        </div>
      </motion.a>

      {/* Compact Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative overflow-hidden py-6 bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-md border-y border-white/5 rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-palette-blue/5 via-transparent to-palette-green/5 pointer-events-none" />
        
        <div className="flex w-max animate-marquee-infinite hover:[animation-play-state:paused]">
          {carouselTech.map((tech, index) => (
            <CarouselTechItem key={index} tech={tech} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SkillBadge({ skill, delay, categoryKey }: { skill: string; delay: number; categoryKey: keyof typeof categoryColors }) {
  const categoryColor = categoryColors[categoryKey];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ 
        scale: 1.1,
        textShadow: `0 0 15px ${categoryColor.primary}`,
        color: categoryColor.primary,
        borderColor: categoryColor.primary,
        transition: { duration: 0.15 }
      }}
      className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 transition-all cursor-default"
    >
      {skill}
    </motion.span>
  );
}

function CarouselTechItem({ tech, index }: { tech: string; index: number }) {
  const categoryKey = techColorMap[tech] || 'frontend';
  const categoryColor = categoryColors[categoryKey];

  return (
    <motion.span 
      key={index} 
      className="mx-4 md:mx-6 text-lg md:text-xl font-bold text-white/15 transition-all duration-150 cursor-default inline-block"
      whileHover={{ 
        textShadow: `0 0 15px ${categoryColor.primary}`,
        color: categoryColor.primary,
        scale: 1.1,
        transition: { duration: 0.15 }
      }}
    >
      {tech}
    </motion.span>
  );
}
