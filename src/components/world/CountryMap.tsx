'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCountry } from '@/data/worldData';
import { useNavigation } from '@/context/NavigationContext';

export default function CountryMap({ continentId, countryId }: { continentId: string, countryId: string }) {
  const { navigateTo } = useNavigation();
  const router = useRouter();

  // If this is the ui-ux hardcoded mock image view:
  if (countryId === 'ui-ux') {
    const subcourses = [
      { id: 1, name: 'Figma Fundamentals', top: '35%', left: '25%', lessonId: 'figma-basics' },
      { id: 2, name: 'Color Theory & Typography', top: '20%', left: '55%', lessonId: 'color-theory' },
      { id: 3, name: 'Wireframing', top: '55%', left: '70%', lessonId: 'wireframing' },
      { id: 4, name: 'Interactive Prototyping', top: '70%', left: '40%', lessonId: 'prototyping' },
    ];

    const handleMouseEnter = (name: string) => {
      window.dispatchEvent(new CustomEvent('mascot-mood', { detail: 'curious' }));
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: `Ready to master ${name}?`, visible: true } }));
    };
    
    const handleMouseLeave = () => {
      window.dispatchEvent(new CustomEvent('mascot-mood', { detail: null }));
      window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
    };

    return (
      <div className="absolute inset-0 w-full h-screen bg-bg-primary overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image 
            src="/assets/explore/continent_1.png"
            alt="UI/UX Region"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-12 left-0 right-0 z-20 text-center pointer-events-none"
        >
          <h1 className="text-5xl font-heading font-black mb-2 text-white drop-shadow-xl uppercase tracking-wider" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)' }}>
            UI/UX Engineering
          </h1>
          <p className="text-xl font-bold text-white max-w-2xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Select a learning module to begin your training.
          </p>
        </motion.div>

        {/* Interactive Subcourses */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {subcourses.map((course, idx) => (
            <motion.button
              key={course.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + (idx * 0.1), type: 'spring' }}
              className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full border-2 border-pink-400/60 bg-pink-500/20 hover:bg-pink-500/40 hover:border-pink-300 transition-all duration-300 cursor-pointer pointer-events-auto backdrop-blur-md group flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:scale-110"
              style={{ top: course.top, left: course.left }}
              onMouseEnter={() => handleMouseEnter(course.name)}
              onMouseLeave={handleMouseLeave}
              onClick={() => router.push(`/lesson/${course.lessonId}`)}
            >
              {/* Course Node Icon */}
              <div className="w-8 h-8 bg-white/90 rounded-lg shadow-[0_0_10px_white] flex items-center justify-center text-pink-600 font-black rotate-45 group-hover:rotate-180 transition-transform duration-500">
                <span className="-rotate-45 group-hover:-rotate-180 transition-transform duration-500 block">✦</span>
              </div>
              
              {/* Tooltip Label */}
              <div className="absolute -bottom-10 whitespace-nowrap bg-black/80 px-4 py-2 rounded-xl text-white font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 border border-white/20 shadow-xl">
                {course.name}
                <div className="text-xs text-pink-300 mt-1 font-normal uppercase tracking-wider">Start Lesson →</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const country = getCountry(continentId, countryId);

  if (!country) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background with Theme Colors */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(circle at center, ${country.color}, transparent 80%)` }}
      />
      
      {/* Map Content Area */}
      <div className="relative w-full h-full min-h-[800px] overflow-hidden">
        
        {/* SVG Connections (Paths between states) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {country.states.map((state, i) => {
            if (i === 0) return null;
            const prevState = country.states[i - 1];
            return (
              <g key={`path-${state.id}`}>
                {/* Background path (faded) */}
                <path
                  d={`M ${prevState.position.x}% ${prevState.position.y}% L ${state.position.x}% ${state.position.y}%`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Animated progress path (if previous is completed) */}
                {prevState.isCompleted && !state.isLocked && (
                  <motion.path
                    d={`M ${prevState.position.x}% ${prevState.position.y}% L ${state.position.x}% ${state.position.y}%`}
                    stroke={state.color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10 10"
                    className="animate-dash"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* State Nodes */}
        {country.states.map((state, i) => (
          <motion.div
            key={state.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * i + 0.3, type: 'spring' }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${state.position.x}%`, top: `${state.position.y}%`, zIndex: 10 }}
          >
            <div 
              onClick={() => !state.isLocked && navigateTo('state', { stateId: state.id })}
              className={`
                relative flex flex-col items-center cursor-pointer group
                ${state.isLocked ? 'locked-overlay grayscale cursor-not-allowed opacity-80' : ''}
              `}
            >
              {/* Node Circle */}
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: state.isLocked ? '#1a1a2e' : `linear-gradient(135deg, ${state.color}, ${state.color}80)`,
                  border: `4px solid ${state.isLocked ? '#333' : '#fff'}`,
                  boxShadow: !state.isLocked ? `0 0 30px ${state.color}80` : 'none'
                }}
              >
                {state.icon}
                
                {/* Completion Checkmark */}
                {state.isCompleted && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg z-20">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Node Label */}
              <div className="mt-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 whitespace-nowrap text-center">
                <h3 className="font-heading font-bold text-lg">{state.name}</h3>
                {!state.isLocked && (
                  <div className="text-xs text-text-secondary mt-1 max-w-[150px] truncate whitespace-normal leading-tight">
                    {state.cities.length} Cities
                  </div>
                )}
              </div>
              
              {/* Pulse effect for currently active node */}
              {!state.isLocked && !state.isCompleted && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: state.color, zIndex: -1 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
