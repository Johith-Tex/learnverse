'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MascotSpeechProps {
  message: string;
  isVisible: boolean;
}

export function MascotSpeech({ message, isVisible }: MascotSpeechProps) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedText('');
      return;
    }

    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      i++;
      if (i <= message.length) {
        // Use slice to guarantee we get exactly the right characters, avoiding React StrictMode double-invocation bugs
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDisplayedText(message.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, 30); // slightly faster for better feel

    return () => clearInterval(timer);
  }, [message, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10, transition: { duration: 0.2 } }}
          className="absolute bottom-full right-[60%] mb-2 w-64 p-4 rounded-2xl rounded-br-none bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-2xl border border-white/50 dark:border-white/10 z-50 pointer-events-none"
        >
          <p className="text-gray-800 dark:text-gray-100 text-sm font-semibold leading-relaxed">
            {displayedText}
            {displayedText.length < message.length && (
              <span className="animate-pulse inline-block w-[4px] h-[1em] ml-1 bg-indigo-500 align-middle"></span>
            )}
          </p>
          
          {/* Tail */}
          <div className="absolute top-full right-0 w-6 h-6 overflow-hidden">
            <div className="w-6 h-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-r border-white/50 dark:border-white/10 transform rotate-45 -translate-y-4 translate-x-3 shadow-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
