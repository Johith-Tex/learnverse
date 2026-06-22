'use client';

import React, { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { getContinent, getCountry, getState } from '@/data/worldData';

import ContinentMap from './ContinentMap';
import CountryMap from './CountryMap';
import CityView from './CityView';
import BuildingView from './BuildingView';
import MapParticles from './MapParticles';

// Dynamically import Three.js Globe to avoid SSR hydration issues
const Globe = lazy(() => import('./Globe'));

export default function ZoomNavigator() {
  const { 
    zoomLevel: level,
    selectedContinentId,
    selectedCountryId,
    selectedStateId,
    selectedCityId,
    navigateTo, 
    goBack: navigateUp 
  } = useNavigation();

  const ids = {
    continentId: selectedContinentId,
    countryId: selectedCountryId,
    stateId: selectedStateId,
    cityId: selectedCityId,
  };

  // Derive breadcrumb text based on current IDs
  const breadcrumbs = [{ level: 'world', name: 'World', id: null }];
  
  if (ids.continentId) {
    const cont = getContinent(ids.continentId);
    if (cont) breadcrumbs.push({ level: 'continent', name: cont.name, id: cont.id });
  }
  if (ids.continentId && ids.countryId) {
    const ctry = getCountry(ids.continentId, ids.countryId);
    if (ctry) breadcrumbs.push({ level: 'country', name: ctry.name, id: ctry.id });
  }
  if (ids.continentId && ids.countryId && ids.stateId) {
    const st = getState(ids.continentId, ids.countryId, ids.stateId);
    if (st) breadcrumbs.push({ level: 'state', name: st.name, id: st.id });
  }

  // Animation variants
  const viewVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-primary">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="absolute top-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="glass px-4 py-2 rounded-full pointer-events-auto flex items-center gap-2 max-w-3xl overflow-x-auto no-scrollbar">
          
          <button 
            onClick={navigateUp}
            disabled={level === 'world'}
            className={`p-1 rounded-full transition-colors ${level === 'world' ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="w-px h-6 bg-white/20 mx-1" />

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.level}>
                <button
                  onClick={() => {
                    // Navigate to this specific level if it's not the last one
                    if (!isLast) {
                      if (crumb.level === 'world') navigateTo('world');
                      else if (crumb.level === 'continent') navigateTo('continent', { continentId: crumb.id! });
                      else if (crumb.level === 'country') navigateTo('country', { continentId: ids.continentId!, countryId: crumb.id! });
                    }
                  }}
                  className={`
                    px-3 py-1 rounded-full whitespace-nowrap text-sm font-medium transition-colors
                    ${isLast ? 'bg-white/15 text-white cursor-default' : 'text-text-secondary hover:text-white hover:bg-white/5 cursor-pointer'}
                  `}
                >
                  {crumb.name}
                </button>
                {!isLast && <span className="text-white/30 text-xs">/</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Views */}
      <AnimatePresence mode="wait">
        {level === 'world' && (
          <motion.div
            key="world"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <Suspense fallback={<div className="flex items-center justify-center w-full h-full text-2xl">Loading World...</div>}>
              <Globe onContinentClick={(id) => navigateTo('continent', { continentId: id })} />
            </Suspense>
          </motion.div>
        )}

        {level === 'continent' && ids.continentId && (
          <motion.div
            key="continent"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <MapParticles color={getContinent(ids.continentId)?.color} />
            <ContinentMap continentId={ids.continentId} />
          </motion.div>
        )}

        {level === 'country' && ids.continentId && ids.countryId && (
          <motion.div
            key="country"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <MapParticles color={getCountry(ids.continentId, ids.countryId)?.color} />
            <CountryMap continentId={ids.continentId} countryId={ids.countryId} />
          </motion.div>
        )}

        {level === 'state' && ids.continentId && ids.countryId && ids.stateId && (
          <motion.div
            key="state"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <MapParticles color={getState(ids.continentId, ids.countryId, ids.stateId)?.color} />
            <CityView continentId={ids.continentId} countryId={ids.countryId} stateId={ids.stateId} />
          </motion.div>
        )}

        {level === 'city' && ids.continentId && ids.countryId && ids.stateId && ids.cityId && (
          <motion.div
            key="city"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <BuildingView 
              continentId={ids.continentId} 
              countryId={ids.countryId} 
              stateId={ids.stateId} 
              cityId={ids.cityId} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
