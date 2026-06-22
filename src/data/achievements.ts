// ============================================================
// LearnVerse Achievements
// ============================================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'exploration' | 'mastery' | 'streak' | 'milestone' | 'special';
  xpReward: number;
  coinReward: number;
  condition: string; // Human-readable condition
  isSecret?: boolean;
}

export const achievements: Achievement[] = [
  // Exploration
  { id: 'first-steps', name: 'First Steps', description: 'Complete your very first lesson.', icon: '👣', category: 'exploration', xpReward: 50, coinReward: 10, condition: 'Complete 1 lesson' },
  { id: 'curious-explorer', name: 'Curious Explorer', description: 'Visit 3 different continents.', icon: '🧭', category: 'exploration', xpReward: 100, coinReward: 25, condition: 'Visit 3 continents' },
  { id: 'world-traveler', name: 'World Traveler', description: 'Visit all 7 continents.', icon: '🌍', category: 'exploration', xpReward: 500, coinReward: 100, condition: 'Visit all 7 continents' },
  { id: 'deep-diver', name: 'Deep Diver', description: 'Reach the building level for the first time.', icon: '🏊', category: 'exploration', xpReward: 75, coinReward: 15, condition: 'Zoom to building level' },

  // Mastery
  { id: 'quiz-ace', name: 'Quiz Ace', description: 'Score 100% on any quiz.', icon: '🎯', category: 'mastery', xpReward: 100, coinReward: 25, condition: 'Perfect quiz score' },
  { id: 'equation-master', name: 'Equation Master', description: 'Complete all lessons in Equations State.', icon: '⚖️', category: 'mastery', xpReward: 250, coinReward: 50, condition: 'Complete Equations State' },
  { id: 'algebra-champion', name: 'Algebra Champion', description: 'Complete all of Algebra Country.', icon: '🏆', category: 'mastery', xpReward: 500, coinReward: 100, condition: 'Complete Algebra Country' },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a lesson in under 5 minutes.', icon: '⚡', category: 'mastery', xpReward: 75, coinReward: 20, condition: 'Finish lesson < 5 min' },

  // Streak
  { id: 'on-fire', name: 'On Fire!', description: 'Maintain a 3-day learning streak.', icon: '🔥', category: 'streak', xpReward: 100, coinReward: 25, condition: '3-day streak' },
  { id: 'unstoppable', name: 'Unstoppable', description: 'Maintain a 7-day learning streak.', icon: '💪', category: 'streak', xpReward: 250, coinReward: 50, condition: '7-day streak' },
  { id: 'legendary', name: 'Legendary Learner', description: 'Maintain a 30-day learning streak.', icon: '👑', category: 'streak', xpReward: 1000, coinReward: 200, condition: '30-day streak' },
  { id: 'century', name: 'Century Club', description: 'Maintain a 100-day learning streak.', icon: '💯', category: 'streak', xpReward: 5000, coinReward: 500, condition: '100-day streak' },

  // Milestone
  { id: 'level-5', name: 'Rising Star', description: 'Reach Knowledge Traveler level.', icon: '⭐', category: 'milestone', xpReward: 200, coinReward: 50, condition: 'Reach Level 2' },
  { id: 'level-10', name: 'Scholarly Mind', description: 'Reach Scholar level.', icon: '🎓', category: 'milestone', xpReward: 500, coinReward: 100, condition: 'Reach Level 3' },
  { id: 'first-thousand', name: 'XP Thousandaire', description: 'Earn 1,000 total XP.', icon: '💎', category: 'milestone', xpReward: 100, coinReward: 25, condition: 'Earn 1000 XP' },

  // Special
  { id: 'night-owl', name: 'Night Owl', description: 'Study after midnight.', icon: '🦉', category: 'special', xpReward: 50, coinReward: 10, condition: 'Study after midnight', isSecret: true },
  { id: 'early-bird', name: 'Early Bird', description: 'Study before 7 AM.', icon: '🐦', category: 'special', xpReward: 50, coinReward: 10, condition: 'Study before 7 AM', isSecret: true },
  { id: 'mascot-friend', name: 'Best Friends', description: 'Click on the mascot 10 times.', icon: '🦊', category: 'special', xpReward: 25, coinReward: 5, condition: 'Click mascot 10 times', isSecret: true },
];

export function getAchievement(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id);
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return achievements.filter(a => a.category === category);
}
