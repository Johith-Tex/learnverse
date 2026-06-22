'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getLesson } from '@/data/lessonData';
import { useGame } from '@/context/GameContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Mascot from '@/components/mascot/Mascot';
import VisualDiagram from './VisualDiagram';
import QuizChallenge from './QuizChallenge';
import LessonComplete from './LessonComplete';

export default function LessonViewer({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId);
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const showMascotMessage = (msg: string, mood: 'idle' | 'wave' | 'celebrate' | 'sleep' | 'curious' | 'excited') => {
    window.dispatchEvent(new CustomEvent('mascot-mood', { detail: mood }));
    window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: msg, visible: true } }));
    
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
      window.dispatchEvent(new CustomEvent('mascot-mood', { detail: null }));
    }, 5000);
  };

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
        <AnimatedButton variant="primary" onClick={() => router.push('/explore')}>
          Return to Explore
        </AnimatedButton>
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / lesson.steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      if (Math.random() > 0.5) {
        showMascotMessage("You're doing great! Keep going!", "excited");
      }
    } else {
      setIsCompleted(true);
      showMascotMessage(lesson.mascotOutro || "You did it! Lesson complete!", 'celebrate');
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      showMascotMessage("That's exactly right! Brilliant!", "celebrate");
    } else {
      showMascotMessage("Don't worry, mistakes help us learn. Try again!", "curious");
    }
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'visual':
        return <VisualDiagram step={currentStep} />;
      case 'quiz':
        return <QuizChallenge step={currentStep} onComplete={handleQuizComplete} />;
      case 'info':
        return (
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-8">{currentStep.title}</h2>
            <div className="text-xl leading-relaxed text-text-secondary glass p-8 rounded-3xl">
              {currentStep.content}
            </div>
          </div>
        );
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col overflow-hidden relative">
      
      {/* Top Navigation & Progress Bar */}
      <div className="flex-shrink-0 w-full pt-8 px-6 lg:px-12 flex flex-col gap-4 relative z-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/explore')}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
          >
            <X size={24} />
            <span className="font-medium hidden md:inline">Exit Lesson</span>
          </button>
          
          <div className="text-sm font-bold text-text-muted tracking-wider uppercase">
            {lesson.subject}
          </div>
          
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-2xl mx-auto flex items-center gap-4">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-sm font-bold text-text-secondary whitespace-nowrap">
            {currentStepIndex + 1} / {lesson.steps.length}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6 lg:p-12 relative z-10 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar */}
      <div className="flex-shrink-0 w-full p-6 lg:p-8 bg-gradient-to-t from-bg-primary via-bg-primary/90 to-transparent relative z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <AnimatedButton
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className={currentStepIndex === 0 ? 'opacity-0 pointer-events-none' : ''}
          >
            <ChevronLeft className="mr-2" />
            Previous
          </AnimatedButton>

          {currentStep.type !== 'quiz' && (
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="px-12 text-lg"
            >
              {currentStepIndex === lesson.steps.length - 1 ? 'Finish Lesson' : 'Continue'}
              {currentStepIndex !== lesson.steps.length - 1 && <ChevronRight className="ml-2" />}
            </AnimatedButton>
          )}
        </div>
      </div>

      {isCompleted && (
        <LessonComplete 
          lesson={lesson} 
          onContinue={() => router.push('/explore')} 
        />
      )}
    </div>
  );
}
