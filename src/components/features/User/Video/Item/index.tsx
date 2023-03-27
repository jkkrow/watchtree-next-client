import { motion } from 'framer-motion';

import VideoTitle from '@/components/features/Video/Item/_fragments/VideoTitle';
import VideoThumbnail from '@/components/features/Video/Item/_fragments/VideoThumbnail';
import VideoStatus from '@/components/features/Video/Item/_fragments/VideoStatus';
import VideoDuration from '@/components/features/Video/Item/_fragments/VideoDuration';
import VideoViews from '@/components/features/Video/Item/_fragments/VideoViews';
import VideoFavorites from '@/components/features/Video/Item/_fragments/VideoFavorites';
import VideoTimestamps from '@/components/features/Video/Item/_fragments/VideoTimestamps';
import Button from '@/components/common/Element/Button';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import { useModal } from '@/hooks/ui/modal';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { DeleteVideoModal } from '@/store/features/ui/ui.type';

interface CreatedVideoItemProps {
  item: VideoTreeEntryWithData;
}

export default function CreatedVideoItem({ item }: CreatedVideoItemProps) {
  const { open } = useModal<DeleteVideoModal>();

  const deleteHandler = () => {
    open('delete-video', { videoId: item.id, title: item.title });
  };

  return (
    <motion.li
      className="relative flex flex-col h-full bg-primaryoverflow-hidden shadow-md dark:ring-2 dark:ring-tertiary"
      layoutId={item.id}
    >
      <div className="relative">
        <VideoThumbnail title={item.title} url={item.thumbnail} />
        {item.editing ? (
          <div className="absolute top-0 left-0 font-medium bg-neutral-900/80 text-neutral-100 p-2">
            EDITING
          </div>
        ) : null}
      </div>
      <div className="relative flex flex-col h-full p-4 gap-4">
        <VideoTitle title={item.title} />
        <div className="flex justify-between mt-auto gap-2">
          <div className="flex flex-col mt-auto gap-2">
            <VideoDuration
              min={item.minDuration}
              max={item.maxDuration}
              brief
            />
            <div className="flex gap-2">
              <VideoViews count={item.views} />
              <VideoFavorites
                id={item.id}
                count={item.favorites}
                active={false}
              />
            </div>
          </div>
          <div className="mt-auto">
            <VideoTimestamps timestamp={item.createdAt} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button inversed>
            <EditIcon width={20} height={20} />
          </Button>
          <Button onClick={deleteHandler}>
            <DeleteIcon width={20} height={20} />
          </Button>
        </div>
      </div>
    </motion.li>
  );
}
