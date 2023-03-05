import { motion, AnimatePresence } from 'framer-motion';

import { useVideoModal } from '@/hooks/ui/video-modal';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function Modal() {
  const { itemId, close } = useVideoModal();

  return (
    <>
      <AnimatePresence>
        {itemId ? (
          <motion.div
            className="absolute inset-0 z-10 bg-black/60"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={close}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {itemId ? (
          <motion.div
            className="fixed top-8 left-0 right-0 mx-auto z-10 w-2/3 h-3/4 bg-primary"
            layoutId={itemId}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
