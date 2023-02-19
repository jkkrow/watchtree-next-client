import { motion } from 'framer-motion';

import Avatar from '@/components/common/UI/Avatar';
import { useAppSelector } from '@/hooks/store';

const containerVariants = {
  active: { rotate: 90 },
  inActive: { rotate: 0 },
};

const topVariants = {
  active: { y: 0, rotate: 45 },
  inActive: { y: -6 },
};

const centerVariants = {
  active: { rotate: 45 },
  inActive: { rotate: 0 },
};

const bottomVariants = {
  active: { y: 0, rotate: -45 },
  inActive: { y: 6 },
};

interface MenuButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function MenuToggle({ active, onClick }: MenuButtonProps) {
  const userInfo = useAppSelector((state) => state.user.info);

  return (
    <div className="flex items-center h-full cursor-pointer" onClick={onClick}>
      {userInfo ? (
        <Avatar src={userInfo.picture} name={userInfo.name} />
      ) : (
        <motion.div
          className="relative flex flex-col justify-center w-6 h-6"
          variants={containerVariants}
          initial="inActive"
          animate={active ? 'active' : 'inActive'}
        >
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={topVariants}
          />
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={centerVariants}
          />
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={bottomVariants}
          />
        </motion.div>
      )}
    </div>
  );
}
