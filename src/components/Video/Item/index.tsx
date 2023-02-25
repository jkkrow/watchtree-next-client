import { motion } from 'framer-motion';

import VideoThumbnail from './_fragments/VideoThumbnail';
import VideoTitle from './_fragments/VideoTitle';
import VideoCreator from './_fragments/VideoCreator';
import VideoViews from './_fragments/VideoViews';
import VideoFavorites from './_fragments/VideoFavorites';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import VideoDuration from './_fragments/VideoDuration';

interface VideoItemProps {
  video: VideoTreeEntryWithData;
}

export default function VideoItem({ video }: VideoItemProps) {
  return (
    <motion.li
      layout
      className="relative flex flex-col overflow-hidden shadow-md hover:shadow-lg transition dark:ring-2 dark:ring-tertiary dark:hover:ring-secondary"
    >
      <div className="relative">
        <VideoThumbnail title={video.title} url={video.thumbnail} />
        <div className="absolute bottom-0 right-0 text-neutral-100 bg-black/50 p-1 text-sm">
          <VideoDuration min={video.minDuration} max={video.maxDuration} />
        </div>
      </div>
      <div className="relative flex flex-col h-full p-4 gap-2">
        <header className="flex gap-2 mb-auto">
          <h2 className="w-full mb-2 mr-auto font-semibold line-clamp-2 text-ellipsis">
            <VideoTitle id={video.id} title={video.title} />
          </h2>
        </header>
        <div className="flex justify-between gap-1 text-sm">
          <VideoCreator creator={video.creator} />
          <div className="flex gap-2">
            <VideoViews count={video.views} />
            <VideoFavorites count={video.favorites} active={video.favorited} />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
