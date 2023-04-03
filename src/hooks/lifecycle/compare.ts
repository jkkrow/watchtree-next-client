import { useRef, useEffect } from 'react';

export const useCompare = (value: any): boolean => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current !== value;
};
