'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useGame, LEVELS } from '@/context/GameContext';
import { formatNumber } from '@/lib/utils';

interface XPBarProps {
  compact?: boolean;
}

export default function XPBar({ compact = false }: XPBarProps) {
  const { xp, currentLevel, nextLevel, xpProgress } = useGame();

  const currentXPInLevel = xp - currentLevel.minXP;
  const xpNeededForLevel = nextLevel ? nextLevel.minXP - currentLevel.minXP : 1;
  const displayTarget = nextLevel ? nextLevel.minXP : currentLevel.minXP;

  // Smooth animated progress
  const springProgress = useSpring(0, { stiffness: 60, damping: 20 });
  const prevXPRef = useRef(xp);

  useEffect(() => {
    springProgress.set(xpProgress);
  }, [xpProgress, springProgress]);

  // Detect XP increase for flash effect
  const didIncrease = xp > prevXPRef.current;
  useEffect(() => {
    prevXPRef.current = xp;
  }, [xp]);

  const progressWidth = useTransform(springProgress, (v: number) => `${Math.min(v, 100)}%`);

  // ── Compact variant ────────────────────────────────────────
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Lv{LEVELS.indexOf(currentLevel) + 1}
        </span>
        <div className="relative w-20 h-2 rounded-full bg-gray-800/60 overflow-hidden border border-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            style={{ width: progressWidth }}
          />
          {/* shimmer */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="xp-shimmer absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
        <span className="text-[10px] text-gray-400 font-medium tabular-nums">
          {formatNumber(xp)}
        </span>

        {/* Inline keyframes */}
        <style>{`
          @keyframes xpShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          .xp-shimmer {
            animation: xpShimmer 2.4s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // ── Full variant ───────────────────────────────────────────
  return (
    <div className="w-full max-w-md">
      {/* Header row */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {/* Level badge */}
          <motion.div
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">{currentLevel.icon}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-xs font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent leading-none">
              Level {LEVELS.indexOf(currentLevel) + 1}
            </span>
            <span className="text-[10px] text-gray-400 leading-none mt-0.5">
              {currentLevel.title}
            </span>
          </div>
        </div>

        {/* XP numbers */}
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-xs font-semibold text-gray-300 tabular-nums">
            <motion.span
              key={xp}
              initial={didIncrease ? { scale: 1.3, color: '#c084fc' } : false}
              animate={{ scale: 1, color: '#d1d5db' }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
            >
              {formatNumber(xp)}
            </motion.span>
            {' / '}
            <span className="text-gray-500">{formatNumber(displayTarget)} XP</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 rounded-full bg-gray-800/70 overflow-hidden border border-white/10 shadow-inner">
        {/* Gradient fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{ width: progressWidth }}
          transition={{ type: 'spring' as const, stiffness: 60, damping: 20 }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" />
          {/* Right edge glow */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-white/40 to-transparent rounded-full" />
        </motion.div>

        {/* Shimmer sweep */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="xp-shimmer-full absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {/* Ambient glow behind bar */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-40 blur-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{ width: progressWidth }}
        />
      </div>

      {/* XP to next level */}
      {nextLevel && (
        <div className="flex justify-end mt-1">
          <span className="text-[10px] text-gray-500">
            {formatNumber(xpNeededForLevel - currentXPInLevel)} XP to {nextLevel.title}
          </span>
        </div>
      )}

      <style>{`
        @keyframes xpShimmerFull {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(600%); }
        }
        .xp-shimmer-full {
          animation: xpShimmerFull 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
