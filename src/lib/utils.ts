// ============================================================
// LearnVerse Utilities
// ============================================================


/** Join class names, filtering out falsy values */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a number with commas */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Get a random item from an array */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Delay for a given number of ms */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Get time of day for mascot greetings */
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour < 7) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
}

/** Building type to icon mapping */
export const buildingIcons: Record<string, string> = {
  school: '🏫',
  laboratory: '🧪',
  arena: '🎯',
  library: '📚',
  tower: '🏆',
};

/** Building type labels */
export const buildingLabels: Record<string, string> = {
  school: 'Core Lesson',
  laboratory: 'Interactive Simulation',
  arena: 'Quiz Challenge',
  library: 'Reference Material',
  tower: 'Final Assessment',
};
