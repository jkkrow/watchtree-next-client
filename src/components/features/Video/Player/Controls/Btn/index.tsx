import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

interface BtnProps {
  label?: string;
  onClick: () => void;
}

export default function Btn({
  label,
  onClick,
  children,
}: PropsWithChildren<BtnProps>) {
  return (
    <button className={styles.container} data-label={label} onClick={onClick}>
      {children}
    </button>
  );
}
