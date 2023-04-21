import Progress from '@/components/common/UI/Progress';
import { UploadProgress } from '@/store/features/upload/upload.type';
import RemoveIcon from '@/assets/icons/remove.svg';
import Button from '@/components/common/Element/Button';
import { useCancelUploadMutation } from '@/store/features/upload/upload.api';
import { formatSize } from '@/utils/format';

interface UploadItemProps {
  progress: UploadProgress;
}

export default function UploadItem({
  progress: { fileName, rate, percentage, uploadId },
}: UploadItemProps) {
  const [cancelUpload, { isLoading }] = useCancelUploadMutation();

  const cancelUploadHandler = () => {
    cancelUpload({ fileName, uploadId });
  };

  return (
    <div className="flex justify-between items-center p-4 gap-4">
      <div className="text-ellipsis overflow-hidden mr-4">{fileName}</div>
      <div className="flex flex-shrink-0 items-center gap-4 [&_button]:h-10 [&_button]:p-3">
        {rate ? <div className="text-sm">{formatSize(rate)}/s</div> : null}
        <Progress size={32} percentage={percentage} />
        <Button
          small
          inversed
          loading={isLoading}
          onClick={cancelUploadHandler}
        >
          <RemoveIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
