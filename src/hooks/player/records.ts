import { useCallback, useMemo, useState, useEffect, useRef } from 'react';

import { VideoPlayerDependencies } from '.';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { findAncestors } from '@/store/features/video/video.util';
import { setActiveNode } from '@/store/features/video/video.slice';

export const useRecords = ({ videoRef, id }: VideoPlayerDependencies) => {
  const tree = useAppSelector((state) => state.video.videoTree!);
  const dispatch = useAppDispatch();

  const [displayRecords, setDisplayRecords] = useState(false);

  const wasPlaying = useRef(false);

  const records = useMemo(() => {
    const ancestors = findAncestors(tree.root, id, true);
    return ancestors.reverse();
  }, [tree.root, id]);

  const toggleRecords = useCallback(() => {
    setDisplayRecords((prev) => !prev);
  }, []);

  const closeRecords = useCallback(() => {
    setDisplayRecords(false);
  }, []);

  const navigateToSelectedVideo = useCallback(
    (id: string) => {
      setDisplayRecords(false);
      dispatch(setActiveNode(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!displayRecords) return;

    videoRef.current!.pause();
  }, [videoRef, displayRecords]);

  useEffect(() => {
    const video = videoRef.current!;

    return () => {
      if (!displayRecords && !video.paused) {
        wasPlaying.current = true;
      }

      if (displayRecords && wasPlaying.current) {
        video.play();
        wasPlaying.current = false;
      }
    };
  }, [videoRef, displayRecords]);

  return {
    records,
    displayRecords,
    toggleRecords,
    closeRecords,
    navigateToSelectedVideo,
  };
};
