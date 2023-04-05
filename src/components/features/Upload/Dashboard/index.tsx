import DashboardBody from './_fragments/DashboardBody';
import DashboardHeader from './_fragments/DashboardHeader';

export default function UploadDashboard() {
  return (
    <div className="grid flex-shrink-0 w-full lg:w-1/3 h-max p-6 gap-6 border-[1.5px] border-secondary rounded-md">
      <DashboardHeader />
      <DashboardBody />
    </div>
  );
}
