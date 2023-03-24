import { AnimatePresence, motion } from 'framer-motion';

import VideoThumbnail from './_fragments/VideoThumbnail';
import VideoTitle from './_fragments/VideoTitle';
import VideoDuration from './_fragments/VideoDuration';
import VideoCreator from './_fragments/VideoCreator';
import VideoViews from './_fragments/VideoViews';
import VideoFavorites from './_fragments/VideoFavorites';
import { useScaleOnHover } from '@/hooks/ui/scale-on-hover';
import { useVideoModal } from '@/hooks/ui/video-modal';
import { opacityVariants } from '@/constants/variants';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoItemProps {
  item: VideoTreeEntryWithData;
}

export default function VideoItem({ item }: VideoItemProps) {
  const { active: scaled, itemRef, style, start, stop } = useScaleOnHover();
  const { active, open } = useVideoModal(item.id);

  return (
    <motion.li
      className="relative aria-selected:z-10"
      aria-selected={active}
      layoutId={item.id}
      onClick={open}
    >
      <div
        className="relative flex flex-col h-full transition shadow-md hover:shadow-lg cursor-pointer bg-primary"
        ref={itemRef}
        style={style}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className="relative overflow-hidden">
          <VideoThumbnail title={item.title} url={item.thumbnail} />
          <div className="absolute bottom-0 w-full text-neutral-100 bg-gradient-to-t from-black/90 px-2 pt-12 pb-2 text-sm">
            <div className="mb-2 mr-auto line-clamp-2 text-ellipsis">
              <VideoTitle title={item.title} />
            </div>
            <div className="flex gap-4">
              <VideoDuration
                min={item.minDuration}
                max={item.maxDuration}
                brief
              />
              <VideoViews count={item.views} />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {scaled ? (
            <motion.div
              className="absolute top-full flex justify-between w-full p-4 gap-1 text-sm bg-primary shadow-lg"
              variants={opacityVariants}
              initial="inActive"
              exit="inActive"
              animate="active"
              transition={{ duration: 0.15 }}
            >
              <VideoCreator creator={item.creator} />
              <VideoFavorites
                id={item.id}
                count={item.favorites}
                active={item.favorited}
                button
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
