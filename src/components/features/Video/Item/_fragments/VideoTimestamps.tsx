import { useMemo, useState } from 'react';

import { formatDate } from '@/utils/format';

interface VideoTimestampsProps {
  createdAt: string;
}

export default function VideoTimestamps({ createdAt }: VideoTimestampsProps) {
  const [isTimeSince, setIsTimeSince] = useState(false);
  const [timeSince, dateString] = useMemo(
    () => [
      formatDate(createdAt),
      new Date(createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    ],
    [createdAt]
  );

  return (
    <div
      className="cursor-pointer transition-colors hover:text-hover"
      onClick={() => setIsTimeSince((prev) => !prev)}
    >
      <span>{isTimeSince ? timeSince : dateString}</span>
    </div>
  );
}
