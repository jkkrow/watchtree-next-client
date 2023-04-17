import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import Button from '@/components/common/Element/Button';
import UpdateIcon from '@/assets/icons/update.svg';
import UploadIcon from '@/assets/icons/upload.svg';
import { useAppSelector } from '@/hooks/store';
import { useGetCreatedVideosQuery } from '@/store/features/video/video.api';
import { useInitiateUploadMutation } from '@/store/features/upload/upload.api';
import { GetCreatedVideosRequest } from '@/store/features/video/video.type';

interface UserVideoHeaderProps {
  params?: GetCreatedVideosRequest;
}

export default function UserVideoHeader({ params }: UserVideoHeaderProps) {
  const router = useRouter();
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const { refetch, isFetching, isLoading } = useGetCreatedVideosQuery(
    params || skipToken,
    { skip: !params }
  );
  const [initiateUpload, { isLoading: initiateLoading }] =
    useInitiateUploadMutation();

  const initiateUploadHandler = async () => {
    if (tree) return router.push('/upload');

    await initiateUpload().unwrap();
    router.push('/upload');
  };

  return (
    <div className="flex flex-col justify-between sm:flex-row items-center w-full mb-6 gap-8">
      <div className="text-xl font-bold">
        <h2>My Videos</h2>
      </div>
      <div className="flex ml-auto gap-4">
        <Button
          small
          inversed
          loading={!isLoading && isFetching}
          onClick={refetch}
        >
          <UpdateIcon className="w-6 h-6" />
        </Button>
        <Button
          small
          inversed
          loading={initiateLoading}
          onClick={initiateUploadHandler}
        >
          <UploadIcon className="w-5 h-5" />
          <span>{tree ? 'Continue Upload' : 'Upload Video'}</span>
        </Button>
      </div>
    </div>
  );
}
