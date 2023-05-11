import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';

import VideoThumbnail from '../UI/VideoThumbnail';
import VideoTitle from '../UI/VideoTitle';
import VideoDuration from '../UI/VideoDuration';
import VideoCreator from '../UI/VideoCreator';
import VideoHistory from '../UI/VideoHistory';
import VideoViews from '../UI/VideoViews';
import VideoFavorites from '../UI/VideoFavorites';
import PlayIcon from '@/assets/icons/play.svg';
import { useScaleOnHover } from '@/hooks/ui/scale-on-hover';
import { VideoModalContext } from '@/context/video-modal';
import { useCurtain } from '@/hooks/ui/curtain';
import { opacityVariants } from '@/constants/variants';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface VideoItemProps {
  label?: string;
  item: VideoTreeEntryWithData;
}

export default function VideoItem({ label, item }: VideoItemProps) {
  const { active, itemRef, style, start, stop, cancel } = useScaleOnHover();
  const { open, item: modalItem } = useContext(VideoModalContext);
  const { open: watch } = useCurtain();

  const openModalHandler = () => {
    cancel();
    open(item, { label });
  };

  const watchVideoHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    const history = item.history;
    const defaultNodeId = history && !history.ended ? history.activeNodeId : '';
    const progress = history && !history.ended ? history.progress : 0;

    watch({ id: item.id, nodeId: defaultNodeId, progress });
  };

  return (
    <motion.li
      className="relative data-[active=true]:z-10"
      data-active={modalItem?.video.id === item.id}
      layoutId={item.id + label}
      onClick={openModalHandler}
    >
      <div
        className="relative flex flex-col h-full transition shadow-md hover:shadow-lg cursor-pointer bg-primary"
        ref={itemRef}
        style={style}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className="relative flex-shrink-0 overflow-hidden">
          <VideoThumbnail
            title={item.title}
            url={item.thumbnail}
            fallback={item.defaultThumbnail}
          />
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
                <div
                  className="flex justify-center items-center w-full h-full"
                  onClick={watchVideoHandler}
                >
                  <PlayIcon className="w-10 h-10" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="flex flex-col h-full gap-4 p-4 text-sm">
          <div className="mb-auto line-clamp-2">
            <VideoTitle title={item.title} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
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
              <VideoHistory
                max={item.maxDuration}
                progress={item.history?.totalProgress}
                ended={item.history?.ended}
              />
              <div className="flex justify-between gap-4 text-sm">
                <div
                  className="flex items-center overflow-hidden"
                  onClick={(event) => event.stopPropagation()}
                >
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
