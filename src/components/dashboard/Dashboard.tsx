'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useNavigation } from '@/context/NavigationContext';
import { getTimeOfDay } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Trophy, Star, Flame, Coins, BookOpen, Compass } from 'lucide-react';
import { getAchievement } from '@/data/achievements';
import { getLesson } from '@/data/lessonData';

export default function Dashboard() {
  const gameState = useGame();
  const { navigateTo } = useNavigation();
  const timeOfDay = getTimeOfDay();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  const getGreetingGradient = () => {
    switch (timeOfDay) {
      case 'morning': return 'from-orange-400 to-amber-200';
      case 'evening': return 'from-indigo-400 to-purple-400';
      case 'night': return 'from-blue-900 to-indigo-800 text-white';
      default: return 'from-blue-400 to-cyan-300'; // afternoon
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 pt-24 pb-32">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
        className="flex flex-col gap-8"
      >
        {/* Top Greeting Banner */}
        <motion.div variants={itemVariants}>
          <div className={`
            w-full rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden
            bg-gradient-to-r ${getGreetingGradient()}
          `}>
            {/* Ambient background blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 drop-shadow-sm text-white">
                Good {timeOfDay}, Explorer!
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                "The universe is full of magical things patiently waiting for our wits to grow sharper."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-indigo-500">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl">
              <Star />
            </div>
            <div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wider">Total XP</div>
              <div className="text-2xl font-bold font-heading">{gameState.xp.toLocaleString()}</div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-orange-500">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl">
              <Flame />
            </div>
            <div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wider">Day Streak</div>
              <div className="text-2xl font-bold font-heading">{gameState.streak}</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-yellow-500">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-2xl">
              <Coins />
            </div>
            <div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wider">Coins</div>
              <div className="text-2xl font-bold font-heading">{gameState.coins.toLocaleString()}</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
              <BookOpen />
            </div>
            <div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wider">Lessons</div>
              <div className="text-2xl font-bold font-heading">{gameState.completedLessons.length}</div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Wider) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Continue Journey */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8 relative overflow-hidden group">
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
                      <Compass className="text-indigo-400" />
                      Continue Your Journey
                    </h2>
                    <p className="text-text-secondary mb-4">
                      You were last exploring the Mathematical mountains.
                    </p>
                    <div className="flex items-center gap-2 text-sm bg-bg-secondary p-2 rounded-lg w-max border border-white/5">
                      <span className="text-indigo-400">World</span>
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                      <span>Mathematics</span>
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                      <span>Algebra</span>
                    </div>
                  </div>
                  
                  <AnimatedButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigateTo('world')}
                    className="w-full md:w-auto min-w-[200px]"
                  >
                    Resume Exploration
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Recommended Lessons */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-heading font-bold mb-4">Recommended Next Lessons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'math-alg-1', title: 'Equations Basics', subj: 'Math', time: '5 min', xp: 50 },
                  { id: 'math-alg-2', title: 'Variables', subj: 'Math', time: '8 min', xp: 75 }
                ].map((rec, i) => (
                  <GlassCard key={i} className="p-5 flex flex-col gap-4 border-t-4 border-t-indigo-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">{rec.subj}</div>
                        <h4 className="font-heading font-bold text-lg">{rec.title}</h4>
                      </div>
                      <div className="bg-white/5 px-2 py-1 rounded text-xs font-medium border border-white/10">
                        {rec.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                      <div className="text-sm font-medium text-purple-400 flex items-center gap-1">
                        ✨ +{rec.xp} XP
                      </div>
                      <AnimatedButton variant="ghost" size="sm" onClick={() => {}}>
                        Start
                      </AnimatedButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column (Narrower) */}
          <div className="flex flex-col gap-8">
            
            {/* Weekly Goals */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <h3 className="text-xl font-heading font-bold mb-6">Weekly Goals</h3>
                <div className="flex flex-col gap-6">
                  <GoalProgress title="Complete 5 lessons" current={gameState.completedLessons.length} target={5} color="#10b981" />
                  <GoalProgress title="Earn 500 XP" current={gameState.xp % 500} target={500} color="#8b5cf6" />
                  <GoalProgress title="Maintain streak" current={gameState.streak % 7} target={7} color="#f97316" />
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-400 w-5 h-5" />
                  Recent Achievements
                </h3>
                
                {gameState.unlockedAchievements.length === 0 ? (
                  <div className="text-center py-6 text-text-muted bg-white/5 rounded-xl border border-white/5">
                    No achievements yet.<br/>Start exploring to earn some!
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {gameState.unlockedAchievements.slice(-3).reverse().map(achId => {
                      const ach = getAchievement(achId);
                      if (!ach) return null;
                      return (
                        <div key={achId} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                          <div className="text-2xl bg-bg-secondary p-2 rounded-lg">{ach.icon}</div>
                          <div>
                            <div className="font-heading font-bold text-sm leading-tight">{ach.name}</div>
                            <div className="text-xs text-text-secondary truncate">{ach.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </GlassCard>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}

// Simple internal component for the goals
function GoalProgress({ title, current, target, color }: { title: string, current: number, target: number, color: string }) {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));
  const r = 20;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (percentage / 100) * circ;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle cx="24" cy="24" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
          <motion.circle 
            cx="24" cy="24" r={r} 
            stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"
            initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {Math.round(percentage)}%
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-text-secondary">{current} / {target}</div>
      </div>
    </div>
  );
}

// Internal icon
function ChevronRight(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
