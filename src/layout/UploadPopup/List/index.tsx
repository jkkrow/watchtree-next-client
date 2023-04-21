import { motion, AnimatePresence } from 'framer-motion';

import UploadItem from '../Item';
import ShrinkIcon from '@/assets/icons/shrink.svg';
import { uploadPopupVariants } from '@/constants/variants';
import { UploadProgress } from '@/store/features/upload/upload.type';

interface UploadListProps {
  on: boolean;
  progresses: UploadProgress[];
  onToggle: () => void;
}

export default function UploadList({
  on,
  progresses,
  onToggle,
}: UploadListProps) {
  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className="flex flex-col w-full h-full"
          variants={uploadPopupVariants.list}
          initial="inActive"
          animate="active"
        >
          <header className="flex items-center font-medium p-4 border-b-[1.5px] border-secondary">
            <div>Upload Progress</div>
            <button className="w-6 h-6 ml-auto" onClick={onToggle}>
              <ShrinkIcon />
            </button>
          </header>
          <ul className="flex flex-col w-full h-full bg-primary overflow-auto">
            {progresses.map((progress) => (
              <UploadItem key={progress.fileName} progress={progress} />
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
