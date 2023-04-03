import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

interface ControlsProps {
  hideOn: boolean;
}

const Controls = ({ hideOn, children }: PropsWithChildren<ControlsProps>) => {
  return (
    <div className={styles.container} data-hide={hideOn}>
      {children}
    </div>
  );
};

export default Controls;
