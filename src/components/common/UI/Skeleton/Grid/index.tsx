import VideoSkeleton from '../Item/Video';
import SubscriptionSkeleton from '../Item/Subscription';
import NodeSkeleton from '../Item/Node';

interface SkeletonGridProps {
  on: boolean;
  count: number;
  type: 'video' | 'subscription' | 'node';
}

export default function SkeletonGrid({ on, count, type }: SkeletonGridProps) {
  let item: JSX.Element;
  let className: string;

  switch (type) {
    case 'video':
      item = <VideoSkeleton />;
      className = 'grid-cols-2 md:grid-cols-video';
      break;
    case 'subscription':
      item = <SubscriptionSkeleton />;
      className = 'grid-cols-1 max-w-md lg:grid-cols-2 lg:max-w-5xl';
      break;
    case 'node':
      item = <NodeSkeleton />;
      className = 'grid-cols-1';
  }

  return on ? (
    <ul className={`grid w-full gap-6 ${className}`}>
      {Array.from(Array(count)).map((_, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  ) : null;
}
