import { unlockAchievement } from './easterEggs';

// Generic tracking utility
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
    size: () => tracker.size,
  };
};

// Track social link clicks
const socialTracker = createTracker('social_clicks');

export const trackSocialClick = (platform: 'github' | 'linkedin', onUnlock: (id: string) => void) => {
  socialTracker.add(platform);
  
  // Unlock on first social link click
  if (unlockAchievement('social_butterfly')) {
    onUnlock('social_butterfly');
  }
};

// Track project views
const projectTracker = createTracker('project_views');

export const trackProjectView = (projectId: string, onUnlock: (id: string) => void) => {
  const count = projectTracker.add(projectId);
  
  // Assuming 3 projects total
  if (count >= 3 && unlockAchievement('deep_diver')) {
    onUnlock('deep_diver');
  }
};

// Reset tracking (for dev tools)
export const resetTracking = () => {
  socialTracker.clear();
  projectTracker.clear();
};
