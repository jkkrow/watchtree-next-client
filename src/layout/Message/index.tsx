import MessageList from './MessageList';

export default function Message() {
  return (
    <div className="fixed flex justify-center bottom-0 w-full p-4 gap-4 z-10">
      <MessageList />
    </div>
  );
}
