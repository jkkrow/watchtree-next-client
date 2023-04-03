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
  player: shaka.Player | null;
}

export const usePlayer = ({
  id,
  url,
  ...rest
}: VideoPlayerProps): VideoPlayerDependencies => {
  const activeNodeId = useAppSelector((state) => state.video.activeNodeId);
  const initialProgress = useAppSelector(
    (state) => state.video.initialProgress
  );
  const dispatch = useAppDispatch();
  const firstRender = useFirstRender();

  const [player, setPlayer] = useState<shaka.Player | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isUnmounted = useRef(false);

  useEffect(() => {
    if (!firstRender) return;

    const video = videoRef.current!;
    const src = url;

    // Edit mode
    if (src.substring(0, 4) === 'blob') {
      return video.setAttribute('src', src);
    }

    // Connect video to Shaka Player
    const shakaPlayer = new shaka.Player(video);

    (async () => {
      if (activeNodeId === id && initialProgress) {
        await shakaPlayer.load(src, initialProgress);
        dispatch(setInitialProgress(0));
      } else {
        await shakaPlayer.load(src);
      }
    })();

    if (isUnmounted.current) return;

    setPlayer(shakaPlayer);
  }, [dispatch, id, url, activeNodeId, initialProgress, firstRender]);

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  return { videoRef, player, id, url, ...rest };
};
