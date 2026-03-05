import { describe, it, expect } from 'vitest';
import { ACHIEVEMENTS, getAchievementById } from '../lib/achievements';

describe('Achievement Definitions', () => {
  it('has exactly 12 achievements', () => {
    expect(ACHIEVEMENTS).toHaveLength(12);
  });

  it('has curious_explorer as the first achievement', () => {
    expect(ACHIEVEMENTS[0].id).toBe('curious_explorer');
  });

  it('has completionist as an achievement', () => {
    const completionist = ACHIEVEMENTS.find(a => a.id === 'completionist');
    expect(completionist).toBeDefined();
    expect(completionist?.title).toBe('Completionist');
  });

  it('categorizes achievements correctly', () => {
    const exploration = ACHIEVEMENTS.filter(a => a.category === 'exploration');
    const secret = ACHIEVEMENTS.filter(a => a.category === 'secret');
    const interaction = ACHIEVEMENTS.filter(a => a.category === 'interaction');
    
    expect(exploration.length).toBeGreaterThan(0);
    expect(secret.length).toBeGreaterThan(0);
    expect(interaction.length).toBeGreaterThan(0);
  });

  it('all achievements have required fields', () => {
    ACHIEVEMENTS.forEach(achievement => {
      expect(achievement.id).toBeTruthy();
      expect(achievement.title).toBeTruthy();
      expect(achievement.description).toBeTruthy();
      expect(achievement.icon).toBeTruthy();
      expect(['exploration', 'interaction', 'secret']).toContain(achievement.category);
    });
  });

  it('getAchievementById returns correct achievement', () => {
    const achievement = getAchievementById('konami_code');
    expect(achievement).toBeDefined();
    expect(achievement?.title).toBe('Konami Code');
  });

  it('getAchievementById returns undefined for non-existent id', () => {
    const achievement = getAchievementById('non_existent');
    expect(achievement).toBeUndefined();
  });

  it('all achievement ids are unique', () => {
    const ids = ACHIEVEMENTS.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
