import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setActiveNode } from '@/store/features/video/video.slice';
import { VideoPlayerDependencies } from '.';
import { VideoNode } from '@/store/features/video/video.type';
import { findNodeByChildId } from '@/store/features/video/video.util';

export const useNavigation = ({
  videoRef,
  id,
  selectionTimeStart,
  children,
}: VideoPlayerDependencies) => {
  const tree = useAppSelector((state) => state.video.videoTree!);
  const dispatch = useAppDispatch();

  const rootId = useMemo(() => tree.root.id, [tree]);

  const navigateToNextVideo = useCallback(
    (nextVideos: VideoNode[]) => {
      return () => {
        const video = videoRef.current!;
        const validNextVideos = children.filter((video) => video.url);
        const isLastVideo = !validNextVideos.length;

        if (isLastVideo) {
          video.currentTime = video.duration;
          return;
        }

        if (video.currentTime < selectionTimeStart) {
          video.currentTime = selectionTimeStart;
          return;
        }

        const nextVideo = nextVideos.length
          ? nextVideos[0]
          : validNextVideos[0];

        dispatch(setActiveNode(nextVideo.id));
      };
    },
    [videoRef, selectionTimeStart, children, dispatch]
  );

  const navigateToPreviousVideo = useCallback(() => {
    const parentNode = findNodeByChildId(tree.root, id);

    if (!parentNode) {
      videoRef.current!.currentTime = 0;
      return;
    }

    dispatch(setActiveNode(parentNode.id));
  }, [videoRef, dispatch, id, tree.root]);

  const navigateToFirstVideo = useCallback(() => {
    const parentNode = findNodeByChildId(tree.root, id);

    if (!parentNode) {
      videoRef.current!.currentTime = 0;
      return;
    }

    dispatch(setActiveNode(rootId));
  }, [videoRef, dispatch, rootId, id, tree.root]);

  return {
    navigateToNextVideo,
    navigateToPreviousVideo,
    navigateToFirstVideo,
  };
};
