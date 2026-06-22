'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useVelocity, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MascotSpeech } from './MascotSpeech';

export type MascotMood = 'idle' | 'wave' | 'celebrate' | 'sleep' | 'curious' | 'excited' | 'zoom';

export interface MascotProps {
  mood?: MascotMood;
  onClick?: () => void;
  className?: string;
  speechMessage?: string;
  isSpeechVisible?: boolean;
}

const VIDEO_MAP: Record<MascotMood | 'fly', string> = {
  idle: '/assets/mascot/bg_idle.webm',
  wave: '/assets/mascot/bd_proud.webm',
  celebrate: '/assets/mascot/bg_celebration.webm',
  sleep: '/assets/mascot/bg_idle.webm', // fallback if sleep isn't available
  curious: '/assets/mascot/bg_thinking.webm',
  excited: '/assets/mascot/bg_cheering.webm',
  fly: '/assets/mascot/bg_fly.webm',
  zoom: '/assets/mascot/bg_zoom.webm'
};

export default function Mascot({ mood = 'idle', onClick, className = '', speechMessage = '', isSpeechVisible = false }: MascotProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [isStalled, setIsStalled] = useState(false);
  const [eventMood, setEventMood] = useState<MascotMood | null>(null);
  const [eventSpeech, setEventSpeech] = useState<{ message: string, visible: boolean } | null>(null);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 60 });

  const yOffset = useTransform(smoothVelocity, [-1000, 0, 1000], [100, 0, -100]);
  const xOffset = useTransform(smoothScrollY, (y) => (Math.sin(y / 150) - 1) * 60);

  useMotionValueEvent(smoothVelocity, "change", (latest) => {
    if (Math.abs(latest) > 50 && !isFlying) {
      setIsFlying(true);
    } else if (Math.abs(latest) <= 50 && isFlying) {
      setIsFlying(false);
    }
  });

  useEffect(() => {
    setIsMounted(true);
    
    const handleMoodEvent = (e: CustomEvent<MascotMood | null>) => {
      setEventMood(e.detail);
    };
    
    const handleSpeechEvent = (e: CustomEvent<{ message: string, visible: boolean }>) => {
      setEventSpeech(e.detail);
    };
    
    window.addEventListener('mascot-mood', handleMoodEvent as EventListener);
    window.addEventListener('mascot-speech', handleSpeechEvent as EventListener);
    
    return () => {
      window.removeEventListener('mascot-mood', handleMoodEvent as EventListener);
      window.removeEventListener('mascot-speech', handleSpeechEvent as EventListener);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsStalled(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsStalled(true);
      }, 5000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const pathname = usePathname();
  const isExplorePage = pathname?.includes('/explore');

  useEffect(() => {
    let message = '';
    if (pathname === '/explore') {
      message = "Welcome to the LearnVerse! Click on a planet to begin exploring.";
    } else if (pathname === '/dashboard' || pathname === '/') {
      message = "Your dashboard is looking great today! Let's keep that streak going!";
    } else if (pathname?.includes('/achievements')) {
      message = "Wow, look at all those badges! You're doing amazing!";
    }

    if (message) {
      const timer1 = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message, visible: true } }));
        window.dispatchEvent(new CustomEvent('mascot-mood', { detail: 'excited' }));
      }, 1000);
      
      const timer2 = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
        window.dispatchEvent(new CustomEvent('mascot-mood', { detail: null }));
      }, 7000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (isFlying) {
      const tips = ["Wheeeee!", "Going fast!", "Slow down, you're making me dizzy!", "Catch me if you can!"];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: randomTip, visible: true } }));
      
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFlying]);

  useEffect(() => {
    if (isStalled && isExplorePage) {
      const tips = [
        "Taking a break? Or just admiring the view?",
        "I'm still here when you're ready!",
        "Don't forget to keep your learning streak alive!",
        "Need some help deciding where to go next?"
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: randomTip, visible: true } }));
      
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isStalled, isExplorePage]);

  useEffect(() => {
    const timer = setInterval(() => {
       if (!eventSpeech?.visible && !isSpeechVisible) {
          const generalTips = [
            "Did you know you can earn coins by completing quizzes?",
            "Explore the map to unlock new continents!",
            "I love exploring with you!",
            "Learning is an adventure!",
            "Make sure to practice every day to level up!",
            "Every expert was once a beginner!"
          ];
          const tip = generalTips[Math.floor(Math.random() * generalTips.length)];
          window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: tip, visible: true } }));
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
          }, 4000);
       }
    }, 15000);
    return () => clearInterval(timer);
  }, [eventSpeech?.visible, isSpeechVisible]);

  const currentAnimation = eventMood || ((isExplorePage && isStalled) ? 'zoom' : (isFlying ? 'fly' : mood));
  const currentVideoSrc = VIDEO_MAP[currentAnimation] || VIDEO_MAP.idle;

  const currentSpeechMessage = eventSpeech?.visible ? eventSpeech.message : speechMessage;
  const currentSpeechVisible = eventSpeech?.visible || isSpeechVisible;

  const uniqueVideos = Array.from(new Set(Object.values(VIDEO_MAP)));

  return (
    <motion.div 
      className={`fixed bottom-8 right-8 z-50 w-48 h-48 cursor-pointer drop-shadow-2xl hover:scale-105 transition-transform duration-300 ${className}`}
      style={{ y: yOffset, x: xOffset }}
      onClick={onClick}
    >
      <MascotSpeech message={currentSpeechMessage} isVisible={currentSpeechVisible} />

      {isMounted && (
        <div className="relative w-full h-full pointer-events-none">
          {uniqueVideos.map((videoSrc) => (
            <video 
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
                currentVideoSrc === videoSrc ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
