import { useContext } from 'react';
import { motion, Variants } from 'framer-motion';

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
import { ListContext } from '@/context/List';
import { useModal } from '@/hooks/ui/modal';
import { opacityVariants } from '@/constants/variants';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { DeleteVideoModal } from '@/store/features/ui/ui.type';

interface CreatedVideoItemProps {
  item: VideoTreeEntryWithData;
}

export default function CreatedVideoItem({ item }: CreatedVideoItemProps) {
  const { filterItems } = useContext(ListContext);
  const { open } = useModal<DeleteVideoModal>();

  const deleteHandler = async () => {
    const result = await open('delete-video', {
      videoId: item.id,
      title: item.title,
    });

    if (result === 'completed') {
      filterItems(item.id);
    }
  };

  return (
    <motion.li
      className="relative flex flex-col h-full bg-primaryoverflow-hidden shadow-md dark:ring-2 dark:ring-tertiary"
      variants={opacityVariants}
      layout
      initial="inActive"
      animate="active"
      exit="inActive"
    >
      <div>
        <VideoThumbnail title={item.title} url={item.thumbnail} />
      </div>
      <div className="relative flex flex-col h-full p-4 gap-4">
        <VideoTitle title={item.title} />
        <div className="flex justify-between mt-auto gap-2">
          <div className="flex flex-col gap-2">
            <VideoStatus status={item.status} />
            <VideoDuration
              min={item.minDuration}
              max={item.maxDuration}
              brief
            />
            <div className="flex gap-2">
              <VideoViews count={item.views} />
              <VideoFavorites count={item.favorites} active={false} />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <VideoTimestamps createdAt={item.createdAt} />
            <div className="flex mt-auto gap-2">
              <Button small inversed>
                <EditIcon width={20} height={20} />
              </Button>
              <Button small onClick={deleteHandler}>
                <DeleteIcon width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
