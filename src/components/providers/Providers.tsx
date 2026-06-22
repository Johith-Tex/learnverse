'use client';

import { GameProvider } from '@/context/GameContext';
import { NavigationProvider } from '@/context/NavigationContext';
import { type ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </GameProvider>
  );
}
