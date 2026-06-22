'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGame, LEVELS } from '@/context/GameContext';

interface LevelBadgeProps {
  size?: 'sm' | 'md' | 'lg';
}

const LEVEL_GRADIENTS: Record<string, string> = {
  explorer:  'from-blue-400 via-blue-500 to-cyan-500',
  traveler:  'from-emerald-400 via-green-500 to-teal-500',
  scholar:   'from-purple-400 via-violet-500 to-fuchsia-500',
  master:    'from-yellow-400 via-amber-500 to-orange-500',
  navigator: 'from-red-400 via-purple-500 to-blue-500',
};

const LEVEL_SHADOW: Record<string, string> = {
  explorer:  'shadow-blue-500/30',
  traveler:  'shadow-green-500/30',
  scholar:   'shadow-purple-500/30',
  master:    'shadow-amber-500/30',
  navigator: 'shadow-purple-500/30',
};

const LEVEL_GLOW: Record<string, string> = {
  explorer:  'bg-blue-500/15',
  traveler:  'bg-green-500/15',
  scholar:   'bg-purple-500/15',
  master:    'bg-amber-500/15',
  navigator: 'bg-fuchsia-500/15',
};

const SIZE_CONFIG = {
  sm: {
    outer: 'w-10 h-10',
    inner: 'w-[34px] h-[34px]',
    icon: 'text-base',
    padding: 'p-[3px]',
  },
  md: {
    outer: 'w-16 h-16',
    inner: 'w-[54px] h-[54px]',
    icon: 'text-2xl',
    padding: 'p-[5px]',
  },
  lg: {
    outer: 'w-24 h-24',
    inner: 'w-[82px] h-[82px]',
    icon: 'text-4xl',
    padding: 'p-[7px]',
  },
};

export default function LevelBadge({ size = 'md' }: LevelBadgeProps) {
  const { currentLevel } = useGame();
  const levelName = currentLevel.name;
  const levelIndex = LEVELS.indexOf(currentLevel);

  const gradient = LEVEL_GRADIENTS[levelName] ?? LEVEL_GRADIENTS.explorer;
  const shadow = LEVEL_SHADOW[levelName] ?? LEVEL_SHADOW.explorer;
  const glow = LEVEL_GLOW[levelName] ?? LEVEL_GLOW.explorer;
  const cfg = SIZE_CONFIG[size];

  return (
    <motion.div
      className="relative flex flex-col items-center gap-1.5 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer pulse ring */}
      <div className="relative">
        <motion.div
          className={`absolute inset-0 rounded-full ${glow} blur-md`}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient border ring */}
        <div
          className={`relative ${cfg.outer} rounded-full bg-gradient-to-br ${gradient} ${cfg.padding} shadow-lg ${shadow}`}
        >
          {/* Inner circle */}
          <div
            className={`${cfg.inner} rounded-full bg-gray-900 dark:bg-gray-950 flex items-center justify-center relative overflow-hidden`}
          >
            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

            {/* Level icon */}
            <span className={`${cfg.icon} relative z-10 drop-shadow-md`}>
              {currentLevel.icon}
            </span>
          </div>
        </div>

        {/* Level number badge */}
        {size !== 'sm' && (
          <motion.div
            className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white font-bold shadow-md ${
              size === 'lg' ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-[10px]'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
          >
            {levelIndex + 1}
          </motion.div>
        )}
      </div>

      {/* Title (only for md and lg) */}
      {size !== 'sm' && (
        <div className="text-center">
          <p
            className={`font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${
              size === 'lg' ? 'text-sm' : 'text-xs'
            }`}
          >
            {currentLevel.title}
          </p>
        </div>
      )}

      {/* Navigator rainbow spin ring (special case) */}
      {levelName === 'navigator' && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className={`${cfg.outer} rounded-full border-2 border-transparent`}
            style={{
              backgroundImage:
                'conic-gradient(from 0deg, #f87171, #a78bfa, #60a5fa, #34d399, #fbbf24, #f87171)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
}
