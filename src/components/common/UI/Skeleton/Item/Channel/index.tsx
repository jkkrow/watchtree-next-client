import Skeleton from '../..';

export default function ChannelSkeleton() {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <Skeleton variant="circular" width={96} height={96} />
      </div>
      <div className="flex flex-col justify-center w-full gap-4">
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="50%" height={16} />
      </div>
    </div>
  );
}
