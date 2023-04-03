import { useRouter } from 'next/router';
import { memo } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import styles from './index.module.scss';

interface VideoHeaderProps {
  hideOn: boolean;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ hideOn }) => {
  const router = useRouter();

  return (
    <div className={styles.container} data-hide={hideOn}>
      <ArrowLeftIcon onClick={() => router.back()} />
    </div>
  );
};

export default memo(VideoHeader);
