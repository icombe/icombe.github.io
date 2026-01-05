import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ACHIEVEMENTS, getAchievementById } from '@/lib/achievements';
import { getAchievements, unlockAchievement } from '@/lib/easterEggs';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

export default function Achievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [achievementData, setAchievementData] = useState({ title: '', description: '', icon: '' });
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const location = useLocation();
  const is404 = location.pathname !== '/' && location.pathname !== '/achievements';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Unlock the curious explorer achievement
    const isNew = unlockAchievement('curious_explorer');
    if (isNew) {
      setAchievementQueue(prev => [...prev, 'curious_explorer']);
    }
    
    // Load unlocked achievements
    setUnlockedAchievements(getAchievements());
    
    // Listen for achievement unlocks
    const handleStorageChange = () => {
      setUnlockedAchievements(getAchievements());
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('achievementUnlocked', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('achievementUnlocked', handleStorageChange as EventListener);
    };
  }, []);
  
  // Listen for achievement popup events from App.tsx
  useEffect(() => {
    const handleAchievementUnlock = ((event: CustomEvent) => {
      const achievementId = event.detail;
      setAchievementQueue(prev => [...prev, achievementId]);
      setUnlockedAchievements(getAchievements());
    }) as EventListener;
    
    window.addEventListener('showAchievementPopup', handleAchievementUnlock);
    
    return () => {
      window.removeEventListener('showAchievementPopup', handleAchievementUnlock);
    };
  }, []);

  // Process achievement queue
  useEffect(() => {
    if (achievementQueue.length > 0 && !isProcessingQueue) {
      setIsProcessingQueue(true);
      const nextAchievementId = achievementQueue[0];
      const achievement = getAchievementById(nextAchievementId);
      
      if (achievement) {
        setAchievementData({ 
          title: achievement.title, 
          description: achievement.description, 
          icon: achievement.icon 
        });
        setShowAchievementPopup(true);
        
        const duration = nextAchievementId === 'completionist' ? 8000 : 5000;
        
        setTimeout(() => {
          setShowAchievementPopup(false);
          setTimeout(() => {
            setAchievementQueue(prev => prev.slice(1));
            setIsProcessingQueue(false);
          }, 300);
        }, duration);
      }
    }
  }, [achievementQueue, isProcessingQueue]);

  const unlockedCount = unlockedAchievements.size;
  const totalCount = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);
  const completionWidth = completionPercentage + '%';

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex-grow">
        {/* 404 Error Message */}
        {is404 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="text-6xl">🗺️</div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">404 - Page Not Found</h2>
                <p className="text-gray-300">Looks like you wandered off the beaten path! But hey, you unlocked an achievement. 🎉</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-palette-blue transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-palette-blue/20 to-palette-green/20 border border-white/10">
              <Trophy size={40} className="text-palette-yellow" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">
                {'Achievements'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
              <p className="text-gray-400 mt-2">
                {unlockedCount} of {totalCount} unlocked ({completionPercentage}%)
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: completionWidth }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-palette-blue via-palette-green to-palette-yellow"
            />
          </div>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.has(achievement.id);
            const categoryColor = 
              achievement.category === 'secret' ? 'bg-palette-blue' :
              achievement.category === 'exploration' ? 'bg-palette-green' :
              'bg-palette-yellow';

            return (
              <motion.div
                key={achievement.id}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
                className={
                  'relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ' +
                  (isUnlocked
                    ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/20 group'
                    : 'bg-black/50 border-white/5')
                }
              >
                {/* Animated border gradient on hover for unlocked achievements */}
                {isUnlocked && (
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, #0689e4, #71ab23, #fbb905, #d55e0f, #0032db, #0689e4)',
                      backgroundSize: '200% 100%',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      padding: '2px'
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl animate-border-flow" 
                      style={{
                        background: 'linear-gradient(90deg, #0689e4, #71ab23, #fbb905, #d55e0f, #0032db, #0689e4)',
                        backgroundSize: '200% 100%'
                      }}
                    />
                  </div>
                )}
                {/* Achievement Content */}
                <div className={!isUnlocked ? 'opacity-40' : ''}>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isUnlocked ? (
                      <span>{achievement.icon} {achievement.title}</span>
                    ) : '❓ ???'}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {isUnlocked ? achievement.description : 'Complete a secret action to unlock this achievement.'}
                  </p>
                  
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className={'w-2 h-2 rounded-full ' + categoryColor} />
                    <span className="text-xs text-gray-400 capitalize">{achievement.category}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 mb-16 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Achievement Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-palette-blue" />
                <motion.span 
                  className="text-palette-blue text-lg font-bold cursor-default"
                  whileHover={{ 
                    x: [0, -2, 2, -2, 2, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  Secrets
                </motion.span>
              </div>
              <p>Try keyboard shortcuts, classic game codes, and explore unusual routes. Developer tools and hidden pages count too!</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-palette-green" />
                <motion.span 
                  className="text-palette-green text-lg font-bold cursor-default"
                  whileHover={{ 
                    scaleX: 1.2,
                    transition: { duration: 0.3 }
                  }}
                >
                  Exploration
                </motion.span>
              </div>
              <p>Visit every section, view all projects, click social links, and scroll through content. Curiosity is rewarded!</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-palette-yellow" />
                <motion.span 
                  className="text-palette-yellow text-lg font-bold cursor-default"
                  whileHover={{ 
                    scale: 0.9,
                    transition: { duration: 0.2 }
                  }}
                >
                  Interaction
                </motion.span>
              </div>
              <p>Hover over elements, use keyboard navigation, scroll at different speeds, and stay engaged. Active users unlock more!</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer at bottom with no gap */}
      <Footer />
      
      {/* Achievement Popup - Bottom Left */}
      <AnimatePresence>
        {showAchievementPopup && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-8 left-8 z-50 cursor-default"
          >
            <div className={
              'p-1 rounded-2xl shadow-2xl w-[380px] ' +
              (achievementData.icon === '👑' 
                ? 'bg-gradient-to-r from-palette-yellow via-palette-orange to-palette-yellow animate-gradient-x' 
                : 'bg-gradient-to-br from-palette-blue via-palette-green to-palette-yellow')
            }>
              <div className="bg-[#0a0a0a] rounded-[14px] p-5 flex items-center gap-4">
                <motion.div 
                  className="text-4xl flex-shrink-0"
                  animate={achievementData.icon === '👑' ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {achievementData.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy size={16} className="text-palette-yellow flex-shrink-0" />
                    <span className={
                      'text-xs font-bold uppercase tracking-wider ' +
                      (achievementData.icon === '👑' ? 'text-palette-yellow' : 'text-palette-yellow')
                    }>
                      {achievementData.icon === '👑' ? '🎉 MASTERY COMPLETE! 🎉' : 'Achievement Unlocked!'}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-0.5 truncate">{achievementData.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{achievementData.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
