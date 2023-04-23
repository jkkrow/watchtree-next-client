import Skeleton from '../..';

export default function NodeSkeleton() {
  return (
    <div className="flex w-full gap-4">
      <div className="flex-shrink-0 w-1/3 min-w-[150px]">
        <Skeleton variant="rectangular" />
      </div>
      <div className="flex flex-col w-full py-2 gap-4">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  );
}
