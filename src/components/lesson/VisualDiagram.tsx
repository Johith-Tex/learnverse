'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LessonStep } from '@/data/lessonData';

export default function VisualDiagram({ step }: { step: LessonStep }) {
  if (step.type !== 'visual') return null;

  const renderVisual = () => {
    switch (step.visualType) {
      case 'graph':
        return <GraphVisual />;
      case 'diagram':
        return <EquationVisual />;
      case 'animation':
        return <AnimationVisual />;
      default:
        return <div className="text-xl text-text-muted">Visual not available</div>;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 max-w-3xl"
      >
        <h2 className="text-4xl font-heading font-bold mb-4">{step.title}</h2>
        <p className="text-xl text-text-secondary">{step.content}</p>
      </motion.div>

      <div className="w-full max-w-4xl aspect-video glass rounded-3xl overflow-hidden relative flex items-center justify-center p-8 border border-white/10 shadow-2xl">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {renderVisual()}
      </div>
    </div>
  );
}

// Interactive Coordinate Plane
function GraphVisual() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-w-2xl drop-shadow-xl z-10 overflow-visible">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" opacity="0.5" />
        </marker>
      </defs>

      {/* Grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {[...Array(11)].map((_, i) => (
          <React.Fragment key={i}>
            <line x1={0} y1={i * 30} x2={400} y2={i * 30} />
            <line x1={i * 40} y1={0} x2={i * 40} y2={300} />
          </React.Fragment>
        ))}
      </g>

      {/* Axes */}
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="2" markerEnd="url(#arrowhead)">
        <line x1={20} y1={280} x2={380} y2={280} /> {/* X axis */}
        <line x1={40} y1={280} x2={40} y2={20} /> {/* Y axis */}
      </g>

      <text x={380} y={295} fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="monospace">x</text>
      <text x={25} y={20} fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="monospace">y</text>

      {/* Animated Line y = 2x + 1 */}
      <motion.path
        d="M 40 250 L 300 50"
        stroke="#8b5cf6" // purple
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Highlight Points */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <circle cx={40} cy={250} r={5} fill="#10b981" />
        <text x={50} y={260} fill="#10b981" fontSize="12" fontWeight="bold">(0, 1)</text>

        <circle cx={170} cy={150} r={5} fill="#3b82f6" />
        <text x={180} y={160} fill="#3b82f6" fontSize="12" fontWeight="bold">(1, 3)</text>
      </motion.g>
    </svg>
  );
}

function EquationVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 z-10 w-full">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-heading font-bold tracking-widest flex items-center gap-4"
      >
        <motion.span 
          initial={{ y: 20 }} animate={{ y: 0 }} 
          className="text-purple-400 p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20"
        >
          2x
        </motion.span>
        <span className="text-white/50">+</span>
        <motion.span 
          initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}
          className="text-emerald-400 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"
        >
          5
        </motion.span>
        <span className="text-white/50">=</span>
        <motion.span 
          initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}
          className="text-amber-400 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20"
        >
          13
        </motion.span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="flex gap-16 text-sm font-medium text-text-secondary uppercase tracking-widest"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-purple-500/50" />
          <span className="text-purple-400">Variable Term</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-emerald-500/50" />
          <span className="text-emerald-400">Constant</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-amber-500/50" />
          <span className="text-amber-400">Result</span>
        </div>
      </motion.div>
    </div>
  );
}

function AnimationVisual() {
  return (
    <div className="relative w-64 h-64 z-10 flex items-center justify-center">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 8, ease: "linear", repeat: Infinity },
          scale: { duration: 4, ease: "easeInOut", repeat: Infinity }
        }}
        className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-500/50"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        className="absolute inset-4 rounded-full border-2 border-emerald-500/30"
      />
      <div className="text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        ✨
      </div>
    </div>
  );
}
