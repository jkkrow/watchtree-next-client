import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useContext } from 'react';

import VideoTitle from '@/components/features/Video/UI/VideoTitle';
import VideoThumbnail from '@/components/features/Video/UI/VideoThumbnail';
import VideoDuration from '@/components/features/Video/UI/VideoDuration';
import VideoViews from '@/components/features/Video/UI/VideoViews';
import VideoFavorites from '@/components/features/Video/UI/VideoFavorites';
import VideoTimestamps from '@/components/features/Video/UI/VideoTimestamps';
import Button from '@/components/common/Element/Button';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import CircleLoadingIcon from '@/assets/icons/circle-loading.svg';
import { VideoModalContext } from '@/context/video-modal';
import { useModal } from '@/hooks/ui/modal';
import { useAppSelector } from '@/hooks/store';
import { useContinueUploadMutation } from '@/store/features/upload/upload.api';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { DeleteVideoModal } from '@/store/features/ui/ui.type';

interface UserVideoItemProps {
  item: VideoTreeEntryWithData;
}

const LABEL = 'user';

export default function UserVideoItem({ item }: UserVideoItemProps) {
  const router = useRouter();
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const { open: openDelete } = useModal<DeleteVideoModal>();
  const { open: openVideoModal } = useContext(VideoModalContext);
  const [continueUpload, { isLoading }] = useContinueUploadMutation();

  const openVideoModalHandler = () => {
    openVideoModal(item, { label: LABEL });
  };

  const editHandler = async () => {
    if (tree && tree.id === item.id) {
      return router.push('/upload');
    }

    await continueUpload(item.id).unwrap();
    router.push('/upload');
  };

  const deleteHandler = () => {
    openDelete('delete-video', { videoId: item.id, title: item.title });
  };

  return (
    <motion.li
      className="relative flex flex-col h-full bg-primary overflow-hidden shadow-md"
      layoutId={item.id + LABEL}
    >
      <div className="relative cursor-pointer" onClick={openVideoModalHandler}>
        <VideoThumbnail
          title={item.title}
          url={item.thumbnail}
          fallback={item.defaultThumbnail}
        />
        {item.editing ? (
          <div className="absolute top-0 left-0 font-medium bg-neutral-900/80 text-neutral-100 p-2">
            EDITING
          </div>
        ) : null}
      </div>
      <div className="relative flex flex-col h-full p-4 gap-4">
        <div className="mb-auto line-clamp-2">
          <VideoTitle title={item.title} />
        </div>
        <div className="flex flex-col gap-2">
          <VideoDuration min={item.minDuration} max={item.maxDuration} brief />
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex gap-2">
              <VideoViews count={item.views} />
              <VideoFavorites
                id={item.id}
                count={item.favorites}
                active={false}
              />
            </div>
            <div className="ml-auto">
              <VideoTimestamps timestamp={item.createdAt} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            inversed={!tree ? true : tree.id === item.id ? true : false}
            disabled={!tree ? false : tree.id === item.id ? false : true}
            loading={isLoading}
            onClick={editHandler}
          >
            {tree && tree.id === item.id ? (
              <CircleLoadingIcon className="w-6 h-6" />
            ) : (
              <EditIcon className="w-5 h-5" />
            )}
          </Button>
          <Button onClick={deleteHandler}>
            <DeleteIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.li>
  );
}
