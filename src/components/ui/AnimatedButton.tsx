'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      window.dispatchEvent(new CustomEvent('mascot-mood', { detail: 'wave' }));
      
      // Try to extract text from children to make Sparky say something relevant
      let textContent = '';
      if (typeof children === 'string') {
        textContent = children;
      } else if (Array.isArray(children)) {
        const strChild = children.find(c => typeof c === 'string');
        if (strChild) textContent = strChild as string;
      }

      if (textContent) {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: `Click to ${textContent.toLowerCase()}!`, visible: true } }));
      } else {
        window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: "Ooh, a button! Click it!", visible: true } }));
      }
    }
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      window.dispatchEvent(new CustomEvent('mascot-mood', { detail: null }));
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
    }
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]',
    secondary: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-transparent hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white border-transparent hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]',
    ghost: 'bg-transparent text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={buttonRef}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isDisabled}
      className={`relative overflow-hidden font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      <AnimatePresence mode="popLayout">
        {loading && (
          <motion.div
            initial={{ opacity: 0, width: 0, scale: 0 }}
            animate={{ opacity: 1, width: 'auto', scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Loader2 className="animate-spin w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 dark:bg-white/20 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ripple-effect {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple-effect 0.6s linear;
        }
      `}} />
    </motion.button>
  );
}
