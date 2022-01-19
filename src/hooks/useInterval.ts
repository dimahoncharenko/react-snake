import { useEffect, useRef } from 'react';

export function useInterval(callback: (...args: any[]) => any, delay: number | null) {
  const savedCallback = useRef<(...args: any[]) => any>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
