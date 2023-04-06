import { memo } from 'react';

import Btn from '../Btn';
import VolumeHighIcon from '@/assets/icons/volume-high.svg';
import VolumeMiddleIcon from '@/assets/icons/volume-middle.svg';
import VolumeLowIcon from '@/assets/icons/volume-low.svg';
import VolumeMuteIcon from '@/assets/icons/volume-mute.svg';
import styles from './index.module.scss';

interface VolumeProps {
  volume: number;
  onToggle: () => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Volume = ({ volume, onToggle, onSeek }: VolumeProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.range} data-type="range">
        <div data-type="background" />
        <div data-type="current" style={{ width: `${volume * 100}%` }}>
          <div data-type="thumb" />
        </div>
        <input
          type="range"
          data-type="seek"
          value={volume}
          max="1"
          step="0.05"
          onChange={onSeek}
        />
      </div>
      <Btn onClick={onToggle}>
        {volume > 0.7 && <VolumeHighIcon />}
        {volume <= 0.7 && volume > 0.3 && <VolumeMiddleIcon />}
        {volume <= 0.3 && volume > 0 && <VolumeLowIcon />}
        {volume === 0 && <VolumeMuteIcon />}
      </Btn>
    </div>
  );
};

export default memo(Volume);
