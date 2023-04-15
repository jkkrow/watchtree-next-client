import MessageList from './Message/List';
import UploadProgressList from './UploadProgress/List';

export default function Alert() {
  return (
    <div className="fixed flex flex-col bottom-0 right-0 w-full max-w-full md:max-w-3xl p-4 gap-4 z-50">
      <MessageList />
      <UploadProgressList />
    </div>
  );
}
