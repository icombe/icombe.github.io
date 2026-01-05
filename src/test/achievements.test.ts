import { describe, it, expect, beforeEach } from 'vitest';
import { getAchievements, unlockAchievement, hasAchievement } from '../lib/easterEggs';

describe('Achievement System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('returns empty set when no achievements are unlocked', () => {
    const achievements = getAchievements();
    expect(achievements.size).toBe(0);
  });

  it('unlocks a new achievement and returns true', () => {
    const isNew = unlockAchievement('test_achievement');
    expect(isNew).toBe(true);
    
    const achievements = getAchievements();
    expect(achievements.has('test_achievement')).toBe(true);
  });

  it('returns false when unlocking an already unlocked achievement', () => {
    unlockAchievement('test_achievement');
    const isNew = unlockAchievement('test_achievement');
    
    expect(isNew).toBe(false);
  });

  it('persists achievements to localStorage', () => {
    unlockAchievement('achievement_1');
    unlockAchievement('achievement_2');
    
    const stored = localStorage.getItem('portfolio_achievements');
    expect(stored).not.toBeNull();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toContain('achievement_1');
    expect(parsed).toContain('achievement_2');
  });

  it('correctly checks if achievement is unlocked', () => {
    expect(hasAchievement('test_achievement')).toBe(false);
    
    unlockAchievement('test_achievement');
    
    expect(hasAchievement('test_achievement')).toBe(true);
  });

  it('maintains achievement count correctly', () => {
    unlockAchievement('achievement_1');
    unlockAchievement('achievement_2');
    unlockAchievement('achievement_3');
    
    const achievements = getAchievements();
    expect(achievements.size).toBe(3);
  });

  it('does not duplicate achievements', () => {
    unlockAchievement('test_achievement');
    unlockAchievement('test_achievement');
    unlockAchievement('test_achievement');
    
    const achievements = getAchievements();
    expect(achievements.size).toBe(1);
  });
});
