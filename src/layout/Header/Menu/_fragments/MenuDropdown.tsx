import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import MenuNavigation from './MenuNavigation';
const MenuSettings = dynamic(() => import('./MenuSettings'), { ssr: false });

const menuVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface MenuDropdownProps {
  active: boolean;
}

export default function MenuDropdown({ active }: MenuDropdownProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="absolute top-full right-0 w-60 bg-primary ring-1 ring-secondary"
          variants={menuVariants}
          transition={{ duration: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <MenuNavigation />
          <MenuSettings />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
