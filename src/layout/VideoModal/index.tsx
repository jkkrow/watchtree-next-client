import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

import VideoModalContent from './Content';
import { useVideoModal } from '@/hooks/ui/video-modal';
import { useScrollLock } from '@/hooks/ui/scroll-lock';
import { opacityVariants } from '@/constants/variants';

export default function VideoModal() {
  const { item, close } = useVideoModal();

  useScrollLock(!!item);

  return (
    <>
      {item ? (
        <Head>
          <title>{item.title}</title>
        </Head>
      ) : null}

      <AnimatePresence>
        {item ? (
          <div className="fixed flex inset-0 md:p-6 z-10">
            <motion.div
              className="absolute inset-0 bg-black/60"
              variants={opacityVariants}
              initial="inActive"
              animate="active"
              exit="inActive"
              onClick={close}
            />
            <motion.div
              className="relative max-w-6xl z-10 w-full mx-auto bg-primary md:rounded-md overflow-auto scrollbar-hide"
              layoutId={item.id}
            >
              <VideoModalContent item={item} onClose={close} />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
