import { useContext, useRef, useMemo, useEffect, useState } from 'react';

import VideoThumbnail from '@/components/features/Video/UI/VideoThumbnail';
import VideoTitle from '@/components/features/Video/UI/VideoTitle';
import VideoDuration from '@/components/features/Video/UI/VideoDuration';
import VideoViews from '@/components/features/Video/UI/VideoViews';
import VideoFavorites from '@/components/features/Video/UI/VideoFavorites';
import VideoCreator from '@/components/features/Video/UI/VideoCreator';
import VideoHistory from '@/components/features/Video/UI/VideoHistory';
import VideoDescription from '@/components/features/Video/UI/VideoDescription';
import VideoCategories from '@/components/features/Video/UI/VideoCategories';
import VideoTimestamps from '@/components/features/Video/UI/VideoTimestamps';
import Button from '@/components/common/Element/Button';
import Skeleton from '@/components/common/UI/Skeleton';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import PlayIcon from '@/assets/icons/play.svg';
import HistoryIcon from '@/assets/icons/history.svg';
import { useGetVideoQuery } from '@/store/features/video/video.api';
import { VideoModalContext } from '@/context/video-modal';
import { useModal } from '@/hooks/ui/modal';
import { useCurtain } from '@/hooks/ui/curtain';
import { findAncestors } from '@/store/features/video/video.util';
import { DeleteHistoryModal } from '@/store/features/ui/ui.type';
import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';

interface VideoModalContentProps {
  video: VideoTreeEntryWithData;
}

export default function VideoModalContent({
  video: tempVideo,
}: VideoModalContentProps) {
  const { data, error } = useGetVideoQuery(tempVideo.id);
  const { close } = useContext(VideoModalContext);
  const { open } = useModal<DeleteHistoryModal>();
  const { open: watch } = useCurtain();
  const [isTop, setIsTop] = useState(true);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const video: VideoTreeEntryWithData | VideoTreeWithData | null = useMemo(
    () => (data ? data.videoTree : tempVideo),
    [tempVideo, data]
  );

  const nodes = useMemo(() => {
    if (!data) return null;
    if (!data.videoTree.history) return [data.videoTree.root];

    const root = data.videoTree.root;
    const nodeId = data.videoTree.history.activeNodeId;
    const ancestors = findAncestors(root, nodeId, true);

    return ancestors.length ? ancestors.reverse() : [root];
  }, [data]);

  useEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    const observer = new IntersectionObserver(([entry]) =>
      setIsTop(entry.isIntersecting)
    );

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  const watchVideoHandler = (nodeId?: string) => () => {
    const history = video.history;
    const defaultNodeId = history && !history.ended ? history.activeNodeId : '';
    const progress = history && !history.ended ? history.progress : 0;

    watch({
      id: video.id,
      nodeId: nodeId || defaultNodeId,
      progress: nodeId && nodeId !== history?.activeNodeId ? 0 : progress,
    });
  };

  const deleteHistoryHandler = () => {
    open('delete-history', { videoId: video.id });
  };

  const scrollToTopHandler = () => {
    if (!headerRef.current) return;
    headerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <section className="relative flex flex-col bg-neutral-900 text-neutral-50">
        <div className="absolute top-0 right-0 w-[800px] max-w-full">
          <VideoThumbnail title={video.title} url={video.thumbnail} large />
          <div className="absolute inset-0 bg-gradient-to-r via-transparent from-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-t via-transparent from-neutral-900" />
        </div>

        <div className="relative min-h-[500px] selection:text-neutral-900 selection:bg-neutral-100">
          <header className="top-0 w-full p-6" ref={headerRef}>
            <button
              className="w-6 h-6 hover:opacity-70 transition-opacity"
              onClick={close}
            >
              <ArrowLeftIcon />
            </button>
          </header>

          <div className="flex flex-col p-12 gap-4 w-[500px] max-w-full">
            <VideoTitle title={video.title} large />
            <VideoDuration
              max={video.maxDuration}
              min={video.minDuration}
              brief
            />
            <div className="flex gap-4">
              <VideoViews count={video.views} />
              <VideoFavorites
                id={video.id}
                count={video.favorites}
                active={video.favorited}
              />
            </div>
            <VideoCreator creator={video.creator} />
            <div className="relative">
              <button
                className="flex items-center w-max my-10 gap-4 transition-opacity hover:opacity-70"
                onClick={watchVideoHandler()}
              >
                <div className="w-12 h-12 p-4 bg-neutral-100 text-neutral-900 rounded-full">
                  <PlayIcon />
                </div>
                <div className="text-xl font-bold">
                  {video.history
                    ? video.history.ended
                      ? 'Replay from start'
                      : 'Continue to watch'
                    : 'Watch now'}
                </div>
              </button>
              <div className="absolute bottom-0 left-0 w-64 max-w-full">
                <VideoHistory
                  max={video.maxDuration}
                  progress={video.history?.totalProgress}
                  ended={video.history?.ended}
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden p-12">
            {!data && !error ? (
              <div className="flex flex-col gap-4">
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="45%" />
              </div>
            ) : null}
            {data ? (
              <div className="flex flex-col md:flex-row gap-8 overflow-hidden">
                <VideoDescription
                  text={(video as VideoTreeWithData).description}
                  brief
                />
                <div className="flex flex-col justify-start flex-shrink-0 w-full md:w-[300px] max-w-full gap-8">
                  <VideoCategories categories={video.categories} />
                  <div>
                    <VideoTimestamps
                      label="Created at"
                      timestamp={video.createdAt}
                    />
                    <VideoTimestamps
                      label="Updated at"
                      timestamp={video.updatedAt}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="flex gap-2 justify-end">
          {video.history ? (
            <Button small onClick={deleteHistoryHandler}>
              <span className="w-6 h-6">
                <HistoryIcon />
              </span>
              <span>Delete Watching History</span>
            </Button>
          ) : null}
          <VideoFavorites
            id={video.id}
            count={video.favorites}
            active={video.favorited}
            button
          />
        </div>
        <div className="p-6">
          <SkeletonGrid on={!data && !error} count={3} type="node" />
          {nodes ? (
            <ul className="grid grid-cols-1 gap-6">
              {nodes.map((node) => (
                <li key={node.id}>
                  <div
                    className="group flex gap-4 cursor-pointer"
                    onClick={watchVideoHandler(node.id)}
                  >
                    <div className="relative flex-shrink-0 w-1/3 min-w-[150px]">
                      <VideoThumbnail title={node.label} url={node.thumbnail} />
                      <div className="absolute flex justify-center items-center inset-0 text-neutral-100 bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 py-2 gap-4 overflow-hidden">
                      <div className="font-medium line-clamp-2">
                        {node.label}
                      </div>
                      <div className="flex flex-col w-52 max-w-full gap-4">
                        <VideoDuration
                          max={node.duration}
                          min={node.duration}
                          brief
                        />
                        <VideoHistory
                          max={node.duration}
                          progress={video.history?.progress}
                          ended={
                            node.id !== video.history?.activeNodeId ||
                            (node.id === video.history.activeNodeId &&
                              video.history.ended)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <div
        className="sticky bottom-0 opacity-0 pointer-events-none transition-opacity data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto"
        data-visible={!isTop}
      >
        <button
          className="absolute bottom-6 right-6 p-3 bg-inversed text-inversed rounded-full shadow-md transition-colors hover:bg-hover-inversed"
          onClick={scrollToTopHandler}
        >
          <ArrowLeftIcon className="w-6 h-6 rotate-90" />
        </button>
      </div>
    </div>
  );
}
