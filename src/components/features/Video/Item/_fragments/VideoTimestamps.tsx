import { useMemo, useState } from 'react';

import { formatDate } from '@/utils/format';

interface VideoTimestampsProps {
  timestamp: string;
  label?: string;
}

export default function VideoTimestamps({
  timestamp,
  label,
}: VideoTimestampsProps) {
  const [isTimeSince, setIsTimeSince] = useState(false);
  const [timeSince, dateString] = useMemo(
    () => [
      formatDate(timestamp),
      new Date(timestamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    ],
    [timestamp]
  );

  const toggleHandler = () => {
    setIsTimeSince((prev) => !prev);
  };

  return (
    <div
      className="flex gap-2 cursor-pointer text-sm transition-colors data-[disabled=true]:pointer-events-none hover:text-hover"
      data-disabled={!!label}
      onClick={toggleHandler}
    >
      {label ? <span className="font-medium">{label}</span> : null}
      <span>{isTimeSince ? timeSince : dateString}</span>
    </div>
  );
}
