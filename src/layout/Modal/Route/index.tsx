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
  element: JSX.Element;
}

export default function ModalRoute({ id, element }: ModalItemProps) {
  const { modal, close } = useModal();

  return (
    <AnimatePresence>
      {modal && modal.id === id ? (
        <motion.div
          className="fixed flex justify-center items-center inset-0 z-10 bg-black/60"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="absolute inset-0 -z-10" onClick={close} />
          <motion.div
            className="relative max-w-screen-md mx-4 bg-primary rounded-md overflow-hidden"
            variants={modalVariants}
          >
            {element}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
