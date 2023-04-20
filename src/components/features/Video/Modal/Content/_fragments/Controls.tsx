import VideoFavorites from '../../../UI/VideoFavorites';
import Button from '@/components/common/Element/Button';
import HistoryIcon from '@/assets/icons/history.svg';
import { useModal } from '@/hooks/ui/modal';
import { VideoTreeEntryWithData } from '@/store/features/video/video.type';
import { DeleteHistoryModal } from '@/store/features/ui/ui.type';

interface ControlsProps {
  video: VideoTreeEntryWithData;
}

export default function Controls({ video }: ControlsProps) {
  const { open } = useModal<DeleteHistoryModal>();

  const deleteHistoryHandler = () => {
    open('delete-history', { videoId: video.id });
  };

  return (
    <div className="flex gap-2 justify-end">
      {video.history ? (
        <Button small onClick={deleteHistoryHandler}>
          <span className="w-6 h-6">
            <HistoryIcon />
          </span>
          <span>Delete Watch History</span>
        </Button>
      ) : null}
      <VideoFavorites
        id={video.id}
        count={video.favorites}
        active={video.favorited}
        button
      />
    </div>
  );
}
