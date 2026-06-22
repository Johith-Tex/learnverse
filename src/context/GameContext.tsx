'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface GameLevel {
  name: string;
  title: string;
  minXP: number;
  icon: string;
}

export const LEVELS: GameLevel[] = [
  { name: 'explorer', title: 'Beginner Explorer', minXP: 0, icon: '🧭' },
  { name: 'traveler', title: 'Knowledge Traveler', minXP: 500, icon: '🗺️' },
  { name: 'scholar', title: 'Scholar', minXP: 1500, icon: '🎓' },
  { name: 'master', title: 'Master Explorer', minXP: 3500, icon: '⭐' },
  { name: 'navigator', title: 'Grand Navigator', minXP: 7000, icon: '👑' },
];

export interface GameState {
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  unlockedAchievements: string[];
  visitedContinents: string[];
  visitedCountries: string[];
  mascotClicks: number;
  totalLessonsCompleted: number;
  lastVisitedLocation: {
    continentId?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
  };
}

interface GameContextType extends GameState {
  currentLevel: GameLevel;
  nextLevel: GameLevel | null;
  xpToNextLevel: number;
  xpProgress: number;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number, coinReward: number) => void;
  unlockAchievement: (achievementId: string) => void;
  visitContinent: (continentId: string) => void;
  visitCountry: (countryId: string) => void;
  setLastVisited: (location: GameState['lastVisitedLocation']) => void;
  incrementMascotClicks: () => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isAchievementUnlocked: (achievementId: string) => boolean;
}

const defaultState: GameState = {
  xp: 275,
  coins: 45,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['intro-equations-lesson', 'balance-lab'],
  unlockedAchievements: ['first-steps', 'on-fire'],
  visitedContinents: ['python'],
  visitedCountries: ['algebra'],
  mascotClicks: 0,
  totalLessonsCompleted: 2,
  lastVisitedLocation: {
    continentId: 'python',
    countryId: 'algebra',
    stateId: 'equations',
    cityId: 'intro-equations',
  },
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('learnverse-game-state');
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        setState(parsed);
      }
    } catch {
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('learnverse-game-state', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = state.lastActiveDate;
    if (lastActive && lastActive !== today) {
      const lastDate = new Date(lastActive);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        setState(prev => ({ ...prev, streak: 0, lastActiveDate: today }));
      } else if (diffDays === 1) {
        setState(prev => ({ ...prev, streak: prev.streak + 1, lastActiveDate: today }));
      }
    }
  }, [state.lastActiveDate]);

  const currentLevel = LEVELS.reduce((best, level) =>
    state.xp >= level.minXP ? level : best, LEVELS[0]);

  const currentLevelIndex = LEVELS.indexOf(currentLevel);
  const nextLevel = currentLevelIndex < LEVELS.length - 1 ? LEVELS[currentLevelIndex + 1] : null;
  const xpToNextLevel = nextLevel ? nextLevel.minXP - state.xp : 0;
  const xpProgress = nextLevel
    ? ((state.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  const addXP = useCallback((amount: number) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  const addCoins = useCallback((amount: number) => {
    setState(prev => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  const completeLesson = useCallback((lessonId: string, xpReward: number, coinReward: number) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + xpReward,
        coins: prev.coins + coinReward,
        completedLessons: [...prev.completedLessons, lessonId],
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setState(prev => {
      if (prev.unlockedAchievements.includes(achievementId)) return prev;
      return {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, achievementId],
      };
    });
  }, []);

  const visitContinent = useCallback((continentId: string) => {
    setState(prev => {
      if (prev.visitedContinents.includes(continentId)) return prev;
      return {
        ...prev,
        visitedContinents: [...prev.visitedContinents, continentId],
      };
    });
  }, []);

  const visitCountry = useCallback((countryId: string) => {
    setState(prev => {
      if (prev.visitedCountries.includes(countryId)) return prev;
      return {
        ...prev,
        visitedCountries: [...prev.visitedCountries, countryId],
      };
    });
  }, []);

  const setLastVisited = useCallback((location: GameState['lastVisitedLocation']) => {
    setState(prev => ({ ...prev, lastVisitedLocation: location }));
  }, []);

  const incrementMascotClicks = useCallback(() => {
    setState(prev => ({ ...prev, mascotClicks: prev.mascotClicks + 1 }));
  }, []);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return state.completedLessons.includes(lessonId);
  }, [state.completedLessons]);

  const isAchievementUnlocked = useCallback((achievementId: string) => {
    return state.unlockedAchievements.includes(achievementId);
  }, [state.unlockedAchievements]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        currentLevel,
        nextLevel,
        xpToNextLevel,
        xpProgress,
        addXP,
        addCoins,
        completeLesson,
        unlockAchievement,
        visitContinent,
        visitCountry,
        setLastVisited,
        incrementMascotClicks,
        isLessonCompleted,
        isAchievementUnlocked,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
