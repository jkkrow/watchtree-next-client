import { AnimatePresence } from 'framer-motion';

import NotificationItem from '../Item';
import { useAppSelector } from '@/hooks/store';

export default function NotificationList() {
  const messages = useAppSelector((state) => state.ui.messages);

  return (
    <ul className="flex flex-col justify-end items-center w-full gap-4">
      <AnimatePresence>
        {messages.map((message) => (
          <NotificationItem key={message.id} message={message} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
