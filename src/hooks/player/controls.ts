import { useCallback, useEffect, useState } from 'react';

import { VideoPlayerDependencies } from '.';
import { useTimeout } from '@/hooks/util/time';

export const useControls = ({ videoRef, active }: VideoPlayerDependencies) => {
  const [displayCursor, setDisplayCursor] = useState(active);
  const [displayControls, setDisplayControls] = useState(active);

  const [setControlsTimeout] = useTimeout();

  const hideControls = useCallback(() => {
    const video = videoRef.current!;

    if (video.paused) {
      return;
    }

    setDisplayControls(false);
  }, [videoRef]);

  const hideControlsInSeconds = useCallback(
    (delay: number = 2000) => {
      const video = videoRef.current!;

      setControlsTimeout(() => {
        hideControls();
        !video.paused && setDisplayCursor(false);
      }, delay);
    },
    [videoRef, setControlsTimeout, hideControls]
  );

  const showControls = useCallback(() => {
    const video = videoRef.current!;

    setDisplayCursor(true);
    setDisplayControls(true);

    if (video.paused) {
      return;
    }

    hideControlsInSeconds();
  }, [videoRef, hideControlsInSeconds]);

  useEffect(() => {
    if (active) return;
    setDisplayControls(false);
    setDisplayCursor(false);
  }, [active]);

  return {
    displayControls,
    displayCursor,
    hideControls,
    hideControlsInSeconds,
    showControls,
  };
};
