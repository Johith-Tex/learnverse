'use client';

import React, { useState, useEffect } from 'react';

interface Particle {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

interface MapParticlesProps {
  color?: string;
  count?: number;
}

export default function MapParticles({ color = '#ffffff', count = 30 }: MapParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 3}s`,
      animationDelay: `-${Math.random() * 5}s`,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: color,
            opacity: p.opacity,
            animation: `floatUp ${p.animationDuration} ease-in-out infinite alternate`,
            animationDelay: p.animationDelay,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.1); }
            100% { transform: translateY(-40px) scale(0.9); }
          }
        `
      }} />
    </div>
  );
}
