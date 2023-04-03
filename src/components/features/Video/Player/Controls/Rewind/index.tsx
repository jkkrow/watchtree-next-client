import { memo } from 'react';

import Btn from '../Btn';
import TrackPrevIcon from '@/assets/icons/track-prev.svg';
import TrackFirstIcon from '@/assets/icons/track-first.svg';
import styles from './index.module.scss';

interface RewindProps {
  onRestart: () => void;
  onPrev: () => void;
}

const Rewind = ({ onRestart, onPrev }: RewindProps) => {
  return (
    <div className={styles.container}>
      <Btn label="Restart" onClick={onRestart}>
        <TrackFirstIcon />
      </Btn>
      <Btn label="Previous Video" onClick={onPrev}>
        <TrackPrevIcon />
      </Btn>
    </div>
  );
};

export default memo(Rewind);
