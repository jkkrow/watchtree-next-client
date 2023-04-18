import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import VideoModalContent from './Content';
import { VideoModalContext } from '@/context/video-modal';
import { videoModalVariants } from '@/constants/variants';

export default function VideoModal() {
  const { item, layoutAnimation, close } = useContext(VideoModalContext);

  return (
    <>
      {item ? (
        <Head>
          <title>{item.video.title}</title>
        </Head>
      ) : null}

      <AnimatePresence initial={false}>
        {item ? (
          <div className="fixed flex inset-0 md:p-6 z-10">
            <motion.div
              className="absolute inset-0 bg-black/60"
              variants={videoModalVariants.container}
              initial="inActive"
              animate="active"
              exit="inActive"
              onClick={close}
            />
            <motion.div
              className="relative max-w-6xl z-10 w-full mx-auto bg-primary md:rounded-md overflow-auto scrollbar-hide"
              layoutId={layoutAnimation ? item.video.id : undefined}
              variants={
                !layoutAnimation ? videoModalVariants.window : undefined
              }
              initial="inActive"
              animate="active"
              exit="inActive"
            >
              <VideoModalContent video={item.video} />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
