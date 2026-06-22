'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useGame } from '@/context/GameContext';

interface StreakCounterProps {
  compact?: boolean;
}

const MILESTONES = [
  { days: 3, badge: '🔥', label: 'Warming Up' },
  { days: 7, badge: '⚡', label: 'On Fire' },
  { days: 30, badge: '🌟', label: 'Dedicated' },
  { days: 100, badge: '💎', label: 'Legendary' },
];

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 15 });
  const display = useTransform(spring, (v: number) => Math.round(v).toString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display as unknown as React.ReactNode}</motion.span>;
}

export default function StreakCounter({ compact = false }: StreakCounterProps) {
  const { streak } = useGame();
  const prevStreak = useRef(streak);
  const increased = streak > prevStreak.current;

  useEffect(() => {
    prevStreak.current = streak;
  }, [streak]);

  const activeMilestone = [...MILESTONES]
    .reverse()
    .find((m) => streak >= m.days);

  // ── Compact ────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <div className="streak-flame-compact relative">
          <Flame className="w-4 h-4 text-orange-400" />
        </div>
        <span className="text-xs font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent tabular-nums">
          <AnimatedNumber value={streak} />
        </span>

        <style jsx>{`
          @keyframes flameFlicker {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            25% { transform: scale(1.05) rotate(-2deg); opacity: 0.9; }
            50% { transform: scale(0.95) rotate(1deg); opacity: 1; }
            75% { transform: scale(1.08) rotate(-1deg); opacity: 0.85; }
          }
          .streak-flame-compact {
            animation: flameFlicker 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // ── Full ───────────────────────────────────────────────────
  return (
    <motion.div
      className="relative px-5 py-4 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-gray-900/40 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Warm ambient glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-red-500/10 blur-2xl pointer-events-none" />

      <div className="relative flex items-center gap-4">
        {/* Flame icon */}
        <div className="streak-flame relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
          <Flame className="w-7 h-7 text-orange-400 drop-shadow-[0_0_6px_rgba(251,146,60,0.5)]" />
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400/10 to-transparent" />
        </div>

        {/* Number + label */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <motion.span
              key={streak}
              className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-rose-500 bg-clip-text text-transparent tabular-nums"
              initial={increased ? { scale: 1.4, y: -4 } : false}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              <AnimatedNumber value={streak} />
            </motion.span>
            <span className="text-sm text-gray-400 font-medium">
              day{streak !== 1 ? 's' : ''}
            </span>
          </div>
          <span className="text-xs text-gray-500">Daily streak</span>
        </div>

        {/* Milestone badge */}
        <AnimatePresence>
          {activeMilestone && (
            <motion.div
              key={activeMilestone.days}
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="ml-auto flex flex-col items-center gap-0.5"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/20 shadow-lg shadow-orange-500/10">
                <span className="text-lg">{activeMilestone.badge}</span>
              </div>
              <span className="text-[9px] text-orange-400/70 font-medium">
                {activeMilestone.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Milestone progress dots */}
      <div className="relative flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
        {MILESTONES.map((m) => {
          const reached = streak >= m.days;
          return (
            <div key={m.days} className="flex items-center gap-1.5">
              <motion.div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  reached
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-sm shadow-orange-500/30'
                    : 'bg-gray-700'
                }`}
                animate={reached ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
              <span
                className={`text-[10px] font-medium ${
                  reached ? 'text-orange-400' : 'text-gray-600'
                }`}
              >
                {m.days}d
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          15% { transform: scale(1.06) rotate(-3deg); opacity: 0.88; }
          30% { transform: scale(0.94) rotate(2deg); opacity: 1; }
          50% { transform: scale(1.1) rotate(-1deg); opacity: 0.85; }
          70% { transform: scale(0.97) rotate(1.5deg); opacity: 0.95; }
          85% { transform: scale(1.04) rotate(-2deg); opacity: 0.9; }
        }
        .streak-flame {
          animation: flameFlicker 2s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}
