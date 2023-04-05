import { memo } from 'react';
import { motion } from 'framer-motion';

import { opacityVariants } from '@/constants/variants';
import { VideoNode } from '@/store/features/video/video.type';
import styles from './index.module.scss';

interface SelectorProps {
  on: boolean;
  timerOn: boolean;
  next: VideoNode[];
  leftTime: number;
  onSelect: (index: number) => void;
}

const Selector: React.FC<SelectorProps> = ({
  on,
  timerOn,
  next,
  leftTime,
  onSelect,
}) => {
  return (
    <div className={styles.container} data-active={on}>
      <div className={styles.buttons}>
        {next.map((video, index) => (
          <motion.button
            className={styles.button}
            key={video.id}
            layout
            variants={opacityVariants}
            initial="inActive"
            animate="active"
            onClick={() => onSelect(index)}
          >
            {video.label}
          </motion.button>
        ))}
      </div>
      <div className={styles.timer} data-active={timerOn}>
        {`Selector disapears in . . . ${leftTime}`}
      </div>
    </div>
  );
};

export default memo(Selector);
