import { motion } from 'framer-motion';

import VideoTitle from '../../Video/Item/_fragments/VideoTitle';
import VideoThumbnail from '../../Video/Item/_fragments/VideoThumbnail';
import VideoDuration from '../../Video/Item/_fragments/VideoDuration';
import VideoHistory from '../../Video/Item/_fragments/VideoHistory';
import VideoTimestamps from '../../Video/Item/_fragments/VideoTimestamps';
import Button from '@/components/common/Element/Button';
import DeleteIcon from '@/assets/icons/delete.svg';
import { useDeleteHistoryMutation } from '@/store/features/history/history.api';
import { useVideoModal } from '@/hooks/ui/video-modal';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';

interface HistoryItemProps {
  item: VideoTreeEntryWithData;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { open } = useVideoModal(item.id);
  const [deleteHistory, { isLoading }] = useDeleteHistoryMutation();

  const deleteHistoryHandler = () => {
    deleteHistory(item.id);
  };

  return (
    <motion.li
      className="relative flex flex-col shadow-md bg-primary dark:ring-2 dark:ring-tertiary"
      layoutId={item.id}
    >
      <div onClick={open}>
        <VideoThumbnail url={item.thumbnail} title={item.title} />
      </div>
      <div className="flex flex-col p-4 gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="cursor-pointer" onClick={open}>
            <VideoTitle title={item.title} />
          </div>
          <VideoDuration max={item.maxDuration} min={item.minDuration} brief />
          <VideoHistory history={item.history} max={item.maxDuration} />
          <div className="ml-auto">
            <VideoTimestamps timestamp={item.history!.watchedAt} />
          </div>
        </div>
        <Button inversed loading={isLoading} onClick={deleteHistoryHandler}>
          <DeleteIcon width={20} height={20} />
        </Button>
      </div>
    </motion.li>
  );
}
