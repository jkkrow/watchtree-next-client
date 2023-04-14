import Image from 'next/image';
import { memo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import RemoveIcon from '@/assets/icons/remove.svg';
import { useClickOutside } from '@/hooks/ui/click-outside';
import { playerModalVariants } from '@/constants/variants';
import { VideoNode } from '@/store/features/video/video.type';
import { getImageUrl } from '@/utils/image';
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

  useEffect(() => {
    if (!on || !modalRef.current) return;
    const modalContainer = modalRef.current;
    const modalList = modalContainer.querySelector('ul');

    if (!modalList) return;
    const lastItem = modalList!.lastChild;

    if (!lastItem) return;
    (lastItem as HTMLLIElement).scrollTo({ behavior: 'smooth' });
    modalList.scrollTo({ top: modalList.scrollHeight, behavior: 'smooth' });
  }, [on, modalRef]);

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
          <header className={styles.header} onClick={onClose}>
            <RemoveIcon />
            <span>Records</span>
          </header>
          <ul className={styles.list}>
            {records.map((record) =>
              record.url ? (
                <li
                  key={record.id}
                  className={styles.item}
                  onClick={() => onSelect(record.id)}
                >
                  <div className={styles.image}>
                    <Image
                      src={getImageUrl(record.thumbnail)}
                      alt={record.name}
                      sizes="320px"
                      fill
                    />
                  </div>
                  <div className={styles.label}>
                    {record.level === 0 ? 'Root' : record.label}
                  </div>
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
