import { motion } from 'framer-motion';

import Avatar from '@/components/common/UI/Avatar';
import { useAppSelector } from '@/hooks/store';
import { menuVariants } from '@/constants/variants';

interface MenuButtonProps {
  active: boolean;
  onClick: () => void;
}

export default function MenuToggle({ active, onClick }: MenuButtonProps) {
  const userInfo = useAppSelector((state) => state.user.info);

  return (
    <button
      className="flex items-center h-full cursor-pointer"
      onClick={onClick}
    >
      {userInfo ? (
        <Avatar src={userInfo.picture} name={userInfo.name} size={32} />
      ) : (
        <motion.div
          className="relative flex flex-col justify-center w-6 h-6"
          initial="inActive"
          animate={active ? 'active' : 'inActive'}
        >
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={menuVariants.top}
          />
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={menuVariants.center}
          />
          <motion.span
            className="absolute w-full h-0.5 bg-inversed"
            variants={menuVariants.bottom}
          />
        </motion.div>
      )}
    </button>
  );
}
