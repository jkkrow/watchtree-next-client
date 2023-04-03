import { useCallback, useEffect, useState } from 'react';

import { VideoPlayerDependencies } from '.';
import { useAppDispatch, useAppSelector } from '../store';
import { setPlaybackRate } from '@/store/features/video/video.slice';

export const usePlaybackRate = ({
  videoRef,
  active,
}: VideoPlayerDependencies) => {
  const videoPlaybackRate = useAppSelector((state) => state.video.playbackRate);
  const dispatch = useAppDispatch();

  const [playbackRates] = useState([0.5, 0.75, 1, 1.25, 1.5]);
  const [activePlaybackRate, setActivePlaybackRate] = useState(
    videoPlaybackRate || 1
  );

  const changePlaybackRate = useCallback(
    (playbackRate: number) => {
      const video = videoRef.current!;

      video.playbackRate = playbackRate;
      setActivePlaybackRate(playbackRate);
      dispatch(setPlaybackRate(playbackRate));
    },
    [videoRef, dispatch]
  );

  const configurePlaybackRate = useCallback(() => {
    const video = videoRef.current!;
    video.playbackRate = videoPlaybackRate || 1;
  }, [videoRef, videoPlaybackRate]);

  useEffect(() => {
    if (active) return;

    const video = videoRef.current!;

    video.playbackRate = videoPlaybackRate;
    setActivePlaybackRate(videoPlaybackRate);
  }, [videoRef, active, videoPlaybackRate]);

  return {
    playbackRates,
    activePlaybackRate,
    changePlaybackRate,
    configurePlaybackRate,
  };
};
