import { motion } from 'framer-motion';

const toggleVariants = {
  active: { rotate: 180 },
  inActive: { rotate: 0 },
};

interface NavigationToggleProps {
  active: boolean;
  onClick: () => void;
}

export default function NavigationToggle({
  active,
  onClick,
}: NavigationToggleProps) {
  return (
    <motion.div
      className="flex justify-center items-center w-full h-full after:border-t-8 after:border-t-current after:border-x-8 after:border-x-transparent"
      variants={toggleVariants}
      initial="inActive"
      animate={active ? 'active' : 'inActive'}
      onClick={onClick}
    />
  );
}
