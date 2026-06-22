'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getContinent } from '@/data/worldData';
import { useNavigation } from '@/context/NavigationContext';

export default function ContinentMap({ continentId }: { continentId: string }) {
  const continent = getContinent(continentId);
  const { navigateTo } = useNavigation();

  if (!continent) return null;

  const handleMouseEnter = (name: string) => {
    window.dispatchEvent(new CustomEvent('mascot-mood', { detail: 'wave' }));
    window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: `Let's explore ${name}!`, visible: true } }));
  };
  
  const handleMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('mascot-mood', { detail: null }));
    window.dispatchEvent(new CustomEvent('mascot-speech', { detail: { message: '', visible: false } }));
  };

  const handleHotspotClick = (spot: { id: number, name: string }) => {
    if (spot.name === 'UI/UX Engineering') {
      navigateTo('country', { countryId: 'ui-ux' });
      return;
    }

    // If the continent has countries defined (like python -> algebra), drill down into it!
    if (continent.countries.length > 0) {
      navigateTo('country', { countryId: continent.countries[0].id });
    } else {
      alert("This region is currently under construction! (Add country data in worldData.ts)");
    }
  };

  // 4 Hotspot coordinates (percentages) that the user can tweak later
  // If the user is on the Frontend continent, show professional frontend courses!
  const hotspots = continent.id === 'frontend' ? [
    { id: 1, name: 'HTML & CSS Architecture', top: '25%', left: '30%' },
    { id: 2, name: 'Advanced JavaScript', top: '40%', left: '70%' },
    { id: 3, name: 'React & Next.js Ecosystem', top: '65%', left: '60%' },
    { id: 4, name: 'UI/UX Engineering', top: '55%', left: '15%' },
  ] : [
    { id: 1, name: 'Northern Zone', top: '25%', left: '30%' },
    { id: 2, name: 'Eastern Hub', top: '40%', left: '70%' },
    { id: 3, name: 'Southern Valley', top: '65%', left: '60%' },
    { id: 4, name: 'Western Coast', top: '55%', left: '15%' },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-primary">
      {/* Background World Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image 
          src="/assets/explore/world.png"
          alt="World Map"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle overlay to ensure text/UI remains readable */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Header (Centered in the Continent Map) */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        <h1 
          className="text-8xl font-heading font-black mb-4 text-white uppercase tracking-wider"
          style={{ 
            textShadow: '0 10px 30px rgba(0,0,0,0.9)',
            WebkitTextStroke: '3px rgba(0,0,0,0.8)' 
          }}
        >
          {continent.name}
        </h1>
        <p 
          className="text-3xl font-sans font-bold text-white max-w-3xl mx-auto"
          style={{ 
            textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 10px 20px rgba(0,0,0,0.9)' 
          }}
        >
          {continent.description}
        </p>
      </motion.div>

      {/* Interactive Hotspots */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {hotspots.map((spot, idx) => (
          <motion.button
            key={spot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + (idx * 0.1), type: 'spring' }}
            className="absolute w-32 h-32 -ml-16 -mt-16 rounded-full border-4 border-white/40 bg-white/10 hover:bg-white/30 hover:border-white transition-all duration-300 cursor-pointer pointer-events-auto backdrop-blur-sm group flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            style={{ top: spot.top, left: spot.left }}
            onMouseEnter={() => handleMouseEnter(spot.name)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleHotspotClick(spot)}
          >
            <div className="absolute -bottom-8 whitespace-nowrap bg-black/60 px-3 py-1 rounded-full text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {spot.name}
            </div>
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] group-hover:scale-150 transition-transform" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
