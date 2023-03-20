import { motion, AnimatePresence, Variants } from 'framer-motion';

import { useModal } from '@/hooks/ui/modal';

const containerVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants: Variants = {
  visible: { y: 0 },
  hidden: { y: -500, transition: { bounce: 0 } },
};

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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="absolute inset-0 -z-10" onClick={cancel} />
          <motion.div
            className="relative mx-8 mb-16 bg-primary rounded-md overflow-hidden shadow-md dark:ring-1 dark:ring-secondary"
            variants={modalVariants}
          >
            <Element {...modal} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
