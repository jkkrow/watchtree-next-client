import SkeletonItem from '..';

export default function SubscriptionSkeleton() {
  return (
    <SkeletonItem>
      <div className="flex p-4 gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary" />
        <div className="flex flex-col justify-center w-full gap-2 [&_div]:bg-secondary [&_div]:rounded-sm">
          <div className="w-2/3 h-3" />
          <div className="w-1/2 h-3" />
        </div>
      </div>
    </SkeletonItem>
  );
}
