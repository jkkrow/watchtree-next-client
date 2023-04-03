import { memo } from 'react';

import ReloadIcon from '@/assets/icons/reload.svg';
import styles from './index.module.scss';

interface ErrorProps {
  error: MediaError | null;
}

const Error = ({ error }: ErrorProps) => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return error ? (
    <div className={styles.container}>
      {error.code && <p>Error Code: {error.code}</p>}
      <p>{error.message || 'Error occurred! Please try again'}</p>
      <ReloadIcon onClick={refreshHandler} />
    </div>
  ) : null;
};

export default memo(Error);
