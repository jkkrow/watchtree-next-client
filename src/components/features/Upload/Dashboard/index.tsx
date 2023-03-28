import DashboardBody from './_fragments/DashboardBody';
import DashboardHeader from './_fragments/DashboardHeader';
import { useAppSelector } from '@/hooks/store';

export default function UploadDashboard() {
  const upload = useAppSelector((state) => state.upload);

  return (
    // <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
    <div className="grid p-6 gap-6 ring-2 ring-secondary rounded-md">
      <DashboardHeader />
      <DashboardBody />
    </div>
  );
}
