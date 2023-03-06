import ViewIcon from '@/assets/icons/view.svg';
import { formatNumber } from '@/utils/format';

interface VideoViewsProps {
  count: number;
}

export default function VideoViews({ count }: VideoViewsProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-6 h-6">
        <ViewIcon />
      </span>
      <span>{formatNumber(count)}</span>
    </div>
  );
}
