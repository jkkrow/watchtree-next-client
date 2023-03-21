import { AnimatePresence, motion } from 'framer-motion';

import MenuNavigation from './MenuNavigation';
import MenuSettings from './MenuSettings';
import { opacityVariants } from '@/constants/variants';

interface MenuDropdownProps {
  active: boolean;
}

export default function MenuDropdown({ active }: MenuDropdownProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="absolute top-full right-0 w-60 bg-primary border-[1px] border-secondary shadow-lg"
          variants={opacityVariants}
          transition={{ duration: 0.1 }}
          initial="inActive"
          animate="active"
          exit="inActive"
        >
          <MenuNavigation />
          <MenuSettings />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
