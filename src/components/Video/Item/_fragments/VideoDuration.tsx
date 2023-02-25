import { useMemo } from 'react';

import TimeIcon from '@/assets/icons/time.svg';
import { formatTime } from '@/utils/format';

interface VideoDurationProps {
  min: number;
  max: number;
  brief?: boolean;
}

export default function VideoDuration({ min, max, brief }: VideoDurationProps) {
  const [formattedMin, formattedMax] = useMemo(
    () => [formatTime(min), formatTime(max)],
    [min, max]
  );

  return (
    <div className="flex items-center gap-1">
      <div className="w-6 h-6">
        <TimeIcon />
      </div>
      {brief && <div>Duration:</div>}
      <div>
        {min === max ? formattedMax : `${formattedMin} - ${formattedMax}`}
      </div>
    </div>
  );
}
