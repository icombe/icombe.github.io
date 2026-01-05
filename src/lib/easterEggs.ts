import { useEffect } from 'react';

// Achievement tracking with localStorage
const ACHIEVEMENT_KEY = 'portfolio_achievements';

export const getAchievements = (): Set<string> => {
  const stored = localStorage.getItem(ACHIEVEMENT_KEY);
  return stored ? new Set(JSON.parse(stored)) : new Set();
};

export const unlockAchievement = (achievementId: string): boolean => {
  const achievements = getAchievements();
  if (achievements.has(achievementId)) {
    return false; // Already unlocked
  }
  achievements.add(achievementId);
  localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify([...achievements]));
  
  // Dispatch event for achievements page to listen to
  window.dispatchEvent(new Event('achievementUnlocked'));
  
  return true; // Newly unlocked
};

export const hasAchievement = (achievementId: string): boolean => {
  return getAchievements().has(achievementId);
};

// Debug utility - call in console to clear achievements
export const clearAllAchievements = () => {
  localStorage.removeItem(ACHIEVEMENT_KEY);
};

// Make available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearAchievements = clearAllAchievements;
  (window as any).getAchievements = () => {
    const achievements = getAchievements();
    return [...achievements];
  };
}

// Konami Code Easter Egg
export const useKonamiCode = (callback: () => void) => {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let keys: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys = [...keys, e.key].slice(-10);
      
      if (keys.join(',') === konamiCode.join(',')) {
        unlockAchievement('konami_code');
        callback(); // Always show animation
        keys = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Generic scroll tracking hook
const useScrollTracker = (callback: () => void, scrollDistance: number, achievementId: string) => {
  useEffect(() => {
    let totalScroll = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      totalScroll += Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (totalScroll >= scrollDistance && unlockAchievement(achievementId)) {
        callback();
        if (achievementId === 'scroll_master') {
          totalScroll = 0; // Reset only for scroll_master
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, scrollDistance, achievementId]);
};

// Scroll Distance Easter Egg - 20k pixels
export const useScrollEasterEgg = (callback: () => void, scrollDistance: number = 20000) => {
  useScrollTracker(callback, scrollDistance, 'scroll_master');
};

// Scroll Grandmaster - 500k pixels
export const useScrollGrandmaster = (callback: () => void) => {
  useScrollTracker(callback, 500000, 'scroll_grandmaster');
};

// Dev Tools Detection
export const useDevToolsDetection = (callback: () => void) => {
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      if (window.outerWidth - window.innerWidth > threshold || 
          window.outerHeight - window.innerHeight > threshold) {
        if (unlockAchievement('dev_detective')) {
          callback();
        }
      }
    };

    window.addEventListener('resize', detectDevTools);
    detectDevTools(); // Check immediately
    
    return () => window.removeEventListener('resize', detectDevTools);
  }, [callback]);
};

// Keyboard Navigation Detection (Tab + Enter)
export const useKeyboardNavigation = (callback: () => void) => {
  useEffect(() => {
    let usedTab = false;
    let usedEnter = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') usedTab = true;
      if (e.key === 'Enter') usedEnter = true;

      if (usedTab && usedEnter && unlockAchievement('keyboard_ninja')) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Patient Programmer - 5 minutes idle
export const useIdleTimer = (callback: () => void, idleTime: number = 300000) => {
  useEffect(() => {
    let idleTimeout: ReturnType<typeof setTimeout>;
    
    const resetTimer = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (unlockAchievement('patient_programmer')) {
          callback();
        }
      }, idleTime);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    
    resetTimer(); // Start timer

    return () => {
      clearTimeout(idleTimeout);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [callback, idleTime]);
};

// Speed Scroller - Fast scrolling detection
export const useSpeedScroller = (callback: () => void) => {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const distance = Math.abs(currentScrollY - lastScrollY);
      const timeDiff = currentTime - lastScrollTime;
      const velocity = distance / timeDiff; // pixels per ms

      if (velocity > 10 && unlockAchievement('speed_scroller')) { // Very fast scrolling
        callback();
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

// Hover Master - Track hovers
export const useHoverTracking = (callback: () => void) => {
  useEffect(() => {
    let hoverCount = 0;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if element is interactive (button, link, or has hover effects)
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.classList.contains('cursor-pointer') ||
          target.closest('button') ||
          target.closest('a')) {
        hoverCount++;
        
        if (hoverCount >= 100 && unlockAchievement('hover_master')) {
          callback();
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [callback]);
};

