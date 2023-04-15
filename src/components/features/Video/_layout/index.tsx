import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

import { opacityVariants } from '@/constants/variants';

export default function VideoLayout({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="absolute inset-0 z-30 bg-black text-white"
      // variants={opacityVariants}
      // initial="inActive"
      // animate="active"
      // exit="inActive"
    >
      {children}
    </motion.div>
  );
}
