// Achievement definitions
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'exploration' | 'interaction' | 'secret';
}

export const ACHIEVEMENTS: Achievement[] = [
  // Curious Explorer always first
  {
    id: 'curious_explorer',
    title: 'Curious Explorer',
    description: 'Discovered the hidden achievements page. Curiosity rewarded!',
    icon: '🔍',
    category: 'exploration',
  },
  
  // Exploration achievements
  {
    id: 'scroll_master',
    title: 'Scroll Master',
    description: 'Scrolled over 20,000 pixels. You really explored everything!',
    icon: '📜',
    category: 'exploration',
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Clicked a social media link. Let\'s connect!',
    icon: '🦋',
    category: 'exploration',
  },
  {
    id: 'deep_diver',
    title: 'Deep Diver',
    description: 'Viewed all three projects. You really did your research!',
    icon: '🤿',
    category: 'exploration',
  },
  {
    id: 'scroll_grandmaster',
    title: 'Scroll Grandmaster',
    description: 'Scrolled over 500,000 pixels. Are you okay? Do you need help?',
    icon: '🏴‍☠️',
    category: 'exploration',
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Unlocked every single achievement. You are a true master!',
    icon: '👑',
    category: 'exploration',
  },
  
  // Secret achievements
  {
    id: 'konami_code',
    title: 'Konami Code',
    description: 'Entered the legendary Konami Code. A true gamer at heart!',
    icon: '🎮',
    category: 'secret',
  },
  {
    id: 'dev_detective',
    title: 'Dev Detective',
    description: 'Opened the browser DevTools. A fellow developer, I see!',
    icon: '🔧',
    category: 'secret',
  },
  {
    id: 'code_inspector',
    title: 'Code Inspector',
    description: 'Viewed the page source. Digging into the details!',
    icon: '👀',
    category: 'secret',
  },
  {
    id: '404_explorer',
    title: '404 Explorer',
    description: 'Found the void. Not all who wander are lost... or are they?',
    icon: '🗺️',
    category: 'secret',
  },
  
  // Interaction achievements
  {
    id: 'keyboard_ninja',
    title: 'Keyboard Ninja',
    description: 'Used Tab and Enter to navigate. Mouse-free master!',
    icon: '⌨️',
    category: 'interaction',
  },
  {
    id: 'patient_programmer',
    title: 'Patient Programmer',
    description: 'Stayed on the page for 5+ minutes without moving. Zen master!',
    icon: '🧘',
    category: 'interaction',
  },
  {
    id: 'speed_scroller',
    title: 'Speed Scroller',
    description: 'Scrolled at lightning speed. Slow down, enjoy the view!',
    icon: '⚡',
    category: 'interaction',
  },
  {
    id: 'hover_master',
    title: 'Hover Master',
    description: 'Hovered over 100+ interactive elements. What a thorough explorer!',
    icon: '🖱️',
    category: 'interaction',
  },
  {
    id: 'navigation_expert',
    title: 'Navigation Expert',
    description: 'Used a quick link to navigate the site. Efficiency at its finest!',
    icon: '🧭',
    category: 'interaction',
  },
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id);
};
