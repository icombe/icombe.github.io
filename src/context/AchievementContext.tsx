import { createContext, useContext, type ReactNode } from 'react';

interface AchievementContextType {
  showAchievementPopup: (achievementId: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider = ({ 
  children, 
  showAchievementPopup 
}: { 
  children: ReactNode; 
  showAchievementPopup: (achievementId: string) => void;
}) => {
  return (
    <AchievementContext.Provider value={{ showAchievementPopup }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievement = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievement must be used within AchievementProvider');
  }
  return context;
};
