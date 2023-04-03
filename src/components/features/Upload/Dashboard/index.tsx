import DashboardBody from './_fragments/DashboardBody';
import DashboardHeader from './_fragments/DashboardHeader';

export default function UploadDashboard() {
  return (
    // <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
    <div className="grid p-6 gap-6 border-[1.5px] border-secondary rounded-md">
      <DashboardHeader />
      <DashboardBody />
    </div>
  );
}
