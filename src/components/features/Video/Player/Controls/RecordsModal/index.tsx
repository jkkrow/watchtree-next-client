import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useClickOutside } from '@/hooks/ui/click-outside';
import { playerModalVariants } from '@/constants/variants';
import { VideoNode } from '@/store/features/video/video.type';
import styles from './index.module.scss';

interface RecordsModalProps {
  on: boolean;
  records: VideoNode[];
  onClose: () => void;
  onSelect: (id: string) => void;
}

const RecordsModal = ({
  on,
  records,
  onClose,
  onSelect,
}: RecordsModalProps) => {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className={styles.container}
          ref={modalRef}
          variants={playerModalVariants}
          initial="inActive"
          animate="active"
          exit="inActive"
          transition={{ ease: 'easeOut' }}
        >
          <ul className={styles.list}>
            {[...records].reverse().map((record) =>
              record.url ? (
                <li
                  key={record.id}
                  className={styles.item}
                  onClick={() => onSelect(record.id)}
                >
                  <div>{record.level === 0 ? 'Root' : record.label}</div>
                </li>
              ) : null
            )}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default memo(RecordsModal);
