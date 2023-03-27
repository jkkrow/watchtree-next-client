import { useMemo, useState } from 'react';

import { formatDate } from '@/utils/format';

interface VideoTimestampsProps {
  timestamp: string;
}

export default function VideoTimestamps({ timestamp }: VideoTimestampsProps) {
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

  return (
    <div
      className="cursor-pointer text-sm transition-colors hover:text-hover"
      onClick={() => setIsTimeSince((prev) => !prev)}
    >
      <span>{isTimeSince ? timeSince : dateString}</span>
    </div>
  );
}
