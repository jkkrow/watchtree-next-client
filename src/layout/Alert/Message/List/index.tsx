import { AnimatePresence } from 'framer-motion';

import MessageItem from '../Item';
import { useAppSelector } from '@/hooks/store';

// const messages = [
//   {
//     id: `${Math.random() * 999999}`,
//     type: 'message' as const,
//     content: 'Image deleted successfully',
//   },
//   {
//     id: `${Math.random() * 999999}`,
//     type: 'message' as const,
//     content: 'VideoTree updated successfully',
//   },
//   {
//     id: `${Math.random() * 999999}`,
//     type: 'message' as const,
//     content: 'VideoTree deleted successfully',
//   },
// ];

export default function MessageList() {
  const messages = useAppSelector((state) => state.ui.messages);

  return (
    <ul className="flex flex-col justify-end items-center w-full gap-4">
      <AnimatePresence>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
