import { useState, useCallback } from 'react';

import { useTimeout } from '../util/time';

export const useLoader = () => {
  const [displayLoader, setDisplayLoader] = useState(true);

  const [setLoaderTimeout, clearLoaderTimeout] = useTimeout();

  const showLoader = useCallback(() => {
    setLoaderTimeout(() => setDisplayLoader(true), 300);
  }, [setLoaderTimeout]);

  const hideLoader = useCallback(() => {
    clearLoaderTimeout();
    setDisplayLoader(false);
  }, [clearLoaderTimeout]);

  return { displayLoader, showLoader, hideLoader };
};
