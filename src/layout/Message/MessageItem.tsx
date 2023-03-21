import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { Message } from '@/store/features/ui/ui.type';
import { useAppDispatch } from '@/hooks/store';
import { clearMessage } from '@/store/features/ui/ui.slice';
import { useTimeout } from '@/hooks/util/time';
import { opacityVariants } from '@/constants/variants';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const dispatch = useAppDispatch();
  const [setClearMessageTimeout] = useTimeout();

  const deleteMessageHandler = () => {
    dispatch(clearMessage(message.id));
  };

  useEffect(() => {
    setClearMessageTimeout(() => {
      dispatch(clearMessage(message.id));
    }, 20000);
  }, [dispatch, setClearMessageTimeout, message.id]);

  return (
    <motion.button
      layout
      className="flex flex-col w-full max-w-6xl p-4 bg-success aria-[invalid=true]:bg-invalid shadow-md cursor-pointer rounded-md"
      aria-invalid={message.type === 'error'}
      variants={opacityVariants}
      initial="inActive"
      animate="active"
      exit="inActive"
      transition={{ duration: 0.2 }}
      whileHover={{ opacity: 0.8 }}
      onClick={deleteMessageHandler}
    >
      {message.subject && <div className="font-bold">{message.subject}</div>}
      <div>{message.content}</div>
    </motion.button>
  );
}
