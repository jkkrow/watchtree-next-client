import { AnimatePresence, motion } from 'framer-motion';

import LoaderIcon from '@/assets/icons/loader.svg';
import { opacityVariants } from '@/constants/variants';

interface SpinnerProps {
  on?: boolean;
  size: number;
  overlay?: boolean;
  position?: 'top' | 'center' | 'bottom';
}

export default function Spinner({ on, size, overlay, position }: SpinnerProps) {
  const sizeInRem = size / 16;

  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className="flex justify-center items-center data-[overlay=true]:absolute data-[overlay=true]:inset-0 data-[overlay=true]:bg-inherit data-[overlay=true]:text-inherit data-[position=top]:items-start data-[position=bottom]:items-end"
          data-overlay={overlay}
          data-position={position || 'center'}
          variants={opacityVariants}
          transition={{ duration: 0.15 }}
          initial="inActive"
          animate="active"
          exit="inActive"
        >
          <LoaderIcon
            className="animate-spin"
            width={`${sizeInRem}rem`}
            height={`${sizeInRem}rem`}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
