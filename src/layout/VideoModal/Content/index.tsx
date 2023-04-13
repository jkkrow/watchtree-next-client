import { useMemo } from 'react';

import VideoThumbnail from '@/components/features/Video/Item/_fragments/VideoThumbnail';
import VideoTitle from '@/components/features/Video/Item/_fragments/VideoTitle';
import VideoDuration from '@/components/features/Video/Item/_fragments/VideoDuration';
import VideoViews from '@/components/features/Video/Item/_fragments/VideoViews';
import VideoFavorites from '@/components/features/Video/Item/_fragments/VideoFavorites';
import VideoCreator from '@/components/features/Video/Item/_fragments/VideoCreator';
import VideoDescription from '@/components/features/Video/Item/_fragments/VideoDescription';
import VideoCategories from '@/components/features/Video/Item/_fragments/VideoCategories';
import VideoTimestamps from '@/components/features/Video/Item/_fragments/VideoTimestamps';
import Button from '@/components/common/Element/Button';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import PlayIcon from '@/assets/icons/play.svg';
import HistoryIcon from '@/assets/icons/history.svg';
import { useGetVideoQuery } from '@/store/features/video/video.api';
import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';

interface VideoModalContentProps {
  item: VideoTreeEntryWithData;
  onClose: () => void;
}

export default function VideoModalContent({
  item,
  onClose,
}: VideoModalContentProps) {
  const { data } = useGetVideoQuery(item.id);
  const video: VideoTreeEntryWithData | VideoTreeWithData | null = useMemo(
    () => (data ? data.videoTree : item),
    [item, data]
  );

  return (
    <div>
      <div className="relative flex flex-col bg-neutral-900 text-neutral-50">
        <div className="absolute top-0 right-0 w-[800px] max-w-full overflow-hidden">
          <VideoThumbnail title={video.title} url={video.thumbnail} large />
          <div className="absolute inset-0 bg-gradient-to-r via-transparent from-neutral-900" />
          <div className="absolute inset-0 bg-gradient-to-t via-transparent from-neutral-900" />
        </div>

        <div className="relative min-h-[500px]">
          <header className="top-0 w-full p-6">
            <button
              className="w-6 h-6 hover:opacity-70 transition-opacity"
              onClick={onClose}
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
            <div className="flex items-center mt-6 gap-4 cursor-pointer transition-opacity hover:opacity-70">
              <div className="w-12 h-12 p-4 bg-neutral-100 text-neutral-900 rounded-full">
                <PlayIcon />
              </div>
              <div className="text-xl font-bold">
                {video.history ? 'Continue to watch' : 'Watch Now'}
              </div>
            </div>
          </div>

          {data ? (
            <div className="overflow-hidden p-12">
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
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 justify-end">
          <Button small>
            <span className="w-6 h-6">
              <HistoryIcon />
            </span>
            <span>Reset Watching History</span>
          </Button>
          <VideoFavorites
            id={video.id}
            count={video.favorites}
            active={video.favorited}
            button
          />
        </div>
      </div>
    </div>
  );
}
