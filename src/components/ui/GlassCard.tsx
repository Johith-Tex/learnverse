'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.2)',
  onClick,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)] ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${glowColor}`,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
