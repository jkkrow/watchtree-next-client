import { memo } from 'react';

import UpdateIcon from '@/assets/icons/update.svg';
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
      <UpdateIcon onClick={refreshHandler} />
    </div>
  ) : null;
};

export default memo(Error);
