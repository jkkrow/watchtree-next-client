import HistoryIcon from '@/assets/icons/history.svg';

interface VideoHistoryProps {
  max: number;
  progress?: number;
  ended?: boolean;
  brief?: boolean;
  inversed?: boolean;
}

export default function VideoHistory({
  max,
  progress,
  ended,
  brief,
  inversed,
}: VideoHistoryProps) {
  const percentage = Math.floor(ended ? 100 : ((progress ?? 0) / max) * 100);

  return progress !== undefined ? (
    <div
      className="flex items-center w-full gap-2 data-[inversed=true]:text-inversed"
      data-inversed={inversed}
    >
      <div className="flex-shrink-0 w-6 h-6">
        <HistoryIcon />
      </div>
      {!brief ? (
        <div className="w-full h-1 rounded-lg bg-secondary overflow-hidden">
          <div
            className="h-full rounded-lg bg-inversed data-[inversed=true]:bg-primary"
            style={{ width: percentage + '%' }}
            data-inversed={inversed}
          />
        </div>
      ) : null}
      <div className="flex-shrink-0 w-10 text-center">{percentage}%</div>
    </div>
  ) : null;
}
