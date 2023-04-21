import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Progress from '@/components/common/UI/Progress';
import UploadIcon from '@/assets/icons/upload.svg';
import { uploadPopupVariants } from '@/constants/variants';
import { UploadProgress } from '@/store/features/upload/upload.type';

interface UploadAlertProps {
  on: boolean;
  progresses: UploadProgress[];
  onToggle: () => void;
}

export default function UploadAlert({
  on,
  progresses,
  onToggle,
}: UploadAlertProps) {
  const totalPercentage = useMemo(() => {
    const total = progresses.reduce(
      (sum, { percentage }) => sum + percentage,
      0
    );

    return Math.round(total / progresses.length);
  }, [progresses]);

  return (
    <AnimatePresence>
      {on ? (
        <motion.button
          className="relative flex justify-center items-center w-full h-full"
          variants={uploadPopupVariants.alert}
          initial="inActive"
          animate="active"
          onClick={onToggle}
        >
          <Progress size={72} percentage={totalPercentage} />
          <div className="absolute bg-primary w-16 h-16 p-4 rounded-full">
            <UploadIcon stroke="currentColor" strokeWidth={0.5} />
          </div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
