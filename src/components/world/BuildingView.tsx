'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getCity } from '@/data/worldData';
import { buildingIcons, buildingLabels } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function BuildingView({ 
  continentId, 
  countryId, 
  stateId, 
  cityId 
}: { 
  continentId: string, 
  countryId: string, 
  stateId: string, 
  cityId: string 
}) {
  const city = getCity(continentId, countryId, stateId, cityId);
  const router = useRouter();

  if (!city) return null;

  const handleBuildingClick = (building: typeof city.buildings[0]) => {
    if (building.isLocked || !building.lessonId) return;
    router.push(`/lesson/${building.lessonId}`);
  };

  const getGlowColor = (type: string) => {
    switch (type) {
      case 'school': return '#3b82f6'; // blue
      case 'laboratory': return '#10b981'; // green
      case 'arena': return '#ef4444'; // red
      case 'library': return '#f59e0b'; // amber
      case 'tower': return '#eab308'; // gold
      default: return '#ffffff';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full p-8 pt-24 overflow-y-auto overflow-x-hidden bg-bg-secondary/50">
      <div className="max-w-5xl mx-auto pb-20">
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16 glass max-w-2xl mx-auto p-8 rounded-3xl"
        >
          <div className="text-6xl mb-4 drop-shadow-lg">{city.icon}</div>
          <h2 className="text-4xl font-heading font-bold mb-2">{city.name}</h2>
          <p className="text-text-secondary">{city.description}</p>
        </motion.div>

        {/* Buildings Village Layout */}
        <div className="relative min-h-[400px] flex flex-wrap justify-center gap-12 mt-20">
          
          {/* Decorative ground ellipse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-white/5 rounded-[100%] blur-3xl pointer-events-none" />

          {city.buildings.map((building, idx) => {
            const glowColor = getGlowColor(building.type);
            
            return (
              <motion.div
                key={building.id}
                initial={{ y: 50, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * idx + 0.2, type: 'spring' }}
                whileHover={!building.isLocked ? { y: -15, scale: 1.05 } : {}}
                onClick={() => handleBuildingClick(building)}
                className={`
                  relative flex flex-col items-center w-64 cursor-pointer group z-10
                  ${building.isLocked ? 'grayscale opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {/* Building Structure */}
                <div 
                  className="w-32 h-32 rounded-2xl flex items-center justify-center text-6xl shadow-2xl transition-all duration-300 relative"
                  style={{
                    background: building.isLocked ? '#1a1a2e' : `linear-gradient(to bottom, ${glowColor}40, ${glowColor}10)`,
                    border: `2px solid ${building.isLocked ? '#333' : glowColor}`,
                    boxShadow: !building.isLocked ? `0 20px 40px -10px ${glowColor}60` : 'none'
                  }}
                >
                  <span className="relative z-10 drop-shadow-lg">
                    {buildingIcons[building.type] || building.icon}
                  </span>

                  {/* Lock icon overlay */}
                  {building.isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm z-20">
                      <span className="text-4xl">🔒</span>
                    </div>
                  )}

                  {/* Completion badge */}
                  {building.isCompleted && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center border-4 border-bg-primary shadow-lg z-20">
                      <span className="text-xl">⭐</span>
                    </div>
                  )}
                </div>

                {/* Building Info */}
                <div className="mt-6 text-center w-full">
                  <div 
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: building.isLocked ? '#888' : glowColor }}
                  >
                    {buildingLabels[building.type]}
                  </div>
                  <h3 className="font-heading font-bold text-lg leading-tight mb-2">
                    {building.name}
                  </h3>
                  
                  {/* Rewards Row */}
                  {!building.isLocked && !building.isCompleted && (
                    <div className="flex justify-center gap-3 text-sm bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/5 mx-auto w-max">
                      <span className="flex items-center gap-1 text-purple-400">
                        ✨ {building.xpReward} XP
                      </span>
                      <span className="w-px h-4 bg-white/20" />
                      <span className="flex items-center gap-1 text-yellow-400">
                        🪙 {building.coinReward}
                      </span>
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
