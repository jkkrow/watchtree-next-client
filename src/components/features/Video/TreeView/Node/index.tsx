import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { VideoNode as VideoNodeType } from '@/store/features/video/video.type';
import { setActiveNode } from '@/store/features/video/video.slice';
import {
  findNodeByChildId,
  findAncestors,
} from '@/store/features/video/video.util';

const VideoPlayer = dynamic(() => import('../../Player'), { ssr: false });

interface VideoNodeProps {
  currentVideo: VideoNodeType;
  treeId: string;
  autoPlay?: boolean;
  editMode?: boolean;
}

export default function VideoNode({
  currentVideo,
  treeId,
  autoPlay = true,
  editMode = false,
}: VideoNodeProps) {
  const tree = useAppSelector((state) => state.video.videoTree!);
  const activeNodeId = useAppSelector((state) => state.video.activeNodeId);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isActive = useMemo(
    () => currentVideo.id === activeNodeId,
    [currentVideo.id, activeNodeId]
  );
  const isActiveChild = useMemo(() => {
    const parentNode = findNodeByChildId(tree.root, currentVideo.id);
    return parentNode?.id === activeNodeId;
  }, [currentVideo.id, tree.root, activeNodeId]);
  const isAncestor = useMemo(() => {
    const ancestors = findAncestors(tree.root, activeNodeId, true);
    const ids = ancestors.map((item) => item.id);

    return (id: string) => ids.includes(id);
  }, [tree, activeNodeId]);

  const returnHandler = () => {
    const parentNode = findNodeByChildId(tree.root, currentVideo.id);

    if (parentNode) {
      dispatch(setActiveNode(parentNode.id));
    } else {
      router.back();
    }
  };

  return (
    <>
      {(isActive || isActiveChild) && (
        <div
          className="absolute hidden inset-0 data-[active=true]:static data-[active=true]:block"
          data-active={isActive}
        >
          {currentVideo.url ? (
            <VideoPlayer
              {...currentVideo}
              treeId={treeId}
              autoPlay={autoPlay}
              editMode={editMode}
              active={activeNodeId === currentVideo.id}
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full gap-4 text-lg">
              <p>Not Found</p>
              <ArrowLeftIcon
                className="w-6 h-6 hover:text-hover"
                onClick={returnHandler}
              />
            </div>
          )}
        </div>
      )}

      {currentVideo.children.map((video: VideoNodeType) => {
        return (
          (isActive || isAncestor(video.id)) && (
            <VideoNode
              key={video.id}
              currentVideo={video}
              treeId={treeId}
              autoPlay={autoPlay}
              editMode={editMode}
            />
          )
        );
      })}
    </>
  );
}
