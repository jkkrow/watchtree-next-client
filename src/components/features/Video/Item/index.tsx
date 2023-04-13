import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import VideoThumbnail from './_fragments/VideoThumbnail';
import VideoTitle from './_fragments/VideoTitle';
import VideoDuration from './_fragments/VideoDuration';
import VideoCreator from './_fragments/VideoCreator';
import VideoHistory from './_fragments/VideoHistory';
import VideoViews from './_fragments/VideoViews';
import VideoFavorites from './_fragments/VideoFavorites';
import PlayIcon from '@/assets/icons/play.svg';
import { useScaleOnHover } from '@/hooks/ui/scale-on-hover';
import { useVideoModal } from '@/hooks/ui/video-modal';
import { opacityVariants } from '@/constants/variants';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoItemProps {
  item: VideoTreeEntryWithData;
}

export default function VideoItem({ item }: VideoItemProps) {
  const { active, itemRef, style, start, stop, cancel } = useScaleOnHover();
  const { active: activeModal, open } = useVideoModal(item);

  const openModalHandler = () => {
    cancel();
    open();
  };

  return (
    <motion.li
      className="relative data-[active=true]:z-10"
      data-active={activeModal}
      layoutId={item.id}
      onClick={openModalHandler}
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
          <AnimatePresence>
            {active ? (
              <motion.div
                className="absolute inset-0 text-neutral-100 bg-neutral-900/70"
                variants={opacityVariants}
                initial="inActive"
                animate="active"
                exit="inActive"
                transition={{ duration: 0.15 }}
              >
                <Link
                  className="flex justify-center items-center w-full h-full"
                  href={`/watch/${item.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PlayIcon width={40} height={40} />
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="p-4 text-sm">
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
        <AnimatePresence>
          {active ? (
            <motion.div
              className="absolute flex flex-col top-full w-full p-4 gap-4 bg-primary shadow-lg"
              variants={opacityVariants}
              initial="inActive"
              exit="inActive"
              animate="active"
              transition={{ duration: 0.15 }}
            >
              <VideoHistory history={item.history} max={item.maxDuration} />
              <div className="flex justify-between gap-4 text-sm">
                <div className="flex items-center overflow-hidden">
                  <VideoCreator creator={item.creator} />
                </div>
                <VideoFavorites
                  id={item.id}
                  count={item.favorites}
                  active={item.favorited}
                  button
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
