import { memo } from 'react';

import Btn from '../Btn';
import PlayIcon from '@/assets/icons/play.svg';
import PauseIcon from '@/assets/icons/pause.svg';

interface PlaybackProps {
  isPaused: boolean;
  onToggle: () => void;
}

const Playback = ({ isPaused, onToggle }: PlaybackProps) => (
  <div>
    <Btn label={isPaused ? 'Pause' : 'Play'} onClick={onToggle}>
      {!isPaused && <PlayIcon />}
      {isPaused && <PauseIcon />}
    </Btn>
  </div>
);

export default memo(Playback);
