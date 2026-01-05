import { unlockAchievement, getAchievements } from './easterEggs';
import { ACHIEVEMENTS } from './achievements';

// Generic tracker utility
const createTracker = (storageKey: string) => {
  let tracker = new Set<string>(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  
  return {
    add: (item: string) => {
      tracker.add(item);
      localStorage.setItem(storageKey, JSON.stringify([...tracker]));
      return tracker.size;
    },
    clear: () => {
      localStorage.removeItem(storageKey);
      tracker.clear();
    },
  };
};

// Track navigation link clicks
const navigationTracker = createTracker('navigation_clicks');

export const trackNavigationClick = (section: string, onUnlock: (id: string) => void) => {
  const count = navigationTracker.add(section);
  
  // Unlock achievement on first quick link usage
  if (count >= 1 && unlockAchievement('navigation_expert')) {
    onUnlock('navigation_expert');
  }
};

// Check for completionist achievement
export const checkCompletionist = (onUnlock: (id: string) => void) => {
  const unlockedAchievements = getAchievements();
  
  // Check if all achievements except completionist are unlocked
  const allUnlocked = ACHIEVEMENTS
    .filter(a => a.id !== 'completionist')
    .every(a => unlockedAchievements.has(a.id));
  
  if (allUnlocked && unlockAchievement('completionist')) {
    onUnlock('completionist');
  }
};

// Reset tracking (for dev tools)
export const resetNavigationTracking = () => {
  navigationTracker.clear();
};
