'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// ============================================================
// Navigation Context — manages zoom level and selected items
// ============================================================

export type ZoomLevel = 'world' | 'continent' | 'country' | 'state' | 'city' | 'building';

export interface NavigationState {
  zoomLevel: ZoomLevel;
  selectedContinentId: string | null;
  selectedCountryId: string | null;
  selectedStateId: string | null;
  selectedCityId: string | null;
  selectedBuildingId: string | null;
  isTransitioning: boolean;
}

interface NavigationContextType extends NavigationState {
  navigateTo: (level: ZoomLevel, ids?: Partial<{
    continentId: string;
    countryId: string;
    stateId: string;
    cityId: string;
    buildingId: string;
  }>) => void;
  goBack: () => void;
  breadcrumbs: { level: ZoomLevel; label: string; id: string | null }[];
  setTransitioning: (v: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavigationState>({
    zoomLevel: 'world',
    selectedContinentId: null,
    selectedCountryId: null,
    selectedStateId: null,
    selectedCityId: null,
    selectedBuildingId: null,
    isTransitioning: false,
  });

  const navigateTo = useCallback((level: ZoomLevel, ids?: Partial<{
    continentId: string;
    countryId: string;
    stateId: string;
    cityId: string;
    buildingId: string;
  }>) => {
    setState(prev => ({
      ...prev,
      zoomLevel: level,
      isTransitioning: true,
      selectedContinentId: ids?.continentId ?? prev.selectedContinentId,
      selectedCountryId: ids?.countryId ?? (level === 'continent' ? null : prev.selectedCountryId),
      selectedStateId: ids?.stateId ?? (level === 'continent' || level === 'country' ? null : prev.selectedStateId),
      selectedCityId: ids?.cityId ?? (level === 'continent' || level === 'country' || level === 'state' ? null : prev.selectedCityId),
      selectedBuildingId: ids?.buildingId ?? null,
    }));

    // End transition after animation
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      const levels: ZoomLevel[] = ['world', 'continent', 'country', 'state', 'city', 'building'];
      const currentIndex = levels.indexOf(prev.zoomLevel);
      if (currentIndex <= 0) return prev;
      const newLevel = levels[currentIndex - 1];
      return {
        ...prev,
        zoomLevel: newLevel,
        isTransitioning: true,
        selectedBuildingId: null,
        selectedCityId: newLevel === 'world' || newLevel === 'continent' || newLevel === 'country' ? null : prev.selectedCityId,
        selectedStateId: newLevel === 'world' || newLevel === 'continent' ? null : prev.selectedStateId,
        selectedCountryId: newLevel === 'world' ? null : prev.selectedCountryId,
        selectedContinentId: newLevel === 'world' ? null : prev.selectedContinentId,
      };
    });
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  const setTransitioning = useCallback((v: boolean) => {
    setState(prev => ({ ...prev, isTransitioning: v }));
  }, []);

  // Build breadcrumbs
  const breadcrumbs: { level: ZoomLevel; label: string; id: string | null }[] = [
    { level: 'world', label: '🌍 World', id: null },
  ];
  if (state.selectedContinentId) {
    breadcrumbs.push({ level: 'continent', label: state.selectedContinentId, id: state.selectedContinentId });
  }
  if (state.selectedCountryId) {
    breadcrumbs.push({ level: 'country', label: state.selectedCountryId, id: state.selectedCountryId });
  }
  if (state.selectedStateId) {
    breadcrumbs.push({ level: 'state', label: state.selectedStateId, id: state.selectedStateId });
  }
  if (state.selectedCityId) {
    breadcrumbs.push({ level: 'city', label: state.selectedCityId, id: state.selectedCityId });
  }

  return (
    <NavigationContext.Provider
      value={{
        ...state,
        navigateTo,
        goBack,
        breadcrumbs,
        setTransitioning,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
