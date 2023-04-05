import Progress from '@/components/common/UI/Progress';
import { UploadProgress } from '@/store/features/upload/upload.type';
import { formatSize } from '@/utils/format';

interface UploadProgressItemProps {
  progress: UploadProgress;
}

export default function UploadProgressItem({
  progress,
}: UploadProgressItemProps) {
  return (
    <div className="flex justify-between items-center p-4 gap-4 border-t-[1.5px] border-secondary">
      <div className="text-ellipsis overflow-hidden mr-4">
        {progress.fileName}
      </div>
      <div className="flex flex-shrink-0 items-center gap-4">
        {progress.rate ? (
          <div className="text-sm">{formatSize(progress.rate)}/s</div>
        ) : null}
        <Progress size={32} percentage={progress.percentage} />
      </div>
    </div>
  );
}
