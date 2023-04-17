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
import { History } from '@/store/features/history/history.type';
import { useSaveHistoryMutation } from '@/store/features/history/history.api';

interface VideoTreeProps {
  tree: VideoTreeType;
  history?: History | null;
  autoPlay?: boolean;
  editMode?: boolean;
}

export default function VideoTree({
  tree,
  history,
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
    let initialNodeId = tree.root.id;
    let initialTime = 0;

    if (history && !history.ended) {
      initialNodeId = history.activeNodeId;
      initialTime = history.progress;
    }

    dispatch(setActiveNode(initialNodeId));
    dispatch(setInitialProgress(initialTime));
  }, [dispatch, tree.root.id, history]);

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
