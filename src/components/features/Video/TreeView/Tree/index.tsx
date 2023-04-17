import { useEffect } from 'react';

import VideoNode from '../Node';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  setVideoTree,
  setActiveNode,
  setInitialProgress,
  setCurrentProgress,
} from '@/store/features/video/video.slice';
import { VideoTree as VideoTreeType } from '@/store/features/video/video.type';
import { useSaveHistoryMutation } from '@/store/features/history/history.api';

interface VideoTreeProps {
  tree: VideoTreeType;
  initialNodeId?: string;
  initialProgress?: number;
  autoPlay?: boolean;
  editMode?: boolean;
}

export default function VideoTree({
  tree,
  initialNodeId,
  initialProgress,
  autoPlay = true,
  editMode = false,
}: VideoTreeProps) {
  const treeState = useAppSelector((state) => state.video.videoTree);
  const activeNodeId = useAppSelector((state) => state.video.activeNodeId);
  const dispatch = useAppDispatch();

  const [saveHistory] = useSaveHistoryMutation();

  useEffect(() => {
    dispatch(setVideoTree(tree));
  }, [dispatch, tree]);

  useEffect(() => {
    dispatch(setActiveNode(initialNodeId || tree.root.id));
    dispatch(setInitialProgress(initialProgress || 0));
  }, [dispatch, tree.root.id, initialNodeId, initialProgress]);

  useEffect(() => {
    if (activeNodeId && !editMode) {
      saveHistory({ videoId: tree.id, unmount: false });
    }
  }, [editMode, activeNodeId, saveHistory, tree.id]);

  useEffect(() => {
    return () => {
      !editMode && saveHistory({ videoId: tree.id, unmount: true });
      dispatch(setVideoTree(null));
      dispatch(setActiveNode(''));
      dispatch(setInitialProgress(0));
      dispatch(setCurrentProgress(0));
    };
  }, [dispatch, saveHistory, editMode, tree.id]);

  return (
    <div className="relative w-full h-full" id={tree.id}>
      {treeState && activeNodeId && (
        <VideoNode
          treeId={tree.id}
          currentVideo={tree.root}
          autoPlay={autoPlay}
          editMode={editMode}
        />
      )}
    </div>
  );
}
