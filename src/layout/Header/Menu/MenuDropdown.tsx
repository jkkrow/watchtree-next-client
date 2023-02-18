import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import Link from '@/components/common/Element/Link';
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });

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
          className="absolute top-full flex flex-col right-0 w-60 p-4 gap-4 font-bold ring-1 ring-secondary bg-primary"
          variants={menuVariants}
          transition={{ duration: 0.1 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Link href="signin">Sign In</Link>
          <ThemeToggle />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
