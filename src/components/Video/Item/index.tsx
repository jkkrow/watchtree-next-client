import { motion } from 'framer-motion';

import VideoThumbnail from './_fragments/VideoThumbnail';
import VideoTitle from './_fragments/VideoTitle';
import VideoDuration from './_fragments/VideoDuration';
import VideoCreator from './_fragments/VideoCreator';
import VideoViews from './_fragments/VideoViews';
import VideoFavorites from './_fragments/VideoFavorites';
import { useScaleOnHover } from '@/hooks/ui/scale-on-hover';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoItemProps {
  video: VideoTreeEntryWithData;
}

export default function VideoItem({ video }: VideoItemProps) {
  const { itemRef, style, start, stop } = useScaleOnHover();

  return (
    <motion.li className="" layout>
      <div
        className="relative flex flex-col h-full overflow-hidden transition shadow-md hover:shadow-lg dark:ring-2 dark:ring-tertiary dark:hover:ring-secondary cursor-pointer bg-primary"
        ref={itemRef}
        style={style}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className="relative">
          <VideoThumbnail title={video.title} url={video.thumbnail} />
          <div className="absolute pointer-events-none bottom-0 right-0 text-neutral-100 bg-black/50 px-2 py-1 text-sm">
            <VideoDuration min={video.minDuration} max={video.maxDuration} />
          </div>
        </div>
        <div className="relative flex flex-col h-full p-4 gap-2">
          <header className="flex gap-2 mb-auto">
            <div className="mb-2 mr-auto line-clamp-2 text-ellipsis">
              <VideoTitle title={video.title} />
            </div>
          </header>
          <div className="flex justify-between gap-1 text-sm">
            <VideoCreator creator={video.creator} brief />
            <div className="flex gap-2">
              <VideoViews count={video.views} />
              <VideoFavorites
                count={video.favorites}
                active={video.favorited}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
