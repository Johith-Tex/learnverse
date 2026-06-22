'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const CONFETTI_COLORS = [
  '#f43f5e', // rose
  '#8b5cf6', // violet
  '#3b82f6', // blue
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#f97316', // orange
  '#eab308', // yellow
  '#a855f7', // purple
];

const SHAPES = ['square', 'circle', 'strip'] as const;
type Shape = (typeof SHAPES)[number];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  shape: Shape;
  delay: number;
  duration: number;
  wobbleAmplitude: number;
  wobbleFrequency: number;
}

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 5 + Math.random() * 10,
    rotation: Math.random() * 360,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    delay: Math.random() * 0.6,
    duration: 2 + Math.random() * 1.5,
    wobbleAmplitude: 30 + Math.random() * 60,
    wobbleFrequency: 2 + Math.random() * 3,
  }));
}

function PieceShape({ piece }: { piece: ConfettiPiece }) {
  const baseStyle = {
    width: piece.shape === 'strip' ? piece.size * 0.4 : piece.size,
    height: piece.shape === 'strip' ? piece.size * 1.6 : piece.size,
    backgroundColor: piece.color,
  };

  switch (piece.shape) {
    case 'circle':
      return <div style={{ ...baseStyle, borderRadius: '50%' }} />;
    case 'strip':
      return <div style={{ ...baseStyle, borderRadius: 2 }} />;
    default:
      return <div style={{ ...baseStyle, borderRadius: 2 }} />;
  }
}

export default function Confetti({ isActive, onComplete }: ConfettiProps) {
  const [show, setShow] = useState(false);
  const pieces = useMemo(() => generatePieces(60), []);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: -20,
              }}
              initial={{
                y: -20,
                x: 0,
                rotate: piece.rotation,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 40 : 1100,
                x: [
                  0,
                  piece.wobbleAmplitude,
                  -piece.wobbleAmplitude * 0.7,
                  piece.wobbleAmplitude * 0.5,
                  -piece.wobbleAmplitude * 0.3,
                  0,
                ],
                rotate: piece.rotation + 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
                opacity: [1, 1, 1, 0.8, 0],
                scale: [0, 1.2, 1, 1, 0.6],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
                x: {
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeInOut',
                },
              }}
            >
              <PieceShape piece={piece} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
