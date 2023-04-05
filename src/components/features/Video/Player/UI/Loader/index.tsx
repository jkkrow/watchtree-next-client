import { memo } from 'react';

import LoaderIcon from '@/assets/icons/loader.svg';
import styles from './index.module.scss';

interface LoaderProps {
  on: boolean;
}

const Loader: React.FC<LoaderProps> = ({ on }) => {
  return (
    <div className={styles.container} data-active={on}>
      <LoaderIcon />
    </div>
  );
};

export default memo(Loader);
