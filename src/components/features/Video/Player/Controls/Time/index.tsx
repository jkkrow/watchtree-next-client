import { memo } from 'react';

import styles from './index.module.scss';

interface TimeProps {
  time: string;
}

const Time = ({ time }: TimeProps) => (
  <time className={styles.container} dateTime={time}>
    {time}
  </time>
);

export default memo(Time);
