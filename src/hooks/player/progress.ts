import { useState, useRef, useCallback } from 'react';

import { VideoPlayerDependencies } from '.';
import { useAppDispatch } from '../store';
import { setCurrentProgress as dispatchCurrentProgress } from '@/store/features/video/video.slice';
import { formatTime } from '@/utils/format';

export const useProgress = ({ videoRef, active }: VideoPlayerDependencies) => {
  const dispatch = useAppDispatch();

  const [currentProgress, setCurrentProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [progressTooltip, setProgressTooltip] = useState('00:00');
  const [progressTooltipPosition, setProgressTooltipPosition] = useState('');

  const progressSeekData = useRef(0);

  const updateProgress = useCallback(() => {
    const video = videoRef.current!;
    const duration = video.duration || 0;
    const currentTime = video.currentTime || 0;
    const buffer = video.buffered;

    setCurrentProgress(currentTime);

    if (duration > 0) {
      for (let i = 0; i < buffer.length; i++) {
        if (
          buffer.start(buffer.length - 1 - i) === 0 ||
          buffer.start(buffer.length - 1 - i) < video.currentTime
        ) {
          setBufferProgress(
            (buffer.end(buffer.length - 1 - i) / duration) * 100
          );
          break;
        }
      }
    }

    if (active) {
      dispatch(dispatchCurrentProgress(currentTime));
    }
  }, [dispatch, videoRef, active]);

  const updateTooltip = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const video = videoRef.current!;

      const rect = event.currentTarget.getBoundingClientRect();
      const skipTo = (event.nativeEvent.offsetX / rect.width) * video.duration;

      progressSeekData.current = skipTo;

      let formattedTime: string;

      if (skipTo > video.duration) {
        formattedTime = formatTime(video.duration);
      } else if (skipTo < 0) {
        formattedTime = '00:00';
      } else {
        formattedTime = formatTime(skipTo);
        setProgressTooltipPosition(`${event.nativeEvent.offsetX}px`);
      }

      setProgressTooltip(formattedTime);
    },
    [videoRef]
  );

  const updateTooltipMobile = useCallback(
    (event: React.TouchEvent<HTMLInputElement>) => {
      const video = videoRef.current!;

      const rect = event.currentTarget.getBoundingClientRect();
      const touchedPosition = event.targetTouches[0].pageX - rect.left;
      const skipTo = (touchedPosition / rect.width) * video.duration;

      progressSeekData.current = skipTo;

      let formattedTime: string;

      if (skipTo > video.duration) {
        formattedTime = formatTime(video.duration);
      } else if (skipTo < 0) {
        formattedTime = '00:00';
      } else {
        formattedTime = formatTime(skipTo);
        setProgressTooltipPosition(`${touchedPosition}px`);
      }

      setProgressTooltip(formattedTime);
    },
    [videoRef]
  );

  const changeProgressWithInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current!;

      const skipTo = progressSeekData.current || +event.target.value;

      video.currentTime = skipTo;
      setCurrentProgress(skipTo);
    },
    [videoRef]
  );

  const changeProgressWithKey = useCallback(
    (direction: 1 | 0) => {
      const video = videoRef.current!;

      if (direction) {
        video.currentTime += 10;
        return;
      }

      video.currentTime -= 10;
    },
    [videoRef]
  );

  const configureDuration = useCallback(() => {
    const video = videoRef.current!;
    const duration = video.duration;

    setVideoDuration(duration);
  }, [videoRef]);

  return {
    currentProgress,
    bufferProgress,
    videoDuration,
    progressTooltip,
    progressTooltipPosition,
    updateProgress,
    updateTooltip,
    updateTooltipMobile,
    changeProgressWithInput,
    changeProgressWithKey,
    configureDuration,
  };
};
