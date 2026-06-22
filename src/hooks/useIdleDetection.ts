'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Detects user inactivity after a specified timeout.
 * Returns true when the user has been idle.
 */
export function useIdleDetection(timeoutMs: number = 30000): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeoutMs);
  }, [timeoutMs]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    // Start initial timer
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  return isIdle;
}
