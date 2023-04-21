import NotificationList from './List';

export default function Notification() {
  return (
    <div className="fixed flex flex-col bottom-0 right-0 w-full max-w-full md:max-w-3xl p-4 gap-4 z-50">
      <NotificationList />
    </div>
  );
}
