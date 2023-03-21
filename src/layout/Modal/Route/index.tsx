import { motion, AnimatePresence, Variants } from 'framer-motion';

import { useModal } from '@/hooks/ui/modal';
import { modalVariants } from '@/constants/variants';

interface ModalItemProps {
  id: string;
  element: React.FC<any>;
}

export default function ModalRoute({ id, element: Element }: ModalItemProps) {
  const { modal, cancel, clear } = useModal();

  return (
    <AnimatePresence onExitComplete={clear}>
      {modal && modal.status === 'pending' && modal.id === id ? (
        <motion.div
          className="fixed flex justify-center items-center inset-0 z-10 bg-black/60"
          variants={modalVariants.container}
          initial="inActive"
          animate="active"
          exit="inActive"
        >
          <div className="absolute inset-0 -z-10" onClick={cancel} />
          <motion.div
            className="relative mx-8 mb-16 bg-primary rounded-md overflow-hidden shadow-md dark:ring-1 dark:ring-secondary"
            variants={modalVariants.window}
          >
            <Element {...modal} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
