import { motion } from 'framer-motion';

import { Message } from '@/store/features/ui/ui.type';
import { useAppDispatch } from '@/hooks/store';
import { clearMessage } from '@/store/features/ui/ui.slice';

const itemVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const dispatch = useAppDispatch();

  const deleteMessageHandler = () => {
    dispatch(clearMessage(message.id));
  };

  return (
    <motion.div
      layout
      className="w-full max-w-6xl p-4 bg-success aria-[invalid=true]:bg-invalid shadow-md cursor-pointer rounded-md"
      aria-invalid={message.type === 'error'}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.2 }}
      whileHover={{ opacity: 0.8 }}
      onClick={deleteMessageHandler}
    >
      {message.subject && <div className="font-bold">{message.subject}</div>}
      <div>{message.content}</div>
    </motion.div>
  );
}
