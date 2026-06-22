'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonStep } from '@/data/lessonData';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function QuizChallenge({ 
  step, 
  onComplete 
}: { 
  step: LessonStep, 
  onComplete: (isCorrect: boolean) => void 
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (step.type !== 'quiz' || !step.options) return null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const isCorrect = selectedOption === step.correctAnswer;
  const prefixes = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 w-full"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{step.title}</h2>
        <p className="text-xl text-text-secondary">{step.content}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        {step.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrectOpt = idx === step.correctAnswer;
          
          let stateClass = "border-white/10 hover:border-indigo-500/50 hover:bg-white/5";
          if (isAnswered) {
            if (isSelected && isCorrectOpt) stateClass = "border-green-500 bg-green-500/10 text-green-50 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
            else if (isSelected && !isCorrectOpt) stateClass = "border-red-500 bg-red-500/10 text-red-50";
            else if (isCorrectOpt) stateClass = "border-green-500/50 bg-green-500/5 border-dashed";
            else stateClass = "border-white/5 opacity-50";
          }

          return (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: (isAnswered && isSelected && !isCorrectOpt) ? [0, -10, 10, -10, 10, 0] : 0 // shake on wrong
              }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              whileHover={!isAnswered ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(idx)}
              className={`
                p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4
                bg-bg-secondary/50 backdrop-blur-md
                ${stateClass}
                ${!isAnswered ? 'hover:shadow-lg' : ''}
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0
                ${isAnswered && isSelected && isCorrectOpt ? 'bg-green-500 text-white' : 
                  isAnswered && isSelected && !isCorrectOpt ? 'bg-red-500 text-white' : 
                  'bg-white/10 text-text-secondary'}
              `}>
                {prefixes[idx]}
              </div>
              <span className="text-lg font-medium">{opt}</span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className={`text-2xl font-bold font-heading ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '✨ Brilliant!' : 'Not quite right. Try again later.'}
            </div>
            
            <AnimatedButton 
              variant={isCorrect ? 'primary' : 'ghost'}
              size="lg"
              onClick={() => onComplete(isCorrect)}
              className="w-full max-w-sm"
            >
              Continue
            </AnimatedButton>
          </motion.div>
        )}

        {!isAnswered && step.hint && (
          <motion.div className="mt-8">
            <button 
              onClick={() => setShowHint(true)}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-4"
            >
              Need a hint?
            </button>
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 glass rounded-xl text-sm text-text-secondary max-w-md text-center"
              >
                💡 {step.hint}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
