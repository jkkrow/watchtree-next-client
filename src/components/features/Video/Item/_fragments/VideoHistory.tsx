import HistoryIcon from '@/assets/icons/history.svg';
import { History } from '@/store/features/history/history.type';

interface VideoHistoryProps {
  history: History | null;
  max: number;
}

export default function VideoHistory({ history, max }: VideoHistoryProps) {
  const percentage = Math.floor(
    history ? (history.ended ? 100 : (history.totalProgress / max) * 100) : 0
  );

  return history ? (
    <div className="flex items-center gap-2 font-medium">
      <div className="flex-shrink-0 w-6 h-6">
        <HistoryIcon />
      </div>
      <div className="w-full h-1 rounded-lg bg-secondary overflow-hidden">
        <div
          className="h-full bg-inversed"
          style={{ width: percentage + '%' }}
        />
      </div>
      <div>{percentage}%</div>
    </div>
  ) : null;
}
