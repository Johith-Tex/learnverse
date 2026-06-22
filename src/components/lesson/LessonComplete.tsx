'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lesson } from '@/data/lessonData';
import { useGame } from '@/context/GameContext';
import Confetti from '@/components/gamification/Confetti';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Trophy } from 'lucide-react';

export default function LessonComplete({ 
  lesson, 
  onContinue 
}: { 
  lesson: Lesson, 
  onContinue: () => void 
}) {
  const { completeLesson } = useGame();

  useEffect(() => {
    // Register completion when this component mounts
    completeLesson(lesson.id, lesson.xpReward, lesson.coinReward);
  }, [lesson, completeLesson]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <Confetti isActive={true} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring' as const, damping: 20, stiffness: 300 }}
        className="w-full max-w-lg"
      >
        <GlassCard className="p-10 text-center relative overflow-hidden">
          {/* Animated glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Trophy Icon */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' as const, bounce: 0.6 }}
              className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.5)] mb-8 border-4 border-yellow-200"
            >
              <Trophy className="w-16 h-16 text-yellow-900" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-heading font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-sm"
            >
              Lesson Complete!
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-text-secondary mb-8"
            >
              You've mastered {lesson.title}
            </motion.p>

            {/* Rewards */}
            <div className="flex gap-6 mb-10 w-full justify-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 flex-1 max-w-[140px]"
              >
                <div className="text-3xl mb-2">✨</div>
                <div className="text-2xl font-heading font-bold text-purple-400">+{lesson.xpReward}</div>
                <div className="text-xs uppercase tracking-wider text-text-muted mt-1">XP Earned</div>
              </motion.div>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 flex-1 max-w-[140px]"
              >
                <div className="text-3xl mb-2">🪙</div>
                <div className="text-2xl font-heading font-bold text-yellow-400">+{lesson.coinReward}</div>
                <div className="text-xs uppercase tracking-wider text-text-muted mt-1">Coins Earned</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="w-full"
            >
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                className="w-full text-lg py-4"
                onClick={onContinue}
              >
                Continue Exploring
              </AnimatedButton>
            </motion.div>

          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
