import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Achievements from '@/pages/Achievements';
import ProjectDashboard from '@/pages/ProjectDashboard';
import StudentLoanAnalyzerProject from '@/pages/StudentLoanAnalyzerProject';
import MarketSignalSummarizerProject from '@/pages/MarketSignalSummarizerProject';
import { 
  useKonamiCode, 
  useScrollEasterEgg, 
  useKeyboardNavigation,
  useScrollGrandmaster,
  useIdleTimer,
  useHoverTracking,
  unlockAchievement
} from '@/lib/easterEggs';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { getAchievementById } from '@/lib/achievements';
import { AchievementProvider } from '@/context/AchievementContext';
import { checkCompletionist } from '@/lib/navigationTracking';

function AppContent() {
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementData, setAchievementData] = useState({ title: '', description: '', icon: '' });
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const location = useLocation();

  const showAchievementPopup = (achievementId: string) => {
    const achievement = getAchievementById(achievementId);
    if (achievement) {
      // Add to queue
      setAchievementQueue(prev => [...prev, achievementId]);
      
      // Dispatch custom event for achievements page to listen to
      window.dispatchEvent(new CustomEvent('showAchievementPopup', { detail: achievementId }));
      window.dispatchEvent(new Event('achievementUnlocked'));
      
      // Check for completionist after any achievement unlock
      setTimeout(() => checkCompletionist(showAchievementPopup), 500);
    }
  };

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
        setShowAchievement(true);
        
        // Determine duration based on achievement type
        const duration = nextAchievementId === 'completionist' ? 8000 : 5000;
        
        setTimeout(() => {
          setShowAchievement(false);
          // Remove from queue and process next
          setTimeout(() => {
            setAchievementQueue(prev => prev.slice(1));
            setIsProcessingQueue(false);
          }, 300); // Small delay for exit animation
        }, duration);
      }
    }
  }, [achievementQueue, isProcessingQueue]);

  // View Source detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+U or Cmd+U for view source
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        if (unlockAchievement('code_inspector')) {
          showAchievementPopup('code_inspector');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Konami Code Easter Egg
  useKonamiCode(() => {
    showAchievementPopup('konami_code');
  });

  // Scroll Distance Easter Egg
  useScrollEasterEgg(() => {
    showAchievementPopup('scroll_master');
  });

  // Keyboard Navigation
  useKeyboardNavigation(() => {
    showAchievementPopup('keyboard_ninja');
  });

  // Scroll Grandmaster
  useScrollGrandmaster(() => {
    showAchievementPopup('scroll_grandmaster');
  });

  // Patient Programmer
  useIdleTimer(() => {
    showAchievementPopup('patient_programmer');
  });

  // Hover Master
  useHoverTracking(() => {
    showAchievementPopup('hover_master');
  });

  return (
    <AchievementProvider showAchievementPopup={showAchievementPopup}>
      <div className="min-h-screen relative bg-[#050505] text-white overflow-x-hidden selection:bg-palette-blue/30 selection:text-white">
        {/* Background - 3D Scene Removed */}
        
        {/* Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/projects/student-loan-tracker" element={<StudentLoanAnalyzerProject />} />
            <Route path="/projects/market-signal-summarizer" element={<MarketSignalSummarizerProject />} />
            <Route path="/projects/testing-equipment-repair-pipeline-dashboard" element={<ProjectDashboard />} />
            <Route path="*" element={<Achievements />} />
          </Routes>
        </div>

        {/* Achievement Popup - Bottom Left */}
        <AnimatePresence>
          {showAchievement && (location.pathname === '/' || location.pathname === '/achievements') && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed bottom-8 left-8 z-50 cursor-pointer"
              onClick={() => {
                if (location.pathname !== '/achievements') {
                  window.location.href = '/achievements';
                }
              }}
            >
              <div className={`p-1 rounded-2xl shadow-2xl w-[380px] ${
                achievementData.icon === '👑' 
                  ? 'bg-gradient-to-r from-palette-yellow via-palette-orange to-palette-yellow animate-gradient-x' 
                  : 'bg-gradient-to-br from-palette-blue via-palette-green to-palette-yellow'
              }`}>
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
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        achievementData.icon === '👑' ? 'text-palette-yellow' : 'text-palette-yellow'
                      }`}>
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
    </AchievementProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
