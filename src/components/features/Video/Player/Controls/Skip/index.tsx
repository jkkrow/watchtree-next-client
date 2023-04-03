import { memo } from 'react';

import Btn from '../Btn';
import TrackNextIcon from '@/assets/icons/track-next.svg';

interface SkipProps {
  onNext: () => void;
}

const Skip = ({ onNext }: SkipProps) => {
  return (
    <div>
      <Btn label="Next Video" onClick={onNext}>
        <TrackNextIcon />
      </Btn>
    </div>
  );
};

export default memo(Skip);
