import { useState, useCallback } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(callback, delay);
    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [callback, delay]);

  return debouncedCallback;
}