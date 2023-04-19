import HistoryIcon from '@/assets/icons/history.svg';

interface VideoHistoryProps {
  max: number;
  progress?: number;
  ended?: boolean;
  brief?: boolean;
}

export default function VideoHistory({
  max,
  progress,
  ended,
  brief,
}: VideoHistoryProps) {
  const percentage = Math.floor(ended ? 100 : ((progress ?? 0) / max) * 100);

  return progress !== undefined ? (
    <div className="flex items-center w-full gap-2">
      <div className="flex-shrink-0 w-6 h-6">
        <HistoryIcon />
      </div>
      {!brief ? (
        <div className="w-full h-1 rounded-lg bg-secondary overflow-hidden">
          <div
            className="rounded-lg border-[0.125rem] border-current data-[percentage='0']:border-0"
            style={{ width: percentage + '%' }}
            data-percentage={percentage}
          />
        </div>
      ) : null}
      <div className="flex-shrink-0 w-10 text-center">{percentage}%</div>
    </div>
  ) : null;
}
