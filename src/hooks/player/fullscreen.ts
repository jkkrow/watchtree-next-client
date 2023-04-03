import { useState, useCallback, useEffect } from 'react';

import { VideoPlayerDependencies } from '.';

export const useFullscreen = ({ treeId }: VideoPlayerDependencies) => {
  const [fullscreenState, setFullscreenState] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.getElementById(treeId)!.requestFullscreen();
    }
  }, [treeId]);

  const fullscreenChangeHandler = useCallback(() => {
    if (document.fullscreenElement) {
      setFullscreenState(true);
    } else {
      setFullscreenState(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, [fullscreenChangeHandler]);

  return { fullscreenState, toggleFullscreen };
};
