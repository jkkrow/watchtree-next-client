import { motion } from 'framer-motion';
import { useContext } from 'react';

import VideoTitle from '../../Video/UI/VideoTitle';
import VideoThumbnail from '../../Video/UI/VideoThumbnail';
import VideoDuration from '../../Video/UI/VideoDuration';
import VideoHistory from '../../Video/UI/VideoHistory';
import VideoTimestamps from '../../Video/UI/VideoTimestamps';
import VideoFavorites from '../../Video/UI/VideoFavorites';
import Button from '@/components/common/Element/Button';
import DeleteIcon from '@/assets/icons/delete.svg';
import { VideoModalContext } from '@/context/video-modal';
import { useDeleteHistoryMutation } from '@/store/features/history/history.api';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface HistoryItemProps {
  item: VideoTreeEntryWithData;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { open } = useContext(VideoModalContext);
  const [deleteHistory, { isLoading }] = useDeleteHistoryMutation();

  const openVideoModalHandler = () => {
    open(item);
  };

  const deleteHistoryHandler = () => {
    deleteHistory(item.id);
  };

  return (
    <motion.li
      className="relative flex flex-col shadow-md bg-primary"
      layoutId={item.id}
    >
      <div className="cursor-pointer" onClick={openVideoModalHandler}>
        <VideoThumbnail url={item.thumbnail} title={item.title} />
      </div>
      <div className="flex flex-col h-full p-4 gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div
            className="cursor-pointer mb-auto line-clamp-2"
            onClick={openVideoModalHandler}
          >
            <VideoTitle title={item.title} />
          </div>
          <div className="flex flex-col gap-2">
            <VideoDuration
              max={item.maxDuration}
              min={item.minDuration}
              brief
            />
            <VideoHistory
              max={item.maxDuration}
              progress={item.history?.totalProgress}
              ended={item.history?.ended}
            />
          </div>
          <div className="ml-auto">
            <VideoTimestamps timestamp={item.history!.watchedAt} />
          </div>
        </div>
        <div className="flex gap-2">
          <VideoFavorites
            id={item.id}
            count={item.favorites}
            active={item.favorited}
            button
          />
          <Button inversed loading={isLoading} onClick={deleteHistoryHandler}>
            <DeleteIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.li>
  );
}
