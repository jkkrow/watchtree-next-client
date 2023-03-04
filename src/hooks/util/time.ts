import { useRef, useCallback, useEffect } from 'react';

export function useTimeout() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const set = useCallback(
    (callback: () => void, delay: number) => {
      clear();
      timeoutRef.current = setTimeout(callback, delay);
    },
    [clear]
  );

  useEffect(() => {
    return clear;
  }, [clear]);

  return [set, clear] as const;
}

export function useInterval() {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const clear = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  const set = useCallback(
    (callback: () => void, delay: number, initialLoad = false) => {
      initialLoad && callback();

      clear();
      intervalRef.current = setInterval(callback, delay);
    },
    [clear]
  );

  useEffect(() => {
    return clear;
  }, [clear]);

  return [set, clear] as const;
}
