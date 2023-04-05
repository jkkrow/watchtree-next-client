import { useCallback, useEffect, useState } from 'react';

import { VideoPlayerDependencies } from '.';
import { useTimeout } from '../util/time';
import { useAppDispatch } from '@/hooks/store';
import { setActiveNode } from '@/store/features/video/video.slice';

export const useSelector = ({
  videoRef,
  selectionTimeStart,
  selectionTimeEnd,
  children,
  active,
}: VideoPlayerDependencies) => {
  const dispatch = useAppDispatch();

  const [displaySelector, setDisplaySelector] = useState(false);
  const [displaySelectorTimer, setDisplaySelectorTimer] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [temporarilyVisible, setTemporarilyVisible] = useState(false);
  const [leftTime, setLeftTime] = useState(0);
  const [nextVideos, setNextVideos] = useState(
    children.filter((video) => video.url)
  );

  const [setSelectorTimeout] = useTimeout();

  const updateSelector = useCallback(() => {
    const video = videoRef.current!;
    const currentTime = video.currentTime || 0;

    if (
      currentTime >= selectionTimeStart &&
      currentTime < selectionTimeEnd &&
      nextVideos.length &&
      nextVideos.length > 1 &&
      !video.paused &&
      !isSelected
    ) {
      setDisplaySelector(true);
    } else {
      setDisplaySelector(false);
    }

    if (!isSelected && selectionTimeEnd - currentTime <= 5) {
      setDisplaySelectorTimer(true);
      setLeftTime(Math.floor(selectionTimeEnd) - Math.floor(currentTime));
    } else {
      setDisplaySelectorTimer(false);
    }
  }, [
    videoRef,
    selectionTimeStart,
    selectionTimeEnd,
    nextVideos.length,
    isSelected,
  ]);

  const selectNextVideo = useCallback(
    (index: number) => {
      if (!displaySelector || !nextVideos[index] || isSelected) return;

      setNextVideos([nextVideos[index]]);
      setDisplaySelector(false);
      setDisplaySelectorTimer(false);
      setIsSelected(true);
      setTemporarilyVisible(true);

      setSelectorTimeout(() => {
        setTemporarilyVisible(false);
      }, 2000);
    },
    [displaySelector, nextVideos, isSelected, setSelectorTimeout]
  );

  const videoEndedHandler = useCallback(() => {
    if (!nextVideos.length) return;

    dispatch(setActiveNode(nextVideos[0].id));
  }, [dispatch, nextVideos]);

  useEffect(() => {
    if (active) return;

    setIsSelected(false);
    setNextVideos(children.filter((video) => video.url));
  }, [active, children]);

  return {
    displaySelector: displaySelector || temporarilyVisible,
    displaySelectorTimer,
    leftTime,
    nextVideos,
    updateSelector,
    selectNextVideo,
    videoEndedHandler,
  };
};
