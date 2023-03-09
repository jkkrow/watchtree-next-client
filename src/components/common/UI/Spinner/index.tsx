import { AnimatePresence, motion } from 'framer-motion';

import LoaderIcon from '@/assets/icons/loader.svg';

const loaderVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface SpinnerProps {
  on?: boolean;
  size: number;
  overlay?: boolean;
}

export default function Spinner({ on, size, overlay }: SpinnerProps) {
  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className="flex justify-center items-center data-[overlay=true]:absolute data-[overlay=true]:inset-0 data-[overlay=true]:bg-inherit data-[overlay=true]:text-inherit"
          data-overlay={overlay}
          variants={loaderVariants}
          transition={{ duration: 0.15 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <LoaderIcon className="animate-spin" width={size} height={size} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
