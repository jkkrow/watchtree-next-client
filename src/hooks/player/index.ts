import { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useFirstRender } from '../lifecycle/first-render';
import { setInitialProgress } from '@/store/features/video/video.slice';
import { VideoNode } from '@/store/features/video/video.type';

export interface VideoPlayerProps extends VideoNode {
  treeId: string;
  active?: boolean;
  autoPlay?: boolean;
  editMode?: boolean;
}

export interface VideoPlayerDependencies extends VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  playerRef: React.MutableRefObject<shaka.Player | null>;
}

export const usePlayer = ({
  id,
  url,
  editMode,
  ...rest
}: VideoPlayerProps): VideoPlayerDependencies => {
  const activeNodeId = useAppSelector((state) => state.video.activeNodeId);
  const initialProgress = useAppSelector(
    (state) => state.video.initialProgress
  );
  const dispatch = useAppDispatch();
  const firstRender = useFirstRender();

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);

  useEffect(() => {
    (async () => {
      if (!firstRender && !editMode) return;

      const video = videoRef.current!;
      const src =
        url.startsWith('http') || url.startsWith('blob')
          ? url
          : `${process.env.NEXT_PUBLIC_ASSET_DOMAIN}/${url}`;

      // Edit mode
      if (src.substring(0, 4) === 'blob') {
        return video.setAttribute('src', src);
      }

      // Connect video to Shaka Player
      const shakaPlayer = new shaka.Player(video);

      if (activeNodeId === id && initialProgress) {
        await shakaPlayer.load(src, initialProgress);
        dispatch(setInitialProgress(0));
      } else {
        await shakaPlayer.load(src);
      }

      playerRef.current = shakaPlayer;
    })();
  }, [dispatch, id, url, editMode, activeNodeId, initialProgress, firstRender]);

  return { videoRef, playerRef, id, url, editMode, ...rest };
};
