import { motion } from 'framer-motion';

import VideoThumbnail from './_fragments/VideoThumbnail';
import VideoTitle from './_fragments/VideoTitle';
import VideoDuration from './_fragments/VideoDuration';
import VideoCreator from './_fragments/VideoCreator';
import VideoViews from './_fragments/VideoViews';
import VideoFavorites from './_fragments/VideoFavorites';
import { useScaleOnHover } from '@/hooks/ui/scale-on-hover';
import { useVideoModal } from '@/hooks/ui/video-modal';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoItemProps {
  item: VideoTreeEntryWithData;
}

export default function VideoItem({ item }: VideoItemProps) {
  const { itemRef, style, start, stop } = useScaleOnHover();
  const { active, open } = useVideoModal(item.id);

  return (
    <motion.li
      className="relative aria-selected:z-10"
      aria-selected={active}
      layoutId={item.id}
      layout
      onClick={open}
    >
      <div
        className="relative flex flex-col h-full overflow-hidden transition shadow-md hover:shadow-lg dark:ring-2 dark:ring-tertiary dark:hover:ring-secondary cursor-pointer bg-primary"
        ref={itemRef}
        style={style}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className="relative">
          <VideoThumbnail title={item.title} url={item.thumbnail} />
          <div className="absolute pointer-events-none bottom-0 right-0 text-neutral-100 bg-black/50 px-2 py-1 text-sm">
            <VideoDuration
              min={item.minDuration}
              max={item.maxDuration}
              brief
            />
          </div>
        </div>
        <div className="relative flex flex-col h-full p-4 gap-2">
          <header className="flex gap-2 mb-auto">
            <div className="mb-2 mr-auto line-clamp-2 text-ellipsis">
              <VideoTitle title={item.title} />
            </div>
          </header>
          <div className="flex justify-between gap-1 text-sm">
            <VideoCreator creator={item.creator} brief />
            <div className="flex gap-2">
              <VideoViews count={item.views} />
              <VideoFavorites count={item.favorites} active={item.favorited} />
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
