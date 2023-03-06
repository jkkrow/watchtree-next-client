import { useEffect, useRef } from 'react';

export function useMountEffect(callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current();
  }, []);
}
