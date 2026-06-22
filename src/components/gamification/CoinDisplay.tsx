'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { formatNumber } from '@/lib/utils';

interface CoinDisplayProps {
  compact?: boolean;
}

function AnimatedCoinNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (v: number) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display as unknown as React.ReactNode}</motion.span>;
}

export default function CoinDisplay({ compact = false }: CoinDisplayProps) {
  const { coins } = useGame();
  const prevCoins = useRef(coins);
  const [floatingDelta, setFloatingDelta] = useState<number | null>(null);

  useEffect(() => {
    const delta = coins - prevCoins.current;
    if (delta > 0) {
      setFloatingDelta(delta);
      const timer = setTimeout(() => setFloatingDelta(null), 1200);
      return () => clearTimeout(timer);
    }
    prevCoins.current = coins;
  }, [coins]);

  useEffect(() => {
    prevCoins.current = coins;
  }, [coins]);

  // ── Compact ────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="flex items-center gap-1 group relative">
        {/* Coin icon */}
        <div className="coin-icon-compact relative w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 flex items-center justify-center shadow-sm shadow-amber-500/30 border border-yellow-500/30">
          <span className="text-[8px] font-bold text-yellow-900">₵</span>
        </div>

        <span className="text-xs font-bold text-amber-300 tabular-nums">
          <AnimatedCoinNumber value={coins} />
        </span>

        {/* Floating +N */}
        <AnimatePresence>
          {floatingDelta !== null && (
            <motion.span
              className="absolute -top-4 left-1/2 text-[10px] font-bold text-green-400 pointer-events-none whitespace-nowrap"
              initial={{ opacity: 1, y: 0, x: '-50%' }}
              animate={{ opacity: 0, y: -16, x: '-50%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              +{floatingDelta}
            </motion.span>
          )}
        </AnimatePresence>

        <style jsx>{`
          @keyframes coinSpinCompact {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .group:hover .coin-icon-compact {
            animation: coinSpinCompact 0.6s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // ── Full ───────────────────────────────────────────────────
  return (
    <motion.div
      className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-gray-900/40 shadow-xl group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      {/* Coin icon */}
      <div className="coin-icon relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25 border border-yellow-500/30">
        <span className="text-lg font-extrabold text-yellow-900 drop-shadow-sm">₵</span>
        {/* Shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
        {/* Inner ring */}
        <div className="absolute inset-1.5 rounded-full border border-yellow-600/30" />
      </div>

      {/* Number */}
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent tabular-nums">
          <AnimatedCoinNumber value={coins} />
        </span>
        <span className="text-[10px] text-gray-500 font-medium -mt-0.5">Coins</span>
      </div>

      {/* Floating +N */}
      <AnimatePresence>
        {floatingDelta !== null && (
          <motion.div
            className="absolute -top-6 right-4 flex items-center gap-0.5 pointer-events-none"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -24, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span className="text-sm font-bold text-green-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.5)]">
              +{floatingDelta}
            </span>
            <span className="text-xs">🪙</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .group:hover .coin-icon {
          animation: coinSpin 0.8s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
}
