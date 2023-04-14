import Skeleton from '../..';

export default function SubscriptionSkeleton() {
  return (
    <div>
      <div className="flex p-4 gap-4">
        <div className="flex-shrink-0">
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div className="flex flex-col justify-center w-full gap-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
    </div>
  );
}
