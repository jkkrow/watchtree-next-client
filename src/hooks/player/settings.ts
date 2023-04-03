import { useState, useCallback } from 'react';

export const useSettings = () => {
  const [displaySettings, setDisplaySettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setDisplaySettings((prev) => !prev);
  }, []);

  const closeSettings = useCallback(() => {
    setDisplaySettings(false);
  }, []);

  return { displaySettings, toggleSettings, closeSettings };
};
