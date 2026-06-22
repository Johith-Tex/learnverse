'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getState } from '@/data/worldData';
import { useNavigation } from '@/context/NavigationContext';

export default function CityView({ continentId, countryId, stateId }: { continentId: string, countryId: string, stateId: string }) {
  const state = getState(continentId, countryId, stateId);
  const { navigateTo } = useNavigation();

  if (!state) return null;

  return (
    <div className="absolute inset-0 w-full h-full p-8 pt-24 overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-20">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-4 drop-shadow-lg">{state.icon}</div>
          <h2 className="text-5xl font-heading font-bold mb-2" style={{ color: state.color }}>
            {state.name}
          </h2>
          <p className="text-xl text-text-secondary">{state.description}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-white/10 -translate-x-1/2 rounded-full" />

          <div className="flex flex-col gap-16 relative">
            {state.cities.map((city, idx) => {
              const isLeft = idx % 2 === 0;
              
              return (
                <motion.div
                  key={city.id}
                  initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx + 0.2 }}
                  className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'} relative`}
                >
                  {/* The connection dot on the path */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-bg-primary z-10"
                    style={{ 
                      backgroundColor: city.isLocked ? '#444' : city.isCompleted ? '#22c55e' : state.color,
                      boxShadow: !city.isLocked ? `0 0 15px ${state.color}` : 'none'
                    }}
                  />

                  {/* The City Card */}
                  <div 
                    onClick={() => !city.isLocked && navigateTo('city', { cityId: city.id })}
                    className={`
                      w-[calc(50%-3rem)] glass p-6 rounded-3xl cursor-pointer group
                      ${city.isLocked ? 'locked-overlay opacity-70 grayscale cursor-not-allowed' : 'card-hover'}
                    `}
                    style={{
                      border: !city.isLocked ? `1px solid ${state.color}50` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="text-4xl p-3 rounded-2xl flex-shrink-0"
                        style={{ backgroundColor: `${state.color}20` }}
                      >
                        {city.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold mb-1">{city.name}</h3>
                        <p className="text-sm text-text-secondary mb-3">{city.description}</p>
                        
                        <div className="flex gap-2">
                          {!city.isLocked && (
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">
                              {city.buildings.length} Activities
                            </span>
                          )}
                          {city.isCompleted && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
