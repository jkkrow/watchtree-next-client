import { motion } from 'framer-motion';

import { rotate180Variants } from '@/constants/variants';

interface NavigationToggleProps {
  active: boolean;
  onClick: () => void;
}

export default function NavigationToggle({
  active,
  onClick,
}: NavigationToggleProps) {
  return (
    <motion.button
      className="flex justify-center items-center w-full h-full after:border-t-8 after:border-t-current after:border-x-8 after:border-x-transparent"
      variants={rotate180Variants}
      initial="inActive"
      animate={active ? 'active' : 'inActive'}
      onClick={onClick}
    />
  );
}
