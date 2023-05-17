import { AnimatePresence, Variants, motion } from 'framer-motion';

import { loaderVariants } from '@/constants/variants';

interface SpinnerProps {
  on?: boolean;
  overlay?: boolean;
  position?: 'top' | 'center' | 'bottom';
}

export default function Loader({ on, overlay, position }: SpinnerProps) {
  return (
    <AnimatePresence>
      {on ? (
        <motion.div
          className="flex justify-center items-center py-12 gap-4 [&>div]:w-6 [&>div]:h-6 [&>div]:bg-current data-[overlay=true]:absolute data-[overlay=true]:inset-0 data-[overlay=true]:bg-inherit data-[overlay=true]:text-inherit data-[position=top]:items-start data-[position=bottom]:items-end"
          data-overlay={overlay}
          data-position={position || 'center'}
          variants={loaderVariants.container}
          transition={{ duration: 0.15 }}
          initial="inActive"
          animate="active"
          exit="inActive"
        >
          <motion.div variants={loaderVariants.item} />
          <motion.div variants={loaderVariants.item} />
          <motion.div variants={loaderVariants.item} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
