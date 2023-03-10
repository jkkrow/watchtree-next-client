import { AnimatePresence } from 'framer-motion';

import MessageItem from './MessageItem';
import { useAppSelector } from '@/hooks/store';

export default function MessageList() {
  const messages = useAppSelector((state) => state.ui.messages);

  return (
    <ul className="flex flex-col items-center w-full gap-4">
      <AnimatePresence>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
