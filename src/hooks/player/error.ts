import { useCallback, useState } from 'react';

import { VideoPlayerDependencies } from '.';

export const useError = ({ videoRef }: VideoPlayerDependencies) => {
  const [videoError, setVideoError] = useState<MediaError | null>(null);

  const errorHandler = useCallback(() => {
    const video = videoRef.current!;
    video.error && setVideoError(video.error);
  }, [videoRef]);

  return { videoError, errorHandler };
};
