import Button from '@/components/common/Element/Button';
import ReloadIcon from '@/assets/icons/reload.svg';
import UploadIcon from '@/assets/icons/upload.svg';
import { GetCreatedVideosRequest } from '@/store/features/video/video.type';
import { useGetCreatedVideosQuery } from '@/store/features/video/video.api';

interface CreatedVideoHeaderProps {
  params?: GetCreatedVideosRequest;
}

export default function CreatedVideoHeader({
  params,
}: CreatedVideoHeaderProps) {
  const { refetch, isFetching, isLoading } = useGetCreatedVideosQuery(params, {
    skip: !params,
  });

  return (
    <div className="flex justify-end ml-auto mb-6 gap-4">
      <Button small loading={!isLoading && isFetching} onClick={refetch}>
        <ReloadIcon width={24} height={24} />
      </Button>
      <Button small inversed>
        <UploadIcon width={20} height={20} />
        <span>Upload Video</span>
      </Button>
    </div>
  );
}
